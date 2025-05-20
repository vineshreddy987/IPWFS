// App Configuration
const config = {
  // API Settings
  apiBaseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://ipwfs-backend.vercel.app' 
    : 'http://localhost:5000',
  
  // Auth Settings
  tokenKey: 'authToken',
  authStorageKey: 'isAuthenticated',
  userEmailKey: 'userEmail',
  userNameKey: 'userName',
  
  // App Settings
  appName: 'Interview Prep For Students',
  appVersion: '1.0.0',
  demoMode: true, // Allow demo mode authentication
  
  // Timeout settings
  apiTimeout: 30000, // 30 seconds
};

export default config; 