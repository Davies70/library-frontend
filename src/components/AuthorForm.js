import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { UPDATE_AUTHOR } from '../queries'

const AuthorForm = ({ setError, authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR)

  const update = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born } })
    setBorn('')
  }

  return (
    <div>
      {' '}
      <h2>Set birthyear</h2>
      <form onSubmit={update}>
        <div>
          <select onChange={({ target }) => setName(target.value)} value={name}>
            {authors.map((a) => (
              <option value={a.name} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button>update author</button>
        </div>
      </form>
    </div>
  )
}

export default AuthorForm
