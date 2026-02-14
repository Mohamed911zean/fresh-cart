import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 py-16">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            </div>
            <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-2">Page Not Found</h1>
            <p className="text-[var(--text-gray)] mb-8 max-w-md">We couldn't find the page you were looking for. It might have been removed or moved.</p>
            <Link href="/" className="px-8 py-3 bg-[var(--primary)] text-white rounded-xl font-bold hover:bg-[var(--primary-dark)] transition-colors shadow-sm shadow-[var(--primary)]/20">
                Back to Home
            </Link>
        </div>
    );
}
