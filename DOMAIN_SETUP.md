# 🌐 Custom Domain Setup Guide for FinTrack

## Step 1: Get Your Custom Domain from Bolt.domains

1. **Visit the Bolt Domains page**: https://bolt.domains/?feature=hackathon_2025
2. **Select your preferred domain** for FinTrack (suggestions below)
3. **Complete the registration process** through the Bolt.domains interface

### 🎯 Suggested Domain Names for FinTrack:
- `fintrack.bolt.new`
- `myfintrack.bolt.new` 
- `fintrack-app.bolt.new`
- `personal-fintrack.bolt.new`
- `fintrack-dashboard.bolt.new`

## Step 2: Configure Domain in Netlify

### Option A: Through Netlify Dashboard (Recommended)

1. **Login to Netlify**: https://app.netlify.com
2. **Navigate to your site**: Find "fintrk" in your sites list
3. **Go to Domain Settings**:
   - Click on your site → "Domain settings" tab
   - Click "Add custom domain"
4. **Add your domain**:
   - Enter your new bolt.domains domain (e.g., `fintrack.bolt.new`)
   - Click "Verify" and then "Add domain"

### Option B: Through Netlify CLI

```bash
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to your project directory
cd /path/to/your/fintrack/frontend

# Add custom domain
netlify sites:update --name fintrk --custom-domain your-domain.bolt.new
```

## Step 3: Configure DNS Settings

### For bolt.domains (if they provide DNS management):

1. **Create CNAME record**:
   - Name: `@` (or your subdomain)
   - Value: `fintrk.netlify.app`
   - TTL: 3600 (or default)

2. **Create CNAME for www** (optional):
   - Name: `www`
   - Value: `fintrk.netlify.app`
   - TTL: 3600

### DNS Configuration Example:
```
Type    Name    Value                   TTL
CNAME   @       fintrk.netlify.app     3600
CNAME   www     fintrk.netlify.app     3600
```

## Step 4: Enable HTTPS (Automatic)

Netlify will automatically provision an SSL certificate for your custom domain:

1. **Wait for DNS propagation** (can take up to 24 hours, usually much faster)
2. **Netlify will automatically**:
   - Detect your custom domain
   - Provision Let's Encrypt SSL certificate
   - Enable HTTPS redirect

## Step 5: Update Your Application (Optional)

If you want to update any hardcoded URLs in your app:

### Update Environment Variables:
```env
# In your .env file (if needed)
VITE_APP_URL=https://your-domain.bolt.new
VITE_API_BASE_URL=https://your-backend-url.com
```

### Update Meta Tags:
```html
<!-- In index.html -->
<meta property="og:url" content="https://your-domain.bolt.new" />
<link rel="canonical" href="https://your-domain.bolt.new" />
```

## Step 6: Verification & Testing

### Check Domain Status:
1. **In Netlify Dashboard**:
   - Go to Domain settings
   - Verify "Primary domain" shows your custom domain
   - Check that SSL certificate is "Provisioned"

### Test Your Domain:
```bash
# Test DNS resolution
nslookup your-domain.bolt.new

# Test HTTPS
curl -I https://your-domain.bolt.new

# Test redirect from Netlify URL
curl -I https://fintrk.netlify.app
```

### Browser Testing:
- ✅ Visit `https://your-domain.bolt.new`
- ✅ Verify SSL certificate (green lock icon)
- ✅ Test all major features work correctly
- ✅ Check that old URL redirects properly

## 🚀 Post-Setup Optimizations

### 1. Update README.md:
```markdown
## 🌐 Live Demo
Visit the live application: **[FinTrack](https://your-domain.bolt.new)**
```

### 2. Update Social Links:
- Update GitHub repository description
- Update LinkedIn/portfolio links
- Update any documentation references

### 3. SEO Improvements:
```html
<!-- Add to index.html -->
<link rel="canonical" href="https://your-domain.bolt.new" />
<meta property="og:url" content="https://your-domain.bolt.new" />
<meta name="twitter:url" content="https://your-domain.bolt.new" />
```

## 🔧 Troubleshooting

### Common Issues:

1. **DNS not propagating**:
   - Wait up to 24 hours
   - Use different DNS checker tools
   - Clear browser cache

2. **SSL certificate not provisioning**:
   - Ensure DNS is pointing correctly
   - Wait for propagation
   - Contact Netlify support if needed

3. **Domain not working**:
   - Check DNS settings
   - Verify domain is added in Netlify
   - Check for typos in domain name

### Useful Tools:
- **DNS Checker**: https://dnschecker.org/
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
- **Netlify Status**: https://www.netlifystatus.com/

## 📞 Support

If you encounter any issues:
1. **Netlify Support**: https://www.netlify.com/support/
2. **Bolt.domains Support**: Check their documentation or contact form
3. **DNS Issues**: Contact your domain provider's support

---

## 🎉 Success!

Once everything is set up, your FinTrack application will be accessible at your custom bolt.domains URL with:
- ✅ Custom professional domain
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Automatic deployments from Git
- ✅ Beautiful Bolt.new branding integration

Your users will now access your app at a memorable, professional domain that showcases it was built with Bolt.new! 🚀