import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchArticles = async (topic, order) => {
    try {
        let requestUrl = `${baseURL}/api/articles`
        let topicQuery;
        let orderQuery;
        
        if (order) {
            if (order === "Oldest first") order = "asc"
            else if (order === "Newest first") order = "desc"
            orderQuery = `order=${order}`;
        }
        
        if (topic && topic.toLowerCase() !== 'topic') topicQuery = `topic=${topic.toLowerCase()}`;

        if (orderQuery || topicQuery) {
            requestUrl += `?`;
            if (orderQuery && topicQuery) requestUrl += `${orderQuery}&${topicQuery}`
            else {
                if (orderQuery) requestUrl += orderQuery;
                if (topicQuery) requestUrl += topicQuery;
            }
        }

        const articles = await axios.get(requestUrl);
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