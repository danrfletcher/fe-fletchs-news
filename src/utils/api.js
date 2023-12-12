import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchArticles = async () => {
    try {
        const articles = await axios.get(`${baseURL}/api/articles`);
        return articles.data.articles;
    } catch (error) {
        return error
    }
}

export const fetchArticle = async (articleId) => {
    try {
        const article = await axios.get(`${baseURL}/api/articles/${articleId}`)
        return article.data.article;
    } catch (error) {
        return error
    }
}