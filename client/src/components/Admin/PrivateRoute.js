import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, path, component }) => {
  return (
    <>
      {isAuth !== null && (
        <>
          {isAuth ? (
            <Route exact path={path} component={component} />
          ) : (
            <Redirect to="/" />
          )}
        </>
      )}
    </>
  );
};
export default PrivateRoute;
