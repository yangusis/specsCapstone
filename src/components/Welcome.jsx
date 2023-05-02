import { Link, Outlet } from "react-router-dom";
import "./Welcome.css";
import { useState, useEffect } from "react";

const Welcome = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="welcomeContainer fade-in slide-right">
      <h1 className="welcomeHeader">TO-DO LIST</h1>
      <h2 className="welcomeDesc">
        Introducing the ultimate productivity tool - the to-do list
      </h2>
      <div className="welcomeBtns">
        <Link className="wLogin" to="/login">
          Login
        </Link>
        <Link className="wRegister" to="/register">
          Register
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Welcome;
