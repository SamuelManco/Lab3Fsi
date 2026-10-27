import React from 'react';
import { formatCurrency } from '../utils/calculations';
import '../styles/TopDealsTable.css';

const STATUS_LABEL = {
  won:  'Ganado',
  open: 'Activo',
  lost: 'Perdido',
};

const STAGE_LABEL = {
  s1: 'Prospect',
  s2: 'Lead',
  s3: 'Negotiation',
  s4: 'Closed Won',
  s5: 'Closed Lost',
};

export default function TopDealsTable({ deals, clients, users }) {
  const clientMap  = Object.fromEntries(clients.map((c) => [c.id, c]));
  const userMap    = Object.fromEntries(users.map((u) => [u.id, u]));

  const sorted = [...deals]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <p className="card-title">Top Deals Recientes</p>
          <p className="table-subtitle">Últimas 10 oportunidades · ordenadas por fecha</p>
        </div>
        <span className="table-count-badge">{sorted.length} deals</span>
      </div>
      <div className="table-wrapper">
        <table className="deals-table">
          <thead>
            <tr>
              <th>Oportunidad</th>
              <th>Cliente</th>
              <th>Agente</th>
              <th>Etapa</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={6} className="table-empty">No hay deals para los filtros seleccionados</td>
              </tr>
            ) : (
              sorted.map((deal, i) => {
                const client = clientMap[deal.customer_id];
                const agent  = userMap[deal.owner_id];
                return (
                  <tr key={deal.id} className="deals-table-row" style={{ animationDelay: `${i * 40}ms` }}>
                    <td className="deal-title-cell">
                      <div className="deal-title">{deal.title}</div>
                      <div className="deal-date">
                        {new Date(deal.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td>
                      <div className="client-cell">
                        <div className="client-avatar">
                          {client?.company_name?.[0] ?? '?'}
                        </div>
                        <span className="client-name">{client?.company_name ?? '—'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="agent-cell">
                        <img
                          src={agent?.avatar_url}
                          alt={agent?.full_name}
                          className="agent-avatar"
                          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent?.full_name ?? 'A')}&size=32&background=E5E7EB&color=4B5563`; }}
                        />
                        <span>{agent?.full_name?.split(' ')[0] ?? '—'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${deal.stage_id === 's1' ? 'prospect' : deal.stage_id === 's2' ? 'lead' : deal.stage_id === 's3' ? 'negotiation' : ''}`}>
                        {STAGE_LABEL[deal.stage_id] ?? '—'}
                      </span>
                    </td>
                    <td className="deal-amount">{formatCurrency(deal.amount)}</td>
                    <td>
                      <span className={`badge badge-${deal.status}`}>
                        {STATUS_LABEL[deal.status]}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
