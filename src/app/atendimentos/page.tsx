
"use client"

import { useState, useMemo } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Search,
  ChevronDown,
  Download,
  Trash2,
  Plus,
  Filter,
  ArrowUpDown,
  UserRound,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Briefcase,
  X,
  UserPlus,
  CircleHelp,
  Trash
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const KANBAN_COLUMNS = [
  { id: "oportunidade", title: "Oportunidade", count: 0, total: "R$ 0" },
  { id: "atendimento", title: "Atendimento", count: 0, total: "R$ 0" },
  { id: "visita_agendada", title: "Visita Agendada", count: 0, total: "R$ 0" },
  { id: "visita_realizada", title: "Visita Realizada", count: 0, total: "R$ 0" },
  { id: "proposta", title: "Proposta", count: 0, total: "R$ 0" },
]

const TABS = [
  { id: "open", label: "Abertos", count: 0 },
  { id: "won", label: "Ganhos", count: 0 },
  { id: "lost", label: "Perdidos", count: 0 },
  { id: "all", label: "Todos", count: 0 },
]

// Mock de contatos para simular a conexão
const MOCK_CONTACTS = [
  { id: 1, name: "D.rosa Farias", initials: "DF", type: "lead" },
  { id: 2, name: "Roger Silva", initials: "RS", type: "lead" },
  { id: 3, name: "Alexandre Mendonça", initials: "AM", type: "client" },
]

