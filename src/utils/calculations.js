// ============================================================
// calculations.js — Funciones puras de KPI para el Dashboard
// Reciben el array de deals FILTRADO y retornan métricas
// ============================================================
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Suma del amount de todos los deals ganados (status === 'won')
 */
export function getTotalRevenue(deals) {
  return deals
    .filter((d) => d.status === 'won')
    .reduce((acc, d) => acc + d.amount, 0);
}

/**
 * Conteo de deals con status === 'open'
 */
export function getActiveDeals(deals) {
  return deals.filter((d) => d.status === 'open').length;
}

/**
 * % de deals ganados sobre el total de cerrados (won + lost)
 */
export function getWinRate(deals) {
  const closed = deals.filter((d) => d.status === 'won' || d.status === 'lost');
  if (!closed.length) return 0;
  const won = deals.filter((d) => d.status === 'won').length;
  return Math.round((won / closed.length) * 100);
}

/**
 * Promedio de amount sobre TODOS los deals (incluyendo open)
 */
export function getAvgDealSize(deals) {
  if (!deals.length) return 0;
  const total = deals.reduce((acc, d) => acc + d.amount, 0);
  return Math.round(total / deals.length);
}

/**
 * Agrupación de ingresos (won) por etapa del pipeline
 * Retorna array para Recharts BarChart
 */
export function getRevenueByStage(deals, stages) {
  return stages.map((stage) => {
    const stageDeals = deals.filter(
      (d) => d.stage_id === stage.id && d.status === 'won'
    );
    const revenue = stageDeals.reduce((acc, d) => acc + d.amount, 0);
    const count = deals.filter((d) => d.stage_id === stage.id).length;
    return {
      name: stage.name,
      revenue,
      count,
      winProb: stage.win_probability,
    };
  });
}

/**
 * Pipeline value: valor total de deals abiertos por etapa
 * Para el PipelineSummary
 */
export function getPipelineByStage(deals, stages) {
  return stages
    .filter((s) => s.id !== 's4' && s.id !== 's5')
    .map((stage) => {
      const stageDeals = deals.filter(
        (d) => d.stage_id === stage.id && d.status === 'open'
      );
      return {
        id: stage.id,
        name: stage.name,
        count: stageDeals.length,
        value: stageDeals.reduce((acc, d) => acc + d.amount, 0),
        winProb: stage.win_probability,
      };
    });
}

/**
 * Evolución de ingresos (won) agrupados por mes (últimos N meses)
 * Retorna array para Recharts LineChart/AreaChart
 */
export function getSalesTrend(deals, monthsBack = 6) {
  const now = new Date(2025, 9, 27); // Fecha simulada: Oct 27, 2025
  const result = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const targetMonth = subMonths(now, i);
    const start = startOfMonth(targetMonth);
    const end = endOfMonth(targetMonth);

    const monthRevenue = deals
      .filter((d) => {
        if (d.status !== 'won' || !d.closed_at) return false;
        const closedDate = parseISO(d.closed_at);
        return isWithinInterval(closedDate, { start, end });
      })
      .reduce((acc, d) => acc + d.amount, 0);

    const monthDeals = deals.filter((d) => {
      if (d.status !== 'won' || !d.closed_at) return false;
      const closedDate = parseISO(d.closed_at);
      return isWithinInterval(closedDate, { start, end });
    }).length;

    result.push({
      month: format(targetMonth, 'MMM', { locale: es }),
      revenue: monthRevenue,
      deals: monthDeals,
    });
  }

  return result;
}

/**
 * Top N deals ordenados por amount descendente
 */
export function getTopDeals(deals, limit = 10) {
  return [...deals]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

/**
 * KPI de comparativa: calcula revenue del mes anterior
 * para mostrar la variación porcentual
 */
export function getRevenueLastMonth(deals) {
  const now = new Date(2025, 9, 27);
  const prevMonth = subMonths(now, 1);
  const start = startOfMonth(prevMonth);
  const end = endOfMonth(prevMonth);

  return deals
    .filter((d) => {
      if (d.status !== 'won' || !d.closed_at) return false;
      const closedDate = parseISO(d.closed_at);
      return isWithinInterval(closedDate, { start, end });
    })
    .reduce((acc, d) => acc + d.amount, 0);
}

/**
 * Formatea un número como moneda USD
 */
export function formatCurrency(amount) {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

/**
 * Aplica filtros de agente y rango de fecha al array de deals
 */
export function applyFilters(deals, filters) {
  const now = new Date(2025, 9, 27);
  let filtered = [...deals];

  // Filtro por agente
  if (filters.agentId && filters.agentId !== 'all') {
    filtered = filtered.filter((d) => d.owner_id === filters.agentId);
  }

  // Filtro por rango de fecha (basado en created_at)
  if (filters.dateRange && filters.dateRange !== 'all') {
    const monthsBack = parseInt(filters.dateRange, 10);
    const start = subMonths(now, monthsBack);
    filtered = filtered.filter((d) => {
      const created = parseISO(d.created_at);
      return created >= start;
    });
  }

  return filtered;
}
