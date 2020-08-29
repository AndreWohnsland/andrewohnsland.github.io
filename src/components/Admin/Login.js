import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return name.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const formStyle = { maxWidth: '300px' };
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <div className='main-header text-center'>
        <h1>Welcome Boss</h1>
      </div>
      <br />
      <div className='main-text'>
        <div className='Login' style={divStyle}>
          <form onSubmit={handleSubmit}>
            <Form.Group controlId='email' bsSize='large'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                style={formStyle}
                autoFocus
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password' bsSize='large'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={formStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </Form.Group>
            <Button style={formStyle} block bsSize='large' disabled={!validateForm()} type='submit'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
