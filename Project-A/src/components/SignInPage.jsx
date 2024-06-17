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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signUp: false,
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    if (data.status == "approved") {
      console.log("siginIn successful");
      navigate("/chat-page");
    } else {
      // sign in failure code goes here
    }
  };
  const handleSignUp = async (formData) => {
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return console.log("passwords dont match");
      // add passwords dont match script here
    }
    const response = await fetch("http://127.0.0.1:4000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signUp: true,
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    if (data.status == "approved") {
      console.log("siginIn successful");
      navigate("/chat-page");
    } else {
      // sign in failure code goes here
    }
    // success / faliure handling here
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("Form submitted");
    if (!isSignUp) {
      handleSignIn(formData);
    } else if (isSignUp) {
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
            <div id="signInUsername/email">
              <label htmlFor="username/email">Username/Email:</label>
              <input
                type="text"
                placeholder="Enter username/email"
                required
                name="email"
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
        {isSignUp ? "Already have an account" : "New User"}
      </button>
    </div>
  );
}

export default AuthPage;
