import axios from "axios";
import {IAuthResponse} from "../models/response/IAuthResponse";

export const API_URL = import.meta.env.VITE_SERVER_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`);
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (ex) {
            console.log(ex);
        }
    }

    throw error;
});

export default $api;