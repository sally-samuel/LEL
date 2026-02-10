# Quick Reference

## Essential Configuration

### 1. Update config.js

```javascript
// sanity-config/config.js
const SANITY_CONFIG = {
    projectId: '3m8xes87',  // Replace with your Sanity Project ID
    dataset: 'production',
    apiVersion: '2024-01-28',
    token: '',
};
```

**Where to find your Project ID:**
- Log in to Sanity Studio
- Go to project settings
- Copy the Project ID from the API section
- Paste it in the config above

## File Map

| File | Purpose |
|------|---------|
| `index.html` | Home page - open this first |
| `blog.html` | Blog listing with search & filter |
| `css/styles.css` | All styling and responsive design |
| `js/home.js` | Fetch featured posts for homepage |
| `js/blog.js` | Blog page functionality |
| `sanity-config/client.js` | API client for Sanity |
| `sanity-config/config.js` | Your Sanity credentials |
| `sanity-config/post-schema.js` | Copy this to your Sanity project |

## Quick Links

- **Open Website**: Double-click `index.html`
- **View Blog**: Open `blog.html`
- **Full Setup Guide**: Read `SETUP.md`
- **Full Documentation**: Read `README.md`

## Common Tasks

### Add a New Blog Post
1. Go to your Sanity Studio
2. Click "Create" → "Blog Post"
3. Fill in all fields
4. Click "Publish"
5. Refresh your website

### Change Website Colors
Edit `css/styles.css`:
```css
:root {
    --primary-color: #2563eb;      /* Change this */
    --secondary-color: #10b981;    /* Change this */
}
```

### Change Posts Per Page
Edit `js/blog.js`:
```javascript
const POSTS_PER_PAGE = 9;  // Change to 12, 15, etc.
```

### Add New Filter Category
1. Edit `blog.html` - add a new filter button
2. Edit your Sanity post schema - add to category options

## Sanity GROQ Queries

All queries are already set up, but here are the main ones:

```groq
// Get all posts
*[_type == "post"] | order(_createdAt desc)

// Get posts by category
*[_type == "post" && category == "energy"]

// Search posts
*[_type == "post" && title match "search term"]

// Get single post
*[_type == "post" && slug.current == "post-slug"]
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Partial support

## Need Help?

1. **Check browser console**: F12 → Console tab (shows errors)
2. **Read the documentation**: README.md has all details
3. **Follow setup guide**: SETUP.md has step-by-step instructions
4. **Test on sample data**: Create 2-3 posts in Sanity first

---

**Your website is ready! Start by opening index.html** 🎉
