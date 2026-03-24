import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../../auth/store/authStore';
import { fetchMyStore, fetchOrders } from '../api/medicalStoreApi';

const seedOrders = [];

const tabs = ['All', 'Pending', 'Audited', 'Confirmed', 'Cancelled'];

function formatBill(value) {
  if (value === null || value === undefined) return '-';
  return `\u20B9${value.toFixed(2)}`;
}

export default function OrdersPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([]);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (user?.email) {
        try {
          const storeRes = await fetchMyStore(user.email);
          if (storeRes.success && storeRes.data) {
            setStore(storeRes.data);
            const ordRes = await fetchOrders(storeRes.data.id, activeTab);
            if (ordRes.success) {
              setOrders(ordRes.data);
            }
          }
        } catch (error) {
          console.error('Error loading orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadOrders();
  }, [user, activeTab]);

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

    navigate(`/store/orders/${id}/audit`, {
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

    navigate(`/store/orders/${orderId}/audit`, {
      state: {
        order: selected,
        mode: 'view',
      },
    });
  };

  return (
    <div className="dashboard-page inventory-theme">
      <Sidebar setNotice={setTemporaryNotice} />

      <main className="dashboard-main">
        {notice ? <div className="toast-msg">{notice}</div> : null}

        <header className="topbar">
          <input className="search-input" placeholder="Search order ID, customer, phone..." />
          <div className="topbar-user">
            <span className="user-name">{user?.name || 'Admin User'}</span>
            <span className="user-email">{user?.email || 'admin@medstore.com'}</span>
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
                    <td className="orders-customer-cell">{order.customerName || 'Anonymous'}</td>
                    <td>{order.customerPhone || 'N/A'}</td>
                    <td><span className="order-type-pill">{order.type}</span></td>
                    <td>{order.itemsCount || 0} items</td>
                    <td><span className={`order-status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{formatBill(Number(order.billAmount || 0))}</td>
                    <td>{order.paymentMethod || 'Manual'}</td>
                    <td>{new Date(order.orderDate || order.createdAt).toLocaleDateString()}</td>
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
