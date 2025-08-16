# Secure User Authentication System

## Objective
A robust and secure user authentication system built from scratch demonstrating critical full-stack development skills.

## Demo
**Live Demo Video:** [View Authentication System Demo](https://drive.google.com/file/d/1GBiTdDjeg0vWHEaPD6fUI0niYo_zKnCm/view?usp=sharing)

## Project Overview
This project implements a complete authentication system with secure user registration, login, and protected routes using modern web technologies including Node.js, Express, MongoDB, React, and JWT tokens.

## Backend Implementation

### Database Schema
**Location:** `backend/model/user.js`

MongoDB schema implemented with required fields:
- **username**: String, unique identifier for users
- **email**: String, unique and required for authentication
- **password**: String, required and securely hashed
- **timestamps**: Automatic creation and update timestamps

```javascript
const userSchema = new Schema({
    userName: {type: String, unique: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
}, {timestamps: true})
```

### Authentication Flow

#### User Registration (POST /api/auth/register)
**Location:** `backend/controllers/userCtrl.js` - `register` function

Implementation details:
- Input validation using express-validator
- Password hashing with bcrypt salt generation
- Duplicate email/username prevention
- Secure password storage (never plain text)

**Process:**
1. Validate input data (email format, password strength, username uniqueness)
2. Generate random salt for password hashing
3. Hash password using bcrypt with generated salt
4. Save user to MongoDB database
5. Return success response (201 status)

#### User Login (POST /api/auth/login)
**Location:** `backend/controllers/userCtrl.js` - `login` function

Implementation details:
- Email and password validation
- Secure password comparison using bcrypt
- JWT token generation with expiration
- User data return (excluding password)

**Process:**
1. Validate email and password format
2. Find user by email in database
3. Compare provided password with stored hash using bcrypt
4. Generate JWT token with user ID and 10-day expiration
5. Return token and user information

#### Protected Route (GET /api/protected)
**Location:** `backend/routes/userRoutes.js` and `backend/middleware/authenticate.js`

Implementation details:
- Authentication middleware for route protection
- JWT token verification
- User existence validation
- Current user data attachment to request

**Process:**
1. Extract Bearer token from Authorization header
2. Verify token using JWT secret key
3. Fetch current user data from database
4. Attach user information to request object
5. Continue to protected route handler

### Error Handling
**Locations:** Throughout backend controllers and middleware

Comprehensive error handling implemented:
- **401 Unauthorized**: Invalid or expired tokens, authentication failures
- **400 Bad Request**: Invalid credentials, validation errors
- **500 Internal Server Error**: Database connection issues, server errors

**Error Types Handled:**
- Missing or invalid JWT tokens
- Expired authentication tokens
- Invalid email/password combinations
- Duplicate user registration attempts
- Database connection failures

### Environment Variables
**Location:** `backend/.env`

Sensitive information stored securely:
- **PORT**: Server port configuration (3050)
- **DB_URL**: MongoDB connection string
- **JWT_SECRETKEY**: Secret key for JWT token signing and verification

## Frontend Implementation

### Components

#### Login Form Component
**Location:** `frontend/src/pages/Login.js`

Features implemented:
- Email and password input fields
- Client-side validation
- Server error handling
- Responsive design with professional styling
- Integration with global authentication state

#### Registration Form Component
**Location:** `frontend/src/pages/Register.js`

Features implemented:
- Username, email, and password input fields
- Strong password requirements validation
- Duplicate email handling
- Success redirect to login page
- Professional form styling

#### Protected Dashboard Component
**Location:** `frontend/src/pages/Dashboard.js`

Features implemented:
- User profile information display
- Welcome message with username
- Account statistics and information
- Professional dashboard layout
- Only accessible after authentication

#### Navigation Component
**Location:** `frontend/src/components/NavBar.js`

Dynamic navigation features:
- Authentication status-based rendering
- Login/Logout button switching
- User menu with profile information
- Professional branding (Hilo AI Labs)
- Responsive design

### State Management
**Location:** `frontend/src/components/AuthProvider.js` and `frontend/src/reducer/UserReducer.js`

React Context implementation:
- Global authentication state management
- User login/logout actions
- Loading state handling
- Automatic token validation on app load

**State Structure:**
- `isLoggedIn`: Boolean authentication status
- `user`: Current user information object
- `loading`: Application loading state

**Actions Implemented:**
- LOGIN: Set user as authenticated with user data
- LOGOUT: Clear authentication and user data
- SET_LOADING: Control loading state display

### Client-side Storage
**Location:** `frontend/src/components/AuthProvider.js`

Secure JWT storage implementation:
- **localStorage**: JWT token persistence across browser sessions
- **Automatic cleanup**: Token removal on logout
- **Session validation**: Token verification on application load
- **Security measures**: Proper token format handling

## Route Protection
**Location:** `frontend/src/components/PrivateRoute.js`

Protected route implementation:
- Dual authentication checks (localStorage + global state)
- Automatic redirect to login for unauthenticated users
- Seamless user experience for authenticated access

## Evaluation Criteria Compliance

### Secure Authentication Flow
- Password hashing with bcrypt salt generation
- JWT-based stateless authentication
- Secure token storage and transmission
- Proper session management

### JWT Implementation
- Stateless authentication design
- Token expiration handling (10 days)
- Bearer token format compliance
- Secure token verification process

### Middleware Usage
- Authentication middleware for API route protection
- Token validation and user verification
- Request object user data attachment
- Proper error response handling

### Separation of Concerns
- Authentication logic separated from UI components
- Dedicated authentication provider for state management
- Modular component architecture
- Clean API route organization

## Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Frontend**: React, React Router, React Context
- **Styling**: Custom CSS with professional green theme
- **Validation**: express-validator, custom client-side validation

## Security Features
- Password hashing with unique salts
- JWT token expiration
- Input validation and sanitization
- Protected route middleware
- Secure environment variable usage
- Authentication state verification

## Project Structure
```
User Authentication/
├── backend/
│   ├── config/db.js
│   ├── controllers/userCtrl.js
│   ├── middleware/authenticate.js
│   ├── model/user.js
│   ├── routes/userRoutes.js
│   ├── validators/userValidations.js
│   ├── .env
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── styles/
    │   ├── context/
    │   └── reducer/
    └── public/
```

This implementation demonstrates a production-ready authentication system with comprehensive security measures, proper error handling, and clean architectural patterns suitable for enterprise applications.

## Installation and Setup

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with required variables:
   ```
   PORT=3050
   DB_URL=mongodb://127.0.0.1:27017/userAuthentication
   JWT_SECRETKEY=hiloailabspersonalkey
   ```
4. Start MongoDB service
5. Run backend server: `node index.js`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Application runs on `http://localhost:3001`

## API Endpoints

### Authentication Routes
- **POST /api/auth/register**: User registration with validation
- **POST /api/auth/login**: User login with JWT token generation
- **GET /api/protected**: Protected route requiring valid JWT token

### Request/Response Examples

#### Registration Request
```json
{
  "userName": "hemanth",
  "email": "hemanth@gmail.com",
  "password": "SecurePass123!"
}
```

#### Login Request
```json
{
  "email": "hemanth@gmail.com",
  "password": "SecurePass123!"
}
```

#### Login Response
```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "userName": "hemanth",
    "email": "hemanth@gmail.com"
  }
}
```

## Validation Rules

### Registration Validation
- **Username**: 3-50 characters, unique
- **Email**: Valid email format, unique
- **Password**: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

### Login Validation
- **Email**: Valid email format, required
- **Password**: Minimum 8 characters, required

## Security Measures Implemented

### Password Security
- bcrypt hashing with unique salt generation
- No plain text password storage
- Secure password comparison during login

### Token Security
- JWT tokens with expiration (10 days)
- Bearer token format for API requests
- Token verification on protected routes
- Automatic token cleanup on logout

### Input Validation
- Server-side validation using express-validator
- Client-side validation for user experience
- SQL injection prevention through Mongoose ODM
- XSS protection through input sanitization

### Authentication Flow Security
- Stateless authentication design
- User existence verification on token validation
- Proper error messages without information leakage
- Session management through JWT tokens

## Error Handling Implementation

### Client-Side Error Handling
- User-friendly error messages
- Form validation feedback
- Network error handling
- Authentication failure responses

### Server-Side Error Handling
- Comprehensive HTTP status codes
- Structured error responses
- Database error handling
- Token validation error management

## Features Implemented

### User Management
- Secure user registration
- Email-based authentication
- Profile information display
- Session persistence

### Navigation and Routing
- Dynamic navigation based on authentication status
- Protected route implementation
- Automatic redirects for unauthorized access
- Seamless user experience

### State Management
- Global authentication state
- Persistent login sessions
- Loading state management
- Automatic token validation

### UI/UX Features
- Professional green theme design
- Responsive layout
- Form validation feedback
- Loading states and transitions

## Testing and Validation

### Manual Testing Scenarios
1. User registration with valid/invalid data
2. User login with correct/incorrect credentials
3. Protected route access with/without authentication
4. Token expiration handling
5. Logout functionality
6. Page refresh session persistence

### Security Testing
1. Password hashing verification
2. JWT token validation
3. Protected route access control
4. Input validation effectiveness
5. Error message security

## Production Considerations

### Security Enhancements
- HTTPS implementation for production
- Rate limiting for authentication endpoints
- CORS configuration for cross-origin requests
- Environment-specific configuration

### Performance Optimizations
- Database indexing for user queries
- Token caching strategies
- Frontend code splitting
- API response optimization

### Monitoring and Logging
- Authentication attempt logging
- Error tracking and monitoring
- Performance metrics collection
- Security event logging

This comprehensive authentication system provides a solid foundation for secure web applications with proper authentication,  and user management capabilities.
