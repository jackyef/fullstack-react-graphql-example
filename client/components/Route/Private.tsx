import * as React from 'react';
import { AuthContext } from '../../context/auth';
import Router from 'next/Router';

interface Props {
  Fallback: React.ElementType;
}

export const PrivateRoute: React.FC<Props> = ({ children, Fallback }) => {
  const auth = React.useContext(AuthContext);

  console.log({ auth })

  if (auth.state !== 'done') {
    return <Fallback />
  }

  if (auth.userId < 1) {
    // redirect to login
    Router.push('/auth/login');

    return null;
  }

  return <>{children}</>;
}
