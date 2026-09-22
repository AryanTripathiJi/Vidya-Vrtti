import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, Notification } from '../types';
import { mockApi } from '../lib/mockApi';

interface AuthContextType {
  user: User | null;
  role: Role;
  token: string | null;
  notifications: Notification[];
  unreadCount: number;
  login: (email: string, role?: Role) => Promise<void>;
  register: (data: Partial<User>) => Promise<User>;
  logout: () => void;
  switchRole: (newRole: Role) => void;
  refreshNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => mockApi.getCurrentUser());
  const [role, setRole] = useState<Role>(() => user?.role || 'applicant');
  const [token, setToken] = useState<string | null>(() => (user ? `jwt-token-${user.id}` : null));
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      refreshNotifications();
    }
  }, [user?.id]);

  const refreshNotifications = async () => {
    if (!user) return;
    const notifs = await mockApi.getNotifications(user.role === 'applicant' ? user.id : 'ALL');
    setNotifications(notifs);
  };

  const login = async (email: string, selectedRole?: Role) => {
    const res = await mockApi.login(email, selectedRole);
    setUser(res.user);
    setRole(res.user.role);
    setToken(res.token);
    const notifs = await mockApi.getNotifications(res.user.id);
    setNotifications(notifs);
  };

  const register = async (data: Partial<User>) => {
    const newUser = await mockApi.register(data);
    setUser(newUser);
    setRole(newUser.role);
    setToken(`jwt-token-${newUser.id}`);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('st_setu_current_user');
  };

  const switchRole = (newRole: Role) => {
    setRole(newRole);
    if (user) {
      const updatedUser = { ...user, role: newRole };
      if (newRole === 'officer') {
        updatedUser.name = 'Shri Rajesh Kumar (Verification Officer)';
        updatedUser.email = 'officer@demo.in';
      } else if (newRole === 'committee') {
        updatedUser.name = 'Dr. Meera Sharma (Selection Committee)';
        updatedUser.email = 'committee@demo.in';
      } else if (newRole === 'admin') {
        updatedUser.name = 'Smt. Kavita Rao (MoTA Administrator)';
        updatedUser.email = 'admin@demo.in';
      } else if (newRole === 'institute') {
        updatedUser.name = 'Dr. Ramesh Kumar (Institute Nodal Officer)';
        updatedUser.email = 'institute@demo.in';
      } else {
        updatedUser.name = 'Priya Naik (ST Applicant)';
        updatedUser.email = 'student@demo.in';
      }
      setUser(updatedUser);
      mockApi.setCurrentUser(updatedUser);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    await mockApi.markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        notifications,
        unreadCount,
        login,
        register,
        logout,
        switchRole,
        refreshNotifications,
        markNotificationAsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
