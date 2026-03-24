import React, { useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Trash2 } from 'lucide-react';

function defaultOrder(orderId) {
  return {
    id: Number(orderId || 0),
    customer: 'Test User',
    phone: '9999999999',
    type: 'Prescription',
    item: 'Prescription',
    status: 'Pending',
    date: '19/3/2026',
    bill: 0,
  };
}

export default function OrderAuditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();

  const mode = location.state?.mode || 'audit';
  const order = location.state?.order || defaultOrder(orderId);

  const [notice, setNotice] = useState('');
  const [items, setItems] = useState([{ id: 1, name: '', qty: '1', price: '' }]);
  const [overrideTotal, setOverrideTotal] = useState('');

  const setTemporaryNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 2200);
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, row) => {
      const qty = Number(row.qty || 0);
      const price = Number(row.price || 0);
      return sum + qty * price;
    }, 0);
  }, [items]);

  const serviceTax = 10;
  const extraTax = 0;
  const calculatedTotal = subtotal + serviceTax + extraTax;
  const finalTotal = overrideTotal.trim() ? Number(overrideTotal) || 0 : calculatedTotal;

  const onAddItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), name: '', qty: '1', price: '' }]);
  };

  const onRemoveItem = (id) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((item) => item.id !== id)));
  };

  const onConfirmBill = () => {
    setTemporaryNotice('Bill confirmed and sent to customer.');
  };

  return (
    <div className="dashboard-page inventory-theme">
      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <div className="brand-title">MedStore</div>
          <div className="brand-subtitle">Admin Panel</div>
        </div>

        <nav className="dashboard-nav">
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/dashboard">Dashboard</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/inventory">
            Inventory
            <span className="pill-count">23</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store-setup">Store Setup</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/orders">Orders</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/taxes">Tax Settings</NavLink>
        </nav>

        <div className="sidebar-section">Quick Actions</div>
        <div className="quick-links">
          <button className="quick-link" type="button" onClick={() => navigate('/store/inventory')}>Search Medicines</button>
          <button className="quick-link" type="button" onClick={() => navigate('/store/orders')}>All Orders</button>
          <button className="quick-link" type="button" onClick={() => setTemporaryNotice('Support request drafted successfully.')}>Help & Support</button>
        </div>

        <button className="help-card" type="button" onClick={() => navigate('/store')}>Switch Store</button>
      </aside>

      <main className="dashboard-main">
        {notice ? <div className="toast-msg">{notice}</div> : null}

        <section className="audit-header-row">
          <button type="button" className="audit-back-btn" onClick={() => navigate('/store/orders')}><ArrowLeft size={16} />Back</button>
          <div>
            <h1>Audit Order #{order.id}</h1>
            <p>Customer: {order.customer} - {order.phone}</p>
          </div>
        </section>

        <section className="audit-grid">
          <article className="panel audit-prescription-panel">
            <h2>Prescription</h2>
            <div className="audit-qr-box" aria-hidden="true">
              <div className="audit-qr-inner">QR</div>
            </div>

            <div className="audit-meta-grid">
              <div>
                <span className="audit-meta-label">Status</span>
                <span className={`order-status-pill ${order.status.toLowerCase()}`}>{mode === 'audit' ? 'Pending' : order.status}</span>
              </div>
              <div>
                <span className="audit-meta-label">Order Date</span>
                <strong>{order.date}, 1:12:37 pm</strong>
              </div>
            </div>
          </article>

          <article className="panel audit-bill-panel">
            <h2>Generate Bill</h2>

            <div className="audit-items">
              {items.map((row) => (
                <div className="audit-item-row" key={row.id}>
                  <input
                    value={row.name}
                    onChange={(event) => {
                      const next = event.target.value;
                      setItems((prev) => prev.map((item) => (item.id === row.id ? { ...item, name: next } : item)));
                    }}
                    placeholder="Medicine name"
                  />
                  <input
                    value={row.qty}
                    onChange={(event) => {
                      const next = event.target.value.replace(/\D/g, '');
                      setItems((prev) => prev.map((item) => (item.id === row.id ? { ...item, qty: next || '0' } : item)));
                    }}
                    placeholder="Qty"
                  />
                  <input
                    value={row.price}
                    onChange={(event) => {
                      const next = event.target.value.replace(/[^\d.]/g, '');
                      setItems((prev) => prev.map((item) => (item.id === row.id ? { ...item, price: next } : item)));
                    }}
                    placeholder="Price"
                  />
                  <button type="button" className="audit-delete-btn" onClick={() => onRemoveItem(row.id)}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>

            <button type="button" className="audit-add-item-btn" onClick={onAddItem}><Plus size={16} />Add Item</button>

            <div className="audit-summary">
              <div><span>Medicines Subtotal</span><strong>Rs{subtotal.toFixed(2)}</strong></div>
              <div><span>service tax</span><strong>+ Rs{serviceTax.toFixed(2)}</strong></div>
              <div><span>erty (0%)</span><strong>+ Rs{extraTax.toFixed(2)}</strong></div>
              <div className="audit-total-row"><span>Final Bill Amount</span><strong>Rs{finalTotal.toFixed(2)}</strong></div>
            </div>

            <label className="audit-override-label" htmlFor="overrideTotal">Override Total (optional)</label>
            <input
              id="overrideTotal"
              className="audit-override-input"
              value={overrideTotal}
              onChange={(event) => setOverrideTotal(event.target.value.replace(/[^\d.]/g, ''))}
              placeholder="or leave blank to use Rs0.00"
            />

            <button type="button" className="audit-confirm-btn" onClick={onConfirmBill}><Check size={18} />Confirm & Send Bill to Customer</button>
          </article>
        </section>
      </main>
    </div>
  );
}
