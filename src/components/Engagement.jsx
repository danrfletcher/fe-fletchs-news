import { ArrowUpCircleFill, ArrowDownCircleFill, ChatLeftDotsFill } from 'react-bootstrap-icons';
import { useFocusedArticle } from '../contexts/FocusedArticle';
import styled from 'styled-components';
import { Votes } from './Votes';

const EngagementBar = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0px;
    > * {
        color: gray
    }
    `
const CommentCount = styled.div`
    display: flex;
    align-items: center;
`

export const Engagement = () => {
    const {article, setArticle } = useFocusedArticle();

    return (
        <EngagementBar>
            <Votes votes={article.votes} />
            <CommentCount>
                <ChatLeftDotsFill />&nbsp; CommentCount
            </CommentCount>
        </EngagementBar>
    )
}