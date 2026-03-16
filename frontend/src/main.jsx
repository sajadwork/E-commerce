import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { SettingsProvider } from './context/SettingsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <SettingsProvider>
                <CartProvider>
                    <WishlistProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </WishlistProvider>
                </CartProvider>
            </SettingsProvider>
        </AuthProvider>
    </React.StrictMode>,
)
