'use client'

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/app/lib/api";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category._id}`}
      className="
    group
    bg-white
    rounded-2xl
    border
    border-gray-100
    p-4
    sm:p-6
    shadow-sm
    hover:shadow-xl
    hover:border-primary-200
    transition-all
    duration-300
    hover:-translate-y-1
    "
    >
      {/* Image */}
      <div className="relative w-full aspect-square rounded-lg bg-neutral-100 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-neutral-800 text-center">
        {category.name}
      </h3>
    </Link>
  );
}
