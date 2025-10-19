import { Shield, Lock, Zap, Globe, FileText, Users, CheckCircle, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingNav from "@/components/LandingNav";

const Learn = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            How Blockchain Powers Social Good
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Learn how TrustChain uses Algorand blockchain technology to create 
            transparent, immutable, and trustworthy reporting systems
          </p>
        </div>
      </section>

      {/* Why Blockchain Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Blockchain for Social Good?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Traditional reporting systems face challenges with trust, accountability, and transparency. 
              Blockchain technology solves these fundamental issues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all animate-fade-in">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-3">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Immutability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once a report is recorded on the blockchain, it cannot be altered, deleted, or 
                  tampered with—creating a permanent record of truth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-3">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All transactions are publicly verifiable on the blockchain, ensuring complete 
                  transparency while protecting individual privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Decentralization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No single entity controls the data. Power is distributed across the network, 
                  preventing censorship and manipulation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What is Algorand Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                What is Algorand?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Algorand is a next-generation blockchain platform that solves the blockchain trilemma: 
                achieving security, scalability, and decentralization simultaneously.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-1">
                    <Zap className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Lightning Fast</h4>
                    <p className="text-sm text-muted-foreground">
                      Transactions finalize in under 4 seconds with instant confirmation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-1">
                    <Globe className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Carbon Negative</h4>
                    <p className="text-sm text-muted-foreground">
                      The world's first carbon-negative blockchain, certified by ClimateTrade
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-1">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Low Cost</h4>
                    <p className="text-sm text-muted-foreground">
                      Transaction fees of just $0.001, making it accessible for social impact projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-card border-2 border-primary/20 shadow-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <div className="bg-gradient-primary p-4 rounded-2xl w-fit mx-auto mb-4 shadow-glow">
                    <Shield className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Algorand by Numbers</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{'<'}4s</div>
                    <div className="text-sm text-muted-foreground">Block Time</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">6,000+</div>
                    <div className="text-sm text-muted-foreground">TPS Capacity</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">$0.001</div>
                    <div className="text-sm text-muted-foreground">Tx Fee</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Smart Contracts Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How TrustChain Uses Smart Contracts
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Smart contracts are self-executing programs on the blockchain that run exactly as coded, 
              without any possibility of downtime, censorship, or third-party interference.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-border shadow-md animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Report Submission Contract</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When you submit a report through TrustChain, a smart contract function is called 
                  that permanently records your report on the Algorand blockchain.
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <div className="text-primary">Contract ID:</div>
                  <div className="text-foreground break-all">748001402</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Stores incident description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Records timestamp and metadata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Links to IPFS evidence storage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Evidence Storage (IPFS)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Attached files (photos, documents) are stored on IPFS—a decentralized storage network. 
                  The blockchain stores only the unique content identifier (CID).
                </p>
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs font-semibold text-foreground mb-1">1. File Upload</div>
                    <div className="text-xs text-muted-foreground">Evidence uploaded to IPFS network</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs font-semibold text-foreground mb-1">2. CID Generated</div>
                    <div className="text-xs text-muted-foreground">Unique hash created for file</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-xs font-semibold text-foreground mb-1">3. CID on Blockchain</div>
                    <div className="text-xs text-muted-foreground">CID stored in smart contract</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  This separation ensures efficiency: small metadata on-chain, large files off-chain but verifiable
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the movement for transparent, accountable, and trustworthy reporting
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-primary shadow-glow text-lg px-12 hover:scale-105 transition-transform"
          >
            <Link to="/dashboard">
              Submit Your First Report
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Learn;
