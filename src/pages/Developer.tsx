import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Code, Heart, Sparkles, Github, Instagram, Globe, Mail } from 'lucide-react';

const Developer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">mirsqdmmdevs</h1>
          <p className="text-xl text-muted-foreground">Yanlik'in Yaratıcısı</p>
        </div>

        {/* About Section */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-border/50 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Hakkında
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Merhaba! Ben mirsqdmmdevs. Yazılım geliştirme, yapay zeka ve modern web teknolojileri 
              konularında tutkulu bir geliştiriciyim. Yanlik, tarayıcıda tamamen offline çalışabilen 
              bir AI asistanı geliştirme vizyonumun bir parçası.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Bu proje, kullanıcı gizliliğine önem veren, internet gerektirmeyen ve herkesin 
              erişebileceği bir AI deneyimi sunmayı hedefliyor. Tüm veriler cihazınızda kalır, 
              hiçbir şey buluta gönderilmez.
            </p>
          </CardContent>
        </Card>

        {/* Vision Section */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Vizyon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">🔒 Gizlilik Öncelikli</h3>
                <p className="text-sm text-muted-foreground">
                  Verileriniz size aittir. Hiçbir konuşma veya kişisel bilgi sunuculara gönderilmez.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">🌐 Offline Çalışma</h3>
                <p className="text-sm text-muted-foreground">
                  İnternet bağlantısı olmadan bile tam fonksiyonel bir AI deneyimi.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">🇹🇷 Türkçe Odaklı</h3>
                <p className="text-sm text-muted-foreground">
                  Türk kullanıcılar için optimize edilmiş, yerel dil ve kültür desteği.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2">♿ Erişilebilirlik</h3>
                <p className="text-sm text-muted-foreground">
                  Herkes için erişilebilir, ücretsiz ve kullanımı kolay bir arayüz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Teknoloji Yığını
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI',
                'IndexedDB', 'Web Speech API', 'React Router', 'Lucide Icons'
              ].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mb-6 bg-card/80 backdrop-blur-sm border-border/50 animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle>İletişim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://github.com/mirsqdmmdeb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">@mirsqdmmdeb</p>
                </div>
              </a>
              <a
                href="https://instagram.com/mirsqdmmdevs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-muted-foreground">@mirsqdmmdevs</p>
                </div>
              </a>
              <a
                href="https://yanlikai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Globe className="w-5 h-5" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-sm text-muted-foreground">yanlikai.vercel.app</p>
                </div>
              </a>
              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <div>
                  <p className="font-medium">E-posta</p>
                  <p className="text-sm text-muted-foreground">DMCA/İletişim</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Geliştirici Sorumluluk Reddi:</strong> mirsqdmmdevs, Yanlik'in ürettiği 
              içeriklerden kaynaklanan hatalardan veya yanlış bilgilerden sorumlu tutulamaz. 
              Bu proje eğitim amaçlıdır.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Developer;
