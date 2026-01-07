Rick and Morty App – Refactorización con TypeScript y Next.js 15

Aplicación web basada en la API pública de Rick and Morty, refactorizada completamente para mejorar su arquitectura, tipado, mantenibilidad y experiencia de usuario, siguiendo buenas prácticas modernas con Next.js 15 y TypeScript estricto.

Tecnologías Utilizadas

Next.js 15 (App Router)

React 18

TypeScript (modo estricto)

Rick and Morty API

CSS / Tailwind CSS

Fetch API

Objetivo del Proyecto

Refactorizar una base de código existente con problemas de tipado, consumo incorrecto de API y mala organización, transformándola en una aplicación:

Mantenible y escalable

Correctamente tipada

Con arquitectura clara

Lista para producción

Principales Mejoras Implementadas
1. TypeScript Estricto

Activación de strict y noImplicitAny

Eliminación total del uso de any

Tipado completo de componentes, servicios y utilidades

2. Sistema de Tipos Centralizado

Creación de carpeta types/

Interfaces claras para datos de la API y props de componentes

Uso de union types para estados controlados

3. Consumo Correcto de la API

Centralización del acceso a la API

Validación de respuestas HTTP

Manejo robusto de errores

Soporte para paginación

Separación clara entre ApiResponse y Character[]

4. Arquitectura y Organización

Estructura alineada con las convenciones de Next.js 15:

src/
├── app/
│   ├── character/[id]/
│   ├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── services/
├── types/
└── utils/


Eliminación de páginas y componentes sin uso

Componentes fuera de /app

Separación clara de responsabilidades

5. Manejo de Estados y UX

Estados de loading, error y éxito claramente definidos

Componentes dedicados para feedback visual

Manejo correcto de errores de red

Paginación con control total del estado

6. Eliminación de Duplicación de Lógica

Centralización de utilidades comunes en utils/helpers.ts

Funciones puras y reutilizables

Cumplimiento del principio DRY

7. Navegación Global

Header global con navegación consistente

Rutas claras entre Home, Dashboard y Detalle de personaje

8. Página de Detalle de Personaje

Ruta dinámica /character/[id]

Uso de Server Components

Mejor rendimiento y SEO

Bonus del ejercicio implementado

9. Dashboard con Filtros y Estadísticas

Búsqueda por nombre

Filtros por estado y especie

Estadísticas en tiempo real

Componentes reutilizables

10. Seguridad

Identificación de dependencia con vulnerabilidad documentada

Recomendación explícita de actualización de Next.js

Estado Final del Proyecto

Compila sin errores con TypeScript estricto

0 uso de any

Componentes 100% tipados

Manejo robusto de errores

Arquitectura limpia y escalable

UX profesional con navegación completa

Instalación y Ejecución
npm install
npm run dev


La aplicación estará disponible en http://localhost:3000

Recursos

Next.js Documentation

TypeScript Handbook

Rick and Morty API Docs

Autor

Esteban Orozco
Enero 2026
Stack: Next.js 15 + TypeScript







































Informe de Refactorización - Rick and Morty App

Análisis del Proyecto Original
Al revisar el código base, identifiqué problemas críticos que impedían su correcto funcionamiento y mantenibilidad:

Problemas Principales Encontrados

Errores Críticos de TypeScript

Problema: Configuración laxa de TypeScript

// tsconfig.json ORIGINAL
{
  "strict": false,
  "noImplicitAny": false
}


Impacto: Permitía uso de any sin restricciones, anulando los beneficios de TypeScript.

Solución Implementada

{
  "strict": true,
  "noImplicitAny": true,
  "forceConsistentCasingInFileNames": true
}


Justificación: TypeScript estricto detecta errores en tiempo de compilación, mejora la documentación del código y facilita el mantenimiento.

Uso Incorrecto de any y Tipado Deficiente

Problema Original

// src/components/CharacterCard.tsx
export default function CharacterCard(props) {  // Sin tipos
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.status}</p>
    </div>
  )
}

// src/utils/helpers.ts
export function isAlive(status) {  // Sin tipos
  if(status === 'Alive') return true
  else return false
}


Solución Implementada

// src/types/character.ts - Creado desde cero
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// src/components/CharacterCard.tsx - Refactorizado
interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Implementación con tipos seguros
}


