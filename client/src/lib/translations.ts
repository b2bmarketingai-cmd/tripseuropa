/**
 * Centralized Translation Service for Trips Europa
 * All UI strings should be pulled from this dictionary for consistency
 */

export type SupportedLanguage = 'es' | 'en' | 'pt';

export interface TranslationDictionary {
  [key: string]: {
    es: string;
    en: string;
    pt: string;
  };
}

// Navigation & Header
export const navTranslations: TranslationDictionary = {
  home: {
    es: 'Inicio',
    en: 'Home',
    pt: 'Início'
  },
  destinations: {
    es: 'Destinos',
    en: 'Destinations',
    pt: 'Destinos'
  },
  packages: {
    es: 'Paquetes',
    en: 'Packages',
    pt: 'Pacotes'
  },
  blog: {
    es: 'Blog',
    en: 'Blog',
    pt: 'Blog'
  },
  about: {
    es: 'Nosotros',
    en: 'About Us',
    pt: 'Sobre Nós'
  },
  contact: {
    es: 'Contacto',
    en: 'Contact',
    pt: 'Contato'
  },
  lastMinute: {
    es: 'Última Hora',
    en: 'Last Minute',
    pt: 'Última Hora'
  },
  testimonials: {
    es: 'Testimonios',
    en: 'Testimonials',
    pt: 'Depoimentos'
  },
  myAccount: {
    es: 'Mi Cuenta',
    en: 'My Account',
    pt: 'Minha Conta'
  },
  dashboard: {
    es: 'Panel',
    en: 'Dashboard',
    pt: 'Painel'
  },
  logout: {
    es: 'Cerrar Sesión',
    en: 'Logout',
    pt: 'Sair'
  },
  login: {
    es: 'Iniciar Sesión',
    en: 'Login',
    pt: 'Entrar'
  }
};

// Common UI Elements
export const uiTranslations: TranslationDictionary = {
  learnMore: {
    es: 'Saber Más',
    en: 'Learn More',
    pt: 'Saiba Mais'
  },
  viewMore: {
    es: 'Ver Más',
    en: 'View More',
    pt: 'Ver Mais'
  },
  requestQuote: {
    es: 'Solicitar Cotización',
    en: 'Request Quote',
    pt: 'Solicitar Orçamento'
  },
  bookNow: {
    es: 'Reservar Ahora',
    en: 'Book Now',
    pt: 'Reservar Agora'
  },
  readMore: {
    es: 'Leer Más',
    en: 'Read More',
    pt: 'Ler Mais'
  },
  search: {
    es: 'Buscar',
    en: 'Search',
    pt: 'Buscar'
  },
  filter: {
    es: 'Filtrar',
    en: 'Filter',
    pt: 'Filtrar'
  },
  sort: {
    es: 'Ordenar',
    en: 'Sort',
    pt: 'Ordenar'
  },
  from: {
    es: 'Desde',
    en: 'From',
    pt: 'A partir de'
  },
  perPerson: {
    es: 'por persona',
    en: 'per person',
    pt: 'por pessoa'
  },
  days: {
    es: 'días',
    en: 'days',
    pt: 'dias'
  },
  nights: {
    es: 'noches',
    en: 'nights',
    pt: 'noites'
  },
  includes: {
    es: 'Incluye',
    en: 'Includes',
    pt: 'Inclui'
  },
  loading: {
    es: 'Cargando...',
    en: 'Loading...',
    pt: 'Carregando...'
  },
  error: {
    es: 'Error',
    en: 'Error',
    pt: 'Erro'
  },
  success: {
    es: 'Éxito',
    en: 'Success',
    pt: 'Sucesso'
  },
  close: {
    es: 'Cerrar',
    en: 'Close',
    pt: 'Fechar'
  },
  cancel: {
    es: 'Cancelar',
    en: 'Cancel',
    pt: 'Cancelar'
  },
  confirm: {
    es: 'Confirmar',
    en: 'Confirm',
    pt: 'Confirmar'
  },
  submit: {
    es: 'Enviar',
    en: 'Submit',
    pt: 'Enviar'
  },
  next: {
    es: 'Siguiente',
    en: 'Next',
    pt: 'Próximo'
  },
  previous: {
    es: 'Anterior',
    en: 'Previous',
    pt: 'Anterior'
  }
};

