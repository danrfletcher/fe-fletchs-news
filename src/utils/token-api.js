import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const getToken = async () => {
    try {
        const token = await axios.post(`${baseURL}/api/token`, {
            withCredentials: true
        })
        console.log("⚡ ~ token:", token)
    } catch (error) {
        return error
    }
}

export const getProfileFromToken = () => {

}