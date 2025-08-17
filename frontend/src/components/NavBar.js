import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import '../styles/navbar.css';

// Navigation component that changes based on authentication status
function Navbar() {
  const { userState, handleLogout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">H</div>
          <span className="navbar-brand-text">Hilo AI Labs</span>
        </Link>

        <ul className="navbar-nav">
          {userState.isLoggedIn ? (
            <>
              <li className="navbar-nav-item">
                <Link to="/dashboard" className="navbar-nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="navbar-nav-item">
                <div className="navbar-user-menu">
                  <div className="navbar-user-button">
                    <div className="navbar-user-avatar">
                      {userState.user?.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="navbar-user-info">
                      <div className="navbar-user-name">
                        {userState.user?.userName || 'User'}
                      </div>
                      <div className="navbar-user-email">
                        {userState.user?.email || 'user@example.com'}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="navbar-nav-item">
                <button onClick={handleLogout} className="navbar-logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-nav-item">
                <Link to="/login" className="navbar-nav-link">
                  Login
                </Link>
              </li>
              <li className="navbar-nav-item">
                <Link to="/register" className="navbar-nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
