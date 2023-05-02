import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/SignOut";
import Firestore from "./components/database/Firestore";
import Welcome from "./components/Welcome";
import Navbar from "./components/UI/Navbar";
import Loading from "./components/UI/Loading";

function App() {
  const [authUser, setAuthUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setIsLoading(false);
    });
    return () => {
      listen();
    };
  }, [authUser]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={authUser && <Navbar />}>
        <Route path="/" element={authUser ? <Firestore /> : <Welcome />} />
        <Route
          path="/logout"
          element={!authUser ? <Navigate to="/" /> : <AuthDetails />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Route>
    )
  );

  return (
    <div className="appContainer">
      {isLoading ? (
        <Loading styleName="loading" />
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
