import {
  Bell,
  Calendar,
  Download,
  Eye,
  Search,
  AlertTriangle,
  ShoppingCart,
  ShieldAlert,
  TrendingUp,
  User,
  Package,
  Wallet,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../../auth/store/authStore';
import { fetchMyStore, fetchDashboardStats } from '../api/medicalStoreApi';
import { useEffect } from 'react';
import { useState, useMemo } from 'react';

const stats = [
  { title: 'Total Medicines', value: '0', trend: '0%', note: 'No data this month', icon: Package, iconTone: 'sky' },
  { title: 'Low Stock', value: '0', trend: '0%', note: 'No data', icon: ShieldAlert, iconTone: 'sand' },
  { title: 'Expiring Soon', value: '0', trend: '0%', note: 'No data', icon: Calendar, iconTone: 'rose' },
  { title: 'Monthly Revenue', value: '₹0', trend: '0%', note: 'vs ₹0 last month', icon: Wallet, iconTone: 'mint' },
];

const categories = [];

const topSelling = [];

const activityFeed = [];

const lowStockItems = [];

const revenueData = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeMonthIndex, setActiveMonthIndex] = useState(1);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: [
      { title: 'Total Medicines', value: '0', trend: '0%', note: 'No data this month', icon: Package, iconTone: 'sky' },
      { title: 'Low Stock', value: '0', trend: '0%', note: 'No data', icon: ShieldAlert, iconTone: 'sand' },
      { title: 'Expiring Soon', value: '0', trend: '0%', note: 'No data', icon: Calendar, iconTone: 'rose' },
      { title: 'Monthly Revenue', value: '₹0', trend: '0%', note: 'vs ₹0 last month', icon: Wallet, iconTone: 'mint' },
    ],
    revenueData: [
      { month: 'Jan', revenue: 0 },
      { month: 'Feb', revenue: 0 },
      { month: 'Mar', revenue: 0 },
      { month: 'Apr', revenue: 0 },
      { month: 'May', revenue: 0 },
      { month: 'Jun', revenue: 0 },
    ]
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      if (user?.email) {
        try {
          const storeRes = await fetchMyStore(user.email);
          if (storeRes.success && storeRes.data) {
            setStore(storeRes.data);
            const statsRes = await fetchDashboardStats(storeRes.data.id);
            if (statsRes.success) {
              const s = statsRes.data;
              setDashboardData({
                stats: [
                  { title: 'Total Medicines', value: String(s.totalMedicines || 0), trend: '0%', note: 'Active inventory', icon: Package, iconTone: 'sky' },
                  { title: 'Low Stock', value: String(s.lowStockCount || 0), trend: '0%', note: 'Needs attention', icon: ShieldAlert, iconTone: 'sand' },
                  { title: 'Expiring Soon', value: String(s.expiringSoonCount || 0), trend: '0%', note: 'Check batches', icon: Calendar, iconTone: 'rose' },
                  { title: 'Monthly Revenue', value: `₹${(s.monthlyRevenue || 0).toLocaleString()}`, trend: '0%', note: 'Current month', icon: Wallet, iconTone: 'mint' },
                ],
                revenueData: s.revenueTrend || dashboardData.revenueData
              });
            }
          }
        } catch (error) {
          console.error('Error loading dashboard:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadDashboardData();
  }, [user]);

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

    const points = dashboardData.revenueData.map((item, index) => {
      const x = padLeft + (index / (dashboardData.revenueData.length - 1)) * plotWidth;
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
  }, [dashboardData.revenueData]);

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
    navigate('/store/inventory');
    setTemporaryNotice('Redirecting to inventory for reorder.');
  };

  return (
    <div className="dashboard-page">
      <Sidebar setNotice={setTemporaryNotice} />

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
                <span className="user-name">{user?.name || 'Admin User'}</span>
                <span className="user-email">{user?.email || 'admin@medstore.com'}</span>
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
          {dashboardData.stats.map((item) => (
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
