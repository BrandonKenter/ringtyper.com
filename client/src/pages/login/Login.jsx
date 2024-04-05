import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Login = () => {
  const [authForm, setAuthForm] = useState("Sign In");

  return (
    <div className="min-h-screen bg-neutral-800 px-10 flex items-center justify-center">
      {authForm === "Sign In" && <SignInForm setAuthForm={setAuthForm} />}
      {authForm === "Sign Up" && <SignUpForm setAuthForm={setAuthForm} />}
    </div>
  );
};

export default Login;
