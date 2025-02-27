import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null)
    });

    return () => unsubscribe()
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);
