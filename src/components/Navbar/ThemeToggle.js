import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './sliderStyle.css';

class ThemeToggle extends Component {
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
    setTheme(this.state.isChecked);
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }));
  };

  render() {
    const { isLightTheme } = this.context;

    const inactiveFont = { color: '#ececec80' };
    const activeFont = { color: 'rgb(245, 245, 245)' };
    const darkfont = isLightTheme ? inactiveFont : activeFont;
    const lightfont = isLightTheme ? activeFont : inactiveFont;
    return (
      <>
        <div className='sliderholder'>
          <p className='themefont' style={lightfont}>
            Light{'\u00a0'}
          </p>
          <label className='switch'>
            <input type='checkbox' checked={!isLightTheme} onChange={this.toggleCheckboxChange} />
            <span className='slider round'></span>
          </label>
          <p className='themefont' style={darkfont}>
            {'\u00a0'}Dark {'\u00a0\u00a0\u00a0'}
          </p>
        </div>
      </>
    );
  }
}

export default ThemeToggle;
