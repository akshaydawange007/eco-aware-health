import { AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type RiskLevel = "safe" | "caution" | "danger";

interface HealthRiskCardProps {
  location: string;
  riskLevel: RiskLevel;
  riskScore: number;
  primaryRisk: string;
  temperature: number;
  humidity: number;
  airQuality: number;
  recommendations: string[];
}

const HealthRiskCard = ({
  location,
  riskLevel,
  riskScore,
  primaryRisk,
  temperature,
  humidity,
  airQuality,
  recommendations,
}: HealthRiskCardProps) => {
  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case "safe":
        return {
          icon: CheckCircle,
          color: "text-health-safe",
          bgColor: "bg-health-safe-bg",
          label: "Safe",
          description: "Low health risk conditions"
        };
      case "caution":
        return {
          icon: AlertTriangle,
          color: "text-health-caution",
          bgColor: "bg-health-caution-bg",
          label: "Caution",
          description: "Moderate health risk - take precautions"
        };
      case "danger":
        return {
          icon: XCircle,
          color: "text-health-danger",
          bgColor: "bg-health-danger-bg",
          label: "High Risk",
          description: "High health risk - avoid outdoor activities"
        };
    }
  };

  const riskConfig = getRiskConfig(riskLevel);
  const RiskIcon = riskConfig.icon;

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{location}</CardTitle>
          <Badge className={`${riskConfig.bgColor} ${riskConfig.color} font-medium`}>
            <RiskIcon className="w-3 h-3 mr-1" />
            {riskConfig.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{riskConfig.description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Risk Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Score</span>
            <span className="text-2xl font-bold">{riskScore}/100</span>
          </div>
          <Progress value={riskScore} className="h-2" />
        </div>

        {/* Primary Risk */}
        <div className={`p-3 rounded-lg ${riskConfig.bgColor}`}>
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-4 h-4 ${riskConfig.color}`} />
            <span className="text-sm font-medium">Primary Risk: {primaryRisk}</span>
          </div>
        </div>

        {/* Environmental Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-primary">{temperature}°</div>
            <div className="text-xs text-muted-foreground">Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-secondary">{humidity}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-accent">{airQuality}</div>
            <div className="text-xs text-muted-foreground">Air Quality</div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Preventive Recommendations</h4>
          <ul className="space-y-1">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <CheckCircle className="w-3 h-3 text-health-safe mr-2 mt-0.5 flex-shrink-0" />
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthRiskCard;