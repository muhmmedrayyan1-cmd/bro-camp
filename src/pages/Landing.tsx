import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/brototype-logo.png";
import bgImage from "@/assets/brototype-wall.png";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-16">
          <img src={logo} alt="Brototype" className="h-12 md:h-16" />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Complaint Management
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your voice matters. Submit complaints, track progress, and get solutions faster than ever.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.4)] hover:shadow-[0_20px_50px_-10px_hsl(var(--primary)/0.5)] transition-all"
            >
              Get Started
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Submit Complaints</h3>
              <p className="text-muted-foreground">
                Raise issues with text, audio, and photo attachments for better clarity.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your complaint status in real-time with instant notifications.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Solutions</h3>
              <p className="text-muted-foreground">
                Receive updates and resolutions from our dedicated admin team.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">For Administrators</h2>
                <p className="text-muted-foreground mb-6">
                  Manage all complaints efficiently with our powerful admin dashboard. 
                  Review submissions, update statuses, and communicate with students seamlessly.
                </p>
                <Button variant="secondary" onClick={() => navigate("/admin")}>
                  Admin Portal
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/60 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Transparency</div>
                </div>
                <div className="bg-background/60 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold text-accent mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
                <div className="bg-background/60 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-500 mb-1">Fast</div>
                  <div className="text-sm text-muted-foreground">Resolution</div>
                </div>
                <div className="bg-background/60 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-500 mb-1">Easy</div>
                  <div className="text-sm text-muted-foreground">To Use</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
