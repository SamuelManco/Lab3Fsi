import React from 'react';
import '../styles/KpiCard.css';

const accentMap = {
  orange: {
    bg: 'var(--accent-orange-lt)',
    color: 'var(--accent-orange)',
    shadow: 'var(--shadow-orange)',
    gradient: 'linear-gradient(135deg, #F97316, #EA6500)',
  },
  green: {
    bg: 'var(--accent-green-lt)',
    color: 'var(--accent-green)',
    shadow: 'var(--shadow-green)',
    gradient: 'linear-gradient(135deg, #22C55E, #16A34A)',
  },
  blue: {
    bg: 'var(--accent-blue-lt)',
    color: 'var(--accent-blue)',
    shadow: 'var(--shadow-blue)',
    gradient: 'linear-gradient(135deg, #3B82F6, #2563EB)',
  },
  purple: {
    bg: 'var(--accent-purple-lt)',
    color: 'var(--accent-purple)',
    shadow: '0 4px 20px rgba(139,92,246,0.22)',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
  },
};

export default function KpiCard({ title, value, change, trend, accent = 'orange', icon, delay = 0 }) {
  const colors = accentMap[accent] || accentMap.orange;
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <div
      className="kpi-card card animate-fade-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="kpi-card-header">
        <div className="kpi-icon-wrapper" style={{ background: colors.bg }}>
          <span style={{ color: colors.color }}>{icon}</span>
        </div>
        {change && (
          <div className={`kpi-badge ${isPositive ? 'kpi-badge--up' : isNegative ? 'kpi-badge--down' : 'kpi-badge--neutral'}`}>
            {isPositive && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )}
            {isNegative && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )}
            {change}
          </div>
        )}
      </div>

      <div className="kpi-card-body">
        <p className="kpi-title">{title}</p>
        <p className="kpi-value">{value}</p>
      </div>

      <div
        className="kpi-accent-bar"
        style={{ background: colors.gradient }}
      />
    </div>
  );
}
