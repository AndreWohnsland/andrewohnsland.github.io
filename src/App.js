import React, { Component } from 'react';
import NavBar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Project from './components/Project';
import tmpData from './dummydata/tmp';
import Footer from './components/Footer';
import { ThemeContext } from './contexts/ThemeContext';

class App extends Component {
  static contextType = ThemeContext;
  state = {
    projects: tmpData,
  };
  render() {
    const { isLightTheme, light, dark } = this.context;
    const theme = isLightTheme ? light : dark;
    const style = { backgroundColor: theme.bg, color: theme.syntax };
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='content-container' style={style}>
            <NavBar />
            <div className='main'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/projects' component={() => <Projects projects={this.state.projects} />} />
                <Route path='/project/:project_id' component={Project} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
