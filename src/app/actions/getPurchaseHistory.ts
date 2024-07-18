import axios from 'axios';
import { PurchaseHistory } from '../models/PurchaseHistory';

interface GetLastPurchaseAction {
    type: string;
    payload: PurchaseHistory | string; // Update the payload type according to your API response
}

const getLastPurchase = async (ean: string): Promise<GetLastPurchaseAction> => {
    console.log('getLastPurchase called with', { ean });

    try {
        const response = await axios.get(`https://lxs.ngrok.app/api/v1/products/last-purchase/${ean}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getLastPurchase response', response.data);

        return {
            type: 'GET_LAST_PURCHASE_SUCCESS',
            payload: response.data // Update the payload according to your API response
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_LAST_PURCHASE_FAILURE',
            payload: errorMessage // Update the payload according to your error handling
        };
    }
};

export default getLastPurchase;