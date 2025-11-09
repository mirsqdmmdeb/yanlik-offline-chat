import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Code, Heart, Zap, Globe, Shield } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 animate-fade-in hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="space-y-6">
          {/* Hero Card */}
          <Card className="bg-gradient-to-br from-primary/10 via-card/80 to-card/80 backdrop-blur-sm border-border/50 shadow-xl animate-scale-in">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-4xl font-bold mb-2">Yanlik</CardTitle>
                <CardDescription className="text-lg">Türkçe Odaklı Yapay Zeka Asistanı</CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Yanlik Nedir?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Yanlik, Türkçeye özel olarak optimize edilmiş, modern ve güçlü bir yapay zeka asistanıdır.
                Kullanıcı deneyimini ön planda tutarak tasarlandı.
              </p>
              <p>
                <span className="font-semibold text-primary">mirsqdmmdevs</span> tarafından geliştirilen Yanlik,
                doğal dil işleme teknolojileri kullanarak size en iyi yanıtları sunmayı hedefler.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Code,
                title: 'Modern Teknoloji',
                description: 'React, TypeScript ve modern web teknolojileri ile geliştirildi.',
                gradient: 'from-blue-500 to-cyan-500',
                delay: '0.1s'
              },
              {
                icon: Zap,
                title: 'Hızlı ve Verimli',
                description: 'Optimize edilmiş performans ile anında yanıt alın.',
                gradient: 'from-yellow-500 to-orange-500',
                delay: '0.2s'
              },
              {
                icon: Globe,
                title: 'Türkçe Odaklı',
                description: 'Türkçeye özel olarak optimize edilmiş dil modeli.',
                gradient: 'from-green-500 to-emerald-500',
                delay: '0.3s'
              },
              {
                icon: Shield,
                title: 'Güvenli',
                description: 'Verileriniz güvende, gizliliğiniz korunur.',
                gradient: 'from-purple-500 to-pink-500',
                delay: '0.4s'
              },
            ].map((feature, idx) => (
              <Card 
                key={idx}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Creator Info */}
          <Card className="bg-gradient-to-br from-primary/5 to-card/80 backdrop-blur-sm border-border/50 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Geliştirici
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                Yanlik, <span className="font-bold text-primary text-lg">mirsqdmmdevs</span> tarafından geliştirilmiştir.
              </p>
              <p className="text-sm text-muted-foreground">
                Modern web teknolojileri ve yapay zeka alanında uzmanlaşmış bir geliştirici.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 backdrop-blur-sm animate-fade-in-up">
            <CardContent className="pt-6 text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Yanlik ile konuşmaya başlamak için giriş yapın.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Hemen Başla
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
