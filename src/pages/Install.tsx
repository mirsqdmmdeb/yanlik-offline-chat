import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Smartphone, Monitor, Apple, Chrome, Share, Plus, CheckCircle, Wifi, WifiOff, Zap } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { useToast } from '@/hooks/use-toast';

const Install = () => {
  const navigate = useNavigate();
  const { isInstallable, isInstalled, isIOS, isStandalone, installApp } = usePWA();
  const { toast } = useToast();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      toast({
        title: 'Yükleme Başladı',
        description: 'Yanlik cihazınıza yükleniyor...',
      });
    } else {
      toast({
        title: 'Yükleme İptal Edildi',
        description: 'Uygulamayı daha sonra yükleyebilirsiniz.',
      });
    }
  };

  if (isStandalone || isInstalled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>

          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-green-500">Zaten Yüklü!</h2>
                <p className="text-muted-foreground">
                  Yanlik uygulaması cihazınıza yüklenmiş durumda. 
                  Tüm özelliklerden yararlanabilirsiniz.
                </p>
                <Button onClick={() => navigate('/chat')}>
                  Sohbete Başla
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Uygulamayı Yükle</h1>
            <p className="text-muted-foreground">Yanlik'i cihazınıza ekleyin</p>
          </div>
        </div>

        {/* Benefits */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Neden Yüklemeliyim?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <WifiOff className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Çevrimdışı Çalışma</p>
                <p className="text-sm text-muted-foreground">İnternet olmadan da kullanın</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Hızlı Erişim</p>
                <p className="text-sm text-muted-foreground">Ana ekrandan tek tıkla açın</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Tam Ekran Deneyim</p>
                <p className="text-sm text-muted-foreground">Tarayıcı çerçevesi olmadan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Install Options */}
        <div className="space-y-4">
          {/* Android / Chrome */}
          {isInstallable && (
            <Card className="bg-green-500/5 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <Chrome className="w-5 h-5" />
                  Hemen Yükle
                </CardTitle>
                <CardDescription>Tek tıkla cihazınıza ekleyin</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleInstall} className="w-full" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Yanlik'i Yükle
                </Button>
              </CardContent>
            </Card>
          )}

          {/* iOS Instructions */}
          {isIOS && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5" />
                  iPhone / iPad için
                </CardTitle>
                <CardDescription>Safari üzerinden yükleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Safari'de açın</p>
                      <p className="text-sm text-muted-foreground">Bu sayfayı Safari tarayıcısında açın</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">2</div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Paylaş butonuna dokunun</p>
                      <Share className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">3</div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">"Ana Ekrana Ekle" seçin</p>
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">"Ekle" butonuna dokunun</p>
                      <p className="text-sm text-muted-foreground">Yanlik ana ekranınıza eklenecek</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Desktop / Other */}
          {!isInstallable && !isIOS && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Masaüstü / Diğer Tarayıcılar
                </CardTitle>
                <CardDescription>Tarayıcı menüsünden yükleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Chrome veya Edge kullanın</p>
                      <p className="text-sm text-muted-foreground">PWA destekleyen bir tarayıcı gerekli</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Adres çubuğundaki yükle ikonuna tıklayın</p>
                      <p className="text-sm text-muted-foreground">Veya menüden "Uygulamayı yükle" seçin</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Android Manual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Android için Manuel Yükleme
              </CardTitle>
              <CardDescription>Chrome üzerinden yükleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-medium">Chrome'da açın</p>
                  <p className="text-sm text-muted-foreground">Bu sayfayı Chrome'da görüntüleyin</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-medium">Menüyü açın (⋮)</p>
                  <p className="text-sm text-muted-foreground">Sağ üst köşedeki üç noktaya dokunun</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-medium">"Ana ekrana ekle" seçin</p>
                  <p className="text-sm text-muted-foreground">Yanlik cihazınıza yüklenecek</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Yanlik tamamen ücretsizdir ve reklam içermez.
        </p>
      </div>
    </div>
  );
};

export default Install;