export interface FAQItem {
  id: number;
  question: { es: string; en: string; pt: string };
  answer: { es: string; en: string; pt: string };
}

export interface FAQCategory {
  key: string;
  icon: string;
  label: { es: string; en: string; pt: string };
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    key: "destinations",
    icon: "📍",
    label: {
      es: "Destinos Populares",
      en: "Popular Destinations",
      pt: "Destinos Populares"
    },
    items: [
      {
        id: 1,
        question: {
          es: "¿Cuántos días son suficientes para conocer Roma?",
          en: "How many days are enough to see Rome?",
          pt: "Quantos dias são suficientes para conhecer Roma?"
        },
        answer: {
          es: "Con 3 días puedes ver lo esencial de Roma sin prisas. Este tiempo te permite visitar el Coliseo, el Vaticano y el centro histórico. En Trips Europa recomendamos un itinerario guiado para evitar colas y maximizar cada hora.",
          en: "With 3 days you can see the essential Rome without rushing. This time allows you to visit the Colosseum, the Vatican, and the historic center. At Trips Europa, we recommend a guided itinerary to skip lines and maximize every hour.",
          pt: "Com 3 dias você pode ver o essencial de Roma sem pressa. Este tempo permite visitar o Coliseu, o Vaticano e o centro histórico. Na Trips Europa recomendamos um itinerário guiado para evitar filas e maximizar cada hora."
        }
      },
      {
        id: 2,
        question: {
          es: "¿Cuál es la mejor época para visitar Roma?",
          en: "What is the best time to visit Rome?",
          pt: "Qual é a melhor época para visitar Roma?"
        },
        answer: {
          es: "La primavera (abril-junio) y el otoño (septiembre-octubre) son ideales por el clima templado y menos multitudes. El verano es muy caluroso y concurrido, mientras que el invierno ofrece menos turistas pero temperaturas frías.",
          en: "Spring (April-June) and autumn (September-October) are ideal due to mild weather and fewer crowds. Summer is very hot and crowded, while winter offers fewer tourists but cold temperatures.",
          pt: "A primavera (abril-junho) e o outono (setembro-outubro) são ideais pelo clima ameno e menos multidões. O verão é muito quente e movimentado, enquanto o inverno oferece menos turistas, mas temperaturas frias."
        }
      },
      {
        id: 3,
        question: {
          es: "¿Es necesario comprar entradas con antelación para el Coliseo?",
          en: "Is it necessary to buy tickets in advance for the Colosseum?",
          pt: "É necessário comprar ingressos com antecedência para o Coliseu?"
        },
        answer: {
          es: "Sí, es imprescindible. Las entradas en puerta suelen agotarse y las colas pueden durar horas. Los paquetes de Trips Europa incluyen entrada prioritaria para saltar la fila.",
          en: "Yes, it is essential. Tickets at the door usually sell out and queues can last hours. Trips Europa packages include priority entry to skip the line.",
          pt: "Sim, é imprescindível. Os ingressos na porta geralmente esgotam e as filas podem durar horas. Os pacotes da Trips Europa incluem entrada prioritária para pular a fila."
        }
      },
      {
        id: 4,
        question: {
          es: "¿Qué ver en París además de la Torre Eiffel?",
          en: "What to see in Paris besides the Eiffel Tower?",
          pt: "O que ver em Paris além da Torre Eiffel?"
        },
        answer: {
          es: "París ofrece barrios encantadores como Le Marais y Montmartre, museos como el Louvre y el Musée d'Orsay, y paseos por el Sena. Recomendamos explorar los mercados locales y bistrós auténticos para una experiencia real.",
          en: "Paris offers charming neighborhoods like Le Marais and Montmartre, museums like the Louvre and Musée d'Orsay, and walks along the Seine. We recommend exploring local markets and authentic bistros for a real experience.",
          pt: "Paris oferece bairros encantadores como Le Marais e Montmartre, museus como o Louvre e o Musée d'Orsay, e passeios pelo Sena. Recomendamos explorar os mercados locais e bistrôs autênticos para uma experiência real."
        }
      },
      {
        id: 5,
        question: {
          es: "¿Es caro comer en París?",
          en: "Is it expensive to eat in Paris?",
          pt: "É caro comer em Paris?"
        },
        answer: {
          es: "No tiene que serlo. Evitando restaurantes cerca de las grandes atracciones y optando por \"boulangeries\" o bistrós de barrio, puedes comer bien a precios razonables. Nuestros guías recomiendan locales donde comen los parisinos.",
          en: "It doesn't have to be. Avoiding restaurants near major attractions and opting for \"boulangeries\" or neighborhood bistros, you can eat well at reasonable prices. Our guides recommend places where Parisians actually eat.",
          pt: "Não precisa ser. Evitando restaurantes próximos às grandes atrações e optando por \"boulangeries\" ou bistrôs de bairro, você pode comer bem a preços razoáveis. Nossos guias recomendam locais onde os parisienses comem."
        }
      },
      {
        id: 6,
        question: {
          es: "¿Madrid o Barcelona para un primer viaje a España?",
          en: "Madrid or Barcelona for a first trip to Spain?",
          pt: "Madrid ou Barcelona para uma primeira viagem à Espanha?"
        },
        answer: {
          es: "Depende de tus gustos. Elige Madrid si prefieres museos de clase mundial, tapeo auténtico y ambiente local. Elige Barcelona si te atrae la arquitectura de Gaudí, la playa y un ambiente cosmopolita. Trips Europa ofrece tours que combinan ambas ciudades.",
          en: "It depends on your tastes. Choose Madrid if you prefer world-class museums, authentic tapas, and local atmosphere. Choose Barcelona if you're attracted to Gaudí's architecture, the beach, and a cosmopolitan vibe. Trips Europa offers tours combining both cities.",
          pt: "Depende dos seus gostos. Escolha Madrid se preferir museus de classe mundial, tapeo autêntico e ambiente local. Escolha Barcelona se se sentir atraído pela arquitetura de Gaudí, a praia e um ambiente cosmopolita. A Trips Europa oferece tours que combinam ambas as cidades."
        }
      },
      {
        id: 7,
        question: {
          es: "¿Cuánto tiempo se necesita para visitar Madrid?",
          en: "How much time is needed to visit Madrid?",
          pt: "Quanto tempo se precisa para visitar Madrid?"
        },
        answer: {
          es: "Con 3 días puedes ver lo principal de Madrid: el Triángulo del Arte, el Palacio Real y disfrutar de la vida en barrios como La Latina o Malasaña. Es una ciudad muy caminable y acogedora.",
          en: "With 3 days you can see Madrid's main attractions: the Art Triangle, the Royal Palace, and enjoy life in neighborhoods like La Latina or Malasaña. It's a very walkable and welcoming city.",
          pt: "Com 3 dias você pode ver o principal de Madrid: o Triângulo da Arte, o Palácio Real e desfrutar da vida em bairros como La Latina ou Malasaña. É uma cidade muito caminhável e acolhedora."
        }
      },
      {
        id: 8,
        question: {
          es: "¿Se necesita tarjeta para entrar a los museos de Barcelona?",
          en: "Do you need a card to enter Barcelona museums?",
          pt: "É necessário cartão para entrar nos museus de Barcelona?"
        },
        answer: {
          es: "La mayoría de museos como la Sagrada Familia o el Park Güell requieren entrada anticipada, especialmente en temporada alta. Es vital reservar con semanas de antelación para garantizar el acceso.",
          en: "Most museums like Sagrada Familia or Park Güell require advance tickets, especially in high season. It's vital to book weeks in advance to guarantee access.",
          pt: "A maioria dos museus como a Sagrada Família ou o Park Güell exige entrada antecipada, especialmente na temporada alta. É vital reservar com semanas de antecedência para garantir o acesso."
        }
      },
      {
        id: 9,
        question: {
          es: "¿Qué hacer si llueve en Londres o París?",
          en: "What to do if it rains in London or Paris?",
          pt: "O que fazer se chover em Londres ou Paris?"
        },
        answer: {
          es: "Ambas ciudades tienen excelentes museos cubiertos (Louvre, British Museum) y mercados cubiertos. Una buena opción es hacer un tour en bus panorámico con techo transparente o participar en talleres de cocina o arte indoor.",
          en: "Both cities have excellent covered museums (Louvre, British Museum) and covered markets. A good option is to take a panoramic bus tour with transparent roof or participate in indoor cooking or art workshops.",
          pt: "Ambas as cidades têm excelentes museus cobertos (Louvre, British Museum) e mercados cobertos. Uma boa opção é fazer um tour em ônibus panorâmico com teto transparente ou participar de oficinas de culinária ou arte cobertas."
        }
      },
      {
        id: 10,
        question: {
          es: "¿Es seguro viajar a Europa en solitario?",
          en: "Is it safe to travel to Europe alone?",
          pt: "É seguro viajar para a Europa sozinho?"
        },
        answer: {
          es: "Sí, Europa es uno de los destinos más seguros para viajeros solos. Unirse a un tour grupal como los de Trips Europa te permite seguridad, compañía y logística resuelta, ideal si viajas solo por primera vez.",
          en: "Yes, Europe is one of the safest destinations for solo travelers. Joining a group tour like those from Trips Europa gives you safety, companionship, and resolved logistics, ideal if you're traveling alone for the first time.",
          pt: "Sim, a Europa é um dos destinos mais seguros para viajantes solitários. Unir-se a um tour em grupo como os da Trips Europa permite segurança, companhia e logística resolvida, ideal se você viaja sozinho pela primeira vez."
        }
      }
    ]
  },
  {
    key: "documentation",
    icon: "🎒",
    label: {
      es: "Documentación y Requisitos",
      en: "Documentation & Requirements",
      pt: "Documentação e Requisitos"
    },
    items: [
      {
        id: 11,
        question: {
          es: "¿Qué es el ETIAS y cuándo entra en vigor?",
          en: "What is ETIAS and when does it come into effect?",
          pt: "O que é o ETIAS e quando entra em vigor?"
        },
        answer: {
          es: "ETIAS es el Sistema Europeo de Información y Autorización de Viajes, una exención de visa electrónica obligatoria para visitantes de países exentos de visa (como Latinoamérica) a partir de 2025-2026. Se obtiene online en minutos.",
          en: "ETIAS is the European Travel Information and Authorization System, a mandatory electronic visa exemption for visitors from visa-exempt countries (like Latin America) starting from 2025-2026. It's obtained online in minutes.",
          pt: "ETIAS é o Sistema Europeu de Informação e Autorização de Viagens, uma isenção de visto eletrônica obrigatória para visitantes de países isentos de visto (como América Latina) a partir de 2025-2026. Obtém-se online em minutos."
        }
      },
      {
        id: 12,
        question: {
          es: "¿Cuánto cuesta el ETIAS?",
          en: "How much does ETIAS cost?",
          pt: "Quanto custa o ETIAS?"
        },
        answer: {
          es: "El coste aproximado es de 7 euros por solicitud. Este pago se realiza online con tarjeta de crédito o débito al momento de llenar el formulario en la web oficial.",
          en: "The approximate cost is 7 euros per application. This payment is made online with credit or debit card when filling out the form on the official website.",
          pt: "O custo aproximado é de 7 euros por solicitação. Este pagamento é feito online com cartão de crédito ou débito no momento de preencher o formulário no site oficial."
        }
      },
      {
        id: 13,
        question: {
          es: "¿Cuánta vigencia debe tener mi pasaporte para viajar a Europa?",
          en: "How much validity must my passport have to travel to Europe?",
          pt: "Quanta validade deve ter meu passaporte para viajar à Europa?"
        },
        answer: {
          es: "Tu pasaporte debe tener al menos 3 meses de vigencia después de tu fecha de salida prevista del Espacio Schengen. Se recomienda tener 6 meses para evitar problemas con aerolíneas.",
          en: "Your passport must have at least 3 months of validity after your planned departure date from the Schengen Area. It's recommended to have 6 months to avoid problems with airlines.",
          pt: "Seu passaporte deve ter pelo menos 3 meses de validade após sua data de saída prevista do Espaço Schengen. Recomenda-se ter 6 meses para evitar problemas com companhias aéreas."
        }
      },
      {
        id: 14,
        question: {
          es: "¿Es obligatorio el seguro de viaje para entrar a Europa?",
          en: "Is travel insurance mandatory to enter Europe?",
          pt: "É obrigatório o seguro de viagem para entrar na Europa?"
        },
        answer: {
          es: "Sí, el Espacio Schengen exige un seguro médico que cubra gastos hasta 30,000 euros, repatriación y emergencias médicas. Trips Europa ofrece opciones de seguros integrales que cumplen estos requisitos.",
          en: "Yes, the Schengen Area requires medical insurance covering expenses up to 30,000 euros, repatriation, and medical emergencies. Trips Europa offers comprehensive insurance options that meet these requirements.",
          pt: "Sim, o Espaço Schengen exige um seguro médico que cubra despesas até 30.000 euros, repatriação e emergências médicas. A Trips Europa oferece opções de seguros abrangentes que cumprem estes requisitos."
        }
      },
      {
        id: 15,
        question: {
          es: "¿Necesito visa para ir a Europa siendo ciudadano latinoamericano?",
          en: "Do I need a visa to go to Europe as a Latin American citizen?",
          pt: "Preciso de visto para ir à Europa sendo cidadão latino-americano?"
        },
        answer: {
          es: "La mayoría de países latinoamericanos no necesitan visa para estancias cortas (hasta 90 días) gracias al régimen de exención, pero necesitarán la autorización ETIAS a partir de su implementación. Verifica siempre tu nacionalidad específica.",
          en: "Most Latin American countries don't need a visa for short stays (up to 90 days) thanks to the exemption regime, but they will need ETIAS authorization from its implementation. Always verify your specific nationality.",
          pt: "A maioria dos países latino-americanos não precisa de visto para estadias curtas (até 90 dias) graças ao regime de isenção, mas precisarão da autorização ETIAS a partir de sua implementação. Verifique sempre sua nacionalidade específica."
        }
      },
      {
        id: 16,
        question: {
          es: "¿Qué pasa si mi pasaporte vence durante el viaje?",
          en: "What happens if my passport expires during the trip?",
          pt: "O que acontece se meu passaporte vencer durante a viagem?"
        },
        answer: {
          es: "No podrás entrar ni salir del país. Debes renovar tu pasaporte antes de viajar. La regla de oro es asegurarte de que la validez cubra toda tu estadía más el margen de seguridad de 3 meses.",
          en: "You won't be able to enter or leave the country. You must renew your passport before traveling. The golden rule is to ensure validity covers your entire stay plus the 3-month safety margin.",
          pt: "Você não poderá entrar nem sair do país. Deve renovar seu passaporte antes de viajar. A regra de ouro é garantir que a validade cubra toda sua estadia mais a margem de segurança de 3 meses."
        }
      },
      {
        id: 17,
        question: {
          es: "¿Es válido el carnet de conducir de mi país para alquilar un auto en Europa?",
          en: "Is my country's driver's license valid for renting a car in Europe?",
          pt: "É válida a carteira de motorista do meu país para alugar um carro na Europa?"
        },
        answer: {
          es: "Depende del país. Muchos exigen el Permiso Internacional de Conducir (PID) junto con tu licencia local. Si alquilas dentro de un tour organizado, el transporte está incluido y no te preocupará esto.",
          en: "It depends on the country. Many require the International Driving Permit (IDP) along with your local license. If you rent within an organized tour, transportation is included and you won't need to worry about this.",
          pt: "Depende do país. Muitos exigem a Permissão Internacional de Dirigir (PID) junto com sua licença local. Se alugar dentro de um tour organizado, o transporte está incluído e você não precisará se preocupar com isso."
        }
      },
      {
        id: 18,
        question: {
          es: "¿Necesito vacunas para viajar a Europa?",
          en: "Do I need vaccines to travel to Europe?",
          pt: "Preciso de vacinas para viajar à Europa?"
        },
        answer: {
          es: "Generalmente no se requieren vacunas obligatorias para turistas, salvo circunstancias excepcionales de salud pública. Se recomienda estar al día con el calendario vacunal rutinario y tener seguro que cubra enfermedades comunes.",
          en: "Generally, no mandatory vaccines are required for tourists, except for exceptional public health circumstances. It's recommended to be up to date with the routine vaccination schedule and have insurance covering common illnesses.",
          pt: "Geralmente não são exigidas vacinas obrigatórias para turistas, salvo circunstâncias excepcionais de saúde pública. Recomenda-se estar em dia com o calendário vacinal de rotina e ter seguro que cubra doenças comuns."
        }
      },
      {
        id: 19,
        question: {
          es: "¿Puedo viajar a Europa con un DUI o antecedentes penales?",
          en: "Can I travel to Europe with a DUI or criminal record?",
          pt: "Posso viajar à Europa com um DUI ou antecedentes criminais?"
        },
        answer: {
          es: "Generalmente sí, para turismo es posible, pero puede haber restricciones para entrada a ciertos países (como el Reino Unido). Se recomienda consultar con la embajada del destino específico. Un tour organizado facilita el proceso de check-in y alojamiento.",
          en: "Generally yes, for tourism it's possible, but there may be restrictions for entry to certain countries (like the United Kingdom). It's recommended to consult with the embassy of the specific destination. An organized tour facilitates the check-in and accommodation process.",
          pt: "Geralmente sim, para turismo é possível, mas pode haver restrições para entrada em certos países (como o Reino Unido). Recomenda-se consultar a embaixada do destino específico. Um tour organizado facilita o processo de check-in e alojamento."
        }
      },
      {
        id: 20,
        question: {
          es: "¿Cuánto dinero en efectivo debo declarar al entrar a Europa?",
          en: "How much cash must I declare when entering Europe?",
          pt: "Quanto dinheiro em espécie devo declarar ao entrar na Europa?"
        },
        answer: {
          es: "Si llevas más de 10,000 euros (en efectivo o equivalentes) debes declararlo obligatoriamente en la aduana. Llevar excesivo efectivo no es recomendable por seguridad; se prefieren tarjetas.",
          en: "If you carry more than 10,000 euros (in cash or equivalents), you must declare it mandatory at customs. Carrying excessive cash is not recommended for safety; cards are preferred.",
          pt: "Se levar mais de 10.000 euros (em espécie ou equivalentes) deve declarar obrigatoriamente na alfândega. Levar excesso de espécie não é recomendável por segurança; preferem-se cartões."
        }
      }
    ]
  },
  {
    key: "preparation",
    icon: "🛄",
    label: {
      es: "Preparación y Empaque",
      en: "Preparation & Packing",
      pt: "Preparação e Embalagem"
    },
    items: [
      {
        id: 21,
        question: {
          es: "¿Qué tipo de maleta es mejor para un tour por Europa?",
          en: "What type of suitcase is best for a tour of Europe?",
          pt: "Que tipo de mala é melhor para um tour pela Europa?"
        },
        answer: {
          es: "Se recomienda una maleta rígida mediana (ruedas giratorias 360°) para proteger tus pertenencias y facilitar el transporte en autobuses o trenes. Las mochilas son opción solo para mochileros.",
          en: "A medium-sized hard suitcase (360° swivel wheels) is recommended to protect your belongings and facilitate transport on buses or trains. Backpacks are only an option for backpackers.",
          pt: "Recomenda-se uma mala rígida média (rodas giratórias 360°) para proteger seus pertences e facilitar o transporte em ônibus ou trens. As mochilas são opção apenas para mochileiros."
        }
      },
      {
        id: 22,
        question: {
          es: "¿Qué ropa llevar a Europa en invierno?",
          en: "What clothes to bring to Europe in winter?",
          pt: "Que roupa levar à Europa no inverno?"
        },
        answer: {
          es: "Lleva ropa en capas: térmica interior, suéter de lana y un abrigo impermeable y cortaviento. No olvides bufanda, guantes y gorro, especialmente si visitas París, Londres o los Alpes.",
          en: "Bring layered clothing: thermal underwear, wool sweater, and waterproof windbreaker. Don't forget scarf, gloves, and hat, especially if visiting Paris, London, or the Alps.",
          pt: "Leve roupa em camadas: térmica interior, suéter de lã e um casaco impermeável e corta-vento. Não esqueça cachecol, luvas e gorro, especialmente se visitar Paris, Londres ou os Alpes."
        }
      },
      {
        id: 23,
        question: {
          es: "¿Puedo usar shorts y sandalias al entrar a iglesias en Europa?",
          en: "Can I wear shorts and sandals when entering churches in Europe?",
          pt: "Posso usar shorts e sandálias ao entrar em igrejas na Europa?"
        },
        answer: {
          es: "No, la mayoría de catedrales y basílicas (como el Vaticano) exigen \"ropa modesta\": hombros y rodillas cubiertos. Lleva siempre un pantalón ligero y una bufanda o chaqueta en tu mochila.",
          en: "No, most cathedrals and basilicas (like the Vatican) require \"modest clothing\": shoulders and knees covered. Always carry light pants and a scarf or jacket in your backpack.",
          pt: "Não, a maioria das catedrais e basílicas (como o Vaticano) exige \"roupa modesta\": ombros e joelhos cobertos. Leve sempre uma calça leve e um cachecol ou jaqueta em sua mochila."
        }
      },
      {
        id: 24,
        question: {
          es: "¿Es necesario un adaptador de enchufes para Europa?",
          en: "Is a plug adapter necessary for Europe?",
          pt: "É necessário um adaptador de tomadas para a Europa?"
        },
        answer: {
          es: "Sí, Europa usa principalmente los tipos C, E y F (dos patas redondas). Un adaptador universal es la mejor inversión para cargar tu celular, cámara y otros dispositivos.",
          en: "Yes, Europe mainly uses types C, E, and F (two round pins). A universal adapter is the best investment for charging your phone, camera, and other devices.",
          pt: "Sim, a Europa usa principalmente os tipos C, E e F (duas pernas redondas). Um adaptador universal é o melhor investimento para carregar seu celular, câmera e outros dispositivos."
        }
      },
      {
        id: 25,
        question: {
          es: "¿Cuántos kilos de equipaje puedo llevar?",
          en: "How many kilos of luggage can I bring?",
          pt: "Quantos quilos de bagagem posso levar?"
        },
        answer: {
          es: "Depende de la aerolínea (generalmente 23kg en clase turista). En tours organizados, lo ideal es empacar ligero, ya que tú mismo subes la maleta al bus o hotel.",
          en: "It depends on the airline (generally 23kg in economy class). On organized tours, the ideal is to pack light, as you yourself carry the suitcase onto the bus or to the hotel.",
          pt: "Depende da companhia aérea (geralmente 23kg na classe turística). Em tours organizados, o ideal é fazer a mala leve, já que você mesmo sobe a mala ao ônibus ou hotel."
        }
      },
      {
        id: 26,
        question: {
          es: "¿Qué ropa llevar a Europa en verano?",
          en: "What clothes to bring to Europe in summer?",
          pt: "Que roupa levar à Europa no verão?"
        },
        answer: {
          es: "Ropa ligera de algodón o lino, zapatos cómodos para caminar todo el día, sombrero, gafas de sol y protector solar. Incluye un suéter ligero por las noches, ya que refresca.",
          en: "Light cotton or linen clothing, comfortable shoes for walking all day, hat, sunglasses, and sunscreen. Include a light sweater for nights, as it gets cool.",
          pt: "Roupa leve de algodão ou linho, sapatos confortáveis para caminhar o dia todo, chapéu, óculos de sol e protetor solar. Inclua um suéter leve para as noites, pois esfria."
        }
      },
      {
        id: 27,
        question: {
          es: "¿Debo llevar secador de pelo a Europa?",
          en: "Should I bring a hair dryer to Europe?",
          pt: "Devo levar secador de cabelo à Europa?"
        },
        answer: {
          es: "No. La gran mayoría de hoteles en Europa (3 a 5 estrellas) proporcionan secador en la habitación. Llevarlo ocupa espacio innecesario y el voltaje puede dañarlo sin un convertidor pesado.",
          en: "No. The vast majority of hotels in Europe (3 to 5 stars) provide hair dryers in the room. Bringing one takes up unnecessary space and the voltage could damage it without a heavy converter.",
          pt: "Não. A grande maioria dos hotéis na Europa (3 a 5 estrelas) fornece secador no quarto. Levá-lo ocupa espaço desnecessário e a voltagem pode danificá-lo sem um conversor pesado."
        }
      },
      {
        id: 28,
        question: {
          es: "¿Qué documentos llevar siempre en el equipaje de mano?",
          en: "What documents should always be in carry-on luggage?",
          pt: "Que documentos levar sempre na bagagem de mão?"
        },
        answer: {
          es: "Pasaporte, impreso de la reserva del hotel, itinerario de vuelo de regreso, póliza de seguro de viaje, tarjeta de crédito y una copia de tu ETIAS. Nunca los empaques en la maleta facturada.",
          en: "Passport, printed hotel reservation, return flight itinerary, travel insurance policy, credit card, and a copy of your ETIAS. Never pack these in checked luggage.",
          pt: "Passaporte, impresso da reserva do hotel, itinerário de voo de volta, apólice de seguro de viagem, cartão de crédito e uma cópia do seu ETIAS. Nunca os embale na mala despachada."
        }
      },
      {
        id: 29,
        question: {
          es: "¿Está permitido llevar líquidos en el avión?",
          en: "Are liquids allowed on the plane?",
          pt: "É permitido levar líquidos no avião?"
        },
        answer: {
          es: "Solo en recipientes de hasta 100ml en una bolsa transparente de 1 litro en el equipaje de mano. Medicamentos líquidos y alimentos para bebés están exentos pero deben declararse en seguridad.",
          en: "Only in containers up to 100ml in a transparent 1-liter bag in carry-on luggage. Liquid medications and baby food are exempt but must be declared at security.",
          pt: "Apenas em recipientes de até 100ml em uma bolsa transparente de 1 litro na bagagem de mão. Medicamentos líquidos e alimentos para bebês estão isentos, mas devem ser declarados na segurança."
        }
      },
      {
        id: 30,
        question: {
          es: "¿Cómo lavar la ropa durante un tour de 15 días?",
          en: "How to wash clothes during a 15-day tour?",
          pt: "Como lavar a roupa durante um tour de 15 dias?"
        },
        answer: {
          es: "La mayoría de hoteles ofrecen servicio de lavandería (pago) o tienen jabón en el baño. Empaca ropa de secado rápido (sintéticas o merino) para poder lavarla en la ducha y que seque en una noche.",
          en: "Most hotels offer laundry service (paid) or have soap in the bathroom. Pack quick-drying clothing (synthetic or merino) to wash in the shower and dry overnight.",
          pt: "A maioria dos hotéis oferece serviço de lavanderia (pago) ou tem sabão no banheiro. Embale roupa de secagem rápida (sintéticas ou merino) para poder lavá-la no chuveiro e que seque em uma noite."
        }
      }
    ]
  },
  {
    key: "packages",
    icon: "📦",
    label: {
      es: "Paquetes y Servicios",
      en: "Packages & Services",
      pt: "Pacotes e Serviços"
    },
    items: [
      {
        id: 31,
        question: {
          es: "¿Qué incluye realmente un paquete \"Todo Incluido\" a Europa?",
          en: "What does an \"All-Inclusive\" package to Europe really include?",
          pt: "O que inclui realmente um pacote \"Tudo Incluído\" à Europa?"
        },
        answer: {
          es: "Generalmente incluye vuelos, hoteles 3-4*, desayuno diario, transporte entre ciudades, entradas a atracciones principales y guía en español. No suele incluir almuerzos, cenas ni propinas personales.",
          en: "Generally includes flights, 3-4* hotels, daily breakfast, transportation between cities, tickets to main attractions, and Spanish-speaking guide. It usually does not include lunches, dinners, or personal tips.",
          pt: "Geralmente inclui voos, hotéis 3-4*, café da manhã diário, transporte entre cidades, entradas às principais atrações e guia em espanhol. Não costuma incluir almoços, jantares nem gorjetas pessoais."
        }
      },
      {
        id: 32,
        question: {
          es: "¿Sale más caro un paquete organizado que viajar por mi cuenta?",
          en: "Is an organized package more expensive than traveling on my own?",
          pt: "Sai mais caro um pacote organizado do que viajar por conta própria?"
        },
        answer: {
          es: "A menudo es similar o más conveniente el paquete. Aunque el precio base pueda parecer mayor, incluye ahorro en tiempo de planificación, entradas grupales, transporte optimizado y hoteles negociados que un turista individual no consigue.",
          en: "It's often similar or more convenient. Although the base price may seem higher, it includes savings in planning time, group tickets, optimized transportation, and negotiated hotels that an individual tourist cannot get.",
          pt: "Muitas vezes é similar ou mais conveniente o pacote. Embora o preço base possa parecer maior, inclui economia em tempo de planejamento, entradas em grupo, transporte otimizado e hotéis negociados que um turista individual não consegue."
        }
      },
      {
        id: 33,
        question: {
          es: "¿Qué tipo de hoteles ofrece Trips Europa?",
          en: "What type of hotels does Trips Europa offer?",
          pt: "Que tipo de hotéis oferece a Trips Europa?"
        },
        answer: {
          es: "Trabajamos con hoteles de 3 y 4 estrellas, siempre céntricos o bien conectados para minimizar tiempos de traslado. Seleccionamos alojamientos que ofrezcan confort y seguridad.",
          en: "We work with 3 and 4-star hotels, always centrally located or well-connected to minimize transfer times. We select accommodations that offer comfort and security.",
          pt: "Trabalhamos com hotéis de 3 e 4 estrelas, sempre cêntricos ou bem conectados para minimizar tempos de traslado. Selecionamos alojamentos que ofereçam conforto e segurança."
        }
      },
      {
        id: 34,
        question: {
          es: "¿Si viajo solo, tengo que pagar suplemento individual?",
          en: "If I travel alone, do I have to pay a single supplement?",
          pt: "Se viajo sozinho, tenho que pagar suplemento individual?"
        },
        answer: {
          es: "La mayoría de paquetes tienen un suplemento por habitación individual (single supplement). Sin embargo, Trips Europa ofrece opciones de \"compartir habitación\" para solteros para evitar este costo extra.",
          en: "Most packages have a single room supplement. However, Trips Europa offers \"room sharing\" options for singles to avoid this extra cost.",
          pt: "A maioria dos pacotes tem um suplemento por quarto individual (single supplement). No entanto, a Trips Europa oferece opções de \"compartilhar quarto\" para solteiros para evitar este custo extra."
        }
      },
      {
        id: 35,
        question: {
          es: "¿Hay tours disponibles para personas con movilidad reducida?",
          en: "Are tours available for people with reduced mobility?",
          pt: "Há tours disponíveis para pessoas com mobilidade reduzida?"
        },
        answer: {
          es: "Sí, ofrecemos opciones adaptadas. Es vital notificar las necesidades específicas al momento de reservar para asignar hoteles con ascensor y transportes accesibles.",
          en: "Yes, we offer adapted options. It's vital to notify specific needs at the time of booking to assign hotels with elevators and accessible transportation.",
          pt: "Sim, oferecemos opções adaptadas. É vital notificar as necessidades específicas no momento da reserva para designar hotéis com elevador e transportes acessíveis."
        }
      },
      {
        id: 36,
        question: {
          es: "¿Qué pasa si se cancela el viaje por enfermedad?",
          en: "What happens if the trip is canceled due to illness?",
          pt: "O que acontece se a viagem for cancelada por doença?"
        },
        answer: {
          es: "Si tienes un seguro de cancelación (recomendado), puedes recuperar tu inversión. El seguro debe contratarse al momento de la reserva. Trips Europa asesora sobre las mejores pólizas.",
          en: "If you have cancellation insurance (recommended), you can recover your investment. The insurance must be contracted at the time of booking. Trips Europa advises on the best policies.",
          pt: "Se tiver um seguro de cancelamento (recomendado), pode recuperar seu investimento. O seguro deve ser contratado no momento da reserva. A Trips Europa assessora sobre as melhores apólices."
        }
      },
      {
        id: 37,
        question: {
          es: "¿Cuántas personas suelen ir en los grupos de tours?",
          en: "How many people usually go on tour groups?",
          pt: "Quantas pessoas costumam ir nos grupos de tours?"
        },
        answer: {
          es: "Varía, pero suelen ser grupos medianos (entre 20 y 40 personas). Esto permite atención personalizada del guía y una dinámica social amigable sin ser masivos.",
          en: "It varies, but they are usually medium-sized groups (between 20 and 40 people). This allows personalized attention from the guide and a friendly social dynamic without being massive.",
          pt: "Varia, mas costumam ser grupos médios (entre 20 e 40 pessoas). Isso permite atenção personalizada do guia e uma dinâmica social amigável sem serem massivos."
        }
      },
      {
        id: 38,
        question: {
          es: "¿Los tours incluyen tiempo libre?",
          en: "Do tours include free time?",
          pt: "Os tours incluem tempo livre?"
        },
        answer: {
          es: "Definitivamente sí. Nuestra filosofía es equilibrar visitas guiadas con tardes libres para que explores, compres o descanses a tu ritmo. No creemos itinerarios militarizados.",
          en: "Definitely yes. Our philosophy is to balance guided visits with free afternoons for you to explore, shop, or rest at your own pace. We don't believe in militarized itineraries.",
          pt: "Definitivamente sim. Nossa filosofia é equilibrar visitas guiadas com tardes livres para que explore, compre ou descanse no seu ritmo. Não criamos itinerários militarizados."
        }
      },
      {
        id: 39,
        question: {
          es: "¿Puedo extender mi estadía al finalizar el tour?",
          en: "Can I extend my stay after the tour ends?",
          pt: "Posso estender minha estadia ao finalizar o tour?"
        },
        answer: {
          es: "Sí, es posible solicitar una \"extensión de estancia\" para quedarte más días en la ciudad final o visitar otra por tu cuenta antes de regresar. Se coordina con el agente de viajes.",
          en: "Yes, it's possible to request a \"stay extension\" to stay more days in the final city or visit another on your own before returning. It's coordinated with the travel agent.",
          pt: "Sim, é possível solicitar uma \"extensão de estadia\" para ficar mais dias na cidade final ou visitar outra por conta própria antes de regressar. Coordena-se com o agente de viagens."
        }
      },
      {
        id: 40,
        question: {
          es: "¿Se pueden hacer dietas especiales en los tours (vegano, celíaco)?",
          en: "Can special diets be accommodated on tours (vegan, celiac)?",
          pt: "Podem-se fazer dietas especiais nos tours (vegano, celíaco)?"
        },
        answer: {
          es: "Se notifican al hotel con antelación, pero en tours grupales las opciones pueden ser limitadas. Los tours a medida ofrecen más flexibilidad gastronómica.",
          en: "They are notified to the hotel in advance, but in group tours options may be limited. Custom tours offer more gastronomic flexibility.",
          pt: "Notificam-se ao hotel com antecedência, mas em tours em grupo as opções podem ser limitadas. Os tours à medida oferecem mais flexibilidade gastronômica."
        }
      }
    ]
  },
  {
    key: "experiences",
    icon: "🌟",
    label: {
      es: "Experiencias Exclusivas",
      en: "Unique Experiences",
      pt: "Experiências Exclusivas"
    },
    items: [
      {
        id: 41,
        question: {
          es: "¿Es posible cenar en un castillo en Europa?",
          en: "Is it possible to dine in a castle in Europe?",
          pt: "É possível jantar em um castelo na Europa?"
        },
        answer: {
          es: "Sí, es una de nuestras experiencias exclusivas. Organizamos cenas en castillos privados en la Toscana u otras regiones, que incluyen visita histórica, comida gourmet y ambiente nobiliario.",
          en: "Yes, this is one of our exclusive experiences. We organize dinners in private castles in Tuscany or other regions, including historical tours, gourmet food, and noble atmosphere.",
          pt: "Sim, é uma de nossas experiências exclusivas. Organizamos jantares em castelos privados na Toscana ou outras regiões, que incluem visita histórica, comida gourmet e ambiente nobiliário."
        }
      },
      {
        id: 42,
        question: {
          es: "¿Qué es el acceso privado al Vaticano?",
          en: "What is private Vatican access?",
          pt: "O que é o acesso privado ao Vaticano?"
        },
        answer: {
          es: "Es una entrada especial antes de la apertura al público general o después del cierre. Permite ver la Capilla Sixtina y los Museos sin multitudes, ofreciendo una experiencia espiritual y artística única.",
          en: "It's special entry before opening to the general public or after closing. It allows viewing the Sistine Chapel and Museums without crowds, offering a unique spiritual and artistic experience.",
          pt: "É uma entrada especial antes da abertura ao público geral ou após o fechamento. Permite ver a Capela Sistina e os Museus sem multidões, oferecendo uma experiência espiritual e artística única."
        }
      },
      {
        id: 43,
        question: {
          es: "¿Se pueden hacer clases de cocina con locales en Europa?",
          en: "Can you take cooking classes with locals in Europe?",
          pt: "Podem-se fazer aulas de culinária com locais na Europa?"
        },
        answer: {
          es: "Claro, ofrecemos talleres para hacer pasta con \"nonnas\" italianas en sus casas o clases de pastelería en Francia. Son experiencias inmersivas que van más allá de una simple degustación.",
          en: "Of course, we offer workshops to make pasta with Italian \"nonnas\" in their homes or pastry classes in France. These are immersive experiences that go beyond simple tasting.",
          pt: "Claro, oferecemos workshops para fazer massa com \"nonnas\" italianas em suas casas ou aulas de pastelaria na França. São experiências imersivas que vão além de uma simples degustação."
        }
      },
      {
        id: 44,
        question: {
          es: "¿Se puede hacer un tour del Louvre después del cierre?",
          en: "Can you take a tour of the Louvre after closing?",
          pt: "Pode-se fazer um tour do Louvre após o fechamento?"
        },
        answer: {
          es: "Sí, mediante acuerdos especiales. Un tour nocturno del Louvre permite ver la Gioconda y otras obras maestras en un ambiente íntimo y silencioso, imposible de lograr en horario normal.",
          en: "Yes, through special agreements. A night tour of the Louvre allows you to see the Mona Lisa and other masterpieces in an intimate and silent atmosphere, impossible to achieve during normal hours.",
          pt: "Sim, mediante acordos especiais. Um tour noturno do Louvre permite ver a Mona Lisa e outras obras-primas em um ambiente íntimo e silencioso, impossível de conseguir em horário normal."
        }
      },
      {
        id: 45,
        question: {
          es: "¿Es seguro hacer un paseo en helicóptero sobre los Alpes?",
          en: "Is it safe to take a helicopter ride over the Alps?",
          pt: "É seguro fazer um passeio de helicóptero sobre os Alpes?"
        },
        answer: {
          es: "Sí, es una actividad muy regulada y segura. Ofrecemos sobrevuelos panorámicos sobre los Alpes Suizos que aterrizan en picos nevados para un picnic, una experiencia de lujo y adrenalina.",
          en: "Yes, it's a very regulated and safe activity. We offer panoramic flights over the Swiss Alps that land on snowy peaks for a picnic, a luxury and adrenaline experience.",
          pt: "Sim, é uma atividade muito regulada e segura. Oferecemos sobrevoos panorâmicos sobre os Alpes Suíços que pousam em picos nevados para um piquenique, uma experiência de luxo e adrenalina."
        }
      },
      {
        id: 46,
        question: {
          es: "¿Qué es una cata de champán en una bodega familiar?",
          en: "What is a champagne tasting at a family winery?",
          pt: "O que é uma degustação de champanhe em uma adega familiar?"
        },
        answer: {
          es: "Es visitar productores artesanales en la región de Champagne (Francia), ajenos al turismo masivo, para probar variedades exclusivas no vendidas en supermercados, explicados por los dueños.",
          en: "Visiting artisanal producers in the Champagne region (France), away from mass tourism, to taste exclusive varieties not sold in supermarkets, explained by the owners themselves.",
          pt: "É visitar produtores artesanais na região de Champagne (França), alheios ao turismo de massa, para provar variedades exclusivas não vendidas em supermercados, explicados pelos donos."
        }
      },
      {
        id: 47,
        question: {
          es: "¿Se pueden ver los paisajes de \"Juego de Tronos\" en Europa?",
          en: "Can you see \"Game of Thrones\" landscapes in Europe?",
          pt: "Podem-se ver as paisagens de \"Game of Thrones\" na Europa?"
        },
        answer: {
          es: "Sí, ofrecemos rutas por Dubrovnik (King's Landing), Croacia, e Irlanda del Norte, donde visitamos los castillos y caminos reales utilizados en la filmación de la serie.",
          en: "Yes, we offer routes through Dubrovnik (King's Landing), Croatia, and Northern Ireland, where we visit the castles and real paths used in the series filming.",
          pt: "Sim, oferecemos rotas por Dubrovnik (King's Landing), Croácia, e Irlanda do Norte, onde visitamos os castelos e caminhos reais utilizados na filmagem da série."
        }
      },
      {
        id: 48,
        question: {
          es: "¿Hay experiencias exclusivas para fans de Harry Potter?",
          en: "Are there exclusive experiences for Harry Potter fans?",
          pt: "Há experiências exclusivas para fãs de Harry Potter?"
        },
        answer: {
          es: "Sí, incluyendo cenas temáticas en castillos, tours de locaciones en Londres y Oxford, y hasta visitas a estudios de cine con acceso prioritario.",
          en: "Yes, including themed dinners in castles, location tours in London and Oxford, and even visits to film studios with priority access.",
          pt: "Sim, incluindo jantares temáticos em castelos, tours de locações em Londres e Oxford, e até visitas a estúdios de cinema com acesso prioritário."
        }
      },
      {
        id: 49,
        question: {
          es: "¿Es posible asistir a un espectáculo de flamenco privado?",
          en: "Is it possible to attend a private flamenco show?",
          pt: "É possível assistir a um espetáculo de flamenco privado?"
        },
        answer: {
          es: "Sí, en España organizamos entradas VIP a \"tablaos\" o incluso espectáculos en cuevas privadas en Granada (Sacromonte), seguidos de cena andaluza tradicional.",
          en: "Yes, in Spain we organize VIP tickets to \"tablaos\" or even private shows in caves in Granada (Sacromonte), followed by traditional Andalusian dinner.",
          pt: "Sim, em Espanha organizamos entradas VIP a \"tablaos\" ou até espetáculos em cavernas privadas em Granada (Sacromonte), seguidos de jantar andaluz tradicional."
        }
      },
      {
        id: 50,
        question: {
          es: "¿Se puede plantar un árbol durante el viaje?",
          en: "Can you plant a tree during the trip?",
          pt: "Pode-se plantar uma árvore durante a viagem?"
        },
        answer: {
          es: "Como parte de nuestro compromiso con la sostenibilidad, algunos tours incluyen actividades de reforestación donde cada viajero planta un árbol nativo, dejando una huella positiva en el destino.",
          en: "As part of our commitment to sustainability, some tours include reforestation activities where each traveler plants a native tree, leaving a positive footprint on the destination.",
          pt: "Como parte de nosso compromisso com a sustentabilidade, alguns tours incluem atividades de reflorestamento onde cada viajante planta uma árvore nativa, deixando uma pegada positiva no destino."
        }
      }
    ]
  },
  {
    key: "travelers",
    icon: "👥",
    label: {
      es: "Tipos de Viajeros",
      en: "Types of Travelers",
      pt: "Tipos de Viajantes"
    },
    items: [
      {
        id: 51,
        question: {
          es: "¿Europa es un buen destino para viajar con niños?",
          en: "Is Europe a good destination to travel with children?",
          pt: "A Europa é um bom destino para viajar com crianças?"
        },
        answer: {
          es: "Excelente. La educación, seguridad y diversidad de Europa la hacen ideal. Los tours familiares de Trips Europa incluyen rutas ajustadas a ritmos infantiles con visitas interactivas y parques.",
          en: "Excellent. Europe's education, safety, and diversity make it ideal. Trips Europa family tours include routes adjusted to children's rhythms with interactive visits and parks.",
          pt: "Excelente. A educação, segurança e diversidade da Europa a tornam ideal. Os tours familiares da Trips Europa incluem rotas ajustadas a ritmos infantis com visitas interativas e parques."
        }
      },
      {
        id: 52,
        question: {
          es: "¿Es difícil viajar a Europa con personas de la tercera edad?",
          en: "Is it difficult to travel to Europe with elderly people?",
          pt: "É difícil viajar à Europa com pessoas da terceira idade?"
        },
        answer: {
          es: "No, con la planificación correcta. Recomendamos tours con transporte privado, hoteles con ascensor, tiempos de descanso y ritmo moderado. Nuestros guías están atentos a las necesidades de los mayores.",
          en: "No, with proper planning. We recommend tours with private transportation, hotels with elevators, rest times, and moderate pace. Our guides are attentive to the needs of seniors.",
          pt: "Não, com o planejamento correto. Recomendamos tours com transporte privado, hotéis com elevador, tempos de descanso e ritmo moderado. Nossos guias estão atentos às necessidades dos idosos."
        }
      },
      {
        id: 53,
        question: {
          es: "¿Es incómodo viajar solo en un tour grupal?",
          en: "Is it uncomfortable to travel alone on a group tour?",
          pt: "É incômodo viajar sozinho em um tour em grupo?"
        },
        answer: {
          es: "Para nada, suele ser lo contrario. Los viajes en grupo fomentan la amistad; muchos de nuestros viajeros solos terminan el viaje con nuevos amigos para toda la vida.",
          en: "Not at all, it's usually the opposite. Group travel fosters friendship; many of our solo travelers end the trip with lifelong friends.",
          pt: "De modo nenhum, costuma ser o contrário. As viagens em grupo fomentam a amizade; muitos de nossos viajantes solitários terminam a viagem com novos amigos para toda a vida."
        }
      },
      {
        id: 54,
        question: {
          es: "¿Qué hago si pierdo mi pasaporte durante el tour?",
          en: "What do I do if I lose my passport during the tour?",
          pt: "O que faço se perder meu passaporte durante o tour?"
        },
        answer: {
          es: "El guía de Trips Europa te asistirá inmediatamente para contactar a tu embajada y gestionar un documento de viaje de emergencia. Por esto es vital llevar copias del pasaporte separadas del original.",
          en: "The Trips Europa guide will immediately assist you to contact your embassy and process an emergency travel document. This is why it's vital to carry copies of your passport separate from the original.",
          pt: "O guia da Trips Europa o assistirá imediatamente para contactar sua embaixada e gerenciar um documento de viagem de emergência. Por isso é vital levar cópias do passaporte separadas do original."
        }
      },
      {
        id: 55,
        question: {
          es: "¿Los tours son accesibles para personas en silla de ruedas?",
          en: "Are tours accessible for wheelchair users?",
          pt: "Os tours são acessíveis para pessoas em cadeira de rodas?"
        },
        answer: {
          es: "Depende del destino y la infraestructura antigua. Requerimos notificación previa para adaptar rutas y asegurar hoteles y buses adaptados. Ciudades como Roma o Atenas tienen más limitaciones.",
          en: "It depends on the destination and ancient infrastructure. We require prior notification to adapt routes and ensure adapted hotels and buses. Cities like Rome or Athens have more limitations.",
          pt: "Depende do destino e da infraestrutura antiga. Requeremos notificação prévia para adaptar rotas e assegurar hotéis e ônibus adaptados. Cidades como Roma ou Atenas têm mais limitações."
        }
      },
      {
        id: 56,
        question: {
          es: "¿Puedo llevar mi teléfono y usar datos en Europa?",
          en: "Can I bring my phone and use data in Europe?",
          pt: "Posso levar meu telefone e usar dados na Europa?"
        },
        answer: {
          es: "Sí. Revisa con tu operador local las tarifas de \"Roaming\" o compra una eSIM chip Europea al llegar para tener internet ilimitado y maps disponibles.",
          en: "Yes. Check with your local operator for \"Roaming\" rates or buy a European eSIM chip upon arrival for unlimited internet and available maps.",
          pt: "Sim. Reveja com sua operadora local as tarifas de \"Roaming\" ou compre uma eSIM chip Europeia ao chegar para ter internet ilimitada e mapas disponíveis."
        }
      },
      {
        id: 57,
        question: {
          es: "¿Es seguro beber agua del grifo en Europa?",
          en: "Is it safe to drink tap water in Europe?",
          pt: "É seguro beber água da torneira na Europa?"
        },
        answer: {
          es: "En la mayoría de países europeos (Francia, Alemania, Italia, España) el agua del grifo es potable y de alta calidad. Llevar una botella reutilizable ahorra dinero y plástico.",
          en: "In most European countries (France, Germany, Italy, Spain), tap water is potable and high quality. Carrying a reusable bottle saves money and plastic.",
          pt: "Na maioria dos países europeus (França, Alemanha, Itália, Espanha) a água da torneira é potável e de alta qualidade. Levar uma garrafa reutilizável economiza dinheiro e plástico."
        }
      },
      {
        id: 58,
        question: {
          es: "¿Se puede hacer un viaje de luna de miel a Europa?",
          en: "Can you take a honeymoon trip to Europe?",
          pt: "Pode-se fazer uma viagem de lua de mel à Europa?"
        },
        answer: {
          es: "Es el destino de luna de miel más romántico. Ofrecemos paquetes \"Honeymoon\" con hoteles boutique, cenas con vistas, experiencias privadas (como un castillo en la Toscana) y traslados en lujo.",
          en: "It's the most romantic honeymoon destination. We offer \"Honeymoon\" packages with boutique hotels, dinners with views, private experiences (like a castle in Tuscany), and luxury transfers.",
          pt: "É o destino de lua de mel mais romântico. Oferecemos pacotes \"Honeymoon\" com hotéis boutique, jantares com vistas, experiências privadas (como um castelo na Toscana) e traslados em luxo."
        }
      },
      {
        id: 59,
        question: {
          es: "¿Es caro comprar souvenirs en Europa?",
          en: "Is it expensive to buy souvenirs in Europe?",
          pt: "É caro comprar souvenirs na Europa?"
        },
        answer: {
          es: "Puede variar. Evita las tiendas cerca de los monumentos. Comprar en mercados locales, tiendas de artesanos o supermercados (para comestibles como chocolates o vinos) es más económico y auténtico.",
          en: "It can vary. Avoid shops near monuments. Buying in local markets, artisan shops, or supermarkets (for edibles like chocolates or wines) is more economical and authentic.",
          pt: "Pode variar. Evite as lojas próximas aos monumentos. Comprar em mercados locais, lojas de artesãos ou supermercados (para comestíveis como chocolates ou vinhos) é mais econômico e autêntico."
        }
      },
      {
        id: 60,
        question: {
          es: "¿Qué pasa si me enfermo durante el viaje?",
          en: "What happens if I get sick during the trip?",
          pt: "O que acontece se eu adoecer durante a viagem?"
        },
        answer: {
          es: "Tu seguro de viaje te cubrirá. Los guías de Trips Europa conocen clínicas privadas y farmacias de confianza en cada ciudad para asistirte rápidamente. Es vital llevar la medicación habitual en el equipaje de mano.",
          en: "Your travel insurance will cover you. Trips Europa guides know private clinics and trusted pharmacies in each city to assist you quickly. It's vital to carry usual medications in carry-on luggage.",
          pt: "Seu seguro de viagem o cobrirá. Os guias da Trips Europa conhecem clínicas privadas e farmácias de confiança em cada cidade para assisti-lo rapidamente. É vital levar a medicação habitual na bagagem de mão."
        }
      }
    ]
  }
];
