import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Grid2X2,
  Package,
  Settings,
  ShoppingCart,
  Wallet,
  Globe,
  Search,
  LifeBuoy,
  ShoppingBag,
} from 'lucide-react';

const Sidebar = ({ onSearchClick, setNotice }) => {
  const navigate = useNavigate();

  const handleSupportClick = () => {
    if (setNotice) {
      setNotice('Support request drafted successfully.');
    }
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="brand-block">
        <div className="brand-row">
          <span className="brand-logo"><ShoppingBag size={20} /></span>
          <div>
            <div className="brand-title">MedStore</div>
            <div className="brand-subtitle">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="dashboard-nav">
        <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/dashboard">
          <span className="nav-label"><Grid2X2 size={18} />Dashboard</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/inventory">
          <span className="nav-label"><Package size={18} />Inventory</span>
          <span className="pill-count">23</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/store-setup">
          <span className="nav-label"><Settings size={18} />Store Setup</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/orders">
          <span className="nav-label"><ShoppingCart size={18} />Orders</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/taxes">
          <span className="nav-label"><Wallet size={18} />Tax Settings</span>
        </NavLink>
        <NavLink className="nav-item mt-auto" to="/">
          <span className="nav-label"><Globe size={18} />Back to Website</span>
        </NavLink>
      </nav>

      <div className="sidebar-section">Quick Actions</div>
      <div className="quick-links">
        <button className="quick-link" type="button" onClick={onSearchClick || (() => navigate('/store/inventory'))}>
          <Search className="quick-link-icon" size={16} />Search Medicines
        </button>
        <button className="quick-link" type="button" onClick={() => navigate('/store/store-setup')}>
          <Settings className="quick-link-icon" size={16} />Settings
        </button>
        <button className="quick-link" type="button" onClick={handleSupportClick}>
          <LifeBuoy className="quick-link-icon" size={16} />Help & Support
        </button>
      </div>

      <button className="help-card" type="button" onClick={() => navigate('/store/store-setup')}>
        Store Setup
      </button>
    </aside>
  );
};

export default Sidebar;