// Footer
export const footerTranslations: TranslationDictionary = {
  privacyPolicy: {
    es: 'Política de Privacidad',
    en: 'Privacy Policy',
    pt: 'Política de Privacidade'
  },
  termsConditions: {
    es: 'Términos y Condiciones',
    en: 'Terms & Conditions',
    pt: 'Termos e Condições'
  },
  salesConditions: {
    es: 'Condiciones de Venta',
    en: 'Sales Conditions',
    pt: 'Condições de Venda'
  },
  cancellationPolicy: {
    es: 'Política de Cancelación',
    en: 'Cancellation Policy',
    pt: 'Política de Cancelamento'
  },
  cookiePolicy: {
    es: 'Política de Cookies',
    en: 'Cookie Policy',
    pt: 'Política de Cookies'
  },
  followUs: {
    es: 'Síguenos',
    en: 'Follow Us',
    pt: 'Siga-nos'
  },
  contactUs: {
    es: 'Contáctanos',
    en: 'Contact Us',
    pt: 'Contate-nos'
  },
  phone: {
    es: 'Teléfono',
    en: 'Phone',
    pt: 'Telefone'
  },
  email: {
    es: 'Correo Electrónico',
    en: 'Email',
    pt: 'E-mail'
  },
  address: {
    es: 'Dirección',
    en: 'Address',
    pt: 'Endereço'
  },
  allRightsReserved: {
    es: 'Todos los derechos reservados',
    en: 'All rights reserved',
    pt: 'Todos os direitos reservados'
  }
};

// Error Messages
export const errorTranslations: TranslationDictionary = {
  pageNotFound: {
    es: 'Página no encontrada',
    en: 'Page not found',
    pt: 'Página não encontrada'
  },
  pageNotFoundDesc: {
    es: 'La página que buscas no existe o ha sido movida.',
    en: "The page you're looking for doesn't exist or has been moved.",
    pt: 'A página que você procura não existe ou foi movida.'
  },
  backToHome: {
    es: 'Volver al Inicio',
    en: 'Back to Home',
    pt: 'Voltar ao Início'
  },
  somethingWentWrong: {
    es: 'Algo salió mal',
    en: 'Something went wrong',
    pt: 'Algo deu errado'
  },
  tryAgain: {
    es: 'Intentar de nuevo',
    en: 'Try again',
    pt: 'Tentar novamente'
  }
};

// Contact Form
export const contactTranslations: TranslationDictionary = {
  fullName: {
    es: 'Nombre completo',
    en: 'Full name',
    pt: 'Nome completo'
  },
  emailAddress: {
    es: 'Correo electrónico',
    en: 'Email address',
    pt: 'Endereço de e-mail'
  },
  phoneNumber: {
    es: 'Teléfono',
    en: 'Phone number',
    pt: 'Número de telefone'
  },
  message: {
    es: 'Mensaje',
    en: 'Message',
    pt: 'Mensagem'
  },
  sendMessage: {
    es: 'Enviar mensaje',
    en: 'Send message',
    pt: 'Enviar mensagem'
  },
  sending: {
    es: 'Enviando...',
    en: 'Sending...',
    pt: 'Enviando...'
  },
  messageSent: {
    es: '¡Mensaje enviado!',
    en: 'Message sent!',
    pt: 'Mensagem enviada!'
  },
  messageSentDesc: {
    es: 'Nos pondremos en contacto contigo pronto.',
    en: "We'll contact you soon.",
    pt: 'Entraremos em contato em breve.'
  }
};

/**
 * Get translated text for a given key and language
 */
export function t(
  dictionary: TranslationDictionary,
  key: string,
  lang: SupportedLanguage = 'es'
): string {
  const translation = dictionary[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[lang] || translation.es || key;
}

/**
 * Hook for easy translation access
 */
export function useTranslations(language: SupportedLanguage = 'es') {
  return {
    nav: (key: string) => t(navTranslations, key, language),
    ui: (key: string) => t(uiTranslations, key, language),
    footer: (key: string) => t(footerTranslations, key, language),
    error: (key: string) => t(errorTranslations, key, language),
    contact: (key: string) => t(contactTranslations, key, language),
  };
}
