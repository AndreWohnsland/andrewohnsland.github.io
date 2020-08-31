import React, { createContext, Component } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  componentDidMount() {
    this.getAuthStatus();
  }

  getAuthStatus = async () => {
    return await axios
      .get('http://localhost:5000/api/user/auth', {
        withCredentials: true,
      })
      .then(() => {
        this.setState({ isAuth: true });
      })
      .catch(() => {
        this.setState({ isAuth: false });
      });
  };

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, getAuthStatus: this.getAuthStatus }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
