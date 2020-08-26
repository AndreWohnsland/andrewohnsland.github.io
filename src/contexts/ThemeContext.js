import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
    light: { syntax: '#1a1a1a', ui: 'none', bg: 'rgb(240, 241, 255)' },
    dark: { syntax: '#ececec', ui: 'none', bg: 'rgb(63, 63, 63)' },
  };

  toggleTheme = () => {
    this.setState({ isLightTheme: !this.state.isLightTheme });
  };

  setTheme = (theme) => {
    this.setState({ isLightTheme: theme });
  };

  render() {
    return (
      <ThemeContext.Provider value={{ ...this.state, toggleTheme: this.toggleTheme, setTheme: this.setTheme }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
