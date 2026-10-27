import React from 'react';
import '../styles/Header.css';

export default function Header({ manager }) {
  const today = new Date(2025, 9, 27);
  const dateStr = today.toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
            <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
              fill="white"/>
          </svg>
        </div>
        <div>
          <h1 className="header-title">AeroSales CRM</h1>
          <p className="header-subtitle">Panel de Control · Ventas & Pipeline</p>
        </div>
      </div>

      <div className="header-center">
        <div className="header-date-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>{dateStr}</span>
        </div>
      </div>

      <div className="header-user">
        <div className="header-user-info">
          <p className="header-user-name">{manager?.full_name ?? 'Manager'}</p>
          <p className="header-user-role">Sales Manager</p>
        </div>
        <div className="header-avatar-wrapper">
          <img
            src={manager?.avatar_url}
            alt={manager?.full_name}
            className="header-avatar"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(manager?.full_name ?? 'M')}&background=F97316&color=fff`; }}
          />
          <span className="header-avatar-dot" />
        </div>
      </div>
    </header>
  );
}
