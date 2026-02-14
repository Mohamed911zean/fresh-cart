import { getBrands } from "@/app/lib/api";
import BrandCard from "@/app/components/BrandCard";

export const metadata = {
    title: "Top Brands — FreshCart",
    description: "Shop from your favorite brands",
};

export default async function BrandsPage() {
    const brands = await getBrands(40);

    return (
        <div className="bg-[var(--bg-light)]">
            {/* Header */}
            <div className="bg-white border-b border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)]">Top Brands</h1>
                    <p className="text-[var(--text-gray)] mt-2">Shop from your favorite brands</p>
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
