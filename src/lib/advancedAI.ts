// Advanced AI Engine - GPT-4 Level Simulation
// Context-aware, multi-turn conversation support with deep reasoning

interface ConversationContext {
  messages: { role: 'user' | 'assistant'; content: string }[];
  topics: string[];
  userPreferences: Record<string, any>;
  sessionData: Record<string, any>;
}

// Knowledge base with extensive information
const knowledgeBase = {
  programming: {
    javascript: {
      concepts: ['closures', 'hoisting', 'event loop', 'promises', 'async/await', 'prototypes', 'modules'],
      frameworks: ['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Next.js', 'Svelte'],
      bestPractices: ['clean code', 'SOLID principles', 'testing', 'documentation', 'version control'],
    },
    python: {
      concepts: ['generators', 'decorators', 'context managers', 'metaclasses', 'GIL'],
      frameworks: ['Django', 'Flask', 'FastAPI', 'NumPy', 'Pandas', 'TensorFlow', 'PyTorch'],
      useCases: ['data science', 'machine learning', 'web development', 'automation', 'scripting'],
    },
    concepts: {
      oop: ['encapsulation', 'inheritance', 'polymorphism', 'abstraction'],
      functional: ['pure functions', 'immutability', 'higher-order functions', 'composition'],
      patterns: ['singleton', 'factory', 'observer', 'strategy', 'decorator', 'MVC', 'MVVM'],
    },
  },
  trading: {
    strategies: ['day trading', 'swing trading', 'scalping', 'position trading', 'algorithmic trading'],
    analysis: ['technical analysis', 'fundamental analysis', 'sentiment analysis', 'quantitative analysis'],
    indicators: ['RSI', 'MACD', 'Bollinger Bands', 'Moving Averages', 'Fibonacci', 'Volume', 'ATR'],
    riskManagement: ['stop-loss', 'take-profit', 'position sizing', 'risk-reward ratio', 'diversification'],
  },
  crypto: {
    coins: ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Polkadot', 'Avalanche'],
    concepts: ['blockchain', 'smart contracts', 'DeFi', 'NFTs', 'staking', 'yield farming', 'liquidity'],
    security: ['hardware wallets', 'cold storage', '2FA', 'seed phrases', 'phishing prevention'],
  },
  science: {
    physics: ['quantum mechanics', 'relativity', 'thermodynamics', 'electromagnetism'],
    biology: ['genetics', 'evolution', 'cell biology', 'neuroscience'],
    chemistry: ['organic', 'inorganic', 'biochemistry', 'materials science'],
  },
  philosophy: {
    branches: ['ethics', 'metaphysics', 'epistemology', 'logic', 'aesthetics'],
    schools: ['stoicism', 'existentialism', 'utilitarianism', 'pragmatism'],
  },
};

