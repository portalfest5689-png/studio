
"use client"

import { useState, useRef, useEffect } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
  MapPin, 
  FileText,
  Map as MapIcon,
  ThumbsUp,
  Info,
  DollarSign,
  Globe,
  FolderOpen,
  Search,
  Plus,
  ChevronDown,
  List as ListIcon,
  UserPlus,
  Key,
  EyeOff,
  Contact,
  Paperclip,
  Camera,
  Youtube,
  Monitor,
  Megaphone,
  ExternalLink,
  Trash
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const STEPS = [
  { id: 1, label: "Dados Principais" },
  { id: 2, label: "Localização" },
  { id: 3, label: "Características" },
  { id: 4, label: "Características Detalhadas" },
  { id: 5, label: "Detalhes" },
  { id: 6, label: "Negociação" },
  { id: 7, label: "Divulgação" },
  { id: 8, label: "Parabéns" },
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
    { value: "cobertura", label: "Cobertura" },
    { value: "flat", label: "Flat" },
    { value: "loft", label: "Loft" },
    { value: "studio", label: "Studio" },
    { value: "duplex", label: "Duplex" },
  ],
}

export default function NewPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [purpose, setPurpose] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    category: "",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    allotment: "",
    tower: "",
    complement: "",
    bedrooms: "0",
    bathrooms: "0",
    suites: "0",
    parkingSpaces: "0",
    usefulArea: "0",
    livingRooms: "0",
    totalArea: "0",
    builtArea: "0",
    terrainWidth: "",
    terrainLength: "",
    sellPrice: "0,00",
    rentPrice: "0,00",
    condoFee: "0,00",
    iptu: "0,00",
    buildingState: "Pronto para morar",
    isAdvertised: true,
    responsible: "XANDAO CORRETOR",
    characteristics: [] as string[],
    hasKeys: "",
    keysLocation: "",
    keysInfo: "",
    propertyStatus: "",
    reformState: "",
    occupation: "",
    iptuMode: "monthly",
    condoMode: "not_exempt",
    iptuNumber: "",
    incraNumber: "",
    deedStatus: "",
    registrationNumber: "",
    notaryOffice: "",
    electricityNumber: "",
    waterNumber: "",
    internalObservations: "",
    canSell: false,
    canRent: false,
    canSeason: false,
    authorizedForTrading: "",
    contractStartDate: "",
    contractDurationDays: "",
    contractEndDate: "",
    webTitle: "",
    webText: ""
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    if (currentStep === 7) {
      const saved = localStorage.getItem('crm_properties')
      const properties = saved ? JSON.parse(saved) : []
      const newProperty = {
        ...formData,
        images: images,
        id: Math.random().toString(36).substr(2, 9),
        code: (properties.length + 1).toString(),
        title: formData.webTitle || formData.category || formData.propertyType || "Imóvel",
        status: "Ativo"
      }
      localStorage.setItem('crm_properties', JSON.stringify([newProperty, ...properties]))
    }
    if (currentStep < 8) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <CRMHeader />

      <main className="pb-24">
        <div className="bg-white border-b px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-primary">Inserir novo imóvel</h1>
          </div>
        </div>

        <div className="bg-white border-b overflow-x-auto">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between py-6 min-w-[700px]">
              {STEPS.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center gap-2 flex-1 relative ${step.id !== 8 ? 'after:content-[""] after:h-[2px] after:w-full after:bg-muted after:absolute after:top-4 after:left-1/2 after:-z-0' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors ${currentStep >= step.id ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'}`}>
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
          <Card className="border-none shadow-sm">
            <CardContent className="pt-8">
              
              {currentStep === 1 && (
                <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Barcode className="w-4 h-4" />Código do Imóvel</div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Código Automático</Label>
                      <Input value="1" readOnly className="bg-muted font-mono h-11" />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><FolderOpen className="w-4 h-4" />Qual é a finalidade desse imóvel?</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { id: 'residencial', label: 'Residencial', icon: <Home className="w-6 h-6" /> },
                        { id: 'comercial', label: 'Comercial', icon: <Building2 className="w-6 h-6" /> },
                        { id: 'industrial', label: 'Industrial', icon: <Factory className="w-6 h-6" /> },
                        { id: 'rural', label: 'Rural', icon: <Signpost className="w-6 h-6" /> },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPurpose(item.id)}
                          className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all gap-3 ${
                            purpose === item.id 
                              ? "border-primary bg-primary/5 text-primary shadow-md" 
                              : "border-muted hover:border-primary/20 text-muted-foreground hover:bg-muted/50"
                          }`}
                        >
                          {item.icon}
                          <span className="text-xs font-bold uppercase">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Home className="w-4 h-4" />Qual tipo de imóvel você quer inserir?</div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Escolha um tipo de imóvel</Label>
                        <Select 
                          value={formData.propertyType}
                          onValueChange={(v) => setFormData({...formData, propertyType: v, category: "Selecione"})}
                        >
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            {PROPERTY_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Escolha uma categoria</Label>
                        <Select 
                          value={formData.category}
                          onValueChange={(v) => setFormData({...formData, category: v})}
                          disabled={!formData.propertyType}
                        >
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            {(CATEGORIES_MAP[formData.propertyType] || [{ value: "padrao", label: "Padrão" }]).map((cat) => (
                              <SelectItem key={cat.value} value={cat.label}>{cat.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {currentStep === 2 && (
                <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                        <MapPin className="w-4 h-4" />Onde fica o imóvel?
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">Selecione o endereço</Label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/40">
                              <Search className="w-4 h-4" />
                            </div>
                            <Input 
                              className="h-11 pl-10 border-destructive shadow-sm" 
                              placeholder="Digite o nome da rua e número" 
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                            />
                            <p className="text-[11px] text-destructive font-bold mt-1.5 px-1">Esse campo é obrigatório.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">
                              Loteamento / Cond / Emp <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                            </Label>
                            <Input 
                              className="h-11" 
                              placeholder="Selecione"
                              value={formData.allotment}
                              onChange={(e) => setFormData({...formData, allotment: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">
                              Torre/Bloco <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                            </Label>
                            <Input 
                              className="h-11" 
                              placeholder="ex.: Bloco A"
                              value={formData.tower}
                              onChange={(e) => setFormData({...formData, tower: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Número/Lote</Label>
                            <div className="space-y-1.5">
                              <Input 
                                className="h-11 border-destructive shadow-sm" 
                                placeholder="ex.: 980" 
                                value={formData.number}
                                onChange={(e) => setFormData({...formData, number: e.target.value})}
                              />
                              <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">
                              Complemento <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                            </Label>
                            <Input 
                              className="h-11" 
                              placeholder="ex.: Apto 42"
                              value={formData.complement}
                              onChange={(e) => setFormData({...formData, complement: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-[100px_1fr] gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Estado</Label>
                            <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                              <SelectTrigger className="h-11"><SelectValue placeholder="UF" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SP">SP</SelectItem>
                                <SelectItem value="RJ">RJ</SelectItem>
                                <SelectItem value="MG">MG</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Cidade</Label>
                            <div className="space-y-1.5">
                              <Input 
                                className="h-11 border-destructive shadow-sm" 
                                placeholder="Digite o nome da cidade" 
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                              />
                              <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">Bairro</Label>
                          <div className="space-y-1.5">
                            <Input 
                              className="h-11 border-destructive shadow-sm" 
                              placeholder="Digite o nome do bairro" 
                              value={formData.neighborhood}
                              onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                            />
                            <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">CEP</Label>
                          <div className="space-y-1.5">
                            <Input 
                              className="h-11 border-destructive shadow-sm" 
                              placeholder="00000-000" 
                              value={formData.zipCode}
                              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                            />
                            <p className="text-[11px] text-destructive font-bold">Esse campo é obrigatório.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                        <MapIcon className="w-4 h-4" />Localização no mapa
                      </div>
                      <div className="map-wrapper relative aspect-square w-full bg-[#E5E3DF] rounded-xl border shadow-inner overflow-hidden">
                        <div 
                          className="map-background absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-40 grayscale" 
                          style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=-23.5505,-46.6333&zoom=15&size=1000x1000&key=AIzaSyDgw2dd2JM2_SEHDJiRz8-rHuezWsJ0-Go')" }} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                          <button 
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-[#334659] hover:bg-[#243447] text-white h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-2xl rounded transition-all transform hover:scale-105" 
                            type="button"
                          >
                            Confirme a localização no mapa
                          </button>
                        </div>
                        <div id="map"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <section className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                    <FileText className="w-4 h-4" />Dados principais do imóvel
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Quartos</Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Salas <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.livingRooms} onChange={(e) => setFormData({...formData, livingRooms: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Suítes <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.suites} onChange={(e) => setFormData({...formData, suites: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Banheiros</Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Vagas de Garagem <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.parkingSpaces} onChange={(e) => setFormData({...formData, parkingSpaces: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Área Útil (m²) <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" value={formData.usefulArea} onChange={(e) => setFormData({...formData, usefulArea: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Área Total <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" value={formData.totalArea} onChange={(e) => setFormData({...formData, totalArea: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Área Construída <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" value={formData.builtArea} onChange={(e) => setFormData({...formData, builtArea: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Largura do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" value={formData.terrainWidth} onChange={(e) => setFormData({...formData, terrainWidth: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Comprimento do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" value={formData.terrainLength} onChange={(e) => setFormData({...formData, terrainLength: e.target.value})} />
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="more-info" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                          <Plus className="w-4 h-4" />Adicionar outras medidas e informações
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="p-4 bg-muted/20 rounded-lg border border-dashed text-center text-muted-foreground italic text-sm">
                          Funcionalidade adicional para medidas específicas será liberada na próxima versão.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              )}

              {currentStep === 4 && (
                <section className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                    <ListIcon className="w-4 h-4" />Quais são as características?
                  </div>
                  <div className="space-y-12">
                    {[
                      { title: "Bem estar e Comodidade", items: ["Adega", "Ambientes Integrados", "Aquário", "Aquecedor", "Ar condicionado", "Arandelas", "Armário de Cozinha", "Armário Embutido", "Armário no Banheiro", "Banheira", "Box Blindex", "Churrasqueira na Sacada", "Churrasqueira na Varanda", "Closet", "Copa", "Cozinha Americana", "Cozinha Gourmet", "Cozinha Grande", "Demi-suíte", "Escritório", "Fechadura Digital", "Frente para o mar", "Hidromassagem", "Home Office", "Janela Panorâmica", "Jardim de Inverno", "Lareira", "Lavabo", "Lavanderia", "Mobiliado", "Móveis Planejados", "Ofurô", "Pé Direito Duplo", "Quintal", "Sacada", "Sacada Fechada com Vidro", "Sacada Gourmet", "Sala de jantar", "Sala Grande", "Semimobiliado", "Smart Home", "Solarium", "Varanda", "Varanda Fechada com Vidro", "Varanda Gourmet", "Vista Panorâmica", "Vista para a Montanha", "Vista para o Lago", "Vista para o Mar"] },
                      { title: "Segurança", items: ["Alarme", "Câmera de Segurança", "Cerca", "Circuito de Segurança", "Guarita", "Guarita Blindada", "Interfone", "Muro de Vidro", "Muros e Grades", "Portão Eletrônico", "Portaria", "Portaria 24hs", "Ronda 24hs"] },
                      { title: "Lazer e Natureza", items: ["Academia", "Aceita Pet", "Área de Lazer", "Árvore Frutífera", "Arvorismo", "Bar", "Bar na Piscina", "Beauty Care", "Biblioteca", "Campo de Futebol", "Campo de Golfe", "Centro de Estética", "Children Care", "Churrasqueira", "Churrasqueira à Carvão", "Churrasqueira à Gás", "Churrasqueira Ecológica", "Cinema", "Deck", "Deck Molhado", "Espaço Crossfit", "Espaço Fitness", "Espaço Gourmet", "Espaço Pet", "Espaço Teen", "Espaço Verde/Parque", "Espaço Yoga", "Zen space", "Horta", "Jacuzzi", "Jardim", "Lago", "Mini Quadra", "Minimercado", "Muro de Escalada", "Orquidário", "Piscina", "Piscina Climatizada", "Piscina Coberta", "Piscina Infantil", "Piscina Olímpica", "Piscina para Adulto", "Piscina Privativa", "Piscina Semiolímpica", "Pista de Cooper", "Pista de Skate", "Playground", "Pomar", "Praça", "Pub", "Quadra de Beach Tennis", "Quadra de Futebol", "Quadra de Futevôlei", "Quadra de Squash", "Quadra de Tênis", "Quadra de Vôlei de Praia", "Quadra Poliesportiva", "Sala de Massagem", "Salão de Festas", "Salão de Jogos", "Sauna", "Spa", "Surf Indoor"] },
                      { title: "Infraestrutura", items: ["Acessibilidade", "Área de Serviço", "Balaústre", "Bicicletário", "Canil", "Carregador de Carro Elétrico", "Chuveiro a Gás", "Coffee Shop", "Coleta Seletiva de Lixo", "Condomínio Inteligente", "Condomínio Sustentável", "Coworking", "Dependência Empregada", "Depósito", "Despensa", "Edícula", "Elevador", "Elevador de Emergência", "Energia Solar", "Esquina", "Estacionamento Visitantes", "Forno de Pizza", "Garagem", "Garagem Coberta", "Garagem Coletiva", "Garagem Demarcada", "Gás Encanado", "Gerador", "Guarda Volumes", "Hall de Entrada", "Heliponto", "Isolamento Acústico", "Isolamento Térmico", "Louceiro", "Manobrista", "Marina", "Mini Golf", "Pista de Atletismo", "Pista de Pouso", "Rampas", "Sala de Reunião", "Salão de Convenção", "TV a Cabo", "Vestiário", "Wi-Fi"] },
                      { title: "Acabamento", items: ["Carpete", "Cerâmica", "Cimento Queimado", "Drywall", "Gesso", "Granito", "Janela de Alumínio", "Laje", "Mármore", "Papel de Parede", "Piso de Madeira", "Piso Elevado", "Piso Laminado", "Piso Vinílico", "Platibanda", "Porcelanato", "Sanca", "Teto rebaixado"] }
                    ].map((category) => (
                      <div key={category.title} className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">{category.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {category.items.map((item) => (
                            <div key={item} className="flex items-center space-x-3">
                              <Checkbox id={item} />
                              <Label htmlFor={item} className="text-sm cursor-pointer hover:text-primary transition-colors">{item}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {currentStep === 5 && (
                <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <UserPlus className="w-4 h-4" />Informe o(s) dono(s) do imóvel
                    </div>
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs px-6 h-12">
                      <Plus className="w-4 h-4 mr-2" /> Adicionar proprietário
                    </Button>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <Key className="w-4 h-4" />Controle de Chaves
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Chave Disponível? <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.hasKeys} onValueChange={(v) => setFormData({...formData, hasKeys: v})}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sim">Sim</SelectItem>
                            <SelectItem value="Não">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Local da Chave <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.keysLocation} onValueChange={(v) => setFormData({...formData, keysLocation: v})} disabled={formData.hasKeys !== "Sim"}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Filial">Filial</SelectItem>
                            <SelectItem value="Imobiliária">Imobiliária</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                            <SelectItem value="Proprietário(a)">Proprietário(a)</SelectItem>
                            <SelectGroup>
                              <SelectLabel>Corretores</SelectLabel>
                              <SelectItem value="XANDAO">XANDAO</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Informações extras sobre a chave <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Textarea rows={5} className="custom-border no-resize" value={formData.keysInfo} onChange={(e) => setFormData({...formData, keysInfo: e.target.value})} />
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <Info className="w-4 h-4" />Informações detalhadas
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Condição do imóvel <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.propertyStatus} onValueChange={(v) => setFormData({...formData, propertyStatus: v})}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Novo">Novo</SelectItem>
                            <SelectItem value="Usado">Usado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Estágio da Reforma <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.reformState} onValueChange={(v) => setFormData({...formData, reformState: v})} disabled={formData.propertyStatus !== "Usado"}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Reformado">Reformado</SelectItem>
                            <SelectItem value="Para Reformar">Para Reformar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Estágio da Obra <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.buildingState} onValueChange={(v) => setFormData({...formData, buildingState: v})}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pronto para morar">Pronto para morar</SelectItem>
                            <SelectItem value="Em construção">Em construção</SelectItem>
                            <SelectItem value="Na planta">Na planta</SelectItem>
                            <SelectItem value="Lançamento">Lançamento</SelectItem>
                            <SelectItem value="Breve lançamento">Breve lançamento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Ocupação do Imóvel <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.occupation} onValueChange={(v) => setFormData({...formData, occupation: v})}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Vago">Vago</SelectItem>
                            <SelectItem value="Ocupado com Proprietário">Ocupado com Proprietário</SelectItem>
                            <SelectItem value="Ocupado com Inquilino">Ocupado com Inquilino</SelectItem>
                            <SelectItem value="Ocupado (Outros)">Ocupado (Outros)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-sm font-bold text-primary/80">Modo do IPTU</Label>
                        <div className="flex gap-2">
                          {['monthly', 'annual', 'exempt'].map((mode) => (
                            <Button key={mode} type="button" variant={formData.iptuMode === mode ? "default" : "outline"} className={`flex-1 h-11 uppercase font-bold text-[10px] ${formData.iptuMode === mode ? 'bg-primary text-white' : 'text-primary/70'}`} onClick={() => setFormData({...formData, iptuMode: mode})}>{mode === 'monthly' ? 'Mensal' : mode === 'annual' ? 'Anual' : 'Isento'}</Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Valor do IPTU/ITR <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">R$</span><Input className="h-11 pl-10" placeholder="0" value={formData.iptu} onChange={(e) => setFormData({...formData, iptu: e.target.value})} /></div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-sm font-bold text-primary/80">Modo do Condomínio</Label>
                        <div className="flex gap-2">
                          {['not_exempt', 'exempt'].map((mode) => (
                            <Button key={mode} type="button" variant={formData.condoMode === mode ? "default" : "outline"} className={`flex-1 h-11 uppercase font-bold text-[10px] ${formData.condoMode === mode ? 'bg-primary text-white' : 'text-primary/70'}`} onClick={() => setFormData({...formData, condoMode: mode})}>{mode === 'not_exempt' ? 'Não Isento' : 'Isento'}</Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Valor do Condomínio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">R$</span><Input className="h-11 pl-10" placeholder="0" value={formData.condoFee} onChange={(e) => setFormData({...formData, condoFee: e.target.value})} /></div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <EyeOff className="w-4 h-4" />Informações confidenciais
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">IPTU Nº <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="01.1.123.1234.0001" value={formData.iptuNumber} onChange={(e) => setFormData({...formData, iptuNumber: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">CCIR Nº (INCRA) <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="011.121.458.745-2" value={formData.incraNumber} onChange={(e) => setFormData({...formData, incraNumber: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">Situação da Escritura <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                          <Select value={formData.deedStatus} onValueChange={(v) => setFormData({...formData, deedStatus: v})}>
                            <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Contrato sem procuração">Contrato sem procuração</SelectItem>
                              <SelectItem value="Contrato com procuração">Contrato com procuração</SelectItem>
                              <SelectItem value="Alienada">Alienada</SelectItem>
                              <SelectItem value="Definitiva">Definitiva</SelectItem>
                              <SelectItem value="Inventário">Inventário</SelectItem>
                              <SelectItem value="Laudêmio">Laudêmio</SelectItem>
                              <SelectItem value="Posse">Posse</SelectItem>
                              <SelectItem value="Regularizando">Regularizando</SelectItem>
                              <SelectItem value="Sem averbação da Construtora">Sem averbação da Construtora</SelectItem>
                              <SelectItem value="Sem Escritura">Sem Escritura</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">Matrícula Nº <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                          <Input className="h-11" placeholder="0" value={formData.registrationNumber} onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Cartório <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="ex: Registrado no Cartório Shoji, no Boqueirão" value={formData.notaryOffice} onChange={(e) => setFormData({...formData, notaryOffice: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">Energia Nº <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                          <Input className="h-11" placeholder="0" value={formData.electricityNumber} onChange={(e) => setFormData({...formData, electricityNumber: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-primary/80">Água Nº <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                          <Input className="h-11" placeholder="0" value={formData.waterNumber} onChange={(e) => setFormData({...formData, waterNumber: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Observações Internas <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Textarea rows={5} className="custom-border no-resize" placeholder="Descreva aqui informações valiosas e confidenciais sobre o imóvel e/ou sobre a documentação." value={formData.internalObservations} onChange={(e) => setFormData({...formData, internalObservations: e.target.value})} />
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {currentStep === 6 && (
                <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <DollarSign className="w-4 h-4" />Transação
                    </div>
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-2 items-center">
                        <Switch checked={formData.canSell} onCheckedChange={(v) => setFormData({...formData, canSell: v})} />
                        <Label className="font-bold text-primary">Vender</Label>
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <Switch checked={formData.canRent} onCheckedChange={(v) => setFormData({...formData, canRent: v})} />
                        <Label className="font-bold text-primary">Alugar</Label>
                      </div>
                    </div>

                    <div className="pt-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {formData.canSell && (
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Valor de Venda</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">R$</span>
                              <Input className="pl-10" placeholder="0,00" value={formData.sellPrice} onChange={(e) => setFormData({...formData, sellPrice: e.target.value})} />
                            </div>
                          </div>
                        )}
                        {formData.canRent && (
                          <div className="space-y-2">
                            <Label className="text-sm font-bold text-primary/80">Valor de Locação</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">R$</span>
                              <Input className="pl-10" placeholder="0,00" value={formData.rentPrice} onChange={(e) => setFormData({...formData, rentPrice: e.target.value})} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <UserPlus className="w-4 h-4" />Quem são os captadores desse imóvel?
                    </div>
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs px-6 h-12">
                      <Plus className="w-4 h-4 mr-2" /> Adicionar Captador
                    </Button>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <Contact className="w-4 h-4" />Quem é o corretor responsável pela negociação do imóvel?
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Corretor responsável</Label>
                      <Select value={formData.responsible} onValueChange={(v) => setFormData({...formData, responsible: v})}>
                        <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XANDAO CORRETOR">XANDAO CORRETOR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <Paperclip className="w-4 h-4" />Autorizado para negociação?
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Autorizado? <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Select value={formData.authorizedForTrading} onValueChange={(v) => setFormData({...formData, authorizedForTrading: v})}>
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sim, com exclusividade">Sim, com exclusividade</SelectItem>
                            <SelectItem value="Sim">Sim</SelectItem>
                            <SelectItem value="Não">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Início do Contrato <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="01/05/2018" value={formData.contractStartDate} onChange={(e) => setFormData({...formData, contractStartDate: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Duração em dias <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="15" value={formData.contractDurationDays} onChange={(e) => setFormData({...formData, contractDurationDays: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Final do Contrato <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11 bg-muted" placeholder="30/05/2018" readOnly value={formData.contractEndDate} />
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {currentStep === 7 && (
                <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <Camera className="w-4 h-4" />Insira as fotos
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-primary">Adicione fotos ilimitadas e arraste para reorganizá-las</span>
                      <p className="text-[11px] text-muted-foreground">As fotos devem ser apenas nos formatos JPG, PNG ou GIF e o peso máximo de 10MB.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-video bg-muted/50 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted transition-colors group"
                      >
                        <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-primary">Adicionar fotos</span>
                      </div>
                      {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border group shadow-sm">
                          <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                          <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" multiple accept=".png, .gif, .jpg, .jpeg" onChange={handleFileChange} />
                  </section>

                  <section className="space-y-8">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <Globe className="w-4 h-4" />Divulgação do anúncio na internet
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Título do anúncio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <div className="space-y-1">
                        <Input className="h-11" placeholder="Apartamento em São Paulo, Mooca com 2 quartos, 1 suíte, 150m²" value={formData.webTitle} onChange={(e) => setFormData({...formData, webTitle: e.target.value})} />
                        <p className="text-[10px] text-right text-muted-foreground uppercase">{formData.webTitle.length}/80</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-primary/80">Descrição do anúncio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <div className="space-y-1">
                        <Textarea rows={8} className="custom-border no-resize" placeholder="Crie o texto você mesmo. Veja nossas dicas ao lado." value={formData.webText} onChange={(e) => setFormData({...formData, webText: e.target.value})} />
                        <p className="text-[10px] text-right text-muted-foreground uppercase">{formData.webText.length}/3000</p>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {currentStep === 8 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><CheckCircle2 className="w-12 h-12" /></div>
                  <div className="space-y-2"><h2 className="text-3xl font-bold text-primary">Parabéns!</h2><p className="text-lg text-muted-foreground">O imóvel foi cadastrado com sucesso no sistema.</p></div>
                  <Link href="/"><Button className="btn-custom-red h-12 px-10 rounded-lg font-bold uppercase tracking-wider shadow-lg">Voltar ao Dashboard</Button></Link>
                </div>
              )}

              {currentStep < 8 && (
                <div className="mt-12 pt-8 border-t flex items-center justify-between">
                  <button onClick={handleBack} disabled={currentStep === 1} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-muted-foreground font-bold uppercase text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>Voltar</button>
                  <button onClick={handleNext} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 py-2 btn-custom-red h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-lg">{currentStep === 7 ? "Finalizar" : "Continuar"}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4 ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
