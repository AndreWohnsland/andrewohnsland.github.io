import React, { createContext, Component } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: async () => {
        return await axios
          .get('http://localhost:5000/api/user/auth', {
            withCredentials: true,
          })
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      },
    };
  }

  componentDidMount() {
    this.getAuthStatus();
  }

  setIsAuth = (state) => {
    this.setState({ isAuth: state });
  };

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
      <AuthContext.Provider value={{ ...this.state, setIsAuth: this.setIsAuth, getAuthStatus: this.getAuthStatus }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
