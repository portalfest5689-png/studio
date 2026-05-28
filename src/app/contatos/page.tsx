
"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
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
  ArrowUpDown,
  Plus,
  UserPlus,
  Phone,
  Mail,
  X,
  Search as SearchIcon,
  Plus as PlusIcon,
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
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"
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
  const [isNewContactOpen, setIsNewContactOpen] = useState(false)
  
  // Dynamic fields state
  const [phones, setPhones] = useState([{ id: 1, value: "" }])
  const [emails, setEmails] = useState([{ id: 1, value: "" }])

  const addPhone = () => setPhones([...phones, { id: Date.now(), value: "" }])
  const removePhone = (id: number) => {
    if (phones.length > 1) setPhones(phones.filter(p => p.id !== id))
  }

  const addEmail = () => setEmails([...emails, { id: Date.now(), value: "" }])
  const removeEmail = (id: number) => {
    if (emails.length > 1) setEmails(emails.filter(e => e.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        {/* Page Header */}
        <header className="bg-white border-b px-4 py-4 md:py-6">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-primary flex items-center gap-2">
                Contatos
                <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
              </h1>
              
              <Dialog open={isNewContactOpen} onOpenChange={setIsNewContactOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-custom-red uppercase font-bold text-xs px-6">
                    novo contato
                  </Button>
                </DialogTrigger>
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
                          <div className="form-group">
                            <Label className="col-form-label" htmlFor="contact_name_on_modal">Nome</Label>
                            <Input required className="custom-border form-control h-11" id="contact_name_on_modal" placeholder="Ex.: Roger" />
                          </div>
                          <div className="form-group">
                            <Label className="col-form-label" htmlFor="contact_surname_on_modal">Sobrenome<span className="optional font-normal text-[10px] text-muted-foreground uppercase ml-1">(opcional)</span></Label>
                            <Input className="custom-border form-control h-11" id="contact_surname_on_modal" placeholder="Ex.: Silva" />
                          </div>
                          <div className="form-group">
                            <Label className="col-form-label" htmlFor="contact_post_on_modal">Cargo<span className="optional font-normal text-[10px] text-muted-foreground uppercase ml-1">(opcional)</span></Label>
                            <Input className="custom-border form-control h-11" id="contact_post_on_modal" placeholder="Ex.: Gerente" />
                          </div>
                          <div className="form-group">
                            <Label className="col-form-label" htmlFor="contact_company_on_modal">Empresa<span className="optional font-normal text-[10px] text-muted-foreground uppercase ml-1">(opcional)</span></Label>
                            <Input className="custom-border form-control h-11" id="contact_company_on_modal" placeholder="Ex.: imobTrack" />
                          </div>

                          <div className="col-sm-12 space-y-4">
                            <Label className="col-form-label">Telefone</Label>
                            {phones.map((phone, idx) => (
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

                          <div className="col-sm-12 space-y-4">
                            <Label className="col-form-label">E-mail</Label>
                            {emails.map((email, idx) => (
                              <div key={email.id} className="flex gap-2">
                                <Input type="email" className="h-11 custom-border flex-1" placeholder="Ex.: email@email.com" />
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

                          <div className="form-group">
                            <Label className="col-form-label">Estágio<span className="optional font-normal text-[10px] text-muted-foreground uppercase ml-1">(opcional)</span></Label>
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
                          <div className="form-group">
                            <Label className="col-form-label">Tipo<span className="optional font-normal text-[10px] text-muted-foreground uppercase ml-1">(opcional)</span></Label>
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

                          <div className="form-group">
                            <Label className="col-form-label">Origem<span className="optional font-normal text-[10px] text-muted-foreground uppercase ml-1">(opcional)</span></Label>
                            <Select defaultValue="manual">
                              <SelectTrigger className="h-11 custom-border">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manual">Manual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="form-group">
                            <Label className="col-form-label">Responsável</Label>
                            <Select defaultValue="alexandre">
                              <SelectTrigger className="h-11 custom-border">
                                <SelectValue />
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
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 max-w-2xl justify-end">
              <form id="contacts-search-form" className="flex-1 relative group">
                <Input 
                  className="pr-10 h-11 border-muted focus-visible:ring-primary rounded-lg text-sm bg-white"
                  placeholder="Nome, telefone ou e-mail"
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
