import React, { useState } from 'react';
import axios from 'axios';

const allowedCategories = ['select catogery','Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books','vehicles'];

const AddProduct = () => {
    const [productname, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const today = new Date();
            const selectedEndDate = new Date(endDate);
            if (selectedEndDate <= today) {
                setMessage('End date must be greater than today');
                return;
            }
            if (startingPrice <= 0) {
                setMessage('Starting price must be greater than zero');
                return;
            }
            await axios.post('/addproduct', {productname,description,startingPrice,endDate,category,image});
            setMessage('Product added successfully!');
            setSuccess(true);
            setProductName('');
            setDescription('');
            setStartingPrice('');
            setEndDate('');
            setCategory('');
            setImage('');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productname}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Starting Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ height: 'auto' }} 
                        required
                    >
                        {allowedCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Images:</label>
                    <input
                        type="file"
                        className="form-control"
                        value={image}
                        accept="image/*"
                        capture="camera"
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
                {message && (
                 <div className={`alert alert-${success ? 'success' : 'danger'} mt-3`} role="alert">
                {message}
          </div>
        )}
            </form>
        </div>
    );
};

export default AddProduct;
