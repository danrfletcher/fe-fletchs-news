import { ArticleHighlights } from "../components/ArticleHighlights"
import { ArticlesFilter } from "../components/ArticlesFilter"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const Articles = () => {
    return (
        <>
            <Header />
            <main>
                <ArticleHighlights />
            </main>
            <Footer />
        </>
    )
}