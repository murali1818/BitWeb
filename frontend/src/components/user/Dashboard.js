import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch user's products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/getproduct');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {products && products.map((product) => (
          <li key={product._id}>{product.productname}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
