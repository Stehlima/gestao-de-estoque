import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Estoque from './pages/Estoque'
import Producao from './pages/Producao'
import Logistica from './pages/Logistica'
import Comunidade from './pages/Comunidade'
import Financeiro from './pages/Financeiro'
import Fornecedores from './pages/Fornecedores'
import Historico from './pages/Historico'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="estoque" element={<Estoque />} />
          <Route path="producao" element={<Producao />} />
          <Route path="logistica" element={<Logistica />} />
          <Route path="comunidade" element={<Comunidade />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="fornecedores" element={<Fornecedores />} />
          <Route path="historico" element={<Historico />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
