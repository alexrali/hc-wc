import axios from 'axios';
import { ProviderProduct } from '../models/ProviderProducts';

// Define the action type
interface GetProviderProductsAction {
  type: string;
  payload: ProviderProduct[] | string; // Array of ProviderProduct objects or an error message
}

// Define the action creator function
const getProviderProducts = async (provider_code?: string, category_code?: string): Promise<GetProviderProductsAction> => {
    try {
        const response = await axios.get(`https://1a55-187-140-145-74.ngrok-free.app/api/v1/products/products_by_provider`, {
            params: {
                provider_code: provider_code,
                category_code: category_code
            },
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        // Assuming the response data is an array of ProviderProduct objects
        return {
            type: 'GET_PROVIDER_PRODUCTS_SUCCESS',
            payload: response.data
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PROVIDER_PRODUCTS_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProviderProducts;