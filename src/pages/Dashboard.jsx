import { useState, useEffect, useRef } from 'react'
import {
  Package, TrendingUp, Clock, AlertTriangle, ShoppingCart,
  ArrowUpRight, ArrowDownRight, Users, Zap, ChevronRight,
  Calendar, Bell, X, Mic, Thermometer, Smartphone, Volume2, Send, RefreshCcw, ChefHat
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'

const healthItems = [
  { name: 'Farinha de Trigo', pct: 85, days: 12, status: 'green' },
  { name: 'Manteiga', pct: 35, days: 3, status: 'yellow' },
  { name: 'Chocolate 70%', pct: 15, days: 1, status: 'red' },
]

const salesData = [
  { name: 'Seg', valor: 400 },
  { name: 'Ter', valor: 300 },
  { name: 'Qua', valor: 550 },
  { name: 'Qui', valor: 450 },
  { name: 'Sex', valor: 800 },
  { name: 'Sáb', valor: 1200 },
  { name: 'Dom', valor: 900 },
];

export default function Dashboard() {
  const { t, lang } = useApp()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiStatus, setAiStatus] = useState(t('ready'))
  const [inputText, setInputText] = useState("")
  const [temp, setTemp] = useState(4.2)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const speak = (text) => {
    window.speechSynthesis.cancel()
    setAiStatus("Falando...")
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US'
    utterance.rate = 1.1
    utterance.onend = () => setAiStatus(t('ready'))
    window.speechSynthesis.speak(utterance)
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    processCommand(inputText.toLowerCase())
    setInputText("")
  }

  const quickAction = (cmd) => {
    setTranscript("Comando rápido selecionado...")
    processCommand(cmd)
  }

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    if (recognitionRef.current) { try { recognitionRef.current.abort() } catch(e) {} }

    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'pt' ? 'pt-BR' : 'en-US'
    
    recognition.onstart = () => {
      setIsListening(true)
      setAiStatus(t('listening'))
      setTranscript(lang === 'pt' ? "Pode falar..." : "You can speak...")
    }
    
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript
      setTranscript(result)
      setIsListening(false)
      processCommand(result.toLowerCase())
    }

    recognition.onerror = () => {
      setIsListening(false)
      setAiStatus(lang === 'pt' ? "Erro de Rede" : "Network Error")
      setTranscript(lang === 'pt' ? "O Google falhou. Use os comandos rápidos abaixo!" : "Google failed. Use the quick shortcuts below!")
    }

    recognition.onend = () => setIsListening(false)
    recognitionRef.current = recognition
    recognition.start()
  }

  const processCommand = (text) => {
    setAiStatus("Processando...")
    if (text.includes("brigadeiro") || text.includes("receita")) {
      speak("Stephany, a dica de hoje é: para o brigadeiro não cristalizar, adicione uma colher de glucose ou mel à massa.")
    } else if (text.includes("estoque") || text.includes("insumos")) {
      speak("Stephany, seu estoque está em dia, apenas fique atenta ao chocolate que vence amanhã.")
    } else if (text.includes("lucro") || text.includes("financeiro")) {
      speak("Sua margem atual é de sessenta e dois por cento, Stephany. Um ótimo desempenho para a Stef Doces!")
    } else if (text.includes("pedido") || text.includes("venda")) {
      speak("Você tem doze pedidos hoje. Três já estão em produção e dois prontos para entrega.")
    } else {
      speak("Entendido Stephany. Analisando dados sobre " + text + ". Como posso te ajudar mais?")
    }
  }

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="page-header-left">
          <h2>{t('dashboard')} Stef Doces</h2>
          <p>{t('welcome')}</p>
        </div>
        <div className="page-header-actions">
          <div className="chip" style={{ background: 'rgba(107,255,196,0.1)', color: 'var(--accent-mint)' }}>
            <Thermometer size={14} /> {t('fridge')}: {temp}°C
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="grid-2">
          {/* Central de Comando Híbrida */}
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--bg-card), rgba(180, 142, 255, 0.1))', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <button 
                onClick={startVoice}
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: isListening ? '#ff4757' : 'var(--accent-lilac)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(180, 142, 255, 0.4)'
                }}
              >
                <Mic size={32} />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-lilac)', marginBottom: 4 }}>{t('status')}: {aiStatus}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{transcript || t('mic_prompt')}</div>
              </div>
            </div>

            {/* ATALHOS RÁPIDOS (MODO COZINHA) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
              <button className="btn btn-secondary" style={{ padding: '15px', flexDirection: 'column', gap: 8 }} onClick={() => quickAction('estoque')}>
                <Package size={20} color="var(--accent-lilac)" /> <span style={{ fontSize: 11 }}>{t('inventory')}</span>
              </button>
              <button className="btn btn-secondary" style={{ padding: '15px', flexDirection: 'column', gap: 8 }} onClick={() => quickAction('pedido')}>
                <ShoppingCart size={20} color="var(--accent-mint)" /> <span style={{ fontSize: 11 }}>{t('orders')}</span>
              </button>
              <button className="btn btn-secondary" style={{ padding: '15px', flexDirection: 'column', gap: 8 }} onClick={() => quickAction('lucro')}>
                <TrendingUp size={20} color="var(--accent-rose)" /> <span style={{ fontSize: 11 }}>{t('profit')}</span>
              </button>
              <button className="btn btn-secondary" style={{ padding: '15px', flexDirection: 'column', gap: 8 }} onClick={() => quickAction('receita')}>
                <ChefHat size={20} color="var(--accent-amber)" /> <span style={{ fontSize: 11 }}>{t('recipes')}</span>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-title">🚨 {t('input_monitor')}</div>
            <div style={{ marginTop: 15 }}>
              {healthItems.map((item, i) => (
                <div className="health-bar-container" key={i}>
                  <div className="health-bar-label">
                    <span>{item.name}</span>
                    <span className={`badge ${item.status === 'red' ? 'badge-red' : 'badge-yellow'}`}>{item.days} {t('days')}</span>
                  </div>
                  <div className="health-bar">
                    <div className={`health-bar-fill ${item.status}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">📊 {t('day_summary')}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent-mint)', marginTop: 10 }}>R$ 1.200</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{t('revenue_desc')}</p>
          </div>

          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-title">📈 Desempenho da Semana</div>
            <div style={{ height: 250, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-glass)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="valor" stroke="var(--accent-lilac)" strokeWidth={3} dot={{ r: 5, fill: 'var(--accent-mint)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
