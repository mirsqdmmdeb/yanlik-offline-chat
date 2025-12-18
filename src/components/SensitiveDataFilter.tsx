import { useToast } from '@/hooks/use-toast';

// Patterns for sensitive data detection
const SENSITIVE_PATTERNS = {
  tcKimlik: /\b[1-9]\d{10}\b/g, // Turkish ID number (11 digits starting with non-zero)
  creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g, // Credit card number
  iban: /\bTR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}\b/gi, // Turkish IBAN
  phone: /\b(?:\+90|0)?[-\s]?5\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}\b/g, // Turkish phone
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email addresses
  password: /(?:şifre|parola|password|sifre)[\s:=]+\S+/gi, // Password patterns
};

export interface SensitiveDataResult {
  hasSensitiveData: boolean;
  types: string[];
  cleanedText?: string;
}

export const detectSensitiveData = (text: string): SensitiveDataResult => {
  const detectedTypes: string[] = [];

  if (SENSITIVE_PATTERNS.tcKimlik.test(text)) {
    detectedTypes.push('T.C. Kimlik Numarası');
  }
  if (SENSITIVE_PATTERNS.creditCard.test(text)) {
    detectedTypes.push('Kredi Kartı Numarası');
  }
  if (SENSITIVE_PATTERNS.iban.test(text)) {
    detectedTypes.push('IBAN Numarası');
  }
  if (SENSITIVE_PATTERNS.phone.test(text)) {
    detectedTypes.push('Telefon Numarası');
  }
  if (SENSITIVE_PATTERNS.password.test(text)) {
    detectedTypes.push('Şifre/Parola');
  }

  // Reset lastIndex for all patterns
  Object.values(SENSITIVE_PATTERNS).forEach(pattern => {
    pattern.lastIndex = 0;
  });

  return {
    hasSensitiveData: detectedTypes.length > 0,
    types: detectedTypes,
  };
};

export const maskSensitiveData = (text: string): string => {
  let masked = text;
  
  // Mask TC Kimlik
  masked = masked.replace(SENSITIVE_PATTERNS.tcKimlik, '***********');
  
  // Mask Credit Card
  masked = masked.replace(SENSITIVE_PATTERNS.creditCard, '**** **** **** ****');
  
  // Mask IBAN
  masked = masked.replace(SENSITIVE_PATTERNS.iban, 'TR** **** **** **** **** **** **');
  
  // Mask Phone
  masked = masked.replace(SENSITIVE_PATTERNS.phone, '+90 *** *** ** **');

  // Reset lastIndex
  Object.values(SENSITIVE_PATTERNS).forEach(pattern => {
    pattern.lastIndex = 0;
  });

  return masked;
};

// Hook for using sensitive data filter
export const useSensitiveDataFilter = () => {
  const { toast } = useToast();

  const checkAndWarn = (text: string): boolean => {
    const result = detectSensitiveData(text);
    
    if (result.hasSensitiveData) {
      toast({
        title: '⚠️ Hassas Veri Tespit Edildi',
        description: `Mesajınızda şu hassas veriler bulundu: ${result.types.join(', ')}. Bu bilgileri paylaşmamanızı öneririz.`,
        variant: 'destructive',
        duration: 8000,
      });
      return true;
    }
    
    return false;
  };

  return { detectSensitiveData, maskSensitiveData, checkAndWarn };
};

export default useSensitiveDataFilter;
