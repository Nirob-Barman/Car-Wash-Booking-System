# E-commerce Data Management API

This is a simple e-commerce data management application built using Express, TypeScript, and MongoDB with Mongoose. The application includes functionality for managing products and orders with data validation using Zod.

## Project Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Nirob-Barman/Data-Management.git
cd Data-Management
```
2. Install the dependencies:
```
npm install
```
3. Create a .env file in the root directory and add your MongoDB connection string:
```
DATABASE_URL=your_mongodb_connection_string
PORT=3000
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
#### Product Management
* Create a New Product: POST /api/products
* Retrieve a List of All Products: GET /api/products
* Retrieve a Specific Product by ID: GET /api/products/:productId
* Update Product Information: PUT /api/products/:productId
* Delete a Product: DELETE /api/products/:productId
* Search a Product: GET /api/products?searchTerm=iphone
#### Order Management
* Create a New Order: POST /api/orders
* Retrieve All Orders: GET /api/orders
* Retrieve Orders by User Email: GET /api/orders?email=user@example.com
## Dependencies
* Express: Web framework for Node.js.
* Mongoose: MongoDB object modeling tool.
* Zod: Schema validation library for JavaScript and TypeScript.
## Development Dependencies
* TypeScript: Typed superset of JavaScript.
* ESLint: JavaScript linter.
* Prettier: Code formatter.