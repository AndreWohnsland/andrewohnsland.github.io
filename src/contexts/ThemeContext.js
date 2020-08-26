import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
    light: { syntax: '#1a1a1a', ui: 'none', bg: 'rgb(240, 241, 255)' },
    dark: { syntax: '#ececec', ui: 'none', bg: 'rgb(63, 63, 63)' },
  };

  getCachedTheme = () => {
    const userTheme = localStorage.getItem('theme');
    let checkboxChecked = false;
    if (userTheme !== null) {
      let useLightTheme = userTheme === 'light';
      this.setState({ isLightTheme: useLightTheme });
      checkboxChecked = !useLightTheme;
    }
    return checkboxChecked;
  };

  cacheTheme = (lightTheme) => {
    const saveTheme = lightTheme ? 'light' : 'dark';
    localStorage.setItem('theme', saveTheme);
    console.log(saveTheme);
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
