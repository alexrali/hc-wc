import axios from 'axios';
import { ProductCluster } from '../models/ProductCluster'; // Assuming the model exists and is exported from this path

interface GetProductClusterAction {
  type: string;
  payload: ProductCluster[] | string; // A ProductCluster object or an error message
}

const getProductCluster = async (code: string): Promise<GetProductClusterAction> => {
    try {
        const url = `https://lxs.ngrok.app/api/v1/products/product-cluster-summary/${code}`;

        const response = await axios.get(url, {
            headers: {
                'ngrok-skip-browser-warning': 'any value'
            },
        });

        // Assuming the response data is a ProductCluster object
        return {
            type: 'GET_PRODUCT_CLUSTER_SUCCESS',
            payload: response.data
        };
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            type: 'GET_PRODUCT_CLUSTER_FAILURE',
            payload: errorMessage
        };
    }
};

export default getProductCluster;