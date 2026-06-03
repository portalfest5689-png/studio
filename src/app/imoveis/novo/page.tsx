
"use client"

import { useState, useRef, useEffect } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
  Home, 
  Building2, 
  Factory, 
  Megaphone, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Barcode, 
  MapPin, 
  FileText,
  Map as MapIcon,
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
  Monitor,
  ExternalLink,
  Trash,
  Youtube
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const STEPS = [
  { id: 1, label: "Dados Principais" },
  { id: 2, label: "Localização" },
  { id: 3, label: "Características" },
  { id: 4, label: "Informações Detalhadas" },
  { id: 5, label: "Detalhes" },
  { id: 6, label: "Negociação" },
  { id: 7, label: "Divulgação" },
  { id: 8, label: "Parabéns" },
]

const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
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

const CHARACTERISTICS_CATEGORIES = [
  { 
    title: "Bem estar e Comodidade", 
    items: [
      { id: "wine_cellar", label: "Adega" },
      { id: "integrated_environments", label: "Ambientes Integrados" },
      { id: "aquarium", label: "Aquário" },
      { id: "heater", label: "Aquecedor" },
      { id: "air_conditioning", label: "Ar condicionado" },
      { id: "lamps", label: "Arandelas" },
      { id: "kitchen_cabinet", label: "Armário de Cozinha" },
      { id: "builtin_cabinet", label: "Armário Embutido" },
      { id: "bathroom_cabinet", label: "Armário no Banheiro" },
      { id: "bathtub", label: "Banheira" },
      { id: "blindex", label: "Box Blindex" },
      { id: "porch_grill", label: "Churrasqueira na Sacada" },
      { id: "balcony_grill", label: "Churrasqueira na Varanda" },
      { id: "closet", label: "Closet" },
      { id: "copa", label: "Copa" },
      { id: "american_kitchen", label: "Cozinha Americana" },
      { id: "gourmet_kitchen", label: "Cozinha Gourmet" },
      { id: "large_kitchen", label: "Cozinha Grande" },
      { id: "demi_suite", label: "Demi-suíte" },
      { id: "office", label: "Escritório" },
      { id: "smart_lock", label: "Fechadura Digital" },
      { id: "ocean_front", label: "Frente para o mar" },
      { id: "whirlpool", label: "Hidromassagem" },
      { id: "home_office", label: "Home Office" },
      { id: "panoramic_window", label: "Janela Panorâmica" },
      { id: "winter_garden", label: "Jardim de Inverno" },
      { id: "fireplace", label: "Lareira" },
      { id: "lavatory", label: "Lavabo" },
      { id: "laundry", label: "Lavanderia" },
      { id: "furnished", label: "Mobiliado" },
      { id: "planned_furniture", label: "Móveis Planejados" },
      { id: "hottub", label: "Ofurô" },
      { id: "double_height_ceiling", label: "Pé Direito Duplo" },
      { id: "backyard", label: "Quintal" },
      { id: "porch", label: "Sacada" },
      { id: "glass_porch", label: "Sacada Fechada com Vidro" },
      { id: "gourmet_porch", label: "Sacada Gourmet" },
      { id: "dining_room", label: "Sala de jantar" },
      { id: "large_room", label: "Sala Grande" },
      { id: "half_furnished", label: "Semimobiliado" },
      { id: "smart_home", label: "Smart Home" },
      { id: "solarium", label: "Solarium" },
      { id: "balcony", label: "Varanda" },
      { id: "glass_balcony", label: "Varanda Fechada com Vidro" },
      { id: "gourmet_balcony", label: "Varanda Gourmet" },
      { id: "panoramic_view", label: "Vista Panorâmica" },
      { id: "mountain_view", label: "Vista para a Montanha" },
      { id: "lake_view", label: "Vista para o Lago" },
      { id: "sea_view", label: "Vista para o Mar" }
    ]
  },
  { 
    title: "Segurança", 
    items: [
      { id: "alarm", label: "Alarme" },
      { id: "security_camera", label: "Câmera de Segurança" },
      { id: "fence", label: "Cerca" },
      { id: "security_circuit", label: "Circuito de Segurança" },
      { id: "guardhouse", label: "Guarita" },
      { id: "armored_guardhouse", label: "Guarita Blindada" },
      { id: "intercom", label: "Interfone" },
      { id: "glass_wall", label: "Muro de Vidro" },
      { id: "wall_fence", label: "Muros e Grades" },
      { id: "electronic_gate", label: "Portão Eletrônico" },
      { id: "ordinance", label: "Portaria" },
      { id: "concierge_24h", label: "Portaria 24hs" },
      { id: "patrol_24h", label: "Ronda 24hs" }
    ]
  },
  { 
    title: "Lazer e Natureza", 
    items: [
      { id: "academy", label: "Academia" },
      { id: "pet_friendly", label: "Aceita Pet" },
      { id: "recreation_area", label: "Área de Lazer" },
      { id: "fruit_tree", label: "Árvore Frutífera" },
      { id: "tree_climbing", label: "Arvorismo" },
      { id: "bar", label: "Bar" },
      { id: "pool_bar", label: "Bar na Piscina" },
      { id: "beauty_care", label: "Beauty Care" },
      { id: "library", label: "Biblioteca" },
      { id: "soccer_field", label: "Campo de Futebol" },
      { id: "golf_course", label: "Campo de Golfe" },
      { id: "beauty_center", label: "Centro de Estética" },
      { id: "children_care", label: "Children Care" },
      { id: "barbecue_grill", label: "Churrasqueira" },
      { id: "coal_grill", label: "Churrasqueira à Carvão" },
      { id: "gas_grill", label: "Churrasqueira à Gás" },
      { id: "ecological_grill", label: "Churrasqueira Ecológica" },
      { id: "movie_theater", label: "Cinema" },
      { id: "deck", label: "Deck" },
      { id: "wet_deck", label: "Deck Molhado" },
      { id: "crossfit_space", label: "Espaço Crossfit" },
      { id: "gym", label: "Espaço Fitness" },
      { id: "gourmet_space", label: "Espaço Gourmet" },
      { id: "pet_space", label: "Espaço Pet" },
      { id: "teen_space", label: "Espaço Teen" },
      { id: "park", label: "Espaço Verde/Parque" },
      { id: "yoga_space", label: "Espaço Yoga" },
      { id: "zen_space", label: "Espaço Zen" },
      { id: "vegetable_garden", label: "Horta" },
      { id: "jacuzzi", label: "Jacuzzi" },
      { id: "garden", label: "Jardim" },
      { id: "lake", label: "Lago" },
      { id: "mini_court", label: "Mini Quadra" },
      { id: "mini_market", label: "Minimercado" },
      { id: "climbing_wall", label: "Muro de Escalada" },
      { id: "greenhouse", label: "Orquidário" },
      { id: "pool", label: "Piscina" },
      { id: "heated_pool", label: "Piscina Climatizada" },
      { id: "indoor_pool", label: "Piscina Coberta" },
      { id: "childrens_pool", label: "Piscina Infantil" },
      { id: "olympic_pool", label: "Piscina Olímpica" },
      { id: "adult_pool", label: "Piscina para Adulto" },
      { id: "private_pool", label: "Piscina Privativa" },
      { id: "semi_olympic_pool", label: "Piscina Semiolímpica" },
      { id: "cooper_track", label: "Pista de Cooper" },
      { id: "skate_park", label: "Pista de Skate" },
      { id: "playground", label: "Playground" },
      { id: "orchard", label: "Pomar" },
      { id: "square", label: "Praça" },
      { id: "pub", label: "Pub" },
      { id: "beach_tennis_court", label: "Quadra de Beach Tennis" },
      { id: "soccer_court", label: "Quadra de Futebol" },
      { id: "footvolley_court", label: "Quadra de Futevôlei" },
      { id: "squash_court", label: "Quadra de Squash" },
      { id: "tennis_court", label: "Quadra de Tênis" },
      { id: "beach_volleyball_court", label: "Quadra de Vôlei de Praia" },
      { id: "polysportive_court", label: "Quadra Poliesportiva" },
      { id: "massage_room", label: "Sala de Massagem" },
      { id: "party_room", label: "Salão de Festas" },
      { id: "games_room", label: "Salão de Jogos" },
      { id: "steam_room", label: "Sauna" },
      { id: "spa", label: "Spa" },
      { id: "indoor_surfing", label: "Surf Indoor" }
    ]
  },
  { 
    title: "Infraestrutura", 
    items: [
      { id: "accessibility", label: "Acessibilidade" },
      { id: "service_area", label: "Área de Serviço" },
      { id: "banister", label: "Balaústre" },
      { id: "bicycle_rack", label: "Bicicletário" },
      { id: "dog_kennel", label: "Canil" },
      { id: "electric_vehicle_charger", label: "Carregador de Carro Elétrico" },
      { id: "gas_shower", label: "Chuveiro a Gás" },
      { id: "coffee_shop", label: "Coffee Shop" },
      { id: "eco_garbage_collector", label: "Coleta Seletiva de Lixo" },
      { id: "smart_condo", label: "Condomínio Inteligente" },
      { id: "eco_condo", label: "Condomínio Sustentável" },
      { id: "coworking", label: "Coworking" },
      { id: "employee_dependency", label: "Dependência Empregada" },
      { id: "warehouse", label: "Depósito" },
      { id: "storeroom", label: "Despensa" },
      { id: "edicule", label: "Edícula" },
      { id: "elevator", label: "Elevador" },
      { id: "emergency_elevator", label: "Elevador de Emergência" },
      { id: "solar_energy", label: "Energia Solar" },
      { id: "corner", label: "Esquina" },
      { id: "visitors_parking", label: "Estacionamento Visitantes" },
      { id: "pizza_oven", label: "Forno de Pizza" },
      { id: "garage_common", label: "Garagem" },
      { id: "covered_garage", label: "Garagem Coberta" },
      { id: "collective_garage", label: "Garagem Coletiva" },
      { id: "demarcated_garage", label: "Garagem Demarcada" },
      { id: "gas", label: "Gás Encanado" },
      { id: "generator", label: "Gerador" },
      { id: "luggage_storage", label: "Guarda Volumes" },
      { id: "entrance_hall", label: "Hall de Entrada" },
      { id: "helipad", label: "Heliponto" },
      { id: "soundproofing", label: "Isolamento Acústico" },
      { id: "thermal_insulation", label: "Isolamento Térmico" },
      { id: "cupboard", label: "Louceiro" },
      { id: "valet", label: "Manobrista" },
      { id: "marina", label: "Marina" },
      { id: "mini_golf", label: "Mini Golf" },
      { id: "athletics_track", label: "Pista de Atletismo" },
      { id: "airstrip", label: "Pista de Pouso" },
      { id: "ramps", label: "Rampas" },
      { id: "meeting_room", label: "Sala de Reunião" },
      { id: "convention_hall", label: "Salão de Convenção" },
      { id: "cable_tv", label: "TV a Cabo" },
      { id: "locker_room", label: "Vestiário" },
      { id: "wi_fi", label: "Wi-Fi" }
    ]
  },
  { 
    title: "Acabamento", 
    items: [
      { id: "carpet", label: "Carpete" },
      { id: "ceramic", label: "Cerâmica" },
      { id: "burnt_cement", label: "Cimento Queimado" },
      { id: "drywall", label: "Drywall" },
      { id: "plaster", label: "Gesso" },
      { id: "granite", label: "Granito" },
      { id: "aluminum_window", label: "Janela de Alumínio" },
      { id: "slab", label: "Laje" },
      { id: "marble", label: "Mármore" },
      { id: "Wallpaper", label: "Papel de Parede" },
      { id: "wood_floor", label: "Piso de Madeira" },
      { id: "raised_floor", label: "Piso Elevado" },
      { id: "laminated_floor", label: "Piso Laminado" },
      { id: "vinyl_flooring", label: "Piso Vinílico" },
      { id: "platibanda", label: "Platibanda" },
      { id: "porcelain", label: "Porcelanato" },
      { id: "sanca", label: "Sanca" },
      { id: "lowered_ceiling", label: "Teto rebaixado" }
    ]
  }
]

