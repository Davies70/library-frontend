import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { UPDATE_AUTHOR } from '../queries'

const AuthorForm = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR)

  const update = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])

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
