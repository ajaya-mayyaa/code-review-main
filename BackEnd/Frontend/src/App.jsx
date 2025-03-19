import { useState, useEffect } from 'react';
import axios from 'axios';
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";
import './styles/App.css';
import CodeEditor from './components/CodeEditor';
import CodeReview from './components/CodeReview';
import Login from './Login';

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [user, setUser] = useState(null); 

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post('http://localhost:5000/ai/get-review', { code });
    setReview(response.data);
  }

 const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("user"); 
    alert("Signed out successfully!"); // Alert message
};

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");
      
      console.log("Signup Successful:", data);
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };
  

  return (
    <main>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <button onClick={handleLogout} className="logout-btn">signout</button>
          <CodeEditor code={code} setCode={setCode} reviewCode={reviewCode} />
          <CodeReview review={review} />
        </>
      )}
    </main>
  );
}

export default App;


    // <>
    // <ClerkProvider publishableKey={clerkPubKey}>
    // <SignedOut>
    //   <div className="flex flex-col items-center min-h-screen bg-black text-white">
    //     <h1 className="text-2xl mb-4">Welcome! Please Sign In</h1>
    //     <SignIn />
    //   </div>
    // </SignedOut>
    // <SignedIn>
    //   <div>
    //     <div className="">
          
    //       <UserButton />
    //     </div>
    //   </div>
    // </SignedIn>
    // </ClerkProvider>
    //     <CodeEditor  code={code} setCode={setCode} reviewCode={reviewCode}  />
    //     <CodeReview review={review}/>
    // </>