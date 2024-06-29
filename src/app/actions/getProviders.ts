// src/app/actions/getProviders.ts
import axios from 'axios';
import { Provider } from '../models/Providers';

interface GetProvidersAction {
    type: string;
    payload: Provider[] | string; // Array of Provider objects or an error message
}

const getProviders = async (): Promise<GetProvidersAction> => {
    try {
        const response = await axios.get('https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/providers', {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        //console.log('getProviders response', response.data);

        return {
            type: 'GET_PROVIDERS_SUCCESS',
            payload: response.data // Assuming the response data is an array of Provider objects
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PROVIDERS_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProviders;