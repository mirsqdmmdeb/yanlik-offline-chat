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

  // Programming questions
  if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    return 'JavaScript, web geliştirme için en popüler programlama dillerinden biridir. Hem frontend hem de backend geliştirme için kullanılabilir. Node.js ile sunucu tarafında, React, Vue veya Angular gibi framework\'lerle frontend\'de kullanılır.';
  }

  if (lowerMessage.includes('python')) {
    return 'Python, öğrenmesi kolay ve çok yönlü bir programlama dilidir. Veri bilimi, yapay zeka, web geliştirme, otomasyon ve daha birçok alanda kullanılır. Django ve Flask gibi popüler web framework\'leri vardır.';
  }

  if (lowerMessage.includes('react')) {
    return 'React, Facebook tarafından geliştirilen popüler bir JavaScript kütüphanesidir. Component-based mimari ile kullanıcı arayüzleri oluşturmak için kullanılır. Virtual DOM kullanarak yüksek performans sağlar.';
  }

  // Technology questions
  if (lowerMessage.includes('yapay zeka') || lowerMessage.includes('ai')) {
    return 'Yapay zeka, makinelerin insan benzeri düşünme ve öğrenme yeteneklerini simüle etmesidir. Makine öğrenimi, derin öğrenme, doğal dil işleme gibi alt dalları vardır. Günümüzde sağlık, finans, eğitim gibi birçok alanda kullanılmaktadır.';
  }

  if (lowerMessage.includes('blockchain')) {
    return 'Blockchain, dağıtık ve merkezi olmayan bir veri tabanı teknolojisidir. Kripto paralar, akıllı sözleşmeler ve güvenli veri paylaşımı için kullanılır. Bitcoin ve Ethereum en bilinen blockchain uygulamalarıdır.';
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
