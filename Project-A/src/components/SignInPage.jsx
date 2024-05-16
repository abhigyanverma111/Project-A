// src/AuthPage.js
import  { useState } from "react";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form>
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
