import { FileText, Shield, Eye, CheckCircle, Copy, Check, Calendar as CalendarIcon, Clock, MapPin, TrendingUp, BarChart3, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { getIPFSUrl } from "@/lib/ipfs";
import ReportDetailModal, { Report } from "./ReportDetailModal";

// Mock data for demonstration
const mockReports: Report[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    contact: "+44 7XXX XXXXXX",
    category: "Harassment",
    message: "Witnessed verbal harassment based on religious identity in public transport. The incident occurred on the Northern Line during evening rush hour. Multiple passengers were present.",
    location: "London, Camden",
    incidentDate: "2025-01-14",
    incidentTime: "14:30",
    timestamp: "2025-01-15 14:30",
    isAnonymous: false,
    verified: true,
    txId: "XYZ123ABC456",
    policeRef: "REF20250115A",
    ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    trustScore: 5,
    status: "Confirmed",
  },
  {
    id: "2",
    category: "Vandalism",
    message: "Graffiti with hate symbols discovered at community center. Property damage included offensive imagery targeting minority groups.",
    location: "Birmingham",
    incidentDate: "2025-01-13",
    incidentTime: "09:15",
    timestamp: "2025-01-14 09:15",
    isAnonymous: true,
    verified: true,
    txId: "DEF789GHI012",
    ipfsCid: "bafkreiabcd1234567890abcdef1234567890abcdef1234567890abcdef12",
    trustScore: 8,
    status: "Confirmed",
  },
  {
    id: "3",
    name: "Anonymous Citizen",
    category: "Cyberbullying",
    message: "Online harassment targeting LGBTQ+ individuals on social media platform. Sustained campaign of abuse and threatening messages.",
    location: "Manchester",
    incidentDate: "2025-01-13",
    incidentTime: "18:45",
    timestamp: "2025-01-13 18:45",
    isAnonymous: false,
    verified: false,
    txId: "JKL345MNO678",
    trustScore: 3,
    status: "Under Review",
  },
  {
    id: "4",
    category: "Assault",
    message: "Physical assault motivated by racial hatred. Victim required medical attention. Multiple witnesses available.",
    location: "Leeds",
    incidentDate: "2025-01-12",
    incidentTime: "22:00",
    timestamp: "2025-01-13 10:20",
    isAnonymous: true,
    verified: true,
    txId: "PQR901STU234",
    policeRef: "REF20250113B",
    trustScore: 10,
    status: "Confirmed",
  },
  {
    id: "5",
    name: "Community Reporter",
    contact: "+44 7YYY YYYYYY",
    category: "Hate Speech",
    message: "Public demonstration with hate speech banners. Event documented with photos and video evidence.",
    location: "Bristol",
    incidentDate: "2025-01-11",
    incidentTime: "15:00",
    timestamp: "2025-01-12 09:00",
    isAnonymous: false,
    verified: true,
    txId: "VWX567YZA890",
    ipfsCid: "bafkreixyz9876543210abcdef9876543210abcdef9876543210abcdef98",
    trustScore: 7,
    status: "Confirmed",
  },
  {
    id: "6",
    category: "Discrimination",
    message: "Employment discrimination based on religious background. Evidence includes email correspondence and witness statements.",
    location: "Edinburgh",
    incidentDate: "2025-01-10",
    timestamp: "2025-01-11 14:30",
    isAnonymous: true,
    verified: false,
    txId: "BCD123EFG456",
    trustScore: 4,
    status: "Pending",
  },
];

