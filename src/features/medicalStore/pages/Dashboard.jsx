import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Download,
  Eye,
  Grid2X2,
  LifeBuoy,
  Package,
  Search,
  Settings,
  AlertTriangle,
  ShoppingCart,
  ShieldAlert,
  ShoppingBag,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react';

const stats = [
  { title: 'Total Medicines', value: '1,248', trend: '+12.5%', note: '+156 this month', icon: Package, iconTone: 'sky' },
  { title: 'Low Stock', value: '23', trend: '-5.2%', note: 'Needs restocking', icon: ShieldAlert, iconTone: 'sand' },
  { title: 'Expiring Soon', value: '15', trend: '+3.1%', note: 'Within 30 days', icon: Calendar, iconTone: 'rose' },
  { title: 'Monthly Revenue', value: '$45,320', trend: '+18.2%', note: 'vs $38,400 last month', icon: Wallet, iconTone: 'mint' },
];

const categories = [
  { name: 'Tablets', value: 485 },
  { name: 'Capsules', value: 312 },
  { name: 'Syrups', value: 198 },
  { name: 'Injections', value: 143 },
  { name: 'Others', value: 110 },
];

const topSelling = [
  { rank: 1, name: 'Paracetamol 500mg', sold: 487, amount: '$2918', trend: '+12%' },
  { rank: 2, name: 'Amoxicillin 250mg', sold: 356, amount: '$4450', trend: '+8%' },
  { rank: 3, name: 'Vitamin D3 1000IU', sold: 298, amount: '$5660', trend: '+24%' },
  { rank: 4, name: 'Metformin 500mg', sold: 267, amount: '$4005', trend: '+15%' },
  { rank: 5, name: 'Ibuprofen 400mg', sold: 234, amount: '$2048', trend: '-3%' },
];

const activityFeed = [
  { name: 'Paracetamol 500mg', batch: 'BT001', action: 'Added', user: 'John Doe', time: '2 hours ago', tone: 'info' },
  { name: 'Amoxicillin 250mg', batch: 'BT045', action: 'Updated', user: 'Sarah Smith', time: '4 hours ago', tone: 'info' },
  { name: 'Ibuprofen 400mg', batch: 'BT089', action: 'Low Stock Alert', user: 'System', time: '5 hours ago', tone: 'warn' },
  { name: 'Aspirin 75mg', batch: 'BT102', action: 'Added', user: 'Mike Johnson', time: '1 day ago', tone: 'info' },
  { name: 'Metformin 500mg', batch: 'BT067', action: 'Expiring Soon', user: 'System', time: '1 day ago', tone: 'warn' },
];

const lowStockItems = [
  { name: 'Vitamin D3', batch: 'VT456', severity: 'critical', current: 12, minStock: 50 },
  { name: 'Calcium Tablets', batch: 'CA789', severity: 'critical', current: 8, minStock: 30 },
  { name: 'Iron Supplements', batch: 'IR234', severity: 'high', current: 15, minStock: 40 },
  { name: 'Multivitamin', batch: 'MV901', severity: 'medium', current: 20, minStock: 60 },
];

const revenueData = [
  { month: 'Jan', revenue: 32500 },
  { month: 'Feb', revenue: 35800 },
  { month: 'Mar', revenue: 37900 },
  { month: 'Apr', revenue: 39200 },
  { month: 'May', revenue: 42300 },
  { month: 'Jun', revenue: 45320 },
];

export default function Dashboard() {
  const [activeMonthIndex, setActiveMonthIndex] = useState(1);
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();

  const setTemporaryNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 2200);
  };

  const chart = useMemo(() => {
    const width = 800;
    const height = 300;
    const padLeft = 42;
    const padRight = 20;
    const padTop = 18;
    const padBottom = 40;
    const yMax = 60000;
    const yMin = 0;
    const yTicks = [0, 15000, 30000, 45000, 60000];

    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    const points = revenueData.map((item, index) => {
      const x = padLeft + (index / (revenueData.length - 1)) * plotWidth;
      const y = padTop + (1 - (item.revenue - yMin) / (yMax - yMin)) * plotHeight;
      return { ...item, x, y };
    });

    const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padBottom} L ${points[0].x} ${height - padBottom} Z`;

    return {
      width,
      height,
      padLeft,
      padRight,
      padTop,
      padBottom,
      yTicks,
      points,
      linePath,
      areaPath,
    };
  }, []);

  const activePoint = activeMonthIndex === null ? null : chart.points[activeMonthIndex];

  const onExportReport = () => {
    const rows = [
      ['Metric', 'Value'],
      ...stats.map((item) => [item.title, item.value]),
      ['Top Category', categories[0].name],
      ['Current Revenue', revenueData[revenueData.length - 1].revenue],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dashboard-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTemporaryNotice('Dashboard report exported.');
  };

  const onViewAnalytics = () => {
    const chartNode = document.getElementById('revenue-trend-section');
    chartNode?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTemporaryNotice('Opened analytics section.');
  };

  const onReorderAll = () => {
    navigate('/inventory');
    setTemporaryNotice('Redirecting to inventory for reorder.');
  };

  return (
    <div className="dashboard-page">
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
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/dashboard"><span className="nav-label"><Grid2X2 size={18} />Dashboard</span></NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/inventory">
            <span className="nav-label"><Package size={18} />Inventory</span>
            <span className="pill-count">23</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/store-setup"><span className="nav-label"><Settings size={18} />Store Setup</span></NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/orders"><span className="nav-label"><ShoppingCart size={18} />Orders</span></NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/taxes"><span className="nav-label"><Wallet size={18} />Tax Settings</span></NavLink>
        </nav>

        <div className="sidebar-section">Quick Actions</div>
        <div className="quick-links">
          <button className="quick-link" type="button" onClick={() => navigate('/inventory')}><Search className="quick-link-icon" size={16} />Search Medicines</button>
          <button className="quick-link" type="button" onClick={() => navigate('/store-setup')}><Settings className="quick-link-icon" size={16} />Settings</button>
          <button className="quick-link" type="button" onClick={() => setTemporaryNotice('Support ticket drafted from dashboard.')}><LifeBuoy className="quick-link-icon" size={16} />Help & Support</button>
        </div>

        <button className="help-card" type="button" onClick={() => navigate('/')}>Switch Store</button>
      </aside>

      <main className="dashboard-main">
        {notice ? <div className="toast-msg">{notice}</div> : null}

        <header className="topbar">
          <div className="search-field">
            <Search size={18} className="search-leading-icon" />
            <input className="search-input" placeholder="Search medicines, batches..." />
          </div>
          <div className="topbar-actions">
            <button type="button" className="bell-btn" aria-label="notifications">
              <Bell size={22} />
              <span className="bell-dot" />
            </button>
            <div className="topbar-user">
              <span className="user-avatar"><User size={22} /></span>
              <div>
                <span className="user-name">Admin User</span>
                <span className="user-email">admin@medstore.com</span>
              </div>
            </div>
          </div>
        </header>

        <section className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Good to see you again. Here is a clear snapshot of your store today.</p>
          </div>
          <div className="header-actions">
            <button type="button" className="action-btn secondary" onClick={onExportReport}><Download size={18} />Export Report</button>
            <button type="button" className="action-btn primary" onClick={onViewAnalytics}><Eye size={18} />View Analytics</button>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => (
            <article key={item.title} className="stat-card">
              <div>
                <div className="stat-title">{item.title}</div>
                <div className="stat-value">{item.value}</div>
                <div className="stat-trend">{item.trend}</div>
                <div className="stat-note">{item.note}</div>
              </div>
              <div className={`stat-icon ${item.iconTone}`}><item.icon size={32} /></div>
            </article>
          ))}
        </section>

        <section className="charts-row" id="revenue-trend-section">
          <article className="panel trend-panel">
            <div className="panel-header">
              <h2><TrendingUp size={18} />Revenue Trend</h2>
              <span className="badge">+18.2% Growth</span>
            </div>
            <div className="trend-chart-wrap" onMouseLeave={() => setActiveMonthIndex(null)}>
              <svg className="trend-graph" viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label="Revenue trend">
                {chart.yTicks.map((tick) => {
                  const y = chart.padTop + (1 - tick / 60000) * (chart.height - chart.padTop - chart.padBottom);
                  return (
                    <g key={tick}>
                      <line className="chart-grid-line" x1={chart.padLeft} y1={y} x2={chart.width - chart.padRight} y2={y} />
                      <text className="chart-y-label" x={chart.padLeft - 8} y={y + 4}>{tick}</text>
                    </g>
                  );
                })}

                {chart.points.map((point) => (
                  <line
                    key={`${point.month}-grid`}
                    className="chart-grid-line vertical"
                    x1={point.x}
                    y1={chart.padTop}
                    x2={point.x}
                    y2={chart.height - chart.padBottom}
                  />
                ))}

                <path d={chart.areaPath} className="trend-area" />
                <path d={chart.linePath} className="trend-line" />

                {activePoint ? (
                  <line
                    className="chart-guide-line"
                    x1={activePoint.x}
                    y1={chart.padTop}
                    x2={activePoint.x}
                    y2={chart.height - chart.padBottom}
                  />
                ) : null}

                {chart.points.map((point, index) => (
                  <g key={point.month}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={activeMonthIndex === index ? 5 : 3}
                      className={`trend-dot ${activeMonthIndex === index ? 'active' : ''}`}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="18"
                      className="trend-hover-target"
                      onMouseEnter={() => setActiveMonthIndex(index)}
                      onFocus={() => setActiveMonthIndex(index)}
                    />
                  </g>
                ))}

                {chart.points.map((point) => (
                  <text key={`${point.month}-label`} className="chart-x-label" x={point.x} y={chart.height - 12}>{point.month}</text>
                ))}
              </svg>

              {activePoint ? (
                <div
                  className="trend-tooltip"
                  style={{
                    left: `${(activePoint.x / chart.width) * 100}%`,
                    top: `${(activePoint.y / chart.height) * 100}%`,
                  }}
                >
                  <div className="tooltip-month">{activePoint.month}</div>
                  <div className="tooltip-value">revenue : {activePoint.revenue}</div>
                </div>
              ) : null}
            </div>
          </article>

          <article className="panel category-panel">
            <div className="panel-header">
              <h2><Package size={18} />By Category</h2>
            </div>
            <div className="donut-chart" aria-hidden="true" />
            <ul className="category-list">
              {categories.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="insights-row">
          <article className="panel insights-panel">
            <div className="panel-header">
              <h2>Top Selling</h2>
            </div>
            <div className="insights-body">
              {topSelling.map((item) => (
                <div key={item.rank} className="selling-row">
                  <div className="selling-rank">{item.rank}</div>
                  <div className="selling-main">
                    <div className="selling-name">{item.name}</div>
                    <div className="selling-meta">{item.sold} sold - <strong>{item.amount}</strong></div>
                  </div>
                  <span className={`trend-chip ${item.trend.startsWith('-') ? 'loss' : 'gain'}`}>{item.trend}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel insights-panel">
            <div className="panel-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="insights-body">
              {activityFeed.map((item) => (
                <div key={`${item.batch}-${item.time}`} className="activity-row">
                  <div>
                    <div className="activity-name">{item.name}</div>
                    <div className="activity-meta">
                      Batch: <strong>{item.batch}</strong>
                      <span className={`activity-pill ${item.tone === 'warn' ? 'warn' : ''}`}>{item.action}</span>
                      <span className="activity-user">{item.user}</span>
                    </div>
                  </div>
                  <div className="activity-time">{item.time}</div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="panel low-stock-panel">
          <div className="panel-header">
            <h2>
              <AlertTriangle size={18} />
              Low Stock Alert
              <span className="alert-count">{lowStockItems.length} Items</span>
            </h2>
            <div className="low-stock-actions">
              <button type="button" className="action-btn secondary" onClick={onReorderAll}><ShoppingCart size={16} />Reorder All</button>
            </div>
          </div>
          <div className="low-stock-grid">
            {lowStockItems.map((item) => (
              <article key={item.name} className="low-stock-card">
                <div className="low-stock-card-head">
                  <div>
                    <div className="low-stock-name">{item.name}</div>
                    <div className="low-stock-batch">Batch: {item.batch}</div>
                  </div>
                  <span className={`severity-pill ${item.severity}`}>{item.severity}</span>
                </div>

                <div className="stock-metric-row">
                  <span>Current</span>
                  <strong>{item.current} units</strong>
                </div>
                <div className="stock-progress-track">
                  <div
                    className={`stock-progress-fill ${item.severity}`}
                    style={{ width: `${Math.max(8, Math.min(100, (item.current / item.minStock) * 100))}%` }}
                  />
                </div>
                <div className="stock-metric-row subdued">
                  <span>Min stock</span>
                  <span>{item.minStock} units</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
