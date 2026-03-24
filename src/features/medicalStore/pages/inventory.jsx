import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const initialInventory = [
  { id: 'm1', name: 'Amoxicillin 250mg', category: 'Capsules', batch: 'BT045', manufacturer: 'MediLife', expiry: '2025-08-15', price: 12.5, stock: 200 },
  { id: 'm2', name: 'Aspirin 75mg', category: 'Tablets', batch: 'BT102', manufacturer: 'PharmaCo', expiry: '2025-11-10', price: 4.25, stock: 35 },
  { id: 'm3', name: 'Cetirizine 10mg', category: 'Tablets', batch: 'CT890', manufacturer: 'AllerCare', expiry: '2026-02-14', price: 6.75, stock: 0 },
  { id: 'm4', name: 'Ibuprofen 400mg', category: 'Tablets', batch: 'BT089', manufacturer: 'HealthPlus', expiry: '2026-03-20', price: 8.75, stock: 150 },
  { id: 'm5', name: 'Metformin 500mg', category: 'Tablets', batch: 'BT067', manufacturer: 'MediLife', expiry: '2026-04-30', price: 15.0, stock: 180 },
  { id: 'm6', name: 'Paracetamol 500mg', category: 'Tablets', batch: 'BT451', manufacturer: 'HealWell', expiry: '2026-01-25', price: 5.5, stock: 220 },
  { id: 'm7', name: 'Omeprazole 20mg', category: 'Capsules', batch: 'OM328', manufacturer: 'GastroCure', expiry: '2025-09-05', price: 9.95, stock: 18 },
  { id: 'm8', name: 'Vitamin D3 60K', category: 'Supplements', batch: 'VD732', manufacturer: 'NutriLab', expiry: '2027-01-09', price: 14.5, stock: 95 },
];

const defaultForm = {
  name: '',
  category: 'Tablets',
  batch: '',
  manufacturer: '',
  expiry: '',
  price: '',
  stock: '',
};

function statusFromStock(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= 40) return 'Low Stock';
  return 'In Stock';
}

