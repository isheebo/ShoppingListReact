import axios from 'axios';

// Create an instance of axios with the Base URL of the API
const instance = axios.create({
    baseURL: 'https://shoppinglistapi1.herokuapp.com/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    },
});

export default instance;
