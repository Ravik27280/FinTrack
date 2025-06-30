# 🔄 Domain Update Checklist

## After Getting Your Custom Domain

Once you receive your custom domain from bolt.domains, update these files:

### 1. Update index.html
Replace `https://fintrk.netlify.app` with your new domain in:
- `<meta property="og:url" content="..." />`
- `<meta name="twitter:url" content="..." />`
- `<link rel="canonical" href="..." />`

### 2. Update README.md
Add your live demo link:
```markdown
## 🌐 Live Demo
**[FinTrack Live Demo](https://your-domain.bolt.new)**
```

### 3. Update Environment Variables (if needed)
```env
VITE_APP_URL=https://your-domain.bolt.new
```

### 4. Update Backend CORS (if applicable)
Make sure your backend allows requests from your new domain.

### 5. Test Everything
- ✅ All pages load correctly
- ✅ Authentication works
- ✅ API calls succeed
- ✅ SSL certificate is valid
- ✅ Old URL redirects properly

## 🎯 Suggested Domain Names for FinTrack:
- `fintrack.bolt.new`
- `myfintrack.bolt.new`
- `fintrack-app.bolt.new`
- `personal-fintrack.bolt.new`
- `fintrack-dashboard.bolt.new`
- `fintrack-pro.bolt.new`
- `smart-fintrack.bolt.new`