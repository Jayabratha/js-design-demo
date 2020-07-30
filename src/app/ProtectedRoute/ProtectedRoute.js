import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ component: Component, comProps = {}, user, ...rest }) {
  console.log('protection');  
  return (
    <Route {...rest} render={(props) => {
      return user
        ? <Component {...comProps} />
        : <Redirect to="/auth" />
    }} ></Route>
  )
}
