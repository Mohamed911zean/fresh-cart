'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/app/lib/axios';
import { useAuth } from '@/app/context/AuthContext';
import toast from 'react-hot-toast';

interface WishlistItem {
    _id: string;
    title: string;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    ratingsAverage: number;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    wishlistCount: number;
    isLoading: boolean;
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    getWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const { token, isAuthenticated } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getWishlist = async () => {
        if (!token || !isAuthenticated) {
            setWishlistItems([]);
            setWishlistCount(0);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await apiClient.get('/wishlist');
            
            if (data.status === 'success') {
                setWishlistItems(data.data || []);
                setWishlistCount(data.count || data.data?.length || 0);
            }
        } catch (error: any) {
            console.error('Failed to fetch wishlist:', error);
            
            // If 404 or 500, just set empty
            if (error.response?.status === 404 || error.response?.status === 500) {
                setWishlistItems([]);
                setWishlistCount(0);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && token) {
            getWishlist();
        } else {
            setWishlistItems([]);
            setWishlistCount(0);
        }
    }, [token, isAuthenticated]);

    const addToWishlist = async (productId: string) => {
        if (!token || !isAuthenticated) {
            toast.error('Please login to add to wishlist');
            return;
        }
        
        try {
            const { data } = await apiClient.post('/wishlist', { productId });
            
            if (data.status === 'success') {
                toast.success(data.message || 'Added to wishlist!');
                await getWishlist(); // Refresh wishlist
            }
        } catch (error: any) {
            console.error('Failed to add to wishlist:', error);
            if (error.response?.status !== 500) {
                toast.error(error.response?.data?.message || 'Failed to add to wishlist');
            }
        }
    };

    const removeFromWishlist = async (productId: string) => {
        if (!token || !isAuthenticated) return;
        
        try {
            const { data } = await apiClient.delete(`/wishlist/${productId}`);
            
            if (data.status === 'success') {
                toast.success('Removed from wishlist');
                await getWishlist(); // Refresh wishlist
            }
        } catch (error: any) {
            console.error('Failed to remove from wishlist:', error);
            if (error.response?.status !== 500) {
                toast.error('Failed to remove from wishlist');
            }
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item._id === productId);
    };

    return (
        <WishlistContext.Provider 
            value={{ 
                wishlistItems, 
                wishlistCount,
                isLoading, 
                addToWishlist, 
                removeFromWishlist, 
                isInWishlist,
                getWishlist
            }}
        >
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