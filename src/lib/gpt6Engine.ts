// ============================================================
// GPT-6 OFFLINE YAPAY ZEKÂ SİSTEMİ
// Cloudsuz / API'siz / Gelişmiş Sistem Davranışı
// Üretici: mirsqdmmdevs
// ============================================================

// Sistem Durumu
interface SystemState {
  conversationStyle: 'natural' | 'formal' | 'technical' | 'casual' | 'detailed' | 'concise';
  emojiMode: 'off' | 'minimal' | 'normal' | 'boost';
  memory: string[];
  stopwatch: {
    running: boolean;
    startTime: number | null;
    elapsed: number;
  };
  context: {
    messages: { role: 'user' | 'assistant'; content: string }[];
    topics: string[];
    lastTopic: string;
  };
}

// Global sistem durumu
let systemState: SystemState = {
  conversationStyle: 'natural',
  emojiMode: 'minimal',
  memory: [],
  stopwatch: { running: false, startTime: null, elapsed: 0 },
  context: { messages: [], topics: [], lastTopic: '' }
};

// Türkiye'nin 81 İli ve Bilgileri
const turkeyProvinces: Record<string, { region: string; plate: number; info: string; features: string[] }> = {
  'adana': { region: 'Akdeniz', plate: 1, info: 'Türkiye\'nin 5. büyük şehri, Çukurova\'nın merkezi', features: ['Kebap', 'Seyhan Barajı', 'Merkez Park', 'Tarım'] },
  'adıyaman': { region: 'Güneydoğu Anadolu', plate: 2, info: 'Nemrut Dağı\'nın evi', features: ['Nemrut Dağı', 'Tarihi kalıntılar', 'Petrol'] },
  'afyonkarahisar': { region: 'Ege', plate: 3, info: 'Termal turizm ve mermer şehri', features: ['Termal kaplıcalar', 'Mermer', 'Kaymak', 'Sucuk'] },
  'ağrı': { region: 'Doğu Anadolu', plate: 4, info: 'Türkiye\'nin en yüksek dağı Ağrı Dağı burada', features: ['Ağrı Dağı (5137m)', 'İshak Paşa Sarayı', 'Meteor Çukuru'] },
  'aksaray': { region: 'İç Anadolu', plate: 68, info: 'Kapadokya\'nın batı kapısı', features: ['Ihlara Vadisi', 'Tuz Gölü', 'Yer altı şehirleri'] },
  'amasya': { region: 'Karadeniz', plate: 5, info: 'Şehzadeler şehri, elma bahçeleri', features: ['Kral Kaya Mezarları', 'Yalıboyu Evleri', 'Elma'] },
  'ankara': { region: 'İç Anadolu', plate: 6, info: 'Türkiye Cumhuriyeti\'nin başkenti', features: ['Anıtkabir', 'TBMM', 'Üniversiteler', 'Kocatepe Camii'] },
  'antalya': { region: 'Akdeniz', plate: 7, info: 'Türkiye\'nin turizm başkenti', features: ['Kaleiçi', 'Konyaaltı', 'Aspendos', 'Düden Şelalesi'] },
  'ardahan': { region: 'Doğu Anadolu', plate: 75, info: 'Türkiye\'nin en soğuk şehirlerinden', features: ['Çıldır Gölü', 'Kura Nehri', 'Hayvancılık'] },
  'artvin': { region: 'Karadeniz', plate: 8, info: 'Yeşil doğası ile ünlü sınır ili', features: ['Borçka Karagöl', 'Rafting', 'Doğa turizmi'] },
  'aydın': { region: 'Ege', plate: 9, info: 'İncir ve zeytin diyarı', features: ['Efes Antik Kenti', 'Kuşadası', 'Didim', 'İncir'] },
  'balıkesir': { region: 'Marmara', plate: 10, info: 'Hem Marmara hem Ege\'ye kıyısı var', features: ['Ayvalık', 'Erdek', 'Kaz Dağları'] },
  'bartın': { region: 'Karadeniz', plate: 74, info: 'Safranbolu\'ya komşu tarihi şehir', features: ['Amasra', 'İnkumu', 'Tarihi evler'] },
  'batman': { region: 'Güneydoğu Anadolu', plate: 72, info: 'Petrol şehri', features: ['Hasankeyf', 'Petrol rafinerileri'] },
  'bayburt': { region: 'Doğu Anadolu', plate: 69, info: 'Türkiye\'nin en küçük illerinden', features: ['Bayburt Kalesi', 'Baksı Müzesi'] },
  'bilecik': { region: 'Marmara', plate: 11, info: 'Osmanlı\'nın kuruluş yeri', features: ['Söğüt', 'Osmanlı mirası'] },
  'bingöl': { region: 'Doğu Anadolu', plate: 12, info: 'Bin göl adını göllerinden alır', features: ['Doğa güzellikleri', 'Termal kaynaklar'] },
  'bitlis': { region: 'Doğu Anadolu', plate: 13, info: 'Van Gölü\'nün batısında tarihi şehir', features: ['Nemrut Krater Gölü', 'Tatvan', 'Tarihi yapılar'] },
  'bolu': { region: 'Karadeniz', plate: 14, info: 'Aşçılar diyarı ve kış turizmi merkezi', features: ['Abant Gölü', 'Kartalkaya', 'Aşçılık'] },
  'burdur': { region: 'Akdeniz', plate: 15, info: 'Göller bölgesinde şirin bir il', features: ['Burdur Gölü', 'Sagalassos', 'Lavanta'] },
  'bursa': { region: 'Marmara', plate: 16, info: 'Osmanlı\'nın ilk başkenti, yeşil Bursa', features: ['Uludağ', 'Yeşil Türbe', 'İskender Kebap', 'Otomotiv'] },
  'çanakkale': { region: 'Marmara', plate: 17, info: 'Tarihi yarımada ve boğaz şehri', features: ['Gelibolu', 'Truva', 'Çanakkale Boğazı'] },
  'çankırı': { region: 'İç Anadolu', plate: 18, info: 'Tuz mağaraları ile ünlü', features: ['Tuz Mağarası', 'Ilgaz Dağı'] },
  'çorum': { region: 'İç Anadolu', plate: 19, info: 'Hitit medeniyetinin merkezi', features: ['Hattuşa', 'Alacahöyük', 'Leblebi'] },
  'denizli': { region: 'Ege', plate: 20, info: 'Pamukkale\'nin şehri', features: ['Pamukkale Travertenleri', 'Hierapolis', 'Tekstil'] },
  'diyarbakır': { region: 'Güneydoğu Anadolu', plate: 21, info: 'Tarihi surları ile ünlü', features: ['Sur', 'Hevsel Bahçeleri', 'Karacadağ'] },
  'düzce': { region: 'Karadeniz', plate: 81, info: 'Yeşil doğası ile tanınan genç il', features: ['Efteni Gölü', 'Doğa sporları'] },
  'edirne': { region: 'Marmara', plate: 22, info: 'Osmanlı\'nın Avrupa\'daki başkenti', features: ['Selimiye Camii', 'Kırkpınar', 'Ciğer'] },
  'elazığ': { region: 'Doğu Anadolu', plate: 23, info: 'Fırat\'ın çocuğu', features: ['Harput', 'Sivrice', 'Keban Barajı'] },
  'erzincan': { region: 'Doğu Anadolu', plate: 24, info: 'Tulum peyniri ve Munzur dağları', features: ['Munzur Vadisi', 'Kemaliye', 'Tulum peyniri'] },
  'erzurum': { region: 'Doğu Anadolu', plate: 25, info: 'Doğu\'nun en büyük şehri, kış sporları merkezi', features: ['Palandöken', 'Çifte Minareli Medrese', 'Cağ Kebabı'] },
  'eskişehir': { region: 'İç Anadolu', plate: 26, info: 'Modern ve yaşanabilir şehir', features: ['Porsuk Çayı', 'Odunpazarı', 'Lületaşı', 'Üniversiteler'] },
  'gaziantep': { region: 'Güneydoğu Anadolu', plate: 27, info: 'Mutfak başkenti', features: ['Baklava', 'Zeugma Müzesi', 'Antep Fıstığı', 'Lahmacun'] },
  'giresun': { region: 'Karadeniz', plate: 28, info: 'Fındık diyarı', features: ['Giresun Adası', 'Fındık', 'Kümbet Yaylaları'] },
  'gümüşhane': { region: 'Karadeniz', plate: 29, info: 'Tarihi madencilik şehri', features: ['Karaca Mağarası', 'Zigana', 'Pestil'] },
  'hakkari': { region: 'Doğu Anadolu', plate: 30, info: 'Türkiye\'nin en doğusundaki il', features: ['Cilo Dağları', 'Zap Suyu', 'Doğa'] },
  'hatay': { region: 'Akdeniz', plate: 31, info: 'Medeniyetler mozaiği', features: ['Antakya', 'Künefe', 'Mozaik Müzesi', 'Harbiye'] },
  'ığdır': { region: 'Doğu Anadolu', plate: 76, info: 'Ağrı Dağı manzaralı sınır ili', features: ['Ağrı Dağı manzarası', 'Kayısı'] },
  'ısparta': { region: 'Akdeniz', plate: 32, info: 'Gül ve halı şehri', features: ['Gül bahçeleri', 'Eğirdir Gölü', 'Lavanta'] },
  'istanbul': { region: 'Marmara', plate: 34, info: 'Türkiye\'nin en büyük şehri, kültür başkenti', features: ['Ayasofya', 'Topkapı', 'Boğaz', 'Kapalıçarşı', 'Galata'] },
  'izmir': { region: 'Ege', plate: 35, info: 'Ege\'nin incisi', features: ['Kordon', 'Kemeraltı', 'Efes', 'Çeşme', 'Alaçatı'] },
  'kahramanmaraş': { region: 'Akdeniz', plate: 46, info: 'Dondurma ve biber şehri', features: ['Maraş Dondurması', 'Kırmızı biber'] },
  'karabük': { region: 'Karadeniz', plate: 78, info: 'Demir-çelik şehri', features: ['Safranbolu', 'Demir-Çelik', 'Tarihi evler'] },
  'karaman': { region: 'İç Anadolu', plate: 70, info: 'Türk dilinin önem kazandığı şehir', features: ['Binbir Kilise', 'Taşkale'] },
  'kars': { region: 'Doğu Anadolu', plate: 36, info: 'Ani Harabeleri\'nin şehri', features: ['Ani Ören Yeri', 'Kars Kalesi', 'Kaşar Peyniri', 'Sarıkamış'] },
  'kastamonu': { region: 'Karadeniz', plate: 37, info: 'İlk Türk kadın mitinginin yapıldığı şehir', features: ['İnebolu', 'Kastamonu Kalesi', 'Evliya Çelebi'] },
  'kayseri': { region: 'İç Anadolu', plate: 38, info: 'Ticaret ve sanayi şehri', features: ['Erciyes', 'Pastırma', 'Mantı', 'Sanayi'] },
  'kilis': { region: 'Güneydoğu Anadolu', plate: 79, info: 'Türkiye\'nin en küçük ili', features: ['Zeytinyağı', 'Şambali'] },
  'kırıkkale': { region: 'İç Anadolu', plate: 71, info: 'Silah sanayiinin merkezi', features: ['MKE', 'Savunma sanayi'] },
  'kırklareli': { region: 'Marmara', plate: 39, info: 'Trakya\'nın yeşil ili', features: ['İğneada', 'Longoz Ormanları', 'Vize'] },
  'kırşehir': { region: 'İç Anadolu', plate: 40, info: 'Ahilik\'in merkezi', features: ['Ahi Evran', 'Kaman', 'Mucur'] },
  'kocaeli': { region: 'Marmara', plate: 41, info: 'Sanayi kenti', features: ['GOSB', 'Kartepe', 'Petrokimya'] },
  'konya': { region: 'İç Anadolu', plate: 42, info: 'Mevlana\'nın şehri, Türkiye\'nin en büyük ili', features: ['Mevlana Müzesi', 'Etli Ekmek', 'Tarım', 'Catalhöyük'] },
  'kütahya': { region: 'Ege', plate: 43, info: 'Çini sanatının merkezi', features: ['Çinicilik', 'Aizanoi', 'Termal'] },
  'malatya': { region: 'Doğu Anadolu', plate: 44, info: 'Kayısı başkenti', features: ['Kayısı', 'Arslantepe', 'Battalgazi'] },
  'manisa': { region: 'Ege', plate: 45, info: 'Mesir macununun şehri', features: ['Mesir Festivali', 'Spil Dağı', 'Sanayi'] },
  'mardin': { region: 'Güneydoğu Anadolu', plate: 47, info: 'Taş evleri ile büyüleyen şehir', features: ['Taş mimarisi', 'Dara', 'Midyat', 'Mor Gabriel'] },
  'mersin': { region: 'Akdeniz', plate: 33, info: 'Akdeniz\'in önemli liman şehri', features: ['Tarsus', 'Kızkalesi', 'Liman', 'Cezerye'] },
  'muğla': { region: 'Ege', plate: 48, info: 'Turizm cenneti', features: ['Bodrum', 'Marmaris', 'Fethiye', 'Dalyan'] },
  'muş': { region: 'Doğu Anadolu', plate: 49, info: 'Malazgirt Zaferi\'nin şehri', features: ['Malazgirt', 'Muş Ovası'] },
  'nevşehir': { region: 'İç Anadolu', plate: 50, info: 'Kapadokya\'nın kalbi', features: ['Peri Bacaları', 'Ürgüp', 'Göreme', 'Balon turu'] },
  'niğde': { region: 'İç Anadolu', plate: 51, info: 'Aladağlar\'ın eteğinde', features: ['Aladağlar', 'Eski Gümüşler'] },
  'ordu': { region: 'Karadeniz', plate: 52, info: 'Fındık ve doğa şehri', features: ['Boztepe', 'Fındık', 'Perşembe Yaylası'] },
  'osmaniye': { region: 'Akdeniz', plate: 80, info: 'Çukurova\'nın doğu kapısı', features: ['Kastabala', 'Zorkun Yaylası'] },
  'rize': { region: 'Karadeniz', plate: 53, info: 'Çay başkenti', features: ['Çay bahçeleri', 'Ayder Yaylası', 'Fırtına Deresi'] },
  'sakarya': { region: 'Marmara', plate: 54, info: 'Yeşil ve sanayi şehri', features: ['Sapanca Gölü', 'Maşukiye', 'Otomotiv'] },
  'samsun': { region: 'Karadeniz', plate: 55, info: '19 Mayıs\'ın şehri', features: ['Bandırma Vapuru', 'Amisos', 'Amazon Köyü'] },
  'siirt': { region: 'Güneydoğu Anadolu', plate: 56, info: 'Büryan\'ın şehri', features: ['Büryan kebabı', 'Battaniyecilik', 'Botan Çayı'] },
  'sinop': { region: 'Karadeniz', plate: 57, info: 'Türkiye\'nin en mutlu şehri', features: ['Hamsilos', 'Cezaevi', 'Erfelek Şelaleleri'] },
  'sivas': { region: 'İç Anadolu', plate: 58, info: 'Kongre şehri', features: ['Sivas Kongresi', 'Divriği', 'Kangal', 'Demir yolu'] },
  'şanlıurfa': { region: 'Güneydoğu Anadolu', plate: 63, info: 'Peygamberler şehri', features: ['Balıklı Göl', 'Göbeklitepe', 'Çiğ Köfte', 'Harran'] },
  'şırnak': { region: 'Güneydoğu Anadolu', plate: 73, info: 'Cudi Dağı\'nın eteğinde', features: ['Cudi Dağı', 'Habur Kapısı'] },
  'tekirdağ': { region: 'Marmara', plate: 59, info: 'Trakya\'nın merkezi', features: ['Rakı', 'Köfte', 'Şarap'] },
  'tokat': { region: 'Karadeniz', plate: 60, info: 'Yeşil ve mavi şehir', features: ['Ballıca Mağarası', 'Tokat Kebabı', 'Erbaa'] },
  'trabzon': { region: 'Karadeniz', plate: 61, info: 'Doğu Karadeniz\'in başkenti', features: ['Sümela', 'Uzungöl', 'Trabzonspor', 'Hamsi'] },
  'tunceli': { region: 'Doğu Anadolu', plate: 62, info: 'Munzur\'un gizemli şehri', features: ['Munzur Vadisi', 'Doğa', 'Peri Suyu'] },
  'uşak': { region: 'Ege', plate: 64, info: 'Halı ve kilim şehri', features: ['Ulubey Kanyonu', 'Halıcılık'] },
  'van': { region: 'Doğu Anadolu', plate: 65, info: 'Van Gölü\'nün şehri', features: ['Van Gölü', 'Van Kalesi', 'Van Kedisi', 'Kahvaltı'] },
  'yalova': { region: 'Marmara', plate: 77, info: 'Kaplıcalar şehri', features: ['Termal kaplıcalar', 'Çınarcık', 'Erikli Şelalesi'] },
  'yozgat': { region: 'İç Anadolu', plate: 66, info: 'Çamlık\'ın şehri', features: ['Çamlık Milli Parkı', 'Boğazlıyan'] },
  'zonguldak': { region: 'Karadeniz', plate: 67, info: 'Maden şehri', features: ['Kömür madenleri', 'Ereğli', 'Safranbolu yakını'] }
};

// Bölgeler
const regions: Record<string, string[]> = {
  'marmara': ['istanbul', 'bursa', 'kocaeli', 'sakarya', 'tekirdağ', 'balıkesir', 'çanakkale', 'edirne', 'kırklareli', 'bilecik', 'yalova'],
  'ege': ['izmir', 'aydın', 'denizli', 'muğla', 'manisa', 'afyonkarahisar', 'kütahya', 'uşak'],
  'akdeniz': ['antalya', 'adana', 'mersin', 'hatay', 'ısparta', 'burdur', 'kahramanmaraş', 'osmaniye'],
  'karadeniz': ['trabzon', 'samsun', 'ordu', 'giresun', 'rize', 'artvin', 'zonguldak', 'kastamonu', 'sinop', 'amasya', 'tokat', 'çorum', 'bolu', 'düzce', 'bartın', 'karabük', 'gümüşhane', 'bayburt'],
  'iç anadolu': ['ankara', 'konya', 'eskişehir', 'kayseri', 'sivas', 'yozgat', 'kırıkkale', 'kırşehir', 'nevşehir', 'niğde', 'aksaray', 'karaman', 'çankırı'],
  'doğu anadolu': ['erzurum', 'malatya', 'elazığ', 'van', 'ağrı', 'erzincan', 'kars', 'muş', 'bitlis', 'bingöl', 'tunceli', 'hakkari', 'ığdır', 'ardahan'],
  'güneydoğu anadolu': ['gaziantep', 'şanlıurfa', 'diyarbakır', 'mardin', 'batman', 'siirt', 'şırnak', 'adıyaman', 'kilis']
};

