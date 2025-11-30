import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Shield, Globe, ArrowRight, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-scale-in">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-primary">Yeni Nesil Yapay Zeka</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
              Yanlik
              <br />
              <span className="text-3xl md:text-4xl">Tarayıcıda Çalışan Kişisel AI Demo</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              AI, yazılım, trading ve daha fazlası için geliştirilmiş
              <br />
              <span className="font-semibold text-primary">by mirsqdmmdevs</span>
            </p>

            {/* Demo Notice */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg px-6 py-3 max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm text-muted-foreground text-center">
                ⚠️ <strong>Demo Sürüm:</strong> Şu an backend/API yok, sadece arayüz prototipi. Gerçek AI modeli ileriki sürümlerde eklenecek.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Hemen Başla
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/about')}
              >
                Daha Fazla Bilgi
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {[
                { icon: Star, label: 'Premium Kalite', value: '100%' },
                { icon: Zap, label: 'Hızlı Yanıt', value: '<1s' },
                { icon: Shield, label: 'Güvenli', value: '🛡️' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <stat.icon className="w-5 h-5" />
                  <div className="text-sm">
                    <span className="font-bold text-foreground">{stat.value}</span>
                    {' '}
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Öne Çıkan Özellikler</h2>
          <p className="text-xl text-muted-foreground">Yanlik'i özel kılan nedir?</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: 'Akıllı Yanıtlar',
              description: 'Gelişmiş AI ile doğal ve anlamlı konuşmalar',
              gradient: 'from-purple-500 to-pink-500',
              delay: '0s'
            },
            {
              icon: Zap,
              title: 'Hızlı & Verimli',
              description: 'Anında yanıt, kesintisiz deneyim',
              gradient: 'from-yellow-500 to-orange-500',
              delay: '0.1s'
            },
            {
              icon: Shield,
              title: 'Güvenli',
              description: 'Verileriniz size aittir, gizliliğiniz korunur',
              gradient: 'from-green-500 to-emerald-500',
              delay: '0.2s'
            },
            {
              icon: Globe,
              title: 'Türkçe Odaklı',
              description: 'Türkçeye optimize edilmiş, yerel dil desteği',
              gradient: 'from-blue-500 to-cyan-500',
              delay: '0.3s'
            },
          ].map((feature, idx) => (
            <Card 
              key={idx}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 group cursor-pointer animate-scale-in"
              style={{ animationDelay: feature.delay }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Yol Haritası</h2>
          <p className="text-xl text-muted-foreground">Yanlik'in Geleceği</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              version: 'v0.1',
              title: 'Temel Arayüz',
              status: 'Tamamlandı',
              description: 'Chat arayüzü, temel tasarım ve navigasyon',
              color: 'from-green-500 to-emerald-500'
            },
            {
              version: 'v0.2',
              title: 'Gelişmiş Özellikler',
              status: 'Geliştiriliyor',
              description: 'LocalStorage desteği, dark mode, klavye kısayolları',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              version: 'v0.3',
              title: 'Backend Entegrasyonu',
              status: 'Planlanıyor',
              description: 'Gerçek AI modeli, API bağlantısı, kullanıcı yönetimi',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              version: 'v1.0',
              title: 'Tam Fonksiyonel',
              status: 'Gelecek',
              description: 'Ses desteği, çoklu dil, özel AI modelleri, trading özellikleri',
              color: 'from-purple-500 to-pink-500'
            },
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{item.version}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative p-12 text-center space-y-6 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold">Hazır mısınız?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Yanlik ile konuşmaya başlayın ve yapay zekanın gücünü deneyimleyin.
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Ücretsiz Başla
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Yanlik · Created by <span className="font-semibold text-primary">mirsqdmmdevs</span></p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/mirsqdmmdevs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <a 
                href="https://github.com/mirsqdmmdeb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <button
                onClick={() => navigate('/privacy')}
                className="hover:text-primary transition-colors"
              >
                Gizlilik & KVKK
              </button>
              <span>·</span>
              <button
                onClick={() => navigate('/terms')}
                className="hover:text-primary transition-colors"
              >
                Kullanım Şartları
              </button>
            </div>
          </div>
          <p className="text-xs text-center mt-4 text-muted-foreground/70">
            Bu site öğrenme amaçlıdır. Hiçbir içerik finansal veya tıbbi tavsiye değildir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
