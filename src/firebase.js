// Firebase has been removed from this project
// This file is kept as a placeholder for future API integration
// 
// To add a backend API later:
// 1. Create a new API service in src/services/api.js
// 2. Update context files to use the API instead of localStorage
// 3. Remove this file

const firebaseStub = {
  message: 'Firebase removed - using localStorage only',
  ready: true,
  offlineMode: true
};

export default firebaseStub;

// Placeholder exports to prevent import errors
export const auth = null;
export const db = null;
export const storage = null;
