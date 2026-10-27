import React from 'react';
import '../styles/FilterBar.css';

export default function FilterBar({ users, filters, onFilterChange }) {
  const agents = users.filter((u) => u.status === 'active');

  return (
    <div className="filterbar">
      <div className="filterbar-left">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="filterbar-icon">
          <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="filterbar-label">Filtros</span>
      </div>

      <div className="filterbar-controls">
        {/* Agente */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-agent">Agente</label>
          <select
            id="filter-agent"
            className="filter-select"
            value={filters.agentId}
            onChange={(e) => onFilterChange({ ...filters, agentId: e.target.value })}
          >
            <option value="all">Todos los Agentes</option>
            {agents.map((u) => (
              <option key={u.id} value={u.id}>{u.full_name}</option>
            ))}
          </select>
        </div>

        {/* Rango de Fecha */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="filter-date">Período</label>
          <select
            id="filter-date"
            className="filter-select"
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
          >
            <option value="1">Último mes</option>
            <option value="3">Últimos 3 meses</option>
            <option value="6">Últimos 6 meses</option>
            <option value="all">Todo el período</option>
          </select>
        </div>

        {/* Reset */}
        {(filters.agentId !== 'all' || filters.dateRange !== '6') && (
          <button
            className="filter-reset-btn"
            onClick={() => onFilterChange({ agentId: 'all', dateRange: '6' })}
            title="Restablecer filtros"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 12C3 7.03 7.03 3 12 3C14.83 3 17.35 4.27 19.07 6.27M21 12C21 16.97 16.97 21 12 21C9.17 21 6.65 19.73 4.93 17.73" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 2V7H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 22V17H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Restablecer
          </button>
        )}
      </div>

      <div className="filterbar-right">
        <div className="filterbar-pulse" />
        <span className="filterbar-live">En vivo</span>
      </div>
    </div>
  );
}
