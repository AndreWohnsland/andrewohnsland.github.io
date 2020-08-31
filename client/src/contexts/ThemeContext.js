import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLightTheme: this.getCachedTheme(),
      light: { syntax: '#1a1a1a', ui: 'none', bg: 'rgb(240, 241, 255)' },
      dark: { syntax: '#ececec', ui: 'none', bg: 'rgb(63, 63, 63)' },
    };
  }

  getCachedTheme = () => {
    const userTheme = localStorage.getItem('theme');
    // let checkboxChecked = false;
    let useLightTheme = true;
    if (userTheme !== null) {
      useLightTheme = userTheme === 'light';
      // this.setState({ isLightTheme: useLightTheme });
      // checkboxChecked = !useLightTheme;
    }
    return useLightTheme;
  };

  cacheTheme = (lightTheme) => {
    const saveTheme = lightTheme ? 'light' : 'dark';
    localStorage.setItem('theme', saveTheme);
  };

  toggleTheme = () => {
    this.setState({ isLightTheme: !this.state.isLightTheme });
  };

  setTheme = (theme) => {
    this.setState({ isLightTheme: theme });
    this.cacheTheme(theme);
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          ...this.state,
          toggleTheme: this.toggleTheme,
          setTheme: this.setTheme,
          cacheTheme: this.cacheTheme,
          getCachedTheme: this.getCachedTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
