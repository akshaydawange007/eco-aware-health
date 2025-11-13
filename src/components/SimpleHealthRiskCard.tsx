import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SimpleHealthRiskCard = () => {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Health Risk
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-health-warning">Medium</div>
        <p className="text-xs text-muted-foreground mt-1">Take precautions</p>
      </CardContent>
    </Card>
  );
};

export default SimpleHealthRiskCard;
