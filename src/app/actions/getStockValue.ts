import axios from 'axios';
import { StockValue } from '../models/StockValue';

interface GetStockValueAction {
    type: string;
    payload: StockValue | string; // Update the payload type according to your API response
}

const getStockValue = async (ean: string): Promise<GetStockValueAction> => {
    console.log('getStockValue called with', { ean });

    try {
        const response = await axios.get(`https://1a55-187-140-145-74.ngrok-free.app/api/v1/products/stock-values/${ean}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getStockValue response', response.data);

        return {
            type: 'GET_STOCK_VALUE_SUCCESS',
            payload: response.data // Update the payload according to your API response
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_STOCK_VALUE_FAILURE',
            payload: errorMessage // Update the payload according to your error handling
        };
    }
};

export default getStockValue;