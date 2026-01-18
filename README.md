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
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express, Developer, or LocalDB)

---

## 📦 Installation & Setup

### 1. Configuration (Crucial Step)
Before running the backend, you must configure the database connection and JWT secret settings.

1.  Navigate to the `dotnetapp` folder.
2.  Open (or create) `appsettings.json`.
3.  Ensure your file looks like this (update `Server` name as needed):

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
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=BookFinderDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "ThisIsAYeryLongSecretKeyForSecurityPurposes123!",
    "Issuer": "http://localhost:7192",
    "Audience": "http://localhost:7192"
  }
}
