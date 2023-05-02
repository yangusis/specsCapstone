import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
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

  const register = (evt) => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
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
    <div className="sign-up fade-in slide-down">
      <h1>TO-DO LIST</h1>
      <form onSubmit={register}>
        <h2>Create Account</h2>
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
        <button type="submit">Register</button>
        <Link to="/login" className="suLogin">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
