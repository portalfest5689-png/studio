
"use client"

import { useState, useEffect } from "react"
import { CRMHeader } from "@/components/layout/crm-header"
import { PropertySearchHeader } from "@/components/properties/property-search-header"
import { PropertyTabs } from "@/components/properties/property-tabs"
import { PropertyActionsBar } from "@/components/properties/property-actions-bar"
import { EmptyState } from "@/components/properties/empty-state"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  MoreVertical, 
  RefreshCw, 
  Monitor, 
  CalendarCheck, 
  Power, 
  Copy, 
  UserRound, 
  FileText, 
  Edit, 
  Trash2,
  Lock,
  AlertCircle
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

interface Property {
  id: string
  code: string
  title: string
  address: string
  city: string
  state: string
  neighborhood: string
  bedrooms: string
  bathrooms: string
  parkingSpaces: string
  usefulArea: string
  sellPrice: string
  condoFee: string
  iptu: string
  status: string
  buildingState: string
  isAdvertised: boolean
  responsible: string
  images?: string[]
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('crm_properties')
    if (saved) {
      setProperties(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-body">
      <CRMHeader />
      
      <main className="pb-24">
        <PropertySearchHeader />
        <PropertyTabs />
        <PropertyActionsBar />
        
        <div className="px-4 mt-4 md:mt-0">
          {properties.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                    {/* Card Header with Image */}
                    <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                      <div className="absolute inset-0 z-10 p-3 flex flex-col justify-between pointer-events-none">
                        <div className="flex justify-between items-start">
                          <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold shadow-lg border border-white/20">
                            {property.responsible.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm">
                              Ativo
                            </span>
                            {property.isAdvertised && (
                              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm">
                                Anunciado no Site
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Image 
                        src={property.images && property.images.length > 0 ? property.images[0] : `https://picsum.photos/seed/${property.id}/600/400`}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="property house"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-muted text-primary text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border">Cód. {property.code}</span>
                          <span className="bg-orange-100 text-orange-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border border-orange-200">
                            {property.buildingState || 'Pronto'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-muted/50 hover:bg-muted">
                                <Share2 className="w-3.5 h-3.5 text-primary" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-xs font-bold uppercase"><Copy className="w-3 h-3 mr-2" /> Copiar Link</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-muted/50 hover:bg-muted">
                                <MoreVertical className="w-3.5 h-3.5 text-primary" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem><RefreshCw className="w-4 h-4 mr-2" /> Atualizar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem><Monitor className="w-4 h-4 mr-2" /> Retirar do site</DropdownMenuItem>
                              <DropdownMenuItem><CalendarCheck className="w-4 h-4 mr-2" /> Reservar</DropdownMenuItem>
                              <DropdownMenuItem><Power className="w-4 h-4 mr-2" /> Inativar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem><UserRound className="w-4 h-4 mr-2" /> Responsável</DropdownMenuItem>
                              <DropdownMenuItem><FileText className="w-4 h-4 mr-2" /> Imprimir ficha</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Editar</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Excluir</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-primary text-base leading-tight truncate pr-4" title={property.title}>
                          {property.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-snug mt-1 line-clamp-1">
                          {property.neighborhood}, {property.city}/{property.state} - {property.address}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 py-1 border-y border-muted/50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Quartos</span>
                          <span className="text-xs font-bold text-primary">{property.bedrooms}</span>
                        </div>
                        <div className="w-px h-6 bg-muted/50" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Banheiros</span>
                          <span className="text-xs font-bold text-primary">{property.bathrooms}</span>
                        </div>
                        <div className="w-px h-6 bg-muted/50" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Vagas</span>
                          <span className="text-xs font-bold text-primary">{property.parkingSpaces}</span>
                        </div>
                        <div className="w-px h-6 bg-muted/50" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Área</span>
                          <span className="text-xs font-bold text-primary">{property.usefulArea} m²</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-primary">R$ {property.sellPrice}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                          <span>Cond.: <span className="font-bold text-primary">R$ {property.condoFee}</span></span>
                          <span>IPTU: <span className="font-bold text-primary">R$ {property.iptu}</span></span>
                        </div>
                      </div>

                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-muted/50">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted/50 text-[9px] font-bold text-muted-foreground border">
                          <Lock className="w-2.5 h-2.5" />
                          <span className="uppercase tracking-tighter">Restrito</span>
                        </div>
                        <div className="text-[9px] text-muted-foreground italic font-medium">
                          Atualizado há 5 segundos
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Placeholder */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-1 bg-white border rounded p-1 shadow-sm">
                  <Button variant="ghost" size="sm" disabled className="h-8 px-2 text-xs font-bold uppercase">Anterior</Button>
                  <Button size="sm" className="h-8 w-8 bg-accent text-white p-0 text-xs font-bold">1</Button>
                  <Button variant="ghost" size="sm" disabled className="h-8 px-2 text-xs font-bold uppercase">Próximo</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FAB Mobile */}
      <Link href="/imoveis/novo" className="fixed bottom-20 right-4 md:hidden z-50">
        <Button className="w-14 h-14 rounded-full btn-custom-red shadow-2xl">
          <Plus className="w-8 h-8" />
        </Button>
      </Link>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex md:hidden items-center justify-around z-50">
        {[
          { icon: <HomeIcon />, label: "Imóveis", active: true, href: "/" },
          { icon: <UserIcon />, label: "Contatos", href: "/contatos" },
          { icon: <DollarIcon />, label: "Vendas", href: "/atendimentos" },
          { icon: <CalendarIcon />, label: "Relatórios", href: "/relatorios" },
        ].map((item, i) => (
          <Link key={i} href={item.href} className={`flex flex-col items-center gap-1 ${item.active ? 'text-accent' : 'text-primary/40'}`}>
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
}

function DollarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  )
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
  )
}
