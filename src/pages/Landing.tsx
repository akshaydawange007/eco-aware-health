import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Real-time Risk Assessment",
      description: "AI-powered analysis of climate data to predict health risks in your area"
    },
    {
      icon: TrendingUp,
      title: "Personalized Insights",
      description: "Tailored recommendations based on your health profile and local conditions"
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "Designed for vulnerable populations with simple, accessible interface"
    }
  ];

  const stats = [
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Monitoring" },
    { number: "50+", label: "Health Metrics" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  CliHealth
                </h1>
                <p className="text-xl md:text-2xl text-primary font-medium">
                  Predicting Tomorrow's Health Risks Today
                </p>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Climate change affects our health in ways we're just beginning to understand. 
                  Stay ahead with AI-powered predictions that help you protect yourself and your community.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/dashboard">
                    Check Your Health Risk
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-card-hover">
                <img 
                  src={heroImage} 
                  alt="Climate and health visualization with nature and technology elements"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-hero rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-chart-secondary/20 rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Protecting Health Through Climate Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform analyzes multiple environmental factors to provide 
              accurate health risk predictions and personalized protection strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 border-0 bg-gradient-card">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Climate-Health Connection
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Climate change is creating new health challenges every day. Rising temperatures, 
            changing air quality, and extreme weather patterns directly impact our well-being. 
            Vulnerable populations - including the elderly, children, and those with pre-existing 
            conditions - need better tools to stay safe.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Health Impacts</h3>
              <ul className="space-y-2 text-left">
                {[
                  "Heat-related illnesses",
                  "Respiratory complications",
                  "Cardiovascular stress",
                  "Allergy and asthma triggers"
                ].map((impact, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-health-safe mr-2 flex-shrink-0" />
                    {impact}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Our Solution</h3>
              <ul className="space-y-2 text-left">
                {[
                  "Predictive health risk alerts",
                  "Personalized recommendations",
                  "Community-focused design",
                  "Real-time environmental monitoring"
                ].map((solution, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-chart-primary mr-2 flex-shrink-0" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Protect Your Health?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of users who trust CliHealth to stay ahead of climate-related health risks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;