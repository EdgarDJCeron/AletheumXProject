"use client"

import { useEffect, useState } from "react"
import { Star, ArrowUpRight, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { BusinessService } from "@/services/business-service"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedBusinesses() {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedBusinesses = async () => {
      setIsLoading(true)
      try {
        const data = await BusinessService.getFeaturedBusinesses()
        // Mocking platform data for now
        const enhancedData = data.map((b: any, i: number) => ({
          ...b,
          platform: i % 3 === 0 ? 'maps' : i % 3 === 1 ? 'airbnb' : 'tripadvisor'
        }))
        setBusinesses(enhancedData)
      } catch (error) {
        console.error("Error loading businesses:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadFeaturedBusinesses()
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'maps':
        return "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlemaps.svg"
      case 'airbnb':
        return "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/airbnb.svg"
      case 'tripadvisor':
        return "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tripadvisor.svg"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] bg-zinc-900/40 rounded-[2.5rem] border border-white/5 p-8 flex flex-col space-y-4">
            <Skeleton className="h-12 w-12 rounded-xl bg-white/5" />
            <Skeleton className="h-8 w-3/4 bg-white/5" />
            <Skeleton className="h-20 w-full bg-white/5" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {businesses.map((business) => (
        <Link href={`/business/${business.id}`} key={business.id} className="block group">
          <div className="h-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 flex flex-col transition-all hover:bg-white/[0.05] hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] relative overflow-hidden">
            
            {/* Featured Badge */}
            <div className="absolute top-0 right-0 px-6 py-2 bg-purple-600/10 border-b border-l border-purple-500/20 rounded-bl-2xl flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Verificado On-Chain</span>
            </div>

            <div className="flex justify-between items-start mb-8 pt-4">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center p-0.5 border border-white/10 overflow-hidden">
                <img
                  src={business.logoUrl || "https://images.unsplash.com/photo-1620336655052-b57986f5a0a3?auto=format&fit=crop&q=80&w=100"}
                  alt={`${business.name} logo`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col items-end gap-2">
                 <div className="w-6 h-6 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    <img src={getPlatformIcon(business.platform)} alt={business.platform} className="w-full h-full brightness-0 invert" />
                 </div>
                 <span className="text-[9px] uppercase tracking-widest text-gray-600 font-medium">{business.category}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-purple-400 transition-colors">
                {business.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed font-light">
                {business.description}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                  <span className="text-white font-medium">{business.rating}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-gray-600 text-xs">{business.reviewCount} reseñas verificadas</span>
              </div>
              <div className="text-white/20 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
