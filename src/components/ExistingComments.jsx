import { fetchComments } from "../utils/comments-api"
import { useEffect, useState } from "react"
import { useFocusedArticle } from '../contexts/FocusedArticle';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const StyledSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    margin: 30px 0px;
    z-index: 1;
    color: lightgrey;
    `

export const ExistingComments = () => {
    const {article} = useFocusedArticle();
    const [comments, setComments] = useState([]);
    /*
    useEffect(() => {
        if (article.article_id) {
            const fetchData = async () => {
                try {
                    const data = await fetchComments(article.article_id);
                    setComments(data);
                } catch {
                    console.log("Error fetching existing comments for this article", error);
                }
            }
            fetchData();
        }
    },[article]);
    */

    const transformCommentPostTime = (createdAt) => {
        const differenceInDays = Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24))

        if ((differenceInDays / 365) > 1) {
            return `${Math.floor(differenceInDays / 365)} years ago`
        } else if (((differenceInDays / 31) > 1)) {
            return `${Math.floor(differenceInDays / 31)} months ago`
        } else if (((differenceInDays / 7) > 1)) {
            return `${Math.floor(differenceInDays / 7)} weeks ago`
        } else if (differenceInDays > 1) {
            return `${differenceInDays} days ago`
        } else {
            return "today"
        }
    }

    return (
        <>
            {comments.length > 0 ? (
                <ul>
                {comments.map((comment, index) => {
                    return (
                        <li key={`${comment.author}-${index}`}>
                            <p>@{comment.author}</p>
                            <p>{transformCommentPostTime(comment.created_at)}</p>
                            <p>{comment.body}</p>
                            <p>{comment.votes}</p>
                        </li>
                    )
                })}
            </ul>
            ) : (
            <StyledSpinner>
                <Spinner animation="border" />
            </StyledSpinner>
            )}
    </>
    )
}