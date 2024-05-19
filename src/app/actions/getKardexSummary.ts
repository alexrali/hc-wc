import axios from 'axios';

// Define the action type
interface GetKardexSummaryAction {
    type: string;
    payload: any; // Update the payload type according to your API response
}

// Define the action creator function
const getKardexSummary = async (ean: string, startDate: string, endDate: string): Promise<GetKardexSummaryAction> => {
    console.log('getKardexSummary called with', { ean, startDate, endDate });

    try {
        const response = await axios.get(`https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/${ean}/kardex_summary`, {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        });

        console.log('getKardexSummary response', response.data);

        return {
            type: 'GET_KARDEX_SUMMARY_SUCCESS',
            payload: response.data // Update the payload according to your API response
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_KARDEX_SUMMARY_FAILURE',
            payload: errorMessage // Update the payload according to your error handling
        };
    }
};

export default getKardexSummary;