import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layout/Loading";
import { useNavigate } from "react-router-dom";

export default function MyProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();// Define loading state and set it to true initially

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/myproduct');
                const userProducts = response.data;
                console.log(userProducts);
                setProducts(userProducts);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleEdit = async (productId) => {
        navigate(`/editproduct/${productId}`);
        // Implement edit functionality
    };

    const handleDelete = async (productId, productName) => {
        try {
            const response = await axios.delete(`/deleteproduct/${productId}`);
            console.log(response.data.message);
            // Display alert with product name upon successful deletion
            alert(`Product "${productName}" deleted successfully`);
            // After deletion, update product list
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div>
                        <h1>My Products</h1>
                        <div id="products" className="container mt-5">
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map(product => (
                                    <div key={product._id} className="card" style={{ borderRadius: '10px',backgroundColor: '#f0f0f0', margin: '10px', padding: '20px' }}>
                                        <div className="card-body">
                                            <div style={{ display: 'flex' }}>
                                                <img src={`${product.image}`} alt={product.name} style={{ width: '300px', marginRight: '20px', borderRadius: '5%' }} />
                                                <div>
                                                    <h5 className="card-title">{product.productname}</h5>
                                                    <p className="card-text">Description: {product.description}</p>
                                                    <p className="card-text">Starting Price: {product.startingPrice}</p>
                                                    <p className="card-text">Current Price: {product.currentPrice}</p>
                                                    <p className="card-text">End Date: {String(product.endDate).substring(0, 10)}</p>
                                                    <p className="card-text">Category: {product.category}</p>
                                                    <p className="card-text">Highest Bidder: {product.highestBid.username}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <button className="btn btn-block py-3" style={{ width: '100px', marginRight: '20px', borderRadius: '8%', background: '' }} onClick={() => handleEdit(product._id)}>Edit</button>
                                                        <button className="btn btn-block py-3" style={{ width: '100px', marginRight: '20px', borderRadius: '8%' }} onClick={() => handleDelete(product._id, product.productname)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products available</p>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
