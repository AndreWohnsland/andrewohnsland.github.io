import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import { ThemeContext } from './contexts/ThemeContext';
import SwitchComponent from './components/SwitchComponent';

class App extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = ThemeContext;

  render() {
    const { isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;
    const style = { backgroundColor: theme.bg, color: theme.syntax };
    return (
      <>
        <BrowserRouter>
          <div className="App">
            <div className="content-container" style={style}>
              <NavBar />
              <div className="main">
                <SwitchComponent />
              </div>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
