// Cookie utility functions for token management

// Set a cookie with expiration
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure=${window.location.protocol === 'https:'}`;
};

// Get a cookie value
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Delete a cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Token management functions
export const setAuthToken = (token, rememberMe = false) => {
  if (rememberMe) {
    // Store in cookie for 30 days if "remember me" is checked
    setCookie('authToken', token, 30);
    localStorage.removeItem('token'); // Remove from localStorage to avoid conflicts
  } else {
    // Store in localStorage for session-based storage
    localStorage.setItem('token', token);
    deleteCookie('authToken'); // Remove from cookies
  }
};

export const getAuthToken = () => {
  // Check localStorage first (session-based)
  const sessionToken = localStorage.getItem('token');
  if (sessionToken) {
    return sessionToken;
  }
  
  // Check cookies (persistent)
  const cookieToken = getCookie('authToken');
  if (cookieToken) {
    return cookieToken;
  }
  
  return null;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  deleteCookie('authToken');
};

// Check if user has persistent login (remember me)
export const hasPersistentLogin = () => {
  return getCookie('authToken') !== null;
};

// User preferences for remember me
export const setRememberMePreference = (remember) => {
  if (remember) {
    setCookie('rememberMe', 'true', 365); // Store preference for 1 year
  } else {
    deleteCookie('rememberMe');
  }
};

export const getRememberMePreference = () => {
  return getCookie('rememberMe') === 'true';
};
