import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link className="navbarLink" to="/">
          HOME
        </Link>
        <Link className="navbarLink" to="/logout">
          LOG OUT
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
