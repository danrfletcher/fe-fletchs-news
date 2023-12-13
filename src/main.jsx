import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FocusedArticleProvider } from './contexts/FocusedArticle';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FocusedArticleProvider>
      <App />
    </FocusedArticleProvider>
  </BrowserRouter>,
)
