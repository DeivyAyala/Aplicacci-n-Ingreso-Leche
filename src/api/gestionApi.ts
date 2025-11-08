import axios from 'axios'

const gestionApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
})


//TODO Interceptores

export { gestionApi}