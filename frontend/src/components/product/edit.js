import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const categoryOptions = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Vehicles'];

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    startingPrice: 0,
    currentPrice: 0,
    endDate: '',
    category: '',
    image:null
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/getproduct/${id}`);
        setProduct(response.data.data.product);
        setFormData({
          productname: response.data.data.product.productname ||0 , // Use default value if undefined
          description: response.data.data.product.description || '', // Use default value if undefined
          startingPrice: response.data.data.product.startingPrice || 0, // Use default value if undefined
          currentPrice: response.data.data.product.currentPrice || 0, // Use default value if undefined
          endDate: response.data.data.product.endDate || '', // Use default value if undefined
          category: response.data.data.product.category || ''
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(`/updateproduct/${id}`, formData);
      setMessage(response.data.message); // Set message
      setSuccess(true); // Set success to true
      setTimeout(() => {
        setMessage(''); // Clear message after 2 seconds
        setSuccess(false); // Reset success state
      }, 2000);

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productname">Product Name:</label>
          <input type="text" id="productname" name="productname"  className="form-control" value={formData.productname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description"  className="form-control" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="startingPrice">Starting Price:</label>
          <input type="number" id="startingPrice" name="startingPrice"  className="form-control" value={formData.startingPrice} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="currentPrice">Current Price:</label>
          <input type="number" id="currentPrice" name="currentPrice" className="form-control"  value={formData.currentPrice} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate"  className="form-control" value={formData.endDate} onChange={handleChange} />
        </div>
        <div>
        <label htmlFor="category">Category:</label>
          <select id="category" name="category" style={{ height: 'auto' }} className="form-control" value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            {categoryOptions.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
      {message && (
        <div className={`alert alert-${success ? 'success' : 'danger'} mt-3`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default EditProduct;
