'use client'

import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, Headphones, Smartphone, Facebook, Twitter, Instagram, Mail, Phone, ShoppingCart } from "lucide-react";

export default function Footer() {
    const shopLinks = [
        { href: "/products", label: "All Products" },
        { href: "/categories", label: "Categories" },
        { href: "/brands", label: "Brands" },
        { href: "/products?category=6439d58a0049ad0b52b9003f", label: "Electronics" },
        { href: "/products?category=6439d2d167d9aa4ca970649f", label: "Men's Fashion" },
        { href: "/products?category=6439d5b90049ad0b52b90048", label: "Women's Fashion" },
    ];

    const accountLinks = [
        { href: "/login", label: "My Account" },
        { href: "/login", label: "Order History" },
        { href: "/wishlist", label: "Wishlist" },
        { href: "/cart", label: "Shopping Cart" },
        { href: "/login", label: "Sign In" },
        { href: "/register", label: "Create Account" },
    ];

    const supportLinks = [
        { href: "#", label: "Contact Us" },
        { href: "#", label: "Help Center" },
        { href: "#", label: "Shipping Info" },
        { href: "#", label: "Returns & Refunds" },
        { href: "#", label: "Track Order" },
    ];

    const legalLinks = [
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Cookie Policy" },
    ];

    const features = [
        { icon: <Truck className="w-5 h-5" />, title: "Free Shipping", desc: "On orders over 500 EGP" },
        { icon: <RotateCcw className="w-5 h-5" />, title: "Easy Returns", desc: "14-day return policy" },
        { icon: <ShieldCheck className="w-5 h-5" />, title: "Secure Payment", desc: "100% secure checkout" },
        { icon: <Headphones className="w-5 h-5" />, title: "24/7 Support", desc: "Contact us anytime" },
    ];

    return (
        <footer className="bg-neutral-900 text-white overflow-hidden">
            {/* App Promotion + Feature Badges */}
            <div className="border-b border-white/5 bg-white/2 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* App Download */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Shop Faster on Our App</h3>
                            <p className="text-white/50 text-base leading-relaxed max-w-md">
                                Experience the best of FreshCart on the go. Get app-exclusive deals & <span className="text-primary-400 font-bold">15% off</span> your first order.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                                <Smartphone className="w-8 h-8 text-white group-hover:text-primary-400 transition-colors" />
                                <div className="text-left">
                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-none">Download on</p>
                                    <p className="text-base font-bold text-white leading-snug">App Store</p>
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                                <Smartphone className="w-8 h-8 text-white group-hover:text-primary-400 transition-colors rotate-180" />
                                <div className="text-left">
                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-none">Get it on</p>
                                    <p className="text-base font-bold text-white leading-snug">Google Play</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/30 hover:bg-white/8 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/10 shrink-0">
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{f.title}</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* About Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:rotate-12 transition-transform duration-300">
                                    <ShoppingCart className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">
                                    Fresh<span className="text-primary-500">Cart</span>
                                </span>
                            </Link>
                            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                                FreshCart is your premier destination for quality products. We curate the best brands to bring you a seamless shopping experience with unmatched value.
                            </p>
                        </div>
                        
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h5 className="text-xs font-bold text-white uppercase tracking-widest">Connect With Us</h5>
                            <div className="flex flex-col gap-3">
                                <a href="tel:+18001234567" className="flex items-center gap-3 text-sm text-white/50 hover:text-primary-400 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">+1 (800) 123-4567</span>
                                </a>
                                <a href="mailto:support@freshcart.com" className="flex items-center gap-3 text-sm text-white/50 hover:text-primary-400 transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">support@freshcart.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {/* Shop Column */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary-500">Shop</h4>
                            <ul className="space-y-4 text-sm">
                                {shopLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-white/40 hover:text-primary-400 hover:translate-x-1 transition-all inline-block">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Account Column */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary-500">Account</h4>
                            <ul className="space-y-4 text-sm">
                                {accountLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-white/40 hover:text-primary-400 hover:translate-x-1 transition-all inline-block">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Column */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary-500">Support</h4>
                            <ul className="space-y-4 text-sm">
                                {supportLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-white/40 hover:text-primary-400 hover:translate-x-1 transition-all inline-block">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Column */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-primary-500">Legal</h4>
                            <ul className="space-y-4 text-sm">
                                {legalLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-white/40 hover:text-primary-400 hover:translate-x-1 transition-all inline-block">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:row items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs font-medium text-white/30 uppercase tracking-widest">
                        <span>© 2026 FreshCart. All rights reserved.</span>
                        <span className="hidden sm:inline opacity-20">•</span>
                        <span>Designed for premium shopping</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {[
                            { icon: <Facebook className="w-5 h-5" />, href: "#" },
                            { icon: <Twitter className="w-5 h-5" />, href: "#" },
                            { icon: <Instagram className="w-5 h-5" />, href: "#" },
                        ].map((social, idx) => (
                            <a key={idx} href={social.href} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-primary-400 hover:bg-primary-500/10 hover:-translate-y-1 transition-all duration-300">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
