# URL Shortener Frontend

A beautiful, interactive React frontend for the URL Shortener API.

## Features

✨ **Beautiful UI** - Modern gradient design with smooth animations  
⚡ **Interactive** - Real-time feedback with loading states  
📋 **Copy to Clipboard** - One-click copy functionality  
📜 **URL History** - View your recently shortened URLs  
📱 **Responsive** - Works perfectly on all devices  
✅ **Error Handling** - Clear error messages and validation  

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:5000`

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Running the Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or the next available port).

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Usage

1. Enter a long URL in the input field
2. Click "Shorten" button
3. Your shortened URL will appear below
4. Click "Copy" to copy it to your clipboard
5. View your recent URLs in the history section below

## API Configuration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure your backend server is running before using the frontend.
