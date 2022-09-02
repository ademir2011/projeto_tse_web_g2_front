import axios from 'axios'

export const api = axios.create({
    // baseURL: "http://localhost:8080/api/",
    baseURL: import.meta.env.VITE_API_URL
    // headers: { accept: '*/*' }
})

