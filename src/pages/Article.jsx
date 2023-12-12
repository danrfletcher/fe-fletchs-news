import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArticleContent } from '../components/ArticleContent';
import { Votes } from '../components/Votes';
import { CommentsSection } from '../components/CommentsSection';

export const Article = () => {
    let { articleId } = useParams();
    articleId = articleId.split("-")
    articleId = articleId[articleId.length - 1]

    return (
        <>
            <Header />
            <main>
                <ArticleContent articleId={articleId} />
                <Votes />
                <CommentsSection />
            </main>
            <Footer />
        </>
    )
}