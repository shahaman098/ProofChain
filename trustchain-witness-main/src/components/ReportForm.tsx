import { useState } from "react";
import { Send, AlertCircle, CheckCircle2, Loader2, ShieldOff, ShieldCheck, Upload, X, FileText, Image as ImageIcon, File, Calendar as CalendarIcon, Clock, User, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitReport } from "@/lib/algorand";
import { uploadToIPFS, validateEvidenceFile, getIPFSUrl } from "@/lib/ipfs";
import { cn } from "@/lib/utils";

const ReportForm = () => {
  const { accountAddress, addReport } = useApp();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [incidentDate, setIncidentDate] = useState<Date>();
  const [incidentTime, setIncidentTime] = useState<string>("");
  const [policeRef, setPoliceRef] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [ipfsCid, setIpfsCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Hate Speech",
    "Vandalism",
    "Assault",
    "Harassment",
    "Discrimination",
    "Cyberbullying",
    "Threats",
    "Property Damage",
    "Other"
  ];

  // Combine date and time for submission
  const getIncidentDateTime = () => {
    if (!incidentDate) return undefined;
    if (!incidentTime) return incidentDate;
    
    const [hours, minutes] = incidentTime.split(':');
    const dateTime = new Date(incidentDate);
    dateTime.setHours(parseInt(hours), parseInt(minutes));
    return dateTime;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateEvidenceFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return ImageIcon;
    if (file.type === 'application/pdf') return FileText;
    return File;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountAddress) {
      setError("Please connect your wallet first");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a report message");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setTxId(null);
    setIpfsCid(null);

    try {
      let evidenceCid: string | undefined;

      // Upload evidence to IPFS if a file is selected
      if (selectedFile) {
        setIsUploading(true);
        try {
          evidenceCid = await uploadToIPFS(selectedFile);
          setIpfsCid(evidenceCid);
        } catch (uploadError) {
          setError("Failed to upload evidence to IPFS. Submitting report without evidence.");
          console.error(uploadError);
        } finally {
          setIsUploading(false);
        }
      }

      // Submit report to blockchain
      const incidentDateTime = getIncidentDateTime();
      const transactionId = await submitReport(
        message, 
        accountAddress!, 
        isAnonymous,
        policeRef || undefined,
        evidenceCid,
        incidentDateTime
      );
      
      setTxId(transactionId);
      
      // Add report to global state for instant dashboard update
      addReport({
        id: transactionId,
        txId: transactionId,
        submitter: isAnonymous ? "Anonymous" : accountAddress!,
        isAnonymous,
        category: category || "Other",
        message,
        location: location || undefined,
        timestamp: new Date().toISOString(),
        incidentDate: incidentDate?.toISOString().split('T')[0],
        incidentTime: incidentTime || undefined,
        policeRef: policeRef || undefined,
        ipfsCid: evidenceCid,
        verified: false,
        status: 'Pending',
        trustScore: 5,
        name: isAnonymous ? undefined : name || undefined,
        contact: isAnonymous ? undefined : contact || undefined,
      });
      
      // Reset form
      setName("");
      setContact("");
      setCategory("");
      setMessage("");
      setLocation("");
      setIncidentDate(undefined);
      setIncidentTime("");
      setPoliceRef("");
      setSelectedFile(null);
      
      // Show success toast
      toast({
        title: "Report Submitted Successfully",
        description: "Your report has been recorded on the blockchain",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-lg border-border hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="hover:bg-muted/30 transition-colors duration-200">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Send className="h-5 w-5 text-primary" />
          Submit a Report
        </CardTitle>
        <CardDescription>
          Securely record hate crime incidents on the Algorand blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Info (Optional unless anonymous) */}
          {!isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Name <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background border-input transition-all hover:border-primary hover:shadow-md"
                  disabled={isSubmitting || isUploading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Contact Number <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="+44 7XXX XXXXXX"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="bg-background border-input transition-all hover:border-primary hover:shadow-md"
                  disabled={isSubmitting || isUploading}
                />
              </div>
            </div>
          )}

          {/* Step 1: Anonymous Mode - Moved to top */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border transition-all hover:shadow-md hover:border-primary/50 group">
              <div className="flex items-center gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                {isAnonymous ? (
                  <ShieldOff className="h-5 w-5 text-warning transition-transform group-hover:scale-110" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                )}
                <div>
                  <Label htmlFor="anonymous-mode" className="text-sm font-medium cursor-pointer text-foreground">
                    Anonymous Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {isAnonymous ? "Your identity will be protected" : "Your wallet address will be visible"}
                  </p>
                </div>
              </div>
              <Switch
                id="anonymous-mode"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
                disabled={isSubmitting || isUploading}
              />
            </div>
          </div>

          {/* Step 2: Incident Category */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Label htmlFor="category" className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
              Incident Category *
            </Label>
            <Select value={category} onValueChange={setCategory} disabled={isSubmitting || isUploading}>
              <SelectTrigger className="bg-background border-input transition-all hover:border-primary hover:shadow-md">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Step 3: Incident Description */}
          <div className="space-y-2">
            <Label htmlFor="report-message" className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
              Incident Description *
            </Label>
            <Textarea
              id="report-message"
              placeholder="Describe the incident in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none bg-background border-input transition-all focus:shadow-md"
              disabled={isSubmitting || isUploading}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {message.length} / 500 characters
            </p>
          </div>

          {/* Step 4: Location */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Label htmlFor="location" className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
              <MapPin className="h-4 w-4 text-primary" />
              Location <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="City / Region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-background border-input transition-all hover:border-primary hover:shadow-md"
              disabled={isSubmitting || isUploading}
            />
          </div>

          {/* Step 5: Incident Date & Time */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Label className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">5</span>
              Incident Date & Time <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background border-input transition-all hover:border-primary hover:shadow-md group",
                      !incidentDate && "text-muted-foreground"
                    )}
                    disabled={isSubmitting || isUploading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                    {incidentDate ? format(incidentDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 animate-scale-in" align="start">
                  <Calendar
                    mode="single"
                    selected={incidentDate}
                    onSelect={setIncidentDate}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              {/* Time Picker */}
              <div className="relative group">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors pointer-events-none" />
                <Input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="pl-10 bg-background border-input transition-all hover:border-primary hover:shadow-md"
                  disabled={isSubmitting || isUploading}
                  placeholder="Select time"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-primary animate-pulse"></span>
              When did the incident occur?
            </p>
          </div>

          {/* Step 6: Police Reference Number */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Label htmlFor="police-ref" className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">6</span>
              Police Reference Number <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="police-ref"
              type="text"
              placeholder="e.g., REF123456789"
              value={policeRef}
              onChange={(e) => setPoliceRef(e.target.value)}
              className="bg-background border-input transition-all hover:border-primary hover:shadow-md focus:scale-[1.01]"
              disabled={isSubmitting || isUploading}
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-primary animate-pulse"></span>
              Include if you've already filed a police report
            </p>
          </div>

          {/* Step 7: Attach Evidence */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Label htmlFor="evidence-upload" className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">7</span>
              Attach Evidence <span className="text-muted-foreground">(Optional)</span>
            </Label>
            
            {!selectedFile ? (
              <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer bg-muted/30 group">
                <input
                  id="evidence-upload"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting || isUploading}
                />
                <label htmlFor="evidence-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                  <p className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    Click to upload evidence
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPG, PNG, DOCX (max 10MB)
                  </p>
                </label>
              </div>
            ) : (
              <div className="border border-border rounded-lg p-4 bg-muted/30 animate-scale-in hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const FileIcon = getFileIcon(selectedFile);
                      return <FileIcon className="h-8 w-8 text-primary" />;
                    })()}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    disabled={isSubmitting || isUploading}
                    className="hover:bg-destructive/10 hover:text-destructive transition-all hover:scale-110"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-primary animate-pulse"></span>
              Files stored securely on IPFS (decentralized storage)
            </p>
          </div>

          <Button
            type="submit"
            disabled={!accountAddress || isSubmitting || isUploading || !message.trim() || !category}
            className="w-full bg-gradient-primary shadow-glow transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group animate-fade-in"
            style={{ animationDelay: '0.7s' }}
            size="lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading Evidence to IPFS...
              </>
            ) : isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting to Blockchain...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Submit Report to Blockchain
              </>
            )}
          </Button>
        </form>

        {txId && (
          <Alert className="bg-success/10 border-success text-success-foreground animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">✅ Report submitted successfully!</p>
                <p className="text-xs font-mono break-all">
                  Transaction ID: {txId}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://testnet.algoexplorer.io/tx/${txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline hover:no-underline inline-flex items-center gap-1"
                  >
                    View on AlgoExplorer →
                  </a>
                  {ipfsCid && (
                    <a
                      href={getIPFSUrl(ipfsCid)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline hover:no-underline inline-flex items-center gap-1"
                    >
                      📎 View Evidence →
                    </a>
                  )}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportForm;
