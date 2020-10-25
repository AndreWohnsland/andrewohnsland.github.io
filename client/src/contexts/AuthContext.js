import React, { createContext, Component } from 'react';
import { getAuth } from '../util/apiHelper';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: async () => {
        return getAuth();
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
    return getAuth().then((auth) => {
      this.setState({ isAuth: auth });
    });
  };

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          setIsAuth: this.setIsAuth,
          getAuthStatus: this.getAuthStatus,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
