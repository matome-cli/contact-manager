import { createContext, useState } from "react";

export type ContextType = {
  isAuth: boolean;
  email: string;
  updateUserEmail: (email: string) => void;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<ContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  function updateUserEmail(email: string): void {
    setEmail(email);
  }

  function login(): void {
    setIsAuth(true);
  }

  function logout(): void {
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, email, updateUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
