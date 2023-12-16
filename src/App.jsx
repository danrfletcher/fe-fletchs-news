import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { Articles } from './pages/Articles'
import { Article } from './pages/Article'
import { Login } from './pages/Login'
import { Error } from './pages/Error'

function App() {
  return (
    <Routes>
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:articleId' element={<Article />} />
        <Route path='/login' element={<Login />} />
        <Route path='/error/:statusCode' element={<Error />} />
    </Routes>
  )
}

export default App
