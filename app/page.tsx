"use client"

import { Button } from "@/components/ui/button"
import { FeaturedBusinesses } from "@/components/featured-businesses"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { WordRotator } from "@/components/word-rotator"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - Full Screen Cinematic */}
      <section className="relative min-h-screen flex items-center pt-4 overflow-hidden border-b border-white/5">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-[1800px] mx-auto">
            
            {/* Left: Refined Logo Section */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1 relative">
              <div className="relative w-96 h-96 md:w-[750px] md:h-[750px] flex items-center justify-center">
                
                {/* Subtle Ambient Glow */}
                <div className="absolute w-[80%] h-[80%] bg-purple-600/5 blur-[120px] rounded-full" />
                
                {/* Floating Logo */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="relative z-10 w-[90%] h-[90%]"
                >
                  <img 
                    src="/logo.png" 
                    alt="AletheumX Icon" 
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(168,85,247,0.25)]"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="flex flex-col space-y-12 order-1 lg:order-2">
              <h1 className="lido-heading text-white max-w-4xl">
                <WordRotator /> <br />
                verificada con <br />
                <span className="font-bold text-[#A855F7]">AletheumX</span>
              </h1>
              <p className="lido-subheading max-w-2xl text-justify">
                El protocolo descentralizado que audita la honestidad de los negocios. 
                Construimos el estándar de reputación para la nueva web, garantizando que cada opinión sea auténtica y verificada on-chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section - Full Width Edge-to-Edge feel */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-medium mb-6 tracking-tight">Integración Universal</h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              AletheumX no es una isla. Es el protocolo que eleva la honestidad de las plataformas que ya usas. 
              Nos conectamos con los gigantes del sector para asegurar que cada estrella sea real.
            </p>
          </div>
          
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
              <div className="group transition-all duration-500">
                <img 
                  src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlemaps.svg" 
                  alt="Google Maps" 
                  className="h-8 w-auto object-contain brightness-0 invert opacity-30 group-hover:opacity-100 group-hover:filter-none transition-all duration-500" 
                />
              </div>
              <div className="group transition-all duration-500">
                <img 
                  src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/airbnb.svg" 
                  alt="Airbnb" 
                  className="h-8 w-auto object-contain brightness-0 invert opacity-30 group-hover:opacity-100 group-hover:filter-none transition-all duration-500" 
                />
              </div>
              <div className="group transition-all duration-500">
                <img 
                  src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tripadvisor.svg" 
                  alt="TripAdvisor" 
                  className="h-8 w-auto object-contain brightness-0 invert opacity-30 group-hover:opacity-100 group-hover:filter-none transition-all duration-500" 
                />
              </div>
              <div className="group transition-all duration-500">
                <div className="flex items-center gap-2 text-white opacity-20 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-xl font-light">+</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Ecosistema Abierto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses - Wide Grid */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex justify-between items-end mb-20">
              <div>
                <h2 className="text-5xl font-medium text-white tracking-tighter mb-4">Negocios Destacados</h2>
                <p className="text-gray-500 font-light">Directorio de comercios con reputación verificada on-chain.</p>
              </div>
              <Link href="/explorar" className="text-purple-400 font-medium hover:text-white transition-colors flex items-center gap-2">
                Ver todos los negocios <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <FeaturedBusinesses />
          </div>
        </div>
      </section>
      {/* Trust & Protocol Section */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight">Inmutabilidad Total</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Las reseñas registradas en AletheumX son permanentes. Ningún dueño de negocio puede borrarlas, garantizando una honestidad sin filtros.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <ArrowRight className="rotate-[-45deg] w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight">Cero Fraude</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Nuestro protocolo utiliza verificación on-chain para asegurar que cada opinión provenga de una interacción real, eliminando granjas de bots.
                </p>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-medium tracking-tight">Reputación Líquida</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Tu negocio construye un activo digital: su reputación. Este valor es exportable y verificable en cualquier dApp del ecosistema Web3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business CTA Section */}
      <section className="py-32 pb-48 bg-black">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full -mr-48 -mt-48 transition-all group-hover:bg-purple-500/20" />
              
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 leading-tight text-white">
                  ¿Eres dueño de un negocio? <br />
                  <span className="text-gray-400">Reclama tu perfil hoy.</span>
                </h2>
                <p className="text-xl text-gray-500 font-light mb-12 leading-relaxed">
                  Únete a la red de negocios más transparente del mundo. Atrae clientes que valoran la honestidad y construye una reputación que nadie podrá manipular.
                </p>
                <Button size="lg" className="pill-button bg-[#A855F7] text-white hover:bg-purple-600 h-16 px-10 text-lg">
                  <Link href="/register-business">Registrar mi Negocio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
import { ShieldCheck, Star } from "lucide-react"
