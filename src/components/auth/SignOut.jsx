import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Navigate } from "react-router";
import "./SignOut.css";

const SignOut = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        return <Navigate to="/login" />;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="logoutWrapper">
      <div className="logoutContainer">
        {authUser && (
          <>
            <h1 className="head">Are you sure you wish to log out?</h1>
            <button className="logoutBtn" onClick={userSignOut}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignOut;
