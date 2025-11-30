# LinkLens — Next.js Landing (Ready for Vercel)

This is a minimal Next.js app with TailwindCSS and a working **Join Waitlist** form that posts **name** and **email** to a Google Sheets via Google Apps Script.

## What is included
- Next.js app (app router) at `app/`
- Tailwind CSS configured
- `components/LinkLensLanding.jsx` — the landing page + waitlist form
- `google-apps-script.txt` — the Apps Script you paste into your Google Sheet
- `README_SETUP.md` — step-by-step instructions (below)

---

## Super-basic steps to get your site live (5 min)

### 1) Create a Google Sheet to collect responses
1. Open Google Sheets and create a new sheet.
2. Rename the first sheet tab to `Responses`.
3. In the first row, add headers: `Timestamp`, `Name`, `Email`.

### 2) Install the Google Apps Script (one-time)
1. In your Google Sheet, go to **Extensions → Apps Script**.
2. Delete any default code and paste the contents of `google-apps-script.txt`.
3. Save, then choose **Deploy → New deployment → Web app**.
   - For **Execute as**, choose **Me**.
   - For **Who has access**, choose **Anyone** (or **Anyone with link**).
4. Click **Deploy**, authorize the script when prompted.
5. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/ABC.../exec`).

### 3) Add the URL to the Next.js app
1. In the project root, create a file `.env.local` with:
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=PASTE_YOUR_WEB_APP_URL_HERE
```
2. Save.

### 4) Test locally
```bash
npm install
npm run dev
```
Open http://localhost:3000, enter a name and email, and submit. Your Google Sheet should receive the entry.

### 5) Deploy to Vercel
- Sign in at https://vercel.com (use GitHub)
- Import this repository or upload the ZIP
- Vercel will build and deploy automatically
- Make sure `.env.local` is added in Vercel Dashboard under Project → Settings → Environment Variables as `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.

---

## Google Apps Script (paste into Apps Script editor)
See file `google-apps-script.txt` in the zip. This script accepts POST requests and writes to the `Responses` sheet.

Note: The script sets CORS to allow POST from anywhere. If you prefer restricting access, adjust the code.

---
