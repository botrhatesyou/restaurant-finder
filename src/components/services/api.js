import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://restauran-find-62daeda0a3f4.herokuapp.com/api',
});

export default instance;
