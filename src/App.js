import React, { Component } from 'react';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects/Projects';
import Project from './components/Projects/Project';
import tmpData from './dummydata/tmp';
import Footer from './components/Footer';
import { ThemeContext } from './contexts/ThemeContext';
import Blog from './components/Blog/Blog';
// import { ReactQueryDevtools } from 'react-query-devtools';
import Login from './components/Admin/Login';
import EditComponent from './components/Admin/EditComponent';

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
      <>
        <BrowserRouter>
          <div className='App'>
            <div className='content-container' style={style}>
              <NavBar />
              <div className='main'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/about' component={About} />
                  <Route path='/projects' component={Projects} />
                  <Route path='/blog' component={Blog} />
                  <Route exact path='/project/:project_id' component={Project} />
                  <Route path='/admin/login' component={Login} />
                  <Route path='/admin/projects' component={() => <EditComponent elementType='project' />} />
                  <Route path='/admin/blog' component={() => <EditComponent elementType='blog' />} />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </>
    );
  }
}

export default App;
