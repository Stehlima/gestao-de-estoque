import React, { useState } from 'react';
import { Truck, Mail, Phone, ExternalLink, X, Send } from 'lucide-react';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([
    { id: 1, nome: 'Distribuidora Doce Sabor', categoria: 'Ingredientes', telefone: '(11) 98765-4321', email: 'contato@docesabor.com.br', status: 'Ativo' },
    { id: 2, nome: 'Embalagens Express', categoria: 'Embalagens', telefone: '(11) 91234-5678', email: 'vendas@embaexpress.com.br', status: 'Ativo' },
  ]);

  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [novoFornecedor, setNovoFornecedor] = useState({ nome: '', categoria: '', telefone: '', email: '' });
  const [textoPedido, setTextoPedido] = useState('');

  const handleSalvarFornecedor = (e) => {
    e.preventDefault();
    setFornecedores([{ ...novoFornecedor, id: Date.now(), status: 'Ativo' }, ...fornecedores]);
    setShowNovoModal(false);
    setNovoFornecedor({ nome: '', categoria: '', telefone: '', email: '' });
  };

  const handleGerarPedido = (e) => {
    e.preventDefault();
    alert(`Pedido gerado e enviado para ${fornecedorSelecionado.nome} com sucesso!\nCópia salva no histórico.`);
    setShowPedidoModal(false);
    setTextoPedido('');
  };

  const abrirPedidoModal = (f) => {
    setFornecedorSelecionado(f);
    setShowPedidoModal(true);
  };

  return (
    <div className="animate-in">
      <div className="card-header">
        <h2 className="card-title"><Truck size={24} /> Fornecedores</h2>
        <button className="btn" onClick={() => setShowNovoModal(true)}><Truck size={18} /> Novo Fornecedor</button>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                <th style={{ padding: '12px' }}>Nome</th>
                <th style={{ padding: '12px' }}>Categoria</th>
                <th style={{ padding: '12px' }}>Contato</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{f.nome}</td>
                  <td style={{ padding: '12px' }}>{f.categoria}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Phone size={14} /> {f.telefone}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <Mail size={14} /> {f.email}
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}><span className="badge badge-green">{f.status}</span></td>
                  <td style={{ padding: '12px' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => abrirPedidoModal(f)}>
                      <ExternalLink size={14} /> Gerar Pedido
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Fornecedor */}
      {showNovoModal && (
        <div className="modal-overlay" onClick={() => setShowNovoModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div className="card-title">Novo Fornecedor</div>
              <button className="btn" style={{ padding: '8px', background: 'transparent' }} onClick={() => setShowNovoModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSalvarFornecedor}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Nome da Empresa</label>
                <input 
                  className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                  value={novoFornecedor.nome}
                  onChange={e => setNovoFornecedor({...novoFornecedor, nome: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Categoria</label>
                <input 
                  className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                  placeholder="Ex: Embalagens, Ingredientes"
                  value={novoFornecedor.categoria}
                  onChange={e => setNovoFornecedor({...novoFornecedor, categoria: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Telefone</label>
                  <input 
                    className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                    value={novoFornecedor.telefone}
                    onChange={e => setNovoFornecedor({...novoFornecedor, telefone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>E-mail</label>
                  <input 
                    type="email"
                    className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }}
                    value={novoFornecedor.email}
                    onChange={e => setNovoFornecedor({...novoFornecedor, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Cadastrar Fornecedor</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Gerar Pedido */}
      {showPedidoModal && fornecedorSelecionado && (
        <div className="modal-overlay" onClick={() => setShowPedidoModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div className="card-title">Gerar Pedido - {fornecedorSelecionado.nome}</div>
              <button className="btn" style={{ padding: '8px', background: 'transparent' }} onClick={() => setShowPedidoModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleGerarPedido}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>Itens do Pedido (Descrição / Quantidade)</label>
                <textarea 
                  className="btn btn-secondary" 
                  style={{ width: '100%', textAlign: 'left', minHeight: '100px', resize: 'vertical' }}
                  placeholder="Ex: 5kg Farinha de Trigo..."
                  value={textoPedido}
                  onChange={e => setTextoPedido(e.target.value)}
                  required
                />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Este pedido será enviado para: {fornecedorSelecionado.email}
              </p>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Send size={18} /> Enviar Pedido
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
