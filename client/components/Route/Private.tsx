import * as React from 'react';
import { AuthContext } from '../../context/auth';
import Router from 'next/Router';

interface Props {
  fallback: React.ReactElement;
}

export const PrivateRoute: React.FC<Props> = ({ children, fallback }) => {
  const auth = React.useContext(AuthContext);

  if (auth.state === 'error') {
    return <div>an error happened {auth.error?.toString()}</div>;
  }

  if (auth.state !== 'done') {
    return fallback;
  }

  if (!auth.isAuthenticated && auth.state === 'done') {
    // redirect to login
    Router.push('/auth/login');

    return null;
  }

  return <>{children}</>;
}
