export type AuthState = {
    user: unknown | null;
    loading: boolean;
    error: unknown | null;
  };
  
  export type AuthAction =
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS"; payload: unknown }
    | { type: "LOGIN_FAILED"; payload: unknown }
    | { type: "LOGOUT" };
  
  export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          loading: true,
          error: null,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          loading: false,
          error: null,
        };
      case "LOGIN_FAILED":
        return {
          user: null,
          loading: false,
          error: action.payload,
        };
      case "LOGOUT":
        return {
          user: null,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };