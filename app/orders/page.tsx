"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-light)] py-20 px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-[var(--border)] p-8 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-[var(--text-dark)] mb-2">Order Confirmed!</h1>
                <p className="text-[var(--text-gray)] mb-8">
                    Thank you for your purchase. We have received your order and are processing it.
                </p>
                <Link
                    href="/products"
                    className="block w-full py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:bg-[var(--primary-dark)] transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
