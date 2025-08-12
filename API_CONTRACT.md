Flavour Fusion - API Contract
Introduction
This document describes how the frontend and backend of Flavour Fusion will communicate.
It is the single source of truth for all API requests and responses.
Core Features
1. User Registration & Login - Let users create accounts and log in.
2. Recipe Management - Users can create, view, and delete recipes.
3. Comments - Users can add comments to recipes.
Data Models
User:
{
 "id": "string",
 "username": "string",
 "email": "string",
 "created_at": "ISO8601 date"
}
Recipe:
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
Page 1
Flavour Fusion - API Contract
Comment:
{
 "id": "string",
 "recipe_id": "string",
 "author_id": "string",
 "content": "string",
 "created_at": "ISO8601 date"
}
API Endpoints
1. Register User
Method: POST
Path: /api/users/register
Request:
{
 "username": "john_doe",
 "email": "john@example.com",
 "password": "securepassword"
}
Success (201):
{
 "message": "User registered successfully",
 "user_id": "u123"
}
Error (400):
{
 "error": "Email already exists"
}
2. Login
Page 2
Flavour Fusion - API Contract
Method: POST
Path: /api/users/login
Request:
{
 "email": "john@example.com",
 "password": "securepassword"
}
Success (200):
{
 "token": "jwt_token_here",
 "user_id": "u123"
}
Error (401):
{
 "error": "Invalid email or password"
}
3. Get All Recipes
Method: GET
Path: /api/recipes
Success (200):
[
 {
 "id": "r001",
 "title": "Chocolate Cake",
 "image_url": "/images/choco.jpg",
 "author_id": "u123"
 }
]
4. Create Recipe
Method: POST
Page 3
Flavour Fusion - API Contract
Path: /api/recipes
Request:
{
 "title": "Chocolate Cake",
 "description": "Rich and moist cake",
 "ingredients": ["Flour", "Sugar", "Cocoa", "Eggs"],
 "instructions": "Mix and bake.",
 "image_url": "/images/choco.jpg"
}
Success (201):
{
 "message": "Recipe created",
 "recipe_id": "r001"
}
Error (400):
{
 "error": "Missing required fields"
}
5. Get Recipe by ID
Method: GET
Path: /api/recipes/{id}
Success (200):
{
 "id": "r001",
 "title": "Chocolate Cake",
 "description": "Rich and moist cake",
 "ingredients": ["Flour", "Sugar", "Cocoa", "Eggs"],
 "instructions": "Mix and bake.",
 "image_url": "/images/choco.jpg",
 "author_id": "u123"
}
Page 4
Flavour Fusion - API Contract
Error (404):
{
 "error": "Recipe not found"
}
6. Add Comment
Method: POST
Path: /api/recipes/{id}/comments
Request:
{
 "content": "Loved this recipe!"
}
Success (201):
{
 "message": "Comment added",
 "comment_id": "c789"
}
Error (401):
{
 "error": "Authentication required"
}
Page 5
