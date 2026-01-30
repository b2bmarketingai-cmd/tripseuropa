# 🛫 Guía de Integración: API de Búsqueda de Vuelos

**Fecha:** 29 de Enero de 2026
**Estado:** ⚠️ PENDIENTE - Actualmente usando datos MOCK
**Prioridad:** 🔴 CRÍTICA

---

## 📋 Resumen

Actualmente, el endpoint `/api/flights/search` retorna datos de prueba (mock) para demostración. Para poner el sitio en producción completamente funcional, es necesario integrar una API real de búsqueda de vuelos.

**Archivo a modificar:** `server/routes.ts` (líneas 31-81)

---

## 🎯 Opciones de API Recomendadas

### Opción 1: Amadeus API (RECOMENDADA)

**Ventajas:**
- API oficial IATA
- Datos en tiempo real de aerolíneas
- Amplia cobertura global
- Documentación excelente
- Tier gratuito disponible

**Registro:** https://developers.amadeus.com/register

**Pricing:**
- Free Tier: 2,000 llamadas/mes
- Self-Service: $0.35 por 1000 llamadas
- Enterprise: Precios personalizados

### Opción 2: Skyscanner API

**Ventajas:**
- Comparación de múltiples aerolíneas
- Precios competitivos
- Fácil integración

**Documentación:** https://developers.skyscanner.net/

### Opción 3: Kiwi.com Tequila API

**Ventajas:**
- Precios muy competitivos
- Rutas multi-city
- Algoritmos de búsqueda avanzados

**Documentación:** https://tequila.kiwi.com/

---

## 🔧 Implementación con Amadeus API

### Paso 1: Crear Cuenta y Obtener Credenciales

```bash
# 1. Registrarse en https://developers.amadeus.com/register
# 2. Crear una nueva app en el dashboard
# 3. Copiar API Key y API Secret
```

### Paso 2: Instalar SDK de Amadeus

```bash
cd /path/to/tripseuropa
npm install amadeus --save
```

### Paso 3: Configurar Variables de Entorno

Agregar al archivo `.env`:

```env
# Amadeus API Credentials
AMADEUS_API_KEY=your_api_key_here
AMADEUS_API_SECRET=your_api_secret_here
AMADEUS_HOSTNAME=test  # Use "production" para producción
```

### Paso 4: Crear Servicio de Amadeus

Crear archivo `server/amadeus.ts`:

```typescript
import Amadeus from 'amadeus';

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY!,
  clientSecret: process.env.AMADEUS_API_SECRET!,
  hostname: process.env.AMADEUS_HOSTNAME || 'test'
});

export interface FlightSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  currencyCode?: string;
  max?: number;
}

export interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  currency: string;
  bookingUrl?: string;
}

export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightOffer[]> {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: params.originLocationCode,
      destinationLocationCode: params.destinationLocationCode,
      departureDate: params.departureDate,
      returnDate: params.returnDate,
      adults: params.adults,
      children: params.children || 0,
      travelClass: params.travelClass || 'ECONOMY',
      currencyCode: params.currencyCode || 'EUR',
      max: params.max || 10
    });

    // Transform Amadeus response to our FlightOffer format
    const flights: FlightOffer[] = response.data.map((offer: any) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];

      return {
        id: offer.id,
        airline: segment.carrierCode,
        flightNumber: `${segment.carrierCode}${segment.number}`,
        departure: segment.departure.at,
        arrival: segment.arrival.at,
        duration: itinerary.duration,
        price: parseFloat(offer.price.total),
        stops: itinerary.segments.length - 1,
        currency: offer.price.currency,
        bookingUrl: offer.source
      };
    });

    return flights;
  } catch (error) {
    console.error('Amadeus API error:', error);
    throw new Error('Flight search failed');
  }
}

export async function getCityCode(cityName: string): Promise<string> {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: cityName,
      subType: 'CITY,AIRPORT'
    });

    if (response.data && response.data.length > 0) {
      return response.data[0].iataCode;
    }

    throw new Error(`City code not found for: ${cityName}`);
  } catch (error) {
    console.error('City code lookup error:', error);
    throw error;
  }
}
```

### Paso 5: Actualizar Route en `server/routes.ts`

Reemplazar el código mock (líneas 31-81) con:

```typescript
import { searchFlights } from './amadeus';

// -- Flights (Real Amadeus API) --
app.post(api.flights.search.path, async (req, res) => {
  try {
    const input = api.flights.search.input.parse(req.body);

    // Call Amadeus API for real flight data
    const flights = await searchFlights({
      originLocationCode: input.origin,
      destinationLocationCode: input.destination,
      departureDate: input.departureDate,
      returnDate: input.returnDate,
      adults: input.passengers || 1,
      travelClass: input.class || 'ECONOMY',
      currencyCode: 'EUR',
      max: 20
    });

    res.json(flights);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join('.'),
      });
    }

    console.error('Flight search error:', err);
    res.status(500).json({
      message: 'Error al buscar vuelos. Por favor intenta de nuevo.'
    });
  }
});
```

---

## 🧪 Testing

