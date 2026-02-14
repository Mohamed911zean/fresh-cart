'use client'

import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { Toaster } from 'react-hot-toast';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <WishlistProvider>
                <CartProvider>
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </CartProvider>
            </WishlistProvider>
        </AuthProvider>
    );
}
