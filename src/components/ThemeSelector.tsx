import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from '@/components/ui/dropdown-menu';
import { Palette, Sun, Moon, Monitor, Check } from 'lucide-react';

const colorThemes = [
  { id: 'default', name: 'Varsayılan', color: 'hsl(262, 83%, 58%)' },
  { id: 'ocean', name: 'Okyanus', color: 'hsl(200, 95%, 45%)' },
  { id: 'purple', name: 'Mor Rüya', color: 'hsl(270, 75%, 55%)' },
  { id: 'forest', name: 'Orman', color: 'hsl(145, 65%, 40%)' },
  { id: 'sunset', name: 'Gün Batımı', color: 'hsl(25, 90%, 55%)' },
  { id: 'rose', name: 'Gül', color: 'hsl(345, 80%, 55%)' },
  { id: 'midnight', name: 'Gece Mavisi', color: 'hsl(220, 80%, 45%)' },
] as const;

const modeOptions = [
  { id: 'light', name: 'Açık', icon: Sun },
  { id: 'dark', name: 'Koyu', icon: Moon },
  { id: 'auto', name: 'Sistem', icon: Monitor },
] as const;

export const ThemeSelector = () => {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span 
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background"
            style={{ backgroundColor: colorThemes.find(t => t.id === colorTheme)?.color }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Mod</DropdownMenuLabel>
        {modeOptions.map((mode) => (
          <DropdownMenuItem
            key={mode.id}
            onClick={() => setTheme(mode.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <mode.icon className="h-4 w-4" />
              {mode.name}
            </div>
            {theme === mode.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Renk Teması</DropdownMenuLabel>
        {colorThemes.map((colorOption) => (
          <DropdownMenuItem
            key={colorOption.id}
            onClick={() => setColorTheme(colorOption.id as any)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: colorOption.color }}
              />
              {colorOption.name}
            </div>
            {colorTheme === colorOption.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