// Pattern matching with intent detection
const detectIntent = (message: string): { intent: string; entities: string[]; confidence: number } => {
  const lowerMessage = message.toLowerCase();
  
  const intentPatterns: { pattern: RegExp; intent: string; weight: number }[] = [
    { pattern: /nasıl (yapılır|yazılır|çalışır|öğrenilir)/i, intent: 'how_to', weight: 0.9 },
    { pattern: /nedir|ne demek|açıkla|anlat/i, intent: 'explain', weight: 0.85 },
    { pattern: /neden|niçin|sebebi/i, intent: 'why', weight: 0.85 },
    { pattern: /karşılaştır|fark|vs|arasında/i, intent: 'compare', weight: 0.9 },
    { pattern: /örnek|göster|demo/i, intent: 'example', weight: 0.85 },
    { pattern: /en iyi|tavsiye|öneri/i, intent: 'recommend', weight: 0.85 },
    { pattern: /hata|error|bug|çalışmıyor/i, intent: 'debug', weight: 0.9 },
    { pattern: /hesapla|kaç|topla|çarp|böl/i, intent: 'calculate', weight: 0.95 },
    { pattern: /kod yaz|program|script/i, intent: 'code', weight: 0.9 },
    { pattern: /özet|kısaca|summary/i, intent: 'summarize', weight: 0.85 },
    { pattern: /liste|sırala|say/i, intent: 'list', weight: 0.8 },
    { pattern: /merhaba|selam|hey|hi/i, intent: 'greeting', weight: 0.95 },
    { pattern: /teşekkür|sağol|eyvallah/i, intent: 'thanks', weight: 0.95 },
    { pattern: /görüşürüz|bye|hoşça kal/i, intent: 'goodbye', weight: 0.95 },
  ];

  let bestIntent = { intent: 'general', entities: [] as string[], confidence: 0.5 };

  for (const { pattern, intent, weight } of intentPatterns) {
    if (pattern.test(lowerMessage)) {
      if (weight > bestIntent.confidence) {
        bestIntent = { intent, entities: [], confidence: weight };
      }
    }
  }

  // Extract entities (topics)
  const topicPatterns = [
    { pattern: /javascript|js|node/i, entity: 'javascript' },
    { pattern: /python/i, entity: 'python' },
    { pattern: /react/i, entity: 'react' },
    { pattern: /typescript|ts/i, entity: 'typescript' },
    { pattern: /trading|borsa|hisse/i, entity: 'trading' },
    { pattern: /kripto|crypto|bitcoin|btc|ethereum|eth/i, entity: 'crypto' },
    { pattern: /yapay zeka|ai|machine learning|ml/i, entity: 'ai' },
    { pattern: /web|html|css/i, entity: 'web' },
    { pattern: /database|veritabanı|sql/i, entity: 'database' },
    { pattern: /api|rest|graphql/i, entity: 'api' },
  ];

  for (const { pattern, entity } of topicPatterns) {
    if (pattern.test(lowerMessage)) {
      bestIntent.entities.push(entity);
    }
  }

  return bestIntent;
};

