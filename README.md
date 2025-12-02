# The Glimpse of Bharat 🇮🇳

A comprehensive web application showcasing India's freedom fighters with rich profiles, historical timelines, and community contributions.

## 🌐 Live Application

**Frontend**: [https://the-glimpse-of-bharat-code.vercel.app](https://the-glimpse-of-bharat-code.vercel.app)

**Backend API**: [https://the-glimpse-of-bharat.onrender.com](https://the-glimpse-of-bharat.onrender.com)

**GitHub Repository**: [https://github.com/Rudra-choudhary/The_Glimpse_Of_Bharat_code](https://github.com/Rudra-choudhary/The_Glimpse_Of_Bharat_code)

## ✨ Features

### User Features
- 📚 Browse 30+ freedom fighters with detailed biographies
- 🔍 Search, sort, and filter by name, role, and location
- 📄 Pagination (20 fighters per page)
- 📝 Markdown-formatted descriptions with rich text
- 👤 User authentication (signup/login)
- ✍️ Submit contributions for new fighters or updates
- 📱 Responsive design for all devices

### Admin Features
- 🎛️ Comprehensive admin dashboard
- ✅ Review and approve/reject contributions
- ➕ Create new fighter profiles manually
- ✏️ Edit existing fighter profiles
- 🗑️ Delete fighter profiles
- 👁️ Preview contributions before approval

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **HTTP Client**: Axios
- **Styling**: Custom CSS
- **Markdown**: react-markdown
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Deployment**: Render

## 📁 Project Structure

```
The_Glimpse_Of_Bharat_code/
├── GOB-frontend/          # Next.js frontend application
│   ├── pages/             # React pages and routes
│   ├── styles/            # CSS styling
│   └── public/            # Static assets
│
└── GOB-backend/           # Express.js backend API
    ├── config/            # Database configuration
    ├── controllers/       # Business logic
    ├── models/            # MongoDB schemas
    ├── routes/            # API endpoints
    ├── middleware/        # Auth & admin verification
    └── seed.js            # Database seeding script
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

```bash
cd GOB-backend
npm install

# Create .env file
echo "DATABASE_URL=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "PORT=4000" >> .env

# Seed database with 30 freedom fighters
node seed.js

# Start server
npm start
```

### Frontend Setup

```bash
cd GOB-frontend
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000` and connect to the backend at `http://localhost:4000`.

## 🔑 Admin Access

**Email**: admin@example.com  
**Password**: admin123

## 📊 Database

The application includes 30 freedom fighters:
- Mahatma Gandhi
- Bhagat Singh
- Subhas Chandra Bose
- Jawaharlal Nehru
- Sardar Vallabhbhai Patel
- Rani Lakshmibai
- And 24 more...

Each fighter includes:
- Name, role, and location
- Detailed biography with Markdown formatting
- Birth and death dates
- Profile image

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

## 🎨 Features Implemented

✅ Server-side pagination (20 per page)  
✅ Sorting by name, role, location  
✅ Filtering by role and location  
✅ Real-time search  
✅ JWT authentication  
✅ Role-based authorization  
✅ Contribution system with approval workflow  
✅ Edit functionality for fighters  
✅ Preview contributions before approval  
✅ Markdown support for rich text  
✅ Responsive design  
✅ CORS enabled  
✅ Production deployment  

## 📖 Documentation

- [Frontend README](GOB-frontend/README.md)
- [Backend README](GOB-backend/README.md)
- [Complete Technical Documentation](DOCUMENTATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of "The Glimpse of Bharat" initiative to honor India's freedom fighters.

## 👨‍💻 Author

**Rudra Pratap Singh Choudhary**

## 🙏 Acknowledgments

- All the freedom fighters who sacrificed for India's independence
- MongoDB Atlas for database hosting
- Vercel for frontend hosting
- Render for backend hosting

---

Made with ❤️ for India
