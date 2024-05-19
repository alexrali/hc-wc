import axios from 'axios';

// Define the action type
interface GetProductListingAction {
    type: string;
    payload: any; // Update the payload type according to your API response
}

// Define the action creator function
const getProductListing = async (ean: string): Promise<GetProductListingAction> => {
    console.log('getProductListing called with', { ean });

    try {           //https://84e4-187-140-114-155.ngrok-free.app/              http://192.168.0.119:80
        const response = await axios.get(`https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/listing`, {
            params: {
                ean: ean
            },
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        console.log('getProductListing response', response.data);

        return {
            type: 'GET_PRODUCT_LISTING_SUCCESS',
            payload: response.data // Update the payload according to your API response
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PRODUCT_LISTING_FAILURE',
            payload: errorMessage // Update the payload according to your error handling
        };
    }
};

export default getProductListing;