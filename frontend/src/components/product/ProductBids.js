import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductBids = () => {
    const { productId } = useParams();
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get(`/product/${productId}/bids`);
                setBids(response.data.bids);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bids:", error);
                setLoading(false);
            }
        };

        fetchBids();
    }, [productId]);

    return (
        <div>
            <h1>Bids for Product {productId}</h1>
            {loading ? (
                <p>Loading bids...</p>
            ) : (
                <ul>
                    {bids.map((bid) => (
                        <li key={bid._id}>
                            Bidder: {bid.bidderName}, Amount: {bid.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductBids;
