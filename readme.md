🛒 Mini E-commerce Backend API

A role-based E-commerce backend built with Node.js, Express, and MongoDB.
This project includes authentication, authorization, product management, cart, orders, and admin features.

🚀 Features

User Authentication

Register, Login, Logout with JWT

Password hashing with bcrypt

Role-Based Access

Roles: customer, manager, admin

restrict middleware for secure route access

Product Management

Create, update, delete products (admin/manager only)

Public product listing with search & filtering

Cart System

Add to cart, update quantity, remove items

Clear cart, view cart details

Orders

Place orders from cart

View order history (customer)

Admin/Manager: view all orders, update order status

Admin Management

Promote/demote users (manager or admin)

Security

Helmet for HTTP headers

Rate limiting for brute force protection

Data sanitization with mongo-sanitize

CORS enabled

📦 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication: JWT, bcrypt

Security: Helmet, Rate Limiting, Mongo-sanitize, CORS

Tools: Postman, Git

📂 Project Structure
mini-ecommerce-backend/
│-- config/         # DB connection, environment setup
│-- controllers/    # Business logic (users, products, orders)
│-- middlewares/    # Auth, error handling, security
│-- models/         # Mongoose schemas (User, Product, Order, Cart)
│-- routes/         # API routes (users, products, cart, orders, admin)
│-- utils/          # Helper functions
│-- server.js       # App entry point

🔑 API Endpoints
Auth

POST /api/users/register → Register new user

POST /api/users/login → Login

POST /api/users/logout → Logout (protected)

Products

GET /api/products → Get all products

POST /api/products → Create product (admin/manager only)

PUT /api/products/:id → Update product (admin/manager only)

DELETE /api/products/:id → Delete product (admin only)

Cart

POST /api/cart → Add to cart

GET /api/cart → View cart

PUT /api/cart/:id → Update quantity

DELETE /api/cart/:id → Remove item

DELETE /api/cart → Clear cart

Orders

POST /api/orders → Place order

GET /api/orders → User order history

GET /api/admin/order → Admin get all orders (admin/manager only)

PUT /api/admin/order/:orderId → Update order status (admin only)

🧪 Testing

All routes tested using Postman

API documentation screenshots available in /docs

📌 Installation & Setup
# Clone the repo
git clone https://github.com/YOUR_USERNAME/mini-ecommerce-backend.git

# Install dependencies
npm install

# Add environment variables in .env
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
PORT=5000

# Run the server
npm run dev

## ⚙️ Setup
1. Copy `.env.example` to `.env`
2. Fill in your own values:
   - `MONGO_URI` → your MongoDB connection string
   - `JWT_SECRET` → any random string (used for signing tokens)
   - `JWT_EXPIRES_IN` → e.g. `1d` (1 day)
   - `PORT` → default 5000

⚠️ Work in Progress

This project is under development. Current progress includes:
- Project structure
- Models, routes, controllers
- Initial middleware setup


Server runs on 👉 http://localhost:5000/

📸 Proof & Documentation

Postman screenshots of all endpoints tested

Error handling & edge cases verified

📜 License

This project is licensed under the MIT License.