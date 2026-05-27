
"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
  Home, 
  Building2, 
  Factory, 
  Signpost, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Barcode, 
  FolderOpen, 
  MapPin, 
  FileText,
  Plus,
  Map as MapIcon,
  ThumbsUp,
  X,
  Search,
  List as ListIcon,
  UserPlus,
  Key,
  Info
} from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const STEPS = [
  { id: 1, label: "Dados Principais" },
  { id: 2, label: "Características" },
  { id: 3, label: "Informações Detalhadas" },
  { id: 4, label: "Transações e Valores" },
  { id: 5, label: "Divulgação" },
  { id: 6, label: "Parabéns" },
]

const PROPERTY_TYPES = [
  { value: "apartamento", label: "Apartamento" },
  { value: "area", label: "Área" },
  { value: "area-lazer", label: "Área de Lazer" },
  { value: "box-garagem", label: "Box/Garagem" },
  { value: "casa", label: "Casa" },
  { value: "chacara", label: "Chácara" },
  { value: "ilha", label: "Ilha" },
  { value: "rancho", label: "Rancho" },
  { value: "terreno-lote", label: "Terreno/Lote" },
  { value: "village", label: "Village" },
]

const CATEGORIES_MAP: Record<string, { value: string, label: string }[]> = {
  casa: [
    { value: "padrao", label: "Padrão" },
    { value: "bangalo", label: "Bangalô" },
    { value: "cabana", label: "Cabana" },
    { value: "casa-canadense", label: "Casa Canadense" },
    { value: "casa-container", label: "Casa Container" },
    { value: "casa-condominio", label: "Casa de Condomínio" },
    { value: "casa-geminada", label: "Casa Geminada" },
    { value: "chale", label: "Chalé" },
    { value: "edicula", label: "Edícula" },
    { value: "sobrado-duplex", label: "Sobrado/Duplex" },
    { value: "sobrado-triplex", label: "Sobrado/Triplex" },
    { value: "sobreposta-alta", label: "Sobreposta Alta" },
    { value: "sobreposta-baixa", label: "Sobreposta Baixa" },
    { value: "tiny-house", label: "Tiny House" },
    { value: "townhouse", label: "Townhouse" },
  ],
  apartamento: [
    { value: "padrao", label: "Padrão" },
    { value: "1-por-andar", label: "1 por Andar" },
    { value: "duplex", label: "Apartamento Duplex" },
    { value: "area-privativa", label: "Área Privativa" },
    { value: "cobertura-duplex", label: "Cobertura Duplex" },
    { value: "cobertura-padrao", label: "Cobertura Padrão" },
    { value: "cobertura-triplex", label: "Cobertura Triplex" },
    { value: "flat", label: "Flat" },
    { value: "garden", label: "Garden" },
    { value: "kitnet", label: "Kitnet" },
    { value: "loft", label: "Loft" },
    { value: "penthouse", label: "Penthouse" },
    { value: "sala-living", label: "Sala Living" },
    { value: "studio", label: "Studio" },
  ],
  "terreno-lote": [
    { value: "padrao", label: "Padrão" },
    { value: "condominio", label: "Terreno/Lote em Condomínio" },
  ]
}

const DEFAULT_CATEGORIES = [{ value: "padrao", label: "Padrão" }]

