
"use client"

import { useState, useEffect } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Pie,
  PieChart,
} from "recharts"
import { 
  Calendar, 
  Filter, 
  UserRound, 
  ArrowUpRight,
  ChartLine,
  LayoutDashboard,
  Funnel as FunnelIcon,
  ChevronDown
} from "lucide-react"

export default function RelatoriosPage() {
  const [activeTab, setActiveTab] = useState("atendimentos")
  const [stats, setStats] = useState({
    created: 0,
    ongoing: 0,
    won: 0,
    lost: 0,
    totalDeals: 0
  })

  // Carregar dados reais para os contadores
  useEffect(() => {
    const savedDeals = localStorage.getItem('crm_deals')
    if (savedDeals) {
      const deals = JSON.parse(savedDeals)
      setStats({
        created: deals.length,
        ongoing: deals.filter((d: any) => d.step < 4).length,
        won: deals.filter((d: any) => d.step === 4).length, // Simulação: etapa 4 (Proposta/Ganho)
        lost: 0, // Placeholder para lógica de perda
        totalDeals: deals.length
      })
    }
  }, [])

  // Dados Mock para os gráficos (seguindo o visual solicitado)
  const PERFORMANCE_DATA = [
    { name: "Jul", created: 0, won: 0 },
    { name: "Ago", created: 0, won: 0 },
    { name: "Set", created: 0, won: 0 },
    { name: "Out", created: 0, won: 0 },
    { name: "Nov", created: 0, won: 0 },
    { name: "Dez", created: 0, won: 0 },
    { name: "Jan", created: stats.created, won: stats.won },
  ]

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        {/* Page Header Desktop */}
        <header className="page-header sm-transparent hidden md:flex h-16 items-center px-4 bg-white border-b">
          <div className="container-fluid">
            <h2 className="text-xl font-bold text-primary">Relatórios</h2>
          </div>
        </header>

        {/* Tabs Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-[1400px] mx-auto flex px-4">
            <ul className="nav nav-tabs border-none flex">
              <li className={`nav-item ${activeTab === 'atendimentos' ? 'border-b-2 border-primary' : ''}`}>
                <button
                  onClick={() => setActiveTab("atendimentos")}
                  className={`px-6 py-4 text-sm font-bold transition-all ${
                    activeTab === "atendimentos" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Atendimentos
                </button>
              </li>
              <li className={`nav-item ${activeTab === 'imoveis' ? 'border-b-2 border-primary' : ''}`}>
                <button
                  onClick={() => setActiveTab("imoveis")}
                  className={`px-6 py-4 text-sm font-bold transition-all ${
                    activeTab === "imoveis" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Imóveis
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Filters */}
        <div className="bg-[#F4F6F8] py-4 px-4">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-end gap-2">
            
            {/* Funnel Filter */}
            <div className="flex items-center gap-2 bg-white rounded border px-2 py-1 h-10 w-full md:w-48 shadow-sm">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select defaultValue="geral">
                <SelectTrigger className="border-none shadow-none focus:ring-0 h-8 p-0 text-xs font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Atendimento geral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Filter */}
            <div className="flex items-center gap-2 bg-white rounded border px-2 py-1 h-10 w-full md:w-48 shadow-sm">
              <UserRound className="w-4 h-4 text-muted-foreground" />
              <Select defaultValue="all">
                <SelectTrigger className="border-none shadow-none focus:ring-0 h-8 p-0 text-xs font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="me">Alexandre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Filter */}
            <div className="flex items-center gap-2 bg-white rounded border px-2 py-1 h-10 w-full md:w-56 shadow-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Select defaultValue="12months">
                <SelectTrigger className="border-none shadow-none focus:ring-0 h-8 p-0 text-xs font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisMonth">Este mês</SelectItem>
                  <SelectItem value="12months">Últimos 12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>

        {/* Insights Content */}
        <div className="max-w-[1400px] mx-auto px-4 mt-2 space-y-6">
          
          {/* Main Performance Card */}
          <section id="createdClosedDealsCard" className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-primary">Desempenho dos atendimentos</h3>
                <p className="text-sm text-muted-foreground">Veja a evolução de atendimentos criados, ganhos, em andamento e perdidos.</p>
              </div>
              <div className="flex items-center gap-2 bg-[#F4F6F8] rounded border px-3 py-1.5 h-10 shadow-sm">
                <ChartLine className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Mensal</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>

            <div className="p-6">
              {/* Metric Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b pb-8">
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Atendimentos criados</h5>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary">{stats.created}</span>
                    <div className="flex items-center gap-0.5 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <ArrowUpRight className="w-3 h-3" />
                      100%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Em andamento</h5>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-orange-400">{stats.ongoing}</span>
                    <div className="flex items-center gap-0.5 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <ArrowUpRight className="w-3 h-3" />
                      100%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Atendimentos ganhos</h5>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-green-500">{stats.won}</span>
                    <div className="flex items-center gap-0.5 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <ArrowUpRight className="w-3 h-3" />
                      0%
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Atendimentos perdidos</h5>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-destructive">{stats.lost}</span>
                    <div className="flex items-center gap-0.5 bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <ArrowUpRight className="w-3 h-3" />
                      0%
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00a4bd" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#00a4bd" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#334659'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#334659'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Area type="monotone" dataKey="created" stroke="#00a4bd" strokeWidth={3} fillOpacity={1} fill="url(#colorCreated)" />
                    <Area type="monotone" dataKey="won" stroke="#76bc7a" strokeWidth={3} fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4 border-t pt-4">
                <div className="flex items-center gap-2 text-xs font-bold text-primary/70">
                  <span className="w-3 h-3 rounded-full bg-[#00a4bd]"></span> Atendimentos criados
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary/70">
                  <span className="w-3 h-3 rounded-full bg-[#feb019]"></span> Em andamento
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary/70">
                  <span className="w-3 h-3 rounded-full bg-[#76bc7a]"></span> Ganhos
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary/70">
                  <span className="w-3 h-3 rounded-full bg-[#e76556]"></span> Perdidos
                </div>
              </div>
            </div>
          </section>

          {/* Secondary Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Origins Card */}
            <section className="bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-primary">Origens que geram atendimentos</h3>
                <p className="text-sm text-muted-foreground">Veja quais origens estão trazendo mais atendimentos.</p>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[350px]">
                {stats.created > 0 ? (
                  <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[{ name: 'Manual', total: stats.created }]} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                        <Bar dataKey="total" fill="#00a4bd" radius={[0, 4, 4, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <>
                    <LayoutDashboard className="w-12 h-12 text-muted-foreground/20 mb-4" />
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Sem dados no período</p>
                  </>
                )}
              </div>
            </section>

            {/* Conversion Card */}
            <section className="bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-primary">Conversão entre etapas do funil</h3>
                <p className="text-sm text-muted-foreground">Entenda em que etapa do funil estão sendo perdidos atendimentos.</p>
              </div>
              <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[350px]">
                <div className="grid grid-cols-2 w-full gap-4 mb-8">
                  <div className="text-center space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Tempo Médio Ganho</p>
                    <p className="text-2xl font-bold text-green-500">0 dias</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Esforço p/ 1 Ganho</p>
                    <p className="text-2xl font-bold text-primary">0 atend.</p>
                  </div>
                </div>
                <LayoutDashboard className="w-12 h-12 text-muted-foreground/20 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Sem dados no período</p>
              </div>
            </section>

          </div>

          {/* Lost Reasons Card */}
          <section className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-primary">Motivos de atendimentos perdidos</h3>
                <p className="text-sm text-muted-foreground">Entenda os principais motivos que levam à perda dos atendimentos.</p>
              </div>
              <div className="flex items-center gap-2 bg-[#F4F6F8] rounded border px-3 py-1.5 h-10 shadow-sm">
                <ChartLine className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Mensal</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
            <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
              <LayoutDashboard className="w-12 h-12 text-muted-foreground/20 mb-4" />
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Sem dados no período</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
