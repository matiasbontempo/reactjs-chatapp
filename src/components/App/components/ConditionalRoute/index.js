import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ConditionalRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    rest.condition ? (
      <Component {...renderProps} />
    ) : (
      <Redirect to={ {
        pathname: rest.redirect,
        state: {from: renderProps.location}
      } } />
    )
  )}/>
)

export default ConditionalRoute;