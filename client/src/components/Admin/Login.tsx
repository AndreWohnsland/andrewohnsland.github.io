import React, { useState, useContext, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { loginUser } from '../../util/apiHelper'
import CaptionBanner from '../CaptionBanner'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [valid, setValid] = useState(true)
  const { setIsAuth, isAuth } = useContext(AuthContext)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Login | ${import.meta.env.VITE_APP_SHOWN_NAME}`
  }, [])

  if (isAuth === true) navigate('/admin/projects')

  function validateForm(): boolean {
    return username.length > 0 && password.length > 0
  }

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault()
    loginUser(username, password)
      .then((res) => {
        if (res.statusText === 'OK') {
          setIsAuth(true)
          return navigate('/admin/projects')
        }
        setValid(false)
        setMessage(res.data.message)
      })
      .catch((err) => {
        setValid(false)
        setMessage(err.data)
      })
  }

  return (
    <>
      <CaptionBanner text="Welcome Boss" />
      <main className="content-container h-100">
        <div className="main-text user-input-container">
          <div className="Login user-form-container">
            <form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="element-form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="element-form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>
              {!valid && <div className="res-error">{message}</div>}
              <Button disabled={!validateForm()} type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Login
