'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
    wishlistItems: any[];
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);

    const headers = {
        token: token || '',
    };

    const getWishlist = async () => {
        if (!token) {
            setWishlistItems([]);
            return;
        }

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
            if (data.status === 'success') {
                setWishlistItems(data.data);
            }
        } catch (error) {
            console.error(error);
            setWishlistItems([]);
        }
    };

    useEffect(() => {
        getWishlist();
    }, [token]);

    const addToWishlist = async (productId: string) => {
        if (!token) {
            toast.error('Please login to add to wishlist');
            return;
        }
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers });
            if (data.status === 'success') {
                toast.success(data.message);
                // Refresh list
                getWishlist();
            }
        } catch (error: any) {
            toast.error('Failed to add to wishlist');
            console.error(error);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            if (data.status === 'success') {
                toast.success('Removed from wishlist');
                // Refresh list
                getWishlist();
            }
        } catch (error) {
            toast.error('Failed to remove from wishlist');
            console.error(error);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
