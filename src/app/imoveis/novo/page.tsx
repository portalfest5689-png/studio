
"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
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
  Search,
  Key,
  Info,
  DollarSign,
  Globe,
  FolderOpen
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
    { value: "casa-condominio", label: "Casa de Condomínio" },
    { value: "sobrado", label: "Sobrado" },
    { value: "bangalo", label: "Bangalô" },
    { value: "edicula", label: "Edícula" },
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
    bedrooms: "0",
    bathrooms: "0",
    parkingSpaces: "0",
    usefulArea: "0",
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
        code: (properties.length + 1).toString()
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
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Escolha um tipo de imóvel</Label>
                        <Select onValueChange={(v) => {
                          setFormData({...formData, propertyType: v, category: ""})
                        }}>
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
                        <Select onValueChange={(v) => setFormData({...formData, category: v, title: v})}>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><MapPin className="w-4 h-4" />Onde fica o imóvel?</div>
                    <div className="space-y-4">
                      <div className="space-y-2"><Label>Endereço</Label><Input placeholder="Rua..." onChange={(e) => setFormData({...formData, address: e.target.value})} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Número</Label><Input placeholder="123" onChange={(e) => setFormData({...formData, number: e.target.value})} /></div>
                        <div className="space-y-2"><Label>Bairro</Label><Input placeholder="Centro" onChange={(e) => setFormData({...formData, neighborhood: e.target.value})} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Cidade</Label><Input placeholder="São Paulo" onChange={(e) => setFormData({...formData, city: e.target.value})} /></div>
                        <div className="space-y-2"><Label>Estado</Label><Input placeholder="SP" onChange={(e) => setFormData({...formData, state: e.target.value})} /></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><MapIcon className="w-4 h-4" />Localização no mapa</div>
                    <div className="map-wrapper relative aspect-square w-full bg-[#E5E3DF] rounded-xl border shadow-inner overflow-hidden">
                      <div className="map-background absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-40 grayscale" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=-23.5505,-46.6333&zoom=15&size=1000x1000&key=AIzaSyDgw2dd2JM2_SEHDJiRz8-rHuezWsJ0-Go')" }} />
                      <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-[#334659] hover:bg-[#243447] text-white h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-2xl rounded transition-all transform hover:scale-105" type="button">Confirme a localização no mapa</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><FileText className="w-4 h-4" />Dados principais</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2"><Label>Quartos</Label><Input type="number" onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Banheiros</Label><Input type="number" onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Vagas de Garagem</Label><Input type="number" onChange={(e) => setFormData({...formData, parkingSpaces: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Área Útil (m²)</Label><Input type="number" onChange={(e) => setFormData({...formData, usefulArea: e.target.value})} /></div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Info className="w-4 h-4" />Informações detalhadas</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label>Estágio da Obra</Label>
                      <Select defaultValue="Pronto para morar" onValueChange={(v) => setFormData({...formData, buildingState: v})}>
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
                    <div className="space-y-2"><Label>Valor de Venda</Label><Input placeholder="0,00" onChange={(e) => setFormData({...formData, sellPrice: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Condomínio</Label><Input placeholder="0,00" onChange={(e) => setFormData({...formData, condoFee: e.target.value})} /></div>
                    <div className="space-y-2"><Label>IPTU</Label><Input placeholder="0,00" onChange={(e) => setFormData({...formData, iptu: e.target.value})} /></div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider"><Globe className="w-4 h-4" />Divulgação</div>
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked onCheckedChange={(v) => setFormData({...formData, isAdvertised: v})} />
                    <Label className="font-bold">Anunciar no site?</Label>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><CheckCircle2 className="w-12 h-12" /></div>
                  <div className="space-y-2"><h2 className="text-3xl font-bold text-primary">Parabéns!</h2><p className="text-lg text-muted-foreground">O imóvel foi cadastrado com sucesso no sistema.</p></div>
                  <Link href="/imoveis"><Button className="btn-custom-red h-12 px-10 rounded-lg font-bold uppercase tracking-wider shadow-lg">Voltar ao Dashboard</Button></Link>
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
