import { useState } from 'react'
import {
  DollarSign, TrendingUp, TrendingDown, AlertCircle,
  PieChart, ArrowUpRight, ArrowDownRight, Target,
  Zap, Calculator, RefreshCcw, Download
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Financeiro() {
  const { t, lang } = useApp()
  const [custo, setCusto] = useState(12.50)
  const [preco, setPreco] = useState(35.00)
  const [margem, setMargem] = useState(0)

  const calcularMargem = () => {
    if (preco <= 0) return
    const m = ((preco - custo) / preco) * 100
    setMargem(m.toFixed(1))
    alert(`${t('margin_calculator')}: ${m.toFixed(1)}%`)
  }

  const reajustarPrecos = () => {
    const confirm = window.confirm(t('readjustment_prompt'))
    if (confirm) {
      alert(t('readjustment_success'))
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h2>{t('financial')}</h2>
          <p>{t('financial_desc_text')}</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => alert(t('report_exported'))}>
            <Download size={14} /> {t('export_report')}
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="stats-grid">
          <div className="stat-card lilac">
            <div className="stat-icon lilac"><DollarSign size={20} /></div>
            <div className="stat-value">R$ 14.250</div>
            <div className="stat-label">{t('monthly_revenue')}</div>
            <div className="stat-change up"><ArrowUpRight size={12} /> +8%</div>
          </div>
          <div className="stat-card mint">
            <div className="stat-icon mint"><Target size={20} /></div>
            <div className="stat-value">62%</div>
            <div className="stat-label">{t('average_margin')}</div>
            <div className="stat-change up"><ArrowUpRight size={12} /> +2%</div>
          </div>
          <div className="stat-card rose">
            <div className="stat-icon rose"><TrendingDown size={20} /></div>
            <div className="stat-value">R$ 1.120</div>
            <div className="stat-label">{t('estimated_waste')}</div>
            <div className="stat-change down"><ArrowDownRight size={12} /> -15%</div>
          </div>
        </div>

        <div className="grid-2">
          {/* Calculadora de Margem Real */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Calculator size={18} /> {t('margin_calculator')}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>{t('production_cost')}</label>
                <input 
                  type="number" 
                  className="btn btn-secondary" 
                  style={{ width: '100%', textAlign: 'left', padding: '12px' }} 
                  value={custo}
                  onChange={(e) => setCusto(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600 }}>{t('selling_price')}</label>
                <input 
                  type="number" 
                  className="btn btn-secondary" 
                  style={{ width: '100%', textAlign: 'left', padding: '12px' }} 
                  value={preco}
                  onChange={(e) => setPreco(Number(e.target.value))}
                />
              </div>
              <div style={{ 
                padding: '16px', background: 'rgba(180, 142, 255, 0.1)', 
                borderRadius: '12px', textAlign: 'center' 
              }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t('your_margin_is')}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent-lilac)' }}>{margem}%</div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={calcularMargem}>{t('calculate_margin')}</button>
            </div>
          </div>

          {/* Alertas de Reajuste Inteligente */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><AlertCircle size={18} style={{ color: 'var(--accent-amber)' }} /> {t('price_alerts')}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="alert-banner" style={{ marginBottom: 0, padding: 16, background: 'rgba(255,184,107,0.05)', borderColor: 'rgba(255,184,107,0.1)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t('cocoa_increase')}</div>
                  <p style={{ fontSize: 12 }}>{t('cocoa_increase_desc')}</p>
                </div>
                <button className="btn btn-sm btn-primary" onClick={reajustarPrecos}>{t('readjust')}</button>
              </div>
              <div className="alert-banner" style={{ marginBottom: 0, padding: 16, background: 'rgba(107,255,196,0.05)', borderColor: 'rgba(107,255,196,0.1)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t('flour_opportunity')}</div>
                  <p style={{ fontSize: 12 }}>{t('flour_opportunity_desc')}</p>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => alert(lang === 'pt' ? 'Redirecionando para Compra Coletiva...' : 'Redirecting to Group Buy...')}>{t('see_match')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
