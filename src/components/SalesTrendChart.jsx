import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/calculations';
import '../styles/Charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p className="chart-tooltip-value">{formatCurrency(payload[0].value)}</p>
      <p className="chart-tooltip-sub">{payload[0].payload.deals} deal(s) cerrado(s)</p>
    </div>
  );
};

export default function SalesTrendChart({ data }) {
  const hasData = data.some((d) => d.revenue > 0);

  return (
    <div className="card chart-card">
      <div className="card-header">
        <div>
          <p className="card-title">Tendencia de Ventas</p>
          <p className="chart-card-subtitle">Ingresos por mes (deals cerrados ganados)</p>
        </div>
        <div className="trend-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M22 12L18 8L13 13L9 9L2 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Últimos 6 meses
        </div>
      </div>
      <div className="card-body chart-body">
        {hasData ? (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#F97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--accent-orange)', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--accent-orange)"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={{ r: 5, fill: 'var(--accent-orange)', strokeWidth: 2, stroke: 'white' }}
                activeDot={{ r: 7, fill: 'var(--accent-orange)', strokeWidth: 2, stroke: 'white' }}
              />
            </AreaChart>
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
