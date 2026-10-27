import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import KpiCard from './components/KpiCard';
import RevenueByStageChart from './components/RevenueByStageChart';
import SalesTrendChart from './components/SalesTrendChart';
import TopDealsTable from './components/TopDealsTable';
import PipelineSummary from './components/PipelineSummary';
import AiChat from './components/AiChat';
import { users, stages, clients, deals } from './data/mockData';
import {
  applyFilters,
  getTotalRevenue,
  getActiveDeals,
  getWinRate,
  getAvgDealSize,
  getRevenueByStage,
  getSalesTrend,
  getTopDeals,
  getPipelineByStage,
  getRevenueLastMonth,
  formatCurrency,
} from './utils/calculations';

// El manager es el usuario con role === 'manager'
const manager = users.find((u) => u.role === 'manager');

function getChangePct(current, previous) {
  if (!previous) return null;
  const pct = ((current - previous) / previous) * 100;
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
}

export default function App() {
  const [filters, setFilters] = useState({ agentId: 'all', dateRange: '6' });

  // Deals filtrados (reactivo a los controles)
  const filteredDeals = useMemo(() => applyFilters(deals, filters), [filters]);

  // KPIs calculados dinámicamente
  const totalRevenue = useMemo(() => getTotalRevenue(filteredDeals), [filteredDeals]);
  const activeDeals = useMemo(() => getActiveDeals(filteredDeals), [filteredDeals]);
  const winRate = useMemo(() => getWinRate(filteredDeals), [filteredDeals]);
  const avgDealSize = useMemo(() => getAvgDealSize(filteredDeals), [filteredDeals]);
  const revenueLastMo = useMemo(() => getRevenueLastMonth(filteredDeals), [filteredDeals]);

  // Comparativa Revenue vs mes anterior
  const revChangePct = getChangePct(totalRevenue, revenueLastMo);
  const revTrend = totalRevenue >= revenueLastMo ? 'up' : 'down';

  // Datos para gráficas
  const revenueByStage = useMemo(() => getRevenueByStage(filteredDeals, stages), [filteredDeals]);
  const salesTrend = useMemo(() => getSalesTrend(filteredDeals), [filteredDeals]);
  const topDeals = useMemo(() => getTopDeals(filteredDeals, 10), [filteredDeals]);
  const pipelineData = useMemo(() => getPipelineByStage(filteredDeals, stages), [filteredDeals]);

  return (
    <div className="app">
      <Header manager={manager} />

      <main className="dashboard-wrapper">
        {/* Filtros */}
        <FilterBar users={users} filters={filters} onFilterChange={setFilters} />

        {/* KPIs */}
        <section className="kpi-row" aria-label="Indicadores clave">
          <KpiCard
            id="kpi-revenue"
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change={revChangePct}
            trend={revTrend}
            accent="orange"
            delay={0}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V18M9 9.5C9 8.12 10.34 7 12 7C13.66 7 15 8.12 15 9.5C15 10.88 13.66 12 12 12C10.34 12 9 13.12 9 14.5C9 15.88 10.34 17 12 17C13.66 17 15 15.88 15 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <KpiCard
            id="kpi-active-deals"
            title="Active Deals"
            value={activeDeals}
            change={null}
            trend="neutral"
            accent="blue"
            delay={80}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 5.55228 9.44772 6 10 6H14C14.5523 6 15 5.55228 15 5M9 5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 12H15M9 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <KpiCard
            id="kpi-win-rate"
            title="Win Rate"
            value={`${winRate}%`}
            change={winRate >= 50 ? '+5pp' : '-3pp'}
            trend={winRate >= 50 ? 'up' : 'down'}
            accent="green"
            delay={160}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" />
                <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <KpiCard
            id="kpi-avg-deal"
            title="Avg Deal Size"
            value={formatCurrency(avgDealSize)}
            change="-2.1%"
            trend="down"
            accent="purple"
            delay={240}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </section>

        {/* Gráficas */}
        <section className="charts-row" aria-label="Gráficas de rendimiento">
          <RevenueByStageChart data={revenueByStage} />
          <SalesTrendChart data={salesTrend} />
        </section>

        {/* Tabla + Pipeline */}
        <section className="bottom-row" aria-label="Deals y pipeline">
          <TopDealsTable deals={topDeals} clients={clients} users={users} />
          <PipelineSummary data={pipelineData} />
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© 2025 AeroSales CRM · Datos simulados · Lab 3 FSI</p>
      </footer>
      <AiChat />
    </div>
  );
}
