# Flavour Fusion - API Contract

## Introduction
This document describes how the frontend and backend of **Flavour Fusion** will communicate.  
It is the single source of truth for all API requests and responses.

---

## Core Features
1. **User Registration & Login** – Let users create accounts and log in.  
2. **Recipe Management** – Users can create, view, and delete recipes.  
3. **Comments** – Users can add comments to recipes.  

---

API_CONTRACT  

1. Data Models  
```json
user {
  id: string,
  username: string,
  email: string,
  password: string (hashed),
  phone: string,
  dateOfBirth: string,
  userType: standard | business,
  companyName: string (optional),
  companyAddress: string (optional),
  publicProfileName: string (optional),
  createdAt: string,
  updatedAt: string
}

Recipe {
  id: string,
  title: string,
  description: string,
  videoUrl: string,
  ingredients: [string],
  instructions: [string],
  authorId: string,
  isPurchasable: true,
  createdAt: string,
  updatedAt: string,
  reviews: []
}

Order {
  id: string,
  userId: string,
  recipeId: string,
  status: pending | preparing | on_the_way | delivered | cancelled,
  orderDate: string,
  deliveryLocation: string,
  paymentStatus: paid | unpaid,
  createdAt: string
}

Review {
  id: string,
  recipeId: string,
  userId: string,
  rating: 0,
  comment: string,
  createdAt: string
}

ChatbotMessage {
  id: string,
  userId: string,
  message: string,
  response: string,
  timestamp: string
}

Attachment {
  id: string,
  issueId: string,
  fileUrl: string,
  uploadedAt: string
}
```

---

2. User Authentication & Profile  

2.1 Register User  
HTTP Method: POST  
Endpoint Path: /api/auth/register  
Description: Registers a new user.  

Request Body:  
```json
{
  "username": "new_user_jane",
  "email": "jane.doe@example.com",
  "password": "newPassword123",
  "phone": "9876543210",
  "dateOfBirth": "1995-03-22",
  "userType": "standard"
}
```

Business User Example:
```json
{
  "username": "super_chef",
  "email": "super.chef@example.com",
  "password": "superSecretPassword456",
  "phone": "1234567890",
  "dateOfBirth": "1988-07-10",
  "userType": "business",
  "companyName": "Gourmet Creations LLC",
  "companyAddress": "456 Chef St, Newville",
  "publicProfileName": "Super Chef's Bistro"
}
```


Success:
```json
{
  "success": true,
  "message": "User registered successfully. Please verify with OTP.",
  "data": { "id": "u123", "username": "new_user_jane" }
}
```

Error 409:
```json
{ "success": false, "message": "Email or username already registered" }
```

Error 400:
```json
{ "success": false, "message": "Missing required fields or invalid data" }
```


---

2.2 Login  
HTTP Method: POST  
Endpoint Path: /api/auth/login  
Description: Authenticates user and returns JWT token.  

Request Body:  
```json
{ "email": "jane.doe@example.com", "password": "newPassword123" }
```

Success Response (200 OK):  
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "u123", "username": "new_user_jane" }
}
```

Error:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

2.3 View Profile  
HTTP Method: GET  
Endpoint Path: /api/users/me  
Headers: Authorization: Bearer <token>  

Success Response (200 OK):  
```json
{
  "success": true,
  "data": {
    "id": "u123",
    "name": "JJane Doe",
    "email": "jane.doe@example.com",
    "createdAt": "2025-08-11T10:00:00Z"
  }
}
```

Unauthorized:
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

2.4 Update Profile  
HTTP Method: PUT  
Endpoint Path: /api/users/me  
Description: Update name or password.  

Request Body:  
```json
{
  "name": "Jane Updated",
  "password": "newSecurePass"
}
```

Success:
```json
{
  "success": true,
  "data": {
    "id": "u123",
    "name": "John Updated",
    "email": "john@example.com",
    "updatedAt": "2025-08-12T10:00:00Z"
  }
}
```

Unauthorized:
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

3. Recipe Management 

3.1 Create Recipe  
HTTP Method: POST  
Endpoint Path: /api/recipes  
Headers: Authorization: Bearer <token>  

Request Body:  
```json
{
  "title": "Spicy Thai Green Curry",
  "description": "A quick and flavorful weeknight dinner.",
  "videoUrl": "https://example.com/videos/curry.mp4",
  "ingredients": ["1 tbsp oil", "2 cloves garlic", "1 can coconut milk"],
  "instructions": ["Heat oil in a pan...", "Add coconut milk and simmer...", "Serve hot."],
  "isPurchasable": true
}
```

Success:
```json
{
  "success": true,
  "message": "Recipe created successfully.",
  "data": { "id": "r123", "title": "Spicy Thai Green Curry" }
}
```

Error Response:  
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

Unauthorized:  
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

3.2 Get All Recipes
HTTP Method: GET
Endpoint Path: /api/recipes
Query : page, limit

Success :  
```json
{
  "success": true,
  "data": [
    {
      "id": "r123",
      "title": "Spicy Thai Green Curry",
      "authorId": "u456",
      "isPurchasable": true
    },
    {
      "id": "r124",
      "title": "Quick Lemon Bars",
      "authorId": "u789",
      "isPurchasable": false
    }
  ]
}
```

Error Response:  
```json
{
  "success": false,
  "message": "No recipes found"
}
```

---

3.3 Get Recipe by ID
HTTP Method: GET
Endpoint Path: /api/recipes/{id}

Success Response (200 OK):  
```json
{
  "success": true,
  "data": {
    "id": "r123",
    "title": "Spicy Thai Green Curry",
    "description": "A quick and flavorful weeknight dinner.",
    "videoUrl": "https://example.com/videos/curry.mp4",
    "ingredients": ["1 tbsp oil", "2 cloves garlic", "1 can coconut milk"],
    "instructions": ["Heat oil in a pan...", "Add coconut milk and simmer...", "Serve hot."],
    "authorId": "u456",
    "isPurchasable": true,
    "reviews": []
  }
}
```
Error Response:  
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

---

3.4 Update Recipe Details
HTTP Method: PATCH
Endpoint Path: /api/recipes/{id}

Request Body:  
```json
{
  "description": "An updated description for the curry.",
  "instructions": ["Step 1: Prep...", "Step 2: Cook...", "Step 3: Serve with rice."]
}
```

Success:
```json
{ "success": true, "message": "Recipe updated successfully." }
````

Error:
```json
{ "success": false, "message": "Recipe not found" }
```

---

4. Review Management

 4.1 Add a Review
HTTP Method: POST
Endpoint Path: /api/recipes/{id}/reviews

Request Body:  
```json
{
  "message": "How do I make a vegan lasagna?"
}
```


Success:
```json
{
  "success": true,
  "response": "A vegan lasagna can be made with layers of pasta, a rich tomato sauce, and a creamy cashew-based ricotta cheese alternative...",
  "data": {
    "id": "msg123",
    "userId": "u123",
    "message": "How do I make a vegan lasagna?",
    "response": "...",
    "timestamp": "2025-08-12T16:45:00Z"
  }
}
```
---
