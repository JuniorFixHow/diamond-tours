export const validData = (email: string, password: string): boolean => {
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    // Password validation
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter.');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      alert('Password must contain at least one lowercase letter.');
      return false;
    }
    if (!/\d/.test(password)) {
      alert('Password must contain at least one digit.');
      return false;
    }
    if (!/[@$!%*?&]/.test(password)) {
      alert('Password must contain at least one special character.');
      return false;
    }
  
    return true;
  };

  
export const validatePassword = (password: string): boolean => {
   
    // Password validation
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter.');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      alert('Password must contain at least one lowercase letter.');
      return false;
    }
    if (!/\d/.test(password)) {
      alert('Password must contain at least one digit.');
      return false;
    }
    if (!/[@$!%*?&]/.test(password)) {
      alert('Password must contain at least one special character.');
      return false;
    }
  
    return true;
  };