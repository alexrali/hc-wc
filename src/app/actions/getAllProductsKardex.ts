import axios from 'axios';
// import fs from 'fs';
import path from 'path';


// Define the action type
interface GetProductKardexAction {
    type: string;
    payload: any; // Update the payload type according to your API response
}
// Update the function parameters

const getAllProductsKardex = async (startDate: string, endDate: string): Promise<GetProductKardexAction> => {
    console.log('getAllProductKardex called with', { startDate, endDate });

    const fs = require('fs');

    try {
        // Update the URL and the parameters
        const response = await axios.get(`https://84e4-187-140-114-155.ngrok-free.app/api/v1/products/all_products_kardex`, {
            params: {
                start_date: startDate,
                end_date: endDate
            },
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
            responseType: 'arraybuffer' // Set responseType to 'arraybuffer' or 'blob'
        })
            .catch(error => {
                console.error('Error in API call:', error);
                throw error;
            });

        console.log('getAllProductKardex response received');

        // Save the zip file
        const zipPath = path.resolve(__dirname, 'response.zip');
        fs.writeFileSync(zipPath, Buffer.from(response.data, 'binary'));

        console.log('getAllProductKardex response', response.data);

        return {
            type: 'GET_PRODUCT_LISTING_SUCCESS',
            payload: zipPath // Return the path to the zip file
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
export default getAllProductsKardex;