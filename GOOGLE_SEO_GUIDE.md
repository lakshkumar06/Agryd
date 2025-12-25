# Google Search Console Setup Guide for Agryd

Your site (https://agryd.xyz) is already well-configured for SEO! Follow these steps to submit it to Google.

## ✅ Pre-Check: Verify Your SEO Setup

Your site already has:
- ✅ Sitemap: https://agryd.xyz/sitemap.xml
- ✅ Robots.txt: https://agryd.xyz/robots.txt
- ✅ Proper meta tags and structured data
- ✅ Open Graph and Twitter cards

## Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click **"Add Property"** or **"Add a property"**

## Step 2: Add Your Website Property

1. Choose **"URL prefix"** (recommended for most sites)
2. Enter your website URL: `https://agryd.xyz`
3. Click **"Continue"**

## Step 3: Verify Website Ownership

You'll need to verify that you own the website. Choose one of these methods:

### Option A: HTML File Upload (Easiest)
1. Download the HTML verification file from Google
2. Upload it to your site's root directory (`/public/` folder)
3. Make sure it's accessible at: `https://agryd.xyz/google[random-string].html`
4. Click **"Verify"** in Search Console

### Option B: HTML Tag (Recommended for Next.js)
1. Copy the meta tag provided by Google
2. Add it to your `frontend/app/layout.tsx` in the `<head>` section
3. Deploy the changes
4. Click **"Verify"** in Search Console

### Option C: DNS Record (Most Reliable)
1. Add a TXT record to your domain's DNS settings
2. Copy the verification code from Google
3. Add it as a TXT record in your DNS provider (where you manage agryd.xyz)
4. Wait a few minutes for DNS propagation
5. Click **"Verify"** in Search Console

## Step 4: Submit Your Sitemap

Once verified:

1. In Google Search Console, go to **"Sitemaps"** in the left sidebar
2. Enter your sitemap URL: `https://agryd.xyz/sitemap.xml`
3. Click **"Submit"**
4. Google will start crawling your site (this can take a few days)

## Step 5: Request Indexing for Key Pages

1. Use the **"URL Inspection"** tool (search bar at the top)
2. Enter your main pages:
   - `https://agryd.xyz`
   - `https://agryd.xyz/demo`
   - `https://agryd.xyz/demo/feedback`
3. For each URL, click **"Request Indexing"**

## Step 6: Monitor Your Site

Check these sections regularly:

- **Performance**: See which keywords bring traffic
- **Coverage**: Check if pages are indexed correctly
- **Enhancements**: Review structured data and mobile usability
- **Sitemaps**: Monitor sitemap status

## Additional SEO Tips

### 1. Check Your Sitemap is Accessible
Visit: https://agryd.xyz/sitemap.xml
- Should show XML with your pages listed

### 2. Check Your Robots.txt
Visit: https://agryd.xyz/robots.txt
- Should allow Google to crawl your site

### 3. Test Mobile Usability
- Google Search Console will show mobile usability issues
- Your site should be mobile-friendly (Next.js handles this)

### 4. Monitor Core Web Vitals
- Google tracks page speed and user experience
- Check the "Core Web Vitals" report in Search Console

## Expected Timeline

- **Verification**: Immediate (once method is complete)
- **Sitemap Processing**: 1-3 days
- **Initial Indexing**: 1-2 weeks
- **Full Indexing**: 2-4 weeks

## Troubleshooting

### If sitemap shows errors:
- Verify the sitemap is accessible: https://agryd.xyz/sitemap.xml
- Check that all URLs in sitemap return 200 status codes
- Ensure sitemap is properly formatted XML

### If pages aren't indexing:
- Check robots.txt isn't blocking pages
- Verify pages are accessible (not behind authentication)
- Request indexing manually for important pages
- Ensure pages have unique, descriptive content

### If verification fails:
- Double-check the verification method you chose
- For HTML file: ensure file is in public root and accessible
- For DNS: wait longer for propagation (can take up to 48 hours)
- Try a different verification method

## Quick Checklist

- [ ] Created Google Search Console account
- [ ] Added property: https://agryd.xyz
- [ ] Verified website ownership
- [ ] Submitted sitemap: https://agryd.xyz/sitemap.xml
- [ ] Requested indexing for main pages
- [ ] Set up email notifications in Search Console
- [ ] Bookmarked Search Console for regular monitoring

## Need Help?

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google Search Central](https://developers.google.com/search)

---

**Your site URL**: https://agryd.xyz  
**Sitemap URL**: https://agryd.xyz/sitemap.xml  
**Robots.txt**: https://agryd.xyz/robots.txt

