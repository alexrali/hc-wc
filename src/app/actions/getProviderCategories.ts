import axios from 'axios';
import { ProviderCategory } from '../models/ProviderCategory'; // Assuming the model exists and is exported from this path

interface GetProviderCategoriesAction {
  type: string;
  payload: ProviderCategory[] | string; // Array of ProviderCategory objects or an error message
}

const getProviderCategories = async (code?: string): Promise<GetProviderCategoriesAction> => {
    try {
        let url = 'https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/provider-categories';
        if (code) {
            url += `/${code}`;
        }

        const response = await axios.get(url, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        // Assuming the response data is an array of ProviderCategory objects
        return {
            type: 'GET_PROVIDER_CATEGORIES_SUCCESS',
            payload: response.data
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PROVIDER_CATEGORIES_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProviderCategories;