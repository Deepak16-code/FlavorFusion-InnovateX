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

## Data Models

**User**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "created_at": "ISO8601 date"
}
```

**Recipe**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "ingredients": ["string"],
  "instructions": "string",
  "image_url": "string",
  "author_id": "string",
  "created_at": "ISO8601 date"
}
```

**Comment**
```json
{
  "id": "string",
  "recipe_id": "string",
  "author_id": "string",
  "content": "string",
  "created_at": "ISO8601 date"
}
```

---

## API Endpoints

### 1. Register User
**Method:** `POST`  
**Path:** `/api/users/register`

**Request**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Success (201)**
```json
{
  "message": "User registered successfully",
  "user_id": "u123"
}
```

**Error (400)**
```json
{
  "error": "Email already exists"
}
```

---

### 2. Login
**Method:** `POST`  
**Path:** `/api/users/login`

**Request**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Success (200)**
```json
{
  "token": "jwt_token_here",
  "user_id": "u123"
}
```

**Error (401)**
```json
{
  "error": "Invalid email or password"
}
```

---

### 3. Get All Recipes
**Method:** `GET`  
**Path:** `/api/recipes`

**Success (200)**
```json
[
  {
    "id": "r001",
    "title": "Chocolate Cake",
    "image_url": "/images/choco.jpg",
    "author_id": "u123"
  }
]
```

---

### 4. Create Recipe
**Method:** `POST`  
**Path:** `/api/recipes`

**Request**
```json
{
  "title": "Chocolate Cake",
  "description": "Rich and moist cake",
  "ingredients": ["Flour", "Sugar", "Cocoa", "Eggs"],
  "instructions": "Mix and bake.",
  "image_url": "/images/choco.jpg"
}
```

**Success (201)**
```json
{
  "message": "Recipe created",
  "recipe_id": "r001"
}
```

**Error (400)**
```json
{
  "error": "Missing required fields"
}
```

---

### 5. Get Recipe by ID
**Method:** `GET`  
**Path:** `/api/recipes/{id}`

**Success (200)**
```json
{
  "id": "r001",
  "title": "Chocolate Cake",
  "description": "Rich and moist cake",
  "ingredients": ["Flour", "Sugar", "Cocoa", "Eggs"],
  "instructions": "Mix and bake.",
  "image_url": "/images/choco.jpg",
  "author_id": "u123"
}
```

**Error (404)**
```json
{
  "error": "Recipe not found"
}
```

---

### 6. Add Comment
**Method:** `POST`  
**Path:** `/api/recipes/{id}/comments`

**Request**
```json
{
  "content": "Loved this recipe!"
}
```

**Success (201)**
```json
{
  "message": "Comment added",
  "comment_id": "c789"
}
```

**Error (401)**
```json
{
  "error": "Authentication required"
}
```
