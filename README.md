# CRUD Product Application

A full-stack CRUD (Create, Read, Update, Delete) application for managing users/products with image upload support, built with PHP, JavaScript, and MySQL.

## Features

- **Create** new users with name, email, password, and optional profile image
- **Read** and display all users in a responsive table
- **View** individual user details in a modal
- **Update** user information including optional image replacement
- **Delete** users with confirmation dialog
- Image upload with preview functionality
- Password confirmation validation
- Loading spinner during data fetch
- Responsive modal dialogs for all operations

## Project Structure

```
├── api/
│   ├── add.php          # Create new user
│   ├── delete.php       # Delete existing user
│   ├── get.php          # Get single user by ID
│   ├── read.php         # Get all users
│   └── update.php       # Update existing user
├── assets/
│   ├── style.css        # Main stylesheet
│   └── script.js        # Frontend JavaScript logic
├── config/
│   └── db.php           # Database connection
├── uploads/             # User uploaded images
├── index.html           # Main HTML page
└── yu.session.sql       # Database schema
```

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- XAMPP/WAMP/LAMP or any PHP server

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 01-crud
   ```

2. **Configure Database**
   - Create a MySQL database named `js`
   - Update `config/db.php` with your database credentials
   - Default credentials: host=localhost, user=root, password=1234

3. **Create Database Table**
   ```sql
   CREATE TABLE users(
       user_id INT PRIMARY KEY AUTO_INCREMENT,
       user_name VARCHAR(100) NOT NULL,
       user_email VARCHAR(100) NOT NULL UNIQUE,
       user_password VARCHAR(100) NOT NULL,
       user_image TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Start the Server**
   - Place the project in your web server's document root (e.g., `htdocs` for XAMPP)
   - Start Apache and MySQL services
   - Access the application at `http://localhost/01-crud`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/read.php` | Fetch all users |
| GET | `/api/get.php?id=X` | Fetch single user by ID |
| POST | `/api/add.php` | Create new user |
| POST | `/api/update.php` | Update existing user |
| POST | `/api/delete.php` | Delete user by ID |

## Database Schema

The `users` table stores:
- `user_id` - Auto-incrementing primary key
- `user_name` - User's display name
- `user_email` - Unique email address
- `user_password` - Hashed password (bcrypt)
- `user_image` - Path to uploaded image
- `created_at` - Timestamp of creation

## Security Notes

- Passwords are hashed using `password_hash()` with bcrypt
- SQL injection is prevented using prepared statements
- File uploads are validated and stored securely
- Old images are deleted when updated or user is removed

## Frontend Technologies

- HTML5 for structure
- CSS3 for styling (custom scrollbar, animations, responsive design)
- Vanilla JavaScript (ES6+) for functionality
- Fetch API for AJAX requests
- FormData API for file uploads

## Backend Technologies

- PHP 7.4+ for API endpoints
- PDO for database operations
- JSON for data exchange format