Justificación:

Autocompletado en el IDE

Detección de errores en tiempo de desarrollo

Documentación automática del código

Prevención de bugs por datos incorrectos

Consumo Incorrecto de la API

Problema Original

// src/services/api.ts
export async function getCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character")
  return response
}

// src/app/page.tsx
fetch("https://rickandmortyapi.com/api/character")
  .then(res => res.json())
  .then(data => {
    setCharacters(data)
  })


Errores identificados:

El servicio retorna Response en lugar de datos parseados

No valida status HTTP

No maneja errores

No hay paginación

Asigna ApiResponse directamente cuando necesita Character[]

Solución Implementada

// src/services/api.ts
const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(page?: number): Promise<ApiResponse> {
  try {
    const url = page 
      ? `${BASE_URL}/character?page=${page}` 
      : `${BASE_URL}/character`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener personajes: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener personajes');
  }
}

export async function getCharacterById(id: number): Promise<Character> {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Personaje con ID ${id} no encontrado`);
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    // Manejo robusto de errores
  }
}


Justificación:

Centralización del acceso a la API

Validación HTTP

Manejo de errores con mensajes descriptivos

Tipado seguro

Soporte para paginación

Arquitectura y Organización

Problema Original

src/
├── app/
│   ├── components/
│   ├── home)/
│   ├── dashboard/
│   ├── login/
│   └── register/
├── components/
├── services/
└── utils/


Solución Implementada

src/
├── app/
│   ├── character/[id]/
│   ├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── services/
├── types/
└── utils/


Cambios clave:

Eliminación de componentes innecesarios

Eliminación de páginas sin funcionalidad

Creación de carpeta types/

Reorganización siguiendo convenciones de Next.js

Header global para navegación

Justificación:

Principio DRY

Single Responsibility

Mejor mantenibilidad

Alineación con Next.js 15

Manejo de Estados (Loading / Error)

Problema Original

const [loading, setLoading] = useState(false)

useEffect(() => {
  setLoading(true)
  fetch(...)
    .then(...)
}, [])


Problemas:

No hay estado de error

No se extrae data.results

UI básica

Sin manejo de fallos

Solución Implementada

const [characters, setCharacters] = useState<Character[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)


Justificación:

Feedback claro al usuario

Manejo robusto de errores

Control total de paginación

Estados tipados

Duplicación de Lógica

Problema Original: lógica duplicada en múltiples archivos.

Solución Implementada: centralización en utils/helpers.ts.

Justificación:

DRY

Reutilización

Testeabilidad

Tipado seguro

Dependencia con Vulnerabilidad de Seguridad

Problema Detectado: versión de Next.js con vulnerabilidad documentada.

Recomendación:

npm install next@latest


Justificación: la seguridad es crítica en producción.

Mejoras Implementadas

Header global de navegación

Página de detalle de personaje con rutas dinámicas

Dashboard con filtros y estadísticas

Sistema completo de tipos

Eliminación de código muerto

Comparación Antes / Después

TypeScript: laxo → estricto

API: sin validación → tipada y validada

Estados: básicos → completos

Organización: desordenada → clara

Navegación: inexistente → completa

Errores TS: múltiples → cero

Decisiones Técnicas Justificadas

Uso de Server Components

Eliminación de @ts-ignore

Filtros reactivos con useEffect

Centralización de tipos

Logros Alcanzados

Compilación sin errores

0 uso de any

Componentes tipados

Manejo robusto de errores

Arquitectura escalable

UX profesional

Lecciones Aprendidas

TypeScript estricto detecta errores críticos

Centralizar lógica reduce duplicación

La API retorna más datos de los necesarios

El código comentado es código muerto

Las convenciones importan

Recursos Consultados

Next.js 15 Documentation

TypeScript Handbook

Rick and Morty API Docs

React 18 Best Practices

Conclusión

Este proyecto demuestra capacidad para analizar código heredado, refactorizar de forma segura, aplicar TypeScript correctamente, tomar decisiones arquitectónicas justificadas y comunicar cambios técnicos de manera clara. El resultado es una aplicación mantenible, escalable y lista para producción.

Desarrollado por: Esteban Orozco Osorio
Fecha: Enero 2026
Stack: Next.js 15 + TypeScript + Rick and Morty API