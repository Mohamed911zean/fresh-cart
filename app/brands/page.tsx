import { getBrands } from "@/app/lib/api";
import BrandCard from "@/app/components/BrandCard";
import Link from 'next/link'

export const metadata = {
    title: "Top Brands — FreshCart",
    description: "Shop from your favorite brands",
};

export default async function BrandsPage() {
    const brands = await getBrands(40);

    return (
        <div className="bg-[var(--bg-light)]">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
                <div className="container mx-auto px-4 py-12 sm:py-16">
                    <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
                        <Link className="hover:text-white transition-colors" href={'/'}>
                            Home
                        </Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white font-medium">Brands</span>
                    </nav>
                    <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                    <svg data-prefix="fas" data-icon="tags" className="svg-inline--fa fa-tags text-3xl" role="img" viewBox="0 0 576 512" aria-hidden="true">
                        <path fill="currentColor" d="M401.2 39.1L549.4 189.4c27.7 28.1 27.7 73.1 0 101.2L393 448.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L515.3 256.8c9.2-9.3 9.2-24.4 0-33.7L367 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM32.1 229.5L32.1 96c0-35.3 28.7-64 64-64l133.5 0c17 0 33.3 6.7 45.3 18.7l144 144c25 25 25 65.5 0 90.5L285.4 418.7c-25 25-65.5 25-90.5 0l-144-144c-12-12-18.7-28.3-18.7-45.3zm144-85.5a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                    </svg>
                    </div>


                    <div> 
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Top Brands</h1>
                        <p className="text-white/80 mt-1">Shop from your favorite brands</p>
                    </div>

                    </div>
                   
                </div>
            </div>

            {/* Brands Grid */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {brands.map((brand) => (
                        <BrandCard key={brand._id} brand={brand} />
                    ))}
                </div>
            </div>
        </div>
    );
}