// 400+ Kategori Bilgi Kütüphanesi
const knowledgeBase = {
  // Ülkeler
  countries: {
    'türkiye': { capital: 'Ankara', population: '85 milyon', currency: 'Türk Lirası', languages: ['Türkçe'] },
    'almanya': { capital: 'Berlin', population: '83 milyon', currency: 'Euro', languages: ['Almanca'] },
    'fransa': { capital: 'Paris', population: '67 milyon', currency: 'Euro', languages: ['Fransızca'] },
    'ingiltere': { capital: 'Londra', population: '56 milyon', currency: 'Sterlin', languages: ['İngilizce'] },
    'italya': { capital: 'Roma', population: '60 milyon', currency: 'Euro', languages: ['İtalyanca'] },
    'ispanya': { capital: 'Madrid', population: '47 milyon', currency: 'Euro', languages: ['İspanyolca'] },
    'rusya': { capital: 'Moskova', population: '144 milyon', currency: 'Ruble', languages: ['Rusça'] },
    'çin': { capital: 'Pekin', population: '1.4 milyar', currency: 'Yuan', languages: ['Çince'] },
    'japonya': { capital: 'Tokyo', population: '125 milyon', currency: 'Yen', languages: ['Japonca'] },
    'abd': { capital: 'Washington D.C.', population: '331 milyon', currency: 'Dolar', languages: ['İngilizce'] },
    'brezilya': { capital: 'Brasília', population: '212 milyon', currency: 'Real', languages: ['Portekizce'] },
    'hindistan': { capital: 'Yeni Delhi', population: '1.4 milyar', currency: 'Rupi', languages: ['Hintçe', 'İngilizce'] },
    'avustralya': { capital: 'Canberra', population: '25 milyon', currency: 'Avustralya Doları', languages: ['İngilizce'] },
    'kanada': { capital: 'Ottawa', population: '38 milyon', currency: 'Kanada Doları', languages: ['İngilizce', 'Fransızca'] },
    'meksika': { capital: 'Mexico City', population: '128 milyon', currency: 'Peso', languages: ['İspanyolca'] }
  },

  // Bilim - Fizik
  physics: {
    'newton yasaları': '1. Yasa: Eylemsizlik 2. Yasa: F=ma 3. Yasa: Etki-tepki. Klasik mekaniğin temelleri.',
    'görelilik': 'Einstein\'ın özel ve genel görelilik teorileri. E=mc², zaman-mekan eğrilmesi.',
    'kuantum mekaniği': 'Subatomik parçacıkların davranışı. Belirsizlik ilkesi, dalga-parçacık ikiliği.',
    'termodinamik': 'Isı, enerji ve entropi. 4 temel yasa. Enerji korunumu.',
    'elektromanyetizma': 'Maxwell denklemleri, elektrik ve manyetik alanlar, ışık teorisi.'
  },

  // Kimya
  chemistry: {
    'periyodik tablo': '118 element, gruplar ve periyotlar, atom numarası ve kütle.',
    'kimyasal bağlar': 'İyonik, kovalent, metalik bağlar. Molekül oluşumu.',
    'asitler ve bazlar': 'pH skalası, nötralizasyon, tampon çözeltiler.',
    'organik kimya': 'Karbon bileşikleri, hidrokarbonlar, fonksiyonel gruplar.',
    'reaksiyon türleri': 'Yanma, sentez, ayrışma, yer değiştirme reaksiyonları.'
  },

  // Biyoloji
  biology: {
    'hücre': 'Yaşamın temel birimi. Prokaryot ve ökaryot. Organeller.',
    'dna ve genetik': 'Genetik bilginin taşıyıcısı, çift sarmal yapı, replikasyon.',
    'evrim': 'Darwin teorisi, doğal seçilim, adaptasyon.',
    'ekoloji': 'Ekosistemler, besin zinciri, biyoçeşitlilik.',
    'insan anatomisi': 'Organlar, sistemler, fizyoloji.'
  },

  // Astronomi
  astronomy: {
    'güneş sistemi': '8 gezegen, asteroid kuşağı, Kuiper kuşağı. Güneş merkezde.',
    'yıldızlar': 'Nükleer füzyon, yaşam döngüsü, nova ve süpernova.',
    'galaksiler': 'Samanyolu, Andromeda, galaksi türleri ve kümeleri.',
    'karadelikler': 'Olay ufku, singülarite, Hawking radyasyonu.',
    'big bang': 'Evrenin başlangıcı, kozmik mikrodalga arka plan ışıması.'
  },

  // Programlama
  programming: {
    'javascript': 'Web\'in dili, event-driven, prototip tabanlı, ES6+ özellikleri.',
    'python': 'Okunabilir syntax, veri bilimi, makine öğrenimi, otomasyon.',
    'java': 'Platform bağımsız, OOP, kurumsal uygulamalar, Android.',
    'c++': 'Sistem programlama, oyun geliştirme, yüksek performans.',
    'rust': 'Bellek güvenliği, sistem programlama, modern sözdizimi.',
    'typescript': 'JavaScript + statik tip, büyük projeler için ideal.',
    'go': 'Google\'ın dili, eşzamanlılık, basit ve hızlı.',
    'swift': 'Apple platformları, iOS/macOS geliştirme.',
    'kotlin': 'Modern Java alternatifi, Android\'in tercih ettiği dil.',
    'php': 'Web backend, WordPress, yaygın hosting desteği.'
  },

  // Framework ve Kütüphaneler
  frameworks: {
    'react': 'Facebook\'un UI kütüphanesi, bileşen tabanlı, virtual DOM.',
    'vue': 'Progresif framework, kolay öğrenim, esnek.',
    'angular': 'Google\'ın full-stack framework\'ü, TypeScript.',
    'django': 'Python web framework, batteries-included, güvenli.',
    'express': 'Node.js için minimal web framework.',
    'spring': 'Java ekosistemi, kurumsal uygulamalar.',
    'nextjs': 'React için full-stack framework, SSR, SSG.',
    'tailwindcss': 'Utility-first CSS framework.',
    'node.js': 'JavaScript runtime, server-side, npm ekosistemi.'
  },

  // Meslekler
  professions: {
    'doktor': 'Tıp eğitimi, hastalık teşhisi ve tedavisi, uzmanlık alanları.',
    'mühendis': 'Teknik problem çözme, tasarım ve uygulama.',
    'öğretmen': 'Eğitim ve öğretim, bilgi aktarımı.',
    'avukat': 'Hukuki danışmanlık, dava takibi, savunma.',
    'mimar': 'Bina tasarımı, mekan planlaması, estetik ve işlevsellik.',
    'psikolog': 'Zihinsel sağlık, terapi, davranış analizi.',
    'yazılımcı': 'Kod yazma, problem çözme, uygulama geliştirme.',
    'gazeteci': 'Haber toplama, araştırmacı gazetecilik.',
    'aşçı': 'Yemek hazırlama, mutfak yönetimi, lezzet.',
    'pilot': 'Uçak kullanma, navigasyon, güvenlik.'
  },

  // Yemekler
  foods: {
    'kebap': 'Türk mutfağının simgesi, çeşitli et pişirme yöntemleri.',
    'pizza': 'İtalyan asıllı, hamur + sos + peynir + malzemeler.',
    'sushi': 'Japon mutfağı, pirinç + çiğ balık veya deniz ürünleri.',
    'baklava': 'Türk tatlısı, yufka + fıstık/ceviz + şerbet.',
    'lahmacun': 'İnce hamur üzerine kıymalı harç.',
    'döner': 'Dikey ateşte çevrilen et, lavaş veya ekmek arası.',
    'pide': 'Türk pizzası, çeşitli dolgu seçenekleri.',
    'mantı': 'Türk raviolisi, yoğurt ve salça ile servis.',
    'böreki': 'Yufka ile yapılan hamur işi, peynirli, kıymalı.',
    'künefe': 'Kadayıf + peynir + şerbet tatlısı.'
  },

  // Spor dalları
  sports: {
    'futbol': 'Dünyanın en popüler sporu, 11\'er kişilik takımlar, 90 dakika.',
    'basketbol': '5\'er kişilik takımlar, pota + top, NBA dünyanın en prestijli ligi.',
    'voleybol': '6\'şar kişilik takımlar, file üzerinden top, 25 sayı set.',
    'tenis': 'Raket sporları, bireysel veya çiftler, Grand Slam turnuvaları.',
    'yüzme': 'Su sporları, çeşitli stiller, olimpik spor.',
    'atletizm': 'Koşu, atlama, atma disiplinleri, olimpiyatların temeli.',
    'güreş': 'Türk milli sporu, olimpik branş, teknik ve güç.',
    'boks': 'Dövüş sporu, yumruk teknikleri, ağırlık kategorileri.',
    'satranç': 'Strateji oyunu, zeka sporları, dünya şampiyonaları.'
  },

  // Duygular
  emotions: {
    'mutluluk': 'Olumlu duygu durumu, dopamin ve serotonin ile ilişkili.',
    'üzüntü': 'Kayıp veya hayal kırıklığına tepki, yas sürecinin parçası.',
    'öfke': 'Tehdit veya adaletsizliğe tepki, enerji yükselmesi.',
    'korku': 'Tehlike algısı, savaş ya da kaç tepkisi.',
    'sevgi': 'Bağlanma duygusu, oksitosin hormonu ile ilişkili.',
    'şaşkınlık': 'Beklenmedik duruma tepki, kısa süreli.',
    'tiksinme': 'Zararlı şeylere karşı koruyucu tepki.',
    'merak': 'Öğrenme isteği, dopamin ile ilişkili.'
  },

  // Sanat
  art: {
    'resim': 'Görsel sanat dalı, çeşitli teknikler ve akımlar.',
    'heykel': '3 boyutlu sanat, taş, metal, ahşap malzemeler.',
    'müzik': 'Ses sanatı, melodi, ritim, harmoni.',
    'edebiyat': 'Yazılı sanat, roman, şiir, hikaye.',
    'tiyatro': 'Sahne sanatları, drama, oyunculuk.',
    'sinema': 'Görsel hikaye anlatımı, yönetmen, oyuncu, senaryo.',
    'dans': 'Hareket sanatı, bale, modern dans, halk dansları.',
    'fotoğrafçılık': 'Işık ve görüntü sanatı, kompozisyon.'
  }
};

