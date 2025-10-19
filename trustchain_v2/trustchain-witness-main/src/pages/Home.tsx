import { Shield, FileText, Lock, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import NavBar from "@/components/LandingNav";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Algorand Blockchain</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              🛡️ TrustChain
            </h1>
            <p className="text-xl md:text-3xl text-foreground/90 max-w-4xl mx-auto font-semibold">
              Rebuilding Trust Through Transparency
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A decentralised platform for reporting hate incidents securely and anonymously — 
              powered by Algorand's carbon-neutral blockchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary shadow-glow text-lg px-8 hover:scale-105 hover:shadow-xl active:scale-95 transition-all group"
              >
                <Link to="/dashboard">
                  Report an Incident
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-lg px-8 hover:bg-primary/5 hover:border-primary hover:shadow-md transition-all"
              >
                <Link to="/learn">
                  Learn More
                </Link>
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Immutable Records</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Anonymous Reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Community Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to contribute to a safer, more accountable community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="bg-gradient-card border-border shadow-lg hover:shadow-glow transition-all group animate-fade-in">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <FileText className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground">Submit Your Report</h3>
                <p className="text-muted-foreground">
                  Describe the incident, attach evidence, and choose to remain anonymous if needed
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-gradient-card border-border shadow-lg hover:shadow-glow transition-all group animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-8 text-center space-y-4">
                <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Lock className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground">Stored on Blockchain</h3>
                <p className="text-muted-foreground">
                  Your report is permanently recorded on Algorand's immutable, carbon-neutral blockchain
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-gradient-card border-border shadow-lg hover:shadow-glow transition-all group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-8 text-center space-y-4">
                <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground">Transparent & Verifiable</h3>
                <p className="text-muted-foreground">
                  Build public trust with verifiable, tamper-proof records accessible to all
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Blockchain Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Blockchain Helps Build Trust
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Blockchain technology ensures that reports can't be deleted, altered, or hidden. 
                Algorand's carbon-neutral, fast, and secure network powers this civic transformation, 
                creating an immutable record of truth that serves the public good.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-1">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Immutable Records</h4>
                    <p className="text-sm text-muted-foreground">Once recorded, reports cannot be tampered with or deleted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-1">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Carbon Neutral</h4>
                    <p className="text-sm text-muted-foreground">Algorand is a sustainable, environmentally-friendly blockchain</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-1">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Fast & Secure</h4>
                    <p className="text-sm text-muted-foreground">Instant finality with bank-grade security</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-square bg-gradient-primary rounded-3xl shadow-glow opacity-20 absolute inset-0 animate-pulse"></div>
              <div className="relative bg-card border-2 border-primary/20 rounded-3xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Decentralized Trust</div>
                      <div className="text-sm text-muted-foreground">No central authority</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <Lock className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Privacy Protected</div>
                      <div className="text-sm text-muted-foreground">Anonymous reporting option</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                    <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Evidence Storage</div>
                      <div className="text-sm text-muted-foreground">IPFS decentralized storage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Mission Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="animate-fade-in">
            <blockquote className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed italic">
              "Transparency isn't just a feature—it's the foundation of trust. 
              When communities can verify truth, accountability follows."
            </blockquote>
            <p className="text-lg text-muted-foreground mt-6">
              TrustChain empowers communities to document injustice, preserve evidence, 
              and build a more accountable future through blockchain transparency.
            </p>
          </div>

          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-primary shadow-glow text-lg px-12 hover:scale-105 transition-transform"
          >
            <Link to="/dashboard">
              Join the Movement for Trust & Safety
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-foreground">TrustChain</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Rebuilding trust through blockchain transparency and decentralized accountability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/learn" className="hover:text-primary transition-colors">Learn</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Algorand Blockchain</li>
                <li>Pera Wallet</li>
                <li>IPFS Storage</li>
                <li>Smart Contracts</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Built for the <span className="font-semibold text-foreground">EasyA × Algorand London Hackathon 2025</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Powered by Algorand TestNet | Secured by blockchain technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
