import { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ANNOUNCEMENTS_KEY = 'yanlik_dismissed_announcements';

interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  link?: string;
  linkText?: string;
}

// Current announcements - can be updated
const CURRENT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'v1-launch-2025',
    message: '🚀 Yanlik v1.0 yayında! 400+ bilgi kategorisi, offline AI ve daha fazlası.',
    type: 'success',
  },
];

export const AnnouncementBar = () => {
  const [visibleAnnouncements, setVisibleAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const dismissed = JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY) || '[]');
    const visible = CURRENT_ANNOUNCEMENTS.filter(a => !dismissed.includes(a.id));
    setVisibleAnnouncements(visible);
  }, []);

  const dismissAnnouncement = (id: string) => {
    const dismissed = JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY) || '[]');
    dismissed.push(id);
    localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(dismissed));
    setVisibleAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  if (visibleAnnouncements.length === 0) return null;

  const announcement = visibleAnnouncements[0];
  
  const bgColor = {
    info: 'bg-primary/10 border-primary/20 text-primary',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400',
    success: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
  }[announcement.type];

  return (
    <div className={`relative border-b ${bgColor} animate-fade-in`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Megaphone className="w-4 h-4 flex-shrink-0" />
          <p className="text-center">
            {announcement.message}
            {announcement.link && (
              <a 
                href={announcement.link}
                className="ml-2 underline hover:no-underline font-medium"
              >
                {announcement.linkText || 'Daha fazla'}
              </a>
            )}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0 hover:bg-transparent"
            onClick={() => dismissAnnouncement(announcement.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
