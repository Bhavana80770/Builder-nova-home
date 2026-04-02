## 📦 Frontend Hosting: Vercel (Recommended)

Vercel is the most efficient platform for the MediNova React frontend.

### 🔌 Automated Deployment (GitHub)

1. **Connect Repository**: Import the **Builder-nova-home** repository to Vercel.
2. **Framework Preset**: Select "Vite".
3. **Build Settings**:
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
4. **Deploy**: Vercel will rebuild on every commit to `main`.

---

## 🛠️ Backend Hosting: Render

For backend services (API, Databases), Render provides a robust and scalable environment.

### 🚀 Deploying to Render

1. **Sign in**: Visit [render.com](https://render.com) and connect your GitHub.
2. **New Web Service**:
    - Select **Web Service**.
    - Connect the **Builder-nova-home** repository.
3. **Configure Build & Run**:
    - **Runtime**: Node
    - **Build Command**: `npm install` (or your specific backend build)
    - **Start Command**: `npm start`
4. **Environment Variables**:
    - Add any required secrets (Database URLs, API Keys).
5. **Deploy**: Initial build will start immediately.

---

## 🏗️ Manual Static Hosting (Netlify/Other)

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
