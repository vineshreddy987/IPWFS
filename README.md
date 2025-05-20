# IPWFS
Building a user-friendly platform (Interview Preparation Website for Students - IPWFS) that helps students (especially in under-resourced areas) prepare for job interviews with features like mock interviews, quizzes, tips, resume builder, and chatbot assistance.

## Deployment Links
- Frontend: https://ipwfs.vercel.app/
- Backend: https://ipwfs-backend.vercel.app/

## Running the Project Locally

### Backend Setup
1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/ipwfs
   JWT_SECRET=your-secret-key
   ```
   Note: Replace the MongoDB URI with your own connection string.

4. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The application will run on http://localhost:3000

## Features
- Mock interview practice
- Interview preparation resources
- Resume builder
- Authentication system
- User profile management

## Technologies Used
- Frontend: React, Material UI, Bootstrap
- Backend: Node.js, Express, MongoDB
