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

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <div id="signupEmail">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                required
                name="email"
              />
            </div>
            <div id="signupUsername">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                placeholder="Enter username"
                required
                name="username"
              />
            </div>
            <div id="signupPassword">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                name="password"
              />
            </div>
            <div id="signupConfirmPassword">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm password"
                required
                name="confirmPassword"
              />
            </div>
          </>
        )}
        {!isSignUp && (
          <>
            <div id="signInUsernameOrEmail">
              <label htmlFor="emailOrUsername">Username/Email:</label>
              <input
                type="text"
                placeholder="Enter username or email"
                required
                name="emailOrUsername" // Changed name to emailOrUsername
              />
            </div>
            <div id="signInPassword">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                required
                name="password"
              />
            </div>
          </>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={toggleAuthMode}>
        {isSignUp ? "Already have an account?" : "New User?"}
      </button>
    </div>
  );
}

export default AuthPage;
