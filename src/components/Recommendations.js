import { useQuery } from '@apollo/client'
import { USER } from '../queries'
import { useState, useEffect } from 'react'

const Recommendations = () => {
  const [user, setUser] = useState(null)
  const { loading, data } = useQuery(USER)

  useEffect(() => {
    if (data) {
      setUser(data.me)
    }
  }, [data])

  if (loading) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <span>books in your favorite genre</span>
      <table>
        <tbody>
          <thead>
            <tr>
              <td>author</td>
              <td>published</td>
            </tr>
          </thead>
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
