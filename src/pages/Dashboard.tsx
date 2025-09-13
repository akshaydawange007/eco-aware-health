import { MapPin, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import HealthRiskCard from "@/components/HealthRiskCard";
import HealthChart from "@/components/HealthChart";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  // Sample data - in real app this would come from API
  const healthRiskData = {
    location: "San Francisco, CA",
    riskLevel: "caution" as const,
    riskScore: 65,
    primaryRisk: "High Pollen Count",
    temperature: 72,
    humidity: 68,
    airQuality: 85,
    recommendations: [
      "Limit outdoor activities between 10 AM - 4 PM",
      "Keep windows closed during high pollen hours",
      "Consider wearing a mask outdoors",
      "Stay hydrated and monitor symptoms"
    ]
  };

  // Chart data
  const airQualityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Air Quality Index',
        data: [45, 52, 68, 85, 90, 75, 60],
        borderColor: 'hsl(var(--chart-primary))',
        backgroundColor: 'hsl(var(--chart-primary) / 0.1)',
        tension: 0.4,
      },
      {
        label: 'Health Risk Score',
        data: [30, 35, 45, 65, 70, 55, 40],
        borderColor: 'hsl(var(--chart-warning))',
        backgroundColor: 'hsl(var(--chart-warning) / 0.1)',
        tension: 0.4,
      },
    ],
  };

  const temperatureData = {
    labels: ['12 AM', '6 AM', '12 PM', '6 PM'],
    datasets: [
      {
        label: 'Temperature (°F)',
        data: [62, 58, 78, 72],
        backgroundColor: [
          'hsl(var(--chart-secondary))',
          'hsl(var(--chart-accent))',
          'hsl(var(--chart-warning))',
          'hsl(var(--chart-primary))',
        ],
      },
    ],
  };

  const pollenData = {
    labels: ['Tree Pollen', 'Grass Pollen', 'Weed Pollen', 'Mold Spores'],
    datasets: [
      {
        label: 'Allergen Levels',
        data: [85, 45, 30, 60],
        backgroundColor: [
          'hsl(var(--health-danger))',
          'hsl(var(--health-caution))',
          'hsl(var(--health-safe))',
          'hsl(var(--chart-accent))',
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Dashboard</h1>
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="mr-4">{healthRiskData.location}</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <Button variant="outline" className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Main Health Risk Card */}
        <div className="mb-8">
          <HealthRiskCard {...healthRiskData} />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <HealthChart
            title="Air Quality vs Health Risk"
            type="line"
            data={airQualityData}
          />
          <HealthChart
            title="Temperature & Humidity Trends"
            type="bar"
            data={temperatureData}
          />
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          <HealthChart
            title="Allergy & Pollen Levels"
            type="bar"
            data={pollenData}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Understanding Your Risk Score</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-health-safe rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <div className="font-medium text-foreground">Safe (0-40)</div>
                <div className="text-sm text-muted-foreground">Low risk for most people. Normal outdoor activities recommended.</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-health-caution rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <div className="font-medium text-foreground">Caution (41-70)</div>
                <div className="text-sm text-muted-foreground">Moderate risk. Sensitive individuals should take precautions.</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-health-danger rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <div className="font-medium text-foreground">High Risk (71-100)</div>
                <div className="text-sm text-muted-foreground">High risk for all. Limit outdoor exposure and follow all recommendations.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;