import { Shield, Target, Users, Heart, Github, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LandingNav from "@/components/LandingNav";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="bg-gradient-primary p-4 rounded-2xl w-fit mx-auto mb-6 shadow-glow">
              <Shield className="h-16 w-16 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About TrustChain
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering communities through blockchain-powered transparency and accountability
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                TrustChain was created to demonstrate how blockchain technology can serve the public good 
                by creating transparent, immutable, and accountable systems for reporting hate crimes and 
                social injustices.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that technology should empower communities, protect vulnerable individuals, 
                and build trust through verifiable truth—not centralized control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all animate-fade-in">
                <CardContent className="pt-6 space-y-3">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Our Goal</h3>
                  <p className="text-muted-foreground">
                    To create a tamper-proof, transparent reporting system that gives communities 
                    the power to document incidents without fear of censorship or data manipulation.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-6 space-y-3">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Our Values</h3>
                  <p className="text-muted-foreground">
                    Transparency, privacy, empowerment, and social justice. We leverage cutting-edge 
                    technology to build systems that serve humanity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
              Why We Built TrustChain
            </h2>
            
            <Card className="bg-gradient-card border-border shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg mt-1">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      The Problem: Lack of Trust
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Traditional reporting systems often suffer from:
                    </p>
                    <ul className="mt-3 space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span>Data that can be altered or deleted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span>Centralized control with potential for bias</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span>Lack of transparency and accountability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span>Fear of retaliation preventing reporting</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-success/10 p-3 rounded-lg mt-1">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Our Solution: Blockchain Transparency
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      TrustChain leverages blockchain to ensure:
                    </p>
                    <ul className="mt-3 space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Immutable records that can't be tampered with</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Decentralized control—no single authority</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Full transparency with public verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span>Anonymous reporting option for safety</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hackathon Context Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="bg-gradient-primary p-4 rounded-2xl w-fit mx-auto mb-4 shadow-glow">
              <Globe className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Built for Impact
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              TrustChain was developed for the <span className="font-semibold text-foreground">EasyA × Algorand London Hackathon 2025</span> 
              to demonstrate how blockchain technology can create real-world social impact.
            </p>
            <Card className="bg-gradient-card border-2 border-primary/20 shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <blockquote className="text-lg italic text-foreground mb-4">
                  "We built TrustChain to prove that blockchain isn't just about finance—
                  it's about creating transparent, accountable systems that serve humanity."
                </blockquote>
                <p className="text-sm text-muted-foreground">
                  — The TrustChain Team
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge, open-source technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all text-center animate-fade-in">
              <CardContent className="pt-6 space-y-3">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Algorand</h3>
                <p className="text-sm text-muted-foreground">
                  Carbon-negative blockchain for fast, secure transactions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6 space-y-3">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">IPFS</h3>
                <p className="text-sm text-muted-foreground">
                  Decentralized storage for evidence files
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6 space-y-3">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Pera Wallet</h3>
                <p className="text-sm text-muted-foreground">
                  Secure wallet integration for Algorand
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-6 space-y-3">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto">
                  <Github className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">React + Vite</h3>
                <p className="text-sm text-muted-foreground">
                  Modern, fast frontend framework
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Future of TrustChain
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            While TrustChain was built for a hackathon, we envision it as a template for real-world 
            civic-tech applications. Future features could include:
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary">→</span>
              <span>Integration with NGOs and advocacy groups</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary">→</span>
              <span>Multi-language support</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary">→</span>
              <span>Advanced analytics and insights</span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary">→</span>
              <span>Mobile app for easier access</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic pt-4">
            TrustChain is open-source and built for the community. Together, we can build a more 
            transparent and accountable future.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
