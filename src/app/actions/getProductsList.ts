import axios from "axios";

// Define the action type
interface GetProductListingAction {
    type: string;
    payload: any; // The payload is an array of products
}

// Add the 'ean' parameter to the function
const getProductList = async (ean: string): Promise<GetProductListingAction> => {
    try {
        // Include the 'ean' in the URL
        const response = await axios.get(`http://192.168.0.119:80/api/v1/products/products/${ean}`);

        console.log('getProductListing response', response.data);

        return {
            type: 'GET_PRODUCT_LISTING_SUCCESS',
            payload: response.data // The payload is the list of products
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

export default getProductList;