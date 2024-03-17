import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({}); // Assume user object is available, containing user details

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/getproduct/${id}`);
        console.log(response.data.data.product.image)
        setUser(response.data.data.currentUser)
        setProduct(response.data.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBid = () => {
    // Logic for handling bid action
  };

  const handleAddToWatchlist = () => {
    // Logic for handling adding to watchlist action
  };

  return (
    <div>
      <div className="card-body">
          <div style={{ display: 'flex' }}>
          <img src={`${product.image}`} alt={product.name} style={{ width: '300px', marginRight: '20px',borderRadius: '10%' }} />
          <div>
          <h5 className="card-title">{product.productname}</h5>
          <p className="card-text">Description: {product.description}</p>
          <p className="card-text">Starting Price: ₹ {product.startingPrice}</p>
          <p className="card-text">Current Price: ₹ {product.currentPrice}</p>
          <p className="card-text">Posted Date: {String(product.PostedDate).substring(0, 10)}</p>
          <p className="card-text">Bidding End Date: {String(product.endDate).substring(0, 10)}</p>
          <p className="card-text">Owner Name: {product.ownername}</p>
          <p className="card-text">Category: {product.category}</p>
          {user._id !== product.ownerId && (
              <div>
                {/* Disable bid and watchlist buttons if the current user is the owner */}
                <button onClick={handleBid} >
                  Bid
                </button>
                <button onClick={handleAddToWatchlist}>
                  Add to Watchlist
                </button>
              </div>
            )}
          </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;