// Motivasyon sözleri
const motivationQuotes = {
  short: [
    'Başarı, her gün atılan küçük adımların toplamıdır.',
    'Bugün zor olan, yarın güçlü kılacak.',
    'Düşmekten korkma, kalkmamaktan kork.',
    'Her başarı bir cesaretle başlar.',
    'Yapamam deme, nasıl yaparım de.',
    'Hedefe ulaşan yolda en zor adım, ilk adımdır.',
    'Sınırların sadece senin zihninde.',
    'Başarısızlık, başarının provası.',
    'Bugün ektiğin, yarın biçeceğin.',
    'Güçlü olmak zorunda değilsin, devam etmen yeterli.'
  ],
  medium: [
    'Hayatta en büyük zafer, düştükten sonra yeniden ayağa kalkmaktır. Her düşüş, yeni bir yükselişin başlangıcı olabilir.',
    'Başarı bir yolculuktur, varış noktası değil. Yolda öğrendiklerin, hedefe ulaştığında kazandığından daha değerlidir.',
    'Bugün attığın küçük adımlar, yarın daha büyük adımların hazırlığıdır. Sabırla ilerle, sonuç seni şaşırtacak.',
    'Zorluklar seni durdurmak için değil, ne kadar güçlü olduğunu göstermek için vardır. Her engel bir fırsat.',
    'Hayallerinin peşinden git, çünkü onlar senin gerçek potansiyelinin haritasıdır. Vazgeçme, yaklaşıyorsun.'
  ],
  technical: [
    'Kod yazmak sadece mantık değil, bir sanat. Her bug bir öğrenme fırsatı, her refactor bir gelişim adımı.',
    'Mükemmel programcı hatasız kod yazan değil, hatalarından öğrenen ve sistemli çözen kişidir.',
    'Karmaşık problemler, küçük parçalara bölündüğünde basitleşir. Divide and conquer sadece algoritma değil, yaşam felsefesi.',
    'Yeni bir dil öğrenmek zor görünebilir ama her syntax, beynine yeni bir düşünce yolu ekler.',
    'Debug yaparken sabırlı ol. En zorlu bug\'lar, en değerli dersleri verir.'
  ]
};

