

import Image from "next/image";
import { getProduct, getProducts } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";
import StarRating from "@/app/components/StarRating";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);
    return {
        title: `${product.title} — FreshCart`,
        description: product.description?.slice(0, 160),
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);
    const relatedProducts = await getProducts(5);

    const allImages = [product.imageCover, ...product.images];

    return (
        <div className="bg-[var(--bg-light)] min-h-screen">
            {/* 🎨 Enhanced Breadcrumb */}
            <div className="bg-white border-b border-[var(--border)] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <a href="/" 
                           className="text-[var(--text-gray)] hover:text-[var(--primary)] 
                                      transition-all duration-200 hover:underline
                                      flex items-center gap-1 group">
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" 
                                 fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Home
                        </a>
                        <svg className="w-4 h-4 text-[var(--text-gray)]" fill="none" stroke="currentColor" 
                             strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <a href="/products" 
                           className="text-[var(--text-gray)] hover:text-[var(--primary)] 
                                      transition-colors hover:underline">
                            Products
                        </a>
                        <svg className="w-4 h-4 text-[var(--text-gray)]" fill="none" stroke="currentColor" 
                             strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-[var(--text-dark)] font-medium truncate max-w-[300px]">
                            {product.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* 🎨 Enhanced Product Detail Card */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden 
                                shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        
                        {/* 🎨 Enhanced Image Gallery */}
                        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-[var(--border)] 
                                        bg-gradient-to-br from-[var(--bg-light)] to-white">
                            {/* Main Image with Hover Effect */}
                            <div className="aspect-square rounded-2xl overflow-hidden bg-white 
                                            mb-6 border border-[var(--border)] group relative
                                            shadow-md hover:shadow-xl transition-all duration-300">
                                <Image
                                    src={product.imageCover}
                                    alt={product.title}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-contain p-8 
                                               group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                                
                                {/* 🎨 Hover Overlay with Icons */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 
                                                transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="w-12 h-12 bg-white rounded-full flex items-center 
                                                         justify-center shadow-lg hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-[var(--text-dark)]" fill="none" 
                                                 stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" 
                                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 🎨 Enhanced Thumbnails */}
                            <div className="grid grid-cols-4 gap-3">
                                {allImages.slice(0, 4).map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`aspect-square rounded-xl overflow-hidden bg-white 
                                                    border-2 cursor-pointer transition-all duration-300
                                                    hover:scale-105 hover:shadow-md
                                                    ${idx === 0 
                                                        ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20 shadow-md" 
                                                        : "border-[var(--border)] hover:border-[var(--primary)]"
                                                    }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.title} ${idx + 1}`}
                                            width={150}
                                            height={150}
                                            className="w-full h-full object-contain p-2 
                                                       hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🎨 Enhanced Product Info */}
                        <div className="p-6 md:p-10 flex flex-col">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 mb-3">
                                <span className="px-3 py-1.5 bg-[var(--primary-light)] text-[var(--primary)] 
                                                 rounded-full text-xs font-bold uppercase tracking-wide
                                                 border border-[var(--primary)]/20">
                                    {product.category.name}
                                </span>
                                {product.quantity > 0 && (
                                    <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full 
                                                     text-xs font-semibold flex items-center gap-1
                                                     border border-green-200">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        In Stock
                                    </span>
                                )}
                            </div>
                            
                            {/* Product Title with Animation */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-dark)] 
                                           mb-4 leading-tight animate-fade-in">
                                {product.title}
                            </h1>

                            {/* Enhanced Rating */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--border)]">
                                <div className="flex items-center gap-2">
                                    <StarRating rating={product.ratingsAverage} />
                                    <span className="text-lg font-bold text-[var(--text-dark)]">
                                        {product.ratingsAverage}
                                    </span>
                                </div>
                                <span className="text-sm text-[var(--text-gray)]">
                                    ({product.ratingsQuantity} reviews)
                                </span>
                                <button className="text-sm text-[var(--primary)] hover:underline font-medium
                                                   hover:text-[var(--primary-dark)] transition-colors">
                                    Write a review
                                </button>
                            </div>

                            {/* 🎨 Enhanced Price with Animation */}
                           <div className="flex items-center gap-3">
  <span className="text-2xl font-bold text-[var(--primary)]">
    ${product.price}
  </span>

  <span className="text-sm line-through text-gray-400">
    ${product.price}
  </span>

  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-sm font-bold">
    -20%
  </span>
