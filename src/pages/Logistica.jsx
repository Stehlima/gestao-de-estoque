import { useState } from 'react'
import {
  Truck, MapPin, Navigation, Map, Clock, DollarSign,
  ChevronRight, CheckCircle, Play, Zap, Info
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const initialEntregas = [
  { id: '#D042', destino: 'Rua das Flores, 123', status: 'pendente', valor: 'R$ 15,00', bairro: 'Jardim' },
  { id: '#D043', destino: 'Av. Paulista, 1500', status: 'pendente', valor: 'R$ 25,00', bairro: 'Centro' },
  { id: '#D044', destino: 'Rua Augusta, 500', status: 'pendente', valor: 'R$ 18,00', bairro: 'Jardim' },
]

export default function Logistica() {
  const { t, lang } = useApp()
  const [tab, setTab] = useState('entregas')
  const [entregas, setEntregas] = useState(initialEntregas)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [routeFound, setRouteFound] = useState(false)
  const [routeApplied, setRouteApplied] = useState(false)

  const otimizarRotas = () => {
    setIsOptimizing(true)
    setTimeout(() => {
      setIsOptimizing(false)
      setRouteFound(true)
      alert(t('route_found_desc'))
    }, 2000)
  }

  const aplicarRota = () => {
    setRouteApplied(true)
    setEntregas(prev => prev.map(e => e.bairro === 'Jardim' ? { ...e, status: 'em rota' } : e))
    alert(lang === 'pt' ? "Rota aplicada! Os entregadores receberam a notificação com o mapa otimizado." : "Route applied! Drivers received the notification with the optimized map.")
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h2>{t('logistics')}</h2>
          <p>{t('logistics_desc')}</p>
        </div>
        <div className="page-header-actions">
          <button 
            className={`btn ${routeFound ? 'btn-secondary' : 'btn-primary'}`} 
            onClick={otimizarRotas}
            disabled={isOptimizing || routeFound}
          >
            {isOptimizing ? <RefreshCcw className="animate-spin" size={14} /> : <Zap size={14} />}
            {isOptimizing ? t('calculating') : t('optimize_routes')}
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* Painel de Rota Otimizada (Aparece após otimizar) */}
        {routeFound && !routeApplied && (
          <div className="alert-banner animate-in" style={{ borderColor: 'var(--accent-lilac)', background: 'rgba(180, 142, 255, 0.05)' }}>
            <div className="alert-icon" style={{ background: 'var(--accent-lilac)' }}><Map size={20} /></div>
            <div className="alert-text">
              <h4>{t('route_found_title')}</h4>
              <p>{t('route_found_desc')}</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={aplicarRota}>{t('apply_route')}</button>
          </div>
        )}

        {routeApplied && (
          <div className="alert-banner animate-in" style={{ borderColor: 'var(--accent-mint)', background: 'rgba(107, 255, 196, 0.05)' }}>
            <div className="alert-icon" style={{ background: 'var(--accent-mint)' }}><CheckCircle size={20} /></div>
            <div className="alert-text">
              <h4>{t('in_route_title')}</h4>
              <p>{t('in_route_desc')}</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setTab('rastreamento')}>{t('track')}</button>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card lilac">
            <div className="stat-icon lilac"><Truck size={20} /></div>
            <div className="stat-value">{entregas.length}</div>
            <div className="stat-label">{t('deliveries_today')}</div>
          </div>
          <div className="stat-card mint">
            <div className="stat-icon mint"><DollarSign size={20} /></div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>R$ 8,50</div>
            <div className="stat-label">{t('route_savings')}</div>
          </div>
          <div className="stat-card rose">
            <div className="stat-icon rose"><Clock size={20} /></div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>25min</div>
            <div className="stat-label">{t('time_saved')}</div>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === 'entregas' ? 'active' : ''}`} onClick={() => setTab('entregas')}>{t('deliveries_tab')}</button>
          <button className={`tab ${tab === 'rastreamento' ? 'active' : ''}`} onClick={() => setTab('rastreamento')}>{t('tracking_tab')}</button>
        </div>

        {tab === 'entregas' && (
          <div className="card">
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--text-muted)' }}>{t('id')}</th>
                    <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--text-muted)' }}>{t('destination')}</th>
                    <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--text-muted)' }}>{t('status')}</th>
                    <th style={{ padding: '12px 10px', fontSize: 13, color: 'var(--text-muted)' }}>{t('action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px 10px', fontWeight: 600 }}>{e.id}</td>
                      <td style={{ padding: '16px 10px' }}>
                        <div style={{ fontSize: 13 }}>{e.destino}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t('neighborhood_label')}: {e.bairro}</div>
                      </td>
                      <td style={{ padding: '16px 10px' }}>
                        <span className={`badge ${e.status === 'em rota' ? 'badge-green' : 'badge-yellow'}`}>
                          {t(e.status.replace(' ', '_'))}
                        </span>
                      </td>
                      <td style={{ padding: '16px 10px' }}>
                        <button className="btn btn-secondary btn-sm"><Navigation size={12} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'rastreamento' && (
          <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ textAlign: 'center' }}>
              <Map size={48} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
              <div style={{ fontWeight: 700 }}>{t('real_time_map')}</div>
              <p>{t('gps_connecting')}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// Pequeno componente interno para o ícone de carregamento
function RefreshCcw({ className, size }) {
  return (
    <svg 
      className={className} 
      width={size} height={size} 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: 'spin 2s linear infinite' }}
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </svg>
  )
}
