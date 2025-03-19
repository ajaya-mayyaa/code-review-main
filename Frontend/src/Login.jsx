import { useState } from "react";
import axios from "axios";
import "./styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "signup" : "login";

    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, {
        username,
        email,
      });

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert(isSignUp ? "Sign Up Successful" : "Login Successful");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Please Login " + error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;
