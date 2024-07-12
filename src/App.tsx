import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './components/articleList';
import ArticleDetail from './components/articleDetails';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ArticleList/>} />
                <Route path="/articles/:id" element={<ArticleDetail/>} />
            </Routes>
        </Router>
    );
};

export default App;
