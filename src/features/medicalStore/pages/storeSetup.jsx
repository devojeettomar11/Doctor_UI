import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, ShieldCheck, Upload } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import useAuthStore from '../../auth/store/authStore';
import { fetchMyStore, setupStore } from '../api/medicalStoreApi';

export default function StoreSetupPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { user } = useAuthStore();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [notice, setNotice] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const [locationForm, setLocationForm] = useState({
    storeName: '',
    ownerName: '',
    city: '',
    address: '',
    pinCode: '',
    location: null, // { type: 'Point', coordinates: [lng, lat] }
  });

  const [adminForm, setAdminForm] = useState({
    adminEmail: '',
    phone: '',
    otp: '',
    otpSent: false,
    verified: false,
  });

  const [storeForm, setStoreForm] = useState({
    openTime: '09:00',
    closeTime: '21:00',
    acceptsOnlineOrders: true,
  });

  useEffect(() => {
    const loadStore = async () => {
      if (user?.email) {
        try {
          const response = await fetchMyStore(user.email);
          if (response.success && response.data) {
            const store = response.data;
            setLocationForm({
              storeName: store.name || '',
              ownerName: store.ownerName || '',
              city: store.city || '',
              address: store.address || '',
              pinCode: store.pinCode || '',
              location: store.location || null,
            });
            setAdminForm((prev) => ({
              ...prev,
              adminEmail: store.adminEmail || user.email,
              phone: store.contactNumber || '',
              verified: store.isVerified || false,
            }));
            setStoreForm({
              openTime: store.openTime || '09:00',
              closeTime: store.closeTime || '21:00',
              acceptsOnlineOrders: store.acceptsOnlineOrders !== undefined ? store.acceptsOnlineOrders : true,
            });
            if (store.status === 'active') {
              setIsSetupCompleted(true);
              setActiveStep(4);
            } else if (store.isVerified) {
              setActiveStep(4);
            } else if (store.name) {
              setActiveStep(3);
            }
          } else {
             // If no store found, pre-fill from user info
             setAdminForm(prev => ({ ...prev, adminEmail: user.email }));
          }
        } catch (error) {
          console.error('Error fetching store:', error);
          setAdminForm(prev => ({ ...prev, adminEmail: user.email }));
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadStore();
  }, [user]);


  const steps = useMemo(
    () => [
      { id: 1, title: 'Upload License', icon: Upload },
      { id: 2, title: 'Store Location', icon: MapPin },
      { id: 3, title: 'Admin Verification', icon: ShieldCheck },
      { id: 4, title: 'Store Activated', icon: CheckCircle2 },
    ],
    [],
  );

  const progressPercent = useMemo(() => {
    if (isSetupCompleted) return 100;

    let completed = 0;
    if (uploadedFile) completed += 1;
    if (locationForm.storeName && locationForm.ownerName && locationForm.city && locationForm.address && locationForm.pinCode) completed += 1;
    if (adminForm.verified) completed += 1;
    if (activeStep >= 4) completed += 1;
    return Math.floor((completed / 4) * 100);
  }, [isSetupCompleted, uploadedFile, locationForm, adminForm, activeStep]);

  const setTemporaryNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 2500);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setTemporaryNotice('Invalid file type. Upload PDF, JPG or PNG.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setTemporaryNotice('File exceeds 5MB limit.');
      event.target.value = '';
      return;
    }

    setUploadedFile(file);
    setTemporaryNotice('License uploaded successfully.');
  };

  const onDetectLocation = () => {
    if (!navigator.geolocation) {
      setTemporaryNotice('Geolocation is not supported by your browser.');
      return;
    }

    setTemporaryNotice('Detecting location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setLocationForm((prev) => ({
          ...prev,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        }));
        setTemporaryNotice(`Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      },
      (error) => {
        setTemporaryNotice('Unable to retrieve location.');
        console.error('Geolocation error:', error);
      }
    );
  };
  const onContinueFromUpload = () => {
    if (!uploadedFile) {
      setTemporaryNotice('Please upload your store license first.');
      return;
    }

    setActiveStep(2);
    setTemporaryNotice('Step 1 completed. Continue with store location.');
  };

  const onSaveLocation = async () => {
    const { storeName, ownerName, city, address, pinCode } = locationForm;
    if (!storeName || !ownerName || !city || !address || !pinCode) {
      setTemporaryNotice('Please fill all location details.');
      return;
    }

    try {
      const payload = {
        name: storeName,
        address: address,
        city: city,
        pinCode: pinCode,
        ownerName: ownerName,
        adminEmail: adminForm.adminEmail || user.email,
        contactNumber: adminForm.phone || 'N/A',
        licenseNumber: 'TEMP-' + Date.now(),
        location: locationForm.location,
      };

      const response = await setupStore(payload);
      if (response.success) {
        setActiveStep(3);
        setTemporaryNotice('Location saved. Proceed to admin verification.');
      }
    } catch (error) {
      setTemporaryNotice('Error saving location. Please try again.');
      console.error('Save location error:', error);
    }
  };

  const onSendOtp = () => {
    if (!adminForm.adminEmail || !adminForm.phone) {
      setTemporaryNotice('Enter admin email and phone before OTP.');
      return;
    }

    setAdminForm((prev) => ({ ...prev, otpSent: true }));
    setTemporaryNotice('OTP sent successfully. Use 123456 for demo.');
  };

  const onVerifyOtp = async () => {
    if (!adminForm.otpSent) {
      setTemporaryNotice('Send OTP first.');
      return;
    }

    if (adminForm.otp !== '123456') {
      setTemporaryNotice('Invalid OTP. Try 123456.');
      return;
    }

    try {
      const payload = {
        adminEmail: adminForm.adminEmail || user.email,
        isVerified: true,
        contactNumber: adminForm.phone,
      };
      
      const response = await setupStore(payload);
      if (response.success) {
        setAdminForm((prev) => ({ ...prev, verified: true }));
        setActiveStep(4);
        setTemporaryNotice('Admin verification complete.');
      }
    } catch (error) {
      setTemporaryNotice('Error saving verification. Please try again.');
      console.error('Verify OTP error:', error);
    }
  };

  const onSaveStorePreferences = async () => {
    if (!adminForm.verified) {
      setTemporaryNotice('Complete admin verification first.');
      return;
    }

    if (!(locationForm.storeName && locationForm.ownerName && locationForm.city && locationForm.address && locationForm.pinCode)) {
      setActiveStep(2);
      setTemporaryNotice('Store location details are incomplete.');
      return;
    }

    if (!storeForm.openTime || !storeForm.closeTime) {
      setTemporaryNotice('Select opening and closing time.');
      return;
    }

    try {
      const payload = {
        name: locationForm.storeName,
        address: locationForm.address,
        city: locationForm.city,
        pinCode: locationForm.pinCode,
        contactNumber: adminForm.phone,
        ownerName: locationForm.ownerName,
        adminEmail: adminForm.adminEmail,
        licenseNumber: 'TEMP-' + Date.now(),
        openTime: storeForm.openTime,
        closeTime: storeForm.closeTime,
        acceptsOnlineOrders: storeForm.acceptsOnlineOrders,
        location: locationForm.location,
        status: 'active',
        isVerified: true
      };

      const response = await setupStore(payload);
      if (response.success) {
        setIsSetupCompleted(true);
        setTemporaryNotice('Store setup completed and saved successfully.');
      }
    } catch (error) {
      setTemporaryNotice('Error saving store setup. Please try again.');
      console.error('Save error:', error);
    }
  };

  const onResetAll = () => {
    setUploadedFile(null);
    setLocationForm({
      storeName: '',
      ownerName: '',
      city: '',
      address: '',
      pinCode: '',
    });
    setAdminForm({
      adminEmail: '',
      phone: '',
      otp: '',
      otpSent: false,
      verified: false,
    });
    setStoreForm({
      openTime: '09:00',
      closeTime: '21:00',
      acceptsOnlineOrders: true,
    });
    setIsSetupCompleted(false);
    setActiveStep(1);
    setTemporaryNotice('Setup form has been reset.');
  };

  return (
    <div className="dashboard-page inventory-theme">
      <Sidebar setNotice={setTemporaryNotice} />

      <main className="dashboard-main">
        <header className="topbar">
          <input className="search-input" placeholder="Search medicines, batches..." />
          <div className="topbar-user">
            <span className="user-name">Admin User</span>
            <span className="user-email">admin@medstore.com</span>
          </div>
        </header>

        {notice ? <div className="toast-msg">{notice}</div> : null}

        <section className="dashboard-header">
          <div>
            <h1>Store Setup</h1>
            <p>Complete the following steps to activate your store.</p>
          </div>
          <div className="progress-widget">
            <span>Progress</span>
            <strong>{progressPercent}%</strong>
          </div>
        </section>

        <section className="panel setup-progress-panel">
          <div className="setup-progress-bar">
            <div className="setup-progress-track" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="setup-stepper">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`setup-step ${activeStep === step.id ? 'active' : ''} ${progressPercent >= step.id * 25 ? 'done' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <span className="setup-step-index">{step.id}</span>
                <span className="setup-step-title">{step.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="setup-flow">
          <article className={`panel setup-card ${activeStep === 1 ? 'active' : ''}`}>
            <div className="setup-card-marker" aria-hidden="true"><Upload size={24} /></div>
            <div className="setup-card-head">
              <h2>Upload License</h2>
              <p>Upload your pharmacy/medical store license.</p>
            </div>
            <div className="setup-card-body">
              <label htmlFor="licenseUpload">Upload License Document <span>*</span></label>
              <div className="upload-dropzone">
                <button type="button" className="action-btn primary" onClick={() => fileInputRef.current?.click()}>Choose File</button>
                <span>{uploadedFile ? uploadedFile.name : 'No file chosen'}</span>
                <input
                  ref={fileInputRef}
                  id="licenseUpload"
                  className="hidden-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </div>
              <small>Supported formats: PDF, JPG, PNG (Max 5MB)</small>
              <div className="header-actions">
                <button type="button" className="action-btn secondary" onClick={onResetAll}>Reset</button>
                <button type="button" className="action-btn primary" onClick={onContinueFromUpload}>Continue</button>
              </div>
            </div>
          </article>

          <article className={`panel setup-card ${activeStep === 2 ? 'active' : ''}`}>
            <div className="setup-card-marker" aria-hidden="true"><MapPin size={24} /></div>
            <div className="setup-card-head">
              <h2>Store Location</h2>
              <p>Provide your store address and location.</p>
            </div>
            <div className="setup-card-body setup-grid-two">
              <input placeholder="Store Name" value={locationForm.storeName} onChange={(event) => setLocationForm((prev) => ({ ...prev, storeName: event.target.value }))} />
              <input placeholder="Owner Name" value={locationForm.ownerName} onChange={(event) => setLocationForm((prev) => ({ ...prev, ownerName: event.target.value }))} />
              <input placeholder="City" value={locationForm.city} onChange={(event) => setLocationForm((prev) => ({ ...prev, city: event.target.value }))} />
              <input placeholder="Pin Code" value={locationForm.pinCode} onChange={(event) => setLocationForm((prev) => ({ ...prev, pinCode: event.target.value }))} />
              <input className="span-two" placeholder="Store Address" value={locationForm.address} onChange={(event) => setLocationForm((prev) => ({ ...prev, address: event.target.value }))} />
              
              <div className="span-two location-detect-row">
                <button type="button" className="action-btn secondary" onClick={onDetectLocation}>
                  <MapPin size={16} /> Detect My Location
                </button>
                {locationForm.location?.coordinates && (
                  <span className="location-status">
                    Coordinates captured: {locationForm.location.coordinates[1]?.toFixed(4)}, {locationForm.location.coordinates[0]?.toFixed(4)}
                  </span>
                )}
              </div>

              <div className="header-actions span-two">
                <button type="button" className="action-btn secondary" onClick={() => setActiveStep(1)}>Back</button>
                <button type="button" className="action-btn primary" onClick={onSaveLocation}>Save & Continue</button>
              </div>
            </div>
          </article>

          <article className={`panel setup-card ${activeStep === 3 ? 'active' : ''}`}>
            <div className="setup-card-marker" aria-hidden="true"><ShieldCheck size={24} /></div>
            <div className="setup-card-head">
              <h2>Admin Verification</h2>
              <p>Verify admin contact to secure your store account.</p>
            </div>
            <div className="setup-card-body setup-grid-two">
              <input placeholder="Admin Email" value={adminForm.adminEmail} onChange={(event) => setAdminForm((prev) => ({ ...prev, adminEmail: event.target.value }))} />
              <input placeholder="Phone Number" value={adminForm.phone} onChange={(event) => setAdminForm((prev) => ({ ...prev, phone: event.target.value }))} />
              <input className="span-two" placeholder="Enter OTP" value={adminForm.otp} onChange={(event) => setAdminForm((prev) => ({ ...prev, otp: event.target.value }))} />
              <div className="header-actions span-two">
                <button type="button" className="action-btn secondary" onClick={onSendOtp}>Send OTP</button>
                <button type="button" className="action-btn primary" onClick={onVerifyOtp}>Verify OTP</button>
              </div>
              {adminForm.verified ? <p className="verify-success span-two">Admin verified successfully.</p> : null}
            </div>
          </article>

          <article className={`panel setup-card ${activeStep === 4 ? 'active' : ''}`}>
            <div className="setup-card-marker" aria-hidden="true"><CheckCircle2 size={24} /></div>
            <div className="setup-card-head">
              <h2>Store Activated</h2>
              <p>Finalize timings and activate your store.</p>
            </div>
            <div className="setup-card-body setup-grid-two">
              <label htmlFor="openTime">Opening Time</label>
              <label htmlFor="closeTime">Closing Time</label>
              <input id="openTime" type="time" value={storeForm.openTime} onChange={(event) => setStoreForm((prev) => ({ ...prev, openTime: event.target.value }))} />
              <input id="closeTime" type="time" value={storeForm.closeTime} onChange={(event) => setStoreForm((prev) => ({ ...prev, closeTime: event.target.value }))} />
              <label className="setup-checkbox span-two">
                <input
                  type="checkbox"
                  checked={storeForm.acceptsOnlineOrders}
                  onChange={(event) => setStoreForm((prev) => ({ ...prev, acceptsOnlineOrders: event.target.checked }))}
                />
                Accept Online Orders
              </label>
              <div className="header-actions span-two">
                <button type="button" className="action-btn secondary" onClick={() => setActiveStep(3)}>Back</button>
                <button type="button" className="action-btn primary" onClick={onSaveStorePreferences}>Activate Store</button>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
