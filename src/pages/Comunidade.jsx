import { useState } from 'react'
import {
  Users, ShoppingBag, Star, MapPin, Heart, ArrowRight,
  TrendingUp, Package, Zap, ThumbsUp, ThumbsDown, Clock, CheckCircle
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const initialMatches = [
  { id: 1, insumo: 'Farinha de Trigo 25kg', produtores: 5, economia: '15%', prazo: '2h', precoAtacado: 'R$ 89,90', precoNormal: 'R$ 105,00', fornecedor: 'Atacadão Grãos', joined: false },
  { id: 2, insumo: 'Chocolate Belga 70%', produtores: 3, economia: '12%', prazo: '4h', precoAtacado: 'R$ 142,00', precoNormal: 'R$ 162,00', fornecedor: 'ChocoDistribuidora', joined: false },
  { id: 3, insumo: 'Embalagens Kraft P (500un)', produtores: 8, economia: '22%', prazo: '1d', precoAtacado: 'R$ 185,00', precoNormal: 'R$ 237,00', fornecedor: 'EmbalaMax', joined: false },
]

export default function Comunidade() {
  const { t } = useApp()
  const [tab, setTab] = useState('matches')
  const [matches, setMatches] = useState(initialMatches)

  const participar = (id) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, joined: true, produtores: m.produtores + 1 } : m))
    alert(t('participation_confirmed'))
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h2>{t('community')}</h2>
          <p>{t('community_desc')}</p>
        </div>
      </div>

      <div className="page-content">
        <div className="tabs">
          <button className={`tab ${tab === 'matches' ? 'active' : ''}`} onClick={() => setTab('matches')}>🤝 {t('purchase_match_tab')}</button>
          <button className={`tab ${tab === 'fornecedores' ? 'active' : ''}`} onClick={() => setTab('fornecedores')}>⭐ {t('suppliers_tab')}</button>
        </div>

        {tab === 'matches' && (
          <div style={{ display: 'grid', gap: 16 }}>
            {matches.map(m => (
              <div className="card" key={m.id} style={{ position: 'relative', overflow: 'hidden', border: m.joined ? '1px solid var(--accent-mint)' : '1px solid var(--border-glass)' }}>
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  background: m.joined ? 'var(--accent-mint)' : 'var(--gradient-primary)', padding: '6px 16px',
                  borderRadius: '0 0 0 var(--radius-md)',
                  fontSize: 12, fontWeight: 700, color: m.joined ? 'black' : 'white'
                }}>
                  {m.joined ? t('subscribed') : `-${m.economia}`}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-md)',
                    background: 'rgba(180,142,255,0.12)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Package size={26} style={{ color: 'var(--accent-lilac)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{m.insumo}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>👥 {m.produtores} {t('producers')}</span>
                      <span>⏰ {t('closes_in')} {m.prazo}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginRight: 10 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{m.precoNormal}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-mint)' }}>{m.precoAtacado}</div>
                  </div>
                  <button 
                    className={`btn btn-sm ${m.joined ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => participar(m.id)}
                    disabled={m.joined}
                  >
                    {m.joined ? <CheckCircle size={14} /> : <Heart size={14} />}
                    {m.joined ? t('participating') : t('participate')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
