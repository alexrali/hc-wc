// src/app/actions/getProviders.ts
import axios from 'axios';
import { Provider } from '../models/Providers';

interface GetProvidersAction {
    type: string;
    payload: Provider[] | string; // Array of Provider objects or an error message
}

const getProviders = async (): Promise<GetProvidersAction> => {
    try {
        const axiosConfig = {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
            timeout: 5000, // Timeout after 5000 milliseconds (5 seconds)
        };

        const response = await axios.get('https://1a55-187-140-145-74.ngrok-free.app/api/v1/products/providers', axiosConfig);

        //console.log('getProviders response', response.data);

        return {
            type: 'GET_PROVIDERS_SUCCESS',
            payload: response.data // Assuming the response data is an array of Provider objects
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (axios.isAxiosError(error)) {
            // Check if the error is an AxiosError
            errorMessage = error.message;
            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Request timed out';
            }
        } else if (error instanceof Error) {
            // Handle non-Axios errors
            errorMessage = error.message;
        }
        return {
            type: 'GET_PROVIDERS_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProviders;