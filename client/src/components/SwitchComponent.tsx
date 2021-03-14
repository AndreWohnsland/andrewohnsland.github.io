import React, { useContext, FunctionComponent } from 'react';
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
import PictureDelete from './Admin/PictureDelete';
import PictureList from './PictureView/PictureList';

const SwitchComponent: FunctionComponent = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route path="/about" component={About} />

      <Route exact path="/projects">
        <ListView elementType="project" header="My Projects" />
      </Route>

      <Route exact path="/project/:_id">
        <ElementView elementType="project" />
      </Route>

      <Route exact path="/blog">
        <ListView elementType="blog" header="It's Storytime" />
      </Route>

      <Route exact path="/blog/:_id">
        <ElementView elementType="blog" />
      </Route>

      <Route exact path="/pictures/fotography">
        <PictureList title="Fotography" />
      </Route>

      <Route exact path="/pictures/woodwork">
        <PictureList title="Woodwork" />
      </Route>

      <Route path="/admin/login" component={Login} />

      <PrivateRoute path="/admin/projects" isAuth={isAuth}>
        <EditComponent elementType="project" />
      </PrivateRoute>

      <PrivateRoute path="/admin/blog" isAuth={isAuth}>
        <EditComponent elementType="blog" />
      </PrivateRoute>

      <PrivateRoute path="/admin/image/delete" isAuth={isAuth}>
        <PictureDelete />
      </PrivateRoute>

      <PrivateRoute path="/admin/image" isAuth={isAuth}>
        <PictureUpload />
      </PrivateRoute>

      <PrivateRoute path="/admin/changepassword" isAuth={isAuth}>
        <ChangePassword />
      </PrivateRoute>

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default SwitchComponent;
