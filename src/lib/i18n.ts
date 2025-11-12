import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      welcome: 'Merhaba! Ben Yanlik. Size nasıl yardımcı olabilirim?',
      typing: 'yazıyor...',
      send: 'Gönder',
      newChat: 'Yeni Sohbet',
      settings: 'Ayarlar',
      about: 'Hakkında',
      logout: 'Çıkış Yap',
      admin: 'Admin Panel',
      online: 'Online',
      welcomeUser: 'Hoş geldin',
      messagePlaceholder: 'Mesajınızı yazın...',
      deleteChat: 'Sohbeti Sil',
      renameChat: 'Yeniden Adlandır',
      editMessage: 'Düzenle',
      regenerate: 'Yeniden Üret',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      startVoice: 'Sesli Sohbet',
      stopVoice: 'Durdur',
      listening: 'Dinleniyor...',
    }
  },
  en: {
    translation: {
      welcome: 'Hello! I am Yanlik. How can I help you?',
      typing: 'typing...',
      send: 'Send',
      newChat: 'New Chat',
      settings: 'Settings',
      about: 'About',
      logout: 'Logout',
      admin: 'Admin Panel',
      online: 'Online',
      welcomeUser: 'Welcome',
      messagePlaceholder: 'Type your message...',
      deleteChat: 'Delete Chat',
      renameChat: 'Rename',
      editMessage: 'Edit',
      regenerate: 'Regenerate',
      copy: 'Copy',
      copied: 'Copied',
      startVoice: 'Voice Chat',
      stopVoice: 'Stop',
      listening: 'Listening...',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
