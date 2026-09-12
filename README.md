# Plant Care Guide

A static site cataloging houseplants with care instructions, shopping lists, repotting guides, watering schedules, and soil mixing recipes.

Built with Next.js, shadcn/ui, and Tailwind CSS. Deployed to Cloudflare Pages.

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

Static output goes to `out/` for Cloudflare Pages deployment.

## Deploy

Push to `master` (or run the **Deploy** workflow) builds the site and uploads it to Cloudflare Pages project `plant-guide` (`plants.skg.gg`).

GitHub Actions needs one repo secret, `CLOUDFLARE_API_TOKEN`, with Account → Cloudflare Pages → Edit on this Cloudflare account.
