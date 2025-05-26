import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Este contexto se utiliza para manejar la autenticación del usuario en la aplicación.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
