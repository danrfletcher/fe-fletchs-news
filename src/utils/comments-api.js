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

export const postComment = async (articleId, comment, username, token) => {
    try {
        console.log("HERE")
        console.log(`${baseURL}/api/articles/${articleId}/comments`)
        const postComment = await axios.post(`${baseURL}/api/articles/${articleId}/comments`, {
            body: comment,
            author: username
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        return postComment;
    } catch (error) {
        return error
    }
}