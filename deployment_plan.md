# 🚀 MediNova Platform Deployment Plan

This guide details the steps to deploy the MediNova platform from your local environment to a production server.

## 📦 Preferred Hosting: Vercel (Recommended)

Vercel is the most efficient platform for React/Vite applications like MediNova.

### 🔌 Automated Deployment (GitHub Hook)

1. **Push to GitHub**: (I will perform this step next).
2. **Import to Vercel**:
    - Sign in to [vercel.com](https://vercel.com).
    - Click **New Project**.
    - Import the **Builder-nova-home** repository.
    - **Framework Preset**: Select "Vite".
3. **Configure Settings**:
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
4. **Environment Variables**:
    - Set `VITE_CLOUDINARY_CLOUD_NAME` if applicable (currently hardcoded for demo).
5. **Deploy**: Click **Deploy**. Vercel will automatically redeploy whenever you push to `main`.

---

## 🏗️ Manual Deployment (Netlify/Other)

### 1. Create a Production Bundle
Run this command in the project root:
```bash
npm run build
```
This generates a `dist/` folder containing your optimized production assets.

### 2. Upload to Netlify
- Drag and drop the `dist/` folder to the **Netlify Drop** area.
- Or, use the Netlify CLI:
  ```bash
  netlify deploy --prod --dir=dist
  ```

---

## 🛡️ Critical Post-Deployment Checks

- [ ] **HTTPS**: Ensure the site is served over SSL (Vercel/Netlify do this automatically).
- [ ] **Redirects**: For React SPAs, ensure that your hosting provider handles client-side routing correctly (Vercel does this via `vercel.json` if needed, but standard Vite setup usually works).
- [ ] **Assets**: Check that the Logo (`public/medinova.png`) and health reports load correctly.
- [ ] **Cloudinary**: Verify that new file uploads work from the production domain.

---

### 🌐 Custom Domain
Once deployed, you can point your custom domain (e.g., `medinovahome.com`) to the Vercel/Netlify provided URL in your DNS settings.
