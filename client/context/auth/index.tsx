import * as React from 'react';
import { FetchState } from '../../utils/fetch';

interface AuthState {
  userId: number;
  state: FetchState;
}

const initialState: AuthState = {
  userId: 0,
  state: 'idle',
};

export const AuthContext = React.createContext(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    /**
     * @todo
     * need to call API to check auth status here
     * retry if failed
     */
    console.log('checking auth state...')
    console.log('user is not authenticated! (actually not implemented yet)')

    setTimeout(() => {
      console.log('manually set auth state to done')
      setState(prev => ({
        ...prev,
        state: 'done',
      }))
    }, 500)
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  )
}