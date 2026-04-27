import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const translations = {
  pt: {
    dashboard: "Dashboard",
    inventory: "Estoque",
    production: "Produção",
    logistics: "Logística",
    community: "Comunidade",
    financial: "Financeiro",
    welcome: "Bem-vinda, Stephany Mattos",
    theme: "Tema",
    language: "Idioma",
    fridge: "Geladeira",
    status: "STATUS",
    ready: "Pronta",
    listening: "Ouvindo...",
    processing: "Processando...",
    speaking: "Falando...",
    mic_prompt: "Toque no microfone ou use os atalhos abaixo:",
    shortcuts: "Atalhos Rápidos",
    orders: "Pedidos",
    profit: "Lucro",
    recipes: "Receitas",
    input_monitor: "Monitor de Insumos",
    days: "dias",
    day_summary: "Resumo do Dia",
    revenue_desc: "Faturamento atual da Stef Doces.",
    inventory_management: "Gestão de insumos e receitas",
    generate_shopping_list: "Gerar Lista de Compras",
    new_input: "Novo Insumo",
    attention_expiring: "Atenção: Insumos Próximos ao Vencimento",
    expiring_soon_desc: "Morangos e Creme de Leite vencem em 48h. Clique para ver sugestões de receitas.",
    see_suggested_recipes: "Ver Receitas Sugeridas",
    inventory_tab: "Inventário",
    technical_sheets_tab: "Fichas Técnicas",
    input: "Insumo",
    quantity: "Quantidade",
    new_technical_sheet: "Nova Ficha Técnica",
    input_name: "Nome do Insumo",
    current_qty: "Qtd. Atual",
    min_qty: "Qtd. Mínima",
    register_input: "Cadastrar Insumo",
    product_name: "Nome do Produto",
    register_recipe: "Cadastrar Receita",
    ok: "ok",
    low: "baixo",
    critical: "critico"
  },
  en: {
    dashboard: "Dashboard",
    inventory: "Inventory",
    production: "Production",
    logistics: "Logistics",
    community: "Community",
    financial: "Financial",
    welcome: "Welcome, Stephany Mattos",
    theme: "Theme",
    language: "Language",
    fridge: "Fridge",
    status: "STATUS",
    ready: "Ready",
    listening: "Listening...",
    processing: "Processing...",
    speaking: "Speaking...",
    mic_prompt: "Tap the mic or use the shortcuts below:",
    shortcuts: "Quick Shortcuts",
    orders: "Orders",
    profit: "Profit",
    recipes: "Recipes",
    input_monitor: "Supply Monitor",
    days: "days",
    day_summary: "Day Summary",
    revenue_desc: "Current revenue for Stef Doces.",
    inventory_management: "Supply and recipe management",
    generate_shopping_list: "Generate Shopping List",
    new_input: "New Supply",
    attention_expiring: "Warning: Supplies Nearing Expiry",
    expiring_soon_desc: "Strawberries and Cream expire in 48h. Click to see recipe suggestions.",
    see_suggested_recipes: "See Suggested Recipes",
    inventory_tab: "Inventory",
    technical_sheets_tab: "Technical Sheets",
    input: "Supply",
    quantity: "Quantity",
    new_technical_sheet: "New Technical Sheet",
    input_name: "Supply Name",
    current_qty: "Current Qty",
    min_qty: "Min. Qty",
    register_input: "Register Supply",
    product_name: "Product Name",
    register_recipe: "Register Recipe",
    ok: "ok",
    low: "low",
    critical: "critical"
  }
};

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('pt');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const t = (key) => {
    if (!translations[lang]) return key;
    return translations[lang][key] || key;
  };

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang(prev => (prev === 'pt' ? 'en' : 'pt'));

  return (
    <AppContext.Provider value={{ lang, theme, t, toggleTheme, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
