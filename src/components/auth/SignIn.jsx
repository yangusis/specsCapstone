import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //^ change handlers
  const emailChangeHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const passwordChangeHandler = (evt) => {
    setPassword(evt.target.value);
  };
  //^ End change handlers

  const login = (evt) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((loginInfo) => {
        console.log(loginInfo);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-in fade-in slide-up">
      <h1 className="siHeader">TO-DO LIST</h1>
      <form onSubmit={login}>
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={emailChangeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button type="submit">Log In</button>
        <Link to="/register" className="lpRegister">
          Create an Account
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
