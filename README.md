# MyCourseWebFrontend

## Proje Açıklaması

`MyCourseWebFrontend`, kurs yönetimi ve etkileşimi sağlayan bir web uygulamasıdır. React.js ile geliştirilmiş olan bu frontend, kullanıcıların kursları görüntülemesini, detaylarını incelemesini, yorum yapmasını ve puanlama yapmasını sağlar. Ayrıca, kullanıcılar kurs satın alma işlemlerini de gerçekleştirebilirler.

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
  - [Gereksinimler](#gereksinimler)
  - [Kurulum Adımları](#kurulum-adımları)
- [Kullanım](#kullanım)
- [Proje Yapısı](#proje-yapısı)
- [Teknolojiler](#teknolojiler)

## Özellikler

### Ana Sayfa (Home)
- **Kurs Listesi**: Tüm mevcut kursların kısa özetleri, isimleri ve puanlarıyla birlikte görüntülenir.
- **Kategoriler**: Kurslar, ana kategorilere ve alt kategorilere göre filtrelenebilir.
- **Arama**: Kullanıcılar, kurs adı veya açıklamasına göre arama yapabilir.

### Kurs Detayları (CourseDetails)
- **Kurs Bilgileri**: Kurs adı, açıklaması, toplam süre, fiyat ve puan gibi detaylar görüntülenir.
- **Eğitmen Bilgileri**: Kursun eğitmeninin adı ve detayları gösterilir.
- **Yorumlar**: Kullanıcıların kurs hakkında bıraktığı yorumlar ve puanlar listelenir.
- **Puanlama ve Yorum**: Kullanıcılar, kursa puan verebilir ve yorum yapabilir.

### Kullanıcı Profili (UserProfile)
- **Kullanıcı Bilgileri**: Kullanıcının adı, e-posta ve profil resmi gibi bilgileri görüntülenir.
- **Satın Alma Geçmişi**: Kullanıcının satın aldığı kurslar listelenir.
- **Yorumlar**: Kullanıcının yaptığı yorumlar ve puanlamalar görüntülenir.

### Kurs Satın Alma (Purchase)
- **Kurs Satın Alma**: Kullanıcılar kursları sepete ekleyebilir ve satın alabilirler.
- **Sipariş Durumu**: Siparişlerin durumu (örneğin: "Sipariş Alındı", "Sipariş Onaylandı") takip edilebilir.

### Yönetim Paneli (Admin)
- **Kurs Yönetimi**: Yöneticiler kursları ekleyebilir, düzenleyebilir ve silebilirler.
- **Kategori Yönetimi**: Kurs kategorileri eklenebilir, düzenlenebilir ve silinebilir.

## Kurulum

### Gereksinimler
- **Node.js (v14 veya üstü)**
- **npm veya yarn**

### Kurulum Adımları

1. **Depoyu Klonla:**
    ```bash
    git clone https://github.com/kullaniciAdi/MyCourseWebFrontend.git
    ```

2. **Bağımlılıkları Yükle:**
    ```bash
    cd MyCourseWebFrontend
    npm install
    ```
    veya
    ```bash
    yarn install
    ```

3. **Geliştirme Sunucusunu Başlat:**
    ```bash
    npm start
    ```
    veya
    ```bash
    yarn start
    ```
   Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Kullanım

- **Ana Sayfa**: Uygulama açıldığında ana sayfa görüntülenir. Buradan kursları listeleyebilir ve kategorilere göre filtreleyebilirsiniz.
- **Kurs Detayları**: Bir kursun detaylarına gitmek için kursun adına tıklayın. Buradan kurs hakkında daha fazla bilgi alabilir ve yorum yapabilirsiniz.
- **Kullanıcı Profili**: Kullanıcı profiline erişmek için sağ üst köşedeki profil simgesine tıklayın. Buradan kullanıcı bilgilerinizi ve satın alma geçmişinizi görüntüleyebilirsiniz.
- **Kurs Satın Alma**: Bir kursu satın almak için kursun detay sayfasına gidin ve "Satın Al" butonuna tıklayın.
- **Yönetim Paneli**: Yöneticiler, kursları ve kategorileri yönetmek için yönetim paneline giriş yapmalıdır.

## Proje Yapısı

- **`src/`**: Uygulamanın kaynak kodları.
  - **`components/`**: Tüm React bileşenleri.
  - **`pages/`**: Farklı sayfa bileşenleri.
  - **`services/`**: API çağrıları ve veri işlemleri.
  - **`styles/`**: CSS ve stil dosyaları.
  - **`utils/`**: Yardımcı fonksiyonlar ve araçlar.
- **`App.js`**: Uygulamanın ana bileşeni ve yönlendirme.
- **`index.js`**: Uygulamanın giriş noktası.

## Teknolojiler

- **React.js**: Kullanıcı arayüzü oluşturma.
- **React Router**: Sayfa yönlendirmeleri.
- **Axios**: API çağrıları.
- **CSS**: Stil ve tasarım.
