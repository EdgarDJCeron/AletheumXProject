"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-between">
          
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 group z-10">
            <div className="w-5 h-5 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
              <img src="/logo.png" alt="AletheumX Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm font-bold tracking-tighter text-[#A855F7] uppercase">
              ALETHEUMX
            </span>
          </Link>

          {/* Nav Links - Absolutely Centered */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-normal text-gray-400 text-sm tracking-tight">
            <Link href="/explorar" className="hover:text-white transition-colors">Explorar</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Mis Reseñas</Link>
            <Link href="/sobre-nosotros" className="hover:text-white transition-colors">Cómo funciona</Link>
          </div>

          {/* Wallet - Right */}
          <div className="hidden md:flex items-center z-10">
            <ConnectWalletButton />
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-6 animate-in slide-in-from-top-2 shadow-2xl">
          <Link href="/explorar" className="text-gray-400 hover:text-white font-medium text-center">Explorar</Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white font-medium text-center">Mis Reseñas</Link>
          <Link href="/sobre-nosotros" className="text-gray-400 hover:text-white font-medium text-center">Cómo funciona</Link>
          <div className="pt-4 border-t border-white/10">
            <ConnectWalletButton />
          </div>
        </div>
      )}
    </nav>
  )
}
