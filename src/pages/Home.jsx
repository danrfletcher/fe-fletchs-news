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

export const Home = () => {
    const [articlesLoaded, setArticlesLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const [articlePreviewText, setArticlePreviewText] = useState({});

    const removeSpecialCharacters = (urlString) => {
        const regex = /[^\w\s-]/g;
        return urlString.replace(regex, '');
    }

    return (
        <>
            <Header />
            {!articlesLoaded ? (
                <ArticleHighlights updateLoaded={setArticlesLoaded} updateArticles={setArticles}/>
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
                    <ArticleHighlights updateLoaded={setArticlesLoaded} updateArticles={setArticles} updateArticlePreviewText={setArticlePreviewText}/>
                    <Footer />
                </>
            )}
        </>
    )
}