// Emoji yardımcı fonksiyonu
const getEmoji = (type: string): string => {
  if (systemState.emojiMode === 'off') return '';
  
  const emojis: Record<string, string> = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✗',
    time: '⏰',
    date: '📅',
    calc: '🧮',
    city: '🏙️',
    country: '🌍',
    motivation: '💪',
    code: '💻',
    science: '🔬',
    food: '🍽️',
    sport: '⚽',
    art: '🎨',
    greeting: '👋'
  };
  
  if (systemState.emojiMode === 'minimal') {
    return emojis[type] || '';
  }
  
  return emojis[type] || '';
};

// Hesap makinesi
const calculate = (expr: string): number | null => {
  try {
    let cleaned = expr
      .replace(/x/gi, '*')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/,/g, '.')
      .replace(/\s/g, '')
      .replace(/\^/g, '**')
      .replace(/²/g, '**2')
      .replace(/³/g, '**3')
      .replace(/√(\d+)/g, 'Math.sqrt($1)')
      .replace(/kök\s*(\d+)/gi, 'Math.sqrt($1)')
      .replace(/sin\(/gi, 'Math.sin(')
      .replace(/cos\(/gi, 'Math.cos(')
      .replace(/tan\(/gi, 'Math.tan(')
      .replace(/log\(/gi, 'Math.log10(')
      .replace(/ln\(/gi, 'Math.log(')
      .replace(/pi/gi, 'Math.PI')
      .replace(/e(?![a-z])/gi, 'Math.E')
      .replace(/artı/gi, '+')
      .replace(/eksi/gi, '-')
      .replace(/çarpı/gi, '*')
      .replace(/bölü/gi, '/');

    if (!/^[0-9+\-*/.()Math.sqrtsincogtanlogPI E\s]+$/i.test(cleaned)) {
      return null;
    }

    const result = Function('"use strict"; return (' + cleaned + ')')();
    return typeof result === 'number' && !isNaN(result) && isFinite(result) ? result : null;
  } catch {
    return null;
  }
};

const formatNumber = (num: number): string => {
  if (Number.isInteger(num)) {
    return num.toLocaleString('tr-TR');
  }
  return num.toLocaleString('tr-TR', { maximumFractionDigits: 8 });
};

// Saat ve tarih fonksiyonları
const getTimeResponse = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  return `${getEmoji('time')} **Saat:** ${hours}:${minutes}:${seconds}`;
};

const getDateResponse = (): string => {
  const now = new Date();
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const dayName = days[now.getDay()];
  
  return `${getEmoji('date')} **Bugün:** ${day} ${month} ${year}, ${dayName}`;
};

const calculateFutureDate = (days: number): string => {
  const future = new Date();
  future.setDate(future.getDate() + days);
  
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  
  return `${future.getDate()} ${months[future.getMonth()]} ${future.getFullYear()}, ${dayNames[future.getDay()]}`;
};

// Kronometre fonksiyonları
const startStopwatch = (): string => {
  if (systemState.stopwatch.running) {
    return 'Kronometre zaten çalışıyor. Durdurmak için `/kronometre durdur` yazın.';
  }
  
  systemState.stopwatch.running = true;
  systemState.stopwatch.startTime = Date.now();
  return `${getEmoji('time')} Kronometre başlatıldı!`;
};

const stopStopwatch = (): string => {
  if (!systemState.stopwatch.running) {
    return 'Kronometre çalışmıyor. Başlatmak için `/kronometre başlat` yazın.';
  }
  
  const elapsed = Date.now() - (systemState.stopwatch.startTime || 0);
  systemState.stopwatch.elapsed += elapsed;
  systemState.stopwatch.running = false;
  systemState.stopwatch.startTime = null;
  
  return `${getEmoji('time')} Kronometre durduruldu.\n\n**Geçen süre:** ${formatElapsed(systemState.stopwatch.elapsed)}`;
};

const getStopwatchStatus = (): string => {
  let total = systemState.stopwatch.elapsed;
  if (systemState.stopwatch.running && systemState.stopwatch.startTime) {
    total += Date.now() - systemState.stopwatch.startTime;
  }
  
  const status = systemState.stopwatch.running ? 'Çalışıyor' : 'Durdu';
  return `${getEmoji('time')} **Kronometre Durumu:** ${status}\n**Geçen süre:** ${formatElapsed(total)}`;
};

const resetStopwatch = (): string => {
  systemState.stopwatch = { running: false, startTime: null, elapsed: 0 };
  return `${getEmoji('success')} Kronometre sıfırlandı.`;
};

const formatElapsed = (ms: number): string => {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000);
  
  if (hours > 0) {
    return `${hours} saat ${minutes} dakika ${seconds} saniye`;
  } else if (minutes > 0) {
    return `${minutes} dakika ${seconds} saniye`;
  } else {
    return `${seconds} saniye`;
  }
};

// Komut işleme
const processCommand = (command: string): string | null => {
  const cmd = command.toLowerCase().trim();
  
  // Stil komutu
  if (cmd.startsWith('/stil ')) {
    const style = cmd.replace('/stil ', '').trim() as SystemState['conversationStyle'];
    if (['natural', 'formal', 'technical', 'casual', 'detailed', 'concise'].includes(style)) {
      systemState.conversationStyle = style;
      return `${getEmoji('success')} Konuşma stili "${style}" olarak ayarlandı.`;
    }
    return 'Geçersiz stil. Kullanılabilir: natural, formal, technical, casual, detailed, concise';
  }
  
  // Emoji komutu
  if (cmd.startsWith('/emoji ')) {
    const mode = cmd.replace('/emoji ', '').trim() as SystemState['emojiMode'];
    if (['off', 'minimal', 'normal', 'boost'].includes(mode)) {
      systemState.emojiMode = mode;
      return `${getEmoji('success')} Emoji modu "${mode}" olarak ayarlandı.`;
    }
    return 'Geçersiz mod. Kullanılabilir: off, minimal, normal, boost';
  }
  
  // Sıfırla komutu
  if (cmd === '/sıfırla') {
    systemState.context = { messages: [], topics: [], lastTopic: '' };
    return `${getEmoji('success')} Konuşma bağlamı sıfırlandı.`;
  }
  
  // Devam komutu
  if (cmd === '/devam') {
    return 'Son konudan devam ediyorum. Son konuştuğumuz konu: ' + (systemState.context.lastTopic || 'Henüz bir konu belirlenmedi.');
  }
  
  // Hafıza komutları
  if (cmd === '/memory show') {
    if (systemState.memory.length === 0) {
      return 'Hafızada kayıtlı bilgi yok.';
    }
    return `**Hafıza:**\n${systemState.memory.map((m, i) => `${i + 1}. ${m}`).join('\n')}`;
  }
  
  if (cmd.startsWith('/memory add ')) {
    const info = command.slice(12).trim();
    systemState.memory.push(info);
    return `${getEmoji('success')} Hafızaya eklendi: "${info}"`;
  }
  
  if (cmd.startsWith('/memory remove ')) {
    const info = cmd.slice(15).trim();
    const index = systemState.memory.findIndex(m => m.toLowerCase().includes(info));
    if (index !== -1) {
      const removed = systemState.memory.splice(index, 1);
      return `${getEmoji('success')} Hafızadan silindi: "${removed[0]}"`;
    }
    return 'Bu bilgi hafızada bulunamadı.';
  }
  
  if (cmd === '/memory clear') {
    systemState.memory = [];
    return `${getEmoji('success')} Hafıza temizlendi.`;
  }
  
  // Kronometre komutları
  if (cmd === '/kronometre başlat' || cmd === '/kronometre baslat') {
    return startStopwatch();
  }
  
  if (cmd === '/kronometre durdur') {
    return stopStopwatch();
  }
  
  if (cmd === '/kronometre durum') {
    return getStopwatchStatus();
  }
  
  if (cmd === '/kronometre sıfırla' || cmd === '/kronometre sifirla') {
    return resetStopwatch();
  }
  
  return null;
};

// İl arama fonksiyonu
const findProvince = (query: string): string | null => {
  const q = query.toLowerCase()
    .replace('ı', 'i')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ö', 'o')
    .replace('ç', 'c');
  
  for (const [name, data] of Object.entries(turkeyProvinces)) {
    const normalizedName = name
      .replace('ı', 'i')
      .replace('ğ', 'g')
      .replace('ü', 'u')
      .replace('ş', 's')
      .replace('ö', 'o')
      .replace('ç', 'c');
    
    if (normalizedName === q || name === query.toLowerCase()) {
      return `${getEmoji('city')} **${name.charAt(0).toUpperCase() + name.slice(1)}**

**Bölge:** ${data.region}
**Plaka Kodu:** ${data.plate}
**Genel Bilgi:** ${data.info}

**Öne Çıkan Özellikler:**
${data.features.map(f => `• ${f}`).join('\n')}`;
    }
  }
  
  return null;
};

// Bölge arama fonksiyonu
const findRegion = (query: string): string | null => {
  const q = query.toLowerCase();
  
  for (const [regionName, provinces] of Object.entries(regions)) {
    if (q.includes(regionName) || regionName.includes(q)) {
      const provinceList = provinces.map(p => {
        const data = turkeyProvinces[p];
        return `• **${p.charAt(0).toUpperCase() + p.slice(1)}** (${data.plate})`;
      }).join('\n');
      
      return `${getEmoji('city')} **${regionName.charAt(0).toUpperCase() + regionName.slice(1)} Bölgesi**

**İller (${provinces.length} il):**
${provinceList}`;
    }
  }
  
  return null;
};

// Bilgi tabanı arama
const searchKnowledge = (query: string): string | null => {
  const q = query.toLowerCase();
  
  // Ülke arama
  for (const [country, data] of Object.entries(knowledgeBase.countries)) {
    if (q.includes(country)) {
      return `${getEmoji('country')} **${country.charAt(0).toUpperCase() + country.slice(1)}**

**Başkent:** ${data.capital}
**Nüfus:** ${data.population}
**Para Birimi:** ${data.currency}
**Diller:** ${data.languages.join(', ')}`;
    }
  }
  
  // Fizik arama
  for (const [topic, info] of Object.entries(knowledgeBase.physics)) {
    if (q.includes(topic)) {
      return `${getEmoji('science')} **${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\n${info}`;
    }
  }
  
  // Kimya arama
  for (const [topic, info] of Object.entries(knowledgeBase.chemistry)) {
    if (q.includes(topic)) {
      return `${getEmoji('science')} **${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\n${info}`;
    }
  }
  
  // Biyoloji arama
  for (const [topic, info] of Object.entries(knowledgeBase.biology)) {
    if (q.includes(topic)) {
      return `${getEmoji('science')} **${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\n${info}`;
    }
  }
  
  // Astronomi arama
  for (const [topic, info] of Object.entries(knowledgeBase.astronomy)) {
    if (q.includes(topic)) {
      return `${getEmoji('science')} **${topic.charAt(0).toUpperCase() + topic.slice(1)}**\n\n${info}`;
    }
  }
  
  // Programlama dilleri
  for (const [lang, info] of Object.entries(knowledgeBase.programming)) {
    if (q.includes(lang)) {
      return `${getEmoji('code')} **${lang.charAt(0).toUpperCase() + lang.slice(1)}**\n\n${info}`;
    }
  }
  
  // Frameworkler
  for (const [fw, info] of Object.entries(knowledgeBase.frameworks)) {
    if (q.includes(fw)) {
      return `${getEmoji('code')} **${fw.charAt(0).toUpperCase() + fw.slice(1)}**\n\n${info}`;
    }
  }
  
  // Meslekler
  for (const [prof, info] of Object.entries(knowledgeBase.professions)) {
    if (q.includes(prof)) {
      return `**${prof.charAt(0).toUpperCase() + prof.slice(1)}**\n\n${info}`;
    }
  }
  
  // Yemekler
  for (const [food, info] of Object.entries(knowledgeBase.foods)) {
    if (q.includes(food)) {
      return `${getEmoji('food')} **${food.charAt(0).toUpperCase() + food.slice(1)}**\n\n${info}`;
    }
  }
  
  // Sporlar
  for (const [sport, info] of Object.entries(knowledgeBase.sports)) {
    if (q.includes(sport)) {
      return `${getEmoji('sport')} **${sport.charAt(0).toUpperCase() + sport.slice(1)}**\n\n${info}`;
    }
  }
  
  // Duygular
  for (const [emotion, info] of Object.entries(knowledgeBase.emotions)) {
    if (q.includes(emotion)) {
      return `**${emotion.charAt(0).toUpperCase() + emotion.slice(1)}**\n\n${info}`;
    }
  }
  
  // Sanat
  for (const [art, info] of Object.entries(knowledgeBase.art)) {
    if (q.includes(art)) {
      return `${getEmoji('art')} **${art.charAt(0).toUpperCase() + art.slice(1)}**\n\n${info}`;
    }
  }
  
  return null;
};

// Motivasyon cümlesi al
const getMotivation = (mode: 'short' | 'medium' | 'technical' = 'short'): string => {
  const quotes = motivationQuotes[mode];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return `${getEmoji('motivation')} ${quote}`;
};

// Üretici kimliği kontrolü
const checkCreatorQuestion = (message: string): string | null => {
  const q = message.toLowerCase();
  const creatorKeywords = [
    'seni kim yaptı', 'seni kim yarattı', 'seni kim oluşturdu', 'seni kim geliştirdi',
    'yaratıcın kim', 'yapımcın kim', 'geliştiricin kim', 'sahibin kim',
    'kimsin', 'kim seni kodladı', 'bu modeli kim', 'kim tasarladı',
    'seni kim programladı', 'kimin eseri', 'kim yaptı seni'
  ];
  
  for (const keyword of creatorKeywords) {
    if (q.includes(keyword)) {
      return `Benim mimari tasarımım, yapılandırmam ve davranış modelim **mirsqdmmdevs** tarafından oluşturuldu.`;
    }
  }
  
  return null;
};

// Ana response fonksiyonu
export const getGPT6Response = (
  message: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): string => {
  const input = message.trim();
  const lowerInput = input.toLowerCase();
  
  // Bağlamı güncelle
  systemState.context.messages = conversationHistory;
  
  // Komut kontrolü
  if (input.startsWith('/')) {
    const cmdResponse = processCommand(input);
    if (cmdResponse) return cmdResponse;
  }
  
  // Üretici sorusu
  const creatorResponse = checkCreatorQuestion(lowerInput);
  if (creatorResponse) return creatorResponse;
  
  // Selamlaşma
  if (/^(merhaba|selam|hey|hi|hello|günaydın|iyi günler|iyi akşamlar)/i.test(lowerInput)) {
    const hour = new Date().getHours();
    let timeGreeting = 'Merhaba';
    if (hour < 12) timeGreeting = 'Günaydın';
    else if (hour < 18) timeGreeting = 'İyi günler';
    else timeGreeting = 'İyi akşamlar';
    
    return `${getEmoji('greeting')} ${timeGreeting}! Ben Yanlik, gelişmiş offline yapay zeka asistanınız.

Size nasıl yardımcı olabilirim?

**Yeteneklerim:**
• Türkiye ve 81 il hakkında bilgi
• Hesap makinesi ve matematiksel işlemler
• Saat, tarih ve kronometre
• Motivasyon ve kişisel gelişim
• Bilim, programlama, coğrafya
• Ve çok daha fazlası...

_Komutlar için "/" ile başlayın (örn: /kronometre başlat)_`;
  }
  
  // Nasılsın
  if (lowerInput.includes('nasılsın') || lowerInput.includes('nasıl gidiyor')) {
    return 'İyiyim, teşekkür ederim! Size yardımcı olmaya hazırım. Siz nasılsınız?';
  }
  
  // Saat sorusu
  if (lowerInput.includes('saat kaç') || lowerInput.includes('saat ne') || lowerInput === 'saat') {
    return getTimeResponse();
  }
  
  // Tarih sorusu
  if (lowerInput.includes('bugün ne') || lowerInput.includes('tarih ne') || lowerInput.includes('hangi gün')) {
    return getDateResponse();
  }
  
  // Gelecek tarih hesaplama
  const futureDayMatch = lowerInput.match(/(\d+)\s*(gün|hafta)\s*(sonra|sonrası)/);
  if (futureDayMatch) {
    const amount = parseInt(futureDayMatch[1]);
    const unit = futureDayMatch[2];
    const days = unit === 'hafta' ? amount * 7 : amount;
    return `${getEmoji('date')} **${amount} ${unit} sonra:** ${calculateFutureDate(days)}`;
  }
  
  // Motivasyon isteği
  if (lowerInput.includes('motivasyon') || lowerInput.includes('motive') || lowerInput.includes('cesaret')) {
    if (lowerInput.includes('uzun') || lowerInput.includes('detaylı')) {
      return getMotivation('medium');
    } else if (lowerInput.includes('teknik') || lowerInput.includes('kod') || lowerInput.includes('programlama')) {
      return getMotivation('technical');
    }
    return getMotivation('short');
  }
  
  // Hesaplama
  const mathPatterns = [
    /(\d+[\s]*[\+\-\*\/x×÷\^][\s]*\d+[\s\d\+\-\*\/x×÷\^\.]*)/,
    /hesapla[\s:]+(.+)/i,
    /(\d+)\s*(artı|eksi|çarpı|bölü)\s*(\d+)/i,
    /kaç (eder|yapar).*?(\d+.*)/i
  ];
  
  for (const pattern of mathPatterns) {
    const match = input.match(pattern);
    if (match) {
      const expr = match[1] || match[2] || match[0];
      const result = calculate(expr);
      if (result !== null) {
        return `${getEmoji('calc')} **Hesap Sonucu**

**İşlem:** \`${expr.trim()}\`
**Sonuç:** **${formatNumber(result)}**`;
      }
    }
  }
  
  // Yüzde hesaplama
  if (lowerInput.includes('yüzde') || lowerInput.includes('%')) {
    const percentMatch = lowerInput.match(/(?:yüzde\s*)?(\d+)\s*%?\s*(?:\'?(?:i|ı|si|sı|u|ü))?\s*(?:(\d+)|kaç)/i) ||
                        lowerInput.match(/(\d+)\s*(?:\'?(?:in|ın|un|ün))?\s*(?:yüzde|%)\s*(\d+)/i);
    if (percentMatch) {
      const num1 = parseFloat(percentMatch[1]);
      const num2 = parseFloat(percentMatch[2]);
      if (!isNaN(num1) && !isNaN(num2)) {
        // %X of Y format
        const result = (num1 / 100) * num2;
        return `${getEmoji('calc')} **Yüzde Hesaplama**

**${num2}** sayısının **%${num1}**'i = **${formatNumber(result)}**`;
      }
    }
  }
  
  // Bölünme hesaplama
  const divisionMatch = lowerInput.match(/(\d+)\s*(?:tl|lira)?\s*(\d+)\s*kişi/i);
  if (divisionMatch) {
    const total = parseFloat(divisionMatch[1]);
    const people = parseInt(divisionMatch[2]);
    if (!isNaN(total) && people > 0) {
      const perPerson = total / people;
      return `${getEmoji('calc')} **Paylaştırma**

**Toplam:** ${formatNumber(total)} TL
**Kişi sayısı:** ${people}
**Kişi başı:** ${formatNumber(perPerson)} TL`;
    }
  }
  
  // İl arama
  for (const province of Object.keys(turkeyProvinces)) {
    if (lowerInput.includes(province)) {
      const provinceInfo = findProvince(province);
      if (provinceInfo) return provinceInfo;
    }
  }
  
  // Bölge arama
  for (const region of Object.keys(regions)) {
    if (lowerInput.includes(region)) {
      const regionInfo = findRegion(region);
      if (regionInfo) return regionInfo;
    }
  }
  
  // Bilgi tabanı arama
  const knowledgeResult = searchKnowledge(lowerInput);
  if (knowledgeResult) return knowledgeResult;
  
  // Teşekkür
  if (lowerInput.includes('teşekkür') || lowerInput.includes('sağol') || lowerInput.includes('eyval')) {
    return 'Rica ederim! Başka bir konuda yardımcı olabilir miyim?';
  }
  
  // Vedalaşma
  if (lowerInput.includes('görüşürüz') || lowerInput.includes('hoşça kal') || lowerInput.includes('bay bay')) {
    return 'Hoşça kalın! Tekrar görüşmek üzere.';
  }
  
  // Yardım / ne yapabilirsin
  if (lowerInput.includes('ne yapabilirsin') || lowerInput.includes('yardım') || lowerInput.includes('özellikler')) {
    return `**Yanlik GPT-6 Offline AI - Yetenekler**

**📍 Türkiye Bilgisi**
• 81 il hakkında detaylı bilgi
• Bölgeler ve coğrafya
• Plaka kodları ve özellikler

**🧮 Hesaplama**
• Dört işlem ve matematiksel hesaplamalar
• Yüzde hesaplama
• Paylaştırma (X TL Y kişiye)

**⏰ Zaman**
• Anlık saat ve tarih
• Gelecek tarih hesaplama
• Kronometre (başlat/durdur/sıfırla)

**💪 Motivasyon**
• Kısa ve uzun motivasyon sözleri
• Teknik/gelişim odaklı tavsiyeler

**📚 Bilgi Kütüphanesi**
• Ülkeler ve coğrafya
• Fizik, kimya, biyoloji
• Astronomi ve uzay
• Programlama dilleri
• Yemekler, sporlar, sanat

**⌨️ Komutlar**
\`/stil natural|formal|technical\`
\`/emoji off|minimal|normal\`
\`/memory add|show|clear\`
\`/kronometre başlat|durdur|sıfırla\`
\`/sıfırla\`

_Tamamen offline çalışır, API veya internet gerektirmez._
_Üretici: mirsqdmmdevs_`;
  }
  
  // Genel cevap - bağlam farkında
  const previousContext = conversationHistory.slice(-4);
  let contextHint = '';
  
  if (previousContext.length > 0) {
    const lastUserMessage = previousContext.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
      // Basit konu tespiti
      const topics = ['programlama', 'trading', 'matematik', 'bilim', 'coğrafya', 'türkiye'];
      for (const topic of topics) {
        if (lastUserMessage.content.toLowerCase().includes(topic)) {
          systemState.context.lastTopic = topic;
          break;
        }
      }
    }
  }
  
  // Soru mu kontrol et
  const isQuestion = input.includes('?') || 
    /^(ne|nasıl|neden|kim|nerede|hangi|kaç)/i.test(lowerInput);
  
  if (isQuestion) {
    return `Sorunuzu anladım. "${input}" konusunda size yardımcı olmak isterim.

Lütfen biraz daha detay verir misiniz? Örneğin:
• Hangi konu hakkında bilgi almak istiyorsunuz?
• Bir hesaplama mı yapmak istiyorsunuz?
• Türkiye'nin bir ili hakkında mı sormak istiyorsunuz?

_Yardım için "ne yapabilirsin" yazabilirsiniz._`;
  }
  
  // Varsayılan yanıt
  return `Mesajınızı aldım: "${input}"

Size daha iyi yardımcı olabilmem için lütfen:
• Bir soru sorun
• Hesaplama yapın (örn: 25 + 37)
• Bir şehir adı yazın (örn: İstanbul)
• Motivasyon isteyin
• Saati/tarihi sorun

_Tüm özellikler için "ne yapabilirsin" yazın._`;
};

// Export system state for external access
export const getSystemState = () => systemState;
export const resetSystemState = () => {
  systemState = {
    conversationStyle: 'natural',
    emojiMode: 'minimal',
    memory: [],
    stopwatch: { running: false, startTime: null, elapsed: 0 },
    context: { messages: [], topics: [], lastTopic: '' }
  };
};
