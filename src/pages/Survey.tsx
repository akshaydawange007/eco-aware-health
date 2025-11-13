import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SurveyStep1 from "@/components/survey/SurveyStep1";
import SurveyStep2 from "@/components/survey/SurveyStep2";
import SurveyStep3 from "@/components/survey/SurveyStep3";
import { Progress } from "@/components/ui/progress";

export interface SurveyData {
  name: string;
  dob: string;
  gender: string;
  profilePhoto: string;
  smoking: boolean;
  hasAsthma: boolean;
  hasAllergy: boolean;
  hasHeartDisease: boolean;
  hasNone: boolean;
  activityLevel: string;
  exercise: string;
  sleepHours: number;
}

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    name: "",
    dob: "",
    gender: "",
    profilePhoto: "",
    smoking: false,
    hasAsthma: false,
    hasAllergy: false,
    hasHeartDisease: false,
    hasNone: false,
    activityLevel: "medium",
    exercise: "medium",
    sleepHours: 7,
  });

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    try {
      // Insert profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          user_id: session.user.id,
          name: surveyData.name,
          dob: surveyData.dob,
          gender: surveyData.gender,
          profile_photo_url: surveyData.profilePhoto,
        });

      if (profileError) throw profileError;

      // Insert health data
      const { error: healthError } = await supabase
        .from("user_health_data")
        .insert({
          user_id: session.user.id,
          smoking: surveyData.smoking,
          has_asthma: surveyData.hasAsthma,
          has_allergy: surveyData.hasAllergy,
          has_heart_disease: surveyData.hasHeartDisease,
          has_none: surveyData.hasNone,
          activity_level: surveyData.activityLevel,
          exercise: surveyData.exercise,
          sleep_hours: surveyData.sleepHours,
        });

      if (healthError) throw healthError;

      toast({
        title: "Success",
        description: "Profile created successfully!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Complete Your Profile</h1>
          <p className="text-center text-muted-foreground mb-4">
            Step {step} of 3
          </p>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <SurveyStep1
            data={surveyData}
            onChange={setSurveyData}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <SurveyStep2
            data={surveyData}
            onChange={setSurveyData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <SurveyStep3
            data={surveyData}
            onChange={setSurveyData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Survey;
