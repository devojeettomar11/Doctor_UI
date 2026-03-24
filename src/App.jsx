import React from 'react';
import AppRoutes from './routes/appRoutes';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
}

export default App;
