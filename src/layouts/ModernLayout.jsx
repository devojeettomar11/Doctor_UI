import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Layout = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
      <Header />

      <main className="grow pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
