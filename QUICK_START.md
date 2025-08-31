# Quick Start Guide - Plantify MERN Stack

## 🚀 Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation)
- Git

### Step 1: Install Dependencies

```bash
# Install all dependencies for both frontend and backend
npm run install-all
```

### Step 2: Set up MongoDB

Make sure MongoDB is running locally on port 27017.

### Step 3: Environment Configuration

The backend `.env` file is already configured for local development:

- MongoDB: `mongodb://localhost:27017/plantify`
- Backend Port: `5000`
- Frontend Port: `5174`

### Step 4: Seed the Database (Optional)

```bash
# Add sample plant products to the database
npm run seed
```

### Step 5: Start Development Servers

```bash
# Start both frontend and backend simultaneously
npm run dev
```

This will start:

- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:5174

### 🌱 What You'll See

1. **Frontend (http://localhost:5174)**:

   - Beautiful plant e-commerce interface
   - Product grid with plant cards
   - Navigation with categories
   - Responsive design

2. **Backend API (http://localhost:5000)**:
   - RESTful API endpoints
   - Product management
   - User authentication (ready for implementation)
   - Order processing (ready for implementation)

### 📁 Project Structure Overview

```
plantify/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/    # Navigation, ProductCard, Footer, Banner
│   │   ├── pages/         # Home page
│   │   └── services/      # API integration
├── backend/           # Express + MongoDB
│   ├── models/           # User, Product, Order, Cart schemas
│   ├── routes/           # API endpoints
│   ├── controllers/      # Business logic
│   └── seeders/          # Sample data
└── assets/           # Plant images (to be added)
```

### 🔧 Available Scripts

- `npm run dev` - Start both servers
- `npm run client` - Frontend only
- `npm run server` - Backend only
- `npm run seed` - Add sample products
- `npm run build` - Build for production

### 🌿 Next Steps

1. **Add Plant Images**: Place plant images in the `assets/` directory
2. **Test API**: Visit http://localhost:5000/api/products to see the API
3. **Customize**: Modify components in `frontend/src/components/`
4. **Add Features**: Implement authentication, cart, checkout

### 🐛 Troubleshooting

**Port Already in Use:**

```bash
# Kill processes on ports 5000 or 5174
npx kill-port 5000
npx kill-port 5174
```

**PostCSS/Tailwind CSS Issues:**
If you get PostCSS plugin errors, fix the configuration:

```bash
cd frontend
# Remove old config and create .cjs version (for ES modules)
rm postcss.config.js
echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {}, }, }" > postcss.config.cjs
# Install correct Tailwind CSS version
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.0
```

**MongoDB Connection Issues:**

- Ensure MongoDB is running: `mongosh` (should connect)
- Check the connection string in `backend/.env`

**Module Not Found:**

```bash
# Reinstall dependencies (Windows PowerShell)
Remove-Item -Recurse -Force frontend/node_modules, backend/node_modules
npm run install-all
```

**Check Server Status:**

```bash
node check-status.js
```

### 🎯 Key Features Implemented

✅ **Frontend**:

- React components for plant e-commerce
- Responsive design with Tailwind CSS
- API integration with Axios
- Product grid with hover effects
- Navigation with dropdowns

✅ **Backend**:

- Express.js REST API
- MongoDB with Mongoose
- Product CRUD operations
- User authentication system
- Order management
- Input validation and error handling

✅ **Integration**:

- Frontend-backend communication
- API proxy configuration
- Environment-based configuration
- Development scripts

Your MERN stack plant e-commerce application is ready for development! 🌱
