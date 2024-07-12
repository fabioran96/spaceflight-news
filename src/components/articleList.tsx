import { useEffect, useState } from 'react';
import { Article } from '../types/article';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';


const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('https://api.spaceflightnewsapi.net/v4/articles')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.results)) {
                    setArticles(data.results);
                } else {
                    console.error('La risposta dell\'API non è un array:', data);
                }
            })
            .catch(error => console.error('Errore nel fetch dei dati:', error));
    }, []);

    return (
        <Container>
            <h1 className="my-4">Notizie sul Volo Spaziale</h1>
            <Row>
                {articles.map(article => (
                    <Col md={4} key={article.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={article.image_url || 'url_placeholder_image'} alt={article.title} className="card-img-list" />
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                <Card.Text>{new Date(article.published_at).toLocaleDateString()}</Card.Text>
                                <Link to={`/articles/${article.id}`} className="btn btn-primary">Leggi di più</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );

};

export default ArticleList;

