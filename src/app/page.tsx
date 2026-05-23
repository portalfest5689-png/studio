"use client"

import { CRMHeader } from "@/components/layout/crm-header"
import { PropertySearchHeader } from "@/components/properties/property-search-header"
import { PropertyTabs } from "@/components/properties/property-tabs"
import { PropertyActionsBar } from "@/components/properties/property-actions-bar"
import { EmptyState } from "@/components/properties/empty-state"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body">
      <CRMHeader />
      
      <main className="pb-24">
        <PropertySearchHeader />
        <PropertyTabs />
        <PropertyActionsBar />
        
        <div className="px-4">
          <EmptyState />
        </div>
      </main>

      {/* FAB Mobile */}
      <div className="fixed bottom-20 right-4 md:hidden">
        <Button className="w-14 h-14 rounded-full btn-custom-red shadow-xl">
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex md:hidden items-center justify-around z-50">
        {[
          { icon: <HomeIcon />, label: "Imóveis", active: true },
          { icon: <UserIcon />, label: "Contatos" },
          { icon: <DollarIcon />, label: "Vendas" },
          { icon: <CalendarIcon />, label: "Agenda" },
        ].map((item, i) => (
          <button key={i} className={`flex flex-col items-center gap-1 ${item.active ? 'text-accent' : 'text-primary/40'}`}>
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  )
}
