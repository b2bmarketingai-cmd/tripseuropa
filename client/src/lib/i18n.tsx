import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "es" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header
    "nav.destinations": "Destinos",
    "nav.packages": "Paquetes",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.signin": "Iniciar Sesión",
    "nav.myAccount": "Mi Cuenta",
    "nav.myBookings": "Mis Reservas",
    "nav.profile": "Perfil",
    "nav.signout": "Cerrar Sesión",
    
    // Hero
    "hero.badge": "Agencia de Viajes Premium a Europa",
    "hero.title1": "Descubre la",
    "hero.titleHighlight": "Magia",
    "hero.title2": "de Europa",
    "hero.subtitle": "Viajes personalizados, experiencias exclusivas y el mejor servicio en español. Tu aventura europea comienza aquí.",
    "hero.years": "+15 años",
    "hero.experience": "de experiencia",
    "hero.travelers": "+50,000",
    "hero.happyTravelers": "viajeros felices",
    "hero.rating": "calificación",
    
    // Contact Form
    "contact.title": "Cotiza tu Viaje Gratis",
    "contact.subtitle": "Recibe una propuesta personalizada en 24 horas",
    "contact.name": "Nombre Completo",
    "contact.email": "Correo Electrónico",
    "contact.phone": "Teléfono (Opcional)",
    "contact.service": "Servicio de Interés",
    "contact.selectService": "Selecciona un servicio",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntanos sobre tu viaje soñado a Europa...",
    "contact.submit": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Gracias por contactarnos!",
    "contact.successMessage": "Un asesor de viajes te contactará en las próximas 24 horas.",
    "contact.services.flights": "Vuelos a Europa",
    "contact.services.packages": "Paquetes Todo Incluido",
    "contact.services.hotels": "Reserva de Hoteles",
    "contact.services.honeymoon": "Luna de Miel",
    "contact.services.groups": "Viajes en Grupo",
    "contact.services.corporate": "Viajes Corporativos",
    "contact.services.other": "Otro",
    
    // Features
    "features.badge": "Por qué elegirnos",
    "features.title": "Viaja con los Expertos en Europa",
    "features.subtitle": "Somos la agencia líder en viajes a Europa desde Colombia. Conocemos cada destino como la palma de nuestra mano.",
    "features.flights": "Mejores Tarifas Aéreas",
    "features.flightsDesc": "Acceso a tarifas exclusivas con las principales aerolíneas europeas.",
    "features.hotels": "Hoteles Seleccionados",
    "features.hotelsDesc": "Alojamientos verificados y con las mejores ubicaciones en cada ciudad.",
    "features.support": "Soporte 24/7 en Español",
    "features.supportDesc": "Asistencia permanente durante todo tu viaje, cuando lo necesites.",
    "features.payments": "Pagos Flexibles",
    "features.paymentsDesc": "Financia tu viaje en cuotas sin intereses con tarjeta de crédito.",
    
    // Destinations
    "destinations.badge": "Inspiración",
    "destinations.title": "Destinos Populares",
    "destinations.subtitle": "Los lugares más soñados por nuestros viajeros colombianos",
    "destinations.viewAll": "Ver Todos los Destinos",
    "destinations.days": "días",
    "destinations.from": "Desde",
    "destinations.viewMore": "Ver Más",
    
    // Packages
    "packages.badge": "Paquetes Exclusivos",
    "packages.title": "Experiencias Diseñadas para Ti",
    "packages.subtitle": "Paquetes todo incluido con vuelos, hoteles, traslados y experiencias únicas",
    "packages.viewAll": "Ver Todos los Paquetes",
    "packages.perPerson": "por persona",
    "packages.quote": "Cotizar",
    "packages.bestSeller": "Más Vendido",
    
    // Testimonials
    "testimonials.badge": "Testimonios",
    "testimonials.title": "Lo que Dicen Nuestros Viajeros",
    
    // Process
    "process.badge": "Cómo Funciona",
    "process.title": "Tu Viaje en 4 Pasos",
    "process.step1.title": "Cuéntanos tu sueño",
    "process.step1.desc": "Completa el formulario con tus preferencias y destinos soñados.",
    "process.step2.title": "Recibe tu propuesta",
    "process.step2.desc": "En 24 horas recibirás un itinerario personalizado con opciones.",
    "process.step3.title": "Reserva y paga",
    "process.step3.desc": "Confirma tu viaje con pagos seguros y opciones de financiación.",
    "process.step4.title": "Disfruta Europa",
    "process.step4.desc": "Viaja tranquilo con nuestro soporte 24/7 durante toda tu aventura.",
    
    // CTA
    "cta.badge": "Comienza tu Aventura",
    "cta.title": "¿Listo para Conocer",
    "cta.titleHighlight": "Europa",
    "cta.subtitle": "Déjanos tus datos y un asesor experto te contactará para crear juntos el viaje de tus sueños. Sin compromiso, sin costo.",
    "cta.formTitle": "Solicita tu Cotización Gratis",
    "cta.formSubtitle": "Respuesta garantizada en menos de 24 horas",
    
    // Flight Search
    "search.flights": "Vuelos",
    "search.hotels": "Hoteles",
    "search.packages": "Paquetes",
    "search.cruises": "Cruceros",
    "search.origin": "Origen",
    "search.destination": "Destino",
    "search.departure": "Ida",
    "search.return": "Regreso",
    "search.date": "Fecha",
    "search.search": "Buscar",
    "search.searching": "Buscando...",
    "search.popular": "Populares:",
    "search.results": "Vuelos Disponibles",
    "search.perPerson": "por persona",
    "search.select": "Seleccionar",
    "search.flightNumber": "Vuelo",
    "search.departureTime": "Salida",
    "search.arrivalTime": "Llegada",
    
    // Footer
    "footer.description": "Expertos en viajes a Europa desde Colombia. Paquetes exclusivos, vuelos, hoteles y experiencias únicas diseñadas para ti.",
    "footer.destinations": "Destinos Populares",
    "footer.services": "Nuestros Servicios",
    "footer.contact": "Contáctanos",
    "footer.iata": "Agencia Acreditada IATA",
    "footer.ssl": "Pagos 100% Seguros",
    "footer.support": "Soporte en Español",
    "footer.rights": "Todos los derechos reservados.",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos y Condiciones",
    "footer.cookies": "Política de Cookies",
    
    // Contact Info
    "contactInfo.call": "Llámanos",
    "contactInfo.write": "Escríbenos",
    "contactInfo.visit": "Visítanos",
    
    // Form placeholders and validation
    "form.namePlaceholder": "Tu nombre",
    "form.emailPlaceholder": "tu@email.com",
    "form.phonePlaceholder": "+57 300 123 4567",
    "form.validation.nameMin": "El nombre debe tener al menos 2 caracteres",
    "form.validation.emailInvalid": "Ingresa un correo electrónico válido",
    "form.validation.messageMin": "El mensaje debe tener al menos 10 caracteres",
    "form.errorSend": "No se pudo enviar el mensaje. Intenta de nuevo.",
    
    // Destinations data
    "dest.paris": "París",
    "dest.rome": "Roma",
    "dest.barcelona": "Barcelona",
    "dest.santorini": "Santorini",
    "dest.amsterdam": "Ámsterdam",
    "dest.london": "Londres",
    "country.france": "Francia",
    "country.italy": "Italia",
    "country.spain": "España",
    "country.greece": "Grecia",
    "country.netherlands": "Holanda",
    "country.england": "Inglaterra",
    
    // Packages data
    "pkg.honeymoon.title": "Luna de Miel en Italia",
    "pkg.honeymoon.desc": "10 días recorriendo Roma, Florencia, Venecia y la Costa Amalfitana. Incluye cenas románticas y tours privados.",
    "pkg.adventure.title": "Aventura en los Alpes",
    "pkg.adventure.desc": "8 días entre Suiza, Austria y el norte de Italia. Trenes panorámicos, senderismo y paisajes de ensueño.",
    "pkg.cultural.title": "Capitales Imperiales",
    "pkg.cultural.desc": "12 días por Viena, Praga y Budapest. Arte, música clásica, palacios y la mejor gastronomía centroeuropea.",
    "pkg.feature.flights": "Vuelos incluidos",
    "pkg.feature.hotels5": "Hoteles 5 estrellas",
    "pkg.feature.transfers": "Traslados privados",
    "pkg.feature.tours": "Tours exclusivos",
    "pkg.feature.swissPass": "Swiss Travel Pass",
    "pkg.feature.mountainHotels": "Hoteles de montaña",
    "pkg.feature.cableCars": "Teleféricos incluidos",
    "pkg.feature.localGuide": "Guía local",
    "pkg.feature.flightsTrain": "Vuelos + tren",
    "pkg.feature.centralHotels": "Hoteles céntricos",
    "pkg.feature.concerts": "Conciertos y ópera",
    "pkg.feature.guidedTours": "Tours guiados",
    "pkg.tag.romantic": "Romántico",
    "pkg.tag.adventure": "Aventura",
    "pkg.tag.cultural": "Cultural",
    
    // Testimonials data
    "testimonial.1.text": "Increíble experiencia! El equipo de Trips Europa organizó nuestra luna de miel perfecta. Cada detalle estuvo cuidado, desde los traslados hasta las reservas en restaurantes.",
    "testimonial.2.text": "Viajamos en familia por primera vez a Europa y fue mágico. La asesoría para la visa fue invaluable y el itinerario estuvo perfecto para nuestros hijos.",
    "testimonial.3.text": "Ya he viajado 3 veces con ellos. Siempre superan mis expectativas. Los precios son justos y la atención personalizada hace toda la diferencia.",
    
    // Footer destinations
    "footer.dest.paris": "París",
    "footer.dest.madrid": "Madrid",
    "footer.dest.barcelona": "Barcelona",
    "footer.dest.rome": "Roma",
    "footer.dest.london": "Londres",
    "footer.dest.amsterdam": "Ámsterdam",
    
    // Footer services
    "footer.service.flights": "Vuelos",
    "footer.service.hotels": "Hoteles",
    "footer.service.packages": "Paquetes",
    "footer.service.tours": "Tours",
    "footer.service.insurance": "Seguros",
    "footer.service.esim": "eSIM",
    
    // Footer company
    "footer.company": "Empresa",
    "footer.aboutUs": "Sobre Nosotros",
    "footer.blog": "Blog",
    "footer.testimonials": "Testimonios",
    "footer.careers": "Trabaja con Nosotros",
    
    // Footer payment
    "footer.paymentMethods": "Medios de Pago",
    "footer.currencies": "Divisas: USD, EUR, COP",
    
    // Search placeholders and messages
    "search.originPlaceholder": "Bogotá, Colombia",
    "search.destinationPlaceholder": "París, Francia",
    "search.missingInfo": "Información incompleta",
    "search.fillAllFields": "Por favor completa todos los campos para buscar.",
    
    // Quick links
    "search.route.bogotaParis": "Bogotá - París",
    "search.route.bogotaMadrid": "Bogotá - Madrid",
    "search.route.bogotaRoma": "Bogotá - Roma",
    "search.route.medellinBarcelona": "Medellín - Barcelona",
    "search.city.bogota": "Bogotá",
    "search.city.medellin": "Medellín",
    "search.city.paris": "París",
    "search.city.madrid": "Madrid",
    "search.city.roma": "Roma",
    "search.city.barcelona": "Barcelona",
    
    // Services Section (expanded)
    "services.badge": "Nuestros Servicios",
    "services.title": "Todo lo que necesitas para tu viaje perfecto",
    "services.subtitle": "Servicios premium diseñados para viajeros exigentes que buscan experiencias únicas en Europa.",
    "services.directFlights": "Vuelos Directos",
    "services.directFlightsDesc": "Conexiones desde Bogotá y Medellín hacia las principales capitales europeas.",
    "services.boutiqueHotels": "Hoteles Boutique",
    "services.boutiqueHotelsDesc": "Alojamientos exclusivos 4 y 5 estrellas en ubicaciones privilegiadas.",
    "services.carRental": "Alquiler Premium",
    "services.carRentalDesc": "Vehículos de alta gama para recorrer Europa con total libertad.",
    "services.esim": "eSIM Europa",
    "services.esimDesc": "Conectividad ilimitada en 30+ países europeos sin complicaciones.",
    "services.vipInsurance": "Seguro VIP",
    "services.vipInsuranceDesc": "Cobertura premium con asistencia médica 24/7 y cancelación flexible.",
    "services.privateTours": "Tours Privados",
    "services.privateToursDesc": "Experiencias personalizadas con guías expertos en cada destino.",
    "services.vipTransfers": "Traslados VIP",
    "services.vipTransfersDesc": "Servicio de transporte ejecutivo aeropuerto-hotel y viceversa.",
    "services.exclusiveOffers": "Ofertas Exclusivas",
    "services.exclusiveOffersDesc": "Descuentos especiales y promociones solo para nuestros clientes.",
    
    // Blog Section
    "blog.badge": "Blog de Viajes",
    "blog.title": "Inspírate para tu próximo viaje",
    "blog.viewAll": "Ver todos los artículos",
    "blog.readMore": "Leer más",
    "blog.minRead": "min",
    "blog.article1.title": "Guía Completa: Visa Schengen para Colombianos 2025",
    "blog.article1.desc": "Todo lo que necesitas saber para tramitar tu visa europea desde Colombia.",
    "blog.article1.category": "Documentos",
    "blog.article2.title": "10 Experiencias de Lujo Imperdibles en París",
    "blog.article2.desc": "Desde cenas en la Torre Eiffel hasta cruceros privados por el Sena.",
    "blog.article2.category": "Lujo",
    "blog.article3.title": "Madrid vs Barcelona: ¿Cuál Elegir para tu Primer Viaje?",
    "blog.article3.desc": "Comparamos ambas ciudades para ayudarte a decidir tu próximo destino.",
    "blog.article3.category": "Destinos",
    "blog.article4.title": "Los Mejores Hoteles Boutique de Roma",
    "blog.article4.desc": "Alojamientos con encanto que harán tu experiencia italiana inolvidable.",
    "blog.article4.category": "Lujo",
    
    // VIP Club Section
    "vipClub.badge": "Únete al VIP Club",
    "vipClub.title": "Recibe ofertas exclusivas",
    "vipClub.subtitle": "Sé el primero en conocer nuestras promociones, destinos nuevos y tips de viaje.",
    "vipClub.discount": "+ 10% de descuento en tu primera reserva",
    "vipClub.placeholder": "Tu correo electrónico",
    "vipClub.button": "Suscribirme",
    "vipClub.noSpam": "Sin spam. Puedes cancelar cuando quieras.",
    "vipClub.success": "¡Bienvenido al VIP Club!",
    "vipClub.successDesc": "Recibirás nuestras mejores ofertas en tu correo.",
  },
  en: {
    // Header
    "nav.destinations": "Destinations",
    "nav.packages": "Packages",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.signin": "Sign In",
    "nav.myAccount": "My Account",
    "nav.myBookings": "My Bookings",
    "nav.profile": "Profile",
    "nav.signout": "Sign Out",
    
    // Hero
    "hero.badge": "Premium European Travel Agency",
    "hero.title1": "Discover the",
    "hero.titleHighlight": "Magic",
    "hero.title2": "of Europe",
    "hero.subtitle": "Personalized trips, exclusive experiences, and the best service. Your European adventure starts here.",
    "hero.years": "+15 years",
    "hero.experience": "of experience",
    "hero.travelers": "+50,000",
    "hero.happyTravelers": "happy travelers",
    "hero.rating": "rating",
    
    // Contact Form
    "contact.title": "Get a Free Quote",
    "contact.subtitle": "Receive a personalized proposal within 24 hours",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone (Optional)",
    "contact.service": "Service of Interest",
    "contact.selectService": "Select a service",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell us about your dream trip to Europe...",
    "contact.submit": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Thank you for contacting us!",
    "contact.successMessage": "A travel advisor will contact you within the next 24 hours.",
    "contact.services.flights": "Flights to Europe",
    "contact.services.packages": "All-Inclusive Packages",
    "contact.services.hotels": "Hotel Reservations",
    "contact.services.honeymoon": "Honeymoon",
    "contact.services.groups": "Group Travel",
    "contact.services.corporate": "Corporate Travel",
    "contact.services.other": "Other",
    
    // Features
    "features.badge": "Why Choose Us",
    "features.title": "Travel with European Experts",
    "features.subtitle": "We are the leading travel agency to Europe from Colombia. We know every destination like the back of our hand.",
    "features.flights": "Best Flight Rates",
    "features.flightsDesc": "Access to exclusive fares with major European airlines.",
    "features.hotels": "Selected Hotels",
    "features.hotelsDesc": "Verified accommodations with the best locations in each city.",
    "features.support": "24/7 Support in Spanish",
    "features.supportDesc": "Permanent assistance throughout your trip, whenever you need it.",
    "features.payments": "Flexible Payments",
    "features.paymentsDesc": "Finance your trip in interest-free installments with credit card.",
    
    // Destinations
    "destinations.badge": "Inspiration",
    "destinations.title": "Popular Destinations",
    "destinations.subtitle": "The most dreamed places by our Colombian travelers",
    "destinations.viewAll": "View All Destinations",
    "destinations.days": "days",
    "destinations.from": "From",
    "destinations.viewMore": "View More",
    
    // Packages
    "packages.badge": "Exclusive Packages",
    "packages.title": "Experiences Designed for You",
    "packages.subtitle": "All-inclusive packages with flights, hotels, transfers and unique experiences",
    "packages.viewAll": "View All Packages",
    "packages.perPerson": "per person",
    "packages.quote": "Quote",
    "packages.bestSeller": "Best Seller",
    
    // Testimonials
    "testimonials.badge": "Testimonials",
    "testimonials.title": "What Our Travelers Say",
    
    // Process
    "process.badge": "How It Works",
    "process.title": "Your Trip in 4 Steps",
    "process.step1.title": "Tell us your dream",
    "process.step1.desc": "Fill out the form with your preferences and dream destinations.",
    "process.step2.title": "Receive your proposal",
    "process.step2.desc": "In 24 hours you'll receive a personalized itinerary with options.",
    "process.step3.title": "Book and pay",
    "process.step3.desc": "Confirm your trip with secure payments and financing options.",
    "process.step4.title": "Enjoy Europe",
    "process.step4.desc": "Travel peacefully with our 24/7 support throughout your adventure.",
    
    // CTA
    "cta.badge": "Start Your Adventure",
    "cta.title": "Ready to Discover",
    "cta.titleHighlight": "Europe",
    "cta.subtitle": "Leave us your details and an expert advisor will contact you to create together the trip of your dreams. No commitment, no cost.",
    "cta.formTitle": "Request Your Free Quote",
    "cta.formSubtitle": "Guaranteed response in less than 24 hours",
    
    // Flight Search
    "search.flights": "Flights",
    "search.hotels": "Hotels",
    "search.packages": "Packages",
    "search.cruises": "Cruises",
    "search.origin": "Origin",
    "search.destination": "Destination",
    "search.departure": "Departure",
    "search.return": "Return",
    "search.date": "Date",
    "search.search": "Search",
    "search.searching": "Searching...",
    "search.popular": "Popular:",
    "search.results": "Available Flights",
    "search.perPerson": "per person",
    "search.select": "Select",
    "search.flightNumber": "Flight",
    "search.departureTime": "Departure",
    "search.arrivalTime": "Arrival",
    
    // Footer
    "footer.description": "Experts in European travel from Colombia. Exclusive packages, flights, hotels and unique experiences designed for you.",
    "footer.destinations": "Popular Destinations",
    "footer.services": "Our Services",
    "footer.contact": "Contact Us",
    "footer.iata": "IATA Accredited Agency",
    "footer.ssl": "100% Secure Payments",
    "footer.support": "Spanish Support",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.cookies": "Cookie Policy",
    
    // Contact Info
    "contactInfo.call": "Call Us",
    "contactInfo.write": "Write Us",
    "contactInfo.visit": "Visit Us",
    
    // Form placeholders and validation
    "form.namePlaceholder": "Your name",
    "form.emailPlaceholder": "you@email.com",
    "form.phonePlaceholder": "+1 555 123 4567",
    "form.validation.nameMin": "Name must be at least 2 characters",
    "form.validation.emailInvalid": "Enter a valid email address",
    "form.validation.messageMin": "Message must be at least 10 characters",
    "form.errorSend": "Could not send message. Please try again.",
    
    // Destinations data
    "dest.paris": "Paris",
    "dest.rome": "Rome",
    "dest.barcelona": "Barcelona",
    "dest.santorini": "Santorini",
    "dest.amsterdam": "Amsterdam",
    "dest.london": "London",
    "country.france": "France",
    "country.italy": "Italy",
    "country.spain": "Spain",
    "country.greece": "Greece",
    "country.netherlands": "Netherlands",
    "country.england": "England",
    
    // Packages data
    "pkg.honeymoon.title": "Honeymoon in Italy",
    "pkg.honeymoon.desc": "10 days touring Rome, Florence, Venice and the Amalfi Coast. Includes romantic dinners and private tours.",
    "pkg.adventure.title": "Alpine Adventure",
    "pkg.adventure.desc": "8 days through Switzerland, Austria and northern Italy. Scenic trains, hiking and dream landscapes.",
    "pkg.cultural.title": "Imperial Capitals",
    "pkg.cultural.desc": "12 days through Vienna, Prague and Budapest. Art, classical music, palaces and the best Central European cuisine.",
    "pkg.feature.flights": "Flights included",
    "pkg.feature.hotels5": "5-star hotels",
    "pkg.feature.transfers": "Private transfers",
    "pkg.feature.tours": "Exclusive tours",
    "pkg.feature.swissPass": "Swiss Travel Pass",
    "pkg.feature.mountainHotels": "Mountain hotels",
    "pkg.feature.cableCars": "Cable cars included",
    "pkg.feature.localGuide": "Local guide",
    "pkg.feature.flightsTrain": "Flights + train",
    "pkg.feature.centralHotels": "Central hotels",
    "pkg.feature.concerts": "Concerts and opera",
    "pkg.feature.guidedTours": "Guided tours",
    "pkg.tag.romantic": "Romantic",
    "pkg.tag.adventure": "Adventure",
    "pkg.tag.cultural": "Cultural",
    
    // Testimonials data
    "testimonial.1.text": "Incredible experience! The Trips Europa team organized our perfect honeymoon. Every detail was taken care of, from transfers to restaurant reservations.",
    "testimonial.2.text": "We traveled as a family to Europe for the first time and it was magical. The visa advice was invaluable and the itinerary was perfect for our children.",
    "testimonial.3.text": "I've traveled with them 3 times now. They always exceed my expectations. Fair prices and personalized attention make all the difference.",
    
    // Footer destinations
    "footer.dest.paris": "Paris",
    "footer.dest.madrid": "Madrid",
    "footer.dest.barcelona": "Barcelona",
    "footer.dest.rome": "Rome",
    "footer.dest.london": "London",
    "footer.dest.amsterdam": "Amsterdam",
    
    // Footer services
    "footer.service.flights": "Flights",
    "footer.service.hotels": "Hotels",
    "footer.service.packages": "Packages",
    "footer.service.tours": "Tours",
    "footer.service.insurance": "Insurance",
    "footer.service.esim": "eSIM",
    
    // Footer company
    "footer.company": "Company",
    "footer.aboutUs": "About Us",
    "footer.blog": "Blog",
    "footer.testimonials": "Testimonials",
    "footer.careers": "Careers",
    
    // Footer payment
    "footer.paymentMethods": "Payment Methods",
    "footer.currencies": "Currencies: USD, EUR, COP",
    
    // Search placeholders and messages
    "search.originPlaceholder": "Bogota, Colombia",
    "search.destinationPlaceholder": "Paris, France",
    "search.missingInfo": "Missing information",
    "search.fillAllFields": "Please fill in all fields to search.",
    
    // Quick links
    "search.route.bogotaParis": "Bogota - Paris",
    "search.route.bogotaMadrid": "Bogota - Madrid",
    "search.route.bogotaRoma": "Bogota - Rome",
    "search.route.medellinBarcelona": "Medellin - Barcelona",
    "search.city.bogota": "Bogota",
    "search.city.medellin": "Medellin",
    "search.city.paris": "Paris",
    "search.city.madrid": "Madrid",
    "search.city.roma": "Rome",
    "search.city.barcelona": "Barcelona",
    
    // Services Section (expanded)
    "services.badge": "Our Services",
    "services.title": "Everything you need for your perfect trip",
    "services.subtitle": "Premium services designed for discerning travelers seeking unique experiences in Europe.",
    "services.directFlights": "Direct Flights",
    "services.directFlightsDesc": "Connections from Bogota and Medellin to major European capitals.",
    "services.boutiqueHotels": "Boutique Hotels",
    "services.boutiqueHotelsDesc": "Exclusive 4 and 5-star accommodations in prime locations.",
    "services.carRental": "Premium Car Rental",
    "services.carRentalDesc": "High-end vehicles to explore Europe with complete freedom.",
    "services.esim": "Europe eSIM",
    "services.esimDesc": "Unlimited connectivity in 30+ European countries hassle-free.",
    "services.vipInsurance": "VIP Insurance",
    "services.vipInsuranceDesc": "Premium coverage with 24/7 medical assistance and flexible cancellation.",
    "services.privateTours": "Private Tours",
    "services.privateToursDesc": "Personalized experiences with expert guides at each destination.",
    "services.vipTransfers": "VIP Transfers",
    "services.vipTransfersDesc": "Executive airport-hotel transportation service and vice versa.",
    "services.exclusiveOffers": "Exclusive Offers",
    "services.exclusiveOffersDesc": "Special discounts and promotions only for our clients.",
    
    // Blog Section
    "blog.badge": "Travel Blog",
    "blog.title": "Get inspired for your next trip",
    "blog.viewAll": "View all articles",
    "blog.readMore": "Read more",
    "blog.minRead": "min",
    "blog.article1.title": "Complete Guide: Schengen Visa for Colombians 2025",
    "blog.article1.desc": "Everything you need to know to process your European visa from Colombia.",
    "blog.article1.category": "Documents",
    "blog.article2.title": "10 Unmissable Luxury Experiences in Paris",
    "blog.article2.desc": "From dinners at the Eiffel Tower to private cruises on the Seine.",
    "blog.article2.category": "Luxury",
    "blog.article3.title": "Madrid vs Barcelona: Which to Choose for Your First Trip?",
    "blog.article3.desc": "We compare both cities to help you decide your next destination.",
    "blog.article3.category": "Destinations",
    "blog.article4.title": "The Best Boutique Hotels in Rome",
    "blog.article4.desc": "Charming accommodations that will make your Italian experience unforgettable.",
    "blog.article4.category": "Luxury",
    
    // VIP Club Section
    "vipClub.badge": "Join the VIP Club",
    "vipClub.title": "Receive exclusive offers",
    "vipClub.subtitle": "Be the first to know about our promotions, new destinations and travel tips.",
    "vipClub.discount": "+ 10% discount on your first booking",
    "vipClub.placeholder": "Your email address",
    "vipClub.button": "Subscribe",
    "vipClub.noSpam": "No spam. You can cancel anytime.",
    "vipClub.success": "Welcome to the VIP Club!",
    "vipClub.successDesc": "You will receive our best offers in your inbox.",
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved || 'es';
    }
    return 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
