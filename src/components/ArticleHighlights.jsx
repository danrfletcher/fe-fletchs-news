import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { fetchArticles, fetchArticle } from '../utils/articles-api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = styled(Card)`
    margin: 15px;
    border: none;
    `
const ReadMoreLink = styled(Link)`
    text-decoration: none;
    color: white;
    `
const CenteredSpinner = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
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

    const removeSpecialCharacters = (urlString) => {
        const regex = /[^\w\s-]/g;
        return urlString.replace(regex, '');
    }

    return (
        <section>
          {articles.length === 0 || Object.keys(articlePreviewText) === 0 ? (
            <CenteredSpinner animation="grow" />
          ) : (
            articles.map((article, index) => (
              <article key={article.article_id}>
                <ArticleCard className="bg-dark text-white">
                  <Card.Img src={article.article_img_url} alt="Card image" />
                  <Card.ImgOverlay>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{`${article.topic[0].toUpperCase()}${article.topic
                      .split("")
                      .slice(1, article.topic.length)
                      .join("")}`}</Card.Text>
                    <Card.Text>
                      {articlePreviewText[article.article_id] ? `${articlePreviewText[article.article_id]}...` : <Spinner animation="border" />}
                      <br />
                      <br />
                      <ReadMoreLink
                        to={`/articles/${removeSpecialCharacters(
                          article.title.toLowerCase().split(" ").join("-")
                        )}-${article.article_id}`}
                      >
                        <ArrowRightCircleFill />
                        <strong> Read More</strong>
                      </ReadMoreLink>
                    </Card.Text>
                  </Card.ImgOverlay>
                </ArticleCard>
              </article>
            ))
          )}
        </section>
      );      
}