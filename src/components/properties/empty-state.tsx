
"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

export function EmptyState() {
  return (
    <div className="bg-white border rounded-xl p-12 text-center max-w-[1400px] mx-auto my-8 flex flex-col items-center gap-6">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-3xl font-bold text-primary">
          Você ainda não tem nenhum imóvel.{" "}
          <span className="block sm:inline text-accent">Adicione seus imóveis captados!</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Quando você adiciona todas as suas captações na imobTrack, mostramos a você ideias de como comercializar com mais inteligência.
        </p>
      </div>
      
      <Link href="/imoveis/novo" className="mt-4">
        <button className="w-24 h-24 rounded-full border-4 border-accent flex items-center justify-center text-accent hover:bg-accent/10 transition-all group shadow-sm">
          <Plus className="w-16 h-16 transition-transform group-hover:scale-110" />
        </button>
      </Link>
    </div>
  )
}
