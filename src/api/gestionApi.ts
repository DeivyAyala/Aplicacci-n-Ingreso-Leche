import axios from 'axios'

const gestionApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
})


//TODO Interceptores
gestionApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) {
       config.headers["x-token"] = token; 
    }
    return config;
})

export { gestionApi}