# Creative Workflow

Use this as the working system for every page redesign: research first, decide the motion language, then build in Next.js with performance checks before publishing.

## Research
- Awwwards
- Godly
- Land-book
- Lapa Ninja

Look for one clear interaction idea, not ten. Save references for layout, motion, type scale, and one special effect.

## Design
- Figma
- Figma Make

Before coding a page, decide:
- desktop composition
- mobile/tablet composition
- hero text and button labels
- scroll behavior
- what should happen on touch, hover, and back navigation

## 3D And Motion
- Spline
- Rive
- Framer Motion
- GSAP
- Three.js

Use each tool for the job it is best at:
- `framer-motion` for page transitions, layout animations, hover/tap feedback, and scroll reveals.
- `gsap` for cinematic timelines, match cuts, morphing sequences, and advanced scroll choreography.
- `three` / `@react-three/fiber` for real 3D scenes.
- `@splinetool/react-spline` for Spline scenes exported from Spline.
- `@rive-app/react-canvas` for lightweight interactive vector animations.

## Development
- Codex
- VS Code
- Next.js
- Tailwind CSS

Local commands:

```powershell
cd C:\Users\ASUS\Desktop\cinematic-portfolio
npm install
npm run dev
```

Phone/tablet testing on the same Wi-Fi:

```powershell
cd C:\Users\ASUS\Desktop\cinematic-portfolio
npm run dev:network
```

Then open:

```text
http://YOUR_LAPTOP_IP:3000
```

Production check before deploy:

```powershell
npm run predeploy
```

## Review
- ChatGPT
- Lighthouse
- Vercel preview deployments

Review every major page on:
- desktop
- tablet
- mobile
- slow refresh
- back button flow
- touch/hover interactions
- first load video/image speed

## Publish
- GitHub
- Vercel

Deploy commands:

```powershell
git status --short
git add .
git commit -m "Describe the design update"
git push origin main
vercel --prod
```

## Installed Project Packages
- `@splinetool/react-spline` for Spline scenes.
- `@rive-app/react-canvas` for Rive animations.
- `@gsap/react` for GSAP timelines inside React.
- `framer-motion` for interface transitions and scroll effects.
- `three`, `@react-three/fiber`, and `@react-three/drei` for custom 3D.

## 21st.dev Magic MCP

The project has `.mcp.json` configured for the 21st.dev MCP server:

```json
{
  "mcpServers": {
    "21st": {
      "type": "http",
      "url": "https://21st.dev/api/mcp",
      "headers": {
        "x-api-key": "${API_KEY_21ST}"
      }
    }
  }
}
```

Add your real API key as a Windows environment variable, then restart Codex:

```powershell
setx API_KEY_21ST "paste_your_21st_dev_api_key_here"
```

Keep the key private. Do not commit `.env.local`.

## How To Ask For A New Page

Send me:
- the page name
- 1 to 3 reference videos/screenshots
- desktop priority or mobile priority
- exact text changes if you already know them
- whether the effect should be subtle, cinematic, or experimental

If a decision is visual or UX-sensitive, I will ask before locking it in. If it is a technical implementation detail, I will choose the smoothest and most stable option for the site.
