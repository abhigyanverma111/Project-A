import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform sign-in or sign-up logic here
    console.log("Form submitted");
    // On successful sign-in/sign-up, navigate to the chat page
    navigate("/chat-page");
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <div id="signupEmail">
              <label htmlFor="email">Email:</label>
              <input type="email" placeholder="Enter email" required />
            </div>
            <div id="signupPassword">
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder="Enter password" required />
            </div>
            <div id="signupConfirmPassword">
              <label htmlFor="confirm password">Confirm Password:</label>
              <input type="password" placeholder="Confirm password" required />
            </div>
          </>
        )}
        {!isSignUp && (
          <>
            <div id="signInUsername/email">
              <label htmlFor="username/email">Username/Email:</label>
              <input type="text" placeholder="Enter username/email" required />
            </div>
            <div id="signInPassword">
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder="Enter password" required />
            </div>
          </>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={toggleAuthMode}>
        {isSignUp ? "Already have an account" : "New User"}
      </button>
    </div>
  );
}

export default AuthPage;
