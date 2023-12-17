import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const getToken = async () => {
    try {
        const token = await axios.get(`${baseURL}/api/token`, {
            withCredentials: true
        })
        if (token?.data?.accessToken) {
            return token.data.accessToken;
        }
    } catch (error) {
        return error
    }
}

export const getProfileFromToken = async (accessToken) => {
    try {
        if (accessToken) {
            const userProfile = await axios.get(`${baseURL}/api/token/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
            })
            if (userProfile) {
                return userProfile.data.user
            } else {
                console.log("unauthorized access")
            }
        }
    } catch (error) {
        return error
    }
}