// Servicio para manejar operaciones relacionadas con negocios
export const BusinessService = {
  // Registrar un nuevo negocio
  registerBusiness: async (businessData: any): Promise<{ success: boolean; businessId: string }> => {
    // En una implementación real, esto enviaría los datos a una API o blockchain
    // Para este ejemplo, simulamos un registro exitoso
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simular delay de red

    // Simular un ID de negocio
    const businessId = `biz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // Simular éxito o fallo (95% de éxito)
    const success = Math.random() > 0.05

    if (!success) {
      throw new Error("Error al registrar el negocio. Por favor, inténtalo de nuevo.")
    }

    // En una implementación real, aquí se guardarían los datos en una base de datos
    // y se registraría el negocio en la blockchain
    console.log("Negocio registrado:", businessData)

    return {
      success: true,
      businessId,
    }
  },

  // Obtener negocios destacados
  getFeaturedBusinesses: async (): Promise<any[]> => {
    // En una implementación real, esto consultaría los negocios destacados de una API o blockchain
    // Para este ejemplo, devolvemos datos de ejemplo
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simular delay de red

    return [
      {
        id: "biz_1",
        name: "Lumina Café",
        description: "Cafetería de especialidad con granos de origen y ambiente minimalista.",
        rating: 4.9,
        reviewCount: 320,
        category: "Restaurantes",
        featured: true,
        logoUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
      },
      {
        id: "biz_2",
        name: "Zenith Estancias",
        description: "Suites de lujo con vistas panorámicas y servicios automatizados.",
        rating: 4.7,
        reviewCount: 156,
        category: "Hotelería",
        featured: true,
        logoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
      },
      {
        id: "biz_3",
        name: "Aura Boutique",
        description: "Selección exclusiva de moda sostenible y accesorios artesanales.",
        rating: 4.8,
        reviewCount: 94,
        category: "Tiendas",
        featured: true,
        logoUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
      },
    ]
  },
}
