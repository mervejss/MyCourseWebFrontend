import React, { useState, useEffect } from 'react';
import './CategoriesNavBar.css';

const CategoriesNavBar = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        // Ana kategorileri çekme
        fetch('http://localhost:8080/courseCategories/mainCategories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMainCategories(data);
            })
            .catch(error => {
                console.error('Ana kategoriler yüklenemedi', error);
            });
    }, []);

    const fetchSubCategories = (parentCategoryID) => {
        if (!subCategories[parentCategoryID]) {
            // Alt kategorileri çekme
            fetch(`http://localhost:8080/courseCategories/subCategories/${parentCategoryID}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setSubCategories(prevState => ({
                        ...prevState,
                        [parentCategoryID]: data
                    }));
                })
                .catch(error => {
                    console.error('Alt kategoriler yüklenemedi', error);
                });
        }
    };

    return (
        <div className="navbar">
            <ul className="main-categories">
                {mainCategories.map(category => (
                    <li 
                        key={category.courseCategoryID}
                        onMouseEnter={() => {
                            setActiveCategory(category.courseCategoryID);
                            fetchSubCategories(category.courseCategoryID);
                        }}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        {category.courseCategoryName}
                        {activeCategory === category.courseCategoryID && subCategories[category.courseCategoryID] && (
                            <ul className="sub-categories" style={{ display: 'block' }}>
                                {subCategories[category.courseCategoryID].map(subCategory => (
                                    <li key={subCategory.courseCategoryID}>{subCategory.courseCategoryName}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesNavBar;
