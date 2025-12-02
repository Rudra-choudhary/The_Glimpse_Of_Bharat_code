# The Glimpse of Bharat - Frontend

A Next.js application showcasing India's freedom fighters with rich profiles, contributions, and historical timelines.

## 🌐 Live Application

**Production URL**: [https://the-glimpse-of-bharat-code.vercel.app](https://the-glimpse-of-bharat-code.vercel.app)

**Backend API**: [https://the-glimpse-of-bharat.onrender.com](https://the-glimpse-of-bharat.onrender.com)

## 🚀 Features

- Browse 30+ freedom fighters with pagination (20 per page)
- Search, sort, and filter fighters by name, role, and location
- View detailed fighter profiles with Markdown-formatted biographies
- User authentication (signup/login)
- Submit contributions for new fighters or updates
- Admin dashboard for managing content
- Responsive design with modern UI

## 🛠️ Tech Stack

- **Framework**: Next.js (React)
- **HTTP Client**: Axios
- **Styling**: Custom CSS
- **Markdown**: react-markdown
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌍 Environment

The application connects to the production backend at:
```
https://the-glimpse-of-bharat.onrender.com
```

For local development, update API URLs in the pages to:
```
http://localhost:4000
```

## 📁 Project Structure

```
GOB-frontend/
├── pages/
│   ├── index.js              # Home page
│   ├── login.js              # User login
│   ├── signup.js             # User registration
│   ├── contribute.js         # Contribution form
│   ├── fighters/
│   │   ├── index.js          # Browse fighters (with pagination)
│   │   └── [id].js           # Fighter detail page
│   └── admin/
│       ├── index.js          # Admin dashboard
│       ├── login.js          # Admin login
│       └── preview/[id].js   # Preview contributions
├── styles/
│   └── globals.css           # Global styles
└── public/                   # Static assets
```

## 🔑 Admin Access

**Email**: admin@example.com  
**Password**: admin123

## 📖 Documentation

Complete technical documentation available in the project repository.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is part of "The Glimpse of Bharat" initiative.
