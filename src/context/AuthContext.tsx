import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  loginDemoAdmin: () => void;
  loginDemoCustomer: () => void;
}

const DEFAULT_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Karan Mehra (Studio Director)',
    email: 'admin@shootbook.com',
    phone: '+91 99000 11223',
    role: 'admin',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cust-demo',
    name: 'Rohit Verma',
    email: 'rohit@example.com',
    phone: '+91 98450 12345',
    role: 'customer',
    city: 'Bangalore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('shootbook_current_user');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Default to the customer for immediate exploration
    return DEFAULT_USERS[1];
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('shootbook_auth_token') || 'sb_jwt_sample_token_2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('shootbook_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shootbook_current_user');
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    let usersList: User[] = DEFAULT_USERS;
    try {
      const stored = localStorage.getItem('shootbook_all_users');
      if (stored) usersList = [...DEFAULT_USERS, ...JSON.parse(stored)];
    } catch {
      // fallback
    }

    const found = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      const generatedToken = `sb_jwt_${found.id}_${Date.now()}`;
      setToken(generatedToken);
      localStorage.setItem('shootbook_auth_token', generatedToken);
      return true;
    }

    // Auto-create customer if not existing
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      phone: '+91 98000 00000',
      role: email.includes('admin') ? 'admin' : 'customer',
      city: 'Mumbai'
    };
    setUser(newUser);
    const genToken = `sb_jwt_${newUser.id}_${Date.now()}`;
    setToken(genToken);
    localStorage.setItem('shootbook_auth_token', genToken);
    return true;
  };

  const register = async (name: string, email: string, phone: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      city: 'Mumbai'
    };

    try {
      const stored = localStorage.getItem('shootbook_all_users');
      const list = stored ? JSON.parse(stored) : [];
      list.push(newUser);
      localStorage.setItem('shootbook_all_users', JSON.stringify(list));
    } catch {
      // ignore
    }

    setUser(newUser);
    const genToken = `sb_jwt_${newUser.id}_${Date.now()}`;
    setToken(genToken);
    localStorage.setItem('shootbook_auth_token', genToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('shootbook_current_user');
    localStorage.removeItem('shootbook_auth_token');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
  };

  const loginDemoAdmin = () => {
    setUser(DEFAULT_USERS[0]);
    setToken('sb_jwt_admin_token_2026');
  };

  const loginDemoCustomer = () => {
    setUser(DEFAULT_USERS[1]);
    setToken('sb_jwt_customer_token_2026');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateProfile,
        loginDemoAdmin,
        loginDemoCustomer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
