import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Notify from './components/Notify'
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, USER } from './queries'
import { BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, (_ref) => {
    const allBooks = _ref ? _ref.allBooks : []
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const { data, loading } = useQuery(USER)

  const client = useApolloClient()

  // function that takes care of manipulating cache

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(addedBook)
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

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
        <Route
          path='/newbook'
          element={<NewBook user={data.me} notify={notify} />}
        />
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
