import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = async (formData) => {
    const response = await fetch("http://127.0.0.1:4000/api/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signUp: false,
        emailOrUsername: formData.get("emailOrUsername"), // Changed key to emailOrUsername
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    if (data.status == "approved") {
      console.log("siginIn successful");
      navigate("/chat-page");
    } else {
      alert("Please verify your login details");
    }
  };

  const handleSignUp = async (formData) => {
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return console.log("Passwords don't match");
      // Add passwords don't match script here
    }
    const response = await fetch("http://127.0.0.1:4000/api/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signUp: true,
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
      }),
    });
    const data = await response.json();
    if (data.status == "approved") {
      console.log("signUp successful");
      navigate("/chat-page");
    } else {
      console.log("Sign up failed");
    }
    // Success / failure handling here
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("Form submitted");
    if (!isSignUp) {
      handleSignIn(formData);
    } else {
      handleSignUp(formData);
    }
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000000", // Black background
    color: "#FFFFFF", // White text
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#031636", // Dark blue background
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #043991", // Blue border
    color: "#FFFFFF", // White text
    backgroundColor: "#000000", // Black background
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#043991", // Bright blue button
    color: "#FFFFFF", // White text
    cursor: "pointer",
  };

  const toggleButtonStyle = {
    marginTop: "10px",
    background: "none",
    border: "none",
    color: "#FFFFFF",
    textDecoration: "underline",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              required
              name="email"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Enter username"
              required
              name="username"
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Enter password"
              required
              name="password"
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Confirm password"
              required
              name="confirmPassword"
              style={inputStyle}
            />
          </>
        )}
        {!isSignUp && (
          <>
            <input
              type="text"
              placeholder="Username or Email"
              required
              name="emailOrUsername"
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Enter password"
              required
              name="password"
              style={inputStyle}
            />
          </>
        )}
        <button type="submit" style={buttonStyle}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button onClick={toggleAuthMode} style={toggleButtonStyle}>
        {isSignUp ? "Already have an account?" : "New User?"}
      </button>
    </div>
  );
}

export default AuthPage;
