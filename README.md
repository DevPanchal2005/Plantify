# 🌱 Plantify - Plant E-Commerce Platform

![Plantify Logo](https://img.shields.io/badge/Plantify-Plant%20E--Commerce-green?style=for-the-badge&logo=leaf)

## 📋 Project Overview

**Plantify** is a modern, full-stack e-commerce platform dedicated to plant enthusiasts. Built with cutting-edge web technologies, it provides a seamless shopping experience for indoor plants, gardening supplies, and plant care accessories.

### 🎯 Key Objectives

- Create an intuitive plant shopping experience
- Provide comprehensive plant care information
- Build a community of plant lovers
- Offer secure and reliable e-commerce functionality

### 👥 Target Audience

- Plant enthusiasts and collectors
- Home gardening beginners
- Interior design enthusiasts
- Urban gardeners and apartment dwellers

## 🛠️ Technology Stack

### Frontend

![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.x-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-cyan?logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-7.x-red?logo=mongoose)

### Additional Tools

![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-blue?logo=gmail)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jsonwebtokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-Security-red?logo=security)

## 📁 Project Structure

```text
Plantify/
├── 📁 frontend/                    # React frontend application
│   ├── 📁 public/                  # Static assets
│   │   ├── 📁 assets/              # Product images and media
│   │   │   ├── 📁 anthrium/
│   │   │   ├── 📁 bamboo-palm-plant/
│   │   │   ├── 📁 brazilwood-plant/
│   │   │   ├── 📁 jade-plant-mini/
│   │   │   ├── 📁 lucky-bamboo/
│   │   │   ├── 📁 monstera/
│   │   │   ├── 📁 monstera-xl/
│   │   │   └── 📁 peace-lily-plant/
│   │   └── 📄 index.html           # Main HTML template
│   ├── 📁 src/                     # Source code
│   │   ├── 📁 components/          # Reusable UI components
│   │   │   ├── 📄 AuthModal.jsx    # Authentication modal
│   │   │   ├── 📄 ForgotPassword.jsx # Password reset form
│   │   │   ├── 📄 Header.jsx       # Navigation header
│   │   │   ├── 📄 Login.jsx        # Login form
│   │   │   ├── 📄 ProductCard.jsx  # Product display card
│   │   │   └── 📄 Register.jsx     # Registration form
│   │   ├── 📁 contexts/            # React Context providers
│   │   │   ├── 📄 AuthContext.jsx  # Authentication state
│   │   │   ├── 📄 CartContext.jsx  # Shopping cart state
│   │   │   └── 📄 SearchContext.jsx # Search functionality
│   │   ├── 📁 pages/               # Main application pages
│   │   │   ├── 📄 Home.jsx         # Homepage with products
│   │   │   ├── 📄 ProductDetail.jsx # Individual product page
│   │   │   ├── 📄 Profile.jsx      # User profile page
│   │   │   └── 📄 ResetPassword.jsx # Password reset page
│   │   ├── 📁 services/            # API communication
│   │   │   └── 📄 api.js           # HTTP client and endpoints
│   │   ├── 📄 App.jsx              # Main application component
│   │   └── 📄 main.jsx             # Application entry point
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 tailwind.config.js       # Tailwind CSS configuration
│   └── 📄 vite.config.js           # Vite build configuration
│
├── 📁 backend/                     # Node.js backend application
│   ├── 📁 config/                  # Configuration files
│   │   └── 📄 database.js          # MongoDB connection setup
│   ├── 📁 controllers/             # Business logic controllers
│   │   ├── 📄 cartController.js    # Shopping cart operations
│   │   ├── 📄 orderController.js   # Order management
│   │   ├── 📄 productController.js # Product CRUD operations
│   │   └── 📄 userController.js    # User authentication & profile
│   ├── 📁 middleware/              # Custom middleware functions
│   │   ├── 📄 auth.js              # JWT authentication middleware
│   │   └── 📄 validation.js        # Input validation middleware
│   ├── 📁 models/                  # MongoDB data models
│   │   ├── 📄 Cart.js              # Shopping cart schema
│   │   ├── 📄 Order.js             # Order schema
│   │   ├── 📄 Product.js           # Product schema
│   │   └── 📄 User.js              # User schema
│   ├── 📁 routes/                  # API route definitions
│   │   ├── 📄 cart.js              # Cart-related endpoints
│   │   ├── 📄 orders.js            # Order-related endpoints
│   │   ├── 📄 products.js          # Product-related endpoints
│   │   └── 📄 users.js             # User-related endpoints
│   ├── 📁 scripts/                 # Utility scripts
│   │   ├── 📄 addSingleProduct.js  # Add individual products
│   │   ├── 📄 checkUser.js         # User verification script
│   │   ├── 📄 testEmail.js         # Email service testing
│   │   └── 📄 testForgotPassword.js # Password reset testing
│   ├── 📁 seeders/                 # Database seeding
│   │   └── 📄 productSeeder.js     # Sample product data
│   ├── 📁 services/                # External service integrations
│   │   └── 📄 emailService.js      # Email notification service
│   ├── 📄 .env                     # Environment variables
│   ├── 📄 package.json             # Backend dependencies
│   └── 📄 server.js                # Express server entry point
│
└── 📄 README.md                    # Project documentation
```

## ✨ Implemented Features (Current)

### 🔐 User Authentication System

- **User Registration**: Secure account creation with email validation
- **User Login**: JWT-based authentication with "Remember Me" option
- **Password Reset**: Email-based password recovery with secure tokens
- **Profile Management**: Update user information and preferences
- **Session Management**: Automatic token refresh and logout

