import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { fetchArticles, fetchArticle } from '../utils/articles-api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';

const ArticleCard = styled(Card)`
    margin: 15px;
    border: none;
    `
const ReadMoreLink = styled(Link)`
    text-decoration: none;
    color: white;
    `
const CenteredSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    `
const FilterButton = styled.h4`
    margin-left: 30px;
    margin-bottom: -15px;
    `
const FormFilterControls = styled(Form)`
    display: flex;
    justify-content: left;
    & > * {
      margin-right: 10px;
    }
    `

export const ArticleHighlights = (props) => {
    const [articles, setArticles] = useState([]);
    const [articlePreviewText, setArticlePreviewText] = useState({});
    const [filter, setFilter] = useState("Topic");
    const [order, setOrder] = useState("Newest first");
    const [topics, setTopics] = useState([]);
    const [utilOrder, setUtilOrder] = useState(false);
    const [onFirstArticlesLoad, setOnFirstArticlesLoad] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticles(filter, order);
                setArticles(data);
                if (props?.updateLoaded) props.updateLoaded(true);
                if (props?.updateArticles) props.updateArticles(data);
            } catch(error) {
                console.log("Error fetching articles", error);
            }
        }
        fetchData();
    }, [filter, order])

    useEffect(() => {
      if (articles.length > 0) {
        if (onFirstArticlesLoad) {
          const convertTopics = () => {
            const topics = [];
            articles.map((article) => {
              topics.push(article.topic)
            });
            const uniqueTopics = Array.from(new Set(topics));
            setTopics(uniqueTopics);
            setOnFirstArticlesLoad(false);
          }
          convertTopics();
        }
      }
    },[articles])

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

    useEffect(() => {
      if (props?.updateArticlePreviewText) props.updateArticlePreviewText(articlePreviewText);
    }, [articlePreviewText])

    const removeSpecialCharacters = (urlString) => {
        const regex = /[^\w\s-]/g;
        return urlString.replace(regex, '');
    }

    return (
        <section>
          {articles.length === 0 || Object.keys(articlePreviewText) === 0 ? (
            <CenteredSpinner>
              <Spinner animation="grow" />
            </CenteredSpinner>
          ) : (
            <>
              <Accordion>
                <Accordion.Item id="styled-accordian" eventKey="0">
                  <Accordion.Header id="styled-accordian">
                    <FilterButton>Filter</FilterButton>
                  </Accordion.Header>
                  <Accordion.Body>
                    <FormFilterControls>
                      <NavDropdown id="nav-dropdown-dark-example" title={filter[0].toUpperCase() + filter.slice(1)} menuVariant="dark">
                        {topics.map((topic, index) => <NavDropdown.Item key={index} onClick={() => {setFilter(topic)}}>{topic[0].toUpperCase() + topic.slice(1)}</NavDropdown.Item>)}
                      </NavDropdown>
                      <Form.Check type="switch" id="custom-switch" label={order} 
                        onClick={
                          () => {
                            if (order === "Newest first") setOrder("Oldest first")
                            else if (order === "Oldest first") setOrder("Newest first")
                          }
                        } 
                      />
                    </FormFilterControls>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {articles.map((article, index) => (
                <article key={article.article_id}>
                  <ArticleCard className="bg-dark text-white">
                    <Card.Img src={article.article_img_url} alt="Card image" />
                    <Card.ImgOverlay>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Text>{`${article.topic[0].toUpperCase()}${article.topic
                        .split("")
                        .slice(1, article.topic.length)
                        .join("")}`}</Card.Text>
                      <div>
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
                      </div>
                    </Card.ImgOverlay>
                  </ArticleCard>
                </article>
              ))}
            </>
          )}
        </section>
      );      
}