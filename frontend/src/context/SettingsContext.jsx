import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const defaultSettings = {
        storeName: "Stuffus Store",
        supportEmail: "support@stuffus.com",
        currency: "USD",
        language: "en",
        maintenanceMode: false,
        notifications: true
    };

    const [settings, setSettings] = useState(() => {
        const storedSettings = localStorage.getItem('storeSettings');
        return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('storeSettings', JSON.stringify(settings));
        
        // Handle language change (simplified for now)
        document.documentElement.lang = settings.language;
    }, [settings]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