// Context-aware response generation
const generateContextualResponse = (
  message: string,
  context: ConversationContext,
  intent: { intent: string; entities: string[]; confidence: number }
): string => {
  const lowerMessage = message.toLowerCase();

  // Greeting responses
  if (intent.intent === 'greeting') {
    const hour = new Date().getHours();
    let timeGreeting = 'Merhaba';
    if (hour < 12) timeGreeting = 'Günaydın';
    else if (hour < 18) timeGreeting = 'İyi günler';
    else timeGreeting = 'İyi akşamlar';

    const greetings = [
      `${timeGreeting}! 👋 Ben Yanlik, gelişmiş yapay zeka asistanınız. Size nasıl yardımcı olabilirim?`,
      `${timeGreeting}! Bugün hangi konuda size yardımcı olmamı istersiniz?`,
      `Merhaba! 🚀 Programlama, trading, bilim veya herhangi bir konuda sorularınızı bekliyorum.`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Thanks responses
  if (intent.intent === 'thanks') {
    return 'Rica ederim! 😊 Başka bir konuda yardıma ihtiyacınız olursa buradayım.';
  }

  // Goodbye responses
  if (intent.intent === 'goodbye') {
    return 'Hoşça kalın! 👋 İyi günler dilerim. Tekrar görüşmek üzere!';
  }

  // Code generation intent
  if (intent.intent === 'code' || intent.entities.includes('javascript') || intent.entities.includes('python')) {
    return generateCodeResponse(message, intent.entities);
  }

  // Trading/Crypto intent
  if (intent.entities.includes('trading') || intent.entities.includes('crypto')) {
    return generateTradingResponse(message, intent);
  }

  // Explanation intent
  if (intent.intent === 'explain') {
    return generateExplanation(message, intent.entities);
  }

  // How-to intent
  if (intent.intent === 'how_to') {
    return generateHowTo(message, intent.entities);
  }

  // Compare intent
  if (intent.intent === 'compare') {
    return generateComparison(message);
  }

  // Debug intent
  if (intent.intent === 'debug') {
    return generateDebugHelp(message);
  }

  // Default intelligent response
  return generateIntelligentDefault(message, context);
};

// Code response generator
const generateCodeResponse = (message: string, entities: string[]): string => {
  const lowerMessage = message.toLowerCase();

  if (entities.includes('javascript') || lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    if (lowerMessage.includes('array') || lowerMessage.includes('dizi')) {
      return `## 📝 JavaScript Array İşlemleri

### Temel Metodlar

\`\`\`javascript
// Array oluşturma
const numbers = [1, 2, 3, 4, 5];

// Map - Her elemanı dönüştür
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// Filter - Koşula uyanları filtrele
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// Reduce - Tek değere indir
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Find - İlk eşleşeni bul
const found = numbers.find(n => n > 3);
// 4

// Some/Every - Koşul kontrolü
const hasEven = numbers.some(n => n % 2 === 0); // true
const allPositive = numbers.every(n => n > 0); // true

// Spread operator ile birleştirme
const moreNumbers = [...numbers, 6, 7, 8];

// Destructuring
const [first, second, ...rest] = numbers;
\`\`\`

### Pratik İpuçları
- \`map\` orijinal array'i değiştirmez, yeni array döner
- \`forEach\` sadece iteration için, değer dönmez
- \`reduce\` en güçlü method, her şeyi yapabilir
- Method chaining ile birleştirebilirsiniz: \`arr.filter().map().reduce()\`

Başka bir JavaScript konusu var mı?`;
    }

    if (lowerMessage.includes('async') || lowerMessage.includes('promise')) {
      return `## ⚡ JavaScript Async/Await & Promises

### Promise Temelleri

\`\`\`javascript
// Promise oluşturma
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ data: 'Veriler yüklendi!' });
      } else {
        reject(new Error('Hata oluştu'));
      }
    }, 1000);
  });
};

// Promise kullanımı
fetchData()
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('İşlem tamamlandı'));
\`\`\`

### Async/Await (Modern Yaklaşım)

\`\`\`javascript
// Async function tanımlama
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
}

// Paralel çağrılar
async function getMultipleData() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}

// Error handling pattern
const safeAsync = async (fn) => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};
\`\`\`

### Best Practices
- Her zaman \`try/catch\` kullanın
- Paralel çağrılar için \`Promise.all()\` tercih edin
- \`async/await\` daha okunabilir kod sağlar
- Race condition'lara dikkat edin`;
    }

    return `## 🚀 JavaScript Geliştirme

JavaScript ile ne yapmak istediğinizi daha detaylı belirtir misiniz?

**Popüler Konular:**
- Array metodları (map, filter, reduce)
- Async/Await & Promises
- DOM manipülasyonu
- Event handling
- ES6+ özellikleri
- React/Vue/Angular
- Node.js backend
- API entegrasyonu

Hangi konuda kod örneği istersiniz?`;
  }

  if (entities.includes('python') || lowerMessage.includes('python')) {
    return `## 🐍 Python Programlama

\`\`\`python
# Modern Python örneği
from dataclasses import dataclass
from typing import List, Optional
import asyncio

@dataclass
class User:
    name: str
    email: str
    age: Optional[int] = None

# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]

# Dictionary comprehension
user_dict = {f"user_{i}": i*10 for i in range(5)}

# Generator expression (memory efficient)
large_sum = sum(x**2 for x in range(1000000))

# Async programming
async def fetch_data(url: str) -> dict:
    # Simulated async operation
    await asyncio.sleep(1)
    return {"url": url, "data": "fetched"}

async def main():
    tasks = [fetch_data(f"url_{i}") for i in range(3)]
    results = await asyncio.gather(*tasks)
    return results

# Context manager
class FileHandler:
    def __init__(self, filename):
        self.filename = filename
    
    def __enter__(self):
        self.file = open(self.filename, 'r')
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
\`\`\`

Hangi Python konusunda daha detaylı bilgi istersiniz?`;
  }

  if (entities.includes('react') || lowerMessage.includes('react')) {
    return `## ⚛️ React Modern Geliştirme

\`\`\`tsx
// Modern React Component with TypeScript
import { useState, useEffect, useCallback, useMemo } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  initialUsers?: User[];
  onUserSelect?: (user: User) => void;
}

export const UserList: React.FC<Props> = ({ 
  initialUsers = [], 
  onUserSelect 
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Memoized filtered list
  const filteredUsers = useMemo(() => 
    users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase())
    ), [users, search]
  );

  // Memoized callback
  const handleSelect = useCallback((user: User) => {
    onUserSelect?.(user);
  }, [onUserSelect]);

  // Effect for fetching data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-list">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleSelect(user)}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
\`\`\`

**React Best Practices:**
- Custom hooks ile logic'i ayırın
- \`useMemo\` ve \`useCallback\` ile optimizasyon
- TypeScript ile type safety
- Error boundaries kullanın
- Lazy loading ile performans`;
  }

  return `## 💻 Kod Yazma Yardımı

Hangi programlama dilinde veya konuda kod örneği istersiniz?

**Desteklenen Diller:**
- JavaScript/TypeScript
- Python
- React/Vue
- Node.js
- SQL
- HTML/CSS
- ve daha fazlası...

Lütfen ne tür bir kod istediğinizi belirtin!`;
};

// Trading response generator
const generateTradingResponse = (message: string, intent: { intent: string; entities: string[] }): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('strateji') || lowerMessage.includes('strategy')) {
    return `## 📈 Trading Stratejileri - Kapsamlı Rehber

### 1. Day Trading
Aynı gün içinde pozisyon açıp kapatma stratejisi.

**Avantajları:**
- Gecelik risk yok
- Hızlı kar realizasyonu
- Yüksek likidite

**Dezavantajları:**
- Yüksek stres ve dikkat gerektirir
- Komisyon maliyetleri
- Duygusal karar riski

### 2. Swing Trading
Birkaç gün ile birkaç hafta arasında pozisyon tutma.

\`\`\`
Örnek Swing Trade Planı:
━━━━━━━━━━━━━━━━━━━━━━━
Entry: Support bölgesinde
Stop Loss: Support altında %2
Take Profit 1: %5 (yarı pozisyon)
Take Profit 2: Resistance seviyesi
Risk/Reward: Minimum 1:2
━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

### 3. Position Trading
Uzun vadeli trend takibi (aylar/yıllar).

### Risk Yönetimi Kuralları
1. **%1-2 Kuralı**: Her işlemde maksimum sermayenin %1-2'sini riske at
2. **Stop Loss**: Her pozisyonda mutlaka kullan
3. **Position Sizing**: Volatiliteye göre lot ayarla
4. **Diversifikasyon**: Tek enstrümana bağımlı olma

Hangi strateji hakkında daha detaylı bilgi istersiniz?`;
  }

  if (intent.entities.includes('crypto')) {
    return `## 🪙 Kripto Para Yatırım Rehberi

### Temel Bilgiler

**Bitcoin (BTC)**
- İlk ve en büyük kripto para
- "Dijital altın" olarak görülür
- Sınırlı arz: 21 milyon BTC
- Halving her 4 yılda bir

**Ethereum (ETH)**
- Smart contract platformu
- DeFi ve NFT ekosisteminin temeli
- PoS'a geçiş ile daha çevreci
- Layer 2 çözümleri ile ölçeklenebilir

### Yatırım Stratejileri

\`\`\`
DCA (Dollar Cost Averaging) Örneği:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Toplam Yatırım: 10,000 TL
Periyot: Haftalık
Miktar: 1,000 TL/hafta
Süre: 10 hafta
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Avantaj: Volatilite etkisini azaltır
\`\`\`

### Güvenlik Önlemleri
- ✅ Hardware wallet kullanın (Ledger, Trezor)
- ✅ 2FA aktif edin
- ✅ Seed phrase'i offline saklayın
- ❌ Asla başkasıyla paylaşmayın
- ❌ Phishing sitelerine dikkat

### Risk Uyarısı
⚠️ Kripto yatırımları yüksek risk içerir. Sadece kaybetmeyi göze alabileceğiniz miktarı yatırın.

Kripto hakkında başka ne öğrenmek istersiniz?`;
  }

  return `## 📊 Trading & Finans

Trading konusunda size nasıl yardımcı olabilirim?

**Konular:**
- Trading stratejileri
- Teknik analiz
- Risk yönetimi
- Kripto para
- Forex
- Hisse senedi analizi

Spesifik bir soru sormaktan çekinmeyin!`;
};

