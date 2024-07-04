# Journaling App Backend

This is the backend service for a personal journaling application. It provides RESTful API endpoints for user management, journal entry management, and data summary features. The backend is built using Node.js and PostgreSQL.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Journal Entry Management](#journal-entry-management)
  - [Data Summary](#data-summary)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
1. **User Management**
   - User registration and authentication (JWT-based).
   - Profile management.

2. **Journal Entry Management**
   - CRUD operations for journal entries.
   - Categorization of entries.

3. **Data Summary**
   - Endpoints to fetch summary data for given periods.

4. **Security**
   - All endpoints are secure and accessible only by authenticated users.

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- PostgreSQL (>= 12.x)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/journaling-app-backend.git
    cd journaling-app-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up PostgreSQL:
    - Create a new PostgreSQL database:
      ```sh
      sudo -i -u postgres
      psql
      CREATE DATABASE journaling_app;
      CREATE USER "user" WITH PASSWORD '1234';
      GRANT ALL PRIVILEGES ON DATABASE journaling_app TO "user";
      \q
      exit
      ```

4. Configure environment variables:
    - Create a `.env` file in the root directory and add the following:
      ```env
      PORT=3000
      DATABASE_URL=postgresql://user:1234@localhost:5432/journaling_app
      JWT_SECRET=your_jwt_secret
      ```

### Running the Application
1. Start the development server:
    ```sh
    npx nodemon app.js
    ```

2. The server should now be running on `http://localhost:3000`.

## API Endpoints

### User Management

- **Register a new user**
  - **URL**: `/api/users/register`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```

- **Login**
  - **URL**: `/api/users/login`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```

### Journal Entry Management

- **Create a new journal entry**
  - **URL**: `/api/journals`
  - **Method**: `POST`
  - **Headers**: 
    - `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
  - **Body**:
    ```json
    {
      "title": "First Entry",
      "content": "This is my first journal entry",
      "category": "Personal"
    }
    ```

- **Get journal entries**
  - **URL**: `/api/journals`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization`: `Bearer <YOUR_JWT_TOKEN>`

- **Update a journal entry**
  - **URL**: `/api/journals/<JOURNAL_ID>`
  - **Method**: `PUT`
  - **Headers**:
    - `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
  - **Body**:
    ```json
    {
      "title": "Updated Entry",
      "content": "This is the updated content",
      "category": "Work"
    }
    ```

- **Delete a journal entry**
  - **URL**: `/api/journals/<JOURNAL_ID>`
  - **Method**: `DELETE`
  - **Headers**:
    - `Authorization`: `Bearer <YOUR_JWT_TOKEN>`

### Data Summary

- **Get summary data**
  - **URL**: `/api/journals/summary`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
  - **Query Parameters**:
    - `startDate`: `YYYY-MM-DD`
    - `endDate`: `YYYY-MM-DD`

## Database Schema
- **Users Table**
  ```sql
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
  );

-**Journals Table**
```sql
CREATE TABLE journals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## Environment Variables
The .env file should contain the following environment variables:
```
PORT=3000
DATABASE_URL=postgresql://user:1234@localhost:5432/journaling_app
JWT_SECRET=your_jwt_secret
```
## Contributing
Fork the repository.

Create a new branch (`git checkout -b feature-branch`).

Make your changes.

Commit your changes (`git commit -m 'Add new feature`).

Push to the branch (`git push origin feature-branch`).

Open a Pull Request.

## License

This project is licensed under the MIT License.

