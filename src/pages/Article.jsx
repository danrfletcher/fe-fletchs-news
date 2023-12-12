import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArticleContent } from '../components/ArticleContent';
import { Votes } from '../components/Votes';
import { CommentsSection } from '../components/CommentsSection';
import { FocusedArticleProvider } from '../contexts/FocusedArticle';

export const Article = () => {
    let { articleId } = useParams();
    articleId = articleId.split("-")
    articleId = articleId[articleId.length - 1]

    return (
        <FocusedArticleProvider>
            <Header />
            <main>
                <ArticleContent articleId={articleId} />
                <CommentsSection />
            </main>
            <Footer />
        </FocusedArticleProvider>
    )
}