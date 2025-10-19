import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";
import NavBar from "@/components/NavBar";
import ReportForm from "@/components/ReportForm";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/Analytics";

const DashboardPage = () => {
  const { accountAddress, isConnecting, connectWallet, disconnectWallet } = useApp();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: `Connected to ${accountAddress?.slice(0, 6)}...${accountAddress?.slice(-4)}`,
      });
    } catch (error) {
      console.error("Failed to connect:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading TrustChain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar
        accountAddress={accountAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            <ReportForm />
            <Analytics />
          </div>

          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
