import React from 'react';
import { formatCurrency } from '../utils/calculations';
import '../styles/PipelineSummary.css';

const STAGE_COLORS = {
  s1: { color: '#8B5CF6', bg: '#F3EEFF', label: 'Prospect' },
  s2: { color: '#3B82F6', bg: '#EBF3FF', label: 'Lead' },
  s3: { color: '#F97316', bg: '#FFF1E8', label: 'Negotiation' },
};

const maxValue = 300000; // referencia para barra de progreso

export default function PipelineSummary({ data }) {
  const totalPipelineValue = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="card pipeline-card">
      <div className="card-header">
        <div>
          <p className="card-title">Pipeline Activo</p>
          <p className="pipeline-subtitle">Valor total en negociación</p>
        </div>
        <div className="pipeline-total">
          <span className="pipeline-total-label">Total</span>
          <span className="pipeline-total-value">{formatCurrency(totalPipelineValue)}</span>
        </div>
      </div>

      <div className="card-body pipeline-body">
        {data.length === 0 ? (
          <p className="pipeline-empty">Sin deals activos</p>
        ) : (
          <div className="pipeline-stages">
            {data.map((stage) => {
              const meta = STAGE_COLORS[stage.id] ?? { color: '#9CA3AF', bg: '#F3F4F6', label: stage.name };
              const progress = Math.min((stage.value / maxValue) * 100, 100);

              return (
                <div key={stage.id} className="pipeline-stage-item">
                  <div className="pipeline-stage-header">
                    <div className="pipeline-stage-left">
                      <div
                        className="pipeline-stage-dot"
                        style={{ background: meta.color }}
                      />
                      <div>
                        <p className="pipeline-stage-name">{meta.label}</p>
                        <p className="pipeline-stage-prob">{stage.winProb}% prob. de cierre</p>
                      </div>
                    </div>
                    <div className="pipeline-stage-right">
                      <p className="pipeline-stage-value">{formatCurrency(stage.value)}</p>
                      <p className="pipeline-stage-count">{stage.count} deal{stage.count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="pipeline-bar-track">
                    <div
                      className="pipeline-bar-fill"
                      style={{ width: `${progress}%`, background: meta.color }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Resumen de etapas cerradas */}
            <div className="pipeline-funnel-footer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Prospect → Lead → Negotiation → Won</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
