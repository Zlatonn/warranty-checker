# ✅ Warranty Checker

## 📋 Overview

A web application for tracking warranty expiration dates of items. Users can log in, add items, edit details, delete items, and filter items based on warranty status.

## 🚀 Features

- **Authentication**: User login system.
- **Item Management**: Add, edit, and delete items.
- **Filtering Options**:
  - **In Warranty**: Items with valid warranties.
  - **Near Expiry**: Items approaching expiration.
  - **Expired**: Items with expired warranties.

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, DaisyUI,TanStack Query, Axios, React Hook Form, Use-debounce
- **Backend**: Node.js, TypeScript, Express, SQLite, JWT Authentication, Bcrypt
- **Deployment**: Frontend on Netlify, Backend on Railway
- **State Management**: Zustand
- **API Handling**: Axios (for REST API requests)

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16)
- Docker (optional, for containerized deployment)

### Clone Project

```bash
git clone https://github.com/Zlatonn/warranty-expiry-checker.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🎮 Usage

1. **Login** with your credentials.
2. **Add Items** with warranty details.
3. **Manage Items** (edit or delete as needed).
4. **Filter** items by warranty status.

## 📸 Screenshots

- Home Page

  ![Home](./frontend/src/assets/home%20page.webp)
  ![Our Feature](./frontend/src/assets/our%20feature.webp)
  ![About](./frontend/src/assets/about.webp)

- Login Page

  ![Login Page](./frontend/src/assets/login%20page.webp)
  email: warranty@mail.com
  password: Passw0rd

- Items Page

  ![Items Page](./frontend/src/assets/items%20page.webp)

- Create Page

  ![Create Page](./frontend/src/assets/create%20page.webp)

- Edit Page

  ![Edit Page](./frontend/src/assets/edit%20page.webp)

- Filter Page

  ![Warranty Filter](./frontend/src/assets/warranty%20filter.webp)
  ![Near Expire Filter](./frontend/src/assets/near%20expire%20filter.webp)
  ![Expired Filter](./frontend/src/assets/expired%20filter.webp)

## 🌐 Live Demo

Explore the live version of the form here:
👉 https://warranty-checker.netlify.app/

## 🧑‍💻 Contributors

Zlatonn

## 📜 License

This project is licensed under the MIT License.

## 📈 Future Enhancements

- Notification system for expiring warranties
- Enhance scalability with separate register and item data for each user.
- Admin system for managing user data
- Security & Privacy
- Enhance UI/UX