const CHARACTERISTICS = {
  wellness: [
    "Adega", "Ambientes Integrados", "Aquário", "Aquecedor", "Ar condicionado", "Arandelas", "Armário de Cozinha",
    "Armário Embutido", "Armário no Banheiro", "Banheira", "Box Blindex", "Churrasqueira na Sacada",
    "Churrasqueira na Varanda", "Closet", "Copa", "Cozinha Americana", "Cozinha Gourmet", "Cozinha Grande",
    "Demi-suíte", "Escritório", "Fechadura Digital", "Frente para o mar", "Hidromassagem", "Home Office",
    "Janela Panorâmica", "Jardim de Inverno", "Lareira", "Lavabo", "Lavanderia", "Mobiliado", "Móveis Planejados",
    "Ofurô", "Pé Direito Duplo", "Quintal", "Sacada", "Sacada Fechada com Vidro", "Sacada Gourmet", "Sala de jantar",
    "Sala Grande", "Semimobiliado", "Smart Home", "Solarium", "Varanda", "Varanda Fechada com Vidro",
    "Varanda Gourmet", "Vista Panorâmica", "Vista para a Montanha", "Vista para o Lago", "Vista para o Mar"
  ],
  security: [
    "Alarme", "Câmera de Segurança", "Cerca", "Circuito de Segurança", "Guarita", "Guarita Blindada", "Interfone",
    "Muro de Vidro", "Muros e Grades", "Portão Eletrônico", "Portaria", "Portaria 24hs", "Ronda 24hs"
  ],
  leisure: [
    "Academia", "Aceita Pet", "Área de Lazer", "Árvore Frutífera", "Arvorismo", "Bar", "Bar na Piscina", "Beauty Care",
    "Biblioteca", "Campo de Futebol", "Campo de Golfe", "Centro de Estética", "Children Care", "Churrasqueira",
    "Churrasqueira à Carvão", "Churrasqueira à Gás", "Churrasqueira Ecológica", "Cinema", "Deck", "Deck Molhado",
    "Espaço Crossfit", "Espaço Fitness", "Espaço Gourmet", "Espaço Pet", "Espaço Teen", "Espaço Verde/Parque",
    "Espaço Yoga", "Espaço Zen", "Horta", "Jacuzzi", "Jardim", "Lago", "Mini Quadra", "Minimercado", "Muro de Escalada",
    "Orquidário", "Piscina", "Piscina Climatizada", "Piscina Coberta", "Piscina Infantil", "Piscina Olímpica",
    "Piscina para Adulto", "Piscina Privativa", "Piscina Semiolímpica", "Pista de Cooper", "Pista de Skate",
    "Playground", "Pomar", "Praça", "Pub", "Quadra de Beach Tennis", "Quadra de Futebol", "Quadra de Futevôlei",
    "Quadra de Squash", "Quadra de Tênis", "Quadra de Vôlei de Praia", "Quadra Poliesportiva", "Sala de Massagem",
    "Salão de Festas", "Salão de Jogos", "Sauna", "Spa", "Surf Indoor"
  ],
  infrastructure: [
    "Acessibilidade", "Área de Serviço", "Balaústre", "Bicicletário", "Canil", "Carregador de Carro Elétrico",
    "Chuveiro a Gás", "Coffee Shop", "Coleta Seletiva de Lixo", "Condomínio Inteligente", "Condomínio Sustentável",
    "Coworking", "Dependência Empregada", "Depósito", "Despensa", "Edícula", "Elevador", "Elevador de Emergência",
    "Energia Solar", "Esquina", "Estacionamento Visitantes", "Forno de Pizza", "Garagem", "Garagem Coberta",
    "Garagem Coletiva", "Garagem Demarcada", "Gás Encanado", "Gerador", "Guarda Volumes", "Hall de Entrada",
    "Heliponto", "Isolamento Acústico", "Isolamento Térmico", "Louceiro", "Manobrista", "Marina", "Mini Golf",
    "Pista de Atletismo", "Pista de Pouso", "Rampas", "Sala de Reunião", "Salão de Convenção", "TV a Cabo",
    "Vestiário", "Wi-Fi"
  ],
  finishing: [
    "Carpete", "Cerâmica", "Cimento Queimado", "Drywall", "Gesso", "Granito", "Janela de Alumínio", "Laje",
    "Mármore", "Papel de Parede", "Piso de Madeira", "Piso Elevado", "Piso Laminado", "Piso Vinílico", "Platibanda",
    "Porcelanato", "Sanca", "Teto rebaixado"
  ]
}