### 🛍️ E-Commerce Core Features

- **Product Catalog**: Browse extensive plant collection with high-quality images
- **Advanced Search**: Real-time search with filters (category, price, difficulty)
- **Product Details**: Comprehensive plant information including care instructions
- **Shopping Cart**: Add, remove, and modify cart items with persistent storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📧 Communication Features

- **Email Notifications**: Professional HTML email templates
- **Password Recovery**: Secure email-based password reset system
- **Welcome Emails**: Automated onboarding communication

### 🎨 User Experience

- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Loading States**: Smooth user interactions with loading indicators
- **Error Handling**: Comprehensive error messages and validation
- **Accessibility**: WCAG-compliant design principles

## 🚀 Future Scope Features (Roadmap)

### 🛒 Enhanced E-Commerce

- **Wishlist Functionality**: Save favorite plants for later
- **Order Management**: Complete order tracking and history
- **Payment Gateway**: Secure payment processing (Stripe/PayPal)
- **Inventory Management**: Real-time stock tracking
- **Multi-currency Support**: International market expansion

### 👨‍💼 Admin Features

- **Admin Dashboard**: Comprehensive management interface
- **Product Management**: CRUD operations for plant catalog
- **User Management**: Customer support and account management
- **Analytics Dashboard**: Sales and user behavior insights
- **Bulk Operations**: Efficient inventory and order management

### 🌟 Community Features

- **Product Reviews**: Customer feedback and rating system
- **Plant Care Tips**: Community-driven care guides
- **Social Integration**: Share favorite plants on social media
- **Plant Care Reminders**: Personalized care notifications
- **Expert Consultation**: Connect with plant care specialists

### 📱 Advanced Features

- **Mobile App**: Native iOS and Android applications
- **Push Notifications**: Order updates and care reminders
- **AR Plant Placement**: Visualize plants in your space
- **Plant Health Scanner**: AI-powered plant disease detection
- **Subscription Service**: Regular plant delivery service

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18.x or higher)
- MongoDB (v6.x or higher)
- npm or yarn package manager
- Git version control

### Backend Setup

```bash
# Clone the repository
git clone <repository-url>
cd Plantify/backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Seed the database
node seeders/productSeeder.js

# Start the development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

```env
# Backend (.env)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/plantify
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5174
FRONTEND_URL=http://localhost:5174
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@plantify.com
```

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/users/register     # User registration
POST /api/users/login        # User login
POST /api/users/forgot-password # Password reset request
POST /api/users/reset-password  # Password reset confirmation
GET  /api/users/profile      # Get user profile
PUT  /api/users/profile      # Update user profile
```

### Product Endpoints

```http
GET    /api/products         # Get all products
GET    /api/products/:id     # Get single product
POST   /api/products         # Create product (Admin)
PUT    /api/products/:id     # Update product (Admin)
DELETE /api/products/:id     # Delete product (Admin)
```

### Cart Endpoints

```http
GET    /api/cart             # Get user cart
POST   /api/cart/add         # Add item to cart
PUT    /api/cart/update      # Update cart item
DELETE /api/cart/remove      # Remove cart item
DELETE /api/cart/clear       # Clear entire cart
```

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: Object,
  role: String (user/admin),
  wishlist: [ObjectId],
  isActive: Boolean,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: String,
  description: String,
  shortDescription: String,
  price: Number,
  originalPrice: Number,
  category: String,
  images: Object,
  stock: Number,
  sku: String (unique),
  rating: Object,
  careInstructions: Object,
  specifications: Object,
  features: [String],
  badges: [String],
  tags: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🏗️ Technical Architecture

### Frontend Architecture

- **Component-Based**: Modular React components for reusability
- **Context API**: Global state management for auth, cart, and search
- **Custom Hooks**: Reusable logic for API calls and state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Architecture

- **MVC Pattern**: Separation of concerns with models, views, and controllers
- **Middleware Stack**: Authentication, validation, and error handling
- **RESTful API**: Standard HTTP methods and status codes
- **Database ODM**: Mongoose for MongoDB object modeling

### Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Cross-origin resource sharing setup
- **Helmet.js**: Security headers for Express applications

## 📊 Performance & Scalability

### Current Optimizations

- **Image Optimization**: Compressed product images
- **Lazy Loading**: On-demand component and image loading
- **Caching**: Browser caching for static assets
- **Database Indexing**: Optimized queries with proper indexes

### Scalability Considerations

- **Microservices**: Future migration to microservices architecture
- **CDN Integration**: Content delivery network for global reach
- **Database Sharding**: Horizontal scaling for large datasets
- **Load Balancing**: Multiple server instances for high availability
- **Caching Layer**: Redis for session and data caching

## 🎯 Presentation Highlights

### Key Selling Points

1. **Modern Technology Stack**: Latest web technologies for optimal performance
2. **User-Centric Design**: Intuitive interface designed for plant enthusiasts
3. **Scalable Architecture**: Built to handle growth and expansion
4. **Security First**: Comprehensive security measures implemented
5. **Mobile Responsive**: Seamless experience across all devices

### Demo Features

1. **Product Browsing**: Showcase the plant catalog and search functionality
2. **User Authentication**: Demonstrate login, registration, and password reset
3. **Shopping Cart**: Show add to cart and cart management features
4. **Email Integration**: Display professional email templates
5. **Responsive Design**: Show mobile and desktop views

## 👥 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ by the Plantify** 🌱
