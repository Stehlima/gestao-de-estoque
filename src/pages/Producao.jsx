import { useState } from 'react'
import {
  ChefHat, Play, CheckCircle, Clock, AlertTriangle, Zap,
  GripVertical, Timer, ArrowRight
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const initialPedidos = [
  { id: '#1044', produto: 'Torta de Morango (1x)', hora: '17:00', status: 'pendente', tempo: '60min' },
  { id: '#1045', produto: 'Cupcake Red Velvet (6x)', hora: '18:00', status: 'pendente', tempo: '35min' },
  { id: '#1042', produto: 'Bolo de Chocolate (3x)', hora: '14:00', status: 'produzindo', tempo: '45min' },
  { id: '#1043', produto: 'Brigadeiro Gourmet (12x)', hora: 'Retirada', status: 'pronto', tempo: '—' },
  { id: '#1046', produto: 'Cheesecake (2x)', hora: 'Amanhã', status: 'pendente', tempo: '90min' },
]

const modoFoco = [
  { step: 1, task: 'Pesar ingredientes secos (Bolo + Cupcake)', time: '10min', group: 'Preparo', done: false },
  { step: 2, task: 'Derreter chocolate para Bolo e Brigadeiro', time: '8min', group: 'Preparo', done: false },
  { step: 3, task: 'Bater massas', time: '15min', group: 'Massas', done: false },
]

export default function Producao() {
  const { t } = useApp()
  const [tab, setTab] = useState('kanban')
  const [pedidos, setPedidos] = useState(initialPedidos)
  const [focoTasks, setFocoTasks] = useState(modoFoco)

  const moverStatus = (id, novoStatus) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: novoStatus } : p))
  }

  const toggleFoco = (index) => {
    setFocoTasks(prev => prev.map((task, i) => i === index ? { ...task, done: !task.done } : task))
  }

  const finalizarPedidoComFoto = (id) => {
    const confirm = window.confirm(t('quality_check_prompt'))
    if (confirm) {
      alert(t('quality_check_success'))
      moverStatus(id, 'pronto')
    } else {
      moverStatus(id, 'pronto')
    }
  }

  return (

    <>
      <div className="page-header">
        <div className="page-header-left">
          <h2>{t('production')}</h2>
          <p>{t('production_desc')}</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm"><Timer size={14} /> {t('capacity')}: 85%</button>
        </div>
      </div>

      <div className="page-content">
        <div className="tabs">
          <button className={`tab ${tab === 'kanban' ? 'active' : ''}`} onClick={() => setTab('kanban')}>{t('kanban_tab')}</button>
          <button className={`tab ${tab === 'foco' ? 'active' : ''}`} onClick={() => setTab('foco')}>{t('focus_mode_tab')}</button>
        </div>

        {tab === 'kanban' && (
          <div className="kanban">
            {/* Pendentes */}
            <div className="kanban-column">
              <div className="kanban-column-header">
                <div className="kanban-column-title">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-amber)' }} />
                  {t('pending')} <span className="kanban-count">{pedidos.filter(p => p.status === 'pendente').length}</span>
                </div>
              </div>
              {pedidos.filter(p => p.status === 'pendente').map(p => (
                <div className="kanban-card" key={p.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id}</span>
                    <GripVertical size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{p.produto}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                    <span><Clock size={10} /> {p.tempo}</span>
                    <span>{p.hora}</span>
                  </div>
                  <button 
                    className="btn btn-sm btn-primary" 
                    style={{ width: '100%', marginTop: 10, justifyContent: 'center' }}
                    onClick={() => moverStatus(p.id, 'produzindo')}
                  >
                    <Play size={12} /> {t('start')}
                  </button>
                </div>
              ))}
            </div>

            {/* Produzindo */}
            <div className="kanban-column">
              <div className="kanban-column-header">
                <div className="kanban-column-title">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-lilac)' }} />
                  {t('producing')} <span className="kanban-count">{pedidos.filter(p => p.status === 'produzindo').length}</span>
                </div>
              </div>
              {pedidos.filter(p => p.status === 'produzindo').map(p => (
                <div className="kanban-card" key={p.id} style={{ borderColor: 'var(--accent-lilac)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id}</span>
                    <span className="badge badge-lilac">{t('in_progress')}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>{p.produto}</div>
                  <div className="health-bar" style={{ marginBottom: 10 }}>
                    <div className="health-bar-fill green" style={{ width: '45%' }} />
                  </div>
                  <button 
                    className="btn btn-sm btn-primary" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => finalizarPedidoComFoto(p.id)}
                  >
                    <CheckCircle size={12} /> {t('finish')}
                  </button>

                </div>
              ))}
            </div>

            {/* Pronto */}
            <div className="kanban-column">
              <div className="kanban-column-header">
                <div className="kanban-column-title">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-mint)' }} />
                  {t('ready')} <span className="kanban-count">{pedidos.filter(p => p.status === 'pronto').length}</span>
                </div>
              </div>
              {pedidos.filter(p => p.status === 'pronto').map(p => (
                <div className="kanban-card" key={p.id} style={{ opacity: 0.8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id}</span>
                    <span className="badge badge-green">✓ {t('ready')}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{p.produto}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'foco' && (
          <div className="card">
            <div className="card-header">
              <div className="card-title">🎯 {t('focus_mode')}</div>
            </div>
            {focoTasks.map((task, i) => (
              <div key={i} onClick={() => toggleFoco(i)} className={`nav-item ${task.done ? 'active' : ''}`} style={{ marginBottom: 8, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: task.done ? 'var(--accent-mint)' : 'var(--bg-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {task.done ? '✓' : i + 1}
                  </div>
                  <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.task}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
