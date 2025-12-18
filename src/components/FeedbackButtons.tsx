import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FEEDBACK_KEY = 'yanlik_message_feedback';

interface FeedbackButtonsProps {
  messageId: string;
  onReport?: () => void;
}

interface FeedbackData {
  [key: string]: 'up' | 'down';
}

export const FeedbackButtons = ({ messageId, onReport }: FeedbackButtonsProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(() => {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    if (stored) {
      const data: FeedbackData = JSON.parse(stored);
      return data[messageId] || null;
    }
    return null;
  });
  const { toast } = useToast();

  const saveFeedback = (type: 'up' | 'down') => {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    const data: FeedbackData = stored ? JSON.parse(stored) : {};
    data[messageId] = type;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(data));
  };

  const handleFeedback = (type: 'up' | 'down') => {
    if (feedback === type) {
      // Remove feedback
      setFeedback(null);
      const stored = localStorage.getItem(FEEDBACK_KEY);
      if (stored) {
        const data: FeedbackData = JSON.parse(stored);
        delete data[messageId];
        localStorage.setItem(FEEDBACK_KEY, JSON.stringify(data));
      }
      return;
    }

    setFeedback(type);
    saveFeedback(type);

    if (type === 'up') {
      toast({
        title: '👍 Teşekkürler!',
        description: 'Geri bildiriminiz kaydedildi.',
      });
    } else {
      toast({
        title: '👎 Geri Bildirim',
        description: 'Bu yanıtı iyileştirmemize yardımcı olun.',
        action: onReport ? (
          <Button variant="outline" size="sm" onClick={onReport}>
            Bildir
          </Button>
        ) : undefined,
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={`h-6 w-6 p-0 hover:bg-green-500/10 ${
          feedback === 'up' ? 'text-green-500 bg-green-500/10' : ''
        }`}
        onClick={() => handleFeedback('up')}
        title="Beğen"
      >
        <ThumbsUp className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-6 w-6 p-0 hover:bg-red-500/10 ${
          feedback === 'down' ? 'text-red-500 bg-red-500/10' : ''
        }`}
        onClick={() => handleFeedback('down')}
        title="Beğenme"
      >
        <ThumbsDown className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default FeedbackButtons;
