import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlOrCmd?: boolean;
  shift?: boolean;
  handler: () => void;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrlOrCmd, shift, handler }) => {
        const isCtrlOrCmd = ctrlOrCmd ? (e.ctrlKey || e.metaKey) : true;
        const isShift = shift !== undefined ? e.shiftKey === shift : true;
        
        if (e.key === key && isCtrlOrCmd && isShift) {
          e.preventDefault();
          handler();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
