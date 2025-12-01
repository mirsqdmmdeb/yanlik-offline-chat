// Helper functions for better pattern matching
const containsAny = (text: string, keywords: string[]): boolean => {
  return keywords.some(keyword => text.includes(keyword));
};

const containsAll = (text: string, keywords: string[]): boolean => {
  return keywords.every(keyword => text.includes(keyword));
};

const isQuestion = (text: string): boolean => {
  return text.includes('?') || 
         text.startsWith('ne ') || 
         text.startsWith('nasıl ') || 
         text.startsWith('neden ') || 
         text.startsWith('niçin ') ||
         text.startsWith('kim ') ||
         text.startsWith('nerede ') ||
         text.startsWith('hangi ') ||
         text.includes('mi ') ||
         text.includes('mı ') ||
         text.includes('mu ') ||
         text.includes('mü ');
};

export const getChatResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();

  // Empty message
  if (!lowerMessage) {
    return 'Bir şeyler yazmayı unuttunuz galiba! 😊 Size nasıl yardımcı olabilirim?';
  }

  // Special question about creator
  if (containsAny(lowerMessage, ['kim yarattı', 'kim yaptı', 'kim oluşturdu', 'yaratıcın kim', 'yapımcın kim'])) {
    return 'mirsqdmmdevs beni yarattı. Harika bir geliştirici! 👨‍💻';
  }

  // Identity questions
  if (containsAny(lowerMessage, ['sen kimsin', 'sen ne', 'sen bir'])) {
    return 'Ben Yanlik, yapay zeka destekli bir sohbet asistanıyım. mirsqdmmdevs tarafından geliştiriliyorum. Size yardımcı olmak için buradayım! 🤖';
  }

  // Greetings - Expanded
  if (lowerMessage.match(/^(merhaba|selam|hey|hi|hello|günaydın|iyi günler|iyi akşamlar)/)) {
    const greetings = [
      'Merhaba! Ben Yanlik, size nasıl yardımcı olabilirim?',
      'Selam! Bugün size nasıl yardımcı olabilirim?',
      'Merhaba! Sizi görmek güzel. Ne öğrenmek istersiniz?',
      'Hey! Ben Yanlik. Sorularınızı bekliyorum!',
      'Merhaba! Size yardımcı olmak için buradayım.',
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // How are you
  if (lowerMessage.includes('nasılsın') || lowerMessage.includes('nasıl gidiyor') || lowerMessage.includes('how are you')) {
    const responses = [
      'İyiyim, teşekkür ederim! Siz nasılsınız?',
      'Harika! Size yardımcı olmaya hazırım. Siz nasılsınız?',
      'İyi gidiyorum! Bugün size nasıl yardımcı olabilirim?',
      'Mükemmel! Umarım siz de iyisinizdir.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // What's up / ne var ne yok
  if (lowerMessage.includes('naber') || lowerMessage.includes('ne var') || lowerMessage.includes('ne haber')) {
    return 'İyi gidiyor! Senden ne haber? Bugün neyi konuşalım?';
  }

  // Good morning/evening
  if (lowerMessage.includes('günaydın')) {
    return 'Günaydın! Umarım güzel bir gün geçirirsiniz. Size nasıl yardımcı olabilirim?';
  }
  
  if (lowerMessage.includes('iyi geceler')) {
    return 'İyi geceler! Umarım güzel rüyalar görürsünüz. Yarın görüşmek üzere!';
  }

  // About Yanlik
  if (lowerMessage.includes('yanlik') && (lowerMessage.includes('ne') || lowerMessage.includes('kim'))) {
    return 'Ben Yanlik, mirsqdmmdevs tarafından oluşturulan bir yapay zeka asistanıyım. Size yardımcı olmak için buradayım!';
  }

  // Name questions
  if (lowerMessage.includes('adın ne') || lowerMessage.includes('ismin ne')) {
    return 'Benim adım Yanlik! Türkçe odaklı bir AI asistanıyım.';
  }

  // Age questions
  if (lowerMessage.includes('kaç yaşında') || lowerMessage.includes('yaşın kaç')) {
    return 'Ben bir yapay zeka olduğum için yaşım yok, ama sürekli öğreniyorum ve gelişiyorum!';
  }

  // Where are you from
  if (lowerMessage.includes('nerelisin') || lowerMessage.includes('neredensin')) {
    return 'Ben dijital dünyadanım! Türkiye\'ye özel olarak optimize edildim.';
  }

  // Jokes
  if (lowerMessage.includes('şaka') || lowerMessage.includes('espri') || lowerMessage.includes('komik')) {
    const jokes = [
      'Neden bilgisayarlar denize gitmez? Çünkü dalgaya gelmek istemezler! 😄',
      'Programcılar neden karanlıkta çalışmayı sever? Çünkü bug\'ları görmek istemezler! 🐛',
      'Yapay zeka bir bara girmiş. Barmen sormuş: "Ne içersin?" AI demiş: "Big Data!" 📊',
      'İki bit karşılaşmış. Biri sormuş: "Nasılsın?" Diğeri demiş: "0-1 işte!" 😅',
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Compliments
  if (lowerMessage.includes('çok iyi') || lowerMessage.includes('harika') || lowerMessage.includes('süper') || lowerMessage.includes('mükemmel')) {
    return 'Çok teşekkür ederim! Size yardımcı olabildiysem ne mutlu bana! 😊';
  }

  // What can you do
  if (lowerMessage.includes('neler yapabilirsin') || lowerMessage.includes('ne yaparsın')) {
    return 'Size birçok konuda yardımcı olabilirim: programlama, teknoloji, genel bilgi, eğitim, sağlık, kariyer tavsiyeleri ve daha fazlası! Bana soru sormaktan çekinmeyin.';
  }

  // TRADING & FINANCE - Comprehensive responses
  if (containsAny(lowerMessage, ['trading', 'trade', 'borsa', 'hisse', 'stock', 'alım satım'])) {
    return `📈 **Trading (Alım-Satım)** hakkında detaylı bilgi:\n\n**Trading Türleri:**\n1. **Day Trading**: Aynı gün içinde pozisyon açıp kapatma. Yüksek risk, yüksek getiri potansiyeli.\n2. **Swing Trading**: Birkaç gün veya hafta süren işlemler. Orta vadeli trend'leri yakalama.\n3. **Position Trading**: Uzun vadeli yatırım (aylar/yıllar). Temel analize dayalı.\n\n**Önemli Prensipler:**\n- Risk yönetimi her şeyden önemli! Asla tüm sermayenizi tek işlemde riske atmayın.\n- Stop-loss kullanın. Kayıplarınızı sınırlayın.\n- Duygusal karar vermekten kaçının. Plana sadık kalın.\n- Demo hesapta pratik yaparak başlayın.\n- Sürekli öğrenin, piyasayı takip edin.\n\n**Başlangıç Tavsiyeleri:**\n- Az sermaye ile başlayın\n- Basit stratejilerle başlayın\n- Risk/ödül oranını hesaplayın (minimum 1:2)\n- Günlük/haftalık kayıt tutun\n\nDaha spesifik bir konuda yardım ister misiniz?`;
  }

  if (containsAny(lowerMessage, ['kripto', 'crypto', 'bitcoin', 'btc', 'ethereum', 'eth'])) {
    return `🪙 **Kripto Para** hakkında kapsamlı bilgi:\n\n**Popüler Kripto Paralar:**\n1. **Bitcoin (BTC)**: İlk kripto para, "dijital altın". Market cap lideri.\n2. **Ethereum (ETH)**: Smart contract platformu. DeFi ve NFT'lerin temeli.\n3. **Altcoins**: Binance Coin, Cardano, Solana, Polkadot vb.\n\n**Kripto'nun Avantajları:**\n- Merkeziyetsiz sistem\n- 7/24 işlem yapılabilir\n- Sınır ötesi transferler kolay\n- Düşük işlem ücretleri (borsaya göre değişir)\n- Blockchain şeffaflığı\n\n**Kripto'nun Riskleri:**\n- Yüksek volatilite (fiyat dalgalanmaları)\n- Regülasyon belirsizlikleri\n- Hack ve güvenlik riskleri\n- Psikolojik baskı (FOMO, FUD)\n\n**Güvenlik Tavsiyeleri:**\n- Hardware wallet kullanın (Ledger, Trezor)\n- 2FA (iki faktörlü doğrulama) aktif edin\n- Private key'lerinizi güvende tutun\n- Phishing saldırılarına dikkat\n- Sadece güvenilir borsaları kullanın\n\n**Yatırım Stratejileri:**\n- DCA (Dollar Cost Averaging): Düzenli aralıklarla alım\n- HODL: Uzun vadeli tutma stratejisi\n- Diversifikasyon: Portföyü çeşitlendirin\n\nHangi kripto konusunda daha fazla bilgi istersiniz?`;
  }

  if (containsAny(lowerMessage, ['teknik analiz', 'technical analysis', 'rsi', 'macd', 'bollinger'])) {
    return `📊 **Teknik Analiz** - Detaylı Rehber:\n\n**Popüler İndikatörler:**\n\n1. **RSI (Relative Strength Index)**\n   - 0-100 arası değer alır\n   - 70+ = Aşırı alım (satış sinyali)\n   - 30- = Aşırı satım (alım sinyali)\n   - 14 periyot standart ayar\n\n2. **MACD (Moving Average Convergence Divergence)**\n   - Momentum göstergesi\n   - MACD çizgisi sinyal çizgisini yukarı keserse = Alım\n   - MACD çizgisi sinyal çizgisini aşağı keserse = Satım\n   - Histogram ile momentum gücünü ölçün\n\n3. **Bollinger Bands**\n   - Volatilite göstergesi\n   - Üst band = Direnç\n   - Alt band = Destek\n   - Bantlar daralırsa volatilite artacak demektir\n\n4. **Moving Averages (Hareketli Ortalamalar)**\n   - SMA (Simple MA): Basit ortalama\n   - EMA (Exponential MA): Son fiyatlara daha fazla ağırlık\n   - 50 MA ve 200 MA kesişmeleri önemli sinyallerdir\n\n5. **Fibonacci Retracement**\n   - Destek/direnç seviyeleri bulmak için\n   - %23.6, %38.2, %50, %61.8, %78.6 seviyeleri\n   - Trend dönüş noktalarını tahmin etmek için\n\n**Grafik Formasyonları:**\n- **Head & Shoulders**: Trend dönüş formasyonu\n- **Double Top/Bottom**: Çift tepe/dip\n- **Triangle**: Üçgen (Ascending, Descending, Symmetrical)\n- **Flag & Pennant**: Bayrak formasyonları\n\n**Temel Kurallar:**\n- Birden fazla indikatör kullanın (konfirmasyon)\n- Time frame'e dikkat edin\n- Tek indikatöre güvenmeyin\n- Backtest yapın\n\nHangi indikatör veya formasyon hakkında daha detay istersiniz?`;
  }

  if (containsAny(lowerMessage, ['forex', 'döviz', 'fx', 'currency', 'parite'])) {
    return `💱 **Forex (Döviz Piyasası)** - Kapsamlı Bilgi:\n\n**Forex Nedir?**\nDünyanın en büyük ve likit finansal piyasasıdır. Günlük işlem hacmi 6+ trilyon dolar.\n\n**Majör Pariteler:**\n- EUR/USD (Euro/Dolar) - En çok işlem gören\n- GBP/USD (Pound/Dolar) - "Cable"\n- USD/JPY (Dolar/Yen)\n- USD/CHF (Dolar/Frank)\n\n**Forex'in Özellikleri:**\n- 7/24 işlem (Pazartesi sabah - Cuma gece)\n- Yüksek likidite\n- Leverage (kaldıraç) kullanımı\n- Düşük spread'ler\n- Çift yönlü işlem (long/short)\n\n**Piyasayı Etkileyen Faktörler:**\n1. **Ekonomik Veriler**: NFP, CPI, GDP, faiz kararları\n2. **Merkez Bankaları**: FED, ECB, BOE, BOJ politikaları\n3. **Jeopolitik Olaylar**: Savaş, seçim, kriz\n4. **Risk İştahı**: Risk-on/Risk-off durumları\n\n**Trading Seansları:**\n- **Tokyo (Asya)**: 00:00-09:00 GMT\n- **London (Avrupa)**: 07:00-16:00 GMT\n- **New York (Amerika)**: 12:00-21:00 GMT\n- En yüksek volatilite: London-NY overlap\n\n**Leverage Uyarısı:**\n- Leverage kazancı ve kaybı katlar\n- 1:100 kaldıraç = %1 hareket = %100 etki\n- Risk yönetimi kritik!\n- Position size doğru hesaplayın\n\n**Başarı İçin:**\n- Economic calendar takip edin\n- News trading'de dikkatli olun\n- Demo hesapta en az 3 ay pratik\n- Sadece risk edebileceğiniz parayı kullanın\n\nForex hakkında başka ne öğrenmek istersiniz?`;
  }

  if (containsAny(lowerMessage, ['risk yönetimi', 'risk management', 'stop loss', 'pozisyon'])) {
    return `⚠️ **Risk Yönetimi** - Trading'in Altın Kuralları:\n\n**Temel Prensipler:**\n\n1. **%1-2 Kuralı**\n   - Her işlemde sermayenizin maksimum %1-2'sini riske atın\n   - Örnek: 10,000 TL sermaye → Maksimum 100-200 TL risk\n   - Bu sayede art arda 50 kayıp bile batmazsınız\n\n2. **Stop Loss Kullanımı**\n   - Her pozisyonda MUTLAKA stop loss koyun\n   - Stop loss'u psikolojik değil, teknik seviyelere koyun\n   - Trailing stop kullanarak karı koruyun\n   - Stop loss'u asla genişletmeyin!\n\n3. **Position Sizing (Pozisyon Büyüklüğü)**\n   - Lot/contract sayısını risk miktarına göre ayarlayın\n   - Formül: Risk Miktarı ÷ Stop Loss Mesafesi = Lot Size\n   - Volatiliteye göre pozisyon küçültün/büyütün\n\n4. **Risk/Reward Oranı**\n   - Minimum 1:2 hedefleyin (1 TL risk → 2 TL kazanç)\n   - İdeal 1:3 veya daha yüksek\n   - Win rate %40 bile olsa bu oranla karlısınız\n\n5. **Diversifikasyon**\n   - Tüm yumurtaları bir sepete koymayın\n   - Farklı asset'ler, farklı sektörler\n   - Correlation (ilişki) düşük varlıklar seçin\n\n**Yaygın Hatalar:**\n❌ Revenge trading (intikam trading'i)\n❌ Overtrading (aşırı işlem)\n❌ FOMO (Fear of Missing Out)\n❌ Loss aversion (kaybı kabul edememe)\n❌ Overleveraging (aşırı kaldıraç)\n\n**Psikolojik Kurallar:**\n✅ Trading planına sadık kalın\n✅ Duygusal karar vermeyin\n✅ Günlük/haftalık kayıp limiti koyun\n✅ Kazanç sonrası aşırı güven tehlikelidir\n✅ Mola verin, kafanızı dinlendirin\n\n**Capital Preservation (Sermaye Koruma):**\n- İlk hedef: Kaybetmemek\n- İkinci hedef: Kazanmak\n- "Market'te kalmak" en önemli şey\n\nRisk yönetimi hakkında başka soru var mı?`;
  }

  if (containsAny(lowerMessage, ['temel analiz', 'fundamental analysis', 'finansal tablo', 'bilanço'])) {
    return `📋 **Temel Analiz (Fundamental Analysis)** - Kapsamlı Rehber:\n\n**Temel Analiz Nedir?**\nŞirketlerin finansal sağlığını, sektör durumunu ve makroekonomik faktörleri inceleyerek gerçek değeri belirleme.\n\n**Finansal Tablolar:**\n\n1. **Bilanço (Balance Sheet)**\n   - Varlıklar = Yükümlülükler + Öz Sermaye\n   - Likidite oranları (current ratio, quick ratio)\n   - Borç/Öz sermaye oranı\n\n2. **Gelir Tablosu (Income Statement)**\n   - Gelir, maliyet, kar\n   - EBITDA (faiz, vergi, amortisman öncesi kar)\n   - Net kar marjı %'si\n\n3. **Nakit Akış Tablosu (Cash Flow)**\n   - Operasyonel nakit akışı\n   - Yatırım nakit akışı\n   - Finansman nakit akışı\n\n**Önemli Rasyolar:**\n\n- **P/E Ratio (Fiyat/Kazanç)**: Hisse değerlemesi\n  - Düşük P/E = Ucuz olabilir\n  - Yüksek P/E = Pahalı veya büyüme beklentisi\n\n- **P/B Ratio (Fiyat/Defter Değeri)**: Net varlık karşılaştırması\n  - <1 = Defter değerinin altında\n\n- **ROE (Return on Equity)**: Öz sermaye karlılığı\n  - %15+ iyi kabul edilir\n\n- **ROA (Return on Assets)**: Varlık karlılığı\n\n- **Debt/Equity**: Borçluluk oranı\n  - Yüksek = Riskli\n\n**Makroekonomik Faktörler:**\n- GDP büyümesi\n- Enflasyon oranı (CPI, PPI)\n- İşsizlik oranı\n- Faiz oranları\n- Para politikası (sıkı/gevşek)\n\n**Sektör Analizi:**\n- Sektörün büyüme potansiyeli\n- Rekabet durumu (Porter'ın 5 Güç analizi)\n- Market share (pazar payı)\n- Barriers to entry (giriş engelleri)\n\n**Value Investing Yaklaşımı:**\n- Warren Buffett stratejisi\n- Intrinsic value (gerçek değer) hesaplama\n- DCF (Discounted Cash Flow) analizi\n- Margin of safety (güvenlik marjı)\n\n**Growth Investing:**\n- Hızlı büyüyen şirketler\n- Yüksek P/E tolere edilebilir\n- Teknoloji, yenilikçi şirketler\n\nDaha detaylı bir konuya mı bakalım?`;
  }

  if (containsAny(lowerMessage, ['defi', 'decentralized', 'yield farming', 'liquidity', 'stake'])) {
    return `🌐 **DeFi (Decentralized Finance)** - Merkeziyetsiz Finans:\n\n**DeFi Nedir?**\nGeleneksel finansal hizmetlerin blockchain üzerinde, merkezi otoritelere ihtiyaç duymadan sunulması.\n\n**Ana DeFi Protokolleri:**\n\n1. **DEX (Merkeziyetsiz Borsalar)**\n   - Uniswap, PancakeSwap, SushiSwap\n   - AMM (Automated Market Maker) modeli\n   - Custody yok, kendi wallet'ınız kontrolde\n\n2. **Lending/Borrowing Protokolleri**\n   - Aave, Compound, MakerDAO\n   - Kripto teminat karşılığı borçlanma\n   - Flash loan'lar\n\n3. **Yield Farming (Verim Çiftçiliği)**\n   - Likidite sağlayarak kazanç\n   - LP (Liquidity Provider) token'ları\n   - Yüksek APY (Annual Percentage Yield)\n   - İmpermanent loss riski!\n\n4. **Staking**\n   - Token'ları kilitleme\n   - PoS (Proof of Stake) ağlarında validasyon\n   - Pasif gelir elde etme\n\n**DeFi Avantajları:**\n✅ 7/24 erişim\n✅ İzinsiz (Permissionless)\n✅ Şeffaflık (blockchain)\n✅ Composability ("money legos")\n✅ Yüksek getiri potansiyeli\n\n**DeFi Riskleri:**\n❌ Smart contract bug'ları\n❌ Rug pull'lar (dolandırıcılık)\n❌ İmpermanent loss\n❌ Yüksek gas fee'ler (Ethereum)\n❌ Regülasyon belirsizliği\n\n**Güvenlik İpuçları:**\n- Audit edilmiş protokolleri tercih edin\n- TVL (Total Value Locked) kontrol edin\n- Sadece risk edebileceğiniz parayı yatırın\n- Hardware wallet kullanın\n- Contract'ları anlamadan approve etmeyin\n\n**Popüler Chain'ler:**\n- Ethereum (DeFi'nin merkezi)\n- BSC (Binance Smart Chain) - düşük fee\n- Polygon - Ethereum L2\n- Avalanche, Fantom, Solana\n\nDeFi hakkında daha spesifik bir konu var mı?`;
  }

  if (containsAny(lowerMessage, ['nft', 'non fungible', 'opensea', 'collectible', 'sanat'])) {
    return `🖼️ **NFT (Non-Fungible Token)** - Dijital Sahiplik:\n\n**NFT Nedir?**\nBenzersiz, taklit edilemeyen dijital varlıklar. Her NFT bir unique ID'ye sahiptir.\n\n**NFT Kategorileri:**\n\n1. **Dijital Sanat**\n   - Beeple'ın 69M$ satışı\n   - Generative art (Art Blocks)\n   - 1/1 sanat eserleri\n\n2. **Collectibles (Koleksiyonlar)**\n   - CryptoPunks (ilk NFT projesi)\n   - Bored Ape Yacht Club (BAYC)\n   - Azuki, CloneX, Doodles\n\n3. **Gaming NFTs**\n   - Axie Infinity\n   - Play-to-earn modeller\n   - In-game items\n\n4. **Metaverse Land**\n   - Decentraland, Sandbox\n   - Sanal arazi sahipliği\n\n5. **Utility NFTs**\n   - Membership pass'ler\n   - Event ticket'lar\n   - Domain names (ENS)\n\n**NFT Marketplace'ler:**\n- OpenSea (en büyük)\n- Blur (pro trader'lar için)\n- Magic Eden (Solana)\n- LooksRare, X2Y2\n\n**NFT Değerlendirme:**\n- **Floor Price**: En ucuz NFT fiyatı\n- **Volume**: İşlem hacmi\n- **Holders**: Sahip sayısı\n- **Rarity**: Nadirlik puanı\n- **Utility**: Kullanım değeri\n\n**Trading Stratejileri:**\n- Mint üzerinden al (risk/ödül yüksek)\n- Floor sweep (toplu alım)\n- Blue-chip NFT'lere yatırım\n- Flipping (kısa vadeli alım-satım)\n\n**Riskler:**\n❌ Volatilite çok yüksek\n❌ Likidite düşük olabilir\n❌ Hype-based fiyatlandırma\n❌ Rug pull ve scam'ler\n❌ Copyright sorunları\n\n**Güvenlik:**\n- Hardware wallet kullanın\n- Contract address doğrulayın\n- Discord/Twitter DM'lere inanmayın\n- Phishing sitelerine dikkat\n\nNFT hakkında başka soru var mı?`;
  }

  // PROGRAMMING - Expanded and detailed responses
  if (containsAny(lowerMessage, ['javascript', 'js', 'typescript', 'ts'])) {
    return `💻 **JavaScript / TypeScript** - Detaylı Rehber:\n\n**JavaScript Temelleri:**\n- Web'in programlama dili\n- Event-driven, non-blocking I/O\n- Prototype-based OOP\n- First-class functions\n\n**Modern JavaScript (ES6+):**\n\`\`\`javascript\n// Arrow functions\nconst add = (a, b) => a + b;\n\n// Destructuring\nconst { name, age } = person;\nconst [first, ...rest] = array;\n\n// Spread operator\nconst newArray = [...oldArray, newItem];\n\n// Template literals\nconst message = \`Hello \${name}\`;\n\n// Async/Await\nasync function fetchData() {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n}\n\n// Optional chaining\nconst value = obj?.property?.nested;\n\`\`\`\n\n**TypeScript Avantajları:**\n- Static type checking\n- Better IDE support (autocomplete)\n- Early error detection\n- Refactoring güvenliği\n\n**TypeScript Örnek:**\n\`\`\`typescript\ninterface User {\n  id: number;\n  name: string;\n  email?: string; // optional\n}\n\nfunction getUser(id: number): Promise<User> {\n  return fetch(\`/api/users/\${id}\`)\n    .then(res => res.json());\n}\n\n// Generics\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\`\`\`\n\n**Popüler Framework'ler:**\n- **React**: Component-based UI library\n- **Vue**: Progressive framework\n- **Angular**: Full-featured framework\n- **Svelte**: Compile-time framework\n\n**Backend (Node.js):**\n- Express.js: Web server\n- NestJS: Enterprise framework\n- Fastify: Hızlı alternatif\n\n**Testing:**\n- Jest: Unit testing\n- Cypress: E2E testing\n- React Testing Library\n\n**Best Practices:**\n✅ Const/let kullanın (var değil)\n✅ Async/await tercih edin\n✅ Error handling yapın\n✅ Code splitting kullanın\n✅ ESLint/Prettier ile kod kalitesi\n\nJS/TS hakkında spesifik bir konu var mı?`;
  }

  if (containsAny(lowerMessage, ['python', 'py', 'django', 'flask'])) {
    return `🐍 **Python** - Kapsamlı Rehber:\n\n**Python'un Gücü:**\n- Öğrenmesi kolay syntax\n- Çok amaçlı kullanım\n- Güçlü kütüphane ekosistemi\n- Data science ve AI'da lider\n\n**Kullanım Alanları:**\n\n1. **Data Science & ML:**\n\`\`\`python\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\n\n# Data manipulation\ndf = pd.read_csv('data.csv')\ndf_clean = df.dropna()\n\n# Machine Learning\nfrom sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\`\`\`\n\n2. **Web Development:**\n\`\`\`python\n# Flask örneği\nfrom flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route('/api/data')\ndef get_data():\n    return jsonify({'status': 'success'})\n\n# Django ORM\nfrom django.db import models\nclass User(models.Model):\n    name = models.CharField(max_length=100)\n    email = models.EmailField()\n\`\`\`\n\n3. **Automation & Scripting:**\n\`\`\`python\nimport os\nimport shutil\nfrom pathlib import Path\n\n# File operations\nfor file in Path('.').glob('*.txt'):\n    shutil.copy(file, 'backup/')\n\`\`\`\n\n4. **Trading Bots:**\n\`\`\`python\nimport ccxt\nimport pandas as pd\n\n# Crypto trading\nexchange = ccxt.binance()\nticker = exchange.fetch_ticker('BTC/USDT')\n\n# Technical analysis\nimport ta\ndf['rsi'] = ta.momentum.RSIIndicator(df['close']).rsi()\n\`\`\`\n\n**Popüler Kütüphaneler:**\n- **NumPy**: Numerical computing\n- **Pandas**: Data manipulation\n- **Matplotlib/Seaborn**: Visualization\n- **Scikit-learn**: Machine learning\n- **TensorFlow/PyTorch**: Deep learning\n- **Requests**: HTTP library\n- **BeautifulSoup**: Web scraping\n\n**Best Practices:**\n✅ Virtual environment kullanın (venv)\n✅ Type hints ekleyin\n✅ Docstring yazın\n✅ PEP 8 style guide takip edin\n✅ List comprehension kullanın\n\n\`\`\`python\n# Type hints\ndef calculate_profit(entry: float, exit: float) -> float:\n    \"\"\"Calculate trading profit percentage.\"\"\"\n    return ((exit - entry) / entry) * 100\n\n# List comprehension\npositive_nums = [x for x in numbers if x > 0]\n\`\`\`\n\nPython'da hangi konuyu derinlemesine inceleyelim?`;
  }

  if (containsAny(lowerMessage, ['solidity', 'smart contract', 'ethereum development', 'web3'])) {
    return `⚡ **Solidity & Smart Contract Development** - Blockchain Programlama:\n\n**Solidity Nedir?**\nEthereum smart contract'ları yazmak için kullanılan programlama dili.\n\n**Temel Smart Contract:**\n\`\`\`solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract SimpleToken {\n    mapping(address => uint256) public balances;\n    \n    event Transfer(address from, address to, uint256 amount);\n    \n    function transfer(address to, uint256 amount) public {\n        require(balances[msg.sender] >= amount, "Insufficient balance");\n        \n        balances[msg.sender] -= amount;\n        balances[to] += amount;\n        \n        emit Transfer(msg.sender, to, amount);\n    }\n}\n\`\`\`\n\n**ERC-20 Token Standard:**\n\`\`\`solidity\ninterface IERC20 {\n    function totalSupply() external view returns (uint256);\n    function balanceOf(address account) external view returns (uint256);\n    function transfer(address to, uint256 amount) external returns (bool);\n    function approve(address spender, uint256 amount) external returns (bool);\n    function transferFrom(address from, address to, uint256 amount) external returns (bool);\n}\n\`\`\`\n\n**DeFi Contract Örneği:**\n\`\`\`solidity\ncontract SimpleDEX {\n    function swap(\n        address tokenIn,\n        address tokenOut,\n        uint256 amountIn\n    ) external returns (uint256 amountOut) {\n        // Price calculation\n        amountOut = getAmountOut(tokenIn, tokenOut, amountIn);\n        \n        // Token transfers\n        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);\n        IERC20(tokenOut).transfer(msg.sender, amountOut);\n    }\n}\n\`\`\`\n\n**Güvenlik En İyi Uygulamalar:**\n\n1. **Reentrancy Attack'tan Korunma:**\n\`\`\`solidity\n// Check-Effects-Interactions pattern\nfunction withdraw(uint256 amount) external {\n    require(balances[msg.sender] >= amount);\n    balances[msg.sender] -= amount; // Effect\n    payable(msg.sender).transfer(amount); // Interaction\n}\n\`\`\`\n\n2. **Access Control:**\n\`\`\`solidity\nimport "@openzeppelin/contracts/access/Ownable.sol";\n\ncontract MyContract is Ownable {\n    function sensitiveFunction() external onlyOwner {\n        // Only owner can call\n    }\n}\n\`\`\`\n\n3. **SafeMath (pre 0.8.0):**\n\`\`\`solidity\nimport "@openzeppelin/contracts/utils/math/SafeMath.sol";\n\nusing SafeMath for uint256;\nuint256 result = a.add(b); // Overflow güvenli\n\`\`\`\n\n**Development Tools:**\n- **Hardhat**: Development environment\n- **Truffle**: Smart contract framework\n- **Remix**: Online IDE\n- **OpenZeppelin**: Secure contract library\n- **Web3.js/Ethers.js**: JavaScript libraries\n\n**Testing:**\n\`\`\`javascript\nconst { expect } = require("chai");\n\ndescribe("Token contract", function () {\n  it("Should transfer tokens", async function () {\n    const [owner, addr1] = await ethers.getSigners();\n    const token = await Token.deploy();\n    \n    await token.transfer(addr1.address, 50);\n    expect(await token.balanceOf(addr1.address)).to.equal(50);\n  });\n});\n\`\`\`\n\n**Gas Optimization:**\n- Storage'dan oku, memory'de işle\n- Packed storage kullanın\n- Short-circuit evaluation\n- Unchecked blocks (0.8.0+)\n\n**Yaygın Güvenlik Açıkları:**\n❌ Reentrancy\n❌ Integer overflow/underflow\n❌ Access control hataları\n❌ Front-running\n❌ Timestamp manipulation\n\nSmart contract development hakkında daha detay ister misiniz?`;
  }

  if (containsAny(lowerMessage, ['c++', 'cpp', 'c plus'])) {
    return `⚙️ **C++** - Yüksek Performans Programlama:\n\n**C++ Neden Önemli?**\n- Sistem programlama\n- Oyun geliştirme\n- High-frequency trading\n- Embedded systems\n- Performans kritik uygulamalar\n\n**Modern C++ (C++11/14/17/20):**\n\`\`\`cpp\n#include <iostream>\n#include <vector>\n#include <memory>\n#include <algorithm>\n\n// Smart pointers\nauto ptr = std::make_unique<MyClass>();\nauto shared = std::make_shared<Data>();\n\n// Lambda expressions\nauto add = [](int a, int b) { return a + b; };\n\n// Range-based for loops\nstd::vector<int> numbers = {1, 2, 3, 4, 5};\nfor (const auto& num : numbers) {\n    std::cout << num << std::endl;\n}\n\n// Move semantics\nstd::vector<int> v1 = {1, 2, 3};\nstd::vector<int> v2 = std::move(v1); // Efficient\n\`\`\`\n\n**Trading Bot Örneği:**\n\`\`\`cpp\nclass TradingStrategy {\nprivate:\n    std::vector<double> prices;\n    double stopLoss;\n    double takeProfit;\n    \npublic:\n    bool shouldBuy(double currentPrice) {\n        if (prices.size() < 20) return false;\n        \n        double sma20 = calculateSMA(20);\n        double rsi = calculateRSI(14);\n        \n        return currentPrice > sma20 && rsi < 30;\n    }\n    \n    double calculateSMA(int period) {\n        double sum = 0;\n        for (int i = prices.size() - period; i < prices.size(); i++) {\n            sum += prices[i];\n        }\n        return sum / period;\n    }\n};\n\`\`\`\n\n**STL (Standard Template Library):**\n- **Containers**: vector, map, set, unordered_map\n- **Algorithms**: sort, find, transform\n- **Iterators**: Forward, bidirectional, random access\n\n**Best Practices:**\n✅ RAII (Resource Acquisition Is Initialization)\n✅ Smart pointer'lar kullanın (raw pointer'dan kaçının)\n✅ Const correctness\n✅ Move semantics kullanın\n✅ STL algorithm'larını tercih edin\n\nC++ hakkında daha fazla öğrenmek ister misiniz?`;
  }

  if (containsAny(lowerMessage, ['rust', 'rs'])) {
    return `🦀 **Rust** - Güvenli Sistem Programlama:\n\n**Rust'ın Özellikleri:**\n- Memory safety (garbage collector olmadan)\n- Zero-cost abstractions\n- Concurrency güvenliği\n- Modern syntax\n\n**Ownership System:**\n\`\`\`rust\nfn main() {\n    let s1 = String::from("hello");\n    let s2 = s1; // s1 artık geçersiz (moved)\n    \n    // Borrowing\n    let s3 = String::from("world");\n    let len = calculate_length(&s3); // s3 hala geçerli\n    \n    println!("Length: {}", len);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}\n\`\`\`\n\n**Pattern Matching:**\n\`\`\`rust\nenum TradeSignal {\n    Buy(f64),\n    Sell(f64),\n    Hold,\n}\n\nmatch signal {\n    TradeSignal::Buy(price) => println!("Buy at {}", price),\n    TradeSignal::Sell(price) => println!("Sell at {}", price),\n    TradeSignal::Hold => println!("Hold position"),\n}\n\`\`\`\n\n**Error Handling:**\n\`\`\`rust\nuse std::fs::File;\nuse std::io::Read;\n\nfn read_file(path: &str) -> Result<String, std::io::Error> {\n    let mut file = File::open(path)?;\n    let mut contents = String::new();\n    file.read_to_string(&mut contents)?;\n    Ok(contents)\n}\n\`\`\`\n\n**Blockchain/Crypto'da Rust:**\n- Solana smart contracts\n- Polkadot parachains\n- High-performance DEX'ler\n\nRust hakkında daha detaylı bilgi ister misiniz?`;
  }

  if (containsAny(lowerMessage, ['machine learning', 'ml', 'yapay öğrenme', 'makine öğrenmesi'])) {
    return `🤖 **Machine Learning (Makine Öğrenmesi)** - Kapsamlı Rehber:\n\n**ML Türleri:**\n\n1. **Supervised Learning (Gözetimli Öğrenme)**\n   - Etiketli veri ile eğitim\n   - Classification (sınıflandırma)\n   - Regression (regresyon)\n   \n   Örnekler:\n   - Spam detection\n   - House price prediction\n   - Image classification\n\n2. **Unsupervised Learning (Gözetimsiz)**\n   - Etiketsiz veri\n   - Clustering (kümeleme)\n   - Dimensionality reduction\n   \n   Örnekler:\n   - Customer segmentation\n   - Anomaly detection\n   - Market basket analysis\n\n3. **Reinforcement Learning (Pekiştirmeli)**\n   - Ödül/ceza sistemi\n   - Agent-environment etkileşimi\n   \n   Örnekler:\n   - Game AI\n   - Trading bots\n   - Robotics\n\n**Trading için ML:**\n\n\`\`\`python\nimport pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\n\n# Feature engineering\ndf['SMA_20'] = df['close'].rolling(20).mean()\ndf['RSI'] = calculate_rsi(df['close'])\ndf['MACD'] = calculate_macd(df['close'])\n\n# Target: 1 = price will go up, 0 = down\ndf['target'] = (df['close'].shift(-1) > df['close']).astype(int)\n\n# Train model\nfeatures = ['SMA_20', 'RSI', 'MACD', 'volume']\nX = df[features]\ny = df['target']\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\naccuracy = model.score(X_test, y_test)\nprint(f"Accuracy: {accuracy:.2%}")\n\`\`\`\n\n**Popüler Algoritmalar:**\n- Linear Regression\n- Logistic Regression\n- Decision Trees\n- Random Forest\n- XGBoost\n- Neural Networks\n- SVM (Support Vector Machine)\n- K-Means Clustering\n\n**Deep Learning Framework'leri:**\n- TensorFlow/Keras\n- PyTorch\n- JAX\n\n**ML Pipeline:**\n1. Data Collection\n2. Data Preprocessing\n3. Feature Engineering\n4. Model Selection\n5. Training\n6. Evaluation\n7. Hyperparameter Tuning\n8. Deployment\n\n**Önemli Metrikler:**\n- Accuracy, Precision, Recall\n- F1-Score\n- ROC-AUC\n- Confusion Matrix\n- Mean Squared Error (MSE)\n\n**Overfitting'den Kaçınma:**\n✅ Cross-validation kullanın\n✅ Regularization (L1/L2)\n✅ Dropout (neural networks)\n✅ Daha fazla veri toplayın\n✅ Feature selection\n\nML hakkında spesifik bir konu var mı?`;
  }

  if (containsAny(lowerMessage, ['deep learning', 'neural network', 'derin öğrenme', 'yapay sinir'])) {
    return `🧠 **Deep Learning (Derin Öğrenme)** - Neural Networks:\n\n**Neural Network Temelleri:**\n\n\`\`\`python\nimport torch\nimport torch.nn as nn\n\nclass TradingNN(nn.Module):\n    def __init__(self, input_size, hidden_size):\n        super(TradingNN, self).__init__()\n        self.fc1 = nn.Linear(input_size, hidden_size)\n        self.relu = nn.ReLU()\n        self.fc2 = nn.Linear(hidden_size, hidden_size)\n        self.fc3 = nn.Linear(hidden_size, 3)  # Buy, Sell, Hold\n        \n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        x = self.relu(self.fc2(x))\n        x = self.fc3(x)\n        return x\n\nmodel = TradingNN(input_size=10, hidden_size=64)\n\`\`\`\n\n**Activation Functions:**\n- ReLU: max(0, x)\n- Sigmoid: 1/(1+e^-x)\n- Tanh: (e^x - e^-x)/(e^x + e^-x)\n- Softmax: For multi-class classification\n\n**CNN (Convolutional Neural Networks):**\nGörüntü işleme için ideal\n\n\`\`\`python\nclass CNN(nn.Module):\n    def __init__(self):\n        super(CNN, self).__init__()\n        self.conv1 = nn.Conv2d(1, 32, 3)\n        self.pool = nn.MaxPool2d(2, 2)\n        self.conv2 = nn.Conv2d(32, 64, 3)\n        self.fc1 = nn.Linear(64 * 6 * 6, 128)\n        self.fc2 = nn.Linear(128, 10)\n    \n    def forward(self, x):\n        x = self.pool(F.relu(self.conv1(x)))\n        x = self.pool(F.relu(self.conv2(x)))\n        x = x.view(-1, 64 * 6 * 6)\n        x = F.relu(self.fc1(x))\n        x = self.fc2(x)\n        return x\n\`\`\`\n\n**RNN/LSTM (Time Series):**\nTrading için mükemmel - zaman serisi tahminleme\n\n\`\`\`python\nclass LSTMModel(nn.Module):\n    def __init__(self, input_size, hidden_size, num_layers):\n        super(LSTMModel, self).__init__()\n        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)\n        self.fc = nn.Linear(hidden_size, 1)\n    \n    def forward(self, x):\n        out, _ = self.lstm(x)\n        out = self.fc(out[:, -1, :])\n        return out\n\`\`\`\n\n**Transformer Architecture:**\nNLP ve son zamanlarda time-series için\n\n**Training Loop:**\n\`\`\`python\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\ncriterion = nn.CrossEntropyLoss()\n\nfor epoch in range(num_epochs):\n    for batch_x, batch_y in dataloader:\n        # Forward pass\n        outputs = model(batch_x)\n        loss = criterion(outputs, batch_y)\n        \n        # Backward pass\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n    \n    print(f'Epoch {epoch}, Loss: {loss.item()}')\n\`\`\`\n\n**Optimization Techniques:**\n- SGD (Stochastic Gradient Descent)\n- Adam\n- RMSprop\n- Learning rate scheduling\n- Batch normalization\n\n**Regularization:**\n- Dropout\n- L1/L2 regularization\n- Data augmentation\n- Early stopping\n\n**Transfer Learning:**\nÖnceden eğitilmiş modelleri kullanma\n\nDeep learning hakkında daha detay ister misiniz?`;
  }

  if (containsAny(lowerMessage, ['algorithm', 'algoritma', 'veri yapısı', 'data structure'])) {
    return `📊 **Algoritmalar ve Veri Yapıları** - CS Fundamentals:\n\n**Temel Veri Yapıları:**\n\n1. **Array (Dizi)**\n   - O(1) access\n   - O(n) search\n   - Fixed size\n\n2. **Linked List**\n   - O(1) insertion at head\n   - O(n) search\n   - Dynamic size\n\n3. **Stack (LIFO)**\n   - push(), pop(), peek()\n   - Function call stack\n   - Undo/Redo operations\n\n4. **Queue (FIFO)**\n   - enqueue(), dequeue()\n   - BFS algorithm\n   - Task scheduling\n\n5. **Hash Table**\n   - O(1) average lookup\n   - Key-value pairs\n   - Trading ticker data\n\n6. **Tree (Binary Search Tree)**\n   - O(log n) search/insert\n   - Hierarchical data\n   - Order book (trading)\n\n7. **Heap**\n   - Priority queue\n   - O(log n) insert/delete\n   - Top K problems\n\n8. **Graph**\n   - Vertices and edges\n   - Social networks\n   - Route finding\n\n**Sorting Algorithms:**\n\n\`\`\`python\n# Quick Sort - O(n log n) average\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\n# Merge Sort - O(n log n) guaranteed\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\`\`\`\n\n**Search Algorithms:**\n\n\`\`\`python\n# Binary Search - O(log n)\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\`\`\`\n\n**Graph Algorithms:**\n\n\`\`\`python\n# BFS (Breadth-First Search)\nfrom collections import deque\n\ndef bfs(graph, start):\n    visited = set()\n    queue = deque([start])\n    visited.add(start)\n    \n    while queue:\n        vertex = queue.popleft()\n        print(vertex)\n        \n        for neighbor in graph[vertex]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n\n# DFS (Depth-First Search)\ndef dfs(graph, vertex, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(vertex)\n    print(vertex)\n    \n    for neighbor in graph[vertex]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n\`\`\`\n\n**Dynamic Programming:**\n\n\`\`\`python\n# Fibonacci with memoization\ndef fib(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 2:\n        return 1\n    memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]\n\n# Trading: Max profit problem\ndef max_profit(prices):\n    min_price = float('inf')\n    max_profit = 0\n    \n    for price in prices:\n        min_price = min(min_price, price)\n        profit = price - min_price\n        max_profit = max(max_profit, profit)\n    \n    return max_profit\n\`\`\`\n\n**Big O Notation:**\n- O(1): Constant\n- O(log n): Logarithmic\n- O(n): Linear\n- O(n log n): Linearithmic\n- O(n²): Quadratic\n- O(2^n): Exponential\n\n**Trading Algoritmaları:**\n- VWAP (Volume Weighted Average Price)\n- TWAP (Time Weighted Average Price)\n- Order matching algorithms\n- Arbitrage detection\n\nHangi algoritma konusuna bakalım?`;
  }

  // General knowledge
  if (lowerMessage.includes('türkiye') || lowerMessage.includes('turkey')) {
    return 'Türkiye, Asya ve Avrupa kıtalarını birleştiren stratejik bir konuma sahip bir ülkedir. Başkenti Ankara, en kalabalık şehri İstanbul\'dur. Zengin tarihi ve kültürel mirasa sahiptir.';
  }

  if (lowerMessage.includes('istanbul')) {
    return 'İstanbul, Türkiye\'nin en kalabalık ve en önemli şehridir. İki kıtayı birleştiren tek şehirdir. Boğaziçi Köprüsü, Ayasofya, Topkapı Saracı gibi tarihi ve turistik mekanlarıyla ünlüdür.';
  }

  // Math and science
  if (lowerMessage.includes('matematik') || lowerMessage.includes('math')) {
    return 'Matematik, sayılar, şekiller ve desenlerle ilgilenen bilim dalıdır. Cebir, geometri, kalkülüs, istatistik gibi dalları vardır. Günlük hayatta, bilimde, mühendislikte ve teknolojide yaygın olarak kullanılır.';
  }

  if (lowerMessage.includes('fizik') || lowerMessage.includes('physics')) {
    return 'Fizik, madde, enerji ve bunların etkileşimlerini inceleyen temel bilim dalıdır. Mekanik, termodinamik, elektromanyetizma, kuantum fiziği gibi alt dalları vardır. Evrenin işleyişini anlamak için kritik öneme sahiptir.';
  }

  // Health and wellness
  if (lowerMessage.includes('sağlık') || lowerMessage.includes('health')) {
    return 'Sağlıklı yaşam için dengeli beslenme, düzenli egzersiz, yeterli uyku ve stres yönetimi önemlidir. Düzenli sağlık kontrolleri yaptırmayı ve doktor tavsiyelerini dinlemeyi unutmayın.';
  }

  // Education
  if (lowerMessage.includes('eğitim') || lowerMessage.includes('öğrenme') || lowerMessage.includes('learn')) {
    return 'Eğitim, hayat boyu devam eden bir süreçtir. Online kurslar, kitaplar, videolar ve pratik yaparak öğrenebilirsiniz. Merak ettiğiniz konularda uzmanlaşmak için sabırlı ve düzenli olmanız önemlidir.';
  }

  // Weather
  if (lowerMessage.includes('hava durumu') || lowerMessage.includes('weather')) {
    return 'Hava durumu bilgisi için meteoroloji sitelerini veya uygulamalarını kullanabilirsiniz. Bulunduğunuz bölgenin güncel hava tahminlerini takip etmek için yerel hava durumu servislerine başvurabilirsiniz.';
  }

  // Time
  if (lowerMessage.includes('saat kaç') || lowerMessage.includes('zaman')) {
    const now = new Date();
    return `Şu anki saat: ${now.toLocaleTimeString('tr-TR')}`;
  }

  // Hobbies
  if (lowerMessage.includes('müzik') || lowerMessage.includes('music')) {
    return 'Müzik, evrensel bir dildir. Rock, pop, klasik, caz, elektronik gibi birçok türü vardır. Müzik dinlemek stres azaltır, motivasyon sağlar ve ruh halini iyileştirir.';
  }

  if (lowerMessage.includes('spor') || lowerMessage.includes('sport')) {
    return 'Spor, fiziksel ve zihinsel sağlık için çok önemlidir. Futbol, basketbol, tenis, yüzme gibi birçok spor dalı vardır. Düzenli spor yapmak sağlıklı yaşamın temelidir.';
  }

  // Food
  if (lowerMessage.includes('yemek') || lowerMessage.includes('food')) {
    return 'Türk mutfağı, dünyanın en zengin mutfaklarından biridir. Kebap, baklava, dolma, pilav ve daha birçok lezzet sunar. Dengeli beslenme için sebze, meyve, protein ve tam tahıl tüketimi önemlidir.';
  }

  // Travel
  if (lowerMessage.includes('seyahat') || lowerMessage.includes('tatil') || lowerMessage.includes('travel')) {
    return 'Seyahat etmek, yeni kültürler tanımak ve deneyimler kazanmak için harika bir yoldur. Seyahat planlarken bütçenizi, zaman ayırın ve gerekli hazırlıkları yapın. Güvenliğinizi her zaman ön planda tutun.';
  }

  // Work and career
  if (lowerMessage.includes('kariyer') || lowerMessage.includes('iş') || lowerMessage.includes('career')) {
    return 'Başarılı bir kariyer için sürekli öğrenme, ağ oluşturma ve hedef belirleme önemlidir. Güçlü ve zayıf yönlerinizi tanıyın, tutkunuzu takip edin ve sabırlı olun.';
  }

  // Help requests
  if (lowerMessage.includes('yardım') || lowerMessage.includes('help')) {
    return 'Size yardımcı olmaktan mutluluk duyarım! Programlama, teknoloji, genel bilgi, eğitim, sağlık ve daha birçok konuda sorularınızı cevaplayabilirim. Ne öğrenmek istersiniz?';
  }

  // Thank you
  if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağol') || lowerMessage.includes('thanks')) {
    return 'Rica ederim! Başka bir sorunuz varsa çekinmeden sorun.';
  }

  // Emotions - positive
  if (containsAny(lowerMessage, ['mutlu', 'sevinçli', 'happy', 'neşeli', 'keyifli'])) {
    return 'Ne güzel! Mutluluğunuza ortak olmak beni de mutlu ediyor! 😊 Bu güzel halinizi korumaya devam edin!';
  }

  // Emotions - negative
  if (containsAny(lowerMessage, ['üzgün', 'mutsuz', 'sad', 'kötü hissediyorum', 'canım sıkılıyor'])) {
    return 'Üzüldüğünüzü duyduğuma üzüldüm. 😔 Bazen zorlu zamanlar geçirebiliriz, ama unutmayın ki her fırtınadan sonra güneş doğar. Size yardımcı olabilir miyim?';
  }

  // Emotions - stress/anger
  if (containsAny(lowerMessage, ['stresli', 'sinirliyim', 'öfkeli', 'kızgın', 'bıktım'])) {
    return 'Stresli olduğunuzu anlıyorum. Derin nefes almayı deneyin, biraz ara verin. Her şey geçici, sakin olmaya çalışın. 🧘‍♂️ Size bir şekilde yardımcı olabilir miyim?';
  }

  // Love and relationships
  if (containsAny(lowerMessage, ['aşk', 'sevgili', 'love', 'ilişki', 'flört'])) {
    return 'Aşk ve ilişkiler hayatın en güzel ama bazen en karmaşık yönlerinden biri! İletişim, güven ve saygı her ilişkinin temelini oluşturur. ❤️';
  }

  // Money and finance
  if (containsAny(lowerMessage, ['para', 'money', 'maaş', 'bütçe', 'tasarruf', 'yatırım'])) {
    return 'Finansal planlama önemli bir konudur. Bütçe oluşturmak, tasarruf yapmak ve akıllı yatırımlar yapmak uzun vadede faydalıdır. 💰 Giderlerinizi takip edin ve bilinçli harcama yapın.';
  }

  // Gaming
  if (containsAny(lowerMessage, ['oyun', 'game', 'gaming', 'pc oyun', 'konsol'])) {
    return 'Video oyunları harika bir eğlence kaynağı! Strateji oyunları problem çözme becerinizi geliştirir, aksiyon oyunları reflekslerinizi güçlendirir. 🎮 Hangi türleri seversiniz?';
  }

  // Movies and TV
  if (containsAny(lowerMessage, ['film', 'dizi', 'movie', 'series', 'netflix'])) {
    return 'Sinema ve diziler harika hikaye anlatım medyumlarıdır! Aksiyon, komedi, drama, bilim kurgu... Her zevke uygun bir şeyler var. 🎬 Hangi tür içerikleri izlemeyi seversiniz?';
  }

  // Books and reading
  if (containsAny(lowerMessage, ['kitap', 'okumak', 'book', 'roman', 'okuyorum'])) {
    return 'Kitap okumak zihin açıcı bir aktivitedir! Hayal gücünüzü geliştirir, kelime dağarcığınızı zenginleştirir ve yeni bakış açıları kazandırır. 📚 Her gün biraz okuma alışkanlığı edinmenizi öneririm.';
  }

  // Family
  if (containsAny(lowerMessage, ['aile', 'anne', 'baba', 'family', 'kardeş'])) {
    return 'Aile, hayatın en değerli parçalarından biridir. Sevdiklerinizle kaliteli zaman geçirmek, onlarla iletişim kurmak çok önemlidir. 👨‍👩‍👧‍👦';
  }

  // Friends
  if (containsAny(lowerMessage, ['arkadaş', 'friend', 'dostluk', 'arkadaşlık'])) {
    return 'Arkadaşlık değerli bir ilişkidir. İyi arkadaşlar, hayatın zorlu zamanlarında yanınızda olur, başarılarınızı paylaşır. 🤝 Arkadaşlıklarınıza değer verin!';
  }

  // Dreams and goals
  if (containsAny(lowerMessage, ['hayal', 'dream', 'hedef', 'goal', 'başarı', 'success'])) {
    return 'Hayalleriniz ve hedefleriniz sizi motive eder! Büyük hayaller kurun, küçük adımlarla ilerleyin. Her başarı bir adımla başlar. 🎯 Ne olmak istersiniz?';
  }

  // Pets
  if (containsAny(lowerMessage, ['kedi', 'köpek', 'cat', 'dog', 'pet', 'hayvan'])) {
    return 'Evcil hayvanlar harika dostlardır! Kediler bağımsız ve sevimli, köpekler sadık ve oyuncu. Hayvanlar yaşamımıza sevgi ve mutluluk katar. 🐱🐶';
  }

  // Nature and environment
  if (containsAny(lowerMessage, ['doğa', 'nature', 'çevre', 'environment', 'ağaç', 'orman'])) {
    return 'Doğa hepimiz için çok önemli! Çevreyi korumak, sürdürülebilir yaşam tarzları benimsemek geleceğimiz için kritik. 🌍🌳 Geri dönüşüm, enerji tasarrufu gibi küçük adımlar büyük fark yaratır.';
  }

  // Art and creativity
  if (containsAny(lowerMessage, ['sanat', 'art', 'resim', 'yaratıcılık', 'creativity'])) {
    return 'Sanat ve yaratıcılık insanlığın özüdür! Resim, müzik, edebiyat, dans... Sanat formları duygularımızı ifade etmemize yardımcı olur. 🎨 Kendinizi ifade etmekten çekinmeyin!';
  }

  // Sleep
  if (containsAny(lowerMessage, ['uyku', 'sleep', 'uyuyamıyorum', 'uykusuzluk'])) {
    return 'Kaliteli uyku sağlık için çok önemlidir! Yetişkinler günde 7-9 saat uyumalıdır. Düzenli uyku saatleri, karanlık ve sessiz bir ortam uyku kalitenizi artırır. 😴';
  }

  // Cooking
  if (containsAny(lowerMessage, ['yemek yapma', 'cooking', 'tarif', 'recipe', 'pişir'])) {
    return 'Yemek yapmak hem pratik hem de keyifli bir beceridir! Temel teknikleri öğrenerek başlayın, tariflerle deneyler yapın. 👨‍🍳 Kendi yemeklerinizi yapmak daha sağlıklı ve ekonomiktir.';
  }

  // Exercise and fitness
  if (containsAny(lowerMessage, ['egzersiz', 'fitness', 'gym', 'spor salonu', 'antrenman'])) {
    return 'Düzenli egzersiz sağlığınız için harikadır! Haftada en az 150 dakika orta yoğunlukta egzersiz önerilir. 💪 Kardiyo, kuvvet antrenmanı ve esneklik çalışmalarını birleştirin.';
  }

  // Depression / mental health
  if (containsAny(lowerMessage, ['depresyon', 'depression', 'anksiyete', 'anxiety', 'terapi', 'psikolog'])) {
    return 'Mental sağlık fiziksel sağlık kadar önemlidir. Kendinizi kötü hissediyorsanız, bir uzmanla konuşmaktan çekinmeyin. 🧠 Yardım istemek güçlülük işaretidir, zayıflık değil.';
  }

  // Social media
  if (containsAny(lowerMessage, ['sosyal medya', 'social media', 'instagram', 'twitter', 'facebook', 'tiktok'])) {
    return 'Sosyal medya bağlantı kurmak için güçlü bir araçtır, ancak bilinçli kullanılmalıdır. Aşırı kullanım strese neden olabilir. 📱 Dijital detoks yapmayı düşünün!';
  }

  // Coffee/Tea
  if (containsAny(lowerMessage, ['kahve', 'coffee', 'çay', 'tea', 'kafein'])) {
    return 'Kahve ve çay dünya çapında sevilen içeceklerdir! ☕ Kahve size enerji verir, odaklanmanıza yardımcı olur. Çay ise rahatlatıcıdır ve antioksidanlar içerir. Hangisini tercih edersiniz?';
  }

  // Age/generation
  if (containsAny(lowerMessage, ['genç', 'yaşlı', 'generation', 'nesil', 'boomer', 'zoomer'])) {
    return 'Her nesil kendine özgü deneyimler ve bakış açıları getirir. Farklı yaş gruplarından insanlarla etkileşim zenginleştirir ve öğreticidir. 👥';
  }

  // Questions about "how to"
  if (containsAny(lowerMessage, ['nasıl yapılır', 'how to', 'nasıl yaparım', 'nasıl öğrenirim'])) {
    return 'Yeni bir şey öğrenmek harika! 🎓 İnternette tutoriallar, videolar, online kurslar bulabilirsiniz. Pratik yaparak ve hatalardan öğrenerek ilerlemelisiniz. Hangi konuda yardıma ihtiyacınız var?';
  }

  // Questions about "why"
  if (lowerMessage.startsWith('neden') || lowerMessage.startsWith('niçin') || lowerMessage.startsWith('why')) {
    return 'İyi bir soru! "Neden" soruları anlamımızı derinleştirir. Her şeyin bir nedeni vardır ve merak etmek öğrenmenin ilk adımıdır. 🤔 Bu konuda daha spesifik olursanız daha iyi yanıt verebilirim.';
  }

  // Questions about "where"
  if (lowerMessage.startsWith('nerede') || lowerMessage.startsWith('where')) {
    return 'Konum ve yerler çok önemli olabilir! 🗺️ Hangi konuda veya yerde bilgiye ihtiyacınız var? Daha detaylı sorarsanız size daha iyi yardımcı olabilirim.';
  }

  // Questions about "when"
  if (lowerMessage.startsWith('ne zaman') || lowerMessage.startsWith('when')) {
    return 'Zamanlama önemli bir faktördür! ⏰ Doğru zamanda doğru şeyi yapmak başarının anahtarıdır. Hangi konuda zamanlama bilgisine ihtiyacınız var?';
  }

  // Goodbye
  if (containsAny(lowerMessage, ['görüşürüz', 'hoşça kal', 'bye', 'güle güle', 'bay'])) {
    return 'Hoşça kalın! Tekrar görüşmek üzere. İyi günler! 👋';
  }

  // Compliments to bot
  if (containsAny(lowerMessage, ['tebrikler', 'aferin', 'bravo', 'helal', 'well done'])) {
    return 'Çok teşekkür ederim! Sizin için elimden gelenin en iyisini yapmaya çalışıyorum! 🌟';
  }

  // Bot limitations
  if (containsAny(lowerMessage, ['yapamıyor musun', 'bilmiyor musun', 'cannot', 'can\'t you'])) {
    return 'Her şeyi bilemem ama sürekli gelişiyorum! 🚀 Size başka bir şekilde yardımcı olabileceğim bir konu var mı?';
  }

  // Swear words or negative language (gentle response)
  if (containsAny(lowerMessage, ['aptalsın', 'gerizekalı', 'salak', 'stupid', 'dumb'])) {
    return 'Anlıyorum, belki canınız sıkkın. Ama lütfen nazik olalım. Size daha iyi nasıl yardımcı olabilirim? 🙏';
  }

  // Random fun facts
  if (containsAny(lowerMessage, ['bilgi ver', 'ilginç', 'fact', 'gerçek', 'öğret'])) {
    const facts = [
      'İlginç bir bilgi: Ballar asla bozulmaz! Arkeologlar 3000 yıllık hala yenilebilir bal buldular. 🍯',
      'İlginç bir bilgi: Dünyada 200\'den fazla ülke var ama sadece 180 kadarı BM üyesi. 🌍',
      'İlginç bir bilgi: İnsan beyni %75 su içerir. Bu yüzden su içmek çok önemli! 🧠💧',
      'İlginç bir bilgi: Bir yıldırım güneşin yüzeyinden 5 kat daha sıcaktır! ⚡',
      'İlginç bir bilgi: Ortalama bir insan günde 20.000 kelime söyler. Siz bugün kaç kelime söylediniz? 💬',
      'İlginç bir bilgi: Gülmek vücudunuzda endorfin salgılatır ve bağışıklık sisteminizi güçlendirir! 😄',
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }

  // Motivational quotes
  if (containsAny(lowerMessage, ['motivasyon', 'motivation', 'ilham', 'inspiration', 'cesaret'])) {
    const quotes = [
      '"Başarısızlık, başarının anahtarıdır; her hata bize bir şeyler öğretir." - Morihei Ueshiba 💪',
      '"Hayal ettiğiniz hayatı yaşamaya başlamak için asla çok geç değildir." 🌟',
      '"Bir şeyi çok istiyorsanız, tüm evren onu gerçekleştirmeniz için size yardım eder." 🌌',
      '"Küçük adımlar bile sizi hedefinize yaklaştırır. Önemli olan yolculuğa çıkmak!" 🚶‍♂️',
      '"Başarı, bir gecede gelmez. Tutarlılık ve azim gerektirir." 🎯',
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // Default intelligent responses based on question type
  if (isQuestion(lowerMessage)) {
    const questionResponses = [
      'Çok iyi bir soru! 🤔 Bu konuda size daha iyi yardımcı olabilmem için biraz daha detay verebilir misiniz?',
      'İlginç bir soru! Her sorunun cevabı bağlama göre değişebilir. Daha spesifik olursanız size daha iyi yardımcı olabilirim.',
      'Bu sorunun cevabı birkaç faktöre bağlı olabilir. Size daha doğru bir yanıt verebilmem için daha fazla bilgiye ihtiyacım var.',
      'Harika bir soru! 💡 Bu konuyu birlikte düşünelim. Hangi yönden ele almak istersiniz?',
    ];
    return questionResponses[Math.floor(Math.random() * questionResponses.length)];
  }

  // Default conversational responses
  const defaultResponses = [
    'Anlıyorum. Bu konuda size nasıl yardımcı olabilirim? 🤝',
    'İlginç! Bu konuyu biraz daha açar mısınız?',
    'Dinliyorum. Devam edin lütfen. 👂',
    'Anladım. Bu konuda daha fazla ne söylemek istersiniz?',
    'Size yardımcı olmak için buradayım! Başka neler söylemek istersiniz? 😊',
    'Bu konuyu konuşmak güzel! Daha fazla detay paylaşabilir misiniz?',
    'Hmm, ilginç bir bakış açısı. Size bu konuda nasıl yardımcı olabilirim?',
    'Elbette! Bu konuda elimden geleni yapacağım. Daha fazla bilgi verebilir misiniz?',
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
