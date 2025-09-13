import { AlertTriangle, Bell, Heart, Thermometer, Wind, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

interface Alert {
  id: string;
  type: "asthma" | "heat" | "air-quality" | "pollen";
  severity: "low" | "moderate" | "high";
  title: string;
  description: string;
  time: string;
  icon: any;
  recommendations: string[];
}

const Alerts = () => {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "pollen",
      severity: "high",
      title: "High Pollen Alert",
      description: "Tree pollen levels are extremely high today. Those with allergies should take precautions.",
      time: "2 hours ago",
      icon: Wind,
      recommendations: [
        "Keep windows closed",
        "Avoid outdoor activities 10 AM - 4 PM",
        "Consider antihistamines",
        "Shower after being outdoors"
      ]
    },
    {
      id: "2",
      type: "air-quality",
      severity: "moderate",
      title: "Air Quality Advisory",
      description: "Air quality index has risen to moderate levels due to increased particulate matter.",
      time: "4 hours ago", 
      icon: Wind,
      recommendations: [
        "Reduce outdoor exercise",
        "Consider wearing a mask",
        "Stay indoors if sensitive to air pollution"
      ]
    },
    {
      id: "3",
      type: "heat",
      severity: "moderate",
      title: "Heat Advisory",
      description: "Temperatures expected to reach 95°F with high humidity this afternoon.",
      time: "6 hours ago",
      icon: Thermometer,
      recommendations: [
        "Stay hydrated",
        "Avoid prolonged sun exposure",
        "Seek air-conditioned spaces",
        "Wear light-colored clothing"
      ]
    },
    {
      id: "4",
      type: "asthma",
      severity: "low",
      title: "Asthma Watch",
      description: "Conditions may trigger asthma symptoms for sensitive individuals.",
      time: "8 hours ago",
      icon: Heart,
      recommendations: [
        "Keep rescue inhaler nearby",
        "Monitor symptoms closely",
        "Avoid known triggers"
      ]
    }
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          color: "text-health-danger",
          bgColor: "bg-health-danger-bg",
          borderColor: "border-health-danger/20"
        };
      case "moderate":
        return {
          color: "text-health-caution",
          bgColor: "bg-health-caution-bg",
          borderColor: "border-health-caution/20"
        };
      default:
        return {
          color: "text-health-safe",
          bgColor: "bg-health-safe-bg",
          borderColor: "border-health-safe/20"
        };
    }
  };

  const getTimeAgo = (time: string) => {
    return time;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Alerts</h1>
            <p className="text-muted-foreground mt-2">Real-time health risk notifications for your area</p>
          </div>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Active Alerts Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-health-danger-bg border-health-danger/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-health-danger">1</div>
              <div className="text-sm text-health-danger">High Risk Alerts</div>
            </CardContent>
          </Card>
          <Card className="bg-health-caution-bg border-health-caution/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-health-caution">2</div>
              <div className="text-sm text-health-caution">Moderate Risk Alerts</div>
            </CardContent>
          </Card>
          <Card className="bg-health-safe-bg border-health-safe/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-health-safe">1</div>
              <div className="text-sm text-health-safe">Low Risk Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const severityConfig = getSeverityConfig(alert.severity);
            const AlertIcon = alert.icon;
            
            return (
              <Card key={alert.id} className={`shadow-card hover:shadow-card-hover transition-all duration-300 ${severityConfig.borderColor}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${severityConfig.bgColor}`}>
                        <AlertIcon className={`w-5 h-5 ${severityConfig.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg font-semibold">{alert.title}</CardTitle>
                          <Badge className={`${severityConfig.bgColor} ${severityConfig.color} capitalize`}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{getTimeAgo(alert.time)}</p>
                      </div>
                    </div>
                    <AlertTriangle className={`w-5 h-5 ${severityConfig.color} flex-shrink-0`} />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-foreground">{alert.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Recommended Actions:</h4>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <div className={`w-1 h-1 rounded-full ${severityConfig.bgColor} ${severityConfig.color} mt-2 mr-3 flex-shrink-0`}></div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No More Alerts */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-health-safe-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-health-safe" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">You're all caught up!</h3>
          <p className="text-muted-foreground">No more health alerts at this time. We'll notify you of any new risks.</p>
        </div>
      </main>
    </div>
  );
};

export default Alerts;