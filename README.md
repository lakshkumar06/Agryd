# Agryd

This is the production repository for Agryd.

## Branch Structure

- **`prod`** - Production branch (main working branch)
  - All active development happens here
  - Deployments to Netlify should use this branch
  
- **`main`** - Protected branch
  - This branch is kept minimal to prevent accidental deployments
  - Do not push changes directly to `main`

## Development Workflow

1. Always work on the `prod` branch:
   ```bash
   git checkout prod
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin prod
   ```

3. Netlify will automatically deploy from the `prod` branch (configure this in Netlify settings)

## Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

3. Add your keys to `.env.local`:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - `NEXT_PUBLIC_SUPADEMO_EMBED_URL` (optional)

4. Run development server:
   ```bash
   npm run dev
   ```

## Deployment

Deployed to Netlify from the `prod` branch. See `netlify.toml` for configuration.

