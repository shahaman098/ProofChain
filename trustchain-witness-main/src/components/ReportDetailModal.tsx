import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Calendar as CalendarIcon, MapPin, User, Phone, Shield, FileText, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getIPFSUrl } from "@/lib/ipfs";

export interface Report {
  id: string;
  name?: string;
  contact?: string;
  category: string;
  message: string;
  location?: string;
  incidentDate?: string;
  incidentTime?: string;
  timestamp: string;
  isAnonymous: boolean;
  verified: boolean;
  txId: string;
  policeRef?: string;
  ipfsCid?: string;
  trustScore?: number;
  status: "Confirmed" | "Pending" | "Under Review";
}

interface ReportDetailModalProps {
  report: Report | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReportDetailModal = ({ report, open, onOpenChange }: ReportDetailModalProps) => {
  const [copiedTxId, setCopiedTxId] = useState(false);
  const { toast } = useToast();

  if (!report) return null;

  const copyTxId = async () => {
    try {
      await navigator.clipboard.writeText(report.txId);
      setCopiedTxId(true);
      toast({
        title: "Copied!",
        description: "Transaction ID copied to clipboard",
      });
      setTimeout(() => setCopiedTxId(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            Report #{report.id} - Full Details
          </DialogTitle>
          <DialogDescription>
            Complete incident information recorded on Algorand TestNet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {report.verified && (
              <Badge className="bg-success text-success-foreground gap-1">
                <CheckCircle className="h-3 w-3" />
                Verified
              </Badge>
            )}
            {report.isAnonymous && (
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                Anonymous
              </Badge>
            )}
            <Badge variant="outline" className="gap-1">
              {report.category}
            </Badge>
            <Badge className="bg-primary/10 text-primary gap-1">
              ⛓️ {report.status} on TestNet
            </Badge>
          </div>

          {/* Submitter Info */}
          {!report.isAnonymous && (report.name || report.contact) && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-sm text-foreground mb-2">Submitter Information</h3>
              {report.name && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{report.name}</span>
                </div>
              )}
              {report.contact && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="font-medium">{report.contact}</span>
                </div>
              )}
            </div>
          )}

          {/* Incident Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-foreground">Incident Details</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">{report.message}</p>
            </div>
          </div>

          {/* Location & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.location && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{report.location}</span>
                </div>
              </div>
            )}
            {report.incidentDate && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {new Date(report.incidentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {report.incidentTime && ` at ${report.incidentTime}`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Police Reference */}
          {report.policeRef && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Police Reference:</span>
                <Badge variant="outline" className="font-mono">
                  👮 {report.policeRef}
                </Badge>
              </div>
            </div>
          )}

          {/* TrustScore Impact */}
          {report.trustScore && (
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">TrustScore Impact</h3>
                  <p className="text-xs text-muted-foreground">Community verification value</p>
                </div>
                <div className="text-2xl font-bold text-primary">+{report.trustScore}</div>
              </div>
            </div>
          )}

          {/* Blockchain Information */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm text-foreground mb-2">Blockchain Verification</h3>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID:</span>
              <div className="flex items-center gap-2">
                <code className="font-mono text-xs bg-background px-2 py-1 rounded">{report.txId}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={copyTxId}
                >
                  {copiedTxId ? (
                    <Check className="h-3 w-3 text-success" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Submitted:</span>
              <span className="font-medium">{report.timestamp}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                asChild
              >
                <a
                  href={`https://testnet.algoexplorer.io/tx/${report.txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on AlgoExplorer
                </a>
              </Button>
              {report.ipfsCid && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  asChild
                >
                  <a
                    href={getIPFSUrl(report.ipfsCid)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📎 View Evidence on IPFS
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Verification Log */}
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-sm text-foreground mb-2">Verification Log</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{report.timestamp} - Report submitted to blockchain</span>
              </div>
              {report.verified && (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-3 w-3" />
                  <span>Verified by community validators</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailModal;
