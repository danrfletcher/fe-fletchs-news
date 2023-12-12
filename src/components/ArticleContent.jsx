import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArticle } from '../utils/api';
import styled from 'styled-components';
import { Calendar, ChatLeftDotsFill, ArrowUpCircleFill, ArrowDownCircleFill } from 'react-bootstrap-icons';
import {Image, Button } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons'
import { Engagement } from './Engagement';

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
    const [article, setArticle] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticle(articleId);
                const date = new Date(data.created_at);
                
                const dayOfWeekNumber = date.getDay();
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                
                const dayOfWeek = daysOfWeek[dayOfWeekNumber];
                const dayOfMonth = date.getDate();
                const month = date.toLocaleString('default', {month: 'long'})
                const year = date.getFullYear();

                const getSuffix = (dayOfMonth) => {
                    if (dayOfMonth >= 11 && dayOfMonth <= 13) 'th';
                    switch (String(dayOfMonth)[String(dayOfMonth).length - 1]) {
                        case "1":
                            return 'st';
                        case "2":
                            return 'nd';
                        case "3":
                            return 'rd';
                        default:
                            return 'th';
                    }
                }

                data.fullDate = `${dayOfWeek} ${dayOfMonth}${getSuffix(dayOfMonth)} ${month} ${year}`

                setArticle(data);
            } catch(error) {
                console.log("Error fetching articles", error);
            }
        }
        fetchData();
    }, [])
    return (
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
    )
}