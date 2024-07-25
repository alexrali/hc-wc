import axios from 'axios';
import { BusinessUnitSummary } from '../models/BusinessUnitSummary';

interface GetBusinessUnitSummariesAction {
    type: string;
    payload: BusinessUnitSummary[] | string; // Assuming the API returns an array of BusinessUnitSummary or an error message
}

const getBusinessUnitSummaries = async (ean: string): Promise<GetBusinessUnitSummariesAction> => {
    console.log('getBusinessUnitSummaries called with', { ean });

    try {
        const response = await axios.get(`https://lxs.ngrok.app/api/v1/products/business-unit-summaries/${ean}`, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getBusinessUnitSummaries response', response.data);

        return {
            type: 'GET_BUSINESS_UNIT_SUMMARIES_SUCCESS',
            payload: response.data // Assuming the API returns an array of BusinessUnitSummary
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_BUSINESS_UNIT_SUMMARIES_FAILURE',
            payload: errorMessage // Error handling
        };
    }
};

export default getBusinessUnitSummaries;