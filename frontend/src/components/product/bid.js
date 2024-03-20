import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBids = () => {
    const [myBids, setMyBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyBids = async () => {
            try {
                const response = await axios.get('/mybids');
                setMyBids(response.data.myBids);
                setLoading(false);
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }
        };

        fetchMyBids();
    }, []);

    const handleDeleteBid = async (productId) => {
        try {
            await axios.delete(`/mybids/${productId}`);
            setMyBids(myBids.filter(bid => bid.productId !== productId));
            alert('Bid deleted successfully');
        } catch (error) {
            console.error(error);
            alert('Error deleting bid');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>My Bids</h1>
            {myBids.length === 0 ? (
                <p>No bids found for this user</p>
            ) : (
                <ul>
                    {myBids.map((bid, index) => (
                        <li key={index}>
                            <p>Product Name: {bid.productId.productname}</p>
                            <p>Bidding Price: {bid.bidPrice}</p>
                            <button onClick={() => handleDeleteBid(bid.productId._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBids;
