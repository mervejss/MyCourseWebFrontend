import { faReceipt, faCheck, faBox, faClock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Tarih formatlama fonksiyonu
export const formatDateTime = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const statusIcons = [
  { id: 0, icon: faReceipt, label: 'Sipariş Alındı' },
  { id: 1, icon: faCheck, label: 'Sipariş Onaylandı' },
  { id: 2, icon: faBox, label: 'Sipariş Hazırlanıyor' },
  { id: 3, icon: faClock, label: 'Sipariş Bekleniyor' },
  { id: 4, icon: faCheckCircle, label: 'Sipariş Tamamlandı' },
  { id: 5, icon: faTimesCircle, label: 'Sipariş İptal Edildi' }
];

export const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Sipariş Alındı';
    case 1:
      return 'Sipariş Onaylandı';
    case 2:
      return 'Sipariş Hazırlanıyor';
    case 3:
      return 'Sipariş Bekleniyor';
    case 4:
      return 'Sipariş Tamamlandı';
    case 5:
      return 'Sipariş İptal Edildi';      
    default:
      return 'Bilinmiyor';
  }
};

export const getPaymentMethodText = (paymentMethod) => {
  switch (paymentMethod) {
    case 0:
      return 'Credit Card (Kredi Kartı)';
    case 1:
      return 'Debit Card (Banka Kartı)';
    case 2:
      return 'Bank Transfer (Banka Havalesi)';
    case 3:
      return 'PayPal (PayPal)';
    case 4:
      return 'Cryptocurrency (Kripto Para)';
    case 5:
      return 'Mobile Payment (Mobil Ödeme)';
    case 6:
      return 'Cash on Delivery (Kapıda Ödeme)';
    case 7:
      return 'E-Wallet (E-Cüzdan)';
    case 8:
      return 'Prepaid Card (Ön Ödemeli Kart)';
    case 9:
      return 'Check (Çek)';
    case 10:
      return 'Gift Card (Hediye Kartı)';
    default:
      return 'Unknown (Bilinmiyor)';
  }
};

