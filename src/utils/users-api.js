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

export const login = async (username, password) => {
    try {
        const success = await axios.post(`${baseURL}/api/users/login`, {username: username, password: password})
        return success.data.accessToken
    } catch (error) {
        return error
    }
}