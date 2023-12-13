import { ArrowUpCircleFill, ArrowDownCircleFill, ChatLeftDotsFill } from 'react-bootstrap-icons';
import { useFocusedArticle } from '../contexts/FocusedArticle';
import styled from 'styled-components';
import { useState } from 'react';

const NumberOfVotes = styled.p`
    `
const VotesContainer = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin-right: 4px;
    }
    & > ${NumberOfVotes} {
        margin : 5px 0px 0px 5px;
    };
    `
const DynamicUpvotes = styled(({userUpvoted, ...restOfProps}) => (<ArrowUpCircleFill {...restOfProps} />))`
    color: ${(props) => (props.userUpvoted ? '#25FA4F' : 'grey')}
    `
const DynamicDownvotes = styled(({userDownvoted, ...restOfProps}) => (<ArrowDownCircleFill {...restOfProps} />))`
    color: ${(props) => (props.userDownvoted ? '#FA2547' : 'grey')}
    `

export const Votes = ({votes}) => {
    const {article, setArticle } = useFocusedArticle();
    const [displayedVotes, setDisplayedVotes] = useState(votes);
    const [userUpvoted, setUserUpvoted] = useState(false);
    const [userDownvoted, setUserDownvoted] = useState(false);

    const handleVote = (direction) => {
        if (direction === 'upvote') {
            if (!userUpvoted && !userDownvoted) {
                setUserUpvoted(true);
                setDisplayedVotes(prev => prev + 1)
            } else if (userUpvoted) {
                setUserUpvoted(false);
                setDisplayedVotes(prev => prev - 1)
            } else if (userDownvoted) {
                setUserDownvoted(false);
                setUserUpvoted(true);
                setDisplayedVotes(prev => prev + 2)
            }
        } else if (direction === 'downvote') {
            if (!userUpvoted && !userDownvoted) {
                setUserDownvoted(true);
                setDisplayedVotes(prev => prev - 1)
            } else if (userDownvoted) {
                setUserDownvoted(false);
                setDisplayedVotes(prev => prev + 1)
            } else if (userUpvoted) {
                setUserUpvoted(false);
                setUserDownvoted(true);
                setDisplayedVotes(prev => prev - 2)
            }
        }
    }
    
    return (
        <VotesContainer>
            <DynamicUpvotes 
                userUpvoted={userUpvoted} 
                onClick={() => handleVote("upvote")} 
            />
            <DynamicDownvotes 
                userDownvoted={userDownvoted}
                onClick={() => handleVote("downvote")} 
            />
            <NumberOfVotes>{displayedVotes}</NumberOfVotes>
        </VotesContainer>
    )
}