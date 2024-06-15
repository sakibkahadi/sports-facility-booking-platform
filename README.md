# Sports Facility Booking Platform

## Overview

A web application for booking sports facilities with features like user authentication, role-based access, and booking management.

## Features

- User sign-up and login
- Role-based access (Admin and User)
- Facility management (CRUD operations)
- Booking management
- Input validation and error handling

## Tech Stack

- **Backend:** TypeScript, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Validation:** Zod
- **Environment Variables:** dotenv

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**
       `bash
    git clone https://github.com/sakibkahadi/sports-facility-booking-platform.git
    cd sports-facility-booking-platform
    `

2. **Install dependencies:**
       `bash
    npm install
    `

3. **Set up environment variables:**
       Create a `.env` file in the root directory with the following:
       `plaintext
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/sports-facility-booking
    JWT_SECRET=your_jwt_secret
    `

4. **Run the application:**
       `bash
    npm run start:dev
    `

5. **Access the application:**
       Go to `http://localhost:5000` in your browser or You can use post man for api calls

## API Endpoints

### Auth Routes

- **Sign Up:** `POST /api/auth/signup`
- **Login:** `POST /api/auth/login`

### Facility Routes (Admin Only)

- **Create:** `POST /api/facility` (Admin Only)
- **Update:** `PUT /api/facility/:id` (Admin Only)
- **Delete (Soft):** `DELETE /api/facility/:id` (Admin Only)
- **Get All:** `GET /api/facility` (Admin and User only)

### Booking Routes

- **Check Availability:** `GET /api/check-availability`
- **Create Booking:** `POST /api/bookings` (User Only)
- **Get All :** `GET /api/bookings` (Admin Only)
- **Get User Bookings:** `GET /api/bookings/user` (User Only)
- **Cancel Booking:** `DELETE /api/bookings/:id`(User Only)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

Licensed under the MIT License.
