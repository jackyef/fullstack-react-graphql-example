import * as React from 'react';
import { FetchState } from '../../utils/fetch';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData;
  state: FetchState;
  error?: Error;
}

type AuthContextAPI = AuthState & {
  logout?: () => void;
  isAuthenticated: boolean;
}

const authEndpoint = `/api/auth/status`;
const logoutEndpoint = `/api/auth/logout`;

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: '',
    name: '',
    email: '',
    role: '',
  },
  state: 'idle',
};

export const AuthContext = React.createContext<AuthContextAPI>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    /**
     * @todo
     * need to call API to check auth status here
     * retry if failed
    */
    setState(prev => ({
      ...prev,
      state: 'in-flight',
    }));

    fetch(authEndpoint).then(res => {
      return res.json();
    }).then((json: UserData) => {
      setState({
        isAuthenticated: Boolean(json.id),
        user: json,
        state: 'done',
      });
    }).catch((err: Error) => {
      setState({
        isAuthenticated: false,
        user: initialState.user,
        state: 'error',
        error: err,
      });
    });
  }, []);

  const logout = () => {
    fetch(logoutEndpoint).then(() => {
      setState({ ...initialState, state: 'done' });
    });
  }

  const authAPIs = {
    ...state,
    logout,
  }

  return (
    <AuthContext.Provider value={authAPIs}>
      {children}
    </AuthContext.Provider>
  )
}