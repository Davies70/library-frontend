import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Notify from './components/Notify'
import { useState } from 'react'

const App = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }

  return (
    <div>
      <Notify message={errorMessage} />
      <div>
        <button onClick={() => navigate('/')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        <button onClick={() => navigate('/newbook')}>add book</button>
      </div>

      <Routes>
        <Route path='/' element={<Authors setError={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/newbook' element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
