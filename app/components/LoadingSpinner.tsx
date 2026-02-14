'use client'

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-[var(--primary-light)] border-t-[var(--primary)] animate-spin" />
            </div>
        </div>
    );
}
