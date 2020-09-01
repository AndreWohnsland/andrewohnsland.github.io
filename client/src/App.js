import React, { Component } from 'react';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import { ThemeContext } from './contexts/ThemeContext';
import { ReactQueryDevtools } from 'react-query-devtools';
import SwitchComponent from './components/SwitchComponent';

class App extends Component {
  static contextType = ThemeContext;

  render() {
    const { isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;
    const style = { backgroundColor: theme.bg, color: theme.syntax };
    return (
      <>
        <BrowserRouter>
          <div className='App'>
            <div className='content-container' style={style}>
              <NavBar />
              <div className='main'>
                <SwitchComponent />
              </div>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    );
  }
}

export default App;
