# Angular CRUD Backend

This is the backend for an Angular CRUD (Create, Read, Update, Delete) application. It provides RESTful APIs to manage data.

## Features

- RESTful API for CRUD operations
- Built with Node.js and Express
- MongoDB integration (via Mongoose)

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

```bash
git clone <repository-url>
cd backend
npm install
```

## Configuration

Create a `.env` file in the root directory and add your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/your-db-name
PORT=5000
```

## Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | /api/items     | Get all items        |
| GET    | /api/items/:id | Get item by ID       |
| POST   | /api/items     | Create new item      |
| PUT    | /api/items/:id | Update item by ID    |
| DELETE | /api/items/:id | Delete item by ID    |

## License

MIT