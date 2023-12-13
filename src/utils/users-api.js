import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchUsers = async (username) => {
    try {
        const user = await axios.get(`${baseURL}/api/users/${username}`)
        return user.data.user;
    } catch (error) {
        return error
    }
}