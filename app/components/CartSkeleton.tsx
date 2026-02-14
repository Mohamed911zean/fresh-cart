export default function CartSkeleton() {
    return (
        <div className="bg-[var(--bg-light)] min-h-screen pb-20">
            {/* Header Skeleton */}
            <div className="bg-white border-b border-[var(--border)] mb-8">
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                        <div className="h-4 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Skeleton */}
                    <div className="flex-1 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--border)] shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
                                {/* Image Skeleton */}
                                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-200 rounded-xl animate-pulse"></div>

                                {/* Content Skeleton */}
                                <div className="flex-1 w-full space-y-3">
                                    <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="h-5 w-24 bg-gray-200 rounded-lg animate-pulse"></div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="h-9 w-28 bg-gray-100 rounded-lg animate-pulse"></div>
                                        <div className="h-8 w-8 bg-gray-100 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Total Price Skeleton */}
                                <div className="hidden md:block min-w-[100px] text-right space-y-2">
                                    <div className="h-4 w-12 bg-gray-100 rounded ml-auto animate-pulse"></div>
                                    <div className="h-6 w-20 bg-gray-200 rounded ml-auto animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Skeleton */}
                    <div className="lg:w-96 shrink-0">
                        <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm p-6 md:p-8 sticky top-24">
                            <div className="h-7 w-40 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                                    <div className="h-4 w-12 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                            </div>

                            <div className="border-t border-[var(--border)] pt-4 mb-8">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
