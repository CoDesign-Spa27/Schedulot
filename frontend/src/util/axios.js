import axiosInstance from 'axios';

export const axios = axiosInstance.create({
    baseURL: 'http://localhost:8000/api',
    });