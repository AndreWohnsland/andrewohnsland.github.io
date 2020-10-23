import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import InfoBox from './Forms/InfoBox';
import CaptionBanner from '../CaptionBanner';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  function validateForm() {
    return username.length > 0 && password.length > 0 && newPassword.length >= 8 && newPassword === repeatedPassword;
  }

  function isLongEnough() {
    return newPassword.length >= 8;
  }

  function bothNewPasswordsAreSame() {
    return newPassword === repeatedPassword;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        'http://localhost:5000/api/user/change',
        { username, password, newPassword, repeatedPassword },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
          validateStatus: () => true,
        }
      )
      .then((res) => {
        setMessage(res);
        setShowMessage(true);
      });
  }

  return (
    <div>
      <CaptionBanner text='Make it safer' />
      <div className='main-text user-input-container'>
        {showMessage && <InfoBox res={message} name={'User change'} handleShow={() => setShowMessage(!showMessage)} />}
        <div className='Login user-form-container'>
          <p>Change your password</p>
          <form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Control
                autoFocus
                type='text'
                placeholder='Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </Form.Group>
            <Form.Group controlId='newPassword'>
              <Form.Control
                value={newPassword}
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)}
                type='password'
              />
            </Form.Group>
            <Form.Group controlId='repeatedPassword'>
              <Form.Control
                value={repeatedPassword}
                placeholder='Repeat New Password'
                onChange={(e) => setRepeatedPassword(e.target.value)}
                type='password'
              />
            </Form.Group>
            <Button block disabled={!validateForm()} type='submit'>
              Change Password
            </Button>
          </form>
        </div>
        {!isLongEnough() && <p>The password needs to be at least 8 Characters. </p>}
        {!bothNewPasswordsAreSame() && <p>Both, the new and repeated password needs to be identical. </p>}
      </div>
    </div>
  );
};

export default ChangePassword;
