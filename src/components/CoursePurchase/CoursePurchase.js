import React, { useState, useEffect } from 'react';
import './CoursePurchase.css';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { addLogEntry } from '../Log/LogUtils';

const CoursePurchase = () => {
  const { courseID } = useParams(); // Kurs ID'sini URL'den al
  const navigate = useNavigate();
  const userID = Cookies.get('userID');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [courseOwnerID, setCourseOwnerID] = useState(null);

  const paymentMethods = [
    { id: 0, label: 'Credit Card (Kredi Kartı)' },
    { id: 1, label: 'Debit Card (Banka Kartı)' },
    { id: 2, label: 'Bank Transfer (Banka Havalesi)' },
    { id: 3, label: 'PayPal (PayPal)' },
    { id: 4, label: 'Cryptocurrency (Kripto Para)' },
    { id: 5, label: 'Mobile Payment (Mobil Ödeme)' },
    { id: 6, label: 'Cash on Delivery (Kapıda Ödeme)' },
    { id: 7, label: 'E-Wallet (E-Cüzdan)' },
    { id: 8, label: 'Prepaid Card (Ön Ödemeli Kart)' },
    { id: 9, label: 'Check (Çek)' },
    { id: 10, label: 'Gift Card (Hediye Kartı)' }
  ];

  useEffect(() => {
    const fetchCourseOwnerID = async () => {
      try {
        const response = await fetch(`http://localhost:8080/courses/user/${courseID}`);
        const data = await response.json();
        setCourseOwnerID(data); // Kurs sahibinin userID'sini ayarla
      } catch (error) {
        console.error('Kurs sahibinin userID\'si alınırken hata oluştu:', error);
      }
    };

    fetchCourseOwnerID();
  }, [courseID]);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (selectedPaymentMethod === null) {
      alert('Lütfen bir ödeme yöntemi seçin.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: parseInt(userID),
          courseID: parseInt(courseID),
          transactionType: 0, // PURCHASE
          status: 0, // PENDING
          paymentMethod: selectedPaymentMethod
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sipariş oluşturuldu:', data);
        addLogEntry(userID, 2); // PURCHASE

        // courseOwnerID değişkenini kontrol edip, log kaydı ekliyoruz
        if (courseOwnerID) {
          addLogEntry(courseOwnerID, 3); // SALE
        } else {
          console.error('Kurs sahibi ID alınamadı.');
        }

        navigate('/courses'); 
      } else {
        console.error('Sipariş oluşturulamadı');
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <div className="purchase-container">
      <h2>Kurs Satın Alma Yöntemini Seç</h2>
      <form onSubmit={handleSubmit}>
        {paymentMethods.map(method => (
          <div key={method.id} className="payment-method">
            <input
              type="radio"
              id={`payment-${method.id}`}
              name="paymentMethod"
              value={method.id}
              checked={selectedPaymentMethod === method.id}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor={`payment-${method.id}`}>{method.label}</label>
          </div>
        ))}
        <button type="submit" className="confirm-button">Ödemeyi Onayla</button>
      </form>
    </div>
  );
};

export default CoursePurchase;
