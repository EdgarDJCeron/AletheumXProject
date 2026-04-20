"use client"

import { ShieldCheck, Wallet, MessageSquare, Zap, Globe, Lock, Cpu, Database } from "lucide-react"

export default function AboutPage() {
  const steps = [
    {
      title: "Identidad Soberana",
      description: "Conecta tu wallet para crear tu perfil de auditor. No usamos correos ni contraseñas, solo tu firma criptográfica como prueba de identidad.",
      icon: <Wallet className="w-8 h-8" />,
    },
    {
      title: "Prueba de Interacción",
      description: "El protocolo verifica que has tenido una interacción real con el negocio mediante geolocalización o tickets digitales, eliminando el spam.",
      icon: <Cpu className="w-8 h-8" />,
    },
    {
      title: "Auditoría en Tiempo Real",
      description: "Al publicar tu reseña, esta se convierte en un bloque de datos inmutable. Se registra el hash en la blockchain, asegurando que nadie pueda editarla.",
      icon: <Database className="w-8 h-8" />,
    },
    {
      title: "Ecosistema de Confianza",
      description: "Tu reputación crece. Otros dApps y plataformas pueden consultar tu 'Trust Score' para ofrecerte beneficios exclusivos por ser un usuario honesto.",
      icon: <Globe className="w-8 h-8" />,
    }
  ]

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Hero Section */}
          <div className="max-w-4xl mb-32">
            <h1 className="lido-heading text-white mb-10">
              El Nuevo Estándar <br />
              <span className="text-[#A855F7]">de la Honestidad.</span>
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-4xl text-justify">
              AletheumX es más que una plataforma de reseñas; es un protocolo de auditoría descentralizada diseñado para limpiar la internet de opiniones falsas y manipulación comercial.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-48">
            {steps.map((step, index) => (
              <div key={index} className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 relative group hover:bg-white/[0.04] transition-all overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full group-hover:bg-purple-500/10 transition-all" />
                
                <div className="relative z-10 space-y-8">
                  <div className="text-purple-400">
                    {step.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-medium text-white tracking-tight">{step.title}</h3>
                    <p className="text-gray-500 text-lg font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Protocol Core Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="relative">
                <div className="w-full aspect-square bg-[#A855F7]/10 rounded-[4rem] border border-purple-500/20 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-50" />
                   <img src="/logo.png" className="w-48 h-48 object-contain filter drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]" alt="AletheumX Core" />
                   
                   {/* Decorative elements */}
                   <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                   <div className="absolute bottom-20 right-20 w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
             </div>
             
             <div className="space-y-12">
                <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tighter leading-tight">
                  Construido sobre los <br />
                  pilares de la transparencia.
                </h2>
                
                <div className="space-y-8">
                   <div className="flex gap-6">
                      <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg mb-2">Privacidad Privada</h4>
                        <p className="text-gray-500 font-light text-sm">Tu wallet es tu ID. Tú decides qué negocios auditar sin revelar datos personales a intermediarios.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Zap className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg mb-2">Resultados Inmediatos</h4>
                        <p className="text-gray-500 font-light text-sm">Validación instantánea on-chain con costos de transacción mínimos para el usuario final.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <ShieldCheck className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg mb-2">Anti-Garantía de Borrado</h4>
                        <p className="text-gray-500 font-light text-sm">Un contrato inteligente protege tu voz. El negocio no puede influir en la base de datos centralizada.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}
