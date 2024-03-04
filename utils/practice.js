const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Example usage:
  const emailToValidate = "john.doe@example.com";
  if (validateEmail(emailToValidate)) {
    console.log("Email is valid!");
  } else {
    console.log("Invalid email format!");
  }
  