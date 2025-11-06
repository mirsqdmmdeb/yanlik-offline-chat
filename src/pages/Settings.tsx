import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('yanlik_settings');
    if (stored) {
      const settings = JSON.parse(stored);
      setFontSize(settings.fontSize || 'medium');
      setNotifications(settings.notifications ?? true);
      setSoundEnabled(settings.soundEnabled ?? true);
      setAutoSave(settings.autoSave ?? true);
    }
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
              <CardTitle>Veri Yönetimi</CardTitle>
              <CardDescription>Uygulama verilerini yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (confirm('Tüm sohbet geçmişi silinecek. Emin misiniz?')) {
                    localStorage.removeItem('yanlik_chat_history');
                    alert('Sohbet geçmişi silindi.');
                  }
                }}
              >
                Sohbet Geçmişini Temizle
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (confirm('Tüm ayarlar sıfırlanacak. Emin misiniz?')) {
                    localStorage.removeItem('yanlik_settings');
                    window.location.reload();
                  }
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
