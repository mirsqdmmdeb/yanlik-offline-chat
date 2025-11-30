import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Gizlilik Politikası & KVKK</CardTitle>
            <p className="text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Veri Toplama ve Kullanım</h2>
              <p className="leading-relaxed mb-2">
                Yanlik, şu anda tamamen tarayıcı tabanlı bir demo uygulamasıdır. <strong className="text-foreground">Hiçbir kişisel veri sunucuya gönderilmemektedir.</strong>
              </p>
              <p className="leading-relaxed">
                Tüm sohbet geçmişiniz sadece tarayıcınızın yerel depolama alanında (localStorage) saklanır ve yalnızca sizin cihazınızda kalır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. KVKK Uyumluluğu</h2>
              <p className="leading-relaxed mb-2">
                Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, Yanlik:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kişisel verilerinizi toplamaz</li>
                <li>Verilerinizi üçüncü taraflarla paylaşmaz</li>
                <li>Verilerinizi sunucularda saklamaz</li>
                <li>Çerez kullanmaz (zorunlu teknik çerezler hariç)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Yerel Depolama (localStorage)</h2>
              <p className="leading-relaxed mb-2">
                Sohbet geçmişiniz ve tercihleriniz tarayıcınızın localStorage özelliği ile saklanır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Bu veriler sadece sizin cihazınızda bulunur</li>
                <li>İstediğiniz zaman tarayıcı ayarlarından silebilirsiniz</li>
                <li>Farklı cihazlar arasında senkronize edilmez</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Güvenlik</h2>
              <p className="leading-relaxed">
                Yanlik, SSL/TLS şifrelemesi ile sunulur. Ancak bu demo bir prototip olduğundan, 
                <strong className="text-foreground"> hassas kişisel bilgilerinizi (TC kimlik, kredi kartı, şifre vb.) paylaşmayınız.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Gelecek Güncellemeler</h2>
              <p className="leading-relaxed">
                Yanlik'in gelecek sürümlerinde backend entegrasyonu eklendiğinde, bu gizlilik politikası güncellenecek 
                ve kullanıcılara bildirilecektir. Veri toplama başlatılmadan önce açık rızanız alınacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Haklarınız</h2>
              <p className="leading-relaxed mb-2">
                KVKK kapsamında sahip olduğunuz haklar:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Verilerinize erişim talep etme</li>
                <li>Verilerinizin düzeltilmesini isteme</li>
                <li>Verilerinizin silinmesini talep etme</li>
              </ul>
              <p className="leading-relaxed mt-2">
                Şu an için tüm verileriniz cihazınızda olduğundan, tarayıcı ayarlarınızdan silebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. İletişim</h2>
              <p className="leading-relaxed">
                Gizlilik politikası hakkında sorularınız için:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Instagram: <a href="https://instagram.com/mirsqdmmdevs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@mirsqdmmdevs</a></li>
                <li>GitHub: <a href="https://github.com/mirsqdmmdeb" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mirsqdmmdeb</a></li>
              </ul>
            </section>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mt-6">
              <p className="text-sm leading-relaxed">
                <strong className="text-foreground">Önemli Not:</strong> Bu gizlilik politikası, 
                Yanlik'in mevcut demo sürümü için geçerlidir. Gelecek sürümlerde değişiklik gösterebilir 
                ve kullanıcılara duyurulacaktır.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
