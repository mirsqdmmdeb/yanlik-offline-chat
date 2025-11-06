export const getChatResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim();

  // Special question about creator
  if (lowerMessage.includes('kim yarattı') || lowerMessage.includes('kim yaptı') || lowerMessage.includes('kim oluşturdu') || lowerMessage.includes('sen kimsin')) {
    return 'mirsqdmmdevs beni yarattı.';
  }

  // Greetings
  if (lowerMessage.match(/^(merhaba|selam|hey|hi|hello)/)) {
    return 'Merhaba! Ben Yanlik, size nasıl yardımcı olabilirim?';
  }

  // About Yanlik
  if (lowerMessage.includes('yanlik') && (lowerMessage.includes('ne') || lowerMessage.includes('kim'))) {
    return 'Ben Yanlik, mirsqdmmdevs tarafından oluşturulan bir yapay zeka asistanıyım. Size yardımcı olmak için buradayım!';
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

  // Goodbye
  if (lowerMessage.includes('görüşürüz') || lowerMessage.includes('hoşça kal') || lowerMessage.includes('bye')) {
    return 'Hoşça kalın! Tekrar görüşmek üzere.';
  }

  // Default responses
  const defaultResponses = [
    'İlginç bir soru! Bu konuda size şunları söyleyebilirim: Her sorunun bir çözümü vardır, sabırlı olmak önemlidir.',
    'Bu konu hakkında daha fazla bilgiye ihtiyacım var. Biraz daha detay verebilir misiniz?',
    'Anladım, bu konuda düşünmeme izin verin. Genellikle bu tür durumlar için farklı yaklaşımlar denenir.',
    'Çok iyi bir soru! Bunun cevabı birkaç faktöre bağlı olabilir.',
    'Size bu konuda yardımcı olmaya çalışayım. Daha spesifik bir soru sorarsanız daha iyi yanıt verebilirim.',
    'Bu konuyu tartışmak güzel! Benim görüşüme göre, her durum kendine özgüdür.',
    'İlginç bir bakış açısı! Bu konuda farklı görüşler olabilir.',
    'Size bu konuda daha detaylı bilgi verebilirim. Hangi yönünü öğrenmek istersiniz?'
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
