import { ProductDrain } from '../models/ProductDrain';
import axios from 'axios';

// Update the action type to accept an array of ProductDrain
interface GetProductDrainAction {
    type: string;
    payload: ProductDrain[] | string; // Payload can be either an array of ProductDrain or a string
}

const getProductDrain = async (ean: string): Promise<GetProductDrainAction> => {
    console.log('getProductDrain called with', { ean });

    try {
        const response = await axios.get(`https://lxs.ngrok.app/api/v1/products/drain/${ean}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getProductDrain response', response.data);

        // Ensure the payload is an array of ProductDrain
        return {
            type: 'GET_PRODUCT_DRAIN_SUCCESS',
            payload: Array.isArray(response.data) ? response.data : [response.data] // Ensure payload is always an array
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PRODUCT_DRAIN_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProductDrain;