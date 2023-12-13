import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchComments = async (articleId) => {
    try {
        const comments = await axios.get(`${baseURL}/api/articles/${articleId}/comments`)
        return comments.data.comments;
    } catch (error) {
        return error
    }
}