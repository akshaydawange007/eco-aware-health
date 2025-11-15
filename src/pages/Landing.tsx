import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CloudRain, Shield, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import SimpleHealthRiskCard from "@/components/SimpleHealthRiskCard";
import heroImage from "@/assets/climate-health-hero.jpg";
import { feedbackSchema } from "@/lib/validationSchemas";

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to submit feedback",
        variant: "destructive",
      });
      return;
    }

    // Validate input
    const validation = feedbackSchema.safeParse({ feedback_text: feedback });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from("user_feedback")
      .insert({
        user_id: user.id,
        feedback_text: feedback,
        symptoms_experienced: feedback,
      });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank you!",
        description: "Your feedback helps us improve our predictions",
      });
      setFeedback("");
    }
    setSubmitting(false);
  };

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning analyzes climate data to forecast health risks"
    },
    {
      icon: TrendingUp,
      title: "Real-time Monitoring",
      description: "Track air quality, temperature, and allergen levels 24/7"
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Tailored recommendations based on your health profile"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Climate and health visualization"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
              Predicting Tomorrow's Health Risks Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Climate change affects your health. Stay ahead with AI-powered predictions
              for air quality, temperature impacts, and allergen levels.
            </p>
            
            {user && (
              <div className="max-w-md mx-auto my-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                <SimpleHealthRiskCard />
              </div>
            )}
            
            <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {user ? (
                <Button size="lg" className="text-lg px-8" onClick={() => navigate("/dashboard")}>
                  View Full Dashboard
                </Button>
              ) : (
                <>
                  <Button size="lg" className="text-lg px-8" onClick={() => navigate("/auth")}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate("/about")}>
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How We Protect Your Health
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-border hover:shadow-card-hover transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Feedback Section */}
      {user && (
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Share Your Experience</CardTitle>
                <p className="text-center text-muted-foreground">
                  Help us improve our predictions by telling us what symptoms you experienced
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Describe any symptoms or health changes you've noticed..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Impact Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empowering Communities Through Data
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            Our AI-driven platform helps vulnerable populations—elderly, children, and those with
            pre-existing conditions—stay informed and prepared for climate-related health risks.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Users Protected</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;