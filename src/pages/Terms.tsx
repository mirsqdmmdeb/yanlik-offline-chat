import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms = () => {
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
            <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Kullanım Şartları</CardTitle>
            <p className="text-sm text-muted-foreground">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">1. Kabul ve Onay</h2>
              <p className="leading-relaxed">
                Yanlik'i kullanarak bu kullanım şartlarını kabul etmiş sayılırsınız. 
                Eğer bu şartları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">2. Hizmet Tanımı</h2>
              <p className="leading-relaxed mb-2">
                Yanlik, <strong className="text-foreground">demo/prototip amaçlı</strong> bir yapay zeka chat uygulamasıdır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Şu an gerçek bir AI modeli içermemektedir</li>
                <li>Verilen cevaplar önceden tanımlanmış şablonlardır</li>
                <li>Backend/API entegrasyonu yoktur</li>
                <li>Öğrenme amaçlı bir projedir</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">3. Kullanıcı Sorumlulukları</h2>
              <p className="leading-relaxed mb-2">Kullanıcı olarak:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Yasal olmayan içerik paylaşmayacaksınız</li>
                <li>Sistemi kötüye kullanmayacaksınız</li>
                <li>Başkalarının haklarını ihlal etmeyeceksiniz</li>
                <li>Hassas kişisel bilgilerinizi paylaşmayacaksınız</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">4. Sorumluluk Reddi</h2>
              <div className="space-y-3">
                <p className="leading-relaxed font-semibold text-foreground">
                  ⚠️ ÖNEMLİ UYARILAR:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-foreground">Tıbbi Tavsiye Değil:</strong> Yanlik hiçbir şekilde tıbbi tavsiye vermez. Sağlık sorunlarınız için mutlaka bir doktora başvurun.</li>
                  <li><strong className="text-foreground">Finansal Tavsiye Değil:</strong> Yanlik yatırım veya finansal tavsiye vermez. Verilen bilgiler yalnızca genel bilgilendirme amaçlıdır.</li>
                  <li><strong className="text-foreground">Hukuki Tavsiye Değil:</strong> Hukuki konularda profesyonel bir avukata danışınız.</li>
                  <li><strong className="text-foreground">Garanti Yok:</strong> Verilen yanıtların doğruluğu garanti edilmez.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">5. Hizmet Kesintileri</h2>
              <p className="leading-relaxed">
                Yanlik "olduğu gibi" sunulmaktadır. Hizmetin kesintisiz çalışacağına dair bir garanti yoktur. 
                Bakım, güncelleme veya teknik sorunlar nedeniyle hizmet geçici olarak durabilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">6. Fikri Mülkiyet</h2>
              <p className="leading-relaxed">
                Yanlik'in tasarımı, kodu ve içeriği <strong className="text-primary">mirsqdmmdevs</strong> tarafından 
                oluşturulmuştur ve telif hakları ile korunmaktadır. İzinsiz kopyalanması yasaktır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">7. Değişiklikler</h2>
              <p className="leading-relaxed">
                Bu kullanım şartları herhangi bir zamanda değiştirilebilir. Değişiklikler bu sayfada yayınlanacak 
                ve yürürlük tarihi güncellenecektir. Düzenli olarak kontrol etmeniz önerilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">8. Yaş Sınırı</h2>
              <p className="leading-relaxed">
                Yanlik'i kullanmak için en az 13 yaşında olmanız gerekmektedir. 
                13 yaşından küçükseniz, ebeveyn veya vasi izni ile kullanabilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">9. Hesap Silme</h2>
              <p className="leading-relaxed">
                Şu anda hesap sistemi olmadığından, tarayıcı ayarlarınızdan localStorage'ı temizleyerek 
                tüm verilerinizi silebilirsiniz. Gelecek sürümlerde hesap silme seçeneği eklenecektir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">10. İletişim</h2>
              <p className="leading-relaxed">
                Kullanım şartları hakkında sorularınız için:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Instagram: <a href="https://instagram.com/mirsqdmmdevs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@mirsqdmmdevs</a></li>
                <li>GitHub: <a href="https://github.com/mirsqdmmdeb" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mirsqdmmdeb</a></li>
              </ul>
            </section>

            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-6">
              <p className="text-sm leading-relaxed">
                <strong className="text-foreground">Sorumluluk Uyarısı:</strong> Yanlik kullanımı tamamen 
                kendi sorumluluğunuzdadır. Bu site öğrenme ve demo amaçlıdır. Kritik kararlar için 
                profesyonel kaynaklara danışınız.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
