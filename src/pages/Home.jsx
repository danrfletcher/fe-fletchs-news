import { Header } from "../components/Header"
import styled from "styled-components";
import { FooterBar } from "../components/FooterBar";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { fetchArticles, fetchArticle } from '../utils/articles-api';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import { ArticleHighlights } from "../components/ArticleHighlights";
import { device } from "../styles/media-queries";

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
const StyledCarousel = styled(Carousel)`
    height: 200px;
    object-fit: cover;
    height: auto;
    width: auto;
    overflow: hidden;
    & > div {
        max-height: 50vh;
    }
    `
const StyledCarouselImage = styled.div`
    max-height: 50vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    @media ${device.medium} {
        max-height: 35vh;
    }
    `
const StyledArticlesLink = styled(Link)`
    color: black;
    text-decoration: none;
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
                    <StyledCarousel>
                    {articles.map((article, index) => (
                        <Carousel.Item key={index}>
                                <Carousel.Caption>{article.title}</Carousel.Caption>
                                <Link key={index}
                                    to={`/articles/${removeSpecialCharacters(
                                        article.title.toLowerCase().split(" ").join("-")
                                        )}-${article.article_id}`}>
                                    <StyledCarouselImage>
                                        <img
                                            className="d-block w-100"
                                            src={article.article_img_url}
                                            alt="First Slide"
                                        />
                                    </StyledCarouselImage>
                                </Link>
                            </Carousel.Item>
                    ))}
                    </StyledCarousel>
                    <AllArticlesText>
                        <StyledArticlesLink to="/articles">All Articles</StyledArticlesLink>
                    </AllArticlesText>
                    <ArticleHighlights updateLoaded={setArticlesLoaded} updateArticles={setArticles} updateArticlePreviewText={setArticlePreviewText}/>
                </>
            )}
        </>
    )
}
