import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const ArticleCard = styled(Card)`
    margin: 15px;
    border: none;
    `

export const ArticleHighlights = () => {
    return (
        <section>
            <ArticleCard className="bg-dark text-white">
                <Card.Img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
            </ArticleCard>
            <p>This will be the article highlights section.</p>
        </section>
    )
}