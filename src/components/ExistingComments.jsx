import { fetchComments } from "../utils/comments-api"
import { useEffect, useState } from "react"
import { useFocusedArticle } from '../contexts/FocusedArticle';

export const ExistingComments = () => {
    const {article} = useFocusedArticle();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchComments(article.article_id);
                setComments(data);
            } catch {
                console.log("Error fetching existing comments for this article", error);
            }
        }
    },[]);

    console.log(comments);
    return (
        <p>Comments will go here</p>
    )
}