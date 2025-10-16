# AI Security Labs Hub

A modern React-based interface for the AI Prompt Injection Labs platform, featuring a ChatGPT-like layout with sidebar navigation and chat interface.

## Features

- **Modern UI**: Built with React and Material-UI Joy components
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Chat**: Interactive chat interface for each lab
- **Lab Status**: Shows online/offline status for each lab
- **Sidebar Navigation**: Easy navigation between labs
- **Flag System**: Unique flags generated for each completed challenge
- **Nginx Integration**: Production-ready reverse proxy setup
- **Gunicorn**: WSGI server for production deployment

## Development Setup

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   # Install Node.js dependencies
   npm install
   
   # Install Python dependencies
   pip install -r requirements.txt
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Start Flask backend (in another terminal):**
   ```bash
   python app.py
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Production Build

### Build the React app:
```bash
npm run build
```

### Run with Docker:
```bash
docker build -t ai-security-hub .
docker run -p 5000:5000 ai-security-hub
```

## Architecture

### Frontend (React)
- **App.jsx**: Main application component
- **Sidebar.jsx**: Lab navigation component
- **ChatArea.jsx**: Chat interface component
- **ColorToggle.jsx**: Theme toggle component
- **Theme.jsx**: Material-UI theme configuration

### Backend (Flask)
- **app.py**: Flask server with API endpoints
- **labs_config.json**: Lab configuration data
- **requirements.txt**: Python dependencies

### API Endpoints
- `GET /api/labs`: Get all labs configuration
- `GET /api/labs/<id>`: Get specific lab configuration
- `POST /api/chat`: Forward chat messages to labs
- `GET /api/labs/<id>/flag`: Get flag for completed lab
- `GET /health`: Health check endpoint

## Lab Integration

The hub communicates with individual lab containers:
- Each lab runs on ports 5001-5008
- Chat messages are forwarded to the appropriate lab
- Lab status is checked via health endpoints
- Success/failure states are tracked and displayed

## Development Workflow

1. **Frontend changes**: Edit React components in `src/`
2. **Backend changes**: Edit Flask app in `app.py`
3. **Lab configuration**: Update `labs_config.json`
4. **Testing**: Use `npm run dev` for hot reloading
5. **Production**: Build with `npm run build`

## Troubleshooting

### Common Issues

1. **Labs not connecting**: Ensure lab containers are running
2. **CORS errors**: Check that Flask CORS is properly configured
3. **Build errors**: Clear node_modules and reinstall dependencies
4. **Port conflicts**: Change ports in vite.config.js or app.py

### Debug Mode
- Frontend: Check browser console for React errors
- Backend: Flask debug mode shows detailed error messages
- Network: Use browser dev tools to inspect API calls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Flag System

The Hub now includes a comprehensive flag system that generates unique flags for each lab challenge. When a user successfully completes a challenge, they receive a flag that serves as proof of completion.

### Key Features:
- **Unique Generation**: Each flag is unique per user and lab
- **Secure Storage**: Flags are generated at runtime and removed after use
- **Environment Variables**: Flags are passed securely to the application
- **Frontend Integration**: Flags are displayed in the chat interface

For detailed documentation, see [FLAG_SYSTEM.md](FLAG_SYSTEM.md).

## License

Educational use only - for AI security research and learning. 