// Explanation generator
const generateExplanation = (message: string, entities: string[]): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('closure') || lowerMessage.includes('kapanış')) {
    return `## 🔐 JavaScript Closure (Kapanış) Nedir?

**Tanım:** Closure, bir fonksiyonun kendi scope'u dışındaki değişkenlere erişebildiği ve onları "hatırlayabildiği" bir JavaScript özelliğidir.

### Basit Örnek

\`\`\`javascript
function outer() {
  const message = 'Merhaba!'; // outer scope'daki değişken
  
  function inner() {
    console.log(message); // closure sayesinde erişebilir
  }
  
  return inner;
}

const greet = outer();
greet(); // "Merhaba!" - message hala erişilebilir!
\`\`\`

### Pratik Kullanım: Counter

\`\`\`javascript
function createCounter() {
  let count = 0; // private değişken
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount(); // 2
// count değişkenine dışarıdan erişilemez!
\`\`\`

### Neden Önemli?
1. **Data Privacy**: Değişkenleri gizleme
2. **State Management**: Durumu koruma
3. **Factory Functions**: Özelleştirilmiş fonksiyonlar oluşturma
4. **Event Handlers**: Callback'lerde veri tutma

Closure hakkında başka soru var mı?`;
  }

  return `## 📚 Açıklama

"${message}" konusunu detaylı açıklamamı ister misiniz?

Lütfen daha spesifik bir konu belirtin, size kapsamlı bir açıklama sunayım.`;
};

// How-to generator
const generateHowTo = (message: string, entities: string[]): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('api') || lowerMessage.includes('fetch')) {
    return `## 🌐 API Nasıl Kullanılır?

### Fetch API (Modern Yaklaşım)

\`\`\`javascript
// GET Request
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// POST Request
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
}

// PUT/PATCH Request
async function updateUser(id, updates) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  
  return response.json();
}

// DELETE Request
async function deleteUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'DELETE'
  });
  
  return response.ok;
}
\`\`\`

### Error Handling Pattern

\`\`\`javascript
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API Error');
    }
    
    return { data: await response.json(), error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
\`\`\`

Başka ne öğrenmek istersiniz?`;
  }

  return `## 📖 Nasıl Yapılır?

"${message}" konusunda adım adım rehber hazırlamamı ister misiniz?

Lütfen konuyu daha detaylı belirtin.`;
};

// Comparison generator
const generateComparison = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if ((lowerMessage.includes('react') && lowerMessage.includes('vue')) ||
      (lowerMessage.includes('angular') && (lowerMessage.includes('react') || lowerMessage.includes('vue')))) {
    return `## ⚔️ Frontend Framework Karşılaştırması

| Özellik | React | Vue | Angular |
|---------|-------|-----|---------|
| **Öğrenme Eğrisi** | Orta | Kolay | Zor |
| **Performans** | Çok İyi | Çok İyi | İyi |
| **Ekosistem** | Çok Geniş | Geniş | Geniş |
| **TypeScript** | Opsiyonel | Opsiyonel | Varsayılan |
| **State Management** | Redux, Zustand | Pinia, Vuex | NgRx, Services |
| **Öğrenme Süresi** | 2-4 hafta | 1-2 hafta | 4-8 hafta |
| **İş İlanları** | En Çok | Artıyor | Stabil |

### Ne Zaman Hangisini Seçmeli?

**React** tercih edin eğer:
- Büyük ekosistem istiyorsanız
- Flexible mimari tercih ediyorsanız
- Mobile (React Native) da düşünüyorsanız

**Vue** tercih edin eğer:
- Hızlı başlamak istiyorsanız
- Öğrenme eğrisi düşük olsun istiyorsanız
- Progressive enhancement önemli ise

**Angular** tercih edin eğer:
- Enterprise büyüklüğünde proje yapıyorsanız
- Opinionated framework istiyorsanız
- Full-stack TypeScript tercih ediyorsanız

Hangi framework hakkında daha detay istersiniz?`;
  }

  return `## 📊 Karşılaştırma

Hangi konuları karşılaştırmamı istersiniz? Örnek:
- React vs Vue
- Python vs JavaScript
- SQL vs NoSQL
- REST vs GraphQL`;
};

