# The Glimpse of Bharat - Backend API

Express.js REST API for managing India's freedom fighters database with MongoDB.

## 🌐 Live API

**Production URL**: [https://the-glimpse-of-bharat.onrender.com](https://the-glimpse-of-bharat.onrender.com)

**Frontend**: [https://the-glimpse-of-bharat-code.vercel.app](https://the-glimpse-of-bharat-code.vercel.app)

## 🚀 Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Role-based authorization (Admin/User)
- CRUD operations for freedom fighters
- Contribution management system
- Pagination, sorting, and filtering
- CORS enabled for frontend

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Deployment**: Render

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file with:
# DATABASE_URL=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=4000

# Seed database with 30 freedom fighters
node seed.js

# Start development server
npm run dev

# Start production server
npm start
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key_here
PORT=4000
```

## 📁 Project Structure

```
GOB-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── fighterController.js  # Fighter CRUD operations
│   └── contributionController.js  # Contribution management
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── adminMiddleware.js    # Admin role check
├── models/
│   ├── User.js               # User schema
│   ├── FreedomFighter.js     # Fighter schema
│   ├── Contribution.js       # Contribution schema
│   └── Activity.js           # Timeline/Activity schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── fighterRoutes.js      # Fighter endpoints
│   ├── contributionRoutes.js # Contribution endpoints
│   └── userRoutes.js         # User endpoints
├── seed.js                   # Database seeding script
└── server.js                 # Application entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Fighters
- `GET /api/fighters` - List all fighters (with pagination, sorting, filtering)
- `GET /api/fighters/:id` - Get single fighter
- `POST /api/fighters` - Create fighter (Admin only)
- `PUT /api/fighters/:id` - Update fighter (Admin only)
- `DELETE /api/fighters/:id` - Delete fighter (Admin only)

### Contributions
- `POST /api/contributions` - Submit contribution (Auth required)
- `GET /api/contributions` - Get contributions
- `PUT /api/contributions/:id/status` - Approve/Reject (Admin only)

### Query Parameters (GET /api/fighters)
- `search` - Search term
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Field to sort by (default: 'name')
- `sortOrder` - 'asc' or 'desc' (default: 'asc')
- `role` - Filter by role
- `location` - Filter by location

## 🔑 Admin Credentials

**Email**: admin@example.com  
**Password**: admin123

## 🗄️ Database

The application uses MongoDB Atlas with the following collections:
- `users` - User accounts
- `freedomfighters` - Freedom fighter profiles
- `contributions` - User submissions
- `activities` - Timeline events

## 🚀 Deployment

Deployed on Render with:
- Automatic deploys from GitHub
- Environment variables configured
- MongoDB Atlas whitelisted (0.0.0.0/0)

## 📖 Documentation

Complete API documentation and architecture details available in the project repository.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is part of "The Glimpse of Bharat" initiative.
