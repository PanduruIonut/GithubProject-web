import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LocalStorageHelper from './helpers/local-storage-helper';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const isLogged = LocalStorageHelper.GetItemFromLocalStorage('isLogged');
  return (
    <Route
      {...rest}
      render={routeProps =>
        isLogged ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};
export default PrivateRoute;