const Dashboard = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const { toast } = useToast();
  const { reports, totalReports, anonymousReports, verifiedReports, totalTrustScore } = useApp();

  // Combine mock reports with real reports for demo (real reports first)
  const allReports = useMemo(() => [...reports, ...mockReports], [reports]);

  const copyTxId = async (txId: string) => {
    try {
      await navigator.clipboard.writeText(txId);
      setCopiedId(txId);
      toast({
        title: "Copied!",
        description: "Transaction ID copied to clipboard",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const openDetailModal = (report: Report) => {
    setSelectedReport(report);
    setDetailModalOpen(true);
  };

  // Calculate combined stats
  const combinedTotalReports = totalReports + mockReports.length;
  const combinedAnonymousReports = anonymousReports + mockReports.filter(r => r.isAnonymous).length;
  const combinedVerifiedReports = verifiedReports + mockReports.filter(r => r.verified).length;
  const combinedTrustScore = totalTrustScore + mockReports.reduce((acc, r) => acc + (r.trustScore || 0), 0);

  // Category breakdown for simple chart
  const categoryCount: Record<string, number> = {};
  allReports.forEach(report => {
    categoryCount[report.category] = (categoryCount[report.category] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">TrustChain Report Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Community-submitted incidents recorded on Algorand TestNet
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{combinedTotalReports}</div>
            <p className="text-xs text-muted-foreground mt-1">Submitted to blockchain</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning group-hover:scale-110 transition-transform" />
              Anonymous Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{combinedAnonymousReports}</div>
            <p className="text-xs text-muted-foreground mt-1">Identity protected</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success group-hover:scale-110 transition-transform" />
              Verified Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{combinedVerifiedReports}</div>
            <p className="text-xs text-muted-foreground mt-1">Community validated</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              TrustScore Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">+{combinedTrustScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Community value added</p>
          </CardContent>
        </Card>
      </div>

      {/* Simple Category Chart */}
      <Card className="bg-gradient-card border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Reports by Category
          </CardTitle>
          <CardDescription>Distribution of incident types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categoryCount).map(([category, count], index) => {
              const percentage = (count / combinedTotalReports) * 100;
              return (
                <div key={category} className="space-y-1 animate-fade-in" style={{ animationDelay: `${0.5 + index * 0.05}s` }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{category}</span>
                    <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out hover:bg-primary/80"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Cards Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Recent Incident Reports
        </h3>

      {allReports.length === 0 ? (
        <Card className="bg-gradient-card shadow-md border-border animate-fade-in">
          <CardContent className="text-center py-12">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No reports yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your submission helps build safer communities. Submit the first report to get started.
            </p>
          </CardContent>
        </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {allReports.map((report, index) => (
              <Card 
                key={report.id} 
                className="bg-gradient-card shadow-md border-border hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group animate-fade-in cursor-pointer" 
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
                onClick={() => openDetailModal(report)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <FileText className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-semibold mb-1 text-foreground">
                          Report #{report.id}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mb-2">
                          {report.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {report.verified && (
                        <Badge className="bg-success text-success-foreground gap-1 text-xs">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {report.isAnonymous && (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Shield className="h-3 w-3" />
                          Anonymous
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-sm line-clamp-2 mt-2">
                    {report.message}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Location & Date */}
                  <div className="space-y-2">
                    {report.location && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span>{report.location}</span>
                      </div>
                    )}
                    {report.incidentDate && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3 text-primary" />
                        <span>
                          {new Date(report.incidentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {report.incidentTime && (
                            <>
                              <Clock className="h-3 w-3 inline mx-1" />
                              {report.incidentTime}
                            </>
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Police Ref & TrustScore */}
                  <div className="flex flex-wrap gap-2">
                    {report.policeRef && (
                      <Badge variant="outline" className="text-xs bg-muted">
                        👮 {report.policeRef}
                      </Badge>
                    )}
                    {report.trustScore && (
                      <Badge className="text-xs bg-primary/10 text-primary">
                        +{report.trustScore} TrustScore
                      </Badge>
                    )}
                  </div>

                  {/* Transaction Info */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-muted-foreground">
                        {report.txId.slice(0, 8)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyTxId(report.txId);
                        }}
                      >
                        {copiedId === report.txId ? (
                          <Check className="h-3 w-3 text-success" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ⛓️ {report.status}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs hover:bg-primary/10 hover:text-primary hover:border-primary group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal(report);
                      }}
                    >
                      View Details
                      <Eye className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    {report.ipfsCid && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs hover:bg-primary/10 hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(getIPFSUrl(report.ipfsCid!), '_blank');
                        }}
                      >
                        📎
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-primary/10 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://testnet.algoexplorer.io/tx/${report.txId}`, '_blank');
                      }}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      <ReportDetailModal
        report={selectedReport}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />
    </div>
  );
};

export default Dashboard;
