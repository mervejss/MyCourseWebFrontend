import React, { useState } from 'react';
import './SortMenu.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDollarSign, faClock, faCalendar, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const SortMenu = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSortChange = (value) => {
    onSortChange(value); // Pass the selected value to the parent component
    setIsOpen(false); // Close the dropdown
  };

  const options = [
    { value: 'highestScore', label: 'En Yüksek Puan', icon: [faStar, faArrowUp] },
    { value: 'lowestScore', label: 'En Düşük Puan', icon: [faStar, faArrowDown] },
    { value: 'highestPrice', label: 'En Yüksek Fiyat', icon: [faDollarSign, faArrowUp] },
    { value: 'lowestPrice', label: 'En Düşük Fiyat', icon: [faDollarSign, faArrowDown] },
    { value: 'highestTime', label: 'En Uzun Süre', icon: [faClock, faArrowUp] },
    { value: 'lowestTime', label: 'En Kısa Süre', icon: [faClock, faArrowDown] },
    { value: 'newest', label: 'Yeni', icon: faCalendar },
    { value: 'oldest', label: 'Eski', icon: faCalendar }
  ];

  return (
    <div className="sort-menu">
      <div className="sort-select" onClick={toggleDropdown}>
        Sıralama Seçin
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          {options.map(option => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSortChange(option.value)}
            >
              {Array.isArray(option.icon) ? (
                <>
                  {option.icon.map((icon, index) => (
                    <FontAwesomeIcon key={index} icon={icon} className="icon" />
                  ))}
                </>
              ) : (
                option.icon && <FontAwesomeIcon icon={option.icon} className="icon" />
              )}
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
