
"use client"

import { useState, useEffect } from "react"
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
  X,
  Trash,
  Plus
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
  SelectValue
} from "@/components/ui/select"

const TABS = [
  { id: "all", label: "Todos" },
  { id: "lead", label: "Leads" },
  { id: "qualified_lead", label: "Leads Qualificados" },
  { id: "oportunity", label: "Oportunidades" },
  { id: "client", label: "Clientes" },
  { id: "owner", label: "Proprietários" },
  { id: "collector", label: "Captadores" },
  { id: "contributor", label: "Colaboradores" },
]

interface Contact {
  id: number
  name: string
  initials: string
  type: string
  description?: string
}

const INITIAL_CONTACTS: Contact[] = [
  { id: 1, name: "D.rosa Farias", initials: "DF", type: "lead", description: "Interessada em apartamentos na planta." },
  { id: 2, name: "Roger Silva", initials: "RS", type: "lead", description: "Busca casa em condomínio fechado." },
  { id: 3, name: "Alexandre Mendonça", initials: "AM", type: "client", description: "Cliente antigo, focado em investimentos." },
]

export default function ContactsDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [isNewContactOpen, setIsNewContactOpen] = useState(false)
  
  // Estado de contatos (sincronizado)
  const [contacts, setContacts] = useState<Contact[]>([])

  // Dynamic fields state
  const [phones, setPhones] = useState([{ id: 1, value: "" }])

  const addPhone = () => setPhones([...phones, { id: Date.now(), value: "" }])
  const removePhone = (id: number) => {
    if (phones.length > 1) setPhones(phones.filter(p => p.id !== id))
  }

  // Carrega contatos do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem('crm_contacts')
    if (saved) {
      setContacts(JSON.parse(saved))
    } else {
      setContacts(INITIAL_CONTACTS)
      localStorage.setItem('crm_contacts', JSON.stringify(INITIAL_CONTACTS))
    }
  }, [])

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('contact_name_on_modal') as string
    const surname = formData.get('contact_surname_on_modal') as string
    const description = formData.get('contact_description_on_modal') as string
    const fullName = `${name} ${surname}`.trim()
    
    const newContact: Contact = {
      id: Date.now(),
      name: fullName,
      initials: name.substring(0, 1).toUpperCase() + (surname ? surname.substring(0, 1).toUpperCase() : ""),
      type: (formData.get('contact_lead_on_modal') as any) || 'lead',
      description: description
    }

    const updatedContacts = [newContact, ...contacts]
    setContacts(updatedContacts)
    localStorage.setItem('crm_contacts', JSON.stringify(updatedContacts))
    setIsNewContactOpen(false)
    setPhones([{ id: 1, value: "" }]) // Reset phones
  }

  const handleDeleteContact = (id: number) => {
    const updatedContacts = contacts.filter(c => c.id !== id)
    setContacts(updatedContacts)
    localStorage.setItem('crm_contacts', JSON.stringify(updatedContacts))
  }

  const filteredContacts = contacts.filter(c => {
    if (activeTab === 'all') return true
    return c.type === activeTab
  })

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
                    <form id="add-contact-modal-form" className="custom-form d-flex flex-column contact-form" onSubmit={handleCreateContact}>
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
                            <Input required name="contact_name_on_modal" className="h-11 custom-border" placeholder="Ex.: Roger" />
                          </div>
                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Sobrenome <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Input name="contact_surname_on_modal" className="h-11 custom-border" placeholder="Ex.: Silva" />
                          </div>
                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Cargo <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Input name="contact_post_on_modal" className="h-11 custom-border" placeholder="Ex.: Gerente" />
                          </div>
                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Empresa <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Input name="contact_company_on_modal" className="h-11 custom-border" placeholder="Ex.: imobTrack" />
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

                          <div className="form-group space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Estágio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select name="contact_lead_on_modal">
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
                            <Select name="contact_type_on_modal">
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
                            <Select name="contact_origin_on_modal" defaultValue="manual">
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

                          <div className="col-span-full space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Descrição <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Textarea 
                              name="contact_description_on_modal" 
                              className="min-h-[100px] custom-border no-resize" 
                              placeholder="Adicione observações ou detalhes extras sobre este contato..."
                            />
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
            {TABS.map((tab) => {
              const count = contacts.filter(c => tab.id === 'all' || c.type === tab.id).length
              return (
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
                  <span className="ml-1 text-[10px] opacity-60">({count})</span>
                </button>
              )
            })}
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
                {filteredContacts.length === 0 ? "Sem contatos para exibir" : `Mostrando ${filteredContacts.length} contatos`}
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

        {/* Contacts List or Empty State */}
        <div className="px-4">
          {filteredContacts.length === 0 ? (
            <div className="bg-white border rounded-xl p-12 text-center max-w-[1400px] mx-auto flex flex-col items-center gap-6">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl font-bold text-primary">
                  Nenhum contato encontrado.{" "}
                  <span className="block sm:inline text-accent">Adicione alguns contatos!</span>
                </h2>
              </div>
              
              <button 
                onClick={() => setIsNewContactOpen(true)}
                className="mt-4 w-24 h-24 rounded-full border-4 border-accent flex items-center justify-center text-accent hover:bg-accent/10 transition-all group shadow-sm"
              >
                <Plus className="w-16 h-16 transition-transform group-hover:scale-110" />
              </button>
            </div>
          ) : (
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-white border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow relative group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${contact.type === 'client' ? 'bg-green-500' : 'bg-orange-400'}`}>
                    {contact.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary truncate">{contact.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase">{contact.type === 'lead' ? 'Lead' : 'Cliente'}</p>
                    {contact.description && (
                      <p className="text-[11px] text-muted-foreground mt-2 border-t pt-2 line-clamp-2 italic" title={contact.description}>
                        {contact.description}
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
