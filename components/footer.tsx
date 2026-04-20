"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">
                <img src="/logo.png" alt="AletheumX" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-bold tracking-tighter text-[#A855F7] uppercase">ALETHEUMX</span>
            </div>
            
            <div className="flex flex-wrap gap-10 text-xs uppercase tracking-widest text-gray-600 font-medium">
              <Link href="/explorar" className="hover:text-white transition-colors">Explorar</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Mis Reseñas</Link>
              <Link href="/sobre-nosotros" className="hover:text-white transition-colors">Protocolo</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            </div>
            
            <p className="text-[10px] text-gray-700 uppercase tracking-widest">
              © 2025 AletheumX. EL ESTÁNDAR DE CONFIANZA DECENTRALIZADO.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
