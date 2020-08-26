import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends Component {
  static contextType = ThemeContext;
  render() {
    const { toggleTheme, isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;
    const buttonStyle = {
      borderRadius: '5px',
      backgroundColor: theme.bg,
      color: theme.syntax,
    };
    return (
      <div>
        <button style={buttonStyle} onClick={toggleTheme}>
          Theme: {isLightTheme ? 'light' : 'dark'}
        </button>
      </div>
    );
  }
}

export default ThemeToggle;
