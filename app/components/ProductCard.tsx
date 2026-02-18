'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import StarRating from './StarRating';


interface Product {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const inWishlist = isInWishlist(product._id);
  const discountPercentage = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login?redirect=' + window.location.pathname);
      return;
    }

    if (product.quantity === 0) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product._id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/login?redirect=' + window.location.pathname);
      return;
    }

    setIsTogglingWishlist(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-green-500 hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover p-4 group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.quantity === 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              Out of Stock
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick Actions - Show on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleWishlist}
            disabled={isTogglingWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              inWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'
            } shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isTogglingWishlist ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.ratingsAverage} size="sm" />
          <span className="text-xs text-gray-500">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            {product.priceAfterDiscount || product.price} EGP
          </span>
          {product.priceAfterDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {product.price} EGP
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.quantity === 0}
          className="w-full py-2.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group-hover:scale-105"
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : product.quantity === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}