import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { SurveyData } from "@/pages/Survey";

interface SurveyStep2Props {
  data: SurveyData;
  onChange: (data: SurveyData) => void;
  onNext: () => void;
  onBack: () => void;
}

const SurveyStep2 = ({ data, onChange, onNext, onBack }: SurveyStep2Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Do you smoke?</Label>
            <RadioGroup
              value={data.smoking ? "yes" : "no"}
              onValueChange={(value) => onChange({ ...data, smoking: value === "yes" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="smoke-yes" />
                <Label htmlFor="smoke-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="smoke-no" />
                <Label htmlFor="smoke-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Existing Health Conditions</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="asthma"
                  checked={data.hasAsthma}
                  onCheckedChange={(checked) =>
                    onChange({ ...data, hasAsthma: checked as boolean })
                  }
                />
                <Label htmlFor="asthma" className="font-normal">Asthma</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allergy"
                  checked={data.hasAllergy}
                  onCheckedChange={(checked) =>
                    onChange({ ...data, hasAllergy: checked as boolean })
                  }
                />
                <Label htmlFor="allergy" className="font-normal">Allergy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="heart"
                  checked={data.hasHeartDisease}
                  onCheckedChange={(checked) =>
                    onChange({ ...data, hasHeartDisease: checked as boolean })
                  }
                />
                <Label htmlFor="heart" className="font-normal">Heart Disease</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="none"
                  checked={data.hasNone}
                  onCheckedChange={(checked) =>
                    onChange({ ...data, hasNone: checked as boolean })
                  }
                />
                <Label htmlFor="none" className="font-normal">None</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SurveyStep2;