</div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-[var(--text-dark)] uppercase 
                                               tracking-wide mb-3">
                                    Description
                                </h3>
                                <p className="text-sm text-[var(--text-gray)] leading-relaxed 
                                              whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            {/* 🎨 Enhanced Quantity Selector & Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                {/* Quantity Selector */}
                                <div className="flex items-center border-2 border-[var(--border)] rounded-xl 
                                                overflow-hidden hover:border-[var(--primary)] transition-colors
                                                bg-white">
                                    <button className="w-12 h-12 flex items-center justify-center 
                                                       text-[var(--text-gray)] hover:bg-[var(--bg-light)] 
                                                       hover:text-[var(--primary)] transition-all 
                                                       text-xl font-bold active:scale-90">
                                        −
                                    </button>
                                    <span className="w-16 h-12 flex items-center justify-center 
                                                     text-base font-bold border-x-2 border-[var(--border)]
                                                     bg-[var(--bg-light)]">
                                        1
                                    </span>
                                    <button className="w-12 h-12 flex items-center justify-center 
                                                       text-[var(--text-gray)] hover:bg-[var(--bg-light)] 
                                                       hover:text-[var(--primary)] transition-all 
                                                       text-xl font-bold active:scale-90">
                                        +
                                    </button>
                                </div>
                                
                                {/* Add to Cart Button */}
                                <button className="flex-1 h-12 bg-[var(--primary)] text-white rounded-xl 
                                                   font-bold text-base hover:bg-[var(--primary-dark)] 
                                                   transition-all duration-300 shadow-lg 
                                                   shadow-[var(--primary)]/30 hover:shadow-xl
                                                   hover:shadow-[var(--primary)]/40
                                                   flex items-center justify-center gap-2
                                                   active:scale-95 group">
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" 
                                         fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                
                                {/* Wishlist Button */}
                                <button className="w-12 h-12 border-2 border-[var(--border)] rounded-xl 
                                                   flex items-center justify-center text-[var(--text-gray)] 
                                                   hover:text-red-500 hover:border-red-200 hover:bg-red-50 
                                                   transition-all duration-300 shrink-0 group
                                                   active:scale-90">
                                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform 
                                                    group-hover:fill-red-500" 
                                         fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                            </div>

                            {/* 🎨 Buy Now Button (New) */}
                            <button className="w-full h-12 mb-8 bg-[var(--text-dark)] text-white rounded-xl 
                                               font-bold text-base hover:bg-opacity-90 
                                               transition-all duration-300 shadow-lg
                                               flex items-center justify-center gap-2
                                               active:scale-95 group">
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                                     fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                                Buy Now
                            </button>

                            {/* 🎨 Enhanced Product Meta */}
                            <div className="border-t border-[var(--border)] pt-6 space-y-4 mt-auto">
                                <div className="flex items-start gap-4">
                                    <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 shrink-0" 
                                         fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                    </svg>
                                    <div className="flex-1">
                                        <span className="text-sm font-semibold text-[var(--text-dark)] block mb-1">
                                            Brand
                                        </span>
                                        <span className="text-sm text-[var(--text-gray)]">
                                            {product.brand.name}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 shrink-0" 
                                         fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                    <div className="flex-1">
                                        <span className="text-sm font-semibold text-[var(--text-dark)] block mb-1">
                                            Availability
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-medium ${
                                                product.quantity > 0 ? "text-[var(--primary)]" : "text-red-500"
                                            }`}>
                                                {product.quantity > 0 
                                                    ? `${product.quantity} units in stock` 
                                                    : "Out of stock"}
                                            </span>
                                            {product.quantity > 0 && product.quantity < 10 && (
                                                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 
                                                                 rounded text-xs font-semibold">
                                                    Low Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 shrink-0" 
                                         fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    <div className="flex-1">
                                        <span className="text-sm font-semibold text-[var(--text-dark)] block mb-1">
                                            Total Sold
                                        </span>
                                        <span className="text-sm text-[var(--text-gray)]">
                                            {product.sold.toLocaleString()} units
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 🎨 Trust Badges (New) */}
                            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[var(--border)]">
                                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                                    <svg className="w-6 h-6 text-green-600 mx-auto mb-1" fill="none" 
                                         stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m17.25 0V3.375c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v10.875m16.5 0h-16.5" />
                                    </svg>
                                    <span className="text-xs font-semibold text-green-700">Free Delivery</span>
                                    <p className="text-[10px] text-green-600 mt-0.5">Orders over 500</p>
                                </div>
                                
                                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                                    <svg className="w-6 h-6 text-blue-600 mx-auto mb-1" fill="none" 
                                         stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                                    </svg>
                                    <span className="text-xs font-semibold text-blue-700">30 Day Return</span>
                                    <p className="text-[10px] text-blue-600 mt-0.5">Money back</p>
                                </div>
                                
                                <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
                                    <svg className="w-6 h-6 text-purple-600 mx-auto mb-1" fill="none" 
                                         stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" 
                                              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-purple-700">Secure Payment</span>
                                    <p className="text-[10px] text-purple-600 mt-0.5">100% Protected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🎨 Enhanced Related Products Section */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-dark)]">
                            You May Also <span className="text-[var(--primary)]">Like</span>
                        </h2>
                        <p className="text-sm text-[var(--text-gray)] mt-1">
                            Similar products you might be interested in
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <button className="w-10 h-10 rounded-full border-2 border-[var(--border)] 
                                           flex items-center justify-center hover:border-[var(--primary)] 
                                           hover:text-[var(--primary)] transition-all
                                           hover:scale-110 active:scale-95">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} 
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full border-2 border-[var(--border)] 
                                           flex items-center justify-center hover:border-[var(--primary)] 
                                           hover:text-[var(--primary)] transition-all
                                           hover:scale-110 active:scale-95">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} 
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}