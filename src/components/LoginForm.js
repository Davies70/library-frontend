import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'
import { ApolloClient } from '@apollo/client'

const LoginForm = ({ setToken, setErrorMessage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    },
  })
  
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      navigate('/')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })

    setPassword('')
    setUsername('')
  }

  return (
    <form onSubmit={submit}>
      <div>
        name:{' '}
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