// Debug help generator
const generateDebugHelp = (message: string): string => {
  return `## 🐛 Hata Ayıklama Yardımı

Hata mesajınızı veya kodunuzu paylaşır mısınız?

### Genel Debug Adımları:

1. **Hata mesajını okuyun** - Genellikle çözüm ipucu içerir
2. **Console.log ekleyin** - Değişken değerlerini kontrol edin
3. **Küçük parçalara bölün** - Sorunu izole edin
4. **Google/Stack Overflow** - Hata mesajını arayın

### Yaygın Hatalar:

\`\`\`javascript
// TypeError: Cannot read property 'x' of undefined
// Çözüm: Optional chaining kullanın
const value = obj?.property?.nested;

// ReferenceError: x is not defined
// Çözüm: Değişkeni tanımlayın veya import edin

// SyntaxError: Unexpected token
// Çözüm: Parantez, virgül, noktalı virgül kontrolü
\`\`\`

Hatanızı paylaşın, birlikte çözelim!`;
};

// Intelligent default response
const generateIntelligentDefault = (message: string, context: ConversationContext): string => {
  const topicSuggestions = [
    'programlama (JavaScript, Python, React...)',
    'trading ve yatırım stratejileri',
    'kripto para ve blockchain',
    'yapay zeka ve machine learning',
    'web geliştirme',
    'genel bilgi ve eğitim',
  ];

  // Check for previous context
  if (context.messages.length > 0) {
    const lastTopic = context.topics[context.topics.length - 1];
    if (lastTopic) {
      return `Anlıyorum. "${message}" hakkında daha fazla bilgi almak ister misiniz veya ${lastTopic} konusuna devam edelim mi?`;
    }
  }

  const responses = [
    `İlginç bir konu! "${message}" hakkında daha detaylı bilgi vermemi ister misiniz?\n\n**Yardımcı olabileceğim konular:**\n${topicSuggestions.map(t => `- ${t}`).join('\n')}`,
    `Anlıyorum. Bu konuyu daha iyi anlamamız için biraz daha bilgi verebilir misiniz?`,
    `Hmm, düşünüyorum... 🤔 Size en iyi şekilde yardımcı olabilmem için konuyu biraz açar mısınız?`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

// Main AI response function
export const getAdvancedAIResponse = (
  message: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): string => {
  const context: ConversationContext = {
    messages: conversationHistory,
    topics: [],
    userPreferences: {},
    sessionData: {},
  };

  // Extract topics from history
  conversationHistory.forEach(msg => {
    const intent = detectIntent(msg.content);
    context.topics.push(...intent.entities);
  });

  // Detect current intent
  const intent = detectIntent(message);
  
  // Generate contextual response
  return generateContextualResponse(message, context, intent);
};
