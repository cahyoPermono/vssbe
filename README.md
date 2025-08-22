# ICOGNIS Backend Proxy Server

This project is a backend proxy server built with Hono and Node.js. It proxies requests to an external VSS (Vehicle Security System) API, providing a simplified interface and a single point of entry for frontend applications.

## Features

- **Authentication**: Handles user login and logout.
- **Device Management**: Add, modify, and remove devices.
- **Device Status & GPS**: Query device status, and retrieve track lists and location data.
- **Video & File Management**: Search for video files and manage downloads.
- **Geofence**: Manage geofences.
- **Driver Management**: Manage drivers.
- **Traffic Consumption**:- Query traffic consumption records.

## Project Structure

The project is structured by features, with each feature having its own dedicated module.

```
src/
├── features/
│   ├── auth/
│   ├── device/
│   ├── driver/
│   ├── geofence/
│   ├── status/
│   ├── traffic/
│   └── video/
├── config.ts
└── index.ts
```

- `src/index.ts`: The main entry point of the application. It initializes the Hono server and mounts the feature routes.
- `src/config.ts`: Contains the base URL for the VSS API.
- `src/features/`: Each subdirectory in `features` represents a feature module, containing the routes for that feature.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd vssbe
   ```
3. Install the dependencies:
   ```sh
   pnpm install
   ```

### Running the Application

- **Development Mode** (with hot-reloading):
  ```sh
  pnpm dev
  ```

- **Production Mode**:
  ```sh
  pnpm build
  pnpm start
  ```

The server will be running on `http://localhost:3000`.

## API Documentation

For detailed information about the API endpoints, please refer to the [API Documentation](./api.md) or the [OpenAPI Specification](./openapi.json).