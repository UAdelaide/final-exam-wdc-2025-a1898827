# Dog Walking Service - Part 2

A web application for connecting dog owners with walkers, featuring user authentication and role-based dashboards.

## Features

- **User Authentication**: Login system with session management
- **Role-Based Access**: Separate dashboards for owners and walkers
- **Session Management**: Secure session handling with express-session
- **Responsive UI**: Modern Bootstrap-based interface

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   - Ensure MySQL is running
   - Create the database using the SQL schema from `part1/dogwalks.sql`
   - Update database connection in `models/db.js` if needed

3. **Setup Demo Users**:
   ```bash
   npm run setup-demo
   ```

4. **Start the Application**:
   ```bash
   npm start
   ```

## Demo Accounts

After running the setup script, you can use these demo accounts:

- **Owner**: `owner@example.com` / `password`
- **Walker**: `walker@example.com` / `password`

## Login Flow

1. Visit the home page (`/`)
2. Enter your email and password
3. Upon successful login:
   - **Owners** are redirected to `/owner-dashboard.html`
   - **Walkers** are redirected to `/walker-dashboard.html`
4. Session information is stored securely
5. Users can logout from their respective dashboards

## Security Features

- Session-based authentication
- Role-based access control
- Protected dashboard routes
- Automatic redirect to login for unauthenticated users

## API Endpoints

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/status` - Check authentication status
- `GET /api/users` - Get all users (admin)
- `POST /api/users/register` - Register new user
- `GET /api/users/me` - Get current user info