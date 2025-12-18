import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ChevronRight, ChevronLeft, Sparkles, Keyboard, Mic, Star, Settings } from 'lucide-react';

const ONBOARDING_KEY = 'yanlik_onboarding_completed';

interface TourStep {
  title: string;
  description: string;
  icon: React.ElementType;
  position?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Yanlik\'e Hoş Geldiniz!',
    description: 'Tarayıcınızda çalışan offline yapay zeka asistanı. İnternet gerekmez, verileriniz cihazınızda kalır.',
    icon: Sparkles,
  },
  {
    title: 'Klavye Kısayolları',
    description: 'Ctrl+K ile arama yapın, Ctrl+F ile favorilere erişin. Enter ile mesaj gönderin, Shift+Enter ile yeni satır ekleyin.',
    icon: Keyboard,
  },
  {
    title: 'Sesli Asistan',
    description: 'Mikrofon butonuna tıklayarak sesli soru sorabilirsiniz. AI cevaplarını sesli dinleme seçeneği de mevcut.',
    icon: Mic,
  },
  {
    title: 'Favoriler',
    description: 'Önemli mesajları yıldızlayarak favorilere ekleyin. Daha sonra kolayca erişebilirsiniz.',
    icon: Star,
  },
  {
    title: 'Kişiselleştirme',
    description: 'Ayarlar\'dan tema, yazı boyutu ve diğer tercihleri değiştirebilirsiniz.',
    icon: Settings,
  },
];

export const OnboardingTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsVisible(false);
  };

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <Card className="relative max-w-md mx-4 p-6 bg-card border-2 border-primary/20 shadow-2xl animate-scale-in">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Step indicator */}
        <div className="flex justify-center gap-1 mb-6">
          {TOUR_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep 
                  ? 'w-6 bg-primary' 
                  : idx < currentStep 
                    ? 'w-1.5 bg-primary/50' 
                    : 'w-1.5 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Geri
          </Button>
          
          <Button variant="link" onClick={handleSkip} className="text-muted-foreground">
            Atla
          </Button>
          
          <Button onClick={handleNext}>
            {currentStep === TOUR_STEPS.length - 1 ? 'Başla' : 'İleri'}
            {currentStep < TOUR_STEPS.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingTour;
