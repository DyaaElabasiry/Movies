# Cinema Hub 🎬

Cinema Hub is a web application that allows users to discover, search, and save their favorite movies and TV shows. It features a clean, responsive interface and provides detailed information about a vast collection of media from The Movie Database (TMDb) API.

## ✨ Features

  * **User Authentication**: Secure registration and login system.
  * **Discover**: Browse trending movies and popular TV series on the home page.
  * **Search**: A powerful search functionality to find movies, TV shows, and even actors.
  * **Detailed Views**: Click on any movie or series to see detailed information including posters, overviews, user scores, and more.
  * **Favorites**: Registered users can add or remove movies from their personal favorites list.
  * **Favorites Page**: A dedicated page to view all your saved favorite movies.
  * **Responsive Design**: A mobile-first design that looks great on all screen sizes.

## 🛠️ Technologies Used

  * **Frontend**:
      * HTML5
      * CSS3
      * [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
      * Vanilla JavaScript
  * **Backend**:
      * [JSON Server](https://github.com/typicode/json-server): For creating a mock REST API to handle user data.
  * **APIs**:
      * [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api): To fetch movie and series data.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dyaaelabasiry/Movies-461bfb2a10f09f6f51b1eddff8cf639bad2b5380.git
    cd Movies-461bfb2a10f09f6f51b1eddff8cf639bad2b5380
    ```

2.  **Install the dependencies:**

    ```bash
    npm install
    ```

### Running the Application

To run the application, you need to start both the backend JSON server and the frontend.

1.  **Start the JSON Server:**
    Open a terminal and run the following command to start the mock API server. It will watch for changes in the `db.json` file.

    ```bash
    npx json-server --watch server/db.json
    ```

    The server will typically run on `http://localhost:3000`.

2.  **Build and Watch Tailwind CSS:**
    In a separate terminal, run the build script to compile the Tailwind CSS and watch for any changes in your HTML or JS files.

    ```bash
    npm run build
    ```

3.  **Open the application in your browser:**
    You can now open the `client/public/login.html` file in your browser to start using the application. You can use a live server extension in your code editor (like VS Code's Live Server) to serve the files.

## 📂 Project Structure

```
.
├── client
│   ├── public
│   │   ├── details.html
│   │   ├── favs.html
│   │   ├── home.html
│   │   ├── login.html
│   │   └── registeration.html
│   └── src
│       ├── images
│       ├── js
│       │   ├── details.js
│       │   ├── favs.js
│       │   ├── home.js
│       │   ├── log.js
│       │   └── s.js
│       └── styles
│           ├── input.css
│           └── output.css
├── server
│   └── db.json
├── package.json
├── package-lock.json
└── tailwind.config.js
```

  * **`client/public`**: Contains all the HTML pages for the application.
  * **`client/src`**: Holds the source files, including JavaScript for application logic, CSS source files, and images.
  * **`server/db.json`**: The JSON file that acts as a simple database for user information and favorites.
  * **`package.json`**: Defines the project's dependencies and scripts.
  * **`tailwind.config.js`**: Configuration file for Tailwind CSS.

