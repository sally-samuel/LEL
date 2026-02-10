// Sanity CMS Configuration
// Update these values with your actual Sanity project credentials

const SANITY_CONFIG = {
    // Your Sanity project ID
    projectId: '3m8xes87',
    
    // Your Sanity dataset (typically 'production')
    dataset: 'production',
    
    // Your Sanity API version
    apiVersion: '2024-01-28',
    
    // API token for read-only access (if needed for private datasets)
    // Leave empty if your dataset is public
    token: '',
    
    // Sanity content delivery URL
    cdnUrl: null // Will be auto-generated from projectId and dataset
};

// Auto-generate CDN URL if not provided
if (!SANITY_CONFIG.cdnUrl) {
    SANITY_CONFIG.cdnUrl = `https://${SANITY_CONFIG.projectId}.apicdn.sanity.io/v${SANITY_CONFIG.apiVersion}`;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SANITY_CONFIG;
}
