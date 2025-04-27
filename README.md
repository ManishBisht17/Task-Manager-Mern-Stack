📝 Task Manager (MERN Stack)
A full-stack Task Manager application built with MongoDB, Express.js, React, and Node.js.
Manage your daily tasks easily with a clean UI and responsive design.

🚀 Features
Add, update, delete tasks

Mark tasks as completed

Responsive design

Dark mode support

Persistent storage with MongoDB

🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS (optional if used), React Icons

Backend: Node.js, Express.js

Database: MongoDB

📂 Project Structure
scss
Copy
Edit
root
│
├── client   → Frontend (React)
└── server   → Backend (Express, Node.js)
⚙️ Installation and Setup
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Set up the Client (Frontend)
bash
Copy
Edit
cd client
npm install
npm run dev
This will start the frontend at http://localhost:5173 (or a similar port).

3. Set up the Server (Backend)
Open a new terminal:

bash
Copy
Edit
cd server
npm install
node server.js
This will start your backend server at http://localhost:5000 (or as configured).

🌐 Deployment
You can deploy the project using platforms like Render, Vercel, Railway, or Netlify (for frontend only).

📄 Environment Variables
Make sure to configure your MongoDB connection string in the server. Create a .env file inside server/:

env
Copy
Edit
MONGO_URI=your-mongodb-connection-url
PORT=5000
✨ Acknowledgements
React

Express

MongoDB

React Icons
