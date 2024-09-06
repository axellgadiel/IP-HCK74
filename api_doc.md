markdown

# API Documentation

## Deployed server

- **url**: `http://localhost:3001`

## Models

### User

- `username`: string, required
- `email`: string, required, unique
- `fullName`: string, required
- `phoneNumber`: string, required
- `address`: string, required
- `profileP`: string (URL to profile picture)

### Image

- `id`: integer, required
- `url`: string, required
- `width`: integer, required
- `height`: integer, required
- `content_type`: string, required

## Endpoints

### 1. POST `/google-login`

Authenticate a user via Google OAuth.

**Request:**

```json
{
  "google_token": "string"
}
Response (200 - OK):

json
{
  "access_token": "<token>"
}
Response (401 - Unauthorized):

json
{
  "message": "Invalid Google token"
}
2. POST /api/generate
Generate an image based on a prompt using Flux AI.

Request:

json
{
  "prompt": "string"
}
Response (200 - OK):

json
{
  "image": "https://image-url.com"
}
Response (500 - Internal Server Error):

json
{
  "message": "Error generating image"
}
3. POST /api-g/generate
Generate content using Gemini AI based on a simple prompt.

Request: No body required.

Response (200 - OK):

json
{
  "result": "Generated text content"
}
Response (500 - Internal Server Error):

json
{
  "message": "Error generating content"
}
4. GET /user-profile/:id
Retrieve a user's profile by ID.

Request:

json
{
  "id": "integer"
}
Response (200 - OK):

json
{
  "username": "string",
  "email": "string",
  "fullName": "string",
  "phoneNumber": "string",
  "address": "string",
  "profileP": "string"
}
Response (404 - Not Found):

json
{
  "message": "User not found"
}
5. PUT /user-profile/:id
Edit a user profile by ID.

Request:

json
{
  "username": "string",
  "fullName": "string",
  "phoneNumber": "string",
  "address": "string",
  "profileP": "string"
}
Response (200 - OK):

json
{
  "username": "string",
  "fullName": "string",
  "phoneNumber": "string",
  "address": "string",
  "profileP": "string"
}
Response (404 - Not Found):

json
{
  "message": "User not found"
}
6. DELETE /user-profile/:id
Delete a user profile by ID.

Request:

json
{
  "id": "integer"
}
Response (200 - OK):

json
{
  "message": "User profile deleted successfully"
}
Response (404 - Not Found):

json
{
  "message": "User not found"
}
Global Errors
Response (401 - Unauthorized):

json
{
  "message": "Invalid token"
}
Response (500 - Internal Server Error):

json
{
  "message": "Internal server error"
}
```
