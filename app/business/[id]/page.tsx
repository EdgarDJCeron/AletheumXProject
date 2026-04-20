"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, MapPin, Calendar, ArrowLeft, ShieldCheck, Info, ExternalLink, Globe, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/context/wallet-context"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { ReviewForm } from "@/components/review-form"
import { useToast } from "@/components/ui/use-toast"
import { VerificationBadge } from "@/components/verification-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VerificationDetails } from "@/components/verification-details"
import { EigenVerificationBadge } from "@/components/eigen-verification-badge"

export default function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [userReview, setUserReview] = useState<any | null>(null)
  const [selectedReview, setSelectedReview] = useState<any | null>(null)
  const { isConnected, address, chainId } = useWallet()
  const { toast } = useToast()
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false)

  // Mock business data based on the ID or default
  const business = {
    id: id,
    name: id === 'biz_1' ? "Lumina Café" : id === 'biz_2' ? "Zenith Estancias" : "Aura Boutique",
    description: "Un espacio diseñado para la excelencia y la sostenibilidad en el corazón de la ciudad. Auditado trimestralmente para garantizar la máxima calidad en cada servicio.",
    location: "Av. Blockchain 102, Distrito Digital",
    category: id === 'biz_1' ? "Restaurantes" : id === 'biz_2' ? "Viajes" : "Compras",
    rating: 4.8,
    reviewCount: 156,
    openHours: "Lun-Dom: 09:00 - 22:00",
    website: "https://aletheum.x/lumina",
    phone: "+1 888 234 567",
    contractAddress: "0x74a2...b9c1",
    coverImage: params.id === 'biz_1' ? "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1800" :
                 params.id === 'biz_2' ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1800" :
                 "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1800",
  }

  const reviews = [
    {
      id: 1,
      walletAddress: "0x1a2b...3c4d",
      rating: 5,
      text: "Experiencia increíble. La transparencia en los precios y el origen de los insumos es lo que hace que vuelva cada semana.",
      date: "Hace 2 días",
      verification: {
        status: "verified" as const,
        transactionHash: "0x89e2...f4a1",
        eigenLayerVerified: true,
        eigenConfidenceScore: 0.98,
      },
    },
    {
      id: 2,
      walletAddress: "0x5e6f...7g8h",
      rating: 4,
      text: "Muy buen servicio, el personal está altamente capacitado. Solo noté un ligero retraso en la hora pico, pero nada grave.",
      date: "Hace 1 semana",
      verification: {
        status: "verified" as const,
        transactionHash: "0x45c1...e2b9",
        eigenLayerVerified: true,
        eigenConfidenceScore: 0.85,
      },
    }
  ]

  const handleSubmitReview = (reviewData: any) => {
    setShowReviewForm(false)
    setHasReviewed(true)
    setUserReview(reviewData)
    toast({
      title: "Auditoría enviada",
      description: "Tu reseña está siendo grabada en la blockchain.",
    })
  }

  const openVerificationDetails = (review: any) => {
    setSelectedReview(review)
    setVerificationDialogOpen(true)
  }

  return (
    <main className="min-h-screen bg-black pb-20">
      
      {/* Hero Header with Background Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={business.coverImage} 
          alt={business.name} 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="w-full px-8 md:px-16 lg:px-24">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <Link href="/explorar" className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-bold mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al catálogo
              </Link>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div className="space-y-4">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] uppercase font-bold tracking-[0.2em] rounded-full inline-block">
                    {business.category}
                  </span>
                  <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white leading-none">
                    {business.name}
                  </h1>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-purple-500 text-purple-500" />
                      <span className="text-xl font-medium text-white">{business.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({business.reviewCount} auditorías)</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {business.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {!isConnected ? (
                    <ConnectWalletButton />
                  ) : (
                    <Button 
                      onClick={() => setShowReviewForm(true)} 
                      className="h-16 px-10 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                    >
                      Escribir Auditoría
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-8 md:px-16 lg:px-24 -mt-10 relative z-10">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Business Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Trust Score</p>
                  <p className="text-3xl text-white font-medium">9.2/10</p>
                  <Progress value={92} className="h-1 bg-white/5" />
               </div>
               <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Reviews On-Chain</p>
                  <p className="text-3xl text-white font-medium">100%</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter italic">Audit verified</p>
               </div>
               <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tiempo de Respuesta</p>
                  <p className="text-3xl text-white font-medium">~2h</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase">Soporte activo</p>
               </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-medium text-white tracking-tight">Acerca de este Negocio</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed text-justify max-w-4xl">
                {business.description}
              </p>
            </div>

            {showReviewForm && (
              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10">
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  onCancel={() => setShowReviewForm(false)}
                  businessId={Number(business.id) || 0}
                />
              </div>
            )}

            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-medium text-white tracking-tight">Historial de Auditoría</h2>
                <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">Reseñas en tiempo real</div>
              </div>
              
              <div className="space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 space-y-6 transition-all hover:bg-white/[0.04] group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                          <img 
                            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${review.walletAddress}`} 
                            alt="Auditor" 
                            className="w-8 h-8 opacity-60"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white tracking-tight">{review.walletAddress}</p>
                          <p className="text-[10px] text-gray-600 uppercase tracking-widest">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-purple-500 text-purple-500" : "text-gray-800"}`} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-lg font-light italic leading-relaxed">
                      "{review.text}"
                    </p>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-500 uppercase font-mono font-bold tracking-tighter">Verified TX: {review.verification.transactionHash}</span>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => openVerificationDetails(review)} className="text-gray-600 hover:text-white uppercase text-[10px] font-bold tracking-widest">
                        Detalles On-Chain
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 space-y-10">
              <h3 className="text-lg font-medium text-white tracking-tight underline decoration-purple-500/50 underline-offset-8">Contacto Maestro</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                    <Globe className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Sitio Web Oficial</p>
                    <a href={business.website} target="_blank" className="text-sm text-gray-300 hover:text-white transition-colors">{business.website}</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Línea de Atención</p>
                    <p className="text-sm text-gray-300">{business.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                    <Calendar className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Horario de Servicio</p>
                    <p className="text-sm text-gray-300">{business.openHours}</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full h-14 border-white/10 rounded-2xl text-gray-400 hover:text-white group">
                <MapPin className="w-4 h-4 mr-2" />
                Ver en el Mapa
              </Button>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 space-y-6">
              <h3 className="text-lg font-medium text-white tracking-tight">Auditoría Blockchain</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                Este perfil es inmutable. Cada dato e interacción está anclado a la dirección del contrato inteligente del establecimiento.
              </p>
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-4">
                <div className="space-y-1">
                  <p className="text-[9px] text-gray-700 uppercase font-bold tracking-widest">Smart Contract</p>
                  <p className="text-[10px] text-purple-400 font-mono break-all">{business.contractAddress}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-700 uppercase font-bold">Estado</span>
                  <span className="text-[10px] px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full font-bold">Activo</span>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-xs text-gray-700 hover:text-purple-400 uppercase tracking-widest font-bold">
                <ExternalLink className="w-3 h-3 mr-2" />
                Explorador de Bloques
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Verification Dialog */}
      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent className="bg-[#050505] border-white/10 text-white max-w-2xl rounded-[3rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium tracking-tight">Verificación de Auditoría</DialogTitle>
            <DialogDescription className="text-gray-500 uppercase text-[10px] tracking-widest font-bold">
              Evidencia On-Chain recuperada exitosamente
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-8 py-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Hash de TX</p>
                      <p className="text-[11px] text-purple-400 font-mono break-all">{selectedReview.verification.transactionHash}</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Confianza Eigen</p>
                      <p className="text-xl text-white font-medium">{Math.round(selectedReview.verification.eigenConfidenceScore * 100)}%</p>
                   </div>
                </div>
                <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-3xl">
                   <p className="text-sm text-green-500 font-light leading-relaxed">
                    Esta reseña ha sido validada por {Math.floor(Math.random() * 5) + 3} nodos independientes del protocolo. La autenticidad de la interacción está garantizada al 100%.
                   </p>
                </div>
                <Button onClick={() => setVerificationDialogOpen(false)} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-white">
                  Cerrar Reporte
                </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
