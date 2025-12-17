import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Trash2, Cookie, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();
  const { user, deleteAccount, logout } = useAuth();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('yanlik_settings');
    if (stored) {
      const settings = JSON.parse(stored);
      setFontSize(settings.fontSize || 'medium');
      setNotifications(settings.notifications ?? true);
      setSoundEnabled(settings.soundEnabled ?? true);
      setAutoSave(settings.autoSave ?? true);
    }
    
    // Load cookie consent status
    const consent = localStorage.getItem('cookie-consent');
    setCookieConsent(consent as 'accepted' | 'rejected' | null);
  }, []);

  useEffect(() => {
    const settings = { fontSize, notifications, soundEnabled, autoSave };
    localStorage.setItem('yanlik_settings', JSON.stringify(settings));
    
    const root = document.documentElement;
    if (fontSize === 'small') root.style.fontSize = '14px';
    else if (fontSize === 'large') root.style.fontSize = '18px';
    else root.style.fontSize = '16px';
  }, [fontSize, notifications, soundEnabled, autoSave]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" onClick={() => navigate('/chat')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <h1 className="mb-6 text-3xl font-bold">Ayarlar</h1>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm</CardTitle>
              <CardDescription>Uygulama görünümünü özelleştirin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <RadioGroup value={theme} onValueChange={(value) => setTheme(value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Açık</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Koyu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto" id="auto" />
                    <Label htmlFor="auto">Otomatik</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Renk Teması</Label>
                <RadioGroup value={colorTheme} onValueChange={(value) => setColorTheme(value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default">Varsayılan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ocean" id="ocean" />
                    <Label htmlFor="ocean">🌊 Okyanus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="purple" id="purple" />
                    <Label htmlFor="purple">💜 Mor Rüya</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="forest" id="forest" />
                    <Label htmlFor="forest">🌲 Orman</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sunset" id="sunset" />
                    <Label htmlFor="sunset">🌅 Gün Batımı</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rose" id="rose" />
                    <Label htmlFor="rose">🌹 Pembe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="midnight" id="midnight" />
                    <Label htmlFor="midnight">🌙 Gece Mavisi</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Yazı Boyutu</Label>
                <RadioGroup value={fontSize} onValueChange={(value) => setFontSize(value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small">Küçük</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Orta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Büyük</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bildirimler</CardTitle>
              <CardDescription>Bildirim tercihlerinizi yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Bildirimleri Etkinleştir</Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound">Ses Bildirimleri</Label>
                <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Genel</CardTitle>
              <CardDescription>Genel uygulama ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autosave">Otomatik Kaydetme</Label>
                <Switch id="autosave" checked={autoSave} onCheckedChange={setAutoSave} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Hesap Bilgileri
              </CardTitle>
              <CardDescription>Kullanıcı hesabı ve profil bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kullanıcı Adı:</span>
                  <span className="font-semibold">{user?.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hesap Türü:</span>
                  <span className="font-semibold">{user?.isAdmin ? '👑 Admin' : '👤 Kullanıcı'}</span>
                </div>
              </div>

              <Separator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hesabı Sil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hesabınızı silmek istediğinizden emin misiniz?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu işlem geri alınamaz. Tüm verileriniz, sohbet geçmişiniz ve ayarlarınız kalıcı olarak silinecektir.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await deleteAccount();
                        toast({
                          title: "Hesap silindi",
                          description: "Hesabınız başarıyla silindi.",
                        });
                        navigate('/');
                      }}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Evet, Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                Çerez ve Gizlilik
              </CardTitle>
              <CardDescription>KVKK ve GDPR uyumlu çerez tercihleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Analitik Çerezleri</span>
                  </div>
                  <span className={`text-sm font-medium ${cookieConsent === 'accepted' ? 'text-green-500' : 'text-muted-foreground'}`}>
                    {cookieConsent === 'accepted' ? 'Kabul Edildi' : cookieConsent === 'rejected' ? 'Reddedildi' : 'Belirlenmedi'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Bu site, deneyiminizi geliştirmek için Google Analytics kullanmaktadır. Verileriniz anonim olarak işlenir.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={cookieConsent === 'accepted' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => {
                    localStorage.setItem('cookie-consent', 'accepted');
                    setCookieConsent('accepted');
                    toast({
                      title: "Tercih Kaydedildi",
                      description: "Analitik çerezleri etkinleştirildi.",
                    });
                    setTimeout(() => window.location.reload(), 500);
                  }}
                >
                  Kabul Et
                </Button>
                <Button
                  variant={cookieConsent === 'rejected' ? 'destructive' : 'outline'}
                  className="flex-1"
                  onClick={() => {
                    localStorage.setItem('cookie-consent', 'rejected');
                    setCookieConsent('rejected');
                    toast({
                      title: "Tercih Kaydedildi",
                      description: "Analitik çerezleri devre dışı bırakıldı.",
                    });
                  }}
                >
                  Reddet
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => navigate('/privacy')}
              >
                Gizlilik Politikasını Görüntüle
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Veri Yönetimi</CardTitle>
              <CardDescription>Uygulama verilerini yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  localStorage.removeItem('yanlik_settings');
                  toast({
                    title: "Ayarlar sıfırlandı",
                    description: "Sayfa yeniden yüklenecek.",
                  });
                  setTimeout(() => window.location.reload(), 1000);
                }}
              >
                Ayarları Sıfırla
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
