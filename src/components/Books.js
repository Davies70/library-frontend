import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Filter from './Filter'
import { useEffect, useState } from 'react'

const Books = () => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
      setFilteredBooks(data.allBooks)
    }
  }, [data])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Filter
        setBooks={setBooks}
        books={books}
        setFilteredBooks={setFilteredBooks}
      />
    </div>
  )
}

export default Books
