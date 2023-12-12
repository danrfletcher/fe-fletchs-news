import { ArrowUpCircleFill, ArrowDownCircleFill, ChatLeftDotsFill } from 'react-bootstrap-icons';
import styled from 'styled-components';

const EngagementBar = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0px;
    > * {
        color: gray
    }
    `
const Votes = styled.div`
    display: flex;
    align-items: center;
    `
const CommentCount = styled.div`
    display: flex;
    align-items: center;
`

export const Engagement = ({votes}) => {
    return (
        <EngagementBar>
            <Votes>
                <ArrowUpCircleFill />&nbsp;<ArrowDownCircleFill />&nbsp;&nbsp;{votes}&nbsp;&nbsp;
            </Votes>
            <CommentCount>
                <ChatLeftDotsFill />&nbsp; CommentCount
            </CommentCount>
        </EngagementBar>
    )
}