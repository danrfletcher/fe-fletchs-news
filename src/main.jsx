import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FocusedArticleProvider } from './contexts/FocusedArticle';
import { LoggedInUserProvider } from './contexts/LoggedInUser.jsx'
import { NavigationHistoryProvider } from './contexts/NavigationHistory.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavigationHistoryProvider>
      <LoggedInUserProvider>
        <FocusedArticleProvider>
          <App />
        </FocusedArticleProvider>
      </LoggedInUserProvider>
    </NavigationHistoryProvider>
  </BrowserRouter>,
)
