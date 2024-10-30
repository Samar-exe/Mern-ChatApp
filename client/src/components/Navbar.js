import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


const Navbar = () => {
  const {user,logoutUser} = useContext(AuthContext)
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark mb-4"
      style={{ height: "3.75rem" }}
    >
      <div className="container">
        <h2>
          <Link to="/" className="text-decoration-none link-light">
            ChatApp
          </Link>
        </h2>
          {user && <h5 className="text-warning loggedIn">Logged in as {user?.name}</h5>}
      </div>
      {user && (
        <>
        <Link onClick={logoutUser} to="/login" className="btn btn-danger mx-2" role="button">
        Logout
      </Link>
      </>
    )}
    {!user && (
      <>
      <Link to="/login" className="btn btn-success " role="button">
        Login
      </Link>
      <Link to="/register" className="btn btn-info mx-3" role="button">
        Signup
      </Link>
      </>
    )}
      
    </nav>
  );
};

export default Navbar;
