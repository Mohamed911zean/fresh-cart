

import { getProducts, getCategories, getBrands } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";



export default async function ProductsPage() {
    const [products, categories, brands] = await Promise.all([
        getProducts(40),
        getCategories(),
        getBrands(),
    ]);

    return (
        <div className="bg-[var(--bg-light)] min-h-screen">
            {/* Enhanced Hero Header */}
            <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 border-b border-primary-700 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10" 
                     style={{
                         backgroundImage: "url('/home-slider-1.d79601a8.png')"
                     }}>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm mb-4">
                        <a href="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-1 group">
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Home
                        </a>
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-white font-medium">All Products</span>
                    </nav>

                    {/* Header Content */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">All Products</h1>
                            <p className="text-white/90 text-lg">Explore our complete product collection</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-3xl font-bold text-white mb-1">{products.length}+</div>
                            <div className="text-white/80 text-sm">Products</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-3xl font-bold text-white mb-1">{categories.length}+</div>
                            <div className="text-white/80 text-sm">Categories</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-3xl font-bold text-white mb-1">{brands.length}+</div>
                            <div className="text-white/80 text-sm">Brands</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Enhanced Sidebar Filters */}
                    <div className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Filter Header */}
                            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                        </svg>
                                        Filters
                                    </h2>
                                    <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold transition-colors">
                                        Clear All
                                    </button>
                                </div>
                                <p className="text-sm text-[var(--text-gray)]">Refine your search results</p>
                            </div>

                            {/* Categories */}
                            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-base font-bold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                    Categories
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {categories.map((cat) => (
                                        <label key={cat._id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-light)] transition-colors">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 border-2 border-[var(--border)] rounded-md text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:ring-offset-0 checked:border-[var(--primary)] checked:bg-[var(--primary)] transition-all cursor-pointer" />
                                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-[var(--text-gray)] group-hover:text-[var(--primary)] transition-colors flex-1">
                                                {cat.name}
                                            </span>
                                            <span className="text-xs text-[var(--text-gray)] bg-[var(--bg-light)] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                {Math.floor(Math.random() * 50) + 10}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-base font-bold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                    </svg>
                                    Brands
                                </h3>
                                <div className="relative mb-4">
                                    <input type="text" placeholder="Search brands..." className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-light)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                                    <svg className="absolute left-3 top-3 w-4 h-4 text-[var(--text-gray)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {brands.map((brand) => (
                                        <label key={brand._id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-light)] transition-colors">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 border-2 border-[var(--border)] rounded-md text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:ring-offset-0 checked:border-[var(--primary)] checked:bg-[var(--primary)] transition-all cursor-pointer" />
                                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-[var(--text-gray)] group-hover:text-[var(--primary)] transition-colors flex-1">
                                                {brand.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-base font-bold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    Price Range
                                </h3>
                                <div className="flex items-center gap-3">
                                    <input type="number" placeholder="Min" className="w-full px-4 py-2.5 bg-[var(--bg-light)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                                    <span className="text-[var(--text-gray)] font-bold">-</span>
                                    <input type="number" placeholder="Max" className="w-full px-4 py-2.5 bg-[var(--bg-light)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                                </div>
                                <button className="w-full mt-4 py-2.5 bg-[var(--primary)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--primary-dark)] active:scale-95 transition-all">
                                    Apply
                                </button>
                            </div>

                            {/* Rating Filter */}
                            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-base font-bold text-[var(--text-dark)] mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    Customer Rating
                                </h3>
                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <label key={stars} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-light)] transition-colors">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 border-2 border-[var(--border)] rounded-md text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:ring-offset-0 checked:border-[var(--primary)] checked:bg-[var(--primary)] transition-all cursor-pointer" />
                                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <div className="flex items-center gap-1 flex-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${i < stars ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} viewBox="0 0 24 24">
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm text-[var(--text-gray)] ml-2">& up</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Enhanced Toolbar */}
                        <div className="bg-white rounded-2xl border border-[var(--border)] p-4 md:p-6 mb-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[var(--primary-light)] rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--text-gray)]">
                                            Showing <span className="font-bold text-[var(--text-dark)]">{products.length}</span> products
                                        </p>
                                        <p className="text-xs text-[var(--text-gray)] mt-0.5">
                                            From {categories.length} categories
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <select className="flex-1 sm:flex-none px-4 py-2.5 bg-[var(--bg-light)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-dark)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all cursor-pointer">
                                        <option>Sort by: Featured</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest Arrivals</option>
                                        <option>Best Rated</option>
                                        <option>Most Popular</option>
                                    </select>
                                    
                                    <div className="hidden sm:flex bg-[var(--bg-light)] p-1 rounded-xl border border-[var(--border)]">
                                        <button className="p-2 rounded-lg bg-white shadow-sm text-[var(--text-dark)] transition-all hover:scale-105">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-lg text-[var(--text-gray)] hover:text-[var(--text-dark)] hover:bg-white transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="bg-white rounded-2xl border border-[var(--border)] p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--text-dark)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                    Previous
                                </button>
                                
                                <div className="flex items-center gap-2">
                                    <button className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm transition-all hover:scale-110">1</button>
                                    <button className="w-10 h-10 rounded-xl border-2 border-[var(--border)] text-[var(--text-dark)] font-semibold text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">2</button>
                                    <button className="w-10 h-10 rounded-xl border-2 border-[var(--border)] text-[var(--text-dark)] font-semibold text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">3</button>
                                    <span className="text-[var(--text-gray)]">...</span>
                                    <button className="w-10 h-10 rounded-xl border-2 border-[var(--border)] text-[var(--text-dark)] font-semibold text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">10</button>
                                </div>
                                
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--primary-dark)] transition-all active:scale-95">
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}