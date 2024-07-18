import axios from 'axios';

// Define the action type
interface GetProductSummaryAction {
    type: string;
    payload: any; // Update the payload type according to your API response
}

// Define the action creator function
const getProductSummary = async (ean: string, startDate: string, endDate: string): Promise<GetProductSummaryAction> => {
    console.log('getProductSummary called with', { ean, startDate, endDate });

    try {
        const response = await axios.get(`https://lxs.ngrok.app/api/v1/products/${ean}/summary`, {
            params: {
                start_date: startDate,
                end_date: endDate
            }, 
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getProductSummary response', response.data);

        return {
            type: 'GET_PRODUCT_SUMMARY_SUCCESS',
            payload: response.data // Update the payload according to your API response
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PRODUCT_SUMMARY_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProductSummary;