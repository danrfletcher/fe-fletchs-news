import { fetchComments } from "../utils/comments-api"
import { useEffect, useState } from "react"
import { useFocusedArticle } from '../contexts/FocusedArticle';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import AvatarImage from '../assets/avatar-placeholder.svg'
import { fetchUsers } from "../utils/users-api";
import { Votes } from "./Votes";

const StyledSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    margin: 30px 0px;
    z-index: 1;
    color: lightgrey;
    `
const StyledAvatarImage = styled(Image)`
    height: 2rem;
    width: 2rem;
    border: 1px solid lightgrey;
    aspect-ratio: 1 / 1;
    ` 
const CommentList = styled.ul`
    list-style: none;
    padding: 0px 10px;
    `
const CommentCard = styled.li`
    display: flex;
    margin-bottom: 15px
    `
const CommentTopBar = styled.div`
    display: flex;
    & > * {
        margin-right: 7px;
    }
    `
const CommentBottomBar = styled.div`
    `
const CommentRightBox = styled.div`
    margin-left: 7px;
    `
const CommentText = styled.p`
    margin-bottom: 2px;
    `
const VoteCount = styled.div`
    > * {
        color: gray;
        text-decoration: strong;
    }
    `

export const ExistingComments = () => {
    const {article} = useFocusedArticle();
    const [comments, setComments] = useState([]);
    const [userAvatars, setUserAvatars] = useState({});

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newUserIds = [];
                const grabNewUserIds = comments.map((comment) => {
                    newUserIds.push(comment.author);
                });
                const userProfiles = await Promise.all(newUserIds.map((user) => {return fetchUsers(user);}));
                setUserAvatars((prevState) => {
                    const newState = {...prevState};
                    userProfiles.forEach((profile) => {
                        newState[profile.username] = profile.avatar_url;
                    })
                    return newState;
                })
            } catch {
                console.log("Error fetching user data", error);
            }
        }
        fetchData();
    }, [comments])

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
                <CommentList>
                {comments.map((comment, index) => {
                    return (
                        <CommentCard key={`${comment.author}-${index}`}>
                            <StyledAvatarImage src={userAvatars[comment.author] ? userAvatars[comment.author] :AvatarImage} roundedCircle />
                            <CommentRightBox>
                                <CommentTopBar>
                                    <p><strong>@{comment.author}</strong></p>
                                    <p>{transformCommentPostTime(comment.created_at)}</p>
                                </CommentTopBar>
                                <CommentBottomBar>
                                    <CommentText>{comment.body}</CommentText>
                                    <VoteCount>
                                        <Votes votes={comment.votes} />
                                    </VoteCount>
                                </CommentBottomBar>
                            </CommentRightBox>
                        </CommentCard>
                    )
                })}
            </CommentList>
            ) : (
            <StyledSpinner>
                <Spinner animation="border" />
            </StyledSpinner>
            )}
    </>
    )
}