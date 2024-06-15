# Car Wash Booking System

This is a simple e-commerce car wash booking system built using Express, TypeScript, and MongoDB with Mongoose. The application includes functionality for managing products and orders with data validation using Zod.

## Project Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Nirob-Barman/Car-Wash-Booking-System.git
cd Car-Wash-Booking-System
```
2. Install the dependencies:
```
npm install
```
3. Create a .env file in the root directory and add your MongoDB connection string:
```
DATABASE_URL=your_mongodb_connection_string
PORT=3000
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=desired_value
```
## Running the Application
1. Build the TypeScript files:
```
npm run build
```
2. Start the application in development mode:
```
npm run start:dev
```
3. The application will be running at http://localhost:3000.

## Linting and Formatting
1. Run ESLint:
```
npm run lint
```
2. Fix linting issues:
```
npm run lint:fix
```
3. Format the code using Prettier:
```
npm run prettier
```
4. Fix formatting issues:
```
npm run prettier:fix
```

## Testing the Endpoints
You can use tools like Postman or cURL to test the API endpoints.

### Sample Endpoints:
#### User Routes
* User Sign Up: POST /api/auth/signup
* User Login: POST /api/auth/login
#### Service Routes
* Create Service (Only Accessible by Admin): POST /api/services
* Get a Service: GET /api/services/:id
* Get All Services: GET /api/services
* Update Service (Only Accessible by Admin): PUT /api/services/:id
* Delete a Service (Only Accessible by Admin): DELETE /api/services/:id
#### Slot Routes
* Create Slot (Only Accessible by Admin): POST /api/services/slots
* Create Slot (Only Accessible by Admin): POST /api/services/slots
#### Booking Routes
* Create Booking (Only Accessible by User): POST /api/bookings
* Get All Bookings (Only Accessible by Admin): GET /api/bookings
* Get User Bookings (Only Accessible by User): GET /api/bookings/user

## Dependencies
* Express: Web framework for Node.js.
* Mongoose: MongoDB object modeling tool.
* Zod: Schema validation library for JavaScript and TypeScript.
## Development Dependencies
* TypeScript: Typed superset of JavaScript.
* ESLint: JavaScript linter.
* Prettier: Code formatter.