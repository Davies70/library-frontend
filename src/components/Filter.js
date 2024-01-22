import React from 'react'

const Filter = ({ books, setFilteredBooks }) => {
  const filter = ({ target }) => {
    if (target.innerText === 'all genres') {
      setFilteredBooks(books)
      return
    }
    const filteredBooks = books.filter((b) => {
      if (b.genres.includes(target.innerText)) {
        return b
      }
    })
    setFilteredBooks(filteredBooks)
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