const STATES = [
  { value: "AC", label: "Acre" }, { value: "AL", label: "Alagoas" }, { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" }, { value: "BA", label: "Bahia" }, { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" }, { value: "ES", label: "Espírito Santo" }, { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" }, { value: "MT", label: "Mato Grosso" }, { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" }, { value: "PA", label: "Pará" }, { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" }, { value: "PE", label: "Pernambuco" }, { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" }, { value: "RN", label: "Rio Grande do Norte" }, { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" }, { value: "RR", label: "Roraima" }, { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" }, { value: "SE", label: "Sergipe" }, { value: "TO", label: "Tocantins" },
]

export default function NewPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [purpose, setPurpose] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  
  // Map State
  const [mapConfirmed, setMapConfirmed] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // Step 3 States
  const [iptuMode, setIptuMode] = useState("monthly")
  const [condoMode, setCondoMode] = useState("not_exempt")
  const [keysAvailable, setKeysAvailable] = useState<string>("")

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePropertyTypeChange = (value: string) => {
    setPropertyType(value)
    setCategory("") 
  }

  const getCategories = () => {
    if (!propertyType) return []
    return CATEGORIES_MAP[propertyType] || DEFAULT_CATEGORIES
  }

  const currentCategories = getCategories()

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        {/* Page Header */}
        <div className="bg-white border-b px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-primary">Inserir novo imóvel</h1>
          </div>
        </div>

        {/* Wizard Progress */}
        <div className="bg-white border-b overflow-x-auto">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between py-6 min-w-[600px]">
              {STEPS.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center gap-2 flex-1 relative ${step.id !== 6 ? 'after:content-[""] after:h-[2px] after:w-full after:bg-muted after:absolute after:top-4 after:left-1/2 after:-z-0' : ''}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors
                      ${currentStep >= step.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                      ${currentStep === step.id ? 'ring-4 ring-primary/20' : ''}
                    `}
                  >
                    {step.id}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-tight text-center ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="w-full">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-8 space-y-12">
                  {currentStep === 1 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {/* Código, Finalidade, Tipo e Categoria */}
                      <div className="max-w-2xl mx-auto w-full space-y-8">
                        {/* Código */}
                        <section className="space-y-4">
                          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                            <Barcode className="w-4 h-4" />
                            Código do Imóvel
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="auto_code">Código Automático</Label>
                            <Input id="auto_code" value="1" readOnly className="bg-muted font-mono h-11" />
                          </div>
                        </section>

                        {/* Finalidade */}
                        <section className="space-y-4">
                          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                            <FolderOpen className="w-4 h-4" />
                            Qual é a finalidade desse imóvel?
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                              { id: "residencial", label: "Residencial", icon: <Home className="w-6 h-6" /> },
                              { id: "comercial", label: "Comercial", icon: <Building2 className="w-6 h-6" /> },
                              { id: "industrial", label: "Industrial", icon: <Factory className="w-6 h-6" /> },
                              { id: "rural", label: "Rural", icon: <Signpost className="w-6 h-6" /> },
                            ].map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setPurpose(item.id)}
                                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all gap-3
                                  ${purpose === item.id 
                                    ? 'border-accent bg-accent/5 text-accent shadow-md' 
                                    : 'border-muted hover:border-primary/20 text-muted-foreground hover:bg-muted/50'}
                                `}
                              >
                                {item.icon}
                                <span className="text-xs font-bold uppercase">{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </section>

                        {/* Tipos e Categorias */}
                        <section className="space-y-6">
                          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                            <Home className="w-4 h-4" />
                            Qual tipo de imóvel você quer inserir?
                          </div>
                          
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label>Escolha um tipo de imóvel</Label>
                              <Select disabled={!purpose} value={propertyType} onValueChange={handlePropertyTypeChange}>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  {PROPERTY_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Escolha uma categoria</Label>
                              <Select disabled={!propertyType} value={category} onValueChange={setCategory}>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  {currentCategories.map((cat) => (
                                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Endereço e Localização */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t">
                        <div className="space-y-8">
                          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                            <MapPin className="w-4 h-4" />
                            Onde fica o imóvel?
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-primary/80">Selecione o endereço</Label>
                              <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-accent transition-colors">
                                   <Search className="w-4 h-4" />
                                </div>
                                <Input placeholder="Digite o nome da rua e número" className="h-11 pl-10 border-destructive shadow-sm focus-visible:ring-destructive/20 pr-10" />
                                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground/40 hover:text-destructive transition-colors"><X className="w-4 h-4" /></button>
                                <p className="text-[11px] text-destructive font-bold mt-1.5 px-1">Esse campo é obrigatório.</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary/80">Loteamento / Cond / Emp <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                                <Input placeholder="Selecione" className="h-11" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary/80">Torre/Bloco <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                                <Input placeholder="ex.: Bloco A" className="h-11" />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary/80">Número/Lote</Label>
                                <div className="space-y-1.5">
                                  <Input placeholder="ex.: 980" className="h-11 border-destructive shadow-sm" />
                                  <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary/80">Complemento <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                                <Input placeholder="ex.: Apto 42" className="h-11" />
                              </div>
                            </div>

                            <div className="grid grid-cols-[100px_1fr] gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary/80">Estado</Label>
                                <Select>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="UF" />
                                  </SelectTrigger>
                                  <SelectContent>{STATES.map((s) => (<SelectItem key={s.value} value={s.value}>{s.value}</SelectItem>))}</SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm font-bold text-primary/80">Cidade</Label>
                                <div className="space-y-1.5">
                                  <Input placeholder="Digite o nome da cidade" className="h-11 border-destructive shadow-sm" />
                                  <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-primary/80">Bairro</Label>
                              <div className="space-y-1.5">
                                <Input placeholder="Digite o nome do bairro" className="h-11 border-destructive shadow-sm" />
                                <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-primary/80">CEP</Label>
                              <div className="space-y-1.5">
                                <Input placeholder="00000-000" className="h-11 border-destructive shadow-sm" />
                                <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                            <MapIcon className="w-4 h-4" />
                            Localização no mapa
                          </div>
                          <div className="relative aspect-square w-full bg-[#E5E3DF] rounded-xl border border-muted shadow-inner overflow-hidden group">
                            <div className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${showMap ? 'opacity-100' : 'opacity-40 grayscale'}`} style={{ backgroundImage: "url('https://picsum.photos/seed/map-prime/1000/1000')" }} />
                            {mapConfirmed && (<div className="absolute top-4 right-4 z-20 animate-in fade-in slide-in-from-top-2 duration-300"><span className="bg-[#4CAF50] text-white px-3 py-1.5 rounded flex items-center gap-2 text-[10px] font-bold uppercase shadow-lg border border-white/20"><ThumbsUp className="w-3.5 h-3.5" />Localização confirmada</span></div>)}
                            {showMap && (<div className="absolute bottom-4 left-4 z-20 flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {!mapConfirmed ? (<><Button size="sm" onClick={() => setMapConfirmed(true)} className="bg-[#334659] hover:bg-[#243447] text-white font-bold uppercase text-[10px] h-9 px-6 rounded shadow-lg">Confirmar</Button><Button size="sm" variant="outline" onClick={() => { setShowMap(false); setMapConfirmed(false); }} className="bg-white hover:bg-muted border-[#334659] text-[#334659] font-bold uppercase text-[10px] h-9 px-6 rounded shadow-lg">Resetar</Button></>) : (<Button size="sm" variant="outline" onClick={() => setMapConfirmed(false)} className="bg-white hover:bg-muted border-[#334659] text-[#334659] font-bold uppercase text-[10px] h-9 px-6 rounded shadow-lg">Alterar</Button>)}
                              </div>)}
                            {!showMap && (<div className="absolute inset-0 flex items-center justify-center p-8 z-20"><Button onClick={() => setShowMap(true)} className="bg-[#334659] hover:bg-[#243447] text-white h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-2xl transition-transform hover:scale-105 rounded">Confirme a localização no mapa</Button></div>)}
                            {showMap && (<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mb-8"><div className="relative animate-bounce duration-1000"><div className="w-10 h-10 bg-primary rounded-full rounded-bl-none rotate-45 border-2 border-white shadow-xl flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-full -rotate-45" /></div><div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-[100%] blur-[1px]" /></div></div>)}
                            <div id="map" className="h-full w-full" />
                          </div>
                          {!mapConfirmed && showMap && (<div className="bg-destructive/5 border border-destructive/20 rounded p-4 flex items-start gap-3"><div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs font-bold">!</span></div><p className="text-sm font-bold text-destructive">Confirme a localização no mapa</p></div>)}
                        </div>
                      </div>

                      {/* Dados Principais do Imóvel */}
                      <section className="space-y-8 pt-8 border-t">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                          <FileText className="w-4 h-4" />
                          Dados principais do imóvel
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Quartos</Label><Input type="number" placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Salas <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input type="number" placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Suítes <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input type="number" placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Banheiros</Label><Input type="number" placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Vagas de Garagem <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input type="number" placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Área Útil (m²) <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Área Total <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input placeholder="0" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Área Construída <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input placeholder="" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Largura do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input placeholder="" className="h-11" /></div>
                          <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Comprimento do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label><Input placeholder="" className="h-11" /></div>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="extra-info" className="border-none">
                            <AccordionTrigger className="flex items-center gap-2 hover:no-underline py-2"><span className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2"><Plus className="w-4 h-4" />Adicionar outras medidas e informações</span></AccordionTrigger>
                            <AccordionContent className="pt-6 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Área Comum</Label><Input placeholder="0" className="h-11" /></div>
                                <div className="space-y-2"><Label className="text-sm font-bold text-primary/80">Ano de Construção</Label><Input type="number" placeholder="Ex: 2020" className="h-11" /></div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </section>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                        <ListIcon className="w-4 h-4" />
                        Quais são as características?
                      </div>

                      {/* Bem estar e Comodidade */}
                      <section className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">Bem estar e Comodidade</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {CHARACTERISTICS.wellness.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox id={item} className="border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white" />
                              <label htmlFor={item} className="text-sm font-medium leading-none cursor-pointer hover:text-accent transition-colors">{item}</label>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Segurança */}
                      <section className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">Segurança</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {CHARACTERISTICS.security.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox id={item} className="border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white" />
                              <label htmlFor={item} className="text-sm font-medium leading-none cursor-pointer hover:text-accent transition-colors">{item}</label>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Lazer e Natureza */}
                      <section className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">Lazer e Natureza</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {CHARACTERISTICS.leisure.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox id={item} className="border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white" />
                              <label htmlFor={item} className="text-sm font-medium leading-none cursor-pointer hover:text-accent transition-colors">{item}</label>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Infraestrutura */}
                      <section className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">Infraestrutura</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {CHARACTERISTICS.infrastructure.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox id={item} className="border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white" />
                              <label htmlFor={item} className="text-sm font-medium leading-none cursor-pointer hover:text-accent transition-colors">{item}</label>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Acabamento */}
                      <section className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">Acabamento</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {CHARACTERISTICS.finishing.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox id={item} className="border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white" />
                              <label htmlFor={item} className="text-sm font-medium leading-none cursor-pointer hover:text-accent transition-colors">{item}</label>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {/* Donos do Imóvel */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                          <UserPlus className="w-4 h-4" />
                          Informe o(s) dono(s) do imóvel
                        </div>
                        <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs h-11 px-6">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar proprietário
                        </Button>
                      </section>

                      {/* Controle de Chaves */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                          <Key className="w-4 h-4" />
                          Controle de Chaves
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Chave Disponível? <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select value={keysAvailable} onValueChange={setKeysAvailable}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sim">Sim</SelectItem>
                                <SelectItem value="nao">Não</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Local da Chave <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select disabled={keysAvailable !== "sim"}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="filial">Filial</SelectItem>
                                <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                                <SelectItem value="proprietario">Proprietário(a)</SelectItem>
                                <SelectItem value="alexandre">Alexandre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-full space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Informações extras sobre a chave <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Textarea rows={5} placeholder="" className="custom-border no-resize" />
                          </div>
                        </div>
                      </section>

                      {/* Informações detalhadas */}
                      <section className="space-y-8">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                          <Info className="w-4 h-4" />
                          Informações detalhadas
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Condição do imóvel <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="novo">Novo</SelectItem>
                                <SelectItem value="usado">Usado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Estágio da Reforma <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="reformado">Reformado</SelectItem>
                                <SelectItem value="para-reformar">Para Reformar</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Estágio da Obra <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pronto">Pronto para morar</SelectItem>
                                <SelectItem value="construcao">Em construção</SelectItem>
                                <SelectItem value="planta">Na planta</SelectItem>
                                <SelectItem value="lancamento">Lançamento</SelectItem>
                                <SelectItem value="breve">Breve lançamento</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Ocupação do Imóvel <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                            <Select>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vago">Vago</SelectItem>
                                <SelectItem value="proprietario">Ocupado com Proprietário</SelectItem>
                                <SelectItem value="inquilino">Ocupado com Inquilino</SelectItem>
                                <SelectItem value="outros">Ocupado (Outros)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* IPTU e Condomínio */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4">
                          <div className="space-y-4">
                            <Label className="text-sm font-bold text-primary/80">Modo do IPTU</Label>
                            <div className="flex flex-wrap gap-2">
                              {["monthly", "annual", "exempt"].map((mode) => (
                                <Button
                                  key={mode}
                                  type="button"
                                  onClick={() => setIptuMode(mode)}
                                  variant={iptuMode === mode ? "default" : "outline"}
                                  className={`h-10 px-6 font-bold uppercase text-[10px] rounded-lg transition-all
                                    ${iptuMode === mode ? 'bg-primary text-white shadow-md' : 'border-muted text-muted-foreground hover:bg-muted/50'}
                                  `}
                                >
                                  {mode === "monthly" ? "Mensal" : mode === "annual" ? "Anual" : "Isento"}
                                </Button>
                              ))}
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-primary/80">Valor do IPTU/ITR <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/60 font-bold text-xs">R$</div>
                                <Input disabled={iptuMode === "exempt"} placeholder="0,00" className="h-11 pl-10" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-sm font-bold text-primary/80">Modo do Condomínio</Label>
                            <div className="flex flex-wrap gap-2">
                              {["not_exempt", "exempt"].map((mode) => (
                                <Button
                                  key={mode}
                                  type="button"
                                  onClick={() => setCondoMode(mode)}
                                  variant={condoMode === mode ? "default" : "outline"}
                                  className={`h-10 px-6 font-bold uppercase text-[10px] rounded-lg transition-all
                                    ${condoMode === mode ? 'bg-primary text-white shadow-md' : 'border-muted text-muted-foreground hover:bg-muted/50'}
                                  `}
                                >
                                  {mode === "not_exempt" ? "Não Isento" : "Isento"}
                                </Button>
                              ))}
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-bold text-primary/80">Valor do Condomínio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/60 font-bold text-xs">R$</div>
                                <Input disabled={condoMode === "exempt"} placeholder="0,00" className="h-11 pl-10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {currentStep > 3 && currentStep < 6 && (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground animate-in fade-in duration-500">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center"><FileText className="w-8 h-8" /></div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">Próximo passo: {STEPS[currentStep - 1].label}</h3>
                        <p className="text-sm">Preencha as informações necessárias para continuar.</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><CheckCircle2 className="w-12 h-12" /></div>
                      <div className="space-y-2"><h2 className="text-3xl font-bold text-primary">Parabéns!</h2><p className="text-lg text-muted-foreground">O imóvel foi cadastrado com sucesso no sistema.</p></div>
                      <Link href="/"><Button className="btn-custom-red h-12 px-10 rounded-lg font-bold uppercase tracking-wider shadow-lg">Voltar ao Dashboard</Button></Link>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  {currentStep < 6 && (
                    <div className="pt-8 border-t flex items-center justify-between">
                      <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="text-muted-foreground font-bold uppercase text-xs"><ArrowLeft className="w-4 h-4 mr-2" />Voltar</Button>
                      <Button onClick={handleNext} className="btn-custom-red h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-lg">Continuar<ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
