import { ArrowUpCircleFill, ArrowDownCircleFill, ChatLeftDotsFill } from 'react-bootstrap-icons';
import { useFocusedArticle } from '../contexts/FocusedArticle';
import styled from 'styled-components';

const VotesContainer = styled.div`
    display: flex;
    align-items: center;
    `

export const Votes = () => {
    const {article, setArticle } = useFocusedArticle();
    
    return (
        <VotesContainer>
            <ArrowUpCircleFill />&nbsp;<ArrowDownCircleFill />&nbsp;&nbsp;{article.votes}&nbsp;&nbsp;
        </VotesContainer>
    )
}