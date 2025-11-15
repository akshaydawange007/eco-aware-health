import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherData {
  temperature: number;
  humidity: number;
}

interface AQIData {
  aqi: number;
}

// Fetch weather data from Open-Meteo (free, no API key required)
async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
  };
}

// Fetch AQI data from Open-Meteo Air Quality API
async function fetchAQIData(lat: number, lon: number): Promise<AQIData> {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`;
  const response = await fetch(url);
  const data = await response.json();
  
  return {
    aqi: Math.round(data.current.us_aqi || 50),
  };
}

// Calculate risk level based on weather, AQI, and user health data
function calculateRiskLevel(
  temperature: number,
  aqi: number,
  humidity: number,
  healthData: any
): string {
  let riskScore = 0;

  // Temperature risk (extreme temps increase risk)
  if (temperature < 0 || temperature > 35) riskScore += 2;
  else if (temperature < 10 || temperature > 30) riskScore += 1;

  // AQI risk
  if (aqi > 150) riskScore += 3;
  else if (aqi > 100) riskScore += 2;
  else if (aqi > 50) riskScore += 1;

  // Humidity risk
  if (humidity > 80 || humidity < 30) riskScore += 1;

  // Health conditions modifiers
  if (healthData?.has_asthma && aqi > 50) riskScore += 2;
  if (healthData?.has_heart_disease && (temperature > 30 || temperature < 5)) riskScore += 2;
  if (healthData?.has_allergy && aqi > 100) riskScore += 1;
  if (healthData?.smoking) riskScore += 1;

  // Activity level modifiers
  if (healthData?.activity_level === 'sedentary') riskScore += 1;
  if (healthData?.exercise === 'never') riskScore += 1;

  // Determine risk level
  if (riskScore >= 6) return 'high';
  if (riskScore >= 3) return 'moderate';
  return 'low';
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting health history generation...');

    // Get all users with profiles (to get location data if available)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id');

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      throw profilesError;
    }

    console.log(`Found ${profiles?.length || 0} users`);

    // Process each user
    const results = [];
    for (const profile of profiles || []) {
      try {
        // Get user's health data
        const { data: healthData } = await supabase
          .from('user_health_data')
          .select('*')
          .eq('user_id', profile.user_id)
          .single();

        // Default location (can be customized per user in future)
        // Using New Delhi as default
        const lat = 28.6139;
        const lon = 77.2090;

        // Fetch weather and AQI data
        const [weather, aqiData] = await Promise.all([
          fetchWeatherData(lat, lon),
          fetchAQIData(lat, lon),
        ]);

        console.log(`Weather data for user ${profile.user_id}:`, weather, aqiData);

        // Calculate risk level
        const riskLevel = calculateRiskLevel(
          weather.temperature,
          aqiData.aqi,
          weather.humidity,
          healthData
        );

        // Check if entry already exists for today
        const today = new Date().toISOString().split('T')[0];
        const { data: existing } = await supabase
          .from('health_history')
          .select('id')
          .eq('user_id', profile.user_id)
          .eq('date', today)
          .single();

        if (!existing) {
          // Insert health history record
          const { error: insertError } = await supabase
            .from('health_history')
            .insert({
              user_id: profile.user_id,
              date: today,
              temperature: weather.temperature,
              humidity: weather.humidity,
              aqi: aqiData.aqi,
              risk_level: riskLevel,
            });

          if (insertError) {
            console.error(`Error inserting history for user ${profile.user_id}:`, insertError);
            results.push({ user_id: profile.user_id, status: 'error', error: insertError.message });
          } else {
            console.log(`Successfully created history for user ${profile.user_id}`);
            results.push({ user_id: profile.user_id, status: 'success', risk_level: riskLevel });
          }
        } else {
          console.log(`History already exists for user ${profile.user_id} today`);
          results.push({ user_id: profile.user_id, status: 'skipped' });
        }
      } catch (userError) {
        console.error(`Error processing user ${profile.user_id}:`, userError);
        results.push({ user_id: profile.user_id, status: 'error', error: String(userError) });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Health history generation completed',
        results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in generate-health-history function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
