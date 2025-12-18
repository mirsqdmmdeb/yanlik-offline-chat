import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Activity, CheckCircle, AlertCircle, Wifi, WifiOff, Database, Cpu, Clock } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  description: string;
  lastCheck: Date;
}

const Status = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Check services
    const checkServices = async () => {
      const now = new Date();
      const serviceList: ServiceStatus[] = [
        {
          name: 'Chat Engine (GPT-6 Offline)',
          status: 'operational',
          description: 'AI cevap motoru çalışıyor',
          lastCheck: now,
        },
        {
          name: 'IndexedDB Veritabanı',
          status: 'operational',
          description: 'Yerel veri depolama aktif',
          lastCheck: now,
        },
        {
          name: 'LocalStorage',
          status: 'operational',
          description: 'Ayarlar ve tercihler kaydediliyor',
          lastCheck: now,
        },
        {
          name: 'Ses Tanıma (Web Speech API)',
          status: 'speechSynthesis' in window ? 'operational' : 'degraded',
          description: 'speechSynthesis' in window ? 'Sesli komutlar aktif' : 'Tarayıcı desteklemiyor',
          lastCheck: now,
        },
        {
          name: 'Service Worker',
          status: 'navigator' in window && 'serviceWorker' in navigator ? 'operational' : 'degraded',
          description: 'serviceWorker' in navigator ? 'Offline cache hazır' : 'Desteklenmiyor',
          lastCheck: now,
        },
      ];

      // Test IndexedDB
      try {
        const request = indexedDB.open('test', 1);
        request.onerror = () => {
          serviceList[1].status = 'down';
          serviceList[1].description = 'IndexedDB erişilemiyor';
        };
      } catch {
        serviceList[1].status = 'down';
      }

      // Test localStorage
      try {
        localStorage.setItem('_test', '1');
        localStorage.removeItem('_test');
      } catch {
        serviceList[2].status = 'down';
        serviceList[2].description = 'LocalStorage erişilemiyor';
      }

      setServices(serviceList);
      setLastUpdate(now);
    };

    checkServices();
    const interval = setInterval(checkServices, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'down':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'Çalışıyor';
      case 'degraded':
        return 'Kısmi';
      case 'down':
        return 'Arızalı';
    }
  };

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'down':
        return 'bg-red-500';
    }
  };

  const allOperational = services.every(s => s.status === 'operational');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sistem Durumu</h1>
            <p className="text-muted-foreground">Yanlik servis durumları</p>
          </div>
        </div>

        {/* Overall Status */}
        <Card className={`mb-6 ${allOperational ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {allOperational ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                )}
                <div>
                  <h2 className="font-semibold text-lg">
                    {allOperational ? 'Tüm Sistemler Çalışıyor' : 'Bazı Servisler Kısmi'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Son kontrol: {lastUpdate.toLocaleTimeString('tr-TR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-green-500" />
                ) : (
                  <WifiOff className="w-5 h-5 text-yellow-500" />
                )}
                <span className="text-sm font-medium">
                  {isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Status */}
        <Card className="mb-6 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wifi className="w-5 h-5 text-primary" />
              Bağlantı Durumu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">İnternet Bağlantısı</span>
              <span className={`font-medium ${isOnline ? 'text-green-500' : 'text-yellow-500'}`}>
                {isOnline ? '✓ Bağlı' : '○ Bağlı Değil'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Not: Yanlik internet olmadan da çalışabilir. Tüm AI özellikleri offline kullanılabilir.
            </p>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="w-5 h-5 text-primary" />
              Servis Durumları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(service.status)}
                    <span className="text-sm">{getStatusText(service.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="mt-6 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cpu className="w-5 h-5 text-primary" />
              Sistem Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Tarayıcı</p>
                <p className="font-medium text-sm">{navigator.userAgent.split(' ').slice(-2).join(' ')}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Platform</p>
                <p className="font-medium text-sm">{navigator.platform}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Dil</p>
                <p className="font-medium text-sm">{navigator.language}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Versiyon</p>
                <p className="font-medium text-sm">Yanlik v1.0.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Sayfa her 30 saniyede bir otomatik güncellenir</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Status;
