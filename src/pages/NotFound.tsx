import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-destructive/5">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-destructive/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-muted/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* 404 Icon */}
          <div className="animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 mb-6 animate-pulse-glow">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* 404 Text */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-destructive to-destructive/60 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-foreground">
              Yanlik Burada Bir Şey Bulamadı 😅
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfaya dönüp yeniden deneyebilirsiniz.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg"
              onClick={() => navigate('/')}
              className="min-w-[200px] shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Home className="mr-2 h-5 w-5" />
              Ana Sayfa
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/chat')}
              className="min-w-[200px] shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Search className="mr-2 h-5 w-5" />
              Sohbete Git
            </Button>
          </div>

          {/* Error Path */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-muted-foreground/70 font-mono bg-muted/30 px-4 py-2 rounded-lg inline-block">
              Erişilmeye çalışılan: {location.pathname}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
