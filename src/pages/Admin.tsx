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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/chat')} 
          className="mb-4 hover:bg-primary/10 animate-fade-in"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="flex items-center gap-3 mb-6 animate-scale-in">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Admin Paneli</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Aktif kullanıcı sayısı</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Mesaj</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">{stats.totalMessages}</div>
              <p className="text-xs text-muted-foreground mt-1">Gönderilen mesaj sayısı</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Depolama Kullanımı</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">{stats.storageUsed}</div>
              <p className="text-xs text-muted-foreground mt-1">Yerel depolama</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Çalışma Süresi</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{stats.uptime}</div>
              <p className="text-xs text-muted-foreground mt-1">Sistem aktif</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-card/80 backdrop-blur-sm border-border/50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Sistem Bilgileri
            </CardTitle>
            <CardDescription>Uygulama detayları ve durum bilgisi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <span className="text-muted-foreground">Versiyon:</span>
                <span className="font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <span className="text-muted-foreground">Platform:</span>
                <span className="font-semibold">Web (Offline)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <span className="text-muted-foreground">Durum:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
                  <span className="font-semibold text-green-600 dark:text-green-400">Aktif</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <span className="text-muted-foreground">Son Güncelleme:</span>
                <span className="font-semibold">{new Date().toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-card/80 backdrop-blur-sm border-border/50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Yönetim İşlemleri
            </CardTitle>
            <CardDescription>Sistem bakım ve yönetim araçları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 border-2 hover:bg-destructive/10 hover:border-destructive transition-all"
              onClick={() => {
                if (confirm('Tüm sistem verileri silinecek. Emin misiniz?')) {
                  localStorage.clear();
                  alert('Tüm veriler silindi. Sayfa yeniden yüklenecek.');
                  window.location.reload();
                }
              }}
            >
              <Database className="mr-2 h-5 w-5" />
              Tüm Verileri Temizle
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 border-2 hover:bg-primary/10 hover:border-primary transition-all"
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
              <ArrowLeft className="mr-2 h-5 w-5 rotate-180" />
              Verileri Dışa Aktar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
