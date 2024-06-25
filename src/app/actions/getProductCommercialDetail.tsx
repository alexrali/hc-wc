import axios from 'axios';
import { ProductCommercialDetail } from '../models/ProductCommercialDetail'; // Assuming the interface is exported from this file

interface GetProductDetailAction {
    type: string;
    payload: ProductCommercialDetail | string; // Update the payload type according to your API response
}

const getProductDetail = async (ean: string): Promise<GetProductDetailAction> => {
    console.log('getProductDetail called with', { ean });

    try {
        const response = await axios.get(`https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/product-detail/${ean}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getProductDetail response', response.data);

        // Check if the response data is an array and has at least one element
        if (Array.isArray(response.data) && response.data.length > 0) {
            return {
                type: 'GET_PRODUCT_DETAIL_SUCCESS',
                payload: response.data[0] // Return the first object from the array
            };
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PRODUCT_DETAIL_FAILURE',
            payload: errorMessage // Update the payload according to your error handling
        };
    }
};

export default getProductDetail;