# GeoSync - Real-time Map Synchronization

## 🚀 Render Deployment Guide

### 📦 Step 1: Deploy Backend

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Sign up/login

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select "e:\real-time-geo-sync" folder

3. **Configure Backend**
   - **Name**: `geosync-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server-render.js`
   - **Instance Type**: `Free`

4. **Environment Variables**
   ```
   NODE_ENV = production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)

### 📱 Step 2: Deploy Frontend

1. **Create Another Web Service**
   - Click "New +" → "Web Service"
   - Same repository
   - **Root Directory**: `frontend`

2. **Configure Frontend**
   - **Name**: `geosync-frontend`
   - **Runtime**: `Static`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Instance Type**: `Free`

3. **Environment Variables**
   ```
   NODE_ENV = production
   VITE_BACKEND_URL = https://geosync-backend.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)

### 🌐 Step 3: Access Your App

**Backend URL**: `https://geosync-backend.onrender.com`
**Frontend URL**: `https://geosync-frontend.onrender.com`

### 🎯 Step 4: Test Your Live App

1. Open frontend URL in 2 browsers
2. Browser 1: Join as "Tracker" → Room "TEST123"
3. Browser 2: Join as "Tracked" → Room "TEST123"
4. Move map in Browser 1 → Browser 2 syncs!

### 🔧 Troubleshooting

**If WebSocket fails:**
- Check backend URL in frontend env
- Ensure CORS is configured correctly
- Wait 2-3 minutes for full deployment

**If build fails:**
- Check package.json scripts
- Verify all dependencies installed
- Check build logs in Render dashboard

### 🎉 Success!

Your GeoSync app is now live on Render with:
- ✅ Real-time map synchronization
- ✅ Professional UI with coordinates
- ✅ Mobile responsive design
- ✅ Free hosting forever
