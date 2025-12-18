import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Flag, CheckCircle } from 'lucide-react';

interface AbuseReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageContent?: string;
}

const REPORT_TYPES = [
  { value: 'inappropriate', label: 'Uygunsuz İçerik' },
  { value: 'harmful', label: 'Zararlı/Tehlikeli Bilgi' },
  { value: 'incorrect', label: 'Yanlış/Yanıltıcı Bilgi' },
  { value: 'offensive', label: 'Hakaret/Ayrımcılık' },
  { value: 'other', label: 'Diğer' },
];

const REPORTS_KEY = 'yanlik_abuse_reports';

export const AbuseReportDialog = ({ open, onOpenChange, messageContent }: AbuseReportDialogProps) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!reportType) {
      toast({
        title: 'Hata',
        description: 'Lütfen bir rapor türü seçin.',
        variant: 'destructive',
      });
      return;
    }

    // Save report locally
    const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
    reports.push({
      id: Date.now(),
      type: reportType,
      description,
      messageContent: messageContent?.substring(0, 500),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));

    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setReportType('');
      setDescription('');
      onOpenChange(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Teşekkürler!</h3>
            <p className="text-muted-foreground text-center">
              Raporunuz kaydedildi. Geri bildiriminiz için teşekkür ederiz.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <Flag className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>İçerik Bildir</DialogTitle>
              <DialogDescription>
                Uygunsuz AI cevabını bildirin
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Rapor Türü</Label>
            <RadioGroup value={reportType} onValueChange={setReportType}>
              {REPORT_TYPES.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="font-normal">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama (Opsiyonel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Sorunu daha detaylı açıklayın..."
              rows={3}
            />
          </div>

          {messageContent && (
            <div className="p-3 rounded-lg bg-secondary/50 text-sm">
              <p className="text-xs text-muted-foreground mb-1">Bildirilen mesaj:</p>
              <p className="line-clamp-3">{messageContent}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleSubmit} variant="destructive">
            Gönder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AbuseReportDialog;
