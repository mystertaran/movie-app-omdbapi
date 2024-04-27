# Movie Browser App Documentation

## Description
The Movie Browser App is a web application that allows users to browse, search, and sort movies using the OMDB API. Users can sort movies by year and type.

## Features
- Browse movies from the OMDB API
- Search for specific movies
- Sort movies by year and type

## Installation
To install and run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install all the necessary dependencies.
4. Create a `.env` file in the root of your project directory.

## Setting up the API Key
The application requires an API key from OMDB to function. Here's how to set it up:

1. Obtain an API key from the OMDB API.
2. Open the `.env` file you created earlier.
3. Add the following line to the file, replacing `your_api_key` with the API key you obtained from OMDB:

```javascript
REACT_APP_OMDB_API_KEY=your_api_key
```
4. Save and cloe the `.env` file.

## Running the Application
After setting up the API key, you can run the application with the following command:

```bash
npm start
```

This will start the application and it will be accesible at `http://localhost:3000`.

## .gitignore
The `.gitignore` file is set up to ignore files and directories that are not necessary to include in the version control. This includes `node_modules`, build artifacts, log files, and environment files.