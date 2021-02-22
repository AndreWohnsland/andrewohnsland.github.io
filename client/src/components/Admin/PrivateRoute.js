import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, path, children }) => {
  return (
    <>
      {isAuth !== null && (
        <>
          {isAuth ? (
            <Route exact path={path}>
              {children}
            </Route>
          ) : (
            <Redirect to="/" />
          )}
        </>
      )}
    </>
  );
};
export default PrivateRoute;
