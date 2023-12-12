import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { fetchArticles, fetchArticle } from '../utils/api';
import { useEffect, useState } from 'react';

const ArticleCard = styled(Card)`
    margin: 15px;
    border: none;
    `

export const ArticleHighlights = () => {
    const [articles, setArticles] = useState([]);
    const [articlePreviewText, setArticlePreviewText] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
            } catch(error) {
                console.log("Error fetching articles", error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newArticleIds = [];
                const grabNewArticleIds = articles.map((article) => {
                    newArticleIds.push(article.article_id);
                });
                const indArticleData = await Promise.all(newArticleIds.map((articleId) => {return fetchArticle(articleId);}));
                setArticlePreviewText((prevState) => {
                    const newState = { ...prevState};
                    indArticleData.forEach((indArticle) => {
                        const lastSpaceIndex = indArticle.body.lastIndexOf(" ", 100);
                        newState[indArticle.article_id] = indArticle.body.substring(0,lastSpaceIndex);
                    })
                    return newState;
                });
            } catch {
                console.log("Error fetching article info", error);
            }
        }
        fetchData();
    }, [articles])

    return (
        <section>
            {articles.map((article, index) => {
                //console.log(articlePreviewText)
                return (
                    <ArticleCard className="bg-dark text-white" key={article.article_id}>
                        <Card.Img src={article.article_img_url} alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>{`${article.topic[0].toUpperCase()}${article.topic.split("").slice(1,article.topic.length).join("")}`}</Card.Text>
                            <Card.Text>
                                <div>{articlePreviewText[article.article_id]}... </div>
                                <div>
                                    <br />
                                    <ArrowRightCircleFill /> 
                                    <strong> Read More</strong>
                                </div>
                            </Card.Text>
                        </Card.ImgOverlay>
                    </ArticleCard>
                )
            })}
        </section>
    )
}