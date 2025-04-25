# Express TypeScript MongoDB Jest Boilerplate

A production-ready RESTful API boilerplate using Express.js, TypeScript, MongoDB, and Jest.

## Features

- **TypeScript** - Type-safe code
- **Express.js** - Fast, unopinionated, minimalist web framework
- **MongoDB with Mongoose** - Elegant MongoDB object modeling
- **Jest & Supertest** - Delightful testing framework
- **ESLint & Prettier** - Code quality and formatting
- **Husky & lint-staged** - Git hooks for code quality
- **Docker & Docker Compose** - Containerization for easy deployment
- **Environment Variables Validation** - Type-safe environment configuration
- **Production-ready Security** - Helmet, CORS, Rate limiting, and HTTP parameter pollution protection
- **Structured Logging** - Clean and organized logs
- **Health Check Endpoint** - For monitoring and orchestration

## Project Structure

```
.
├── __mocks__/              # Test mocks
├── config/                 # Configuration files
│   ├── database.ts         # MongoDB connection configuration
│   ├── env.ts              # Environment variables validation
│   └── logger.ts           # Custom logger implementation
├── middleware/             # Express middleware functions
│   ├── error.ts            # Error handling middleware
│   ├── logger.ts           # Request logging middleware
│   └── security.ts         # Security middleware configuration
├── src/                    # Application source code
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .lintstagedrc.js       # lint-staged configuration
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker build configuration
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup file
├── nodemon.json           # Nodemon configuration for development
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (or Docker for containerized setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/express-ts-mongodb-jest-boilerplate.git
   cd express-ts-mongodb-jest-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (see `.env.example` for reference):
   ```
   NODE_ENV=development
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/express-ts-api
   LOG_LEVEL=info
   ```

### Development

Start the development server:

```bash
npm run dev
```

### Testing

Run tests:

```bash
npm test
```

### Production Build

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d
```

## License

This project is licensed under the ISC License.