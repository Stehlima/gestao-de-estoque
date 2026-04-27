import React from 'react';
import { History, ArrowRight, ArrowLeft, RefreshCw, Download } from 'lucide-react';

export default function Historico() {
  const eventos = [
    { id: 1, tipo: 'Entrada', user: 'Stephany (Admin)', item: 'Chocolate Belga', qtd: '+50 kg', data: 'Hoje, 14:30', icon: ArrowRight, color: 'var(--accent-mint)' },
    { id: 2, tipo: 'Saída', user: 'Carlos (Produção)', item: 'Açúcar Refinado', qtd: '-10 kg', data: 'Hoje, 10:15', icon: ArrowLeft, color: 'var(--accent-rose)' },
    { id: 3, tipo: 'Atualização', user: 'Sistema', item: 'Morangos Frescos', qtd: 'Alerta de Validade', data: 'Ontem, 20:00', icon: RefreshCw, color: 'var(--accent-amber)' },
  ];

  return (
    <div className="animate-in">
      <div className="card-header">
        <h2 className="card-title"><History size={24} /> Auditoria e Histórico</h2>
        <button className="btn btn-secondary"><Download size={18} /> Exportar Log (PDF)</button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {eventos.map(evento => (
            <div key={evento.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', border: '1px solid var(--border-glass)', borderRadius: '12px', background: 'var(--bg-glass)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: evento.color }}>
                <evento.icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{evento.tipo}: {evento.item}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Feito por {evento.user}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: evento.color }}>{evento.qtd}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{evento.data}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
