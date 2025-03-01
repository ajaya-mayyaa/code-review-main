// import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import { useState } from "react";
// import "../styles/auth.css";

// function Auth() {
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h1>Welcome to CodeReview</h1>
//         <p>Sign {isSignUp ? "Up" : "In"} to continue</p>

//         <SignedOut>
//           {isSignUp ? <SignUp afterSignInUrl="/" redirectUrl="/" /> : <SignIn afterSignInUrl="/" redirectUrl="/" />}
//           <p className="toggle-auth">
//             {isSignUp ? "Already have an account?" : "Don't have an account?"}
//             <button onClick={() => setIsSignUp((prev) => !prev)}> {/* Use functional update to prevent issues */}
//               {isSignUp ? " Sign In" : " Sign Up"}
//             </button>
//           </p>
//         </SignedOut>

//         <SignedIn>
//           <UserButton afterSignOutUrl="/" />
//           <p className="success-text">You are logged in!</p>
//         </SignedIn>
//       </div>
//     </div>
//   );
// }

// export default Auth;
