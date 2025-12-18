import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Rocket, CheckCircle, Circle, Clock, Sparkles } from 'lucide-react';

interface RoadmapItem {
  version: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned' | 'future';
  date?: string;
  features: string[];
}

const ROADMAP: RoadmapItem[] = [
  {
    version: 'v0.1',
    title: 'Temel Arayüz',
    status: 'completed',
    date: 'Aralık 2024',
    features: [
      'Chat arayüzü ve temel tasarım',
      'Dark/Light tema desteği',
      'Responsive tasarım',
      'Temel navigasyon',
    ],
  },
  {
    version: 'v0.5',
    title: 'Gelişmiş Özellikler',
    status: 'completed',
    date: 'Ocak 2025',
    features: [
      'IndexedDB ile veri kalıcılığı',
      'Kullanıcı kimlik doğrulama',
      'Çoklu renk teması',
      'Klavye kısayolları',
      'Sesli giriş/çıkış',
    ],
  },
  {
    version: 'v1.0',
    title: 'GPT-6 Offline Engine',
    status: 'in-progress',
    date: 'Şubat 2025',
    features: [
      'Türkiye 81 il bilgi modülü',
      'Hesap makinesi entegrasyonu',
      'Kronometre/zamanlayıcı',
      'Motivasyon modülü',
      '400+ bilgi kategorisi',
      'Slash komut sistemi',
    ],
  },
  {
    version: 'v1.5',
    title: 'Hukuki & Güvenlik',
    status: 'in-progress',
    features: [
      'KVKK/GDPR uyumluluğu',
      'Veri dışa aktarma',
      'Hassas veri filtresi',
      'Yaş doğrulama',
      'Oturum zaman aşımı',
      'Kötüye kullanım bildirimi',
    ],
  },
  {
    version: 'v2.0',
    title: 'PWA & Offline',
    status: 'planned',
    features: [
      'Progressive Web App',
      'Service Workers',
      'Offline önbellekleme',
      'Push bildirimleri',
      'Ana ekrana ekleme',
    ],
  },
  {
    version: 'v2.5',
    title: 'Gelişmiş AI',
    status: 'planned',
    features: [
      'Bağlam farkındalığı iyileştirme',
      'Çok turlu konuşma hafızası',
      'Duygu analizi',
      'Kişiselleştirilmiş yanıtlar',
      'Kod çalıştırma sandbox',
    ],
  },
  {
    version: 'v3.0',
    title: 'Topluluk & Sosyal',
    status: 'future',
    features: [
      'Prompt paylaşım platformu',
      'Topluluk şablonları',
      'Sosyal medya entegrasyonu',
      'Çok kullanıcılı sohbet',
      'Plugin sistemi',
    ],
  },
];

const Roadmap = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'planned':
        return <Circle className="w-5 h-5 text-blue-500" />;
      case 'future':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
    }
  };

  const getStatusText = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'in-progress':
        return 'Geliştiriliyor';
      case 'planned':
        return 'Planlandı';
      case 'future':
        return 'Gelecek';
    }
  };

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-yellow-500 to-orange-500';
      case 'planned':
        return 'from-blue-500 to-cyan-500';
      case 'future':
        return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Yol Haritası</h1>
            <p className="text-muted-foreground">Yanlik'in gelişim planı</p>
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-6 bg-card/80">
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {(['completed', 'in-progress', 'planned', 'future'] as const).map((status) => (
                <div key={status} className="flex items-center gap-2 text-sm">
                  {getStatusIcon(status)}
                  <span className="text-muted-foreground">{getStatusText(status)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-6">
            {ROADMAP.map((item, idx) => (
              <Card 
                key={item.version}
                className={`bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 ${
                  item.status === 'in-progress' ? 'ring-2 ring-yellow-500/50' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    {/* Version badge */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getStatusColor(item.status)} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">{item.version}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          {item.date && (
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                          )}
                          {getStatusIcon(item.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {item.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getStatusColor(item.status)}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Bu yol haritası aktif olarak güncellenmektedir. 
              Önerileriniz için Yanlik'e yazabilirsiniz.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
