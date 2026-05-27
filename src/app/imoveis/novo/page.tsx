"use client"

import { useState } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Building2, Factory, Signpost, ArrowRight, ArrowLeft, CheckCircle2, Barcode, FolderOpen } from "lucide-react"
import Link from "next/link"

const STEPS = [
  { id: 1, label: "Dados Principais" },
  { id: 2, label: "Características" },
  { id: 3, label: "Informações Detalhadas" },
  { id: 4, label: "Transações e Valores" },
  { id: 5, label: "Divulgação" },
  { id: 6, label: "Parabéns" },
]

export default function NewPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [purpose, setPurpose] = useState<string | null>(null)

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

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
                            <Select disabled={!purpose}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartamento">Apartamento</SelectItem>
                                <SelectItem value="area">Área</SelectItem>
                                <SelectItem value="area-lazer">Área de Lazer</SelectItem>
                                <SelectItem value="box-garagem">Box/Garagem</SelectItem>
                                <SelectItem value="casa">Casa</SelectItem>
                                <SelectItem value="chacara">Chácara</SelectItem>
                                <SelectItem value="ilha">Ilha</SelectItem>
                                <SelectItem value="rancho">Rancho</SelectItem>
                                <SelectItem value="terreno-lote">Terreno/Lote</SelectItem>
                                <SelectItem value="village">Village</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Escolha uma categoria</Label>
                            <Select disabled={!purpose}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="selecione">Selecione</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {currentStep > 1 && currentStep < 6 && (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground animate-in fade-in duration-500">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <PlusSquareIcon />
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

function PlusSquareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
  )
}