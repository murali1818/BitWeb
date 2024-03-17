import { Fragment, useEffect, useState } from "react";
import { getProducts } from "../Funtions/Productfuntions";
import Loader from "./layout/Loading";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
    }, []);

    const goToProductPage = (productId) => {
        console.log(`Navigating to product page with id: ${productId}`);
        navigate(`/productdetails/${productId}`);
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
                                    <div key={product._id} className="card" style={{ borderRadius: '10px', backgroundColor: '#f0f0f0', margin: '10px', padding: '10px', cursor: 'pointer' }} onClick={() => goToProductPage(product._id)}>
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
