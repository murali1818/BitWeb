import axios from 'axios';

export const getProducts = async (keyword, category) => {
    try {
        let link = '/getproduct';
        if (keyword) {
            link += `/getproduct/?keyword=${keyword}`;
        }
        if (category) {
            link += `/getproduct/&category=${category}`;
        }
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};
