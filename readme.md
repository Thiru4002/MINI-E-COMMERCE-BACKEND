# 🛒 Mini E-commerce Backend API

A role-based **E-commerce backend system** built using **Node.js, Express, and MongoDB**.  
Includes full authentication, authorization, product management, cart, orders, admin controls, and essential backend security.

---

## 🚀 Features

### 🔐 **User Authentication**
- Register, Login, Logout using JWT  
- Password hashing with bcrypt  
- Protected routes via middleware  
- Forgot/Reset Password (optional expansion)

---

### 🛂 **Role-Based Access**
- Roles: `customer`, `manager`, `admin`  
- `restrict` middleware for secure access  
- Admin/Manager: manage products & orders  
- Admin: manage users

---

### 🛍️ **Product Management**
- Create, update, delete products (admin/manager)  
- Public product listing  
- Search, filtering, pagination  

---

### 🛒 **Cart System**
- Add items to cart  
- Update item quantity  
- Remove items  
- Clear cart  
- View cart details  

---

### 📦 **Order System**
- Place order from cart  
- View order history (customer)  
- Admin/Manager:  
  - View all orders  
  - Update order status  

---

### 🛡️ **Security**
- **Helmet** – secure HTTP headers  
- **Rate Limiting** – brute-force protection  
- **Mongo-sanitize** – prevents NoSQL injection  
- **CORS** enabled  
- **XSS Protection** (optional)  

---

## 📦 Tech Stack

| Category | Technology |
|---------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Security | Helmet, Rate Limiting, CORS, Mongo-sanitize |
| Tools | Postman, Git |

---

## 📁 Project Structure

```
mini-ecommerce-backend/
│
├── config/                # DB connection & environment setup
├── controllers/           # Business logic (users, products, orders)
├── middlewares/           # Auth, role check, error handling
├── models/                # Mongoose schemas (User, Product, Order, Cart)
├── routes/                # All API routes
├── utils/                 # Token helpers, validators
│
├── server.js              # App entry point
└── README.md
```

---

## 🔑 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| POST | `/api/users/logout` | Logout (protected) |

---

### **Products**
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| POST | `/api/products` | Admin/Manager | Create product |
| PUT | `/api/products/:id` | Admin/Manager | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

---

### **Cart**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart` | Add to cart |
| GET | `/api/cart` | View cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove item |
| DELETE | `/api/cart` | Clear cart |

---

### **Orders**
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/orders` | User | Place order |
| GET | `/api/orders` | User | Order history |
| GET | `/api/admin/order` | Admin/Manager | View all orders |
| PUT | `/api/admin/order/:orderId` | Admin | Update order status |

---

## 🧪 Testing
- All routes tested using **Postman**
- API documentation screenshots available in `/docs` (optional)

---

## 📌 Installation & Setup

### **1. Clone the repo**
```
git clone https://github.com/YOUR_USERNAME/mini-ecommerce-backend.git
```

### **2. Install dependencies**
```
npm install
```

### **3. Create `.env` file**
```
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
PORT=5000
```

### **4. Start the server**
```
npm run dev
```

---

## ⚙️ Environment Setup

If you have `.env.example`, copy it:
```
cp .env.example .env
```

Then update with your values:
- `MONGO_URI` → MongoDB Atlas or local connection  
- `JWT_SECRET` → long random string  
- `PORT` → 5000 or any  

---

## ⚠️ Work in Progress
This project is currently under development.

Completed:
- Project structure  
- Models, controllers, routes  
- Authentication & security  
- Server running at → `http://localhost:5000/`

---

## 📸 Proof of Development
- Postman test screenshots  
- Verified error handling  
- Clean folder structure  
- Working CRUD features  

---

## 📜 License
This project is licensed under the **MIT License**.

