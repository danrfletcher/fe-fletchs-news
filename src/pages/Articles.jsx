import { useState } from "react"
import { ArticleHighlights } from "../components/ArticleHighlights"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"


export const Articles = () => {
    const [articlesLoaded, setArticlesLoaded] = useState(false);

    return (
        <>
            <Header />
            <main>
                <ArticleHighlights updateLoaded={setArticlesLoaded} />
            </main>
        </>
    )
}