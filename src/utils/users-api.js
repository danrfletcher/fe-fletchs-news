import axios from 'axios';
import Cookie from 'js-cookie';

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

        const env = import.meta.env.CLIENT_ENV
        Cookie.set('refreshToken', success.data.refreshToken, {
            secure: env === 'development' || env === 'test' ? false : true, 
            sameSite: env === 'development' || env === 'test' ? 'lax' : 'none', 
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
        });

        return success.data.accessToken
    } catch (error) {
        return error
    }
}

export const signOut = async (token) => {
    try {
        const success = await axios.delete(`${baseURL}/api/users/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        Cookie.set('refreshToken', null);
    } catch (error) {
        return error
    }
}