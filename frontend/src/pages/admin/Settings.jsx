import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useSettings } from '../../context/SettingsContext';

const Settings = () => {
  const { settings: globalSettings, updateSettings: saveGlobalSettings } = useSettings();
  const [settings, setSettings] = useState(globalSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Sync local state if global settings change (e.g., from another tab or reset)
  useEffect(() => {
    setSettings(globalSettings);
  }, [globalSettings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Save to context
    saveGlobalSettings(settings);

    // Simulate API call for UI feedback
    setTimeout(() => {
      setIsSaving(false);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default values?')) {
      const defaultSettings = {
        storeName: "Stuffus Store",
        supportEmail: "support@stuffus.com",
        currency: "USD",
        language: "en",
        maintenanceMode: false,
        notifications: true
      };
      setSettings(defaultSettings);
      saveGlobalSettings(defaultSettings);
      setMessage({ type: 'info', text: 'Settings reset to defaults.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="dashboard-container">
          <AdminSidebar />

          <main className="dashboard-main">
            <header className="admin-header-actions">
              <div>
                <h1 className="page-title" style={{ marginBottom: '4px' }}>Store Settings</h1>
                <p style={{ color: 'var(--text-light)' }}>Configure your store's general preferences and localizations.</p>
              </div>
            </header>

            {message && (
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
                backgroundColor: message.type === 'success' ? '#e6fffa' : '#edf2f7',
                color: message.type === 'success' ? '#2c7a7b' : '#4a5568',
                border: `1px solid ${message.type === 'success' ? '#b2f5ea' : '#e2e8f0'}`,
                fontWeight: '600',
                animation: 'fadeIn 0.3s ease'
              }}>
                {message.text}
              </div>
            )}

            <div className="profile-card" style={{ maxWidth: '800px' }}>
              <form className="checkout-form" onSubmit={handleSave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                  <div className="form-group">
                    <label>Store Name</label>
                    <input
                      name="storeName"
                      value={settings.storeName}
                      onChange={handleChange}
                      placeholder="Enter store name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Support Email</label>
                    <input
                      type="email"
                      name="supportEmail"
                      value={settings.supportEmail}
                      onChange={handleChange}
                      placeholder="support@yourstore.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Default Currency</label>
                    <select
                      name="currency"
                      value={settings.currency}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', background: 'var(--light-gray)' }}
                    >
                      <option value="USD">USD ($) - United States Dollar</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="GBP">GBP (£) - British Pound Sterling</option>
                      <option value="JPY">JPY (¥) - Japanese Yen</option>
                      <option value="INR">INR (₹) - Indian Rupee</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Store Language</label>
                    <select
                      name="language"
                      value={settings.language}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', background: 'var(--light-gray)' }}
                    >
                      <option value="en">English (US)</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px' }}>Advanced Settings</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--radius-lg)' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Maintenance Mode</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Disable the frontend for customers during updates.</div>
                      </div>
                      <div style={{ position: 'relative', width: '50px', height: '26px' }}>
                        <input
                          type="checkbox"
                          id="maintenance"
                          name="maintenanceMode"
                          checked={settings.maintenanceMode}
                          onChange={handleChange}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <label htmlFor="maintenance" style={{
                          position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                          backgroundColor: settings.maintenanceMode ? 'var(--accent-color)' : 'var(--border-color)',
                          transition: '.4s', borderRadius: '34px'
                        }}>
                          <span style={{
                            position: 'absolute', content: '""', height: '18px', width: '18px',
                            left: settings.maintenanceMode ? '28px' : '4px', bottom: '4px',
                            backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                          }}></span>
                        </label>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--light-gray)', borderRadius: 'var(--radius-lg)' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Order Notifications</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Receive email alerts for every new order placed.</div>
                      </div>
                      <div style={{ position: 'relative', width: '50px', height: '26px' }}>
                        <input
                          type="checkbox"
                          id="notifications"
                          name="notifications"
                          checked={settings.notifications}
                          onChange={handleChange}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <label htmlFor="notifications" style={{
                          position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                          backgroundColor: settings.notifications ? 'var(--accent-color)' : 'var(--border-color)',
                          transition: '.4s', borderRadius: '34px'
                        }}>
                          <span style={{
                            position: 'absolute', content: '""', height: '18px', width: '18px',
                            left: settings.notifications ? '28px' : '4px', bottom: '4px',
                            backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                          }}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    type="submit"
                    className="btn-buy-now-large"
                    style={{ width: 'auto', minWidth: '200px' }}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="btn-add-cart"
                    onClick={handleReset}
                    style={{ backgroundColor: 'var(--light-gray)', color: 'var(--text-color)', border: 'none' }}
                  >
                    Reset Defaults
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
