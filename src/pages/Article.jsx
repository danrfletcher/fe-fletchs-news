import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArticleContent } from '../components/ArticleContent';
import { CommentsSection } from '../components/CommentsSection';
import { useFocusedArticle } from '../contexts/FocusedArticle';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import { fetchArticle } from '../utils/articles-api';

const CenteredSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    `

export const Article = () => {
    let { articleId } = useParams();
    articleId = articleId.split("-")
    articleId = articleId[articleId.length - 1]
    const { article, setArticle } = useFocusedArticle();

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
        <>
            <Header />
            {article.article_id ? (
                <>
                    <main>
                        <ArticleContent articleId={articleId} />
                        <CommentsSection />
                    </main>
                    <Footer />
                </>
            ) : (
            <CenteredSpinner>
                <Spinner animation="grow" />
            </CenteredSpinner>
            )}
        </>
    )
}