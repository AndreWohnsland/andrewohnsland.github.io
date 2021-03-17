import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './sliderStyle.scss';

const ThemeToggle: React.FC = () => {
  const { getCachedTheme, isLightTheme, setTheme } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const inactiveFont = { color: '#ececec80' };
  const activeFont = { color: 'rgb(245, 245, 245)' };
  const darkfont = isLightTheme ? inactiveFont : activeFont;
  const lightfont = isLightTheme ? activeFont : inactiveFont;

  useEffect(() => {
    setIsChecked(!getCachedTheme());
  }, [getCachedTheme]);

  const toggleCheckboxChange = (): void => {
    setTheme(isChecked);
    setIsChecked(!isChecked);
  };

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
            onChange={toggleCheckboxChange}
          />
          <span className="slider round" />
        </label>
        <p className="themefont" style={darkfont}>
          &nbsp;Dark&nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </>
  );
};

export default ThemeToggle;
