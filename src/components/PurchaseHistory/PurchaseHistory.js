import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PurchaseHistory.css';
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

const PurchaseHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = Cookies.get('userID');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transactions/user`, {
          params: { userID }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [userID]);

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
      // Fetch the updated transactions
      const response = await axios.get(`http://localhost:8080/transactions/user`, {
        params: { userID }
      });
      setTransactions(response.data);
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="head">
      <h1> <strong> Siparişlerim</strong></h1>
    <div className="my-orders">
      {transactions.map((transaction) => (
        <div className="transaction-card" key={transaction.purchaseOrSaleID}>
            <h3>Sipariş ID : {transaction.purchaseOrSaleID}</h3>
            <h3>Kullanıcı ID : {userID}</h3>
            <h3>Kurs ID : {transaction.courseID}</h3>
            <p>Sipariş Durumu: {getStatusText(transaction.status)}</p>
            {renderStatusIcons(transaction.purchaseOrSaleID, transaction.status)}
            <p>Ödeme Türü: {getPaymentMethodText(transaction.paymentMethod)}</p>
            <p>Sipariş Oluşturulma Tarihi: {formatDateTime(transaction.createdAt)}</p>
            {transaction.updatedAt && <p>Sipariş Son Güncellenme Tarihi: {formatDateTime(transaction.updatedAt)}</p>}
        </div>
      ))}
    </div>
    </div>
  );
};

export default PurchaseHistory;