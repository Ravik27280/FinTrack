# 💰 FinTrack – Personal Expense Tracker with Budget & AI Insights

![FinTrack Banner](https://img.shields.io/badge/FinTrack-Personal%20Finance%20Manager-green?style=for-the-badge)  
A full-stack personal finance tracker that helps users manage expenses, set budgets, and gain insights through intuitive dashboards and smart analytics.

---

## 🚀 Features

- 📊 **Dashboard Overview** – Track weekly, monthly, and yearly expenses with visual insights.
- 🧾 **Transaction Management** – Add, edit, delete income or expense entries across categories.
- 🎯 **Budgets & Goals** – Set category-wise budgets and savings goals with progress tracking.
- 🧠 **AI Insights (Upcoming)** – Smart suggestions and alerts based on user spending behavior.
- 🔔 **Alerts & Reminders** – Get notified when you exceed your budget limits.
- 🔐 **Authentication System** – Secure sign-up/login system with role-based access (Admin/User).
- 🌈 **Clean UI** – Modern and responsive frontend built with React and TailwindCSS.

---

## 🛠️ Tech Stack

**Frontend**  
- ⚛️ React.js (Vite)  
- 🧪 Zustand (State management)  
- 🎨 Tailwind CSS  
- 📁 Axios, React Router DOM

**Backend**  
- 🟢 Node.js + Express.js  
- 🐬 MongoDB with Mongoose  
- 🔐 JWT Authentication  
- 📈 Aggregation pipelines for analytics

---

## 📷 Screenshots

<!-- You can replace with actual links -->
| Dashboard | Budgets | Transactions |
|----------|----------|--------------|
| ![Dashboard](https://via.placeholder.com/300x180.png?text=Dashboard) | ![Budgets](https://via.placeholder.com/300x180.png?text=Budgets) | ![Transactions](https://via.placeholder.com/300x180.png?text=Transactions) |

---

## 🧪 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

### 🔧 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ravik27280/FinTrack.git
   cd FinTrack
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Setup Environment Variables**

   Create a `.env` file in `server/`:

   ```
   PORT=5000
   MONGODB_URI=your_mongo_db_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the App**

   - Run backend
     ```bash
     cd server
     npm run dev
     ```

   - Run frontend
     ```bash
     cd client
     npm run dev
     ```

   App will be live at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure

```
FinTrack/
├── client/           # React frontend
├── server/           # Node/Express backend
├── README.md
```

---

## 📌 Upcoming Features

- 🔍 Search & Filter for transactions
- 📅 Calendar View for daily tracking
- 📥 Import/Export transactions (CSV/Excel)
- 🤖 AI Assistant for financial tips
- 📱 PWA Support for mobile use

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 🧑‍💻 Author

**Ravi Vishwakarma**  
[GitHub](https://github.com/Ravik27280) | [LinkedIn](https://www.linkedin.com/in/ravi-vishwakarma27280)

---

## 📄 License

This project is licensed under the MIT License.