export default function NewPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [purpose, setPurpose] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    category: "Selecione",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "UF",
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
    propertyStatus: "Selecione",
    reformState: "Selecione",
    occupation: "Selecione",
    condoMode: "not_exempt",
    internalObservations: "",
    canSell: false,
    canRent: false,
    canSeason: false,
    authorizedForTrading: "Selecione",
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
                        { id: 'rural', label: 'Rural', icon: <Megaphone className="w-6 h-6" /> },
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
                          onValueChange={(v) => setFormData({...formData, propertyType: v})}
                        >
                          <SelectTrigger className="h-11"><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            {PROPERTY_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
                          <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Selecione o endereço</Label>
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
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">
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
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">
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
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Número/Lote</Label>
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
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">
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
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Estado</Label>
                            <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                              <SelectTrigger className="h-11"><SelectValue placeholder="UF" /></SelectTrigger>
                              <SelectContent>
                                {BRAZILIAN_STATES.map((state) => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Cidade</Label>
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
                          <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Bairro</Label>
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
                          <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">CEP</Label>
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
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-[#334659] hover:bg-[#243447] text-white h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-2xl rounded transition-all transform hover:scale-105" 
                            type="button"
                          >
                            Confirme a localização no mapa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <section className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pt-8 border-t">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                    <FileText className="w-4 h-4" />Dados principais do imóvel
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Quartos</Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Salas <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.livingRooms} onChange={(e) => setFormData({...formData, livingRooms: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Suítes <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.suites} onChange={(e) => setFormData({...formData, suites: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Banheiros</Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Vagas de Garagem <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" type="number" value={formData.parkingSpaces} onChange={(e) => setFormData({...formData, parkingSpaces: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Área Útil (m²) <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" value={formData.usefulArea} onChange={(e) => setFormData({...formData, usefulArea: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Área Total <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" placeholder="0" value={formData.totalArea} onChange={(e) => setFormData({...formData, totalArea: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Área Construída <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" value={formData.builtArea} onChange={(e) => setFormData({...formData, builtArea: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Largura do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" value={formData.terrainWidth} onChange={(e) => setFormData({...formData, terrainWidth: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Comprimento do Terreno <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <Input className="h-11" value={formData.terrainLength} onChange={(e) => setFormData({...formData, terrainLength: e.target.value})} />
                    </div>
                  </div>
                  <div className="w-full">
                    <Accordion type="single" collapsible className="w-full border-none">
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
                  </div>
                </section>
              )}

              {currentStep === 4 && (
                <section className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                    <ListIcon className="w-4 h-4" />Quais são as características?
                  </div>
                  <div className="space-y-12">
                    {CHARACTERISTICS_CATEGORIES.map((category) => (
                      <div key={category.title} className="space-y-6">
                        <h3 className="text-lg font-bold text-primary/70 border-b pb-2">{category.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {category.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <Checkbox id={item.id} checked={formData.characteristics.includes(item.id)} onCheckedChange={(checked) => {
                                const newChars = checked 
                                  ? [...formData.characteristics, item.id]
                                  : formData.characteristics.filter(id => id !== item.id)
                                setFormData({...formData, characteristics: newChars})
                              }} />
                              <Label htmlFor={item.id} className="text-sm cursor-pointer hover:text-primary transition-colors">{item.label}</Label>
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
                      <Info className="w-4 h-4" />Informações detalhadas
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Estágio da Obra</Label>
                        <Select value={formData.buildingState} onValueChange={(v) => setFormData({...formData, buildingState: v})}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Pronto para morar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pronto para morar">Pronto para morar</SelectItem>
                            <SelectItem value="Em construção">Em construção</SelectItem>
                            <SelectItem value="Na planta">Na planta</SelectItem>
                            <SelectItem value="Lançamento">Lançamento</SelectItem>
                            <SelectItem value="Breve lançamento">Breve lançamento</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <div className="flex flex-col gap-2 items-center">
                        <Switch checked={formData.canSeason} onCheckedChange={(v) => setFormData({...formData, canSeason: v})} />
                        <Label className="font-bold text-primary">Temporada</Label>
                      </div>
                    </div>

                    <div className="pt-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {formData.canSell && (
                          <div className="space-y-2">
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Valor de Venda</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">R$</span>
                              <Input className="pl-10" placeholder="0,00" value={formData.sellPrice} onChange={(e) => setFormData({...formData, sellPrice: e.target.value})} />
                            </div>
                          </div>
                        )}
                        {(formData.canRent || formData.canSeason) && (
                          <div className="space-y-2">
                            <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Valor de Locação</Label>
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
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Corretor responsável</Label>
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
                        <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Autorizado? <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
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
                        <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Início do Contrato <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="01/05/2018" value={formData.contractStartDate} onChange={(e) => setFormData({...formData, contractStartDate: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Duração em dias <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                        <Input className="h-11" placeholder="15" value={formData.contractDurationDays} onChange={(e) => setFormData({...formData, contractDurationDays: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Final do Contrato <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
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
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Título do anúncio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
                      <div className="space-y-1">
                        <Input className="h-11" placeholder="Apartamento em São Paulo, Mooca com 2 quartos, 1 suíte, 150m²" value={formData.webTitle} onChange={(e) => setFormData({...formData, webTitle: e.target.value})} />
                        <p className="text-[10px] text-right text-muted-foreground uppercase">{formData.webTitle.length}/80</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-bold text-primary/80">Descrição do anúncio <span className="text-[10px] text-muted-foreground font-normal uppercase">(opcional)</span></Label>
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
                  <button onClick={handleBack} disabled={currentStep === 1} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-muted-foreground font-bold uppercase text-xs">
                    <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2} />
                    Voltar
                  </button>
                  <button onClick={handleNext} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 py-2 btn-custom-red h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-lg">
                    {currentStep === 7 ? "Finalizar" : "Continuar"}
                    <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
