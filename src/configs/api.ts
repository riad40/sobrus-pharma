import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = `https://mail-sender-satd.onrender.com`

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
