import { Brain, Database, Zap, Users, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const About = () => {
  const architecture = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Real-time environmental data from OpenWeatherMap, Air Quality APIs, and pollen monitoring systems"
    },
    {
      icon: Brain,
      title: "AI Processing",
      description: "TensorFlow-powered machine learning models analyze patterns and predict health risks"
    },
    {
      icon: Zap,
      title: "Risk Assessment",
      description: "Personalized risk scores based on individual health profiles and local conditions"
    },
    {
      icon: Shield,
      title: "Recommendations",
      description: "Actionable health guidance tailored to current and forecasted conditions"
    }
  ];

  const impact = [
    {
      icon: Users,
      title: "Community Health",
      description: "Protecting vulnerable populations including elderly, children, and those with chronic conditions"
    },
    {
      icon: Globe,
      title: "Environmental Awareness",
      description: "Increasing understanding of climate-health connections through accessible data visualization"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-foreground">About CliHealth</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bridging the gap between climate science and personal health through AI-driven predictions
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-12">
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Climate change is creating unprecedented health challenges. CliHealth empowers individuals 
                and communities with the intelligence they need to protect their health in a changing world. 
                By combining cutting-edge AI with real-time environmental data, we make complex climate-health 
                relationships understandable and actionable for everyone.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* System Architecture */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {architecture.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Innovation */}
        <section className="mb-12">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-6">Innovation & Technology</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Advanced Machine Learning</h3>
                <p className="text-muted-foreground">
                  Our AI models process multiple environmental variables including temperature, humidity, 
                  air quality, pollen counts, and weather patterns to generate accurate health risk predictions. 
                  The system learns from historical health data and continuously improves its accuracy.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real-Time Data Integration</h3>
                <p className="text-muted-foreground">
                  CliHealth integrates data from multiple authoritative sources including OpenWeatherMap, 
                  government air quality monitors, and pollen tracking networks to provide comprehensive 
                  environmental health insights.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Personalized Risk Assessment</h3>
                <p className="text-muted-foreground">
                  By considering individual health profiles, age, location, and personal sensitivities, 
                  our platform delivers personalized risk assessments that are more relevant and actionable 
                  than generic weather forecasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expected Impact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Expected Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {impact.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-chart-accent/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-chart-accent" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Future Vision */}
        <section className="mb-12">
          <Card className="shadow-card bg-gradient-hero text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Looking Ahead</h2>
              <p className="text-lg leading-relaxed opacity-90">
                As climate change continues to impact global health, CliHealth will evolve to address 
                new challenges. We're developing features for outbreak prediction, medication management 
                during extreme weather, and community-wide health resilience planning. Our goal is to 
                create a comprehensive ecosystem that empowers individuals, families, and communities 
                to thrive in our changing climate.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-primary rounded-full mr-3"></div>
                  React with TypeScript
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-primary rounded-full mr-3"></div>
                  Tailwind CSS for responsive design
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-primary rounded-full mr-3"></div>
                  Chart.js for data visualization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-primary rounded-full mr-3"></div>
                  Accessible design patterns
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Backend & AI</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-secondary rounded-full mr-3"></div>
                  Node.js server architecture
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-secondary rounded-full mr-3"></div>
                  TensorFlow for machine learning
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-secondary rounded-full mr-3"></div>
                  SQLite for efficient data storage
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-chart-secondary rounded-full mr-3"></div>
                  Multiple environmental APIs
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;