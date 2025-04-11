# MegaBlog

MegaBlog is a modern blogging platform built with React and Vite. It allows users to create, edit, and manage blog posts with a rich text editor. The platform integrates with Appwrite for backend services, including authentication, database, and storage.

## Features

-   **User Authentication**: Signup, login, and logout functionality.
-   **Post Management**: Create, edit, and delete blog posts.
-   **Rich Text Editor**: Use TinyMCE for creating and editing content.
-   **Responsive Design**: Styled with Tailwind CSS for a mobile-friendly experience.
-   **User-Specific Posts**: Manage posts specific to the logged-in user.
-   **Backend Integration**: Powered by Appwrite for authentication, database, and storage.

## Technologies Used

-   **Frontend**: React (with React Router for routing)
-   **State Management**: Redux Toolkit
-   **Styling**: Tailwind CSS
-   **Backend Services**: Appwrite
-   **Rich Text Editor**: TinyMCE
-   **Build Tool**: Vite
-   **Form Management**: React Hook Form
-   **Other Libraries**: HTML React Parser, Appwrite SDK

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   NPM or Yarn
-   Appwrite instance with configured project, database, and storage bucket

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/smalik2811/MegaBlog.git
    cd MegaBlog
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    - Copy `.env.sample` to `.env` and fill in the required values:
        ```env
        VITE_APPWRITE_URL=<Your Appwrite URL>
        VITE_APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
        VITE_APPWRITE_DATABASE_ID=<Your Appwrite Database ID>
        VITE_APPWRITE_COLLECTION_ID=<Your Appwrite Collection ID>
        VITE_APPWRITE_BUCKET_ID=<Your Appwrite Bucket ID>
        VITE_TINY_MCE_API_KEY=<Your TinyMCE API Key>
        ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open the app in your browser at `http://localhost:5173`.

## Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the app for production.
-   `npm run preview`: Preview the production build.
-   `npm run lint`: Run ESLint to check for code issues.

## Folder Structure

```
MegaBlog/
├── public/               # Static assets
├── src/                  # Source code
│   ├── appwrite/         # Appwrite services
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── store/            # Redux store and slices
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env.sample           # Environment variable template
├── package.json          # Project metadata and dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## Contributing

This project is for learning purposes and does not accept any pull requests. Feel free to fork the repository and use it for your own learning journey.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [Appwrite](https://appwrite.io/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [TinyMCE](https://www.tiny.cloud/)
