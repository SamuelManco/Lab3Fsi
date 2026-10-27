import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { formatCurrency } from '../utils/calculations';
import '../styles/Charts.css';

const COLORS = {
  'Prospect':    '#8B5CF6',
  'Lead':        '#3B82F6',
  'Negotiation': '#F97316',
  'Closed Won':  '#22C55E',
  'Closed Lost': '#EF4444',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p className="chart-tooltip-value">{formatCurrency(payload[0].value)}</p>
      {payload[0].payload.count > 0 && (
        <p className="chart-tooltip-sub">{payload[0].payload.count} deal(s)</p>
      )}
    </div>
  );
};

export default function RevenueByStageChart({ data }) {
  const hasData = data.some((d) => d.revenue > 0);

  return (
    <div className="card chart-card">
      <div className="card-header">
        <div>
          <p className="card-title">Ingresos por Etapa</p>
          <p className="chart-card-subtitle">Deals ganados agrupados por etapa del pipeline</p>
        </div>
        <div className="chart-legend">
          {data.map((d) => (
            d.revenue > 0 && (
              <span key={d.name} className="legend-item">
                <span className="legend-dot" style={{ background: COLORS[d.name] ?? '#9CA3AF' }} />
                {d.name}
              </span>
            )
          ))}
        </div>
      </div>
      <div className="card-body chart-body">
        {hasData ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatCurrency(v)}
                tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(249,115,22,0.05)' }} />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]} maxBarSize={60}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] ?? '#9CA3AF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">
            <p>Sin datos para el filtro seleccionado</p>
          </div>
        )}
      </div>
    </div>
  );
}