function statusClass(status) {
  if (status === 'In Stock') return 'status-pill in-stock';
  if (status === 'Low Stock') return 'status-pill low-stock';
  if (status === 'Out of Stock') return 'status-pill out-stock';
  return 'status-pill expiring';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '--';
  return date.toLocaleDateString('en-GB');
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function InventoryPage() {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const fileInputRef = useRef(null);

  const [inventory, setInventory] = useState(initialInventory);
  const [activeTab, setActiveTab] = useState('view');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [notice, setNotice] = useState('');

  const categoryOptions = useMemo(() => {
    const options = new Set(inventory.map((item) => item.category));
    return ['All Categories', ...options];
  }, [inventory]);

  const filteredRows = useMemo(() => {
    return inventory.filter((item) => {
      const haystack = `${item.name} ${item.batch} ${item.manufacturer}`.toLowerCase();
      const queryMatch = haystack.includes(query.trim().toLowerCase());
      const categoryMatch = category === 'All Categories' || item.category === category;
      const itemStatus = statusFromStock(item.stock);
      const statusMatch = status === 'All Status' || itemStatus === status;
      return queryMatch && categoryMatch && statusMatch;
    });
  }, [inventory, query, category, status]);

  const sortedRows = useMemo(() => {
    const rows = [...filteredRows];
    rows.sort((a, b) => {
      let left = a[sortBy];
      let right = b[sortBy];

      if (sortBy === 'expiry') {
        left = new Date(a.expiry).getTime();
        right = new Date(b.expiry).getTime();
      }

      if (typeof left === 'string') {
        left = left.toLowerCase();
        right = right.toLowerCase();
      }

      if (left < right) return sortDir === 'asc' ? -1 : 1;
      if (left > right) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return rows;
  }, [filteredRows, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 2500);
    return () => clearTimeout(timer);
  }, [notice]);

  const allCurrentSelected = paginatedRows.length > 0 && paginatedRows.every((row) => selectedIds.includes(row.id));

  const onToggleSelectAll = () => {
    if (allCurrentSelected) {
      const currentPageIds = paginatedRows.map((row) => row.id);
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
      return;
    }

    setSelectedIds((prev) => {
      const ids = new Set(prev);
      paginatedRows.forEach((row) => ids.add(row.id));
      return [...ids];
    });
  };

  const onToggleRow = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const onAddMedicine = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.batch.trim() || !formData.manufacturer.trim() || !formData.expiry) {
      setNotice('Please fill all required fields.');
      return;
    }

    const price = Number(formData.price || 0);
    const stock = Number(formData.stock || 0);

    const newItem = {
      id: `m${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      batch: formData.batch.trim().toUpperCase(),
      manufacturer: formData.manufacturer.trim(),
      expiry: formData.expiry,
      price,
      stock,
    };

    setInventory((prev) => [newItem, ...prev]);
    setShowAddModal(false);
    setFormData(defaultForm);
    setActiveTab('view');
    setNotice('Medicine added successfully.');
  };

  const onBulkUploadClick = () => {
    setActiveTab('upload');
    fileInputRef.current?.click();
  };

  const onFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);

    if (lines.length < 2) {
      setNotice('CSV file has no data rows.');
      return;
    }

    const rows = lines.slice(1).map((line, index) => {
      const [name, categoryName, batch, manufacturer, expiry, price, stock] = line.split(',').map((value) => value?.trim() ?? '');
      return {
        id: `u${Date.now()}${index}`,
        name: name || `Uploaded Item ${index + 1}`,
        category: categoryName || 'Tablets',
        batch: batch || `UP${index + 1}`,
        manufacturer: manufacturer || 'Uploaded Manufacturer',
        expiry: expiry || '2027-01-01',
        price: Number(price || 0),
        stock: Number(stock || 0),
      };
    });

    setInventory((prev) => [...rows, ...prev]);
    event.target.value = '';
    setActiveTab('view');
    setNotice(`${rows.length} inventory items uploaded.`);
  };

  const onExport = () => {
    const rows = [
      ['Medicine', 'Category', 'Batch', 'Manufacturer', 'Expiry', 'Price', 'Stock', 'Status'],
      ...sortedRows.map((item) => [item.name, item.category, item.batch, item.manufacturer, formatDate(item.expiry), item.price.toFixed(2), item.stock, statusFromStock(item.stock)]),
    ];

    downloadCsv('inventory-export.csv', rows);
    setNotice('Inventory exported successfully.');
  };

  const onRowAction = (action, item) => {
    if (action === 'edit') {
      const updatedStockValue = window.prompt(`Update stock for ${item.name}`, String(item.stock));
      if (updatedStockValue == null) return;
      const updatedStock = Number(updatedStockValue);
      if (Number.isNaN(updatedStock)) {
        setNotice('Stock must be a number.');
        return;
      }

      setInventory((prev) => prev.map((row) => (row.id === item.id ? { ...row, stock: updatedStock } : row)));
      setNotice('Stock updated.');
      return;
    }

    if (action === 'delete') {
      const confirmed = window.confirm(`Delete ${item.name}?`);
      if (!confirmed) return;

      setInventory((prev) => prev.filter((row) => row.id !== item.id));
      setSelectedIds((prev) => prev.filter((id) => id !== item.id));
      setNotice('Item deleted.');
    }
  };

  return (
    <div className="dashboard-page inventory-theme">
      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <div className="brand-title">MedStore</div>
          <div className="brand-subtitle">Admin Panel</div>
        </div>

        <nav className="dashboard-nav">
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/inventory">
            Inventory
            <span className="pill-count">23</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store-setup">
            Store Setup
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/orders">
            Orders
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/taxes">
            Tax Settings
          </NavLink>
        </nav>

        <div className="sidebar-section">Quick Actions</div>
        <div className="quick-links">
          <button className="quick-link" type="button" onClick={() => searchRef.current?.focus()}>Search Medicines</button>
          <button className="quick-link" type="button" onClick={() => navigate('/store-setup')}>Settings</button>
          <button className="quick-link" type="button" onClick={() => setNotice('Support team has been notified.')}>Help & Support</button>
        </div>

        <button className="help-card" type="button" onClick={() => navigate('/')}>Switch Store</button>
      </aside>

      <main className="dashboard-main">
        {notice ? <div className="toast-msg">{notice}</div> : null}

        <header className="topbar">
          <input
            ref={searchRef}
            className="search-input"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search by name, batch, or manufacturer..."
          />
          <div className="topbar-user">
            <span className="user-name">Admin User</span>
            <span className="user-email">admin@medstore.com</span>
          </div>
        </header>

        <section className="dashboard-header">
          <div>
            <h1>Medicine Inventory</h1>
            <p>Manage your medicine stock and inventory.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="action-btn primary" onClick={onExport}>Export Inventory</button>
          </div>
        </section>

        <section className="inventory-tab-row">
          <button type="button" className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`} onClick={() => setActiveTab('view')}>View Inventory</button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('add');
              setShowAddModal(true);
            }}
          >
            Add Manually
          </button>
          <button type="button" className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`} onClick={onBulkUploadClick}>Bulk Upload</button>
          <input ref={fileInputRef} className="hidden-input" type="file" accept=".csv" onChange={onFileUpload} />
        </section>

        <section className="panel inventory-filter-panel">
          <div className="inventory-filters-top">
            <input
              className="filter-input"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name, batch, or manufacturer..."
            />
            <select
              className="filter-select"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div className="inventory-filters-bottom">
            <label className="filter-label" htmlFor="sortBySelect">Sort by:</label>
            <select id="sortBySelect" className="sort-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
              <option value="expiry">Expiry</option>
            </select>
            <button type="button" className="icon-btn" onClick={() => setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
              {sortDir === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </section>

        <section className="panel inventory-table-panel">
          <div className="table-headline">
            <h2>Current Inventory ({sortedRows.length} items)</h2>
            <label className="show-select-wrap" htmlFor="pageSizeSelect">
              Show:
              <select
                id="pageSizeSelect"
                className="show-select"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>

          <div className="table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" checked={allCurrentSelected} onChange={onToggleSelectAll} />
                  </th>
                  <th>Medicine</th>
                  <th>Category</th>
                  <th>Batch</th>
                  <th>Manufacturer</th>
                  <th>Expiry</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((item) => {
                  const itemStatus = statusFromStock(item.stock);
                  return (
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => onToggleRow(item.id)} />
                      </td>
                      <td>{item.name}</td>
                      <td><span className="mini-tag">{item.category}</span></td>
                      <td>{item.batch}</td>
                      <td>{item.manufacturer}</td>
                      <td>{formatDate(item.expiry)}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.stock} units</td>
                      <td><span className={statusClass(itemStatus)}>{itemStatus}</span></td>
                      <td>
                        <div className="row-actions">
                          <button type="button" className="icon-btn small" onClick={() => onRowAction('edit', item)}>Edit</button>
                          <button type="button" className="icon-btn small danger" onClick={() => onRowAction('delete', item)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!paginatedRows.length ? (
                  <tr>
                    <td colSpan={10} className="empty-row">No inventory item found with the current filters.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, sortedRows.length)} of {sortedRows.length} entries
            </span>
            <div className="pagination-controls">
              <button type="button" className="page-btn" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1}>‹</button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={`page-btn ${page === pageNumber ? 'active' : ''}`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              <button type="button" className="page-btn" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} disabled={page === totalPages}>›</button>
            </div>
          </div>
        </section>
      </main>

      {showAddModal ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowAddModal(false)}>
          <section className="modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <h2>Add Medicine</h2>
            <form className="add-form" onSubmit={onAddMedicine}>
              <input
                placeholder="Medicine Name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              />
              <select
                value={formData.category}
                onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
              >
                <option>Tablets</option>
                <option>Capsules</option>
                <option>Syrups</option>
                <option>Injections</option>
                <option>Supplements</option>
              </select>
              <input
                placeholder="Batch"
                value={formData.batch}
                onChange={(event) => setFormData((prev) => ({ ...prev, batch: event.target.value }))}
              />
              <input
                placeholder="Manufacturer"
                value={formData.manufacturer}
                onChange={(event) => setFormData((prev) => ({ ...prev, manufacturer: event.target.value }))}
              />
              <input
                type="date"
                value={formData.expiry}
                onChange={(event) => setFormData((prev) => ({ ...prev, expiry: event.target.value }))}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(event) => setFormData((prev) => ({ ...prev, price: event.target.value }))}
              />
              <input
                type="number"
                min="0"
                placeholder="Stock"
                value={formData.stock}
                onChange={(event) => setFormData((prev) => ({ ...prev, stock: event.target.value }))}
              />
              <div className="modal-actions">
                <button type="button" className="action-btn secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="action-btn primary">Save</button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  );
}
