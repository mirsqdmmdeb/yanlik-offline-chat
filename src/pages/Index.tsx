import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Shield, Brain } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo & Title */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 animate-scale-in shadow-lg">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Yanlik
            </h1>
            <p className="text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Yapay Zeka Asistanınız
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg">
              <Sparkles className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Akıllı Yanıtlar</h3>
              <p className="text-sm text-muted-foreground">Gelişmiş AI teknolojisi ile hızlı ve doğru cevaplar</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg" style={{ animationDelay: '0.1s' }}>
              <Zap className="w-8 h-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Çevrimdışı Çalışma</h3>
              <p className="text-sm text-muted-foreground">İnternet bağlantısı olmadan bile kullanabilirsiniz</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg" style={{ animationDelay: '0.2s' }}>
              <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Güvenli & Özel</h3>
              <p className="text-sm text-muted-foreground">Verileriniz tamamen güvende ve gizli</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Hemen Başla
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Ücretsiz hesap oluşturun ve keşfetmeye başlayın
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
