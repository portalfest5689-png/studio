
"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
  ChevronDown
} from "lucide-react"
import Link from "next/link"

const STEPS = [
  { id: 1, label: "Dados Principais" },
  { id: 2, label: "Localização" },
  { id: 3, label: "Características" },
  { id: 4, label: "Detalhes" },
  { id: 5, label: "Valores" },
  { id: 6, label: "Divulgação" },
  { id: 7, label: "Parabéns" },
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
  area: [
    { value: "comercial", label: "Comercial" },
    { value: "industrial", label: "Industrial" },
    { value: "residencial", label: "Residencial" },
  ],
  "terreno-lote": [
    { value: "loteamento", label: "Loteamento" },
    { value: "condominio", label: "Condomínio" },
    { value: "rua-publica", label: "Rua Pública" },
  ],
  chacara: [
    { value: "lazer", label: "Lazer" },
    { value: "eventos", label: "Eventos" },
    { value: "producao", label: "Produção" },
  ],
}

const DEFAULT_CATEGORIES = [{ value: "padrao", label: "Padrão" }]

export default function NewPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [purpose, setPurpose] = useState<string | null>(null)
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
    condoFee: "0,00",
    iptu: "0,00",
    buildingState: "Pronto para morar",
    isAdvertised: true,
    responsible: "Alexandre Mendonça"
  })

  const handleNext = () => {
    if (currentStep === 6) {
      const saved = localStorage.getItem('crm_properties')
      const properties = saved ? JSON.parse(saved) : []
      const newProperty = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        code: (properties.length + 1).toString(),
        title: formData.category || formData.propertyType || "Imóvel"
      }
      localStorage.setItem('crm_properties', JSON.stringify([newProperty, ...properties]))
    }
    if (currentStep < 7) setCurrentStep(currentStep + 1)
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
                  className={`flex flex-col items-center gap-2 flex-1 relative ${step.id !== 7 ? 'after:content-[""] after:h-[2px] after:w-full after:bg-muted after:absolute after:top-4 after:left-1/2 after:-z-0' : ''}`}
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
            <CardContent className="pt-8 space-y-12">
              
              {currentStep === 1 && (
                <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Barcode className="w-4 h-4" />Código do Imóvel</div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Código Automático</Label>
                      <Input value="Automático" readOnly className="bg-muted font-mono h-11" />
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
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Home className="w-4 h-4" />Tipo e Categoria</div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Escolha um tipo de imóvel</Label>
                        <Select 
                          value={formData.propertyType}
                          onValueChange={(v) => setFormData({...formData, propertyType: v, category: ""})}
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
                            {(CATEGORIES_MAP[formData.propertyType] || DEFAULT_CATEGORIES).map((cat) => (
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
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 bg-[#334659] hover:bg-[#243447] text-white h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-2xl rounded transition-all transform hover:scale-105" 
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
                <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <section className="space-y-8">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                      <FileText className="w-4 h-4" />Dados principais do imóvel
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Quartos</Label>
                        <Input 
                          className="h-11" 
                          type="number" 
                          value={formData.bedrooms} 
                          onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Salas <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          type="number" 
                          value={formData.livingRooms} 
                          onChange={(e) => setFormData({...formData, livingRooms: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Suítes <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          type="number" 
                          value={formData.suites} 
                          onChange={(e) => setFormData({...formData, suites: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">Banheiros</Label>
                        <Input 
                          className="h-11" 
                          type="number" 
                          value={formData.bathrooms} 
                          onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Vagas de Garagem <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          type="number" 
                          value={formData.parkingSpaces} 
                          onChange={(e) => setFormData({...formData, parkingSpaces: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Área Útil (m²) <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          value={formData.usefulArea} 
                          onChange={(e) => setFormData({...formData, usefulArea: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Área Total <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          value={formData.totalArea} 
                          onChange={(e) => setFormData({...formData, totalArea: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Área Construída <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          value={formData.builtArea} 
                          onChange={(e) => setFormData({...formData, builtArea: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Largura do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          value={formData.terrainWidth} 
                          onChange={(e) => setFormData({...formData, terrainWidth: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-primary/80">
                          Comprimento do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span>
                        </Label>
                        <Input 
                          className="h-11" 
                          value={formData.terrainLength} 
                          onChange={(e) => setFormData({...formData, terrainLength: e.target.value})} 
                        />
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
                </div>
              )}

              {currentStep === 4 && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Info className="w-4 h-4" />Informações detalhadas</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label>Estágio da Obra</Label>
                      <Select value={formData.buildingState} onValueChange={(v) => setFormData({...formData, buildingState: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pronto para morar">Pronto para morar</SelectItem>
                          <SelectItem value="Em construção">Em construção</SelectItem>
                          <SelectItem value="Na planta">Na planta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><DollarSign className="w-4 h-4" />Valores</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2"><Label>Valor de Venda</Label><Input placeholder="0,00" value={formData.sellPrice} onChange={(e) => setFormData({...formData, sellPrice: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Condomínio</Label><Input placeholder="0,00" value={formData.condoFee} onChange={(e) => setFormData({...formData, condoFee: e.target.value})} /></div>
                    <div className="space-y-2"><Label>IPTU</Label><Input placeholder="0,00" value={formData.iptu} onChange={(e) => setFormData({...formData, iptu: e.target.value})} /></div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Globe className="w-4 h-4" />Divulgação</div>
                  <div className="flex items-center gap-3">
                    <Switch checked={formData.isAdvertised} onCheckedChange={(v) => setFormData({...formData, isAdvertised: v})} />
                    <Label className="font-bold">Anunciar no site?</Label>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><CheckCircle2 className="w-12 h-12" /></div>
                  <div className="space-y-2"><h2 className="text-3xl font-bold text-primary">Parabéns!</h2><p className="text-lg text-muted-foreground">O imóvel foi cadastrado com sucesso no sistema.</p></div>
                  <Link href="/"><Button className="btn-custom-red h-12 px-10 rounded-lg font-bold uppercase tracking-wider shadow-lg">Voltar ao Dashboard</Button></Link>
                </div>
              )}

              {currentStep < 7 && (
                <div className="pt-8 border-t flex items-center justify-between">
                  <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="text-muted-foreground font-bold uppercase text-xs"><ArrowLeft className="w-4 h-4 mr-2" />Voltar</Button>
                  <Button onClick={handleNext} className="btn-custom-red h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-lg">Continuar<ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
