"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
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
  Plus
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

const DEFAULT_CATEGORIES = [
  { value: "padrao", label: "Padrão" }
]

export default function NewPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [purpose, setPurpose] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState<string>("")
  const [category, setCategory] = useState<string>("")

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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-primary">Inserir novo imóvel</h1>
          </div>
        </div>

        {/* Wizard Progress */}
        <div className="bg-white border-b overflow-x-auto">
          <div className="max-w-4xl mx-auto px-4">
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

        <div className="max-w-4xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="max-w-2xl mx-auto w-full">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-8">
                  {currentStep === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
                            <Select 
                              disabled={!purpose} 
                              value={propertyType} 
                              onValueChange={handlePropertyTypeChange}
                            >
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {PROPERTY_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Escolha uma categoria</Label>
                            <Select 
                              disabled={!propertyType}
                              value={category}
                              onValueChange={setCategory}
                            >
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {currentCategories.map((cat) => (
                                  <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                  </SelectItem>
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
                      {/* Onde fica o imóvel? */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                          <MapPin className="w-4 h-4" />
                          Onde fica o imóvel?
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Selecione o endereço</Label>
                          <div className="space-y-1">
                            <Input 
                              id="address" 
                              placeholder="Digite o nome da rua e número" 
                              className="h-11 border-destructive focus-visible:ring-destructive"
                            />
                            <p className="text-xs text-destructive font-medium">Esse campo é obrigatório.</p>
                          </div>
                        </div>
                      </section>

                      {/* Dados principais do imóvel */}
                      <section className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider">
                          <FileText className="w-4 h-4" />
                          Dados principais do imóvel
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bedrooms">Quartos</Label>
                            <Input id="bedrooms" type="number" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rooms">Salas <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="rooms" type="number" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="suites">Suítes <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="suites" type="number" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bathrooms">Banheiros</Label>
                            <Input id="bathrooms" type="number" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="garage">Vagas de Garagem <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="garage" type="number" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="useful_area">Área Útil (m²) <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="useful_area" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="total_area">Área Total <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="total_area" placeholder="0" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="build_area">Área Construída <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="build_area" placeholder="" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="terrain_width">Largura do Terreno <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="terrain_width" placeholder="" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="terrain_length">Comprimento do Terreno <span className="text-[10px] text-muted-foreground uppercase">(opcional)</span></Label>
                            <Input id="terrain_length" placeholder="" className="h-11" />
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="extra-info" className="border-none">
                            <AccordionTrigger className="flex items-center gap-2 hover:no-underline py-2">
                              <span className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Adicionar outras medidas e informações
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Área Comum</Label>
                                  <Input placeholder="0" className="h-11" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Ano de Construção</Label>
                                  <Input type="number" placeholder="Ex: 2020" className="h-11" />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </section>
                    </div>
                  )}

                  {currentStep > 2 && currentStep < 6 && (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground animate-in fade-in duration-500">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">Próximo passo: {STEPS[currentStep - 1].label}</h3>
                        <p className="text-sm">Preencha as informações necessárias para continuar.</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-primary">Parabéns!</h2>
                        <p className="text-lg text-muted-foreground">O imóvel foi cadastrado com sucesso no sistema.</p>
                      </div>
                      <Link href="/">
                        <Button className="btn-custom-red h-12 px-10 rounded-lg font-bold uppercase tracking-wider shadow-lg">
                          Voltar ao Dashboard
                        </Button>
                      </Link>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  {currentStep < 6 && (
                    <div className="pt-8 border-t flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="text-muted-foreground font-bold uppercase text-xs"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                      <Button 
                        onClick={handleNext}
                        className="btn-custom-red h-12 px-8 font-bold uppercase text-xs tracking-widest shadow-lg"
                      >
                        Continuar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
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
