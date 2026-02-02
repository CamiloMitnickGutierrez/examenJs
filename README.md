# CRUDTASK - Academic Task Management System

CRUDTASK is a web application designed to simulate a complete flow of academic task management. It leverages modern tools such as **Vite**, **JSON Server**, and **Concurrently** to enhance the development workflow and enable dynamic data handling with responsive interfaces.

## Project Features

- **Simulated Authentication:** Handles user registration, login, and session persistence.
- **Role-based Management:** Clear differentiation of views between users and admins.
- **Task Management:** Create, read, update, and delete tasks.
- **Admin Dashboard:** Displays system statistics and supervision features.
- **Responsive Design:** UI follows standards and is optimized for different devices.
- **Key Tools Integration:**
  - **Vite:** For rapid frontend development and build.
  - **JSON Server:** To emulate a REST API for backend operations.
  - **Concurrently:** Simplifies the simultaneous execution of the client (frontend) and data server (JSON Server).

---

## Technologies Used

- **Frontend:**
  - HTML5, CSS3
  - CSS Frameworks: Bootstrap 5
  - Vanilla JavaScript

- **Development Tools:**
  - Vite (frontend development server).
  - JSON Server (mock API for local data persistence).
  - Concurrently (to run multiple services simultaneously).

- **Session Management:** LocalStorage or SessionStorage for session data.

---

## Project Structure

```
examenJs/
├── src/
│   ├── api/                # Logic for API interactions (CRUD)
│   ├── assets/             # Static resources (images, icons, styles)
│   ├── components/         # Reusable user interface components
│   ├── pages/              # Main views (login, tasks, profile, admin dashboard)
│   ├── routes/             # Role-based route management
│   ├── utils/              # Utility methods (validation, helpers)
│   └── main.js             # Main entry file
├── dataBase.json           # Local database for JSON Server
├── index.html              # Main HTML file
├── package.json            # Dependency and script configuration
├── vite.config.js          # Vite development configuration
└── README.md               # This file
```

---




### Steps to Run the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CamiloMitnickGutierrez/examenJs.git
   cd examenJs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the project:**

   CRUDTASK uses `Concurrently` to run the following services simultaneously:
   - **Vite:** For the user interface, available at `http://localhost:5173`.
   - **JSON Server:** For the mock API, available at `http://localhost:3050`.

   To start both services, run:

   ```bash
   npm run dev
   ```

---

## How to Use CRUDTASK

1. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).
2. You can perform the following actions:
   - **Users:** Manage their personal tasks after login and registration.
   - **Admins:** Access the dashboard to supervise and manage system activity.

---

## Key Dependency Configurations

### Concurrently

`Concurrently` is a tool to run multiple commands in parallel. In CRUDTASK, it is used to initialize both the frontend server (**Vite**) and the backend server (**JSON Server**).

```json
"scripts": {
  "dev": "concurrently \"vite\" \"json-server --watch dataBase.json --port 3050\""
  
}
```

### JSON Server

`JSON Server` provides a fast REST API configured with the `dataBase.json` file. It handles CRUD operations for user, task, and role data during development.

- All endpoints are available at `http://localhost:3050`.

Example data (`dataBase.json`):
```json
{
  "users": [
    { "id": 1, "username": "admin", "password": "admin", "role": "admin" },
    { "id": 2, "username": "user", "password": "user", "role": "user" }
  ],
  "tasks": [
    { "id": 1, "userId": 2, "title": "Task 1", "status": "pending" }
  ]
}
```

### Vite

`Vite` accelerates frontend development and build processes. It is configured to handle the required project files.

---

## Application Features

### User Role

- **Registration:** Automatically assigns the "user" role when creating an account.
- **Login:** Validates credentials against the JSON Server.
- **Task Management:**
  - List personal tasks.
  - Create, edit, delete, and update task status (pending, in progress, completed).
- **Profile:** View personal information and log out.

### Admin Role

- **Dashboard:**
  - Display general statistics (total tasks, completed tasks, and pending tasks).
- **Task Management:**
  - Perform CRUD operations on all tasks.
  - Update the status of any task.

---

## Business Rules

- **Protected Views and Routes:**
  - Only authenticated users can access certain views.
  - Routes are protected based on user roles.
- **Strict Validations:**
  - Users can only view and manage their own tasks.
  - Admins have access to all tasks and data.
  - No data manipulation is allowed outside the application without proper validation.

---



This project has been built by:
- Camilo Mitnick Gutierrez
