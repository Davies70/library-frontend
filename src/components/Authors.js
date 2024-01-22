import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import AuthorForm from './AuthorForm'

const Authors = ({ setError }) => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (loading) {
    return <p>Loading...</p>
  }

  const authors = data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm setError={setError} authors={authors} />
    </div>
  )
}

export default Authors
