import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Scale } from 'lucide-react';

// List of major dependencies used in Yanlik
const LICENSES = [
  {
    name: 'React',
    version: '18.3.1',
    license: 'MIT',
    url: 'https://github.com/facebook/react',
    description: 'A JavaScript library for building user interfaces',
  },
  {
    name: 'Vite',
    version: '5.x',
    license: 'MIT',
    url: 'https://github.com/vitejs/vite',
    description: 'Next generation frontend tooling',
  },
  {
    name: 'Tailwind CSS',
    version: '3.x',
    license: 'MIT',
    url: 'https://github.com/tailwindlabs/tailwindcss',
    description: 'A utility-first CSS framework',
  },
  {
    name: 'Radix UI',
    version: 'various',
    license: 'MIT',
    url: 'https://github.com/radix-ui/primitives',
    description: 'Unstyled, accessible UI components',
  },
  {
    name: 'Lucide React',
    version: '0.462.0',
    license: 'ISC',
    url: 'https://github.com/lucide-icons/lucide',
    description: 'Beautiful & consistent icons',
  },
  {
    name: 'React Router',
    version: '6.30.1',
    license: 'MIT',
    url: 'https://github.com/remix-run/react-router',
    description: 'Declarative routing for React',
  },
  {
    name: 'TanStack Query',
    version: '5.x',
    license: 'MIT',
    url: 'https://github.com/TanStack/query',
    description: 'Powerful async state management',
  },
  {
    name: 'React Markdown',
    version: '10.1.0',
    license: 'MIT',
    url: 'https://github.com/remarkjs/react-markdown',
    description: 'Markdown component for React',
  },
  {
    name: 'React Syntax Highlighter',
    version: '16.1.0',
    license: 'MIT',
    url: 'https://github.com/react-syntax-highlighter/react-syntax-highlighter',
    description: 'Syntax highlighting for React',
  },
  {
    name: 'Recharts',
    version: '2.15.4',
    license: 'MIT',
    url: 'https://github.com/recharts/recharts',
    description: 'Charting library built on React',
  },
  {
    name: 'date-fns',
    version: '3.6.0',
    license: 'MIT',
    url: 'https://github.com/date-fns/date-fns',
    description: 'Modern JavaScript date utility library',
  },
  {
    name: 'i18next',
    version: '25.6.2',
    license: 'MIT',
    url: 'https://github.com/i18next/i18next',
    description: 'Internationalization framework',
  },
  {
    name: 'Zod',
    version: '3.25.76',
    license: 'MIT',
    url: 'https://github.com/colinhacks/zod',
    description: 'TypeScript-first schema validation',
  },
  {
    name: 'KaTeX',
    version: '0.16.25',
    license: 'MIT',
    url: 'https://github.com/KaTeX/KaTeX',
    description: 'Fast math typesetting for the web',
  },
  {
    name: 'Sonner',
    version: '1.7.4',
    license: 'MIT',
    url: 'https://github.com/emilkowalski/sonner',
    description: 'An opinionated toast component for React',
  },
];

const Licenses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Açık Kaynak Lisansları</h1>
            <p className="text-muted-foreground">Yanlik'te kullanılan kütüphaneler</p>
          </div>
        </div>

        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Yanlik, açık kaynak topluluğunun katkılarıyla geliştirilmiştir. 
              Aşağıda kullanılan tüm ana kütüphanelerin lisansları listelenmiştir. 
              Tüm lisanslar ilgili projelerin deposunda bulunabilir.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-3">
          {LICENSES.map((lib) => (
            <Card 
              key={lib.name} 
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card transition-colors"
            >
              <CardHeader className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {lib.name}
                      <span className="text-xs font-normal text-muted-foreground">
                        v{lib.version}
                      </span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lib.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                      {lib.license}
                    </span>
                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-card/80">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Yanlik Lisansı</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Yanlik, mirsqdmmdevs tarafından geliştirilmiş bir demo projesidir. 
              Kod ve içerikler eğitim amaçlıdır.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 mirsqdmmdevs - Tüm hakları saklıdır.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Licenses;
