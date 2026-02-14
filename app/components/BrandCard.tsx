'use client'

import Image from "next/image";
import type { Brand } from "@/app/lib/api";

export default function BrandCard({ brand }: { brand: Brand }) {
    return (
        <div className="group bg-white rounded-xl border border-[var(--border)] p-6 flex items-center justify-center hover:shadow-lg hover:shadow-black/5 hover:border-[var(--primary)]/30 transition-all duration-300 aspect-[4/3]">
            <Image
                src={brand.image}
                alt={brand.name}
                width={160}
                height={120}
                className="object-contain max-h-16 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            />
        </div>
    );
}