### Test en Ambiente de Desarrollo

```bash
# Test endpoint con curl
curl -X POST http://localhost:5000/api/flights/search \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "BOG",
    "destination": "MAD",
    "departureDate": "2026-06-15",
    "returnDate": "2026-06-30",
    "passengers": 2,
    "class": "ECONOMY"
  }'
```

### Códigos IATA Comunes

| Ciudad | Código IATA |
|--------|-------------|
| Bogotá | BOG |
| Madrid | MAD |
| Barcelona | BCN |
| París | PAR |
| Roma | ROM |
| Lisboa | LIS |
| Ámsterdam | AMS |
| Ciudad de México | MEX |
| Buenos Aires | EZE |
| Lima | LIM |
| São Paulo | GRU |

---

## 💰 Estimación de Costos

### Escenario Conservador (100 búsquedas/día)

```
100 búsquedas/día × 30 días = 3,000 búsquedas/mes
3,000 búsquedas × $0.35/1000 = $1.05/mes
```

### Escenario Moderado (500 búsquedas/día)

```
500 búsquedas/día × 30 días = 15,000 búsquedas/mes
15,000 búsquedas × $0.35/1000 = $5.25/mes
```

### Escenario Alto Tráfico (2,000 búsquedas/día)

```
2,000 búsquedas/día × 30 días = 60,000 búsquedas/mes
60,000 búsquedas × $0.35/1000 = $21/mes
```

**Conclusión:** Costo muy bajo comparado con el valor del servicio.

---

## ⚡ Optimizaciones Recomendadas

### 1. Implementar Caché

```typescript
import NodeCache from 'node-cache';

// Cache por 15 minutos
const flightCache = new NodeCache({ stdTTL: 900 });

export async function searchFlightsWithCache(
  params: FlightSearchParams
): Promise<FlightOffer[]> {
  const cacheKey = JSON.stringify(params);
  const cached = flightCache.get<FlightOffer[]>(cacheKey);

  if (cached) {
    console.log('Returning cached flights');
    return cached;
  }

  const flights = await searchFlights(params);
  flightCache.set(cacheKey, flights);
  return flights;
}
```

### 2. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const flightSearchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // 20 búsquedas por IP
  message: 'Demasiadas búsquedas. Por favor intenta de nuevo en 15 minutos.'
});

app.post(api.flights.search.path, flightSearchLimiter, async (req, res) => {
  // ... código de búsqueda
});
```

### 3. Logging y Monitoreo

```typescript
import * as Sentry from '@sentry/node';

try {
  const flights = await searchFlights(params);

  // Log successful searches
  console.log(`Flight search: ${params.origin} → ${params.destination}, ${flights.length} results`);

  res.json(flights);
} catch (error) {
  // Log errors to Sentry
  Sentry.captureException(error);
  // ... manejo de error
}
```

---

## 📊 Checklist de Implementación

- [ ] Crear cuenta en Amadeus API
- [ ] Obtener API Key y Secret
- [ ] Configurar variables de entorno (.env)
- [ ] Instalar dependencia `npm install amadeus`
- [ ] Crear archivo `server/amadeus.ts`
- [ ] Actualizar `server/routes.ts`
- [ ] Testing en ambiente de desarrollo
- [ ] Implementar caché (opcional pero recomendado)
- [ ] Implementar rate limiting
- [ ] Testing en producción (staging)
- [ ] Monitoreo de costos y uso de API
- [ ] Deploy a producción

---

## 🚨 Notas Importantes

### Modo de Desarrollo vs Producción

Amadeus ofrece dos ambientes:

1. **Test/Development:** Datos sintéticos, sin costo
2. **Production:** Datos reales, facturación por uso

Configurar en `.env`:
```env
# Development
AMADEUS_HOSTNAME=test

# Production
AMADEUS_HOSTNAME=production
```

### Manejo de Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `401 Unauthorized` | Credenciales inválidas | Verificar API Key y Secret |
| `429 Too Many Requests` | Rate limit excedido | Implementar caché y throttling |
| `400 Bad Request` | Parámetros inválidos | Validar códigos IATA |
| `500 Server Error` | Error de Amadeus | Retry con backoff exponencial |

---

## 📞 Soporte

**Amadeus Developer Support:**
- Documentación: https://developers.amadeus.com/
- Community Forum: https://developers.amadeus.com/support
- Email: developers@amadeus.com

**Soporte Interno:**
- Email: dev@tripseuropa.com
- GitHub Issues: https://github.com/b2bmarketingai-cmd/tripseuropa/issues

---

## 🎯 Próximos Pasos Después de la Integración

1. **Testing A/B:** Comparar resultados con otras APIs
2. **Analytics:** Medir conversión de búsquedas a reservas
3. **Optimización UX:** Mejorar filtros y presentación de resultados
4. **Integración Multi-API:** Combinar Amadeus + Skyscanner para mejores precios

---

**Última Actualización:** 29 de Enero de 2026
**Autor:** Sistema de Desarrollo Trips Europa
**Estado:** 📝 Documentación Lista - Implementación Pendiente
