# SETUP INSTRUCTIONS

## Getting Started with Your Levene CMS Website

### Step 1: Configure Your Sanity Project

1. Visit [sanity.io](https://www.sanity.io) and sign up for a free account
2. Create a new project or use an existing one
3. Go to your project settings and find your **Project ID**
4. Note your **Dataset name** (usually "production")

### Step 2: Update Configuration

1. Open `sanity-config/config.js`
2. Replace `YOUR_PROJECT_ID` with your actual Sanity Project ID
3. Keep the dataset as `production` (or your custom dataset name)
4. Keep the token empty for public datasets

Example:
```javascript
const SANITY_CONFIG = {
    projectId: '3m8xes87',  // Your actual project ID
    dataset: 'production',
    apiVersion: '2024-01-28',
    token: '',
};
```

### Step 3: Set Up Sanity Schema

1. In your Sanity project, navigate to the Schema folder
2. Copy the content from `sanity-config/post-schema.js`
3. Create a new file: `schemas/documents/post.js`
4. Paste the schema content
5. Update `schemas/schema.js` to include the post schema:

```javascript
import post from './documents/post'

export const schemaTypes = [post]
```

6. Deploy your schema: `sanity deploy`

### Step 4: Create Test Content

1. Go to your Sanity Studio at `https://YOUR_PROJECT_ID.sanity.studio`
2. Click "Create" → "Blog Post"
3. Fill in the form with:
   - **Title**: Test Blog Post
   - **Slug**: test-blog-post (auto-generated)
   - **Excerpt**: This is a test excerpt
   - **Content**: Test content here
   - **Category**: Select one
   - **Author**: Your name
   - **Published At**: Today's date
   - **Image**: Upload an image (optional)
4. Click Publish

### Step 5: Test Your Website

1. Open `index.html` in your web browser
2. You should see your blog post on the home page
3. Click "Read Our Blog" or navigate to `blog.html`
4. Your post should appear in the blog listing

### Step 6: Deploy Your Website

#### Option A: GitHub Pages (Free)

```bash
# Create a GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/levene-cms.git
git push -u origin main

# Enable GitHub Pages in your repository settings
# Point to main branch / root directory
```

#### Option B: Netlify (Free)

1. Go to [netlify.com](https://www.netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: (leave empty - no build needed)
   - Publish directory: `website`
4. Deploy!

#### Option C: Local Server Testing

```bash
# If you have Python 3 installed:
python -m http.server 8000

# If you have Node.js with http-server:
npx http-server

# Then open: http://localhost:8000/website
```

## Troubleshooting

### "Posts not loading" or blank page

**Solution:**
- Check browser console for errors (F12)
- Verify your Project ID is correct
- Make sure your Sanity dataset is public
- Try adding some posts to your Sanity CMS first

### Images not showing

**Solution:**
- Upload images through Sanity Studio
- Check that images have been published
- Ensure your dataset is public

### Website looks broken

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check that all files are in the correct folders

## File Organization

```
website/
├── index.html          ← Open this in browser
├── blog.html          
├── css/
│   └── styles.css     
├── js/
│   ├── home.js        
│   └── blog.js        
├── sanity-config/
│   ├── config.js       ← Update with your Project ID
│   ├── client.js       ← Sanity API client
│   └── post-schema.js  ← Copy to your Sanity project
├── README.md          ← Full documentation
└── SETUP.md           ← This file
```

## Next Steps

1. **Add more posts** to your Sanity CMS
2. **Customize styling** in `css/styles.css`
3. **Update content** in HTML files (company name, footer, etc.)
4. **Deploy to production**
5. **Set up domain** (optional)

## Support

For more information:
- Sanity CMS: https://www.sanity.io/docs
- Web Development: MDN Web Docs
- GitHub Pages: https://pages.github.com

Happy blogging! 🚀
