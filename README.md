<<<<<<< HEAD
# AI Robotics & Humanoid Documentation

A comprehensive Docusaurus-based documentation project covering AI Robotics and Humanoid technologies. This project features a bilingual interface with FastAPI backend integration.

## 🚀 Features

- **Comprehensive Documentation**: Detailed content on AI Robotics and Humanoid topics
- **Bilingual Support**: Multi-language documentation with working language switcher
- **FastAPI Backend**: Robust backend API for dynamic content
- **Modern UI**: Built with Docusaurus for excellent documentation experience

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Python 3.8+
- pip

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

Navigate to the backend directory and start the FastAPI server:
```bash
cd backend/app
fastapi dev main.py
```

The backend server will start running on `http://localhost:8000`

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Backend
```bash
cd backend/app
fastapi dev main.py
```

### Frontend

**Important**: Use `npm run serve` instead of `npm run start` to ensure the language switcher works properly.
```bash
cd frontend
npm run serve
```

> **Note**: The language switcher doesn't work with `npm run start` due to SSR (Server-Side Rendering) in Docusaurus. Always use `npm run serve` for proper functionality.

The documentation will be available at `http://localhost:3000`

## 📁 Project Structure
```
.
├── backend/
│   └── app/
│       └── main.py          # FastAPI application
├── frontend/
│   ├── docs/                # Documentation content
│   ├── src/                 # Source files
│   └── docusaurus.config.js # Docusaurus configuration
└── README.md
```

## 🌐 Language Support

This project supports multiple languages. Use the language switcher in the navigation bar to switch between available languages. Make sure you're running the frontend with `npm run serve` for this feature to work correctly.

## 🔧 Development

- **Backend**: The FastAPI backend runs in development mode with hot reload enabled
- **Frontend**: Docusaurus provides live reload for content changes

## 📝 Adding Content

Add your documentation files in the `frontend/docs` directory. Docusaurus will automatically generate navigation based on your file structure.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- Language switcher requires `npm run serve` instead of `npm run start` due to SSR limitations

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Happy Documenting! 🤖📚**
=======
# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
>>>>>>> f6fd68e7ce0e627430cd84428ef33944c4b26f74
