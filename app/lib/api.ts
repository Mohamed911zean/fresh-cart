/* ─── API Configuration ─── */

/**
 * Production-ready API configuration
 * Validates environment variables and provides proper error handling
 */

// Validate and get API URL
function getApiUrl(): string {
    const url = process.env.NEXT_PUBLIC_API_URL;
    
    // In production, we must have the env variable
    if (!url && process.env.NODE_ENV === 'production') {
        throw new Error(
            'NEXT_PUBLIC_API_URL is not defined. Please set it in your environment variables.'
        );
    }
    
    // Development/build fallback
    return url || 'https://ecommerce.routemisr.com/api/v1';
}

const BASE_URL = getApiUrl();

// Log API URL in development
if (process.env.NODE_ENV === 'development') {
    console.log('🌐 API Base URL:', BASE_URL);
}

/* ─── Types ─── */

export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    priceAfterDiscount?: number;
    quantity: number;
    sold: number;
    imageCover: string;
    images: string[];
    category: Category;
    brand: Brand;
    subcategory: SubCategory[];
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface ApiMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
}

export interface ApiResponse<T> {
    results: number;
    metadata?: ApiMetadata;
    data: T[];
}

export interface SingleApiResponse<T> {
    data: T;
}

/* ─── Error Handling ─── */

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public endpoint?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Centralized fetch wrapper with error handling and logging
 */
async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            throw new ApiError(
                `API request failed: ${response.statusText}`,
                response.status,
                endpoint
            );
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ API Error:', {
                endpoint,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
        
        // Re-throw ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        
        // Wrap other errors
        throw new ApiError(
            error instanceof Error ? error.message : 'Unknown API error',
            undefined,
            endpoint
        );
    }
}

/* ─── Fetchers ─── */

/**
 * Get all products with optional limit
 */
export async function getProducts(limit: number = 40): Promise<Product[]> {
    const endpoint = `/products?limit=${limit}`;
    
    const response = await fetchApi<ApiResponse<Product>>(endpoint, {
        next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    return response.data || [];
}

/**
 * Get single product by ID
 */
export async function getProduct(id: string): Promise<Product> {
    if (!id) {
        throw new ApiError('Product ID is required');
    }
    
    const endpoint = `/products/${id}`;
    
    const response = await fetchApi<SingleApiResponse<Product>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
    const endpoint = '/categories';
    
    const response = await fetchApi<ApiResponse<Category>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data || [];
}

/**
 * Get single category by ID
 */
export async function getCategory(id: string): Promise<Category> {
    if (!id) {
        throw new ApiError('Category ID is required');
    }
    
    const endpoint = `/categories/${id}`;
    
    const response = await fetchApi<SingleApiResponse<Category>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data;
}

/**
 * Get all brands with optional limit
 */
export async function getBrands(limit: number = 40): Promise<Brand[]> {
    const endpoint = `/brands?limit=${limit}`;
    
    const response = await fetchApi<ApiResponse<Brand>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data || [];
}

/**
 * Get single brand by ID
 */
export async function getBrand(id: string): Promise<Brand> {
    if (!id) {
        throw new ApiError('Brand ID is required');
    }
    
    const endpoint = `/brands/${id}`;
    
    const response = await fetchApi<SingleApiResponse<Brand>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data;
}

/**
 * Get products by brand ID
 */
export async function getProductsByBrand(brandId: string): Promise<Product[]> {
    if (!brandId) {
        throw new ApiError('Brand ID is required');
    }
    
    const endpoint = `/products?brand=${brandId}`;
    
    const response = await fetchApi<ApiResponse<Product>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data || [];
}

/**
 * Get products by category ID
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (!categoryId) {
        throw new ApiError('Category ID is required');
    }
    
    const endpoint = `/products?category=${categoryId}`;
    
    const response = await fetchApi<ApiResponse<Product>>(endpoint, {
        next: { revalidate: 3600 },
    });
    
    return response.data || [];
}

/* ─── Search & Filter ─── */

export interface SearchParams {
    query?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

/**
 * Search products with advanced filters
 */
export async function searchProducts(params: SearchParams): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    
    // Add search parameters
    if (params.query) searchParams.set('keyword', params.query);
    if (params.category) searchParams.set('category', params.category);
    if (params.brand) searchParams.set('brand', params.brand);
    if (params.minPrice !== undefined) searchParams.set('price[gte]', params.minPrice.toString());
    if (params.maxPrice !== undefined) searchParams.set('price[lte]', params.maxPrice.toString());
    if (params.sort) searchParams.set('sort', params.sort);
    if (params.page) searchParams.set('page', params.page.toString());
    
    // Set limit with default
    const limit = params.limit || 40;
    searchParams.set('limit', limit.toString());
    
    const endpoint = `/products?${searchParams.toString()}`;
    
    const response = await fetchApi<ApiResponse<Product>>(endpoint, {
        next: { revalidate: 1800 }, // Revalidate every 30 minutes for search
    });
    
    return response.data || [];
}

/* ─── Utility Functions ─── */

/**
 * Check if API is healthy (useful for health checks)
 */
export async function checkApiHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_URL}/products?limit=1`, {
            method: 'GET',
            cache: 'no-store',
        });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Get API base URL (useful for debugging)
 */
export function getApiBaseUrl(): string {
    return BASE_URL;
}