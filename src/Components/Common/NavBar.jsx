import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../Authorization/ProtectedRoute";
import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, setToggleLogin }) => {
  const [login, setLogin] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetch(`${URL}/api/auth/logout`);
    localStorage.removeItem("token");
    if (response.ok) {
      setToggleLogin(false);
      navigate("/login");
    }
  }

  const handleClick = () => {
    if (login) handleLogout();
    else setLogin(true);
  };

  return (
    <div className="navbar-container">
      <Link to={"/teapots"}>
        <h1>TeaWhips</h1>
      </Link>
      <article>
        <Link to={"/about"}>
          <p className="p1">About</p>
        </Link>
        <Link
          onClick={handleClick}
          to={"/login"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <p className="p2">{!toggleLogin ? "Login" : "Logout"}</p>
        </Link>
      </article>
    </div>
  );
};

export default NavBar;
