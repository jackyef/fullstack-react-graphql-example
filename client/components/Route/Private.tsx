import * as React from 'react';
import { AuthContext } from '../../context/auth';
import Router from 'next/Router';

interface Props {
  fallback: React.ReactElement;
}

export const PrivateRoute: React.FC<Props> = ({ children, fallback }) => {
  const auth = React.useContext(AuthContext);

  React.useLayoutEffect(() => {
    if (!auth.isAuthenticated && auth.state === 'done') {
      // redirect to login
      Router.push('/auth/login');
    }
  });

  if (auth.state !== 'done') {
    return fallback;
  }

  return <>{children}</>;
}
