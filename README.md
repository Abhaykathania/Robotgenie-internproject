![image alt](https://github.com/Abhaykathania/Robotgenie-internproject/blob/Web-Development/GitHub_Social_Preview_Full.png?raw=true)













# Robot Genie website (hosting ready)
Static multi-page site, no build step: index, about, courses, placements, contact (+ 404).
## Before you go live
1. Search all files for `YOUR-DOMAIN.com` and replace with your real domain (canonical links, Open Graph image, sitemap, robots, JSON-LD).
2. Check contact details in `contact.html` and `app.js` (WhatsApp number 919891707129).
## Deploy
- **cPanel / shared hosting:** upload everything inside this folder to `public_html` (the `.htaccess` enables compression, caching and the 404 page).
- **Netlify:** drag and drop this folder at app.netlify.com/drop.
- **Vercel:** `vercel --prod` inside this folder.
- **GitHub Pages / Cloudflare Pages:** push the folder and enable Pages.
Submit `https://YOUR-DOMAIN.com/sitemap.xml` in Google Search Console.
## Edit
Courses `C`, testimonials `T`, hiring partners `H` are arrays in `app.js`. Colors and effects are in `style.css`. Logo files are in `assets/`.
