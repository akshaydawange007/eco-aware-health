import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import SimpleHealthRiskCard from "@/components/SimpleHealthRiskCard";
import HealthChart from "@/components/HealthChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch health history
      const { data, error } = await supabase
        .from("health_history")
        .select("*")
        .eq("user_id", session.user.id)
        .order("date", { ascending: false })
        .limit(30);

      if (!error && data) {
        setHistory(data);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const currentTemp = 28;
  const currentAqi = 85;
  const currentHumidity = 65;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="min-h-screen bg-gradient-subtle p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Health Dashboard</h1>
            <p className="text-muted-foreground">
              Track your personalized health risk based on real-time climate data
            </p>
          </div>

          {/* Current Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{currentTemp}°C</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Air Quality Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{currentAqi}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{currentHumidity}%</div>
              </CardContent>
            </Card>

            <div className="md:col-span-1">
              <SimpleHealthRiskCard />
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <HealthChart
              title="Air Quality Index"
              type="line"
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                  label: "AQI",
                  data: [45, 52, 48, 61, 58, 55, 62],
                  borderColor: "hsl(var(--health-warning))",
                  backgroundColor: "hsl(var(--health-warning) / 0.1)",
                  tension: 0.4,
                }]
              }}
            />
            <HealthChart
              title="Temperature Trends"
              type="bar"
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                  label: "Temperature (°C)",
                  data: [28, 30, 29, 32, 31, 33, 32],
                  backgroundColor: "hsl(var(--primary))",
                }]
              }}
            />
          </div>

          {/* Recommendations */}
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <h2 className="text-2xl font-bold mb-4">Today's Preventive Recommendations</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Limit outdoor activities between 2-4 PM when air quality is poorest</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Keep windows closed and use air purifiers if available</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Stay hydrated - drink at least 8 glasses of water today</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Carry your inhaler if you have respiratory conditions</span>
              </li>
            </ul>
          </div>

          {/* Health History */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-2xl font-bold mb-4">Risk History (Past Month)</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading history...</p>
            ) : history.length === 0 ? (
              <p className="text-muted-foreground">No history available yet. Check back after using the app!</p>
            ) : (
              <div className="space-y-2">
                {history.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.risk_level === "low"
                            ? "bg-health-safe/20 text-health-safe"
                            : record.risk_level === "medium"
                            ? "bg-health-warning/20 text-health-warning"
                            : "bg-health-danger/20 text-health-danger"
                        }`}
                      >
                        {record.risk_level.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Temp: {record.temperature}°C | AQI: {record.aqi} | Humidity: {record.humidity}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;