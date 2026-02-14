'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (userData: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage on mount
        const storedToken = localStorage.getItem('freshCartToken');
        const storedUser = localStorage.getItem('freshCartUser');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (values: any) => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

            if (data.message === 'success') {
                const { token, user } = data;
                setToken(token);
                setUser(user);
                localStorage.setItem('freshCartToken', token);
                localStorage.setItem('freshCartUser', JSON.stringify(user));
                toast.success('Welcome back!');
                router.push('/');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (values: any) => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)

            if (data.message === 'success') {
                const { token, user } = data;
                setToken(token);
                setUser(user);
                localStorage.setItem('freshCartToken', token);
                localStorage.setItem('freshCartUser', JSON.stringify(user));
                toast.success('Account created successfully!');
                router.push('/');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('freshCartToken');
        localStorage.removeItem('freshCartUser');
        toast.success('Logged out successfully');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
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
