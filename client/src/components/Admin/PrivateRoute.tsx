import React from 'react';

import { Route, Redirect } from 'react-router-dom';

type PrivateRouterProps = {
  isAuth: boolean | null;
  path: string;
};

const PrivateRoute: React.FC<PrivateRouterProps> = ({
  isAuth,
  path,
  children,
}) => {
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
