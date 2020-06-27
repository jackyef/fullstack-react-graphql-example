import * as React from 'react';
import { AuthContext } from '../../context/auth';
import Router from 'next/Router';
import { useToast } from '@chakra-ui/core';

interface Props {
  fallback: React.ReactElement;
  ownerOnly?: boolean;
}

export const PrivateRoute: React.FC<Props> = ({ children, fallback, ownerOnly = false }) => {
  const auth = React.useContext(AuthContext);
  const toast = useToast();

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

  if (ownerOnly && auth.user.role !== 'owner') {
    Router.push('/');

    toast({
      title: 'Unauthorized access',
      description: `You are not permitted to do that.`,
      status: 'warning',
    });

    return null;
  } 

  return <>{children}</>;
}
