import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ user }) => {
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: {
      genre: user.favoriteGenre,
    },
  })

  if (booksLoading) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <span>
        books in your favorite genre <b>{user.favoriteGenre}</b>
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData?.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
