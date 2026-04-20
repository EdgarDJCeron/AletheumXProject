"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ArrowLeft, ShieldCheck, History, Award, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function DashboardPage() {
  const { isConnected, shortAddress, address } = useWallet()
  const [activeTab, setActiveTab] = useState("reviews")

  // Mock data enhance
  const user = {
    reputation: 84,
    reviewCount: 24,
    joinedDate: "Marzo 2024",
    level: "Auditor Platino",
    impactScore: "1.2k",
  }

  const userReviews = [
    {
      id: 1,
      businessName: "Lumina Café",
      businessId: "biz_1",
      rating: 5,
      text: "La calidad del grano es excepcional. Se nota que cada taza es auditada por expertos. El ambiente minimalista ayuda a concentrarse.",
      date: "Ayer",
      txHash: "0x89e2...f4a1",
      platform: 'maps'
    },
    {
      id: 2,
      businessName: "Zenith Estancias",
      businessId: "biz_2",
      rating: 4,
      text: "Vistas increíbles y check-in automatizado perfecto. Solo mejoraría la velocidad del Wi-Fi en las plantas superiores.",
      date: "Hace 1 semana",
      txHash: "0x45c1...e2b9",
      platform: 'airbnb'
    },
    {
      id: 3,
      businessName: "Aura Boutique",
      businessId: "biz_3",
      rating: 5,
      text: "La mejor selección de moda sostenible que he visto. Transparencia total en el origen de los materiales.",
      date: "Hace 1 mes",
      txHash: "0x12a9...d8c3",
      platform: 'tripadvisor'
    }
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
            <ShieldCheck className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-4xl font-medium tracking-tighter text-white">Tu Reputación te espera</h1>
          <p className="text-gray-500 font-light">Conecta tu wallet para acceder a tu historial de auditorías y gestionar tu identidad descentralizada.</p>
          <ConnectWalletButton />
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 mb-12 hover:text-purple-400 transition-colors uppercase tracking-widest font-bold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Sidebar: Reputation Passport */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl -mr-16 -mt-16" />
                
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <img 
                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`} 
                            alt="Avatar" 
                            className="w-16 h-16 opacity-80"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-purple-500 text-black px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                      PRO
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-medium tracking-tighter text-white">{shortAddress}</h2>
                    <p className="text-purple-400 text-xs uppercase tracking-widest font-bold">{user.level}</p>
                  </div>

                  <div className="w-full pt-6 space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500">
                        <span>Reputación On-Chain</span>
                        <span className="text-white">{user.reputation}/100</span>
                      </div>
                      <Progress value={user.reputation} className="h-1.5 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                        <p className="text-[10px] uppercase text-gray-600 mb-1 tracking-widest">Reseñas</p>
                        <p className="text-xl font-medium text-white">{user.reviewCount}</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
                        <p className="text-[10px] uppercase text-gray-600 mb-1 tracking-widest">Impacto</p>
                        <p className="text-xl font-medium text-white">{user.impactScore}</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-white/10 rounded-2xl h-12 text-gray-400 hover:text-white" onClick={() => navigator.clipboard.writeText(address || "")}>
                    Copiar dirección
                  </Button>
                </div>
              </div>

              {/* Badges card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold">Logros Obtenidos</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20" title="Pionero">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20" title="Verificador">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 grayscale opacity-30" title="Más de 100 reseñas">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content: Reviews List */}
            <div className="lg:col-span-8">
              <div className="flex gap-12 border-b border-white/5 mb-12 no-scrollbar overflow-x-auto">
                <button 
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-6 text-sm font-medium tracking-widest uppercase transition-all relative ${activeTab === "reviews" ? "text-purple-400" : "text-gray-600 hover:text-white"}`}
                >
                  Mis Auditorías
                  {activeTab === "reviews" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                </button>
                <button 
                  onClick={() => setActiveTab("activity")}
                  className={`pb-6 text-sm font-medium tracking-widest uppercase transition-all relative ${activeTab === "activity" ? "text-purple-400" : "text-gray-600 hover:text-white"}`}
                >
                  Actividad
                  {activeTab === "activity" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
                </button>
              </div>

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  {userReviews.map((review) => (
                    <div key={review.id} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 transition-all hover:bg-white/[0.04]">
                      <div className="md:w-48 h-32 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                         <img 
                            src={
                                review.businessId === 'biz_1' ? "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200" :
                                review.businessId === 'biz_2' ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200" :
                                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200"
                            } 
                            alt={review.businessName}
                            className="w-full h-full object-cover opacity-60"
                         />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Link href={`/business/${review.businessId}`} className="text-2xl font-medium text-white hover:text-purple-400 transition-colors tracking-tighter">
                              {review.businessName}
                            </Link>
                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-purple-500 text-purple-500" : "text-gray-800"}`} />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                          "{review.text}"
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/5">
                          <div className="flex items-center gap-4">
                             <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] text-gray-500 uppercase font-bold font-mono">TX: {review.txHash}</span>
                             </div>
                             <a href="#" className="text-gray-700 hover:text-purple-400 transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" />
                             </a>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-white uppercase text-[10px] font-bold tracking-widest">
                            Editar Auditoría
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "activity" && (
                <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10">
                   <div className="space-y-12">
                      <div className="flex gap-6 relative">
                        <div className="absolute left-[7px] top-8 bottom-0 w-px bg-white/5" />
                        <div className="w-4 h-4 rounded-full bg-purple-500 mt-1 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        <div className="space-y-1">
                          <p className="text-white font-medium">Auditoría completada exitosamente</p>
                          <p className="text-sm text-gray-500">Publicaste una reseña verificada para Lumina Café</p>
                          <p className="text-xs text-gray-700 uppercase tracking-widest pt-2">Hoy - 14:32</p>
                        </div>
                      </div>
                      <div className="flex gap-6 relative">
                        <div className="absolute left-[7px] top-8 bottom-0 w-px bg-white/5" />
                        <div className="w-4 h-4 rounded-full bg-white/10 mt-1" />
                        <div className="space-y-1">
                          <p className="text-gray-400 font-medium">Actualización de pasaporte</p>
                          <p className="text-sm text-gray-500">Alcanzaste el nivel de Auditor Platino</p>
                          <p className="text-xs text-gray-700 uppercase tracking-widest pt-2">Ayer - 09:12</p>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
