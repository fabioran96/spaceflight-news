import { useEffect, useState } from 'react';
import { Article } from '../types/article';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`)
            .then(response => response.json())
            .then(data => setArticle(data))
            .catch(error => console.error('Errore nel fetch dei dati:', error));
    }, [id]);

    if (!article) {
        return <div>Caricamento...</div>;
    }

    return (
        <Container>
            <Card className="my-4">
                <Card.Img variant="top" src={article.image_url || 'url_placeholder_image'} alt={article.title} className="card-detail-img" />
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{new Date(article.published_at).toLocaleDateString()}</Card.Text>
                    <Card.Text>{article.summary}</Card.Text>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Leggi di più</a>
                </Card.Body>
            </Card>
        </Container>
    );

};

export default ArticleDetail;
