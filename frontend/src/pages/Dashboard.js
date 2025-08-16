import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import '../styles/dashboard.css';

export default function Dashboard() {
  const { userState } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <h1 className="dashboard-welcome-title">
              Welcome back, {userState?.user?.userName || 'User'}!
            </h1>
            <p className="dashboard-welcome-subtitle">
              Here's your account information.
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-center">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-card-icon primary">P</div>
              <h3 className="dashboard-card-title">Profile Information</h3>
            </div>
            <div className="dashboard-card-body">
              <div className="dashboard-user-info">
                <div className="dashboard-info-item">
                  <div className="dashboard-info-icon">ID</div>
                  <div className="dashboard-info-content">
                    <div className="dashboard-info-label">User ID</div>
                    <div className="dashboard-info-value">
                      {userState?.user?._id || 'Not available'}
                    </div>
                  </div>
                </div>
                <div className="dashboard-info-item">
                  <div className="dashboard-info-icon">U</div>
                  <div className="dashboard-info-content">
                    <div className="dashboard-info-label">Username</div>
                    <div className="dashboard-info-value">
                      {userState?.user?.userName || 'Not available'}
                    </div>
                  </div>
                </div>
                <div className="dashboard-info-item">
                  <div className="dashboard-info-icon">@</div>
                  <div className="dashboard-info-content">
                    <div className="dashboard-info-label">Email Address</div>
                    <div className="dashboard-info-value">
                      {userState?.user?.email || 'Not available'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
