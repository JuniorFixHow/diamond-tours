import { createContext, useEffect, useReducer } from "react";
import { AuthReducer, AuthState, AuthAction } from "./AuthReducer";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE: AuthState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    loading: false,
    error: null,
  };

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    if (state.user) {
      navigate("/");
    } else {
      navigate("login");
    }
  }, [state.user, navigate]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};