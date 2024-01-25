import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Filter = ({  setFilteredBooks }) => {
  const [filterKey, setFilterKey] = useState(null)
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: {
      genre: filterKey,
    },
  })

  useEffect(() => {
    if (data) {
      setFilteredBooks(data.allBooks)
    }
  }, [data])

  if (loading) {
    return <div>loading...</div>
  }

  const filter = ({ target }) => {
    if (target.innerText === 'all genres') {
      setFilterKey(null)
      return
    }
    setFilterKey(target.innerText)
  }
  return (
    <div>
      <button onClick={filter}>refactoring</button>
      <button onClick={filter}>agile</button>
      <button onClick={filter}>patterns</button>
      <button onClick={filter}>design</button>
      <button onClick={filter}>crime</button>
      <button onClick={filter}>classic</button>
      <button onClick={filter}>sci-fi</button>
      <button onClick={filter}>thriller</button>
      <button onClick={filter}>all genres</button>
    </div>
  )
}

export default Filter
