"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MessageCircle, PlusSquare, Edit, Trash2, LayoutGrid, List, SlidersHorizontal, ArrowUpDown, UserRound } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PropertyActionsBar() {
  return (
    <div className="py-4 px-4 bg-white md:bg-transparent">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Bulk Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border mr-2">
            <Checkbox id="select-all" />
            <span className="text-sm font-bold text-primary">0</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10" disabled>
              <MessageCircle className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled>
                <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10">
                  <PlusSquare className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Criar tarefa</DropdownMenuItem>
                <DropdownMenuItem>Marcar visita</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Imprimir ficha</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled>
                <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10">
                  <Edit className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Acesso</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Divulgação</DropdownMenuItem>
                <DropdownMenuItem>Responsável</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="text-accent hover:bg-accent/10" disabled>
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="ml-4 text-sm text-primary/60 font-medium hidden sm:block">
            Mostrando <span className="font-bold">0-0</span> de <span className="font-bold">0</span> imóveis
          </div>
        </div>

        {/* View & Filters */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <div className="flex bg-white rounded-lg border p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted text-primary shadow-inner">
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted/50">
              <List className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <Select defaultValue="recentes">
              <SelectTrigger className="border-0 shadow-none h-8 w-32 focus:ring-0 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recentes">Recentes</SelectItem>
                <SelectItem value="antigos">Antigos</SelectItem>
                <SelectItem value="preço-menor">Menor preço</SelectItem>
                <SelectItem value="preço-maior">Maior preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg border pl-2 pr-3 py-1">
            <UserRound className="w-4 h-4 text-muted-foreground" />
            <Select defaultValue="todos">
              <SelectTrigger className="border-0 shadow-none h-8 w-32 focus:ring-0 text-sm font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="meus">Meus imóveis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="h-10 border-accent text-accent hover:bg-accent/5 font-bold uppercase text-xs px-4">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
