import styled from 'styled-components';
import { Calendar, ChatLeftDotsFill, ArrowUpCircleFill, ArrowDownCircleFill } from 'react-bootstrap-icons';
import {Image, Button } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons'
import { Engagement } from './Engagement';
import { useFocusedArticle } from '../contexts/FocusedArticle';
import Spinner from 'react-bootstrap/Spinner';

const ArticleTopic = styled.h6`
    font-weight: 100;
    `
const ArticleTitle = styled.h1`
    font-weight: 600;
    `
const ArticleInfo = styled.h5`
    font-weight: 300;
    `
const SocialIconStyleProvider = styled.div`
    padding-right: 5px;
    `
const SocialIconsContainer = styled.div`
    display: flex;
    `
const StatusBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-top: 5px;
    `
const TitleArea = styled.div`
    margin: 10px;
    `
const ArticleBody = styled.p`
    padding: 0px 10px;
    `

export const ArticleContent = ({articleId}) => {
    const {article, setArticle } = useFocusedArticle();
    
    return (
        <>
            {article.article_id ? (        
                <section>
                    <TitleArea>
                        <ArticleTopic>{article.topic}</ArticleTopic>
                        <ArticleTitle>{article.title}</ArticleTitle>
                        <ArticleInfo>By <strong>{article.author}</strong>&nbsp;&nbsp;<Calendar /> {article.fullDate}</ArticleInfo>
                    </TitleArea>
                    <StatusBar>
                        <SocialIconsContainer>
                            <SocialIconStyleProvider><SocialIcon style={{ height: 40, width: 40 }} url="https://x.com/" /></SocialIconStyleProvider>
                            <SocialIconStyleProvider><SocialIcon style={{ height: 40, width: 40 }} url="https://facebook.com/" /></SocialIconStyleProvider>
                            <SocialIconStyleProvider><SocialIcon style={{ height: 40, width: 40 }} url="https://instagram.com/" /></SocialIconStyleProvider>
                            <SocialIconStyleProvider><SocialIcon style={{ height: 40, width: 40 }} url="https://reddit.com/" /></SocialIconStyleProvider>
                            <SocialIconStyleProvider><SocialIcon style={{ height: 40, width: 40 }} url="https://tiktok.com/" /></SocialIconStyleProvider>
                            <SocialIconStyleProvider><SocialIcon style={{ height: 40, width: 40 }} url="https://www.pinterest.com" /></SocialIconStyleProvider>
                        </SocialIconsContainer>
                        <Button variant="primary"><ChatLeftDotsFill /> Comments</Button>
                    </StatusBar>
                    <Image src={article.article_img_url} fluid />
                    <Engagement votes={article.votes} />
                    <ArticleBody>{article.body}</ArticleBody>
                </section>
            ) : (<Spinner animation="grow" />)}
        </>

    )
}