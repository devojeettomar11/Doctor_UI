import React from 'react';
import { MapPin, Phone, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stores = [
  {
    id: 'andheri',
    name: 'MediGhar Pharmacy - Andheri',
    address: 'Shop 12, Andheri West, Mumbai',
    phone: '9876543210',
  },
  {
    id: 'bandra',
    name: 'MediGhar Pharmacy - Bandra',
    address: 'Shop 5, Bandra East, Mumbai',
    phone: '9876543211',
  },
];

export default function StoreSelectorPage() {
  const navigate = useNavigate();

  const onSelectStore = () => {
    navigate('/store/dashboard');
  };

  return (
    <div className="store-entry-page">
      <section className="store-entry-card">
        <h1>
          Welcome to <span>MediGhar</span>
        </h1>
        <p>Select a store to manage its inventory and orders.</p>

        <div className="store-list">
          {stores.map((store) => (
            <button key={store.id} className="store-item" type="button" onClick={onSelectStore}>
              <div className="store-item-icon">
                <Store size={24} />
              </div>
              <div className="store-item-content">
                <h2>{store.name}</h2>
                <div className="store-meta-row">
                  <span>
                    <MapPin size={14} /> {store.address}
                  </span>
                  <span>
                    <Phone size={14} /> {store.phone}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
