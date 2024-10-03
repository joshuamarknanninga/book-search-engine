// client/src/utils/auth.js

class Auth {
    // Retrieve the token from localStorage
    static getToken() {
      return localStorage.getItem('id_token');
    }
  
    // Check if the user is logged in by verifying the token's existence
    static loggedIn() {
      const token = this.getToken();
      return !!token;
    }
  
    // Login by saving the token to localStorage
    static login(token) {
      localStorage.setItem('id_token', token);
      window.location.assign('/search'); // Redirect to the search page after login
    }
  
    // Logout by removing the token from localStorage
    static logout() {
      localStorage.removeItem('id_token');
      window.location.assign('/'); // Redirect to the home or login page after logout
    }
  }
  
  export default Auth;
  