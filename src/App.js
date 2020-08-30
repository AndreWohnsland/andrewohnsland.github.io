import React, { Component } from 'react';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ListView from './components/ListView/ListView';
import ElementView from './components/ListView/ElementView';
import tmpData from './dummydata/tmp';
import Footer from './components/Footer';
import { ThemeContext } from './contexts/ThemeContext';
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
                  <Route
                    exact
                    path='/projects'
                    component={() => <ListView elementType='project' header='My Projects' />}
                  />
                  <Route
                    exact
                    path='/project/:_id'
                    component={(props) => <ElementView {...props} elementType='project' />}
                  />
                  <Route exact path='/blog' component={() => <ListView elementType='blog' header="It's Storytime" />} />
                  <Route exact path='/blog/:_id' component={(props) => <ElementView {...props} elementType='blog' />} />

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
