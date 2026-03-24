import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
