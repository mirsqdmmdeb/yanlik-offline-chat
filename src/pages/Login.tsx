import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Lock, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(loginUsername, loginPassword);
    
    if (result.success) {
      toast({
        title: "Giriş başarılı!",
        description: "Yanlik'e hoş geldiniz.",
      });
      navigate('/chat');
    } else {
      toast({
        title: "Giriş başarısız",
        description: result.error || "Kullanıcı adı veya şifre hatalı.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== signupPasswordConfirm) {
      toast({
        title: "Şifreler uyuşmuyor",
        description: "Lütfen aynı şifreyi iki kez girin.",
        variant: "destructive",
      });
      return;
    }

    const result = await signup(signupUsername, signupPassword);
    
    if (result.success) {
      toast({
        title: "Kayıt başarılı!",
        description: "Hesabınız oluşturuldu. Hoş geldiniz!",
      });
      navigate('/chat');
    } else {
      toast({
        title: "Kayıt başarısız",
        description: result.error || "Bir hata oluştu.",
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
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="login-username" className="text-sm font-medium">
                    Kullanıcı Adı
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="login-username"
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="Kullanıcı adınızı girin"
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <Label htmlFor="login-password" className="text-sm font-medium">
                    Şifre
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Şifrenizi girin"
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  Giriş Yap
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="signup-username" className="text-sm font-medium">
                    Kullanıcı Adı
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-username"
                      type="text"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      placeholder="En az 3 karakter"
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                      required
                      minLength={3}
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <Label htmlFor="signup-password" className="text-sm font-medium">
                    Şifre
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="En az 6 karakter"
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Label htmlFor="signup-password-confirm" className="text-sm font-medium">
                    Şifre Tekrar
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-password-confirm"
                      type="password"
                      value={signupPasswordConfirm}
                      onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                      placeholder="Şifrenizi tekrar girin"
                      className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  Kayıt Ol
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground animate-fade-in">
        Created by <span className="font-semibold text-primary">mirsqdmmdevs</span>
      </div>
    </div>
  );
};

export default Login;
