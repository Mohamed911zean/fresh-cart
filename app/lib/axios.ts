import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: 'https://ecommerce.routemisr.com/api/v1',
    timeout: 30000, 
});


apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('freshCartToken') || Cookies.get('freshCartToken');

        if (token) {
            config.headers.token = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || error.message;

            switch (status) {
                case 401:

                    console.error('Unauthorized - clearing auth data');
                    localStorage.removeItem('freshCartToken');
                    localStorage.removeItem('freshCartUser');
                    Cookies.remove('freshCartToken');
                    toast.error('Session expired. Please login again.');


                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    break;

                case 500:

                    console.error('Server error:', message);


                    if (error.config?.url?.includes('/cart') || error.config?.url?.includes('/wishlist')) {

                        console.log('Cart/Wishlist error - token might be invalid');
                    } else {
                        toast.error('Server error. Please try again later.');
                    }
                    break;

                case 404:

                    if (error.config?.url?.includes('/cart') || error.config?.url?.includes('/wishlist')) {

                        console.log('Cart/Wishlist not found - empty');
                    } else {
                        toast.error('Resource not found');
                    }
                    break;

                case 400:

                    toast.error(message || 'Invalid request');
                    break;

                default:

                    console.error('API Error:', message);
                    toast.error(message || 'Something went wrong');
            }
        } else if (error.code === 'ECONNABORTED') {
    
            toast.error('Request timeout. Please check your connection.');
        } else if (error.message === 'Network Error') {

            toast.error('Network error. Please check your connection.');
        } else {

            toast.error('An unexpected error occurred');
        }

        return Promise.reject(error);
    }
);

export default apiClient;