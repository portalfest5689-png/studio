
"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus, 
  HelpCircle, 
  ChevronDown, 
  Download, 
  Trash2, 
  MessageCircle, 
  PlusSquare, 
  Edit, 
  UserRound, 
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpDown
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

const TABS = [
  { id: "all", label: "Todos", count: 0 },
  { id: "lead", label: "Leads", count: 0 },
  { id: "qualified_lead", label: "Leads Qualificados", count: 0 },
  { id: "oportunity", label: "Oportunidades", count: 0 },
  { id: "client", label: "Clientes", count: 0 },
  { id: "owner", label: "Proprietários", count: 0 },
  { id: "collector", label: "Captadores", count: 0 },
  { id: "contributor", label: "Colaboradores", count: 0 },
]

export default function ContactsDashboard() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        {/* Page Header */}
        <div className="bg-white border-b px-4 py-4 md:py-6">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-primary flex items-center gap-2">
                Contatos
                <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
              </h1>
              <Button className="btn-custom-red uppercase font-bold text-xs px-6">
                novo contato
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 max-w-3xl justify-end">
              <div className="relative flex-1 group">
                <Input 
                  className="pr-10 h-11 border-muted focus-visible:ring-primary rounded-lg text-sm bg-white"
                  placeholder="Nome, telefone ou e-mail"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs">
                    Ações <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuItem>Gerenciar Origens de Contato</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Personalizar Campos</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" /> Exportar Resultado para CSV
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="w-4 h-4 mr-2" /> Recuperar Contatos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b overflow-x-auto scrollbar-hide">
          <div className="max-w-[1400px] mx-auto flex whitespace-nowrap px-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-5 py-4 text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-primary"
                  }
                `}
              >
                {tab.label}
                <span className="ml-1 text-[10px] opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="py-4 px-4">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border mr-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-bold text-primary">0</span>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10" disabled>
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10" disabled>
                  <PlusSquare className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10" disabled>
                  <Edit className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10" disabled>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="ml-4 text-sm text-primary/60 font-medium hidden sm:block">
                Sem contatos para exibir
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 ml-auto">
              <div className="flex bg-white rounded-lg border p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted/50">
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted text-primary shadow-inner">
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-primary/70">Alterados recentemente</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
                <UserRound className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-primary/70">Todos</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>

              <Button variant="outline" className="h-10 border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs px-4">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="px-4">
          <div className="bg-white border rounded-xl p-12 text-center max-w-[1400px] mx-auto flex flex-col items-center gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold text-primary">
                Você ainda não tem nenhum contato.{" "}
                <span className="block sm:inline text-accent">Adicione alguns contatos!</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Quando você adiciona os seus contatos na imobTrack, mostramos a você ideias de como comercializar com mais inteligência.
              </p>
            </div>
            
            <Image
              src="https://picsum.photos/seed/contacts-empty/600/400"
              alt="Sem dados"
              width={300}
              height={200}
              className="mt-4 grayscale opacity-60"
              data-ai-hint="contacts empty"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