export default function AtendimentosPage() {
  const [activeTab, setActiveTab] = useState("open")
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")
  const [isNewDealOpen, setIsNewDealOpen] = useState(false)
  const [selectedStep, setSelectedStep] = useState(0)

  // Estados para busca de contato
  const [contactSearch, setContactSearch] = useState("")
  const [selectedContact, setSelectedContact] = useState<{ id: number; name: string; initials: string } | null>(null)
  const [isContactPopoverOpen, setIsContactPopoverOpen] = useState(false)

  // Estados para novo contato
  const [isNewContactOpen, setIsNewContactOpen] = useState(false)
  const [phones, setPhones] = useState([{ id: 1, value: "" }])
  const [emails, setEmails] = useState([{ id: 1, value: "" }])

  const addPhone = () => setPhones([...phones, { id: Date.now(), value: "" }])
  const removePhone = (id: number) => {
    if (phones.length > 1) setPhones(phones.filter(p => p.id !== id))
  }

  const addEmail = () => setEmails([...emails, { id: Date.now(), value: "" }])
  const removeEmail = (id: number) => {
    if (emails.length > 1) setEmails(emails.filter(p => p.id !== id))
  }

  const filteredContacts = useMemo(() => {
    if (!contactSearch) return MOCK_CONTACTS
    return MOCK_CONTACTS.filter(c => 
      c.name.toLowerCase().includes(contactSearch.toLowerCase())
    )
  }, [contactSearch])

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        {/* Page Header */}
        <header className="bg-white border-b px-4 py-4 md:py-6">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity">
                    <Filter className="w-5 h-5 text-accent" />
                    <span>Atendimento geral</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem className="font-bold">
                    <Filter className="w-4 h-4 mr-2" /> Atendimento geral
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-accent font-bold">
                    <Plus className="w-4 h-4 mr-2" /> Novo Funil
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog open={isNewDealOpen} onOpenChange={setIsNewDealOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-custom-red uppercase font-bold text-xs px-6">
                    novo atendimento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 border-none overflow-hidden shadow-2xl bg-white">
                  <DialogDescription className="sr-only">Formulário para criar um novo atendimento de venda</DialogDescription>
                  <section className="card h-100 bg-white">
                    <form id="add-deal-modal-form" className="custom-form d-flex flex-column">
                      <header className="px-6 py-4 bg-primary text-white flex items-center justify-between">
                        <DialogTitle className="text-lg font-bold">Adicionar Atendimento</DialogTitle>
                        <button 
                          type="button" 
                          onClick={() => setIsNewDealOpen(false)}
                          className="hover:bg-white/10 p-1 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </header>

                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                          {/* Contato Field Replicado do Modelo */}
                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Contato</Label>
                            <div className="flex gap-2">
                              <div className="relative flex-1 group">
                                <Popover open={isContactPopoverOpen} onOpenChange={setIsContactPopoverOpen}>
                                  <PopoverTrigger asChild>
                                    <div className="relative cursor-text">
                                      <Input 
                                        className="h-11 pl-4 pr-10 custom-border" 
                                        placeholder="Procurar por nome, e-mail ou telefone"
                                        value={selectedContact ? selectedContact.name : contactSearch}
                                        onChange={(e) => {
                                          setContactSearch(e.target.value)
                                          if (selectedContact) setSelectedContact(null)
                                          setIsContactPopoverOpen(true)
                                        }}
                                      />
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Search className="w-4 h-4 text-muted-foreground/40" />
                                      </div>
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[462px] p-0" align="start">
                                    <div className="bg-white border rounded-md shadow-xl overflow-hidden">
                                      <ul className="max-h-[300px] overflow-y-auto py-1">
                                        {filteredContacts.length > 0 ? (
                                          filteredContacts.map((contact) => (
                                            <li key={contact.id} className="w-full">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setSelectedContact(contact)
                                                  setContactSearch("")
                                                  setIsContactPopoverOpen(false)
                                                }}
                                                className="w-full px-4 py-2 hover:bg-muted text-left flex items-center gap-3 transition-colors"
                                              >
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${contact.type === 'lead' ? 'bg-orange-400' : 'bg-green-500'}`}>
                                                  {contact.initials}
                                                </div>
                                                <span className="font-bold text-sm text-primary">{contact.name}</span>
                                              </button>
                                            </li>
                                          ))
                                        ) : (
                                          <li className="px-4 py-8 text-center text-muted-foreground text-sm">
                                            Nenhum contato encontrado
                                          </li>
                                        )}
                                      </ul>
                                      <div className="p-4 bg-muted/30 border-t text-center flex flex-col gap-2">
                                        <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                                          <CircleHelp className="w-3.5 h-3.5" />
                                          Não encontrou o que procurava no CRM?
                                        </div>
                                        <Button 
                                          variant="outline" 
                                          className="w-full h-10 font-bold uppercase text-[10px] tracking-wider border-accent text-accent hover:bg-accent/5"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setIsContactPopoverOpen(false);
                                            setIsNewContactOpen(true);
                                          }}
                                        >
                                          INSERIR CONTATO
                                        </Button>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <Button 
                                type="button" 
                                variant="outline" 
                                className="h-11 w-11 p-0 border-muted-foreground/20 hover:bg-muted shadow-sm"
                                onClick={() => setIsNewContactOpen(true)}
                              >
                                <UserPlus className="w-5 h-5 text-accent" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-group space-y-2">
                              <Label className="text-sm font-bold text-primary/80">
                                Nome do atendimento <span className="text-[10px] text-muted-foreground font-normal uppercase ml-1">(opcional)</span>
                              </Label>
                              <Input className="h-11 custom-border" placeholder="" />
                            </div>
                            <div className="form-group space-y-2">
                              <Label className="text-sm font-bold text-primary/80">
                                Valor do negócio <span className="text-[10px] text-muted-foreground font-normal uppercase ml-1">(opcional)</span>
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/60 font-bold text-xs">R$</div>
                                <Input className="h-11 pl-10 custom-border" placeholder="0,00" />
                              </div>
                            </div>
                          </div>

                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Funil de vendas</Label>
                            <Select defaultValue="geral">
                              <SelectTrigger className="h-11 custom-border">
                                <SelectValue placeholder="Escolha um funil" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="geral">Atendimento geral</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Steps Visual Indicator */}
                          <div className="form-group space-y-3">
                            <Label className="text-sm font-bold text-primary/80">Etapa do negócio</Label>
                            <div className="flex items-center gap-1.5 py-2">
                              {KANBAN_COLUMNS.map((column, idx) => (
                                <button
                                  key={column.id}
                                  type="button"
                                  onClick={() => setSelectedStep(idx)}
                                  className={`h-4 flex-1 rounded-full transition-all duration-300 ${
                                    idx === selectedStep 
                                      ? "bg-accent shadow-sm ring-2 ring-accent/20" 
                                      : "bg-muted hover:bg-muted-foreground/20"
                                  }`}
                                  title={column.title}
                                />
                              ))}
                            </div>
                            <p className="text-xs font-bold text-accent uppercase tracking-wider">
                              {KANBAN_COLUMNS[selectedStep].title}
                            </p>
                          </div>

                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Responsável pelo atendimento</Label>
                            <Select defaultValue="alexandre">
                              <SelectTrigger className="h-11 custom-border">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alexandre">Alexandre Mendonça</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <footer className="px-8 py-6 bg-muted/30 border-t flex items-center gap-3">
                        <Button type="submit" className="btn-custom-red h-12 px-10 font-bold uppercase text-xs tracking-widest shadow-lg">
                          Criar novo
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          onClick={() => setIsNewDealOpen(false)}
                          className="h-12 px-6 font-bold uppercase text-xs text-muted-foreground hover:bg-muted"
                        >
                          Fechar
                        </Button>
                      </footer>
                    </form>
                  </section>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 max-w-2xl justify-end">
              <form id="deal-search-form" className="flex-1 relative group">
                <Input 
                  className="pr-10 h-11 border-muted focus-visible:ring-primary rounded-lg text-sm bg-white"
                  placeholder="Pesquisa por nome do atendimento ou contato"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
              </form>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs">
                    Ações <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuItem>Criar/Editar Funil</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Configurar Rodízio de Atendimentos</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Definir Motivos de Perda</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" /> Exportar Resultado para CSV
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="w-4 h-4 mr-2" /> Recuperar Atendimentos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

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
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border mr-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm font-bold text-primary">0</span>
              </div>
              <div className="text-sm text-primary/60 font-medium">
                Nenhum atendimento em andamento
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 ml-auto w-full lg:w-auto">
              <div className="flex bg-white rounded-lg border p-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${viewMode === 'kanban' ? 'bg-muted text-primary shadow-inner' : 'text-muted-foreground hover:bg-muted/50'}`}
                  onClick={() => setViewMode('kanban')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${viewMode === 'table' ? 'bg-muted text-primary shadow-inner' : 'text-muted-foreground hover:bg-muted/50'}`}
                  onClick={() => setViewMode('table')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1 flex-1 sm:flex-none">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-primary/70">Novos</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1 flex-1 sm:flex-none">
                <UserRound className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-primary/70">Todos</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>

              <Button variant="outline" className="h-10 border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs px-4 flex-1 sm:flex-none">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="px-4 mt-2">
          <div className="max-w-[1400px] mx-auto overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {KANBAN_COLUMNS.map((column) => (
                <div key={column.id} className="w-[280px] flex flex-col gap-4">
                  {/* Column Header */}
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-primary text-sm uppercase tracking-tight truncate">
                        {column.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-full">{column.count}</span>
                      <span className="text-muted-foreground">{column.total}</span>
                    </div>
                  </div>

                  {/* Column Body / Droppable Area */}
                  <div className="min-h-[500px] rounded-lg border-2 border-dashed border-muted flex flex-col items-center justify-center p-8 text-center bg-muted/20">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-muted-foreground/40" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground/60 uppercase">Sem atendimentos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Novo Contato Modal */}
      <Dialog open={isNewContactOpen} onOpenChange={setIsNewContactOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-none bg-transparent">
          <DialogDescription className="sr-only">Formulário para criar um novo contato</DialogDescription>
          <section className="card h-100 bg-white rounded-lg overflow-hidden shadow-2xl">
            <form id="add-contact-modal-form" className="custom-form d-flex flex-column contact-form">
              <header className="px-6 py-4 bg-primary text-white flex items-center justify-between">
                <DialogTitle className="text-lg font-bold">Criar novo contato</DialogTitle>
                <button 
                  type="button" 
                  onClick={() => setIsNewContactOpen(false)}
                  className="hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>
              
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Nome</Label>
                    <Input required className="h-11 custom-border" placeholder="Ex.: Roger" />
                  </div>
                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Sobrenome <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                    <Input className="h-11 custom-border" placeholder="Ex.: Silva" />
                  </div>
                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Cargo <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                    <Input className="h-11 custom-border" placeholder="Ex.: Gerente" />
                  </div>
                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Empresa <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                    <Input className="h-11 custom-border" placeholder="Ex.: imobTrack" />
                  </div>

                  <div className="col-span-full space-y-4">
                    <Label className="text-sm font-bold text-primary/80">Telefone</Label>
                    {phones.map((phone) => (
                      <div key={phone.id} className="flex gap-2">
                        <div className="flex-1 flex gap-0">
                          <Select defaultValue="+55">
                            <SelectTrigger className="h-11 w-[100px] rounded-r-none border-r-0 bg-muted/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+55">🇧🇷 (+55)</SelectItem>
                              <SelectItem value="+1">🇺🇸 (+1)</SelectItem>
                              <SelectItem value="+351">🇵🇹 (+351)</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input className="h-11 rounded-l-none custom-border flex-1" placeholder="Ex.: (00) 0000-0000" />
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-11 w-11 text-muted-foreground hover:text-destructive"
                          onClick={() => removePhone(phone.id)}
                          disabled={phones.length === 1}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={addPhone}
                      className="text-[10px] font-bold uppercase text-accent hover:underline flex items-center gap-1"
                    >
                      Adicionar telefone
                    </button>
                  </div>

                  <div className="col-span-full space-y-4">
                    <Label className="text-sm font-bold text-primary/80">E-mail</Label>
                    {emails.map((email) => (
                      <div key={email.id} className="flex gap-2">
                        <Input className="h-11 custom-border flex-1" placeholder="Ex.: email@email.com" type="email" />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-11 w-11 text-muted-foreground hover:text-destructive"
                          onClick={() => removeEmail(email.id)}
                          disabled={emails.length === 1}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={addEmail}
                      className="text-[10px] font-bold uppercase text-accent hover:underline flex items-center gap-1"
                    >
                      Adicionar e-mail
                    </button>
                  </div>

                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Estágio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                    <Select>
                      <SelectTrigger className="h-11 custom-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="qualified_lead">Lead Qualificado</SelectItem>
                        <SelectItem value="oportunity">Oportunidade</SelectItem>
                        <SelectItem value="client">Cliente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Tipo <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                    <Select>
                      <SelectTrigger className="h-11 custom-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Proprietário</SelectItem>
                        <SelectItem value="investor">Investidor</SelectItem>
                        <SelectItem value="buyer">Comprador</SelectItem>
                        <SelectItem value="renter">Locatário</SelectItem>
                        <SelectItem value="guarantor">Fiador</SelectItem>
                        <SelectItem value="contributor">Colaborador</SelectItem>
                        <SelectItem value="collector">Captador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Origem <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                    <Select defaultValue="manual">
                      <SelectTrigger className="h-11 custom-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="trafego">Tráfego</SelectItem>
                        <SelectItem value="conteudo">Conteúdo</SelectItem>
                        <SelectItem value="indicacao">Indicação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="form-group space-y-2">
                    <Label className="text-sm font-bold text-primary/80">Responsável</Label>
                    <Select defaultValue="alexandre">
                      <SelectTrigger className="h-11 custom-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alexandre">Alexandre Mendonça</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <footer className="px-8 py-6 bg-muted/30 border-t flex items-center gap-3">
                <Button type="submit" className="btn-custom-red h-12 px-10 font-bold uppercase text-xs tracking-widest shadow-lg">
                  Criar novo
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsNewContactOpen(false)}
                  className="h-12 px-6 font-bold uppercase text-xs text-muted-foreground hover:bg-muted"
                >
                  Fechar
                </Button>
              </footer>
            </form>
          </section>
        </DialogContent>
      </Dialog>

      {/* FAB Mobile */}
      <div className="fixed bottom-6 right-4 md:hidden z-50">
        <Button onClick={() => setIsNewDealOpen(true)} className="w-14 h-14 rounded-full btn-custom-red shadow-2xl">
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  )
}
