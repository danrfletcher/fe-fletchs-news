import { Header } from "../components/Header"
import styled from "styled-components";
import { FooterBar } from "../components/FooterBar";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { fetchArticles, fetchArticle } from '../utils/articles-api';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import { ArticleHighlights } from "../components/ArticleHighlights";
import {Footer } from "../components/Footer";

const StyledFooter = styled.footer`
    position: absolute;
    top: 100%;
    transform: translateY(-10px);
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
const AllArticlesText = styled.h2`
    margin: 25px 15px 5px 15px;
    `
const FilterButton = styled.h4`
    margin-left: 15px;
    `

export const Home = () => {
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
            } catch (error) {
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
        <>
            <Header />
            {articles.length === 0 || Object.keys(articlePreviewText) === 0 ? (
                <CenteredSpinner>
                    <Spinner animation="grow" />
                </CenteredSpinner>
            ) : (
                <>
                    <Carousel>
                    {articles.map((article, index) => (
                            <Carousel.Item key={index}>
                                <Link key={index}
                                    to={`/articles/${removeSpecialCharacters(
                                        article.title.toLowerCase().split(" ").join("-")
                                        )}-${article.article_id}`}>
                                    <img
                                        className="d-block w-100"
                                        src={article.article_img_url}
                                        alt="First Slide"
                                    />
                                    <Carousel.Caption>
                                        {article.title}
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                    ))}
                    </Carousel>
                    <AllArticlesText>All Articles</AllArticlesText>
                    <FilterButton>Filter</FilterButton>
                    <ArticleHighlights />
                    <Footer />
                </>
            )}
        </>
    )
}
