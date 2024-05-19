import axios from 'axios';

// Define the action type
interface GetProductKardexAction {
    type: string;
    payload: any; // Update the payload type according to your API response
}

// Define the action creator function
const getProductKardex = async (ean: string, startDate: string, endDate: string): Promise<GetProductKardexAction> => {
    console.log('getProductKardex called with', { ean, startDate, endDate });

    try {
        const response = await axios.get(`http://192.168.0.119:80/api/v1/products/${ean}/kardex`, {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        });

        console.log('getProductKardex response', response.data);

        return {
            type: 'GET_PRODUCT_KARDEX_SUCCESS',
            payload: response.data // Update the payload according to your API response
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PRODUCT_KARDEX_FAILURE',
            payload: errorMessage // Update the payload according to your error handling
        };
    }
};

export default getProductKardex;