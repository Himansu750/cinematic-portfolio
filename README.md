# Himanshu Chaudhari Portfolio

Cinematic portfolio website built with Next.js for visual art, video, music, and creative direction work.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For testing on another device on the same Wi-Fi network:

```bash
npm run dev:network
```

Then open `http://YOUR_LAPTOP_IP:3000` on the phone or tablet.

## Production Check

Run this before publishing:

```bash
npm run check:publish
```

This runs linting, creates the production build, generates `public/sitemap.xml` plus `public/robots.txt`, and checks production dependencies for known vulnerabilities.

To verify the locally running site routes and share metadata:

```bash
npm run dev
npm run verify:site
```

## Publish On Vercel

1. Push or import this project into Vercel.
2. Use the default build command:

```bash
npm run build
```

3. Add this environment variable in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-live-site-url.com
```

Use the free Vercel URL first if you do not have a domain yet. When you connect a custom domain later, update `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

## Instagram Bio Checklist

- Open the live site on mobile, tablet, and desktop.
- Check that the home page animation feels smooth.
- Check that `/visual-artist` cards are fully visible and clickable.
- Share the live URL in a chat once to confirm the preview image appears.
- Add the live URL to Instagram bio.
