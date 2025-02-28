import { createContext, useContext, useState, useEffect } from "react";

// Authentication Context
const AuthContext = createContext<{
  isLoggedIN: boolean;
  setLoggedIN: (loggedIn: boolean) => void;
}>({
  isLoggedIN: false,
  setLoggedIN: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIN, setIsLoggedIN] = useState(() => {
    // Initialize from localStorage
    const savedState = localStorage.getItem("isLoggedIN");
    return savedState === "true"; // Convert to boolean
  });

  const setLoggedIN = (loggedIn: boolean) => {
    setIsLoggedIN(loggedIn);
    localStorage.setItem("isLoggedIN", String(loggedIn));
  };

  useEffect(() => {
    const savedState = localStorage.getItem("isLoggedIN");
    if (savedState === "true") {
      setIsLoggedIN(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIN, setLoggedIN }}>
      {children}
    </AuthContext.Provider>
  );
};
