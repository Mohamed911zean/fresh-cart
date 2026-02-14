'use client'

import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import type { Product } from "@/app/lib/api";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/products/${product._id}`}
            className="
                group relative bg-white rounded-2xl border border-[var(--border)]
                overflow-hidden transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10
                hover:border-[var(--primary)]
            "
        >
            {/* Image */}
            <div className="relative aspect-square bg-[var(--bg-light)] overflow-hidden">
                <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* Wishlist */}
                <button
                    className="
                        absolute top-3 right-3 w-9 h-9 rounded-full
                        bg-white/90 backdrop-blur flex items-center justify-center
                        text-[var(--text-gray)]
                        hover:text-red-500 hover:scale-105
                        shadow-md transition-all
                        opacity-0 translate-y-2
                        group-hover:opacity-100 group-hover:translate-y-0
                    "
                >
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                            -1.935 0-3.597 1.126-4.312 2.733
                            -.715-1.607-2.377-2.733-4.313-2.733
                            C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                    {product.category.name}
                </span>

                <h3 className="text-sm font-semibold text-[var(--text-dark)] line-clamp-2 leading-snug min-h-[2.6rem]">
                    {product.title}
                </h3>

                <div className="flex items-center gap-1.5">
                    <StarRating rating={product.ratingsAverage} />
                    <span className="text-xs text-[var(--text-gray)]">
                        {product.ratingsAverage.toFixed(1)}
                    </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-bold text-[var(--text-dark)]">
                        {product.price.toLocaleString()}
                        <span className="ml-1 text-xs font-normal text-[var(--text-gray)]">
                            EGP
                        </span>
                    </p>

                    <button
                        className="
                            flex items-center gap-2 h-9 px-3
                            rounded-xl bg-[var(--primary)] text-white
                            font-semibold text-sm
                            shadow-md shadow-[var(--primary)]/30
                            transition-all duration-300
                            hover:bg-[var(--primary-dark)]
                            hover:scale-[1.03]
                        "
                    >
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        <span className="hidden group-hover:inline-block animate-fadeIn">
                            Add
                        </span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-4px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </Link>
    );
}
