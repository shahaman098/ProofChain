import { Shield, Wallet, LogOut, Home, BarChart3, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NavBarProps {
  accountAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

const NavBar = ({ accountAddress, onConnect, onDisconnect }: NavBarProps) => {
  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">🛡️ TrustChain</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Learn</span>
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
            </div>

            {/* Wallet Connection */}
            {accountAddress ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-mono text-secondary-foreground">
                    {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={onDisconnect}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </Button>
              </>
            ) : (
              <Button onClick={onConnect} className="bg-gradient-primary shadow-glow">
                <Wallet className="h-4 w-4" />
                Connect Pera Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
