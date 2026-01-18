# 📚 BookFinder Application

BookFinder is a full-stack web application designed to manage and discover books. It features a secure authentication system with Role-Based Access Control (RBAC), distinguishing between **Book Recommenders** (Admins) who manage the library and **Book Readers** (Users) who browse the collection.

The application is built using a decoupled architecture with a **.NET Core Web API** backend and a **React** frontend, styled with a modern glassmorphism aesthetic.

## 🚀 Features

### Authentication & Security
* **User Registration & Login:** Secure signup and login flow using JWT (JSON Web Tokens).
* **Role-Based Authorization:**
    * **BookRecommender:** Admin privileges to Add, Edit, and Delete books.
    * **BookReader:** Read-only access to view the book library.
* **Protected Routes:** Frontend "Guard" components (`PrivateRoute`) prevent unauthorized access to Admin pages.

### Book Management (CRUD)
* **Create:** Admins can add new books with details (Title, Author, Genre, Date, Cover Image).
* **Read:** Both roles can view the list of books in a responsive grid/table layout.
* **Update:** Admins can edit existing book details.
* **Delete:** Admins can remove books from the system (with confirmation prompts).

### User Experience (UX)
* **Responsive UI:** Modern design with glassmorphism effects and clean typography (Poppins).
* **Dynamic Navigation:** The Navbar changes automatically based on the logged-in user's role.
* **Error Handling:** Custom 404 Error pages and user-friendly validation messages.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 18
* **Routing:** React Router DOM v6
* **HTTP Client:** Axios
* **Styling:** CSS3 (Variables, Flexbox, Glassmorphism)

### Backend
* **Framework:** ASP.NET Core Web API (.NET 6/8)
* **Language:** C#
* **ORM:** Entity Framework Core (Code-First approach)
* **Authentication:** JWT Bearer Authentication

### Database
* **System:** Microsoft SQL Server

---

## ⚙️ Prerequisites

Before running this project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [.NET SDK](https://dotnet.microsoft.com/download) (v6.0 or higher)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or Developer edition)

---

## 📦 Installation & Setup

### 1. Database Setup
1.  Navigate to the `dotnetapp` folder.
2.  Open (or create) `appsettings.json`.
3.  Copy the configuration below, but ensure you update the `ConnectionStrings` to match your own SQL Server and the `JWT` settings:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=YOUR_SQL_SERVER_NAME;Initial Catalog=appdb;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Application Name='SQL Server Management Studio';Command Timeout=0"
  },
  "JWT": {
    "ValidAudience": "http://localhost:5000",
    "ValidIssuer": "http://localhost:5000",
    "Secret": "ThisIsASecretKeyForJWTTokenGeneration12345"
  }
}
```

### 2. Backend (API) Setup
1.  Navigate to the backend project folder:
    ```bash
    cd dotnetapp
    ```
2.  Apply Entity Framework migrations to create the database:
    ```bash
    dotnet ef database update
    ```
3.  Start the API server:
    ```bash
    dotnet run
    ```
    *The API will typically start on `https://localhost:7192`.*

### 3. Frontend (React) Setup
1.  Navigate to the frontend project folder:
    ```bash
    cd reactapp
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Verify API Configuration:
    * Open `src/apiConfig.js` and ensure the URL matches your running backend port:
        ```javascript
        const API_BASE_URL = "https://localhost:7192/api";
        export default API_BASE_URL;
        ```
4.  Start the React development server:
    ```bash
    npm start
    ```
    *The app will open at `http://localhost:3000`.*

---

## 🔑 Usage Guide

### Roles & Credentials
**1. Create an Admin (BookRecommender)**
* Go to **Sign Up**.
* Fill in details and select Role: **Book Recommender**.
* Login. You will see the "Books" dropdown with "Add Book" options.

**2. Create a User (BookReader)**
* Go to **Sign Up**.
* Fill in details and select Role: **Book Reader**.
* Login. You will see a "Books" link that leads to a read-only view.

---

## 📂 Project Structure

```text
/
├── dotnetapp/             # ASP.NET Core Web API Backend
│   ├── Controllers/       # API Endpoints
│   ├── Models/            # Database Entities
│   └── Program.cs         # App Configuration
├── reactapp/              # React Frontend
│   ├── src/
│   │   ├── Components/    # Shared UI (Login, Signup, Home)
│   │   ├── BookRecommenderComponents/  # Admin Views
│   │   └── BookReaderComponents/       # User Views
└── README.md              # Project Documentation
