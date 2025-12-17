import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, MessageSquare, Settings, Database, Activity, BarChart3, TrendingUp, MousePointer, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dbManager } from '@/lib/indexedDB';
import { hasConsent } from '@/lib/analytics';

interface AnalyticsData {
  pageViews: { page: string; count: number }[];
  events: { name: string; count: number }[];
  totalPageViews: number;
  totalEvents: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { conversations } = useChat();
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalUsers: 0,
    totalConversations: 0,
    storageEstimate: '0 KB',
    uptime: '100%'
  });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: [],
    events: [],
    totalPageViews: 0,
    totalEvents: 0
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/chat');
      return;
    }

    const calculateStats = async () => {
      // Get all users
      const users = await dbManager.getAllUsers();
      
      // Get all conversations
      const allConversations = await dbManager.getAllConversations();
      
      // Count total messages
      const totalMessages = allConversations.reduce((sum, conv) => sum + conv.messages.length, 0);

      // Estimate storage (rough calculation)
      let totalSize = 0;
      for (let key in localStorage) {
        if (key.startsWith('yanlik_')) {
          totalSize += localStorage[key].length;
        }
      }
      
      // Add IndexedDB estimate (rough)
      totalSize += JSON.stringify(allConversations).length + JSON.stringify(users).length;
      const sizeInKB = (totalSize / 1024).toFixed(2);

      setStats({
        totalMessages,
        totalUsers: users.length,
        totalConversations: allConversations.length,
        storageEstimate: `${sizeInKB} KB`,
        uptime: '100%'
      });

      // Load local analytics data
      const storedAnalytics = localStorage.getItem('yanlik_analytics');
      if (storedAnalytics) {
        try {
          setAnalyticsData(JSON.parse(storedAnalytics));
        } catch (e) {
          console.error('Failed to parse analytics data', e);
        }
      }
    };

    calculateStats();
  }, [user, navigate, conversations]);

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
              <CardTitle className="text-sm font-medium">Toplam Sohbet</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">{stats.totalConversations}</div>
              <p className="text-xs text-muted-foreground mt-1">Aktif sohbet sayısı</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Depolama Tahmini</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">{stats.storageEstimate}</div>
              <p className="text-xs text-muted-foreground mt-1">IndexedDB + LocalStorage</p>
            </CardContent>
          </Card>

        </div>

        {/* Analytics Dashboard */}
        <Card className="mt-6 bg-card/80 backdrop-blur-sm border-border/50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Analytics Dashboard
            </CardTitle>
            <CardDescription>
              Google Analytics verileri {hasConsent() ? '(Aktif)' : '(Devre dışı - Çerez onayı gerekli)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasConsent() ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <MousePointer className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium">Sayfa Görüntüleme</span>
                    </div>
                    <p className="text-2xl font-bold text-violet-500">{analyticsData.totalPageViews}</p>
                    <p className="text-xs text-muted-foreground mt-1">Toplam görüntüleme</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">Olaylar</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-500">{analyticsData.totalEvents}</p>
                    <p className="text-xs text-muted-foreground mt-1">Toplam event</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Son Aktiviteler
                  </h4>
                  <div className="space-y-2 text-sm">
                    {analyticsData.events.length > 0 ? (
                      analyticsData.events.slice(0, 5).map((event, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 rounded bg-background/50">
                          <span className="text-muted-foreground">{event.name}</span>
                          <span className="font-medium">{event.count}x</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">Henüz event kaydedilmedi</p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Detaylı analytics için{' '}
                  <a 
                    href="https://analytics.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Analytics
                  </a>
                  {' '}panelini ziyaret edin
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Analytics verileri görüntülemek için çerez onayı gereklidir.
                </p>
                <Button variant="outline" onClick={() => navigate('/settings')}>
                  Ayarlara Git
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

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
                <span className="font-semibold">Web (IndexedDB)</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <span className="text-muted-foreground">Durum:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
                  <span className="font-semibold text-green-600 dark:text-green-400">Aktif</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <span className="text-muted-foreground">Analytics:</span>
                <span className={`font-semibold ${hasConsent() ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                  {hasConsent() ? 'Aktif' : 'Devre Dışı'}
                </span>
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
              onClick={async () => {
                if (confirm('Tüm sistem verileri (IndexedDB ve LocalStorage) silinecek. Emin misiniz?')) {
                  // Clear localStorage
                  localStorage.clear();
                  
                  // Clear IndexedDB
                  const dbs = await indexedDB.databases();
                  dbs.forEach(db => {
                    if (db.name) indexedDB.deleteDatabase(db.name);
                  });

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
              onClick={async () => {
                const allUsers = await dbManager.getAllUsers();
                const allConversations = await dbManager.getAllConversations();
                
                const data = {
                  timestamp: new Date().toISOString(),
                  users: allUsers,
                  conversations: allConversations,
                  localStorage: {
                    settings: localStorage.getItem('yanlik_settings'),
                    theme: localStorage.getItem('yanlik_theme'),
                  }
                };
                
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `yanlik-backup-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
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
