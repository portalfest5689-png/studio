
"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { 
  Calendar, 
  Filter, 
  UserRound, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ChartBar,
  ChartPie,
  LayoutDashboard
} from "lucide-react"

const PERFORMANCE_DATA = [
  { name: "Jul", criados: 10, ganhos: 2, perdidos: 1 },
  { name: "Ago", criados: 25, ganhos: 5, perdidos: 3 },
  { name: "Set", criados: 18, ganhos: 8, perdidos: 2 },
  { name: "Out", criados: 35, ganhos: 12, perdidos: 5 },
  { name: "Nov", criados: 22, ganhos: 15, perdidos: 4 },
  { name: "Dez", criados: 45, ganhos: 20, perdidos: 8 },
  { name: "Jan", criados: 30, ganhos: 22, perdidos: 6 },
]

const ORIGIN_DATA = [
  { name: "Manual", total: 45 },
  { name: "Site", total: 32 },
  { name: "Instagram", total: 28 },
  { name: "Indicação", total: 15 },
  { name: "Portais", total: 10 },
]

const CONVERSION_DATA = [
  { name: "Oportunidade", value: 100 },
  { name: "Atendimento", value: 80 },
  { name: "Visita Agendada", value: 60 },
  { name: "Visita Realizada", value: 40 },
  { name: "Proposta", value: 20 },
]

const PIE_DATA = [
  { name: "Ganhos", value: 65, color: "#76bc7a" },
  { name: "Perdidos", value: 35, color: "#e76556" },
]

export default function RelatoriosPage() {
  const [activeTab, setActiveTab] = useState("atendimentos")

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        {/* Page Header */}
        <header className="bg-white border-b px-4 py-6">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-primary">Relatórios</h1>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Funil Filter */}
              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select defaultValue="geral">
                  <SelectTrigger className="border-0 shadow-none h-8 w-40 focus:ring-0 text-sm font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Atendimento geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Corretor Filter */}
              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
                <UserRound className="w-4 h-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="border-0 shadow-none h-8 w-40 focus:ring-0 text-sm font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os corretores</SelectItem>
                    <SelectItem value="me">Apenas eu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Period Filter */}
              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Select defaultValue="12months">
                  <SelectTrigger className="border-0 shadow-none h-8 w-44 focus:ring-0 text-sm font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">Este mês</SelectItem>
                    <SelectItem value="lastMonth">Mês passado</SelectItem>
                    <SelectItem value="30days">Últimos 30 dias</SelectItem>
                    <SelectItem value="thisYear">Este ano</SelectItem>
                    <SelectItem value="12months">Últimos 12 meses</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-[1400px] mx-auto flex px-4">
            <button
              onClick={() => setActiveTab("atendimentos")}
              className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === "atendimentos" 
                  ? "text-primary border-primary" 
                  : "text-muted-foreground border-transparent hover:text-primary"
              }`}
            >
              Atendimentos
            </button>
            <button
              onClick={() => setActiveTab("imoveis")}
              className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === "imoveis" 
                  ? "text-primary border-primary" 
                  : "text-muted-foreground border-transparent hover:text-primary"
              }`}
            >
              Imóveis
            </button>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 mt-8 space-y-8">
          {/* Main Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Atendimentos criados", value: "158", change: "+12%", trend: "up", color: "text-blue-600" },
              { label: "Em andamento", value: "42", change: "+5%", trend: "up", color: "text-orange-500" },
              { label: "Atendimentos ganhos", value: "24", change: "+18%", trend: "up", color: "text-green-600" },
              { label: "Atendimentos perdidos", value: "12", change: "-2%", trend: "down", color: "text-red-500" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <h2 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h2>
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Performance Chart */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-primary">Desempenho dos atendimentos</CardTitle>
                <p className="text-sm text-muted-foreground">Evolução mensal de novos negócios e fechamentos</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Criados
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span> Ganhos
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient id="colorCriados" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="criados" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCriados)" />
                    <Area type="monotone" dataKey="ganhos" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGanhos)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Origins Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white border-b">
                <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                  <ChartBar className="w-5 h-5 text-accent" />
                  Origens que geram atendimentos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ORIGIN_DATA} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                      <Tooltip 
                        cursor={{fill: '#f4f6f8'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="total" fill="#C9A84C" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Funnel Conversion Chart */}
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-white border-b">
                <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-accent" />
                  Conversão entre etapas do funil
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-6">
                  {CONVERSION_DATA.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-primary/70">{item.name}</span>
                        <span className="font-bold">{item.value}%</span>
                      </div>
                      <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000" 
                          style={{ width: `${item.value}%`, opacity: 1 - (i * 0.15) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Tempo Médio Ganho</p>
                    <p className="text-xl font-bold text-green-600">18 dias</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Esforço p/ 1 Ganho</p>
                    <p className="text-xl font-bold text-primary">6 leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Won/Lost Pie Charts */}
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                <ChartPie className="w-5 h-5 text-accent" />
                Resumo de Fechamentos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="h-[250px] w-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 flex-1 max-w-sm">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm font-bold text-green-700 uppercase">Atendimentos Ganhos</span>
                  </div>
                  <span className="text-2xl font-black text-green-700">65%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm font-bold text-red-700 uppercase">Atendimentos Perdidos</span>
                  </div>
                  <span className="text-2xl font-black text-red-700">35%</span>
                </div>
                <p className="text-xs text-center text-muted-foreground italic px-4">
                  "Você converteu 3 atendimentos a mais que no mês anterior. Continue assim!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
