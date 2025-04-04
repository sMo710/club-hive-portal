
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('club-hive-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { user: userData } = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('club-hive-user', JSON.stringify(userData));
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    setIsLoading(true);
    try {
      const { user: userData } = await authService.register(name, email, password, role);
      setUser(userData);
      localStorage.setItem('club-hive-user', JSON.stringify(userData));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('club-hive-user');
    toast.success('Logged out successfully');
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    try {
      // For a student project, we'll just simulate this
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset email');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setIsLoading(true);
    try {
      // For a student project, we'll just simulate this
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password has been reset successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to reset password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
