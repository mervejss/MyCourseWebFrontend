import React, { useEffect, useState } from 'react';
import './Log.css';
import Cookies from 'js-cookie';

function Log() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Kullanıcının kimliğini almak için bir şekilde userID'yi elde etmelisiniz
    const userID = Cookies.get('userID');
    if (userID) {
      fetch(`http://localhost:8080/logs/user/${userID}`) // Kullanıcıya özel logları çekmek
        .then(response => response.json())
        .then(data => setLogs(data))
        .catch(error => console.error('Error fetching logs:', error));
    }
  }, []);

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getLogActionText = (logAction) => {
    switch (logAction) {
      case 0:
        return 'Giriş';
      case 1:
        return 'Çıkış';
      case 2:
        return 'Satın Alma';
      case 3:
        return 'Satış Yapma';
      case 4:
        return 'Kurs İlerlemesi';
      case 5:
        return 'Otomatik Giriş';
      default:
        return 'Bilinmeyen';
    }
  };

  return (
    <div className="log-container">
      <h2>Log Kayıtları</h2>
      <table className="log-table">
        <thead>
          <tr>
            <th>Log Sayısı</th>
            <th>Log ID</th>
            <th>Yapılan İşlem Türü</th>
            <th>Yapılan İşlem Tarih Saati</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log.logID}>
              <td>{index + 1}</td>
              <td>{log.logID}</td>
              <td>{getLogActionText(log.logAction)}</td>
              <td>{formatDateTime(log.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Log;
