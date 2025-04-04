
# ClubHive - Student Project

## Project Overview

ClubHive is a web application for managing university clubs and events. This is a simple implementation for educational purposes.

## Setup and Running

### Frontend (React + Vite)
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`

### Backend (Express)
1. Make sure Node.js is installed on your system
2. Navigate to the project root directory
3. Install the backend dependencies: `npm install express cors`
4. Run the backend server: `node src/server/index.js`
5. The backend will be available at http://localhost:3001

## Features
- User authentication (admin and student roles)
- Club management
- Event creation and management
- Event registration

## Tech Stack
- Frontend: React, Vite, TailwindCSS
- Backend: Express.js with in-memory data storage
- State Management: React Context API
- Form Handling: React Hook Form with Zod validation

## Note
This is a simplified implementation for educational purposes. The backend uses in-memory storage instead of a real database.
