import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyCourses.css';
import Cookies from 'js-cookie';

// Tarih formatlama fonksiyonu
const formatDateTime = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MyCourses = () => {
 

  return (
    <h3>BENİM KURSLARIM</h3>

   
  );
};

export default MyCourses;
