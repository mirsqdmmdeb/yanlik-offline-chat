import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Lock, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Giriş başarılı!",
        description: "Yanlik'e hoş geldiniz.",
      });
      navigate('/chat');
    } else {
      toast({
        title: "Giriş başarısız",
        description: "Kullanıcı adı veya şifre hatalı.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <Button
        variant="ghost"
        className="absolute top-4 left-4 animate-fade-in hover:bg-primary/10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Ana Sayfa
      </Button>

      <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl animate-scale-in">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Yanlik
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Yapay Zeka Asistanınıza Hoş Geldiniz
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Label htmlFor="username" className="text-sm font-medium">
                Kullanıcı Adı
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınızı girin"
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="password" className="text-sm font-medium">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Giriş Yap
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>
              Demo: <span className="font-semibold text-foreground">mirsqdmmdevs</span> / <span className="font-semibold text-foreground">no1hastasi</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground animate-fade-in">
        Created by <span className="font-semibold text-primary">mirsqdmmdevs</span>
      </div>
    </div>
  );
};

export default Login;
