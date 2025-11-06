import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Yanlik</h1>
        <p className="text-xl text-muted-foreground">Yapay Zeka Asistanınız</p>
        <Button size="lg" onClick={() => navigate('/login')}>
          Giriş Yap
        </Button>
      </div>
    </div>
  );
};

export default Index;
