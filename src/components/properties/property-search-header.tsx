
"use client"

import { Search, ChevronDown, Plus, Download, Trash2, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function PropertySearchHeader() {
  return (
    <div className="bg-white border-b px-4 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-2">
            Imóveis
            <HelpCircle className="w-5 h-5 text-muted-foreground cursor-help" />
          </h1>
          <Link href="/imoveis/novo">
            <Button className="btn-custom-red uppercase font-bold text-xs px-6">
              novo imóvel
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 max-w-2xl justify-end">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-full px-4 rounded-r-none border-r text-sm text-muted-foreground hover:bg-muted">
                    Todos <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Código</DropdownMenuItem>
                  <DropdownMenuItem>Endereço</DropdownMenuItem>
                  <DropdownMenuItem>Proprietário</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Input 
              className="pl-28 pr-10 h-11 border-muted focus-visible:ring-primary rounded-lg text-sm"
              placeholder="Pesquisa por código, endereço ou proprietário"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs">
                Ações <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem>Configurar Divulgação de Endereço</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Definir Motivos de Inativação</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" /> Exportar Resultado para CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="w-4 h-4 mr-2" /> Recuperar Imóveis
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
