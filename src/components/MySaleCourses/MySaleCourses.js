import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MySaleCourses.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faCheck, faBox, faClock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Tarih formatlama fonksiyonu
const formatDateTime = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const statusIcons = [
  { id: 0, icon: faReceipt, label: 'Sipariş Alındı' },
  { id: 1, icon: faCheck, label: 'Sipariş Onaylandı' },
  { id: 2, icon: faBox, label: 'Sipariş Hazırlanıyor' },
  { id: 3, icon: faClock, label: 'Sipariş Bekleniyor' },
  { id: 4, icon: faCheckCircle, label: 'Sipariş Tamamlandı' },
];

const getStatusText = (status) => {
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

const getPaymentMethodText = (paymentMethod) => {
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

const MySaleCourses = () => {
  const [sales, setSales] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userID = Cookies.get('userID');
  const userRoleType = Cookies.get('userRoleType');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transactions/user?userID=${userID}`);
        const allSales = response.data.filter(sale => sale.transactionType === 0);

        const filteredSales = [];
        for (const sale of allSales) {
          const courseOwnerResponse = await axios.get(`http://localhost:8080/courses/user/${sale.courseID}`);
          const courseOwnerID = courseOwnerResponse.data;
          
          if (courseOwnerID === parseInt(userID)) {
            filteredSales.push(sale);
          }
        }

        setSales(filteredSales);
      } catch (error) {
        console.error('Satış verileri alınırken hata oluştu:', error);
      }
    };

    fetchSales();
  }, [userID]);
  const handleStatusClick = async (transactionID, newStatus) => {
    console.log(`Updating transaction ${transactionID} to status ${newStatus}`); // Debugging
    try {
      await axios.patch(`http://localhost:8080/transactions/${transactionID}/status`, null, {
        params: { status: newStatus }
      });
      // Fetch the updated transactions
      const response = await axios.get(`http://localhost:8080/transactions/user`, {
        params: { userID }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error updating transaction status", error);
    }
  };
 const handleCancelOrder = async (transactionID) => {
    try {
      await axios.delete(`http://localhost:8080/transactions/${transactionID}`);
      
      // İptal işleminden sonra satış verilerini güncelle
      const response = await axios.get(`http://localhost:8080/transactions/user`, {
        params: { userID }
      });
      
      // Yeniden satışları filtreleyerek setSales'i güncelle
      const updatedSales = response.data.filter(sale => sale.transactionType === 0 && sale.userID === parseInt(userID));
      setSales(updatedSales);
    } catch (error) {
      console.error("Error canceling order", error);
    }
  };

  const renderStatusIcons = (transactionID, currentStatus) => {
    return (
      <>
        {statusIcons.map((status, index) => (
          <button
            key={status.id}
            className={`status-icon ${index <= currentStatus ? 'active' : ''}`}
            title={status.label}
            onClick={() => handleStatusClick(transactionID, status.id)}
          >
            <FontAwesomeIcon icon={status.icon} />
          </button>
        ))}
        <button
          className="status-icon"
          title="Siparişi İptal Et"
          onClick={() => handleCancelOrder(transactionID)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </>
    );
  };

  return (
    <div className="head">
      <h1><strong>Satışlarım</strong></h1>
      <div className="my-sales">
        {sales.length > 0 ? (
          sales.map(sale => (
            <div key={sale.purchaseOrSaleID} className="sale-card">
              <h3><strong>Sipariş ID: {sale.purchaseOrSaleID}</strong></h3>
              <h3><strong>Satın Alan Kullanıcı ID: {sale.userID}</strong></h3>
              <h3><strong>Kurs ID: {sale.courseID}</strong></h3>
              <p>Sipariş Durumu: {getStatusText(sale.status)}</p>
              {renderStatusIcons(sale.purchaseOrSaleID, sale.status)}
              <p>Ödeme Türü: {getPaymentMethodText(sale.paymentMethod)}</p>
              <p>Sipariş Oluşturulma Tarihi: {formatDateTime(sale.createdAt)}</p>
              {sale.updatedAt && <p>Sipariş Son Güncellenme Tarihi: {formatDateTime(sale.updatedAt)}</p>}
            </div>
          ))
        ) : (
          <p>Satışta olan kurs bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default MySaleCourses;