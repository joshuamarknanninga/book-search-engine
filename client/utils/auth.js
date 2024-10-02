// client/src/utils/auth.js

export const loginUser = (token) => {
    localStorage.setItem('id_token', token);
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('id_token');
  };
  
  export const getToken = () => {
    return localStorage.getItem('id_token');
  };
  