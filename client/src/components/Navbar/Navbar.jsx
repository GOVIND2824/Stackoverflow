import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
//import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
import bars from "../../assets/bars-solid.svg";

const Navbar = ({ handleSlideIn }) => {
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate(); 
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
          <Link to="/" className="nav-item nav-logo"><img src={logo} alt="logo" /></Link>
          <Link to="/" className="nav-item nav-btn">About</Link>
          <Link to="/" className="nav-item nav-btn">Products</Link>
          <Link to="/" className="nav-item nav-btn">For Teams</Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Link
                  to={`/Users/${User?.result?._id}`}
                ><Avatar
                backgroundColor="#009dff"
                px="20px"
                py="20px"
                borderRadius="50%"
                color="white"
                fontSize={20}
              >{(User?.result?.name).charAt(0).toUpperCase()}</Avatar></Link>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
      </div>
    </nav>
  );
};

export default Navbar;