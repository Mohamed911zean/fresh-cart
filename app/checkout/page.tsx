"use client";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const { cartItems, cartDetails, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/login?redirect=/checkout");
        }
    }, [user, router]);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate checkout process since I don't have the API docs for checkout endpoint here
        // (Usually POST /api/v1/orders/checkout-session/{cartId})

        await new Promise(resolve => setTimeout(resolve, 2000));

        toast.success("Order placed successfully!");
        clearCart();
        router.push("/orders"); // Or direct to thank you page
        setProcessing(false);
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Your cart is empty. <a href="/products" className="text-[var(--primary)] underline">Go shopping</a></p>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-light)] min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shipping Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border)]">
                        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    defaultValue={user?.name}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <textarea
                                    className="w-full p-2 border rounded-lg"
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    placeholder="Enter your shipping address"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:bg-[var(--primary-dark)] transition disabled:opacity-70"
                            >
                                {processing ? "Processing..." : `Pay ${cartDetails?.totalCartPrice} EGP`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border)] h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="flex gap-4 items-center">
                                    <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="font-medium line-clamp-1">{item.product.title}</h3>
                                        <p className="text-sm text-gray-500">{item.count} x {item.price} EGP</p>
                                    </div>
                                    <p className="font-bold">{(item.count * item.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{cartDetails?.totalCartPrice} EGP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
