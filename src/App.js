import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Notify from './components/Notify'
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
  }

  return (
    <div>
      <Notify message={errorMessage} />
      <div>
        <button onClick={() => navigate('/')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        {token ? (
          <>
            <button onClick={() => navigate('/newbook')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>login</button>
        )}
      </div>

      <Routes>
        <Route path='/' element={<Authors setError={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/newbook' element={<NewBook />} />
        <Route
          path='/login'
          element={
            <LoginForm setToken={setToken} setErrorMessage={setErrorMessage} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
