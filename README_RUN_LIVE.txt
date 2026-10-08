==============================================================================
 ROBOT GENIE WEBSITE - HOW TO RUN IT LIVE
==============================================================================

WHAT YOU HAVE
  frontend/  The website (5 pages + 404). Plain HTML, CSS, JS. No build step.
  backend/   A small Node.js server that saves contact-form enquiries and can
             also serve the website. No npm packages needed.

Pick ONE option below. Option 1 is the easiest.

------------------------------------------------------------------------------
 STEP 0 (do this first, for every option)
------------------------------------------------------------------------------
 1. Decide your final web address, for example https://www.yourdomain.com
 2. Open the frontend/ folder in a text editor (VS Code works well).
 3. Use "Find and Replace in all files" to replace
        YOUR-DOMAIN.com
    with your real domain (no https://, no trailing slash).
    This fixes canonical links, the sitemap, robots.txt and the link preview image.
 4. Open frontend/contact.html and frontend/app.js and check the phone number,
    email and address are correct.

------------------------------------------------------------------------------
 OPTION 1 - FREE STATIC HOSTING (Netlify)         [easiest, form uses WhatsApp]
------------------------------------------------------------------------------
 1. Open frontend/config.js and set:   apiUrl: ""
    (this makes the contact form open WhatsApp, so no backend is needed)
 2. Go to https://app.netlify.com/drop and sign in.
 3. Drag the whole frontend/ folder onto the page.
 4. Netlify gives you a live link in a few seconds. Open it and test every page.
 5. To use your own domain: Site settings > Domain management > Add a domain,
    then follow the DNS instructions shown there.
 Other free hosts that work the same way: GitHub Pages, Cloudflare Pages, Vercel.

------------------------------------------------------------------------------
 OPTION 2 - NORMAL WEB HOSTING (cPanel / Hostinger / GoDaddy etc.)
------------------------------------------------------------------------------
 1. Set apiUrl: "" in frontend/config.js (WhatsApp form), as in Option 1.
 2. Log in to your hosting control panel and open File Manager.
 3. Open the public_html folder (or your domain's folder).
 4. Upload EVERYTHING inside frontend/ (including the hidden .htaccess file
    and the assets folder). Do not upload the frontend folder itself.
 5. Open your domain in a browser. Turn on the free SSL (https) in the panel.

------------------------------------------------------------------------------
 OPTION 3 - FULL SITE WITH BACKEND (saves enquiries)   [Render / Railway / Fly]
------------------------------------------------------------------------------
 The backend serves the website AND the enquiry form from one address.
 1. Upload this whole project to GitHub (commands are in README.md).
 2. Create an account on a host such as Render (render.com) or Railway.
 3. Create a new "Web Service" from your GitHub repository.
 4. Use these settings (names may differ slightly on each host):
        Runtime / Language ..... Node  (version 18 or newer)
        Root directory ......... (leave empty)
        Build command .......... (leave empty or: echo ok)
        Start command .......... node backend/server.js
    Or choose Docker and the host will use the included Dockerfile.
 5. Add these Environment Variables:
        TRUST_PROXY=true
        ADMIN_TOKEN=<a long random password you invent>
        ALLOWED_ORIGINS=https://www.yourdomain.com
        NOTIFY_WEBHOOK_URL=<optional: Slack/Discord/Zapier/Make link>
 6. Deploy. The host gives you a link. Open it, submit the contact form, then
    check enquiries at:   https://<your-link>/api/enquiries
    sending the header     Authorization: Bearer <your ADMIN_TOKEN>
 7. IMPORTANT: free plans on most hosts erase files on every restart/redeploy,
    so enquiries saved in backend/data/enquiries.json can be lost. Use
    NOTIFY_WEBHOOK_URL (so each enquiry also reaches Slack/Sheets/email via
    Zapier or Make), or attach a persistent disk, or replace backend/src/store.js
    with a database.

 Frontend on one host, backend on another?
   - Deploy the backend (Option 3). Then in frontend/config.js set
         apiUrl: "https://<your-backend-link>/api"
   - On the backend set ALLOWED_ORIGINS to the frontend's address.
   - Upload frontend/ with Option 1 or 2.

------------------------------------------------------------------------------
 OPTION 4 - YOUR OWN SERVER (VPS)
------------------------------------------------------------------------------
 1. Install Node.js 18+ (or Docker) on the server.
 2. Copy the project to the server, then:
        cd backend
        cp .env.example .env      (edit values: PORT, ADMIN_TOKEN, etc.)
        node server.js
    Keep it running with a process manager such as pm2:  pm2 start server.js
    Or with Docker, from the project root:
        docker build -t robot-genie .
        docker run -d -p 3000:3000 -e ADMIN_TOKEN=yourpassword robot-genie
 3. Put Nginx or Caddy in front for https and your domain, forwarding to
    port 3000, and set TRUST_PROXY=true.

------------------------------------------------------------------------------
 TRY IT ON YOUR OWN COMPUTER FIRST
------------------------------------------------------------------------------
 1. Install Node.js 18 or newer from nodejs.org.
 2. Open a terminal in the project folder, then:
        cd backend
        node server.js
 3. Open http://localhost:3000 in your browser.
 4. Run the automated tests (optional):   cd backend  then  npm test

------------------------------------------------------------------------------
 AFTER YOU GO LIVE - CHECKLIST
------------------------------------------------------------------------------
 [ ] Every page opens: Home, About Us, Courses, Placements, Contact Us
 [ ] The logo shows in the header and in the browser tab
 [ ] Submit the contact form once (you should see a thank-you message, or
     WhatsApp should open if you used apiUrl: "")
 [ ] Test on a phone
 [ ] The address uses https (padlock icon)
 [ ] Open https://yourdomain.com/sitemap.xml and /robots.txt - both load
 [ ] Add the site in Google Search Console and submit the sitemap
 [ ] Paste a page link in LinkedIn/WhatsApp to check the preview image

------------------------------------------------------------------------------
 TROUBLESHOOTING
------------------------------------------------------------------------------
 Page shows no styling ........ style.css or assets/ were not uploaded, or
                                 you uploaded the folder instead of its contents.
 Form says nothing / opens
 WhatsApp instead ............. The backend is not reachable. Check apiUrl in
                                 config.js and ALLOWED_ORIGINS on the backend.
 "Too many requests" .......... The rate limit (5 per 15 minutes per person)
                                 was reached. Wait, or raise ENQUIRY_LIMIT.
 404 on /about.html ........... File missing. Confirm all pages are in the
                                 same folder as index.html.
 Old version still showing .... Clear the browser cache or hard refresh
                                 (Ctrl+Shift+R).
 Fonts look different ......... Google Fonts need internet; the site falls
                                 back to a system font if blocked.

NOTE: Host dashboards change often, so button names above may differ a little.
The host's own "deploy a Node.js app" or "deploy a static site" guide will
match these steps.
==============================================================================
