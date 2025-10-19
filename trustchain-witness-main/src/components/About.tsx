import { Shield, Lock, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Immutable Records",
    description: "All reports are permanently stored on the Algorand blockchain, ensuring they cannot be altered or deleted.",
  },
  {
    icon: Lock,
    title: "Privacy & Anonymity",
    description: "Report incidents anonymously while maintaining the integrity and verifiability of each submission.",
  },
  {
    icon: Eye,
    title: "Transparent & Auditable",
    description: "Every transaction is publicly verifiable on the blockchain, creating an accountable system.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Empowering communities to document and track hate crimes through decentralized technology.",
  },
];

const About = () => {
  return (
    <section className="py-12 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How Blockchain Ensures Trust
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            TrustChain leverages Algorand's blockchain technology to create a transparent,
            immutable, and decentralized platform for reporting hate crimes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card shadow-md border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-4 shadow-glow">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
          <p className="mb-2">
            Built for the <span className="font-semibold text-foreground">EasyA × Algorand London Hackathon 2025</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Powered by Algorand TestNet | Secured by blockchain technology
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
