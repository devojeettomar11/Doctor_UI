import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Info, Percent, IndianRupee, Plus, Save, Trash2 } from 'lucide-react';

const seedTaxes = [
  { id: 't1', name: 'service tax', mode: 'fixed', value: '10' },
  { id: 't2', name: 'erty', mode: 'percentage', value: '0' },
];

export default function TaxSettingsPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [taxes, setTaxes] = useState(seedTaxes);

  const setTemporaryNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 2200);
  };

  const taxCountLabel = useMemo(() => `${taxes.length} tax field${taxes.length === 1 ? '' : 's'}`, [taxes.length]);

  const onAddTax = () => {
    setTaxes((prev) => [
      ...prev,
      { id: `t${Date.now()}`, name: `tax field ${prev.length + 1}`, mode: 'percentage', value: '0' },
    ]);
    setTemporaryNotice('New tax field added.');
  };

  const onDeleteTax = (id) => {
    setTaxes((prev) => prev.filter((tax) => tax.id !== id));
    setTemporaryNotice('Tax field removed.');
  };

  const onSaveChanges = () => {
    setTemporaryNotice('Tax settings saved successfully.');
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
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/store-setup">Store Setup</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/orders">Orders</NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store/taxes">Tax Settings</NavLink>
        </nav>

        <div className="sidebar-section">Quick Actions</div>
        <div className="quick-links">
          <button className="quick-link" type="button" onClick={() => navigate('/store/inventory')}>Search Medicines</button>
          <button className="quick-link" type="button" onClick={() => navigate('/store/store-setup')}>Store Setup</button>
          <button className="quick-link" type="button" onClick={() => setTemporaryNotice('Support request drafted successfully.')}>Help & Support</button>
        </div>

        <button className="help-card" type="button" onClick={() => navigate('/store')}>Switch Store</button>
      </aside>

      <main className="dashboard-main">
        {notice ? <div className="toast-msg">{notice}</div> : null}

        <header className="topbar">
          <input className="search-input" placeholder="Search medicines, batches..." />
          <div className="topbar-user">
            <span className="user-name">Admin User</span>
            <span className="user-email">admin@medstore.com</span>
          </div>
        </header>

        <section className="dashboard-header">
          <div>
            <h1>Tax Settings</h1>
            <p>Configure additional charges and taxes for your store audits.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="action-btn primary" onClick={onSaveChanges}><Save size={16} />Save Changes</button>
          </div>
        </section>

        <section className="panel tax-settings-wrap">
          <div className="tax-note-row">
            <span className="tax-note-icon" aria-hidden="true"><Info size={18} /></span>
            <p>
              These tax fields will be automatically calculated when you audit an order.
              You can choose between <strong>Percentage</strong> of the base amount or a <strong>Fixed Fee</strong>.
            </p>
          </div>

          <div className="tax-count-label">{taxCountLabel}</div>

          <div className="tax-list">
            {taxes.map((tax) => (
              <article className="tax-item" key={tax.id}>
                <div className="tax-left-col">
                  <label className="tax-input-label">Tax Name</label>
                  <input
                    className="tax-name-input"
                    value={tax.name}
                    onChange={(event) => {
                      const nextName = event.target.value;
                      setTaxes((prev) => prev.map((row) => (row.id === tax.id ? { ...row, name: nextName } : row)));
                    }}
                  />
                </div>

                <div className="tax-mid-col">
                  <label className="tax-input-label">Type</label>
                  <div className="tax-mode-switch" role="group" aria-label="Tax mode switch">
                    <button
                      type="button"
                      className={`tax-mode-btn ${tax.mode === 'percentage' ? 'active' : ''}`}
                      onClick={() => {
                        setTaxes((prev) => prev.map((row) => (row.id === tax.id ? { ...row, mode: 'percentage' } : row)));
                      }}
                    >
                      <Percent size={14} />Percentage
                    </button>
                    <button
                      type="button"
                      className={`tax-mode-btn ${tax.mode === 'fixed' ? 'active' : ''}`}
                      onClick={() => {
                        setTaxes((prev) => prev.map((row) => (row.id === tax.id ? { ...row, mode: 'fixed' } : row)));
                      }}
                    >
                      <IndianRupee size={14} />Fixed
                    </button>
                  </div>
                </div>

                <div className="tax-right-col">
                  <label className="tax-input-label">Value</label>
                  <div className="tax-value-wrap">
                    <input
                      className="tax-value-input"
                      value={tax.value}
                      inputMode="decimal"
                      onChange={(event) => {
                        const nextValue = event.target.value.replace(/[^\d.]/g, '');
                        setTaxes((prev) => prev.map((row) => (row.id === tax.id ? { ...row, value: nextValue } : row)));
                      }}
                    />
                    <span className="tax-value-unit">{tax.mode === 'fixed' ? 'Rs' : '%'}</span>
                  </div>
                </div>

                <button type="button" className="tax-delete-btn" onClick={() => onDeleteTax(tax.id)}><Trash2 size={14} />Delete</button>
              </article>
            ))}
          </div>

          <button type="button" className="tax-add-btn" onClick={onAddTax}><Plus size={18} />Add New Tax Field</button>
        </section>
      </main>
    </div>
  );
}
