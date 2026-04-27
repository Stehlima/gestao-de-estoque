import { useState } from 'react'
import {
  Package, Plus, Search, Upload, Camera, FileText, X,
  AlertTriangle, TrendingUp, BarChart3, ChevronDown, Edit, Trash2, Download, ScanBarcode
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const initialInsumos = [
  { id: 1, nome: 'Farinha de Trigo', qtd: '5.2 kg', min: '2 kg', custo: 'R$ 6,90/kg', status: 'ok', dias: 12, cat: 'Secos' },
  { id: 2, nome: 'Manteiga s/ Sal', qtd: '800g', min: '1 kg', custo: 'R$ 32,00/kg', status: 'baixo', dias: 3, cat: 'Refrigerados' },
  { id: 3, nome: 'Chocolate 70%', qtd: '300g', min: '1 kg', custo: 'R$ 89,00/kg', status: 'critico', dias: 1, cat: 'Secos' },
]

const initialFichas = [
  { nome: 'Bolo de Chocolate', insumos: [{ nome: 'Farinha', qtd: '300g' }, { nome: 'Chocolate', qtd: '200g' }] },
  { nome: 'Brigadeiro Gourmet', insumos: [{ nome: 'Leite Cond.', qtd: '1 un' }, { nome: 'Chocolate', qtd: '100g' }] },
]

export default function Estoque() {
  const { t, lang } = useApp()
  const [tab, setTab] = useState('inventario')
  const [insumos, setInsumos] = useState(initialInsumos)
  const [fichas, setFichas] = useState(initialFichas)
  const [showInsumoModal, setShowInsumoModal] = useState(false)
  const [showFichaModal, setShowFichaModal] = useState(false)
  
  const [newInsumo, setNewInsumo] = useState({ nome: '', qtd: '', min: '' })
  const [newFicha, setNewFicha] = useState({ nome: '', ingrediente: '', qtd: '' })

  const handleAddInsumo = (e) => {
    e.preventDefault()
    const novo = {
      id: insumos.length + 1,
      nome: newInsumo.nome,
      qtd: newInsumo.qtd,
      min: newInsumo.min,
      custo: 'R$ 0,00',
      status: 'ok',
      dias: 30,
      cat: 'Geral'
    }
    setInsumos([novo, ...insumos])
    setShowInsumoModal(false)
    setNewInsumo({ nome: '', qtd: '', min: '' })
  }

  const handleAddFicha = (e) => {
    e.preventDefault()
    const nova = {
      nome: newFicha.nome,
      insumos: [{ nome: newFicha.ingrediente, qtd: newFicha.qtd }]
    }
    setFichas([...fichas, nova])
    setShowFichaModal(false)
    setNewFicha({ nome: '', ingrediente: '', qtd: '' })
  }

  return (
    <>
      <div className="page-header" style={{ position: 'relative', zIndex: 60, marginBottom: '24px' }}>
        <div className="page-header-left">
          <h2>{t('inventory')}</h2>
          <p>{t('inventory_management')}</p>
        </div>
        <div className="page-header-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => alert('Abrindo câmera para leitura de código de barras... (Simulação)')}>
            <ScanBarcode size={14} /> Escanear Produto
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => alert('Arquivo CSV gerado com sucesso!')}>
            <Download size={14} /> Baixar CSV
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => alert(lang === 'pt' ? 'Lista de Compras enviada para o seu WhatsApp!' : 'Shopping List sent to your WhatsApp!')}>
            <FileText size={14} /> {t('generate_shopping_list')}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowInsumoModal(true)}>
            <Plus size={14} /> {t('new_input')}
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="alert-banner animate-in" style={{ borderColor: 'var(--accent-amber)', background: 'rgba(255,184,107,0.05)' }}>
          <div className="alert-icon" style={{ background: 'var(--accent-amber)' }}><AlertTriangle size={20} /></div>
          <div className="alert-text">
            <h4>{t('attention_expiring')}</h4>
            <p>{t('expiring_soon_desc')}</p>
          </div>
          <button className="btn btn-secondary btn-sm">{t('see_suggested_recipes')}</button>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === 'inventario' ? 'active' : ''}`} onClick={() => setTab('inventario')}>{t('inventory_tab')}</button>
          <button className={`tab ${tab === 'fichas' ? 'active' : ''}`} onClick={() => setTab('fichas')}>{t('technical_sheets_tab')}</button>
        </div>

        {tab === 'inventario' && (
          <div className="card">
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px', fontSize: 13, color: 'var(--text-muted)' }}>{t('input')}</th>
                    <th style={{ padding: '12px', fontSize: 13, color: 'var(--text-muted)' }}>{t('quantity')}</th>
                    <th style={{ padding: '12px', fontSize: 13, color: 'var(--text-muted)' }}>{t('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {insumos.map(i => (
                    <tr key={i.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px 12px', fontWeight: 600 }}>{i.nome}</td>
                      <td style={{ padding: '16px 12px' }}>{i.qtd}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <span className={`badge ${i.status === 'critico' ? 'badge-red' : i.status === 'baixo' ? 'badge-yellow' : 'badge-green'}`}>
                          {t(i.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'fichas' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {fichas.map((f, i) => (
              <div className="card" key={i}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🧁 {f.nome}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {f.insumos.map((ins, j) => (
                    <span key={j} className="chip" style={{ background: 'var(--bg-glass)', padding: '2px 8px', borderRadius: '4px', fontSize: 11 }}>{ins.nome}: {ins.qtd}</span>
                  ))}
                </div>
              </div>
            ))}
            <div 
              className="card" 
              style={{ borderStyle: 'dashed', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}
              onClick={() => setShowFichaModal(true)}
            >
              <Plus size={24} style={{ color: 'var(--accent-lilac)', marginBottom: 8 }} />
              <div style={{ fontWeight: 600 }}>{t('new_technical_sheet')}</div>
            </div>
          </div>
        )}

        {/* Modal Novo Insumo */}
        {showInsumoModal && (
          <div className="modal-overlay" onClick={() => setShowInsumoModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="card-title">{t('new_input')}</div>
                <button className="btn" onClick={() => setShowInsumoModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddInsumo}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>{t('input_name')}</label>
                  <input 
                    className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                    placeholder={lang === 'pt' ? "Ex: Açúcar Refinado" : "Ex: Refined Sugar"}
                    value={newInsumo.nome}
                    onChange={e => setNewInsumo({...newInsumo, nome: e.target.value})}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>{t('current_qty')}</label>
                    <input 
                      className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                      placeholder="Ex: 5kg"
                      value={newInsumo.qtd}
                      onChange={e => setNewInsumo({...newInsumo, qtd: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>{t('min_qty')}</label>
                    <input 
                      className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                      placeholder="Ex: 1kg"
                      value={newInsumo.min}
                      onChange={e => setNewInsumo({...newInsumo, min: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t('register_input')}</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Nova Ficha */}
        {showFichaModal && (
          <div className="modal-overlay" onClick={() => setShowFichaModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="card-title">{t('new_technical_sheet')}</div>
                <button className="btn" onClick={() => setShowFichaModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleAddFicha}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>{t('product_name')}</label>
                  <input 
                    className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                    placeholder={lang === 'pt' ? "Ex: Brownie" : "Ex: Brownie"}
                    value={newFicha.nome}
                    onChange={e => setNewFicha({...newFicha, nome: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t('register_recipe')}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
