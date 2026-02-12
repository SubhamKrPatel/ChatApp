# ChatBot Application

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- Real-time messaging using Socket.IO
- Modern, fluid glassmorphic UI with animated background
- MongoDB database for message persistence
- RESTful API endpoints
- User authentication support

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Frontend**: Vanilla HTML, CSS, JavaScript

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ChatBot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm start
```

## Deployment

### Render Deployment

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables in Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `PORT`: (Render will auto-assign)

## API Endpoints

- `GET /` - Health check
- `POST /api/chat/send` - Send a message

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## License

ISC
