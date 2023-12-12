import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { Articles } from './pages/Articles'
import { Article } from './pages/Article'

function App() {
  return (
    <Routes>
      <Route path='/articles' element={<Articles />} />
      <Route path='/articles/:articleId' element={<Article />} />
    </Routes>
  )
}

export default App
