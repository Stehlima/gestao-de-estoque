import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, ChefHat, Truck, Users, DollarSign,
  Sun, Moon, Languages, Menu, X, Bell, History, Building2
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Layout() {
  const location = useLocation()
  const { lang, theme, t, toggleTheme, toggleLang } = useApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, text: 'Atenção: Chocolate Belga 70% vence em 1 dia!', time: 'Há 5 min', type: 'critical' },
    { id: 2, text: 'Novo pedido do fornecedor entregue.', time: 'Há 2h', type: 'success' },
    { id: 3, text: 'Estoque de Morango está abaixo do mínimo.', time: 'Há 5h', type: 'warning' }
  ]

  const navItems = [
    { section: t('principal'), items: [
      { path: '/', icon: LayoutDashboard, label: t('dashboard') },
      { path: '/estoque', icon: Package, label: t('inventory') },
      { path: '/producao', icon: ChefHat, label: t('production') },
    ]},
    { section: t('operacoes'), items: [
      { path: '/logistica', icon: Truck, label: t('logistics') },
      { path: '/fornecedores', icon: Building2, label: 'Fornecedores' },
      { path: '/financeiro', icon: DollarSign, label: t('financial') },
    ]},
    { section: 'Administrativo', items: [
      { path: '/comunidade', icon: Users, label: t('community') },
      { path: '/historico', icon: History, label: 'Histórico' },
    ]},
  ]

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-lilac)' }}>StockHub</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn btn-secondary" style={{ padding: '8px', position: 'relative' }} onClick={() => setIsNotificationsOpen(true)}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--accent-rose)', color: 'white', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="btn btn-secondary" style={{ padding: '8px' }}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="sidebar-brand" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-lilac)' }}>StockHub</h1>
            <button className="btn btn-secondary sidebar-brand" style={{ padding: '8px', position: 'relative' }} onClick={() => setIsNotificationsOpen(true)}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--accent-rose)', color: 'white', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '8px', flex: 1, justifyContent: 'center' }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleLang} className="btn btn-secondary" style={{ padding: '8px', fontSize: '12px', flex: 1, justifyContent: 'center' }}>
              <Languages size={18} style={{ marginRight: '4px' }} /> {lang.toUpperCase()}
            </button>
          </div>
        </div>

        <nav>
          {navItems.map(section => (
            <div key={section.section} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                {section.section}
              </div>
              {section.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '14px', fontWeight: '700' }}>Stef Doces</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Desenvolvido por<br/><strong>Stephany Lima de Mattos</strong>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {/* Modal Notificações */}
      {isNotificationsOpen && (
        <div className="modal-overlay" onClick={() => setIsNotificationsOpen(false)}>
          <div className="modal" style={{ width: '400px', alignSelf: 'flex-start', marginTop: '80px', padding: '24px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div className="card-title">Central de Notificações</div>
              <button className="btn" style={{ padding: '8px', background: 'transparent' }} onClick={() => setIsNotificationsOpen(false)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.map(notif => (
                <div key={notif.id} style={{ padding: '12px', background: 'var(--bg-glass)', borderRadius: '8px', borderLeft: `4px solid ${notif.type === 'critical' ? 'var(--accent-rose)' : notif.type === 'warning' ? 'var(--accent-amber)' : 'var(--accent-mint)'}` }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{notif.text}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{notif.time}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '20px' }} onClick={() => setIsNotificationsOpen(false)}>Marcar todas como lidas</button>
          </div>
        </div>
      )}
    </div>
  )
}
