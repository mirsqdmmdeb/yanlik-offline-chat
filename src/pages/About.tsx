import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" onClick={() => navigate('/chat')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <h1 className="mb-6 text-3xl font-bold">Hakkında</h1>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yanlik Nedir?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Yanlik, kullanıcıların sorularına hızlı ve doğru yanıtlar veren gelişmiş bir yapay zeka asistanıdır.
                Programlama, teknoloji, genel bilgi ve daha birçok konuda size yardımcı olmak için tasarlanmıştır.
              </p>
              <p className="text-muted-foreground">
                Tamamen çevrimdışı çalışabilen Yanlik, internet bağlantısı olmadan bile size hizmet verebilir.
                Güvenli, hızlı ve kullanıcı dostu arayüzü ile günlük sorularınıza anında yanıt alabilirsiniz.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Özellikler</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Çevrimdışı çalışma desteği</li>
                <li>Hızlı ve doğru yanıtlar</li>
                <li>Çoklu konu desteği (teknoloji, bilim, genel bilgi)</li>
                <li>Koyu ve açık tema seçenekleri</li>
                <li>Özelleştirilebilir ayarlar</li>
                <li>Güvenli ve gizlilik odaklı</li>
                <li>Türkçe dil desteği</li>
                <li>Kullanıcı dostu arayüz</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yaratıcı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yanlik, <span className="font-semibold text-foreground">mirsqdmmdevs</span> tarafından oluşturulmuştur.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Versiyon Bilgisi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="font-semibold">Versiyon:</span> 1.0.0</p>
                <p><span className="font-semibold">Yayın Tarihi:</span> 2024</p>
                <p><span className="font-semibold">Platform:</span> Web</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gizlilik</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yanlik, kullanıcı gizliliğine önem verir. Tüm verileriniz yerel olarak cihazınızda saklanır
                ve hiçbir bilginiz dış sunuculara gönderilmez. Tamamen çevrimdışı çalışma özelliği sayesinde
                verileriniz güvende kalır.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
