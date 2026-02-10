// Sanity Client - Fetches data from Sanity CMS
class SanityClient {
    constructor(config = {}) {
        this.projectId = config.projectId || '3m8xes87';
        this.dataset = config.dataset || 'production';
        this.apiVersion = config.apiVersion || '2024-01-28';
        this.token = config.token || '';
        this.apiUrl = `https://${this.projectId}.apicdn.sanity.io/v${this.apiVersion}`;
    }

    /**
     * Fetch data from Sanity using GROQ query
     */
    async fetch(query, params = {}) {
        try {
            const queryString = this.buildQueryString(query, params);
            const url = `${this.apiUrl}/data/query/${this.dataset}?${queryString}`;
            
            const headers = {
                'Content-Type': 'application/json'
            };

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`;
            }

            const response = await fetch(url, { headers });

            if (!response.ok) {
                throw new Error(`Sanity API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(`Sanity query error: ${data.error.description}`);
            }

            return data.result;
        } catch (error) {
            console.error('Sanity fetch error:', error);
            throw error;
        }
    }

    /**
     * Build query string for Sanity API
     */
    buildQueryString(query, params) {
        const encodedQuery = encodeURIComponent(query);
        let queryString = `query=${encodedQuery}`;

        for (const [key, value] of Object.entries(params)) {
            if (value !== null && value !== undefined) {
                queryString += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
            }
        }

        return queryString;
    }

    /**
     * Fetch all blog posts
     */
    async getPosts(limit = 20, offset = 0) {
        const query = `
            *[_type == "post"] | order(_createdAt desc) [${offset}...${offset + limit}] {
                _id,
                title,
                slug,
                excerpt,
                content,
                category,
                image,
                author,
                publishedAt,
                _createdAt
            }
        `;
        return this.fetch(query);
    }

    /**
     * Get total count of blog posts
     */
    async getPostCount() {
        const query = `count(*[_type == "post"])`;
        return this.fetch(query);
    }

    /**
     * Fetch a single post by slug
     */
    async getPostBySlug(slug) {
        const query = `
            *[_type == "post" && slug.current == $slug] {
                _id,
                title,
                slug,
                excerpt,
                content,
                category,
                image,
                author,
                publishedAt,
                _createdAt
            }
        `;
        const result = await this.fetch(query, { slug });
        return result.length > 0 ? result[0] : null;
    }

    /**
     * Fetch posts by category
     */
    async getPostsByCategory(category, limit = 20, offset = 0) {
        const query = `
            *[_type == "post" && category == $category] | order(_createdAt desc) [${offset}...${offset + limit}] {
                _id,
                title,
                slug,
                excerpt,
                content,
                category,
                image,
                author,
                publishedAt,
                _createdAt
            }
        `;
        return this.fetch(query, { category });
    }

    /**
     * Search posts by title or excerpt
     */
    async searchPosts(searchTerm, limit = 20, offset = 0) {
        const query = `
            *[_type == "post" && (title match $search || excerpt match $search)] | order(_createdAt desc) [${offset}...${offset + limit}] {
                _id,
                title,
                slug,
                excerpt,
                content,
                category,
                image,
                author,
                publishedAt,
                _createdAt
            }
        `;
        return this.fetch(query, { search: searchTerm });
    }

    /**
     * Fetch latest posts (featured on homepage)
     */
    async getFeaturedPosts(limit = 3) {
        const query = `
            *[_type == "post"] | order(_createdAt desc) [0...${limit}] {
                _id,
                title,
                slug,
                excerpt,
                category,
                image,
                publishedAt,
                _createdAt
            }
        `;
        return this.fetch(query);
    }

    /**
     * Get image URL from Sanity
     */
    getImageUrl(image, width = 800, height = 600) {
        if (!image || !image.asset) {
            return null;
        }
        
        const assetId = image.asset._ref;
        const [, , dimensions, format] = assetId.split('-');
        
        return `https://cdn.sanity.io/images/${this.projectId}/${this.dataset}/${assetId}?w=${width}&h=${height}&fit=crop`;
    }
}

// Initialize client with config
let sanityClient;

function initSanityClient(config) {
    const mergedConfig = {
        ...window.SANITY_CONFIG || {},
        ...config
    };
    sanityClient = new SanityClient(mergedConfig);
    return sanityClient;
}

// Auto-initialize if SANITY_CONFIG exists
if (typeof window !== 'undefined') {
    if (window.SANITY_CONFIG) {
        initSanityClient(window.SANITY_CONFIG);
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SanityClient, initSanityClient };
}
