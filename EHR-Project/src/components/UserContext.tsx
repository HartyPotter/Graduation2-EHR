// src/contexts/UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user: auth0User, isLoading: auth0Loading } = useAuth0();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from local storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(auth0Loading);
  }, [auth0Loading]);

  // Save user data to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Update user state when authentication state changes
  useEffect(() => {
    if (isAuthenticated && auth0User) {
      const role = auth0User['https://your-app/roles']?.[0] || 'patient'; // Default role
      console.log("Auth0 role:" ,auth0User['https://your-app/roles']?.[0])
      const newUser = {
        name: auth0User.nickname || '',
        email: auth0User.email || '',
        role: role,
      };
      setUser(newUser);
    } else {
      setUser(null);
    }
  }, [isAuthenticated, auth0User]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
