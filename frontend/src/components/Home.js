import { Fragment, useEffect, useState } from "react";
import { getProducts } from "../Funtions/Productfuntions";
import Loader from "./layout/Loading";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../Funtions/userfuntions';

/// Product component
const Product = ({ product, handleBidSubmit, userId,isAuthenticated }) => {
    const [bidPrice, setBidPrice] = useState(""); // State for bid price

    const handleBidPriceChange = (e) => {
        setBidPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleBidSubmit(e, product._id, bidPrice);
        setBidPrice(""); 
    };
    const addToWatchlist = async (productId) => {
        try {
            await axios.post(`/watchlist/${productId}`);
            alert("Product added to watchlist!");
        } catch (error) {
            console.error(error);
            alert("Error adding product to watchlist");
        }
    };
    const isOwner = product.ownerId === userId;
    return (
        <div key={product._id} className="card" style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', margin: '10px', padding: '10px', height: "25%" }} >
            <div className="card-body">
            {isAuthenticated && !isOwner && (
                    <button className="btn btn-primary" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => addToWatchlist(product._id)}>
                        Add to Watchlist
                    </button>
                )}
                <div style={{ display: 'flex' }}>
                    <img src={`${product.image}`} alt={product.name} style={{ width: '300px', marginRight: '20px', borderRadius: '10%' }} />
                    <div>
                        <h5 className="card-title">{product.productname}</h5>
                        <p className="card-text">Description: {product.description}</p>
                        <p className="card-text">Starting Price: ₹ {product.startingPrice}</p>
                        <p className="card-text">Current Price: ₹ {product.currentPrice}</p>
                        <p className="card-text">Posted Date: {String(product.PostedDate).substring(0, 10)}</p>
                        <p className="card-text">Bidding End Date: {String(product.endDate).substring(0, 10)}</p>
                        <p className="card-text">Owner Name: {product.ownername}</p>
                        <p className="card-text">Category: {product.category}</p>
                        {isAuthenticated && (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="bidPrice">Place Bid:</label>
                                <input type="number" className="form-control" id="bidPrice" value={bidPrice} onChange={handleBidPriceChange} required={!isOwner} disabled={isOwner} />
                            </div>
                            {!isOwner && <button type="submit" className="btn btn-primary">Submit Bid</button>}
                            {isOwner && <p className="text-muted">You cannot bid on your own product.</p>}
                        </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Home component
export default function Home({ isAuthenticated }) {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId,setUserId]=useState(null);; // Provide the actual user ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserProfile(); 
                console.log(userData._id);
                setUserId(userData._id)
                setLoading(false);  
            } catch (error) {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleBidSubmit = async (e, productId, bidPrice) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/bidproduct/${productId}`, { bidPrice });
            console.log(response.data);
            if (response.data.success) {
                // Fetch updated products data after successful bid
                const updatedProducts = await getProducts();
                setProducts(updatedProducts);
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error placing bid"); // Show error message if bid not placed
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map(product => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                        handleBidSubmit={handleBidSubmit}
                                        userId={userId}
                                        isAuthenticated={isAuthenticated}
                                    />
                                ))
                            ) : (
                                <p>No products available</p>
                            )}
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    );
}
