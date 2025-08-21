import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

import './sliderStyle.scss'

const ThemeToggle: React.FC = () => {
  const { getCachedTheme, isLightTheme, setTheme } = useContext(ThemeContext)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const lightfont = isLightTheme ? 'active' : 'inactive'
  const darkfont = isLightTheme ? 'inactive' : 'active'

  useEffect(() => {
    setIsChecked(!getCachedTheme())
  }, [getCachedTheme])

  const toggleCheckboxChange = (): void => {
    setTheme(isChecked)
    setIsChecked(!isChecked)
  }

  return (
    <div className="sliderholder">
      <span
        className={`themefont lightmode ${lightfont} icon-center`}
        aria-label="sun"
      >
        <FaSun size={24} />
      </span>
      <label className="switch">
        <input
          type="checkbox"
          checked={!isLightTheme}
          onChange={toggleCheckboxChange}
        />
        <span className="slider round" />
      </label>
      <span
        className={`themefont darkmode ${darkfont} icon-center`}
        aria-label="Crescent Moon"
      >
        <FaMoon size={22} />
      </span>
    </div>
  )
}

export default ThemeToggle
