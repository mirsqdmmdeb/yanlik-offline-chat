import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, MessageSquare, Settings, Database } from 'lucide-react';
import { useEffect, useState } from 'react';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalUsers: 1,
    storageUsed: '0 KB',
    uptime: '100%'
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/chat');
      return;
    }

    // Calculate stats from localStorage
    const chatHistory = localStorage.getItem('yanlik_chat_history');
    const messages = chatHistory ? JSON.parse(chatHistory).length : 0;
    
    let totalSize = 0;
    for (let key in localStorage) {
      if (key.startsWith('yanlik_')) {
        totalSize += localStorage[key].length;
      }
    }
    const sizeInKB = (totalSize / 1024).toFixed(2);

    setStats({
      totalMessages: messages,
      totalUsers: 1,
      storageUsed: `${sizeInKB} KB`,
      uptime: '100%'
    });
  }, [user, navigate]);

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate('/chat')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <h1 className="mb-6 text-3xl font-bold">Admin Paneli</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Aktif kullanıcı sayısı</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Mesaj</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMessages}</div>
              <p className="text-xs text-muted-foreground">Gönderilen mesaj sayısı</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Depolama Kullanımı</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.storageUsed}</div>
              <p className="text-xs text-muted-foreground">Yerel depolama</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Çalışma Süresi</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uptime}</div>
              <p className="text-xs text-muted-foreground">Sistem aktif</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sistem Bilgileri</CardTitle>
            <CardDescription>Uygulama detayları ve durum bilgisi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Versiyon:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform:</span>
                <span className="font-medium">Web (Offline)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Durum:</span>
                <span className="font-medium text-green-600">Aktif</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Son Güncelleme:</span>
                <span className="font-medium">{new Date().toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Yönetim İşlemleri</CardTitle>
            <CardDescription>Sistem bakım ve yönetim araçları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (confirm('Tüm sistem verileri silinecek. Emin misiniz?')) {
                  localStorage.clear();
                  alert('Tüm veriler silindi. Sayfa yeniden yüklenecek.');
                  window.location.reload();
                }
              }}
            >
              Tüm Verileri Temizle
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const data = {
                  user: localStorage.getItem('yanlik_user'),
                  settings: localStorage.getItem('yanlik_settings'),
                  theme: localStorage.getItem('yanlik_theme'),
                  chatHistory: localStorage.getItem('yanlik_chat_history')
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `yanlik-backup-${Date.now()}.json`;
                a.click();
              }}
            >
              Verileri Dışa Aktar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
