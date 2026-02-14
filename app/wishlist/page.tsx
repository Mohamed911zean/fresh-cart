import Link from "next/link";

export const metadata = {
    title: "Wishlist — FreshCart",
    description: "Your saved items",
};

export default function WishlistPage() {
    return (
        <div className="bg-[var(--bg-light)]">
            <div className="bg-white border-b border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)]">Wishlist</h1>
                    <p className="text-[var(--text-gray)] mt-2">Items you&apos;ve saved for later</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-dark)] mb-2">Your wishlist is empty</h2>
                    <p className="text-[var(--text-gray)] mb-6 max-w-sm">Save items you love by tapping the heart icon on any product. They&apos;ll show up here for easy access later.</p>
                    <Link
                        href="/products"
                        className="px-8 py-3.5 bg-[var(--primary)] text-white rounded-xl font-bold text-sm hover:bg-[var(--primary-dark)] transition-colors shadow-sm shadow-[var(--primary)]/20"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
