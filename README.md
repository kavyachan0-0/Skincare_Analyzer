# Skincare Analyzer

A web application that analyzes skincare ingredients and provides detailed information about their effects and safety.

## Prerequisites

1. Node.js (v16 or higher)
2. MySQL Server (v8.0 recommended)
3. npm (Node Package Manager)

## Setup Instructions

### 1. MySQL Setup
1. Start MySQL Server:
   - Open Services (Windows + R, type 'services.msc')
   - Find "MySQL80" or "MySQL"
   - Make sure its status is "Running"
   - If not running, right-click and select "Start"

2. MySQL Connection Details:
   ```
   Host: localhost
   Port: 3306
   Username: root
   Password: Kavyachan090905#
   Database: skincare_analyzer
   ```

### 2. Application Setup
1. Clone the repository
2. Open terminal in project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Step 1: Start MySQL Server
1. Open Services (services.msc)
2. Ensure MySQL service is running
3. If not running, start it

### Step 2: Start Backend Server
1. Open a new terminal in project directory
2. Run the command:
   ```bash
   node server.js
   ```
3. You should see:
   ```
   Server running on http://localhost:5000
   Database connected successfully
   ```

### Step 3: Start Frontend Application
1. Open another terminal in project directory
2. Run the command:
   ```bash
   npm run dev
   ```
3. You should see:
   ```
   VITE v6.2.3 ready
   Local: http://localhost:5174/
   ```

### Step 4: Access the Application
1. Open your web browser
2. Go to http://localhost:5174
3. The application should be running!

## Features

1. Ingredient Analysis
   - Enter skincare ingredients
   - Get detailed safety analysis
   - Understand potential benefits and risks

2. History Tracking
   - View past analyses
   - Track ingredient searches
   - Review previous results

## Troubleshooting

1. If "Connection Refused" error:
   - Make sure MySQL server is running
   - Verify MySQL credentials in src/config/db.js
   - Ensure server.js is running

2. If blank page appears:
   - Check both terminals for errors
   - Make sure both server.js and npm run dev are running
   - Try refreshing the page

3. If database connection fails:
   - Verify MySQL service is running
   - Check MySQL credentials
   - Ensure skincare_analyzer database exists

## Important Notes

- Keep both terminals (server.js and npm run dev) running
- MySQL server must be running before starting server.js
- Don't close any terminals while using the application

For any issues, please check if all three components are running:
1. MySQL Server
2. Backend (server.js)
3. Frontend (npm run dev)
