import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const seedOrders = [
  { id: 7, customer: 'Dipak Sahani', phone: '8080014894', type: 'Prescription', item: 'Prescription', status: 'Audited', bill: 130, payment: '-', date: '19/3/2026' },
  { id: 6, customer: 'd', phone: '1234567889', type: 'Prescription', item: 'Prescription', status: 'Audited', bill: 60, payment: '-', date: '19/3/2026' },
  { id: 5, customer: 'Test User', phone: '9999999999', type: 'Prescription', item: 'Prescription', status: 'Pending', bill: null, payment: '-', date: '19/3/2026' },
  { id: 4, customer: 'd', phone: '1234567889', type: 'Name', item: 'Dolo 650', status: 'Pending', bill: null, payment: '-', date: '19/3/2026' },
  { id: 3, customer: 'CURL_TEST', phone: '1122334455', type: 'Prescription', item: 'Prescription', status: 'Pending', bill: null, payment: '-', date: '19/3/2026' },
  { id: 2, customer: 'Dipak', phone: '1234567889', type: 'Name', item: 'Dolo 650', status: 'Pending', bill: null, payment: '-', date: '19/3/2026' },
];

const tabs = ['All', 'Pending', 'Audited', 'Confirmed', 'Cancelled'];

function formatBill(value) {
  if (value === null || value === undefined) return '-';
  return `Rs${value.toFixed(2)}`;
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState(seedOrders);

  const visibleOrders = useMemo(() => {
    if (activeTab === 'All') return orders;
    return orders.filter((order) => order.status === activeTab);
  }, [orders, activeTab]);

  const setTemporaryNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 2200);
  };

  const onAudit = (id) => {
    const selected = orders.find((order) => order.id === id);
    if (!selected) {
      setTemporaryNotice('Order not found.');
      return;
    }

    navigate(`/orders/${id}/audit`, {
      state: {
        order: { ...selected, status: 'Pending', bill: selected.bill ?? 0 },
        mode: 'audit',
      },
    });
  };

  const onView = (orderId) => {
    const selected = orders.find((order) => order.id === orderId);
    if (!selected) {
      setTemporaryNotice('Order not found.');
      return;
    }

    navigate(`/orders/${orderId}/audit`, {
      state: {
        order: selected,
        mode: 'view',
      },
    });
  };

  return (
    <div className="dashboard-page inventory-theme">
      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <div className="brand-title">MedStore</div>
          <div className="brand-subtitle">Admin Panel</div>
        </div>

        <nav className="dashboard-nav">
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/dashboard">Dashboard</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/inventory">
            Inventory
            <span className="pill-count">23</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store-setup">Store Setup</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/orders">Orders</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/taxes">Tax Settings</NavLink>
        </nav>

        <div className="sidebar-section">Quick Actions</div>
        <div className="quick-links">
          <button className="quick-link" type="button" onClick={() => navigate('/inventory')}>Search Medicines</button>
          <button className="quick-link" type="button" onClick={() => navigate('/store-setup')}>Store Setup</button>
          <button className="quick-link" type="button" onClick={() => setTemporaryNotice('Support request drafted successfully.')}>Help & Support</button>
        </div>

        <button className="help-card" type="button" onClick={() => navigate('/')}>Switch Store</button>
      </aside>

      <main className="dashboard-main">
        {notice ? <div className="toast-msg">{notice}</div> : null}

        <header className="topbar">
          <input className="search-input" placeholder="Search order ID, customer, phone..." />
          <div className="topbar-user">
            <span className="user-name">Admin User</span>
            <span className="user-email">admin@medstore.com</span>
          </div>
        </header>

        <section className="dashboard-header">
          <div>
            <h1>Orders</h1>
            <p>MediGhar Pharmacy - Andheri - All orders</p>
          </div>
        </section>

        <section className="panel orders-panel">
          <div className="orders-tabs" role="tablist" aria-label="Order status tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`orders-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Bill</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td className="orders-customer-cell">{order.customer}</td>
                    <td>{order.phone}</td>
                    <td><span className="order-type-pill">{order.type}</span></td>
                    <td>{order.item}</td>
                    <td><span className={`order-status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{formatBill(order.bill)}</td>
                    <td>{order.payment}</td>
                    <td>{order.date}</td>
                    <td>
                      {order.status === 'Pending' ? (
                        <button type="button" className="order-action-btn" onClick={() => onAudit(order.id)}>Audit</button>
                      ) : (
                        <button type="button" className="order-action-btn" onClick={() => onView(order.id)}>View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
