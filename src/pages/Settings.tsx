import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Trash2, Cookie, Shield, Download, Eye, Type, Accessibility, Database, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAccessibility } from '@/hooks/useAccessibility';
import { downloadExportData, clearAllUserData } from '@/lib/dataExport';
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
  const { settings: accessibilitySettings, updateSetting: updateAccessibility, resetSettings: resetAccessibility } = useAccessibility();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(null);
  const [ipMasking, setIpMasking] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('yanlik_settings');
    if (stored) {
      const settings = JSON.parse(stored);
      setFontSize(settings.fontSize || 'medium');
      setNotifications(settings.notifications ?? true);
      setSoundEnabled(settings.soundEnabled ?? true);
      setAutoSave(settings.autoSave ?? true);
      setIpMasking(settings.ipMasking ?? true);
      setAnonymousMode(settings.anonymousMode ?? false);
    }
    
    const consent = localStorage.getItem('cookie-consent');
    setCookieConsent(consent as 'accepted' | 'rejected' | null);
  }, []);

  useEffect(() => {
    const settings = { fontSize, notifications, soundEnabled, autoSave, ipMasking, anonymousMode };
    localStorage.setItem('yanlik_settings', JSON.stringify(settings));
    
    const root = document.documentElement;
    if (fontSize === 'small') root.style.fontSize = '14px';
    else if (fontSize === 'large') root.style.fontSize = '18px';
    else root.style.fontSize = '16px';
  }, [fontSize, notifications, soundEnabled, autoSave, ipMasking, anonymousMode]);

  const handleExportData = async () => {
    if (!user) return;
    setIsExporting(true);
    try {
      await downloadExportData(user.id || 'anonymous', user.username);
      toast({
        title: "Veriler İndirildi",
        description: "Tüm verileriniz JSON dosyası olarak indirildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Veri dışa aktarma başarısız oldu.",
        variant: "destructive",
      });
    }
    setIsExporting(false);
  };

  const handleClearAllData = async () => {
    setIsDeleting(true);
    try {
      await clearAllUserData();
      toast({
        title: "Veriler Silindi",
        description: "Tüm verileriniz kalıcı olarak silindi.",
      });
      setTimeout(() => {
        logout();
        navigate('/');
      }, 1500);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Veri silme işlemi başarısız oldu.",
        variant: "destructive",
      });
    }
    setIsDeleting(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" onClick={() => navigate('/chat')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <h1 className="mb-6 text-3xl font-bold">Ayarlar</h1>

        <div className="space-y-4">
          {/* Görünüm */}
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

          {/* Erişilebilirlik */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                Erişilebilirlik
              </CardTitle>
              <CardDescription>Görme ve okuma kolaylıkları için ayarlar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="highContrast" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Yüksek Kontrast
                  </Label>
                  <p className="text-xs text-muted-foreground">Renk körleri için optimize edilmiş görünüm</p>
                </div>
                <Switch
                  id="highContrast"
                  checked={accessibilitySettings.highContrast}
                  onCheckedChange={(value) => updateAccessibility('highContrast', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dyslexicFont" className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Disleksi Fontu
                  </Label>
                  <p className="text-xs text-muted-foreground">Disleksi olanlar için özel okunabilir yazı tipi</p>
                </div>
                <Switch
                  id="dyslexicFont"
                  checked={accessibilitySettings.dyslexicFont}
                  onCheckedChange={(value) => updateAccessibility('dyslexicFont', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reducedMotion">Azaltılmış Hareket</Label>
                  <p className="text-xs text-muted-foreground">Animasyonları ve geçişleri azalt</p>
                </div>
                <Switch
                  id="reducedMotion"
                  checked={accessibilitySettings.reducedMotion}
                  onCheckedChange={(value) => updateAccessibility('reducedMotion', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="largeText">Büyük Metin</Label>
                  <p className="text-xs text-muted-foreground">Tüm metinleri daha büyük göster</p>
                </div>
                <Switch
                  id="largeText"
                  checked={accessibilitySettings.largeText}
                  onCheckedChange={(value) => updateAccessibility('largeText', value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={resetAccessibility} className="mt-2">
                Erişilebilirlik Ayarlarını Sıfırla
              </Button>
            </CardContent>
          </Card>

          {/* Bildirimler */}
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

          {/* Genel */}
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

          {/* Hesap Bilgileri */}
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

          {/* Çerez ve Gizlilik */}
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

              <Separator />

              {/* IP Masking */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ipMasking" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    IP Adresi Gizleme
                  </Label>
                  <p className="text-xs text-muted-foreground">Google Analytics'e IP adresiniz gönderilmez</p>
                </div>
                <Switch
                  id="ipMasking"
                  checked={ipMasking}
                  onCheckedChange={setIpMasking}
                />
              </div>

              {/* Anonymous Mode */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymousMode">Anonim Analiz Modu</Label>
                  <p className="text-xs text-muted-foreground">Hiçbir kişisel veri toplamadan sadece teknik hata takibi</p>
                </div>
                <Switch
                  id="anonymousMode"
                  checked={anonymousMode}
                  onCheckedChange={setAnonymousMode}
                />
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

          {/* KVKK/GDPR Veri Yönetimi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                KVKK/GDPR Veri Yönetimi
              </CardTitle>
              <CardDescription>Kişisel verilerinizi yönetin ve dışa aktarın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                <p className="text-sm font-medium">📋 Veri Yerelliği Garantisi</p>
                <p className="text-xs text-muted-foreground">
                  Tüm verileriniz yalnızca cihazınızda (IndexedDB ve LocalStorage) saklanır. 
                  Hiçbir veri sunuculara gönderilmez veya bulutta depolanmaz.
                </p>
              </div>

              {/* Veri Dışa Aktarma */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleExportData}
                disabled={isExporting}
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? 'Dışa Aktarılıyor...' : 'Tüm Verilerimi İndir (JSON)'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                KVKK Madde 11 ve GDPR Madde 20 kapsamında veri taşınabilirlik hakkınız
              </p>

              <Separator />

              {/* Kalıcı Silme */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Tüm Verileri Kalıcı Olarak Sil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="w-5 h-5" />
                      Kalıcı Silme Uyarısı
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <p>Bu işlem GERİ ALINAMAZ. Aşağıdaki veriler kalıcı olarak silinecektir:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Tüm sohbet geçmişi</li>
                        <li>Favoriler ve kaydedilen mesajlar</li>
                        <li>Ayarlar ve tercihler</li>
                        <li>Oturum bilgileri</li>
                      </ul>
                      <p className="font-semibold mt-2">Bu işlemi onaylıyor musunuz?</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearAllData}
                      disabled={isDeleting}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      {isDeleting ? 'Siliniyor...' : 'Evet, Tümünü Sil'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <p className="text-xs text-muted-foreground text-center">
                KVKK Madde 11 ve GDPR Madde 17 kapsamında silme hakkınız (Unutulma Hakkı)
              </p>
            </CardContent>
          </Card>

          {/* Veri Yönetimi */}
          <Card>
            <CardHeader>
              <CardTitle>Ayar Yönetimi</CardTitle>
              <CardDescription>Uygulama ayarlarını yönetin</CardDescription>
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

          {/* Hızlı Linkler */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı Linkler</CardTitle>
              <CardDescription>Önemli sayfalara hızlı erişim</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/privacy')}>
                Gizlilik Politikası
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/terms')}>
                Kullanım Şartları
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/licenses')}>
                Açık Kaynak Lisanslar
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/faq')}>
                SSS
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/status')}>
                Sistem Durumu
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/developer')}>
                Geliştirici
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;