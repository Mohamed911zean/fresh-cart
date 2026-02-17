'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import apiClient from '@/app/lib/axios';
import Cookies from 'js-cookie';
import { decodeJWT, isTokenExpired } from '@/app/utils/jwtUtils';

interface User {
  name: string;
  email: string;
  role: string;
  id?: string; 
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  userId: string | null; 
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('freshCartToken') || Cookies.get('freshCartToken');
        const storedUser = localStorage.getItem('freshCartUser');
        const storedUserId = localStorage.getItem('freshCartUserId');

        if (storedToken && storedUser) {

          if (isTokenExpired(storedToken)) {
            console.log('Token expired - clearing auth data');
            clearAuthData();
            toast.error('Session expired. Please login again.');
            return;
          }
          
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          

          if (!storedUserId) {
            const decoded = decodeJWT(storedToken);
            if (decoded?.id) {
              setUserId(decoded.id);
              localStorage.setItem('freshCartUserId', decoded.id);
            }
          } else {
            setUserId(storedUserId);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const saveAuthData = (token: string, user: User) => {

    const decoded = decodeJWT(token);
    const extractedUserId = decoded?.id || user.id;
    
    setToken(token);
    setUser(user);
    setUserId(extractedUserId || null);
    
    localStorage.setItem('freshCartToken', token);
    localStorage.setItem('freshCartUser', JSON.stringify(user));
    
    if (extractedUserId) {
      localStorage.setItem('freshCartUserId', extractedUserId);
    }
    

    Cookies.set('freshCartToken', token, {
      expires: 90,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  };


  const clearAuthData = () => {
    setToken(null);
    setUser(null);
    setUserId(null);
    localStorage.removeItem('freshCartToken');
    localStorage.removeItem('freshCartUser');
    localStorage.removeItem('freshCartUserId');
    Cookies.remove('freshCartToken');
  };

  const login = async (values: any) => {
    try {
      setIsLoading(true);
      
      const loadingToast = toast.loading('Logging in...');
      
      const { data } = await apiClient.post('/auth/signin', values);

      toast.dismiss(loadingToast);

      if (data.message === 'success') {
        const { token, user } = data;
        saveAuthData(token, user);
        toast.success('Welcome back!');
        

        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get('redirect') || '/';
        router.push(redirect);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Login is taking longer than usual. Please try again.');
      } else if (error.message === 'Network Error') {
        toast.error('Cannot connect to server. Please check your internet.');
      } else if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: any) => {
    try {
      setIsLoading(true);
      
      const loadingToast = toast.loading('Creating your account...');
      
      const { data } = await apiClient.post('/auth/signup', values);

      toast.dismiss(loadingToast);

      if (data.message === 'success') {
        const { token, user } = data;
        saveAuthData(token, user);
        toast.success('Account created successfully!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Register error:', error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('Registration is taking longer than usual. Please try again.');
      } else if (error.response?.status === 409) {
        toast.error('Email already exists. Please login instead.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const refreshUser = async () => {
    try {
      if (!token) return;
      
      const storedUser = localStorage.getItem('freshCartUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    token,
    userId, 
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};