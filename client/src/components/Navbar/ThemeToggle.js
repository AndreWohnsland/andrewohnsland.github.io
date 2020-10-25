import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './sliderStyle.css';

class ThemeToggle extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = ThemeContext;

  constructor(props, context) {
    super(props, context);
    const { getCachedTheme } = this.context;
    this.state = {
      isChecked: !getCachedTheme(),
    };
  }

  toggleCheckboxChange = () => {
    const { setTheme } = this.context;
    const { isChecked } = this.state;
    setTheme(isChecked);
    this.setState({ isChecked: !isChecked });
  };

  render() {
    const { isLightTheme } = this.context;

    const inactiveFont = { color: '#ececec80' };
    const activeFont = { color: 'rgb(245, 245, 245)' };
    const darkfont = isLightTheme ? inactiveFont : activeFont;
    const lightfont = isLightTheme ? activeFont : inactiveFont;
    return (
      <>
        <div className="sliderholder">
          <p className="themefont" style={lightfont}>
            Light&nbsp;
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={!isLightTheme}
              onChange={this.toggleCheckboxChange}
            />
            <span className="slider round" />
          </label>
          <p className="themefont" style={darkfont}>
            &nbsp;Dark&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </>
    );
  }
}

export default ThemeToggle;
