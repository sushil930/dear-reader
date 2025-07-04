# Dear Reader - A Psychology Diary

A personal psychology diary application designed for self-reflection and emotional awareness. This platform allows users to securely record their thoughts, feelings, and experiences, offering tools for introspection and personal growth.

## Features

*   **User Authentication:** Secure user registration and login with JWT-based authentication.
*   **Personalized Diary Entries:** Create, read, update, and delete (CRUD) your private diary entries.
*   **Rich Text Editing:** Compose entries using Markdown, allowing for rich formatting and expressive writing.
*   **Image Uploads:** Easily attach images to your diary entries, with secure storage powered by Cloudinary.
*   **Intuitive User Interface:** A modern, responsive, and accessible user experience built with React and Shadcn UI components.
*   **Theming:** Support for light and dark modes to suit your preference.
*   **Date Navigation:** Easily navigate and select entries by date using an integrated date picker.
*   **Notifications:** Receive interactive toast notifications for important actions and feedback.
*   **Data Visualization:** Track and visualize personal insights or trends within your entries using charts.
*   **Secure Data Storage:** All entries and user data are securely managed and stored using Prisma with a robust database backend.
*   **Cross-Origin Resource Sharing (CORS):** Properly configured for secure communication between frontend and backend.
*   **Cookie Management:** Utilizes cookie-parser for handling session and authentication cookies.

## Technologies and Tools Used

This project leverages a modern tech stack for both its frontend and backend:

### Frontend

*   **React:** A JavaScript library for building dynamic user interfaces.
*   **Vite:** A fast build tool that provides an instant development server.
*   **Shadcn UI:** A collection of beautifully designed, reusable components built with Radix UI and Tailwind CSS.
*   **Tailwind CSS:** A utility-first CSS framework for rapid and custom UI development.
*   **React Router DOM:** For declarative routing within the single-page application.
*   **React Query:** For efficient data fetching, caching, and state management.
*   **`react-markdown`:** For rendering Markdown content within diary entries.

### Backend

*   **Node.js & Express.js:** A powerful JavaScript runtime and a flexible web application framework.
*   **TypeScript:** A superset of JavaScript that adds static typing for improved code quality and maintainability.
*   **Prisma:** A next-generation ORM (Object-Relational Mapper) for seamless database interaction.
*   **JWT (JSON Web Tokens):** For secure and stateless user authentication.
*   **Bcrypt.js:** For robust password hashing and security.
*   **Multer & Cloudinary:** For handling file uploads and cloud-based image storage.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or Yarn
*   A database (e.g., PostgreSQL, MySQL) compatible with Prisma.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_GIT_URL>
    cd reflections-dairy
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    cd ..
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the `server` directory with the following variables. Replace placeholders with your actual values:
    ```
    DATABASE_URL="your_database_connection_string"
    JWT_SECRET="a_strong_secret_key_for_jwt"
    CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    ```

5.  **Database Setup:**
    From the `server` directory, apply Prisma migrations and optionally seed the database:
    ```bash
    cd server
    npx prisma migrate deploy
    npm run seed # Optional: if you have seed data
    cd ..
    ```

### Running the Application

1.  **Start the backend server:**
    From the `server` directory:
    ```bash
    npm run dev
    ```
    The backend will typically run on `http://localhost:3000` (or as configured).

2.  **Start the frontend development server:**
    From the root project directory:
    ```bash
    npm run dev
    ```
    The frontend will typically run on `http://localhost:5173` (or as configured by Vite).

Open your browser and navigate to the frontend URL to access the application.

## Deployment

This project can be deployed to various platforms. If you are using Lovable, you can deploy directly through their platform.

For custom deployments:
*   **Frontend:** Build the React application (`npm run build`) and deploy the static files to a service like Netlify, Vercel, or GitHub Pages.
*   **Backend:** Deploy the Node.js server to a platform like Heroku, Render, AWS EC2, or a custom VPS.

## Contributing

We welcome contributions to the Reflections Diary project! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and ensure tests pass.
4.  Commit your changes with a clear and descriptive message.
5.  Push your branch to your forked repository.
6.  Open a Pull Request to the main repository.
