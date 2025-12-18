import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, HelpCircle, MessageCircle, Shield, Zap, Database, Mic } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: 'Genel',
    icon: HelpCircle,
    questions: [
      {
        q: 'Yanlik nedir?',
        a: 'Yanlik, tamamen tarayıcınızda çalışan, internet gerektirmeyen bir yapay zeka asistanı demosudur. mirsqdmmdevs tarafından geliştirilmiştir ve 400+ bilgi kategorisinde yardımcı olabilir.',
      },
      {
        q: 'Yanlik ücretsiz mi?',
        a: 'Evet, Yanlik tamamen ücretsizdir. Hiçbir ücret veya abonelik gerektirmez.',
      },
      {
        q: 'Hangi dilleri destekliyor?',
        a: 'Yanlik öncelikli olarak Türkçe için optimize edilmiştir. Ancak İngilizce ve diğer dillerde de temel düzeyde yanıt verebilir.',
      },
      {
        q: 'Mobil cihazlarda çalışır mı?',
        a: 'Evet, Yanlik tüm modern tarayıcılarda ve mobil cihazlarda çalışır. Responsive tasarımı sayesinde her ekran boyutuna uyum sağlar.',
      },
    ],
  },
  {
    category: 'Gizlilik & Güvenlik',
    icon: Shield,
    questions: [
      {
        q: 'Verilerim nerede saklanıyor?',
        a: 'Tüm verileriniz yalnızca cihazınızda (IndexedDB ve LocalStorage) saklanır. Hiçbir veri sunuculara gönderilmez veya bulutta depolanmaz.',
      },
      {
        q: 'Konuşmalarım gizli mi?',
        a: 'Evet, konuşmalarınız tamamen gizlidir. Veriler cihazınızdan çıkmaz ve şifrelenmemiş olsa da sadece sizin erişiminize açıktır.',
      },
      {
        q: 'Verilerimi nasıl silebilirim?',
        a: 'Ayarlar sayfasından "Tüm Verileri Sil" seçeneğini kullanarak tüm verilerinizi kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz.',
      },
      {
        q: 'Çerezler ne için kullanılıyor?',
        a: 'Çerezler yalnızca tema tercihleri ve isteğe bağlı Google Analytics için kullanılır. Analytics\'i ayarlardan kapatabilirsiniz.',
      },
    ],
  },
  {
    category: 'Özellikler',
    icon: Zap,
    questions: [
      {
        q: 'Hangi konularda yardımcı olabilir?',
        a: 'Türkiye\'nin 81 ili, programlama (JavaScript, Python, vb.), matematik hesaplamaları, tarih/coğrafya, bilim, motivasyon sözleri ve 400+ farklı kategoride bilgi sağlayabilir.',
      },
      {
        q: 'Komutlar nasıl kullanılır?',
        a: '/kronometre başlat, /stil formal, /memory add gibi komutlarla özel işlevleri tetikleyebilirsiniz. Komut listesi için "Ne yapabilirsin?" diye sorabilirsiniz.',
      },
      {
        q: 'Favoriler nasıl çalışır?',
        a: 'Herhangi bir mesajın yanındaki yıldız ikonuna tıklayarak favorilere ekleyebilirsiniz. Favorilerinize Ctrl+F ile veya menüden erişebilirsiniz.',
      },
      {
        q: 'Arama özelliği var mı?',
        a: 'Evet, Ctrl+K kısayolu ile tüm sohbet geçmişinizde arama yapabilirsiniz.',
      },
    ],
  },
  {
    category: 'Sesli Asistan',
    icon: Mic,
    questions: [
      {
        q: 'Sesli komut nasıl kullanılır?',
        a: 'Mikrofon butonuna tıklayarak sesli soru sorabilirsiniz. Tarayıcınızın mikrofon iznine sahip olması gerekir.',
      },
      {
        q: 'Yanıtları sesli dinleyebilir miyim?',
        a: 'Evet, her AI mesajının yanındaki hoparlör ikonuna tıklayarak yanıtı sesli dinleyebilirsiniz. Otomatik okuma seçeneği de mevcuttur.',
      },
      {
        q: 'Hangi tarayıcılar destekleniyor?',
        a: 'Web Speech API destekleyen tüm modern tarayıcılar (Chrome, Edge, Safari) sesli özellikleri kullanabilir.',
      },
    ],
  },
  {
    category: 'Teknik',
    icon: Database,
    questions: [
      {
        q: 'İnternet olmadan çalışır mı?',
        a: 'Evet, Yanlik tamamen offline çalışabilir. Sadece ilk yüklemede internet gerekir, sonrasında tüm özellikler internetsiz çalışır.',
      },
      {
        q: 'Hangi AI modeli kullanılıyor?',
        a: 'Yanlik, özel olarak geliştirilmiş GPT-6 Offline Engine simülasyonunu kullanır. Bu, gerçek bir LLM değil, kural tabanlı gelişmiş bir cevap motorudur.',
      },
      {
        q: 'Neden bazen yanlış cevaplar veriyor?',
        a: 'Yanlik bir demo projesidir ve sınırlı bilgi tabanına sahiptir. Gerçek bir AI modeli olmadığı için bazı konularda hata yapabilir. Önemli kararlar için profesyonel kaynaklara başvurun.',
      },
      {
        q: 'Veriler ne kadar yer kaplıyor?',
        a: 'Tipik kullanımda birkaç MB civarında yer kaplar. Admin panelinden depolama kullanımını görebilirsiniz.',
      },
    ],
  },
];

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sıkça Sorulan Sorular</h1>
            <p className="text-muted-foreground">Yanlik hakkında merak edilenler</p>
          </div>
        </div>

        <div className="space-y-6">
          {FAQ_ITEMS.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="w-5 h-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, idx) => (
                      <AccordionItem key={idx} value={`${category.category}-${idx}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Sorunuz burada yok mu?
            </p>
            <Button onClick={() => navigate('/chat')}>
              Yanlik'e Sor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
