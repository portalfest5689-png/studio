"use client"

import { useState } from "react"

const tabs = [
  { id: "all", label: "Todos", count: 0 },
  { id: "active", label: "Ativos", count: 0 },
  { id: "announced", label: "Anunciados no site", count: 0 },
  { id: "unannounced", label: "Não anunciados no site", count: 0 },
  { id: "incomplete", label: "Incompletos", count: 0 },
  { id: "reserved", label: "Reservados", count: 0 },
  { id: "inactive", label: "Inativos", count: 0 },
  { id: "pending", label: "Pendentes", count: 0 },
]

export function PropertyTabs() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="bg-white border-b">
      <div className="max-w-[1400px] mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex whitespace-nowrap min-w-max px-4">
          {tabs.map((tab) => (
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
              <span className="ml-1 text-[10px] opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
