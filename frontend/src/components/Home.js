import { Fragment, useEffect, useState } from "react";
import { getProducts } from "../Funtions/Productfuntions";
import Loader from "./layout/Loading";
import axios from "axios";
import { useParams } from 'react-router-dom';
export default function Home() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bidPrice, setBidPrice] = useState("");

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

    const handleBidSubmit = async (e, productId) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/bidproduct/${productId}`,{bidPrice});
            console.log(response.data)
            if (response.data.success) {
                setBidPrice(""); // Reset bid price input field
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
                                    <div key={product._id} className="card" style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', margin: '10px', padding: '10px', cursor: 'pointer',height:"25%" }} >
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
                                            <form onSubmit={(e) => handleBidSubmit(e, product._id)}>
                                                        <div className="form-group">
                                                            <label htmlFor="bidPrice">Place Bid:</label>
                                                            <input type="number" className="form-control" id="bidPrice" value={bidPrice} onChange={(e) => setBidPrice(e.target.value)} required />
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Submit Bid</button>
                                                    </form>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
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
