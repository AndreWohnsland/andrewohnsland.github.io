import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './sliderStyle.css';

class ThemeToggle extends Component {
  static contextType = ThemeContext;
  state = {
    isChecked: null,
  };

  componentDidMount() {
    const { getCachedTheme } = this.context;
    this.setState({ isChecked: getCachedTheme() });
  }

  render() {
    const { isLightTheme } = this.context;
    const toggleCheckboxChange = () => {
      const { setTheme } = this.context;
      setTheme(this.state.isChecked);
      this.setState(({ isChecked }) => ({
        isChecked: !isChecked,
      }));

      // cacheTheme(this.state.isChecked);
    };
    return (
      <>
        <div className='sliderholder'>
          <p className='themefont'>Dark Theme:{'\u00a0\u00a0'}</p>
          <label className='switch'>
            <input type='checkbox' checked={!isLightTheme} onChange={toggleCheckboxChange} />
            <span className='slider round'></span>
          </label>
          <p className='themefont'>{'\u00a0\u00a0'}</p>
        </div>
      </>
    );
  }
}

export default ThemeToggle;
