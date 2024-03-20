import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get('/watchlist');
                setWatchlist(response.data.watchlist.products);
                setLoading(false);
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, []);

    const handleRemoveFromWatchlist = async (productId) => {
        try {
            await axios.delete(`/watchlist/${productId}`);
            setWatchlist(watchlist.filter(product => product._id !== productId));
            alert('Product removed from watchlist successfully');
        } catch (error) {
            console.error(error);
            alert('Error removing product from watchlist');
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
            <h1>My Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty</p>
            ) : (
                <ul>
                    {watchlist.map((product, index) => (
                        <li key={index}>
                            <p>Product Name: {product.productname}</p>
                            <button onClick={() => handleRemoveFromWatchlist(product._id)}>Remove from Watchlist</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Watchlist;
