
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Tv, Bell, ChevronDown, User, Settings, Zap, Power, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export function CRMHeader() {
  const pathname = usePathname()

  return (
    <header className="header-nav-stripe h-16 w-full flex items-center px-4 sticky top-0 z-50">
      <div className="flex items-center gap-6 flex-1">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="https://iili.io/C2y0h5Q.md.png"
            alt="imobTrack Logo"
            width={200}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <div className="h-10 w-px bg-white/20 mx-2 hidden md:block" />

        <nav className="hidden lg:flex items-center gap-1">
          {[
            { label: "Imóveis", href: "/imoveis" },
            { label: "Contatos", href: "/contatos" },
            { label: "Atendimentos", href: "/atendimentos" },
            { label: "Atividades", href: "/atividades" },
          ].map((item) => {
            const isActive = pathname.startsWith(item.href) || (item.href === "/imoveis" && pathname === "/")
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors ${isActive ? "nav-link-active text-white" : ""}`}
              >
                {item.label}
              </Link>
            )
          })}
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors focus:outline-none">
              Portais <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="text-center justify-center p-4 text-muted-foreground text-xs italic">
                Sem portais ativos
              </DropdownMenuItem>
              <DropdownMenuItem className="text-accent justify-center text-xs font-bold uppercase">
                Ver integrações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors focus:outline-none">
              Site <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Editor de Site</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/relatorios" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
            Relatórios
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hidden sm:flex" title="Ver Site">
            <Tv className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hidden sm:flex" title="Central de Ajuda">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-primary hidden" />
            </Button>
          </div>
        </div>

        <div className="h-10 w-px bg-white/20 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 pl-2 pr-1 py-1 rounded hover:bg-white/5 transition-colors group focus:outline-none">
            <Avatar className="w-8 h-8 border border-white/20">
              <AvatarFallback className="bg-accent text-white text-xs font-bold">AM</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start text-left leading-tight">
              <span className="text-white text-sm font-medium">Alexandre</span>
              <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Super Administrador</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white/40 group-data-[state=open]:rotate-180 transition-transform" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3 flex items-center gap-2 border-b">
              <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                 <Zap className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground truncate">Alexandre Mendonça Corretor | ID 13451</span>
            </div>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" /> Perfil de usuário
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" /> Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Power className="w-4 h-4 mr-2" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
