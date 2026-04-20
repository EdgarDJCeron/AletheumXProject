"use client"

import { useState } from "react"
import { Search, Filter, ShieldCheck, Star, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data for explorer
const ALL_BUSINESSES = [
  {
    id: "biz_1",
    name: "Lumina Café",
    description: "Cafetería de especialidad con granos de origen y ambiente minimalista.",
    rating: 4.9,
    reviewCount: 320,
    category: "Restaurantes",
    platform: 'maps',
    logoUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "biz_2",
    name: "Zenith Estancias",
    description: "Suites de lujo con vistas panorámicas y servicios automatizados.",
    rating: 4.7,
    reviewCount: 156,
    category: "Hotelería",
    platform: 'airbnb',
    logoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "biz_3",
    name: "Aura Boutique",
    description: "Selección exclusiva de moda sostenible y accesorios artesanales.",
    rating: 4.8,
    reviewCount: 94,
    category: "Tiendas",
    platform: 'tripadvisor',
    logoUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "biz_4",
    name: "Nebula Tech",
    description: "Hub de innovación para desarrolladores y nómadas digitales.",
    rating: 4.6,
    reviewCount: 210,
    category: "Servicios",
    platform: 'maps',
    logoUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "biz_5",
    name: "Elysium Spa",
    description: "Experiencias de bienestar ancestral combinadas con bio-tecnología.",
    rating: 5.0,
    reviewCount: 45,
    category: "Servicios",
    platform: 'maps',
    logoUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "biz_6",
    name: "Origen Gastrobar",
    description: "Cocina de autor enfocada en ingredientes locales y técnicas moleculares.",
    rating: 4.8,
    reviewCount: 182,
    category: "Restaurantes",
    platform: 'tripadvisor',
    logoUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400",
  }
]

const CATEGORIES = ["Todos", "Restaurantes", "Hotelería", "Tiendas", "Servicios"]

export default function ExplorarPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredBusinesses = ALL_BUSINESSES.filter(biz => {
    const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         biz.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "Todos" || biz.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tighter mb-6">Explorar</h1>
            <p className="text-gray-500 text-lg font-light max-w-2xl">
              Descubre negocios con reputación real, verificada permanentemente en la blockchain.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-10 mb-20">
            <div className="relative w-full max-w-2xl group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
              <Input 
                placeholder="Busca por nombre o servicio..." 
                className="bg-transparent border-b border-white/10 rounded-none h-16 pl-14 text-xl text-white placeholder:text-gray-700 focus:ring-0 focus:border-purple-500 transition-all font-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-12 border-b border-white/5 w-full overflow-x-auto no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-4 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeCategory === cat 
                      ? "text-purple-400" 
                      : "text-gray-600 hover:text-white"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 animate-in fade-in slide-in-from-bottom-1 duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredBusinesses.map((business) => (
              <Link href={`/business/${business.id}`} key={business.id} className="block group">
                <div className="h-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 flex flex-col transition-all hover:bg-white/[0.05] hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] relative overflow-hidden">
                  
                  {/* Verified Badge */}
                  <div className="absolute top-0 right-0 px-6 py-2 bg-purple-600/10 border-b border-l border-purple-500/20 rounded-bl-2xl flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-purple-400" />
                    <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold font-mono">Verified</span>
                  </div>

                  <div className="flex justify-between items-start mb-8 pt-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center p-0.5 border border-white/10 overflow-hidden">
                      <img
                        src={business.logoUrl}
                        alt={`${business.name} logo`}
                        className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-110 duration-700"
                      />
                    </div>
                    <div className="flex flex-col items-end gap-3">
                       <div className="w-5 h-5 opacity-20 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all">
                          <img 
                            src={
                              business.platform === 'maps' ? "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlemaps.svg" :
                              business.platform === 'airbnb' ? "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/airbnb.svg" :
                              "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tripadvisor.svg"
                            } 
                            alt={business.platform} 
                            className="w-full h-full brightness-0 invert" 
                          />
                       </div>
                       <span className="text-[9px] uppercase tracking-[0.2em] text-gray-700 font-bold">{business.category}</span>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-3xl font-medium text-white mb-3 group-hover:text-purple-400 transition-colors tracking-tighter">
                      {business.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light">
                      {business.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                        <span className="text-white font-medium">{business.rating}</span>
                      </div>
                      <div className="w-px h-3 bg-white/10 mx-1" />
                      <span className="text-gray-600 text-xs">{business.reviewCount} reseñas</span>
                    </div>
                    <div className="text-white/20 group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-40 border border-dashed border-white/10 rounded-[3rem]">
              <p className="text-gray-500 text-lg">No se encontraron negocios para tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
