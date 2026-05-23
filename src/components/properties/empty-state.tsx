"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <div className="bg-white border rounded-xl p-12 text-center max-w-[1400px] mx-auto my-8 flex flex-col items-center gap-6">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-3xl font-bold text-primary">
          Você ainda não tem nenhum imóvel.{" "}
          <span className="block sm:inline text-accent">Adicione seus imóveis captados!</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Quando você adiciona todas as suas captações na PrimeEstate, mostramos a você ideias de como comercializar com mais inteligência.
        </p>
      </div>
      
      <Image
        src="https://picsum.photos/seed/estate/600/400"
        alt="Sem dados"
        width={400}
        height={300}
        className="mt-4 grayscale opacity-60"
        data-ai-hint="real estate empty"
      />

      <Button className="btn-custom-red h-12 px-10 rounded-lg font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transition-all">
        Começar agora
      </Button>
    </div>
  )
}
