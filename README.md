<div align="center">
  <img src="./public/frontend_logo.png" alt="Mental::Bridge Logo" width="300"/>
  <h1>Mental::Bridge Mental Health Support Platform</h1>
  <p>A modern web application designed to provide mental health support, resources, and AI-assisted guidance.</p>
</div>

## ⚠️ Project Status: Work in Progress

This project is currently under active development and is **not yet complete**. Many features are still being implemented, and some functionality may be limited or subject to change. We welcome feedback as we continue to improve the platform.

**Current Development Focus:**
- Enhancing AI chat response formatting
- Improving backend-frontend connectivity
- Implementing user authentication flows
- Expanding resource recommendations

**Known Limitations:**
- Some UI elements are placeholders
- Backend connectivity may be unstable
- Mobile responsiveness is being refined
- Limited error handling in certain components

We're working hard to bring this mental health support platform to completion. Please check back regularly for updates!

## Features

### User Authentication
- Secure sign-up and login functionality
- Password reset capabilities
- Profile management

### AI Chat Assistant
- Real-time conversations with an AI mental health assistant
- Support for mental health inquiries and guidance
- Well-formatted responses with proper markdown styling
- Contextual recommendations based on user queries

### Resource Recommendations
- Article recommendations tailored to user conversations
- Clinic and professional service suggestions
- Categorized mental health resources

### Dashboard
- Clean, intuitive user interface
- Quick access to all platform features
- User activity overview

### Mental Health Services
- Directory of mental health services
- Detailed view of available resources
- Filtering options for specific needs

### Appointment Management
- Schedule appointments with professionals
- Manage and track upcoming sessions
- Reminder system

### Community Support
- Access to community resources
- Group session information
- Peer support connections

### Crisis Support
- Emergency contact information
- Crisis intervention resources
- Immediate help options

### Profile Management
- Personalized user settings
- Progress tracking
- Preference configuration

### Responsive Design
- Mobile-friendly interface
- Accessible across devices
- Optimized for various screen sizes

## Technologies Used

### Frontend
- **React** - UI component library
- **Next.js 15** - React framework for server-side rendering and static site generation
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth UI transitions

### State Management
- React Hooks (useState, useEffect, useRef)
- Context API for global state

### Authentication
- Firebase Authentication - User authentication and management

### API Integration
- RESTful API consumption
- Fetch API for data requests

### Design
- Responsive design principles
- Accessibility standards compliance
- Modern UI/UX patterns

## Backend Integration
The frontend connects to a Python FastAPI backend that provides:
- AI-powered conversation capabilities
- RAG (Retrieval Augmented Generation) for context-aware responses
- Vector database for semantic search of resources
- Markdown formatting for clean text responses

## Screenshots

<div align="center">
  <img src="./public/screenshots/dashboard.png" alt="Dashboard" width="800"/>
  <p><em>Dashboard Interface</em></p>
  
  <img src="./public/screenshots/chat.png" alt="Chat Interface" width="800"/>
  <p><em>AI Chat Assistant</em></p>
</div>

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
   ```
   git clone https://github.com/yourusername/connectx.git
   cd connectx
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Backend Connection
By default, the application starts in mock data mode. To connect to the backend:
1. Ensure the backend server is running on `http://localhost:8000`
2. Toggle the "Connect to live backend" button in the chat interface

## License
[Your chosen license]

## Acknowledgements
- OpenAI for the AI capabilities
- All open-source libraries and frameworks used in this project
