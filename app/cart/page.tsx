

import Link from "next/link";

export const metadata = {
    title: "Shopping Cart — FreshCart",
    description: "Your shopping cart",
};

export default function CartPage() {
    return (
        <div className="bg-[var(--bg-light)]">
            <div className="bg-white border-b border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)]">Shopping Cart</h1>
                    <p className="text-[var(--text-gray)] mt-2">Review your selected items</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-[var(--primary-light)] rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-dark)] mb-2">Your cart is empty</h2>
                    <p className="text-[var(--text-gray)] mb-6 max-w-sm">Looks like you haven&apos;t added anything to your cart yet. Start shopping and find something you love!</p>
                    <Link
                        href="/products"
                        className="px-8 py-3.5 bg-[var(--primary)] text-white rounded-xl font-bold text-sm hover:bg-[var(--primary-dark)] transition-colors shadow-sm shadow-[var(--primary)]/20"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
