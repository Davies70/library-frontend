import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Notify from './components/Notify'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { USER } from './queries'

const App = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const { data, error, loading } = useQuery(USER)

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

  if (loading) {
    return <div>loading</div>
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
            <button onClick={() => navigate('/recommendations')}>
              recommend
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>login</button>
        )}
      </div>

      <Routes>
        <Route path='/' element={<Authors setError={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/newbook' element={<NewBook user={data.me} />} />
        <Route
          path='/login'
          element={
            <LoginForm setToken={setToken} setErrorMessage={setErrorMessage} />
          }
        />
        <Route
          path='/recommendations'
          element={<Recommendations user={data.me} />}
        />
      </Routes>
    </div>
  )
}

export default App
