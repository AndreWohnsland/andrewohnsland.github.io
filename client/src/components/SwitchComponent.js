import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListView from './ListView/ListView';
import Home from './Home';
import About from './About';
import ElementView from './ListView/ElementView';
import Login from './Admin/Login';
import EditComponent from './Admin/EditComponent';
import { AuthContext } from '../contexts/AuthContext';
import PrivateRoute from './Admin/PrivateRoute';
import ChangePassword from './Admin/ChangePassword';
import PictureUpload from './Admin/PictureUpload';
import PictureView from './PictureView/PictureList';

const SwitchComponent = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route exact path='/projects' component={() => <ListView elementType='project' header='My Projects' />} />
      <Route exact path='/project/:_id' component={(props) => <ElementView {...props} elementType='project' />} />
      <Route exact path='/blog' component={() => <ListView elementType='blog' header="It's Storytime" />} />
      <Route exact path='/blog/:_id' component={(props) => <ElementView {...props} elementType='blog' />} />
      <Route exact path='/pictures' component={PictureView} />

      <Route path='/admin/login' component={Login} />

      <PrivateRoute path='/admin/projects' isAuth={isAuth} component={() => <EditComponent elementType='project' />} />
      <PrivateRoute path='/admin/blog' isAuth={isAuth} component={() => <EditComponent elementType='blog' />} />
      <PrivateRoute path='/admin/image' isAuth={isAuth} component={PictureUpload} />
      <PrivateRoute path='/admin/changepassword' isAuth={isAuth} component={ChangePassword} />
      <Redirect from='*' to='/' />
    </Switch>
  );
};

export default SwitchComponent;
