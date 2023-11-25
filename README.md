# Mongoose Express CRUD Mastery

### Live Server Link
https://apollo-level2-assignment2-nine.vercel.app

### Set up the Project

- production :
    ```
    npm i
    npm run build
    npm run start
    ```
- development : 
    ```
    npm i
    npm run dev
    ```

### API Endpoint
### 1. Create a new user :
- Endpoint: **POST /api/users**

### 2. Retrieve a list of all users
- Endpoint: **GET /api/users**

### 3. Retrieve a specific user by ID
- Endpoint: **GET /api/users/:userId**

### 4. Update user information
- Endpoint: **PUT /api/users/:userId**

### 5. Delete a user
- Endpoint: **DELETE /api/users/:userId**

### 6. Add New Product in Order
- Endpoint: **PUT /api/users/:userId/orders**

### 7. Retrieve all orders for a specific user
- Endpoint: **GET /api/users/:userId/orders**

### 8. Calculate Total Price of Orders for a Specific User
- Endpoint: **GET /api/users/:userId/orders/total-price**