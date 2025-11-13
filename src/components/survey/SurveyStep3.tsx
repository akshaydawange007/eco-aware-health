import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { SurveyData } from "@/pages/Survey";

interface SurveyStep3Props {
  data: SurveyData;
  onChange: (data: SurveyData) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const SurveyStep3 = ({ data, onChange, onBack, onSubmit, loading }: SurveyStep3Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lifestyle Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <RadioGroup
              value={data.activityLevel}
              onValueChange={(value) => onChange({ ...data, activityLevel: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="activity-low" />
                <Label htmlFor="activity-low" className="font-normal">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="activity-medium" />
                <Label htmlFor="activity-medium" className="font-normal">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="activity-high" />
                <Label htmlFor="activity-high" className="font-normal">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Exercise Frequency</Label>
            <RadioGroup
              value={data.exercise}
              onValueChange={(value) => onChange({ ...data, exercise: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="exercise-none" />
                <Label htmlFor="exercise-none" className="font-normal">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="exercise-low" />
                <Label htmlFor="exercise-low" className="font-normal">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="exercise-medium" />
                <Label htmlFor="exercise-medium" className="font-normal">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="exercise-high" />
                <Label htmlFor="exercise-high" className="font-normal">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleep">Sleep Hours (per day)</Label>
            <Input
              id="sleep"
              type="number"
              min="0"
              max="24"
              value={data.sleepHours}
              onChange={(e) => onChange({ ...data, sleepHours: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Submitting..." : "Complete"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SurveyStep3;
