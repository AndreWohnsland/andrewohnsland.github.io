import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './sliderStyle.scss';

const ThemeToggle: React.FC = () => {
  const { getCachedTheme, isLightTheme, setTheme } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const lightfont = isLightTheme ? 'active' : 'inactive';
  const darkfont = isLightTheme ? 'inactive' : 'active';

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
        <p className={`themefont lightmode ${lightfont}`} aria-label="sun">
          ☀️
        </p>
        <label className="switch">
          <input
            type="checkbox"
            checked={!isLightTheme}
            onChange={toggleCheckboxChange}
          />
          <span className="slider round" />
        </label>
        <p
          className={`themefont darkmode ${darkfont}`}
          arial-label="Crescent Moon"
        >
          🌙
        </p>
      </div>
    </>
  );
};

export default ThemeToggle;
