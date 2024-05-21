import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AxiosResponse } from 'axios'
import InfoBox from './Forms/InfoBox'
import CaptionBanner from '../CaptionBanner'
import { updatePassword } from '../../util/apiHelper'

const ChangePassword: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState<AxiosResponse | undefined>(undefined)

  useEffect(() => {
    document.title = `Admin | ${process.env.REACT_APP_SHOWN_NAME}`
  }, [])

  const validateForm = () => {
    return (
      username.length > 0 &&
      password.length > 0 &&
      newPassword.length >= 8 &&
      newPassword === repeatedPassword
    )
  }

  const isLongEnough = () => {
    return newPassword.length >= 8
  }

  const bothNewPasswordsAreSame = () => {
    return newPassword === repeatedPassword
  }

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    updatePassword(username, password, newPassword, repeatedPassword).then(
      (res) => {
        setMessage(res)
        setShowMessage(true)
      },
    )
  }

  return (
    <>
      <CaptionBanner text="Make it safer" />
      <main className="content-container h-100">
        <div className="main-text user-input-container">
          {showMessage && (
            <InfoBox
              res={message}
              name="User change"
              handleShow={() => setShowMessage(!showMessage)}
            />
          )}
          <div className="Login user-form-container">
            <h3 className="user-form-header">Change your password</h3>
            <br />
            <form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="element-form-group">
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="element-form-group">
                <Form.Control
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>
              <Form.Group
                controlId="newPassword"
                className="element-form-group"
              >
                <Form.Control
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>
              <Form.Group
                controlId="repeatedPassword"
                className="element-form-group"
              >
                <Form.Control
                  value={repeatedPassword}
                  placeholder="Repeat New Password"
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>
              <Button disabled={!validateForm()} type="submit">
                Change Password
              </Button>
            </form>
          </div>
          {!isLongEnough() && (
            <p>The password needs to be at least 8 Characters. </p>
          )}
          {!bothNewPasswordsAreSame() && (
            <p>Both, the new and repeated password needs to be identical. </p>
          )}
        </div>
      </main>
    </>
  )
}

export default ChangePassword
