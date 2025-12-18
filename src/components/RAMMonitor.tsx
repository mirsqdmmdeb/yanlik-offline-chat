import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, HardDrive, Activity } from 'lucide-react';

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceMemory extends Performance {
  memory?: MemoryInfo;
}

export const RAMMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [memoryDetails, setMemoryDetails] = useState<{
    used: string;
    total: string;
    limit: string;
  } | null>(null);
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    const updateMemory = () => {
      const perf = performance as PerformanceMemory;
      if (perf.memory) {
        const used = perf.memory.usedJSHeapSize;
        const total = perf.memory.jsHeapSizeLimit;
        const percentage = (used / total) * 100;
        
        setMemoryUsage(percentage);
        setMemoryDetails({
          used: (used / (1024 * 1024)).toFixed(1) + ' MB',
          total: (perf.memory.totalJSHeapSize / (1024 * 1024)).toFixed(1) + ' MB',
          limit: (total / (1024 * 1024)).toFixed(1) + ' MB',
        });
      }
    };

    // FPS counter
    let frameCount = 0;
    let lastTime = performance.now();
    
    const countFrames = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(countFrames);
    };

    const memoryInterval = setInterval(updateMemory, 2000);
    const frameId = requestAnimationFrame(countFrames);

    updateMemory();

    return () => {
      clearInterval(memoryInterval);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const getMemoryColor = () => {
    if (memoryUsage < 50) return 'bg-green-500';
    if (memoryUsage < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getFpsColor = () => {
    if (fps >= 50) return 'text-green-500';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!memoryDetails) {
    return (
      <Card className="p-3 bg-secondary/50">
        <p className="text-xs text-muted-foreground">Bellek izleme bu tarayıcıda desteklenmiyor</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-medium">Performans Monitörü</h4>
      </div>
      
      <div className="space-y-3">
        {/* Memory Usage */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <HardDrive className="w-3 h-3" />
              Bellek
            </span>
            <span className="font-medium">{memoryDetails.used} / {memoryDetails.limit}</span>
          </div>
          <Progress value={memoryUsage} className={`h-2 ${getMemoryColor()}`} />
        </div>

        {/* FPS */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Cpu className="w-3 h-3" />
            FPS
          </span>
          <span className={`font-medium ${getFpsColor()}`}>{fps}</span>
        </div>

        {/* Storage Estimate */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">JS Heap</span>
          <span className="font-medium">{memoryDetails.total}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        {memoryUsage < 50 ? '✅ Performans iyi' : memoryUsage < 75 ? '⚠️ Orta yük' : '🔴 Yüksek bellek kullanımı'}
      </p>
    </Card>
  );
};

export default RAMMonitor;
