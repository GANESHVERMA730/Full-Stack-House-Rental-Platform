# 🌍 Wanderlust — Full Stack House Rental Platform

Wanderlust is a full-stack vacation rental web application inspired by Airbnb. It allows users to browse property listings, create and manage their own listings, leave reviews, and authenticate securely using session-based login.

---

## Live Demo

👉 https://full-stack-house-rental-platform.onrender.com

---

## Features

### 🏠 Listings
- Browse all property listings
- View detailed listing pages
- Filter by categories (Mountains, Rooms, Cities, Camping, etc.)
- Search by title, location, or country
- View listing location on interactive map

### 👤 User System
- User signup & login
- Secure session-based authentication
- Create, edit, delete own listings
- Upload images for listings
- Logout functionality

### ⭐ Reviews
- Add reviews with ratings
- Delete own reviews
- Auto-delete reviews when listing is removed

### 🔐 Authentication
- Passport.js local strategy
- MongoDB session storage (connect-mongo)
- Protected routes for logged-in users
- Login rate limiting (security)

### 📱 UI/UX
- Responsive design (mobile + desktop)
- Flash messages for success & errors
- Clean Bootstrap UI

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- EJS + ejs-mate
- Passport.js
- express-session + connect-mongo
- Joi validation
- Multer + Cloudinary
- Leaflet + OpenStreetMap
- Bootstrap 5

---

## 📦 Installation

```bash
git clone <my-repo-url>
cd airbnb-project
npm install

⚙️ Environment Variables
Create a .env file in root:

ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

NODE_ENV=development
▶️ Run Project
Development
npm run dev
Production
npm start

Server runs at:

http://localhost:8080/listings
Database Seeding

Add sample listings:
node init/index.js <userId>

Example:

node init/index.js 64abc123def4567890abcdef
📁 Project Structure
airbnb-project/
│
├── app.js
├── cloudConfig.js
├── schema.js
├── middleware.js
├── package.json
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
└── init/
🌍 Categories
trending
rooms
cities
castles
mountains
arctic
camping
farmhouse
villa
boats

Example:
/listings?category=mountains
Deployment Notes
Set NODE_ENV=production
Add all environment variables on Render / hosting platform
Configure MongoDB Atlas (0.0.0.0/0)
Ensure Cloudinary credentials are added
Use npm start for production

Scripts
{
  "start": "node app.js",
  "dev": "nodemon app.js",
  "seed": "node init/index.js"
}

👨‍💻 Author
Your Name
GitHub: @your-username

📄 License
This project is licensed under the MIT License.