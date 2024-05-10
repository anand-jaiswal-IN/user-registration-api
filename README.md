# User Registration System

This is an Express.js Node.js server implementing a User Registration System with MongoDB as the database service and Mongoose as the ODM (Object Data Mapper).

## Overview

This project provides an API for user registration, login, logout, generating OTP (One-Time Password), and verifying OTP.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/anand-jaiswal-IN/user-registration-api
```

2. Install dependencies:

```bash
cd user-registration-system
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory of the project and define the variable accordingly with the help of `.env.sample` file.

4. Start the server:

```bash
npm run dev
```

## API Endpoints

### 1. User Registration

- **URL:** `/user/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
   - `username` : User's unique username
  - `email`: User's email address
  - `password`: User's password
- **Response:** Returns user data if registration is successful.

### 2. User Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  - `usernameOrEmail`: User's email address or username
  - `password`: User's password
- **Response:** Set access token in browser cookie if login is successful.

### 3. User Logout

- **URL:** `/user/logout`
- **Method:** `GET`
- **Description:** Logs out the currently logged-in user.
- **Response:** Returns a message indicating successful logout.

### 4. Generate OTP

- **URL:** `/user/generateOtp`
- **Method:** `GET`
- **Description:** Generates a One-Time Password (OTP) for user verification. User should login before creating OTP.
- **Response:** Return a message indicating that OTP is sent to user's email.

### 5. Verify OTP

- **URL:** `/user/verify`
- **Method:** `POST`
- **Description:** Verifies the One-Time Password (OTP) provided by the user.
- **Request Body:**
  - `otp`: OTP provided by the user's email
- **Response:** Returns a message indicating whether the OTP is valid and user is verified.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer (for sending emails)
- JSON Web Tokens (JWT) for authentication

## Author

[anandjaiswal](https://github.com/anand-jaiswal-IN)