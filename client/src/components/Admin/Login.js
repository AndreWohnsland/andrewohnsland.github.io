import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const { setIsAuth, isAuth } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  if (isAuth === true) history.push('/admin/projects');

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        'http://localhost:5000/api/user/login',
        { username, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
          validateStatus: () => true,
        }
      )
      .then((res) => {
        if (res.statusText === 'OK') {
          setIsAuth(true);
          history.push('/admin/projects');
          return;
        } else {
          setValid(false);
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        setValid(false);
        setMessage(err.data);
      });
  }
  const errorStyle = {
    backgroundColor: 'rgb(255, 141, 141)',
    color: 'rgb(146, 0, 0)',
    borderRadius: '5px',
    paddingRight: '5px',
    paddingLeft: '5px',
    paddingTop: '2px',
    paddingBottom: '2px',
    marginTop: '5px',
    marginBottom: '15px',
  };

  return (
    <div>
      <div className='main-header text-center'>
        <h1>Welcome Boss</h1>
      </div>
      <div className='main-text user-input-container'>
        <div className='Login user-form-container'>
          <form onSubmit={handleSubmit}>
            <Form.Group controlId='email'>
              <Form.Label>Name</Form.Label>
              <Form.Control autoFocus type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
            </Form.Group>
            {!valid && <div style={errorStyle}>{message}</div>}
            <Button block disabled={!validateForm()} type='submit'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
