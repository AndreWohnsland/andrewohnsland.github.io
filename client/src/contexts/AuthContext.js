import React, { createContext, Component } from 'react';
import { getAuth } from '../util/apiHelper';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: async () => {
        return await getAuth();
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
    return await getAuth().then((auth) => {
      this.setState({ isAuth: auth });
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
