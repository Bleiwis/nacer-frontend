# Normas y Buenas Prácticas de Frontend (`nacer-frontend`)

Este documento establece las instrucciones, estándares de arquitectura, diseño de componentes y buenas prácticas obligatorias para el desarrollo en el proyecto **`nacer-frontend`**.

---

## 1. Arquitectura de Componentes: Atomic Design

La estructura de interfaz debe seguir rigurosamente la metodología **Atomic Design**, organizada preferentemente bajo un directorio `src/components/` o `app/components/`:

- **Atoms (`atoms/`)**: Componentes básicos e indivisibles (ej. `Button`, `Input`, `Label`, `Icon`, `Badge`, `Spinner`). No deben tener lógica de negocio ni dependencias con el estado global/API.
- **Molecules (`molecules/`)**: Combinaciones simples de dos o más átomos (ej. `FormField`, `SearchInput`, `CardHeader`).
- **Organisms (`organisms/`)**: Secciones complejas e interactivas compuestas por moléculas y/o átomos (ej. `Navbar`, `Sidebar`, `UserForm`, `DataTable`).
- **Templates (`templates/`)**: Estructuras de layout sin contenido real que definen la disposición espacial y grid de la página.
- **Pages / Views (`pages/` o `app/`)**: Instancias concretas que inyectan datos de APIs/servicios en las plantillas y organismos.

---

## 2. Reutilización de Componentes y Evitar Duplicidad

- **Revisión previa obligatoria**: Antes de crear un nuevo elemento visual o de entrada (como un `Input`, `Button`, `Select`, `Modal`), **se debe verificar exhaustivamente la existencia de componentes ya creados** en `atoms/` o `molecules/`.
- Si se necesita extender funcionalidad a un componente existente (ej. un variante de estilo o un slot adicional), debe parametrizarse vía `props` en lugar de duplicar código.

---

## 3. Gestión de Formularios y Validaciones

- **React Hook Form**: Es el estándar **único** para la construcción, control de estado y manipulación de formularios.
- **Zod**: Todas las interfaces de datos, payloads de formularios y esquemas de respuesta deben definirse y validarse rigurosamente utilizando **Zod**.
- **Integración (`@hookform/resolvers/zod`)**: Utilizar el resolver oficial de Zod para vincular la validación de esquemas con React Hook Form.

```tsx
// Ejemplo de patrón estándar
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'El nombre es muy corto'),
});

export type UserFormData = z.infer<typeof userSchema>;
```

---

## 4. Manejo de Estado Asíncrono y Capa de Red

- **TanStack React Query (`@tanstack/react-query`)**: Toda solicitud de lectura/escritura asíncrona hacia APIs debe ser manejada mediante Hooks de React Query (`useQuery`, `useMutation`).
- **Axios**: Debe utilizarse un cliente centralizado de `axios` (instancia con interceptores para errores, headers de autenticación, etc.) como función creadora/fetcher dentro de las funciones de React Query.
- **Prohibición**: No usar `useEffect` ni `useState` locales para realizar llamadas HTTP ni para gestionar estados de carga (`loading`), error o re-intentos de peticiones de red.

---

## 5. Gestión del Estado Global del Cliente (Zustand)

- **Zustand**: Es el **gestor de estado global estándar y obligatorio** para controlar el estado del cliente que trascienda componentes (ej. autenticación de usuario, tema visual, preferencias o modales globales).
- **Regla de Alcance de Zustand**: 
  - Usar Zustand exclusivamente para datos de estado del cliente globales o persistentes.
  - **No usar Zustand para datos de servidor** (usar TanStack React Query) ni para **estados de formularios** (usar React Hook Form).
- **Diseño de Stores**: Crear stores modulares y bien tipados dentro de `src/store/` o `app/store/` (ej. `useAuthStore`, `useUIStore`) usando selectores específicos al consumirlos para evitar renders innecesarios.

---

## 6. SSR, SEO y Optimización de Rendimiento (Build & Deployment)

- **Renderizado del Lado del Servidor (SSR) y Componentes de Servidor**:
  - Maximizar el uso de **Server Components** de Next.js por defecto. Mantener componentes como *Server Components* a menos que requieran explícitamente interactividad del cliente (hooks, eventos), en cuyo caso se debe agregar `'use client'`.
  - Asegurar la hidratación limpia en el cliente sin descuadres de contenido (*hydration mismatch*).
- **SEO Técnico & Metadatos**:
  - Definir jerarquía semántica HTML5 correcta (único `<h1>` por página, `<main>`, `<section>`, `<header>`, `<footer>`).
  - Configurar metadatos dinámicos por página (`title`, `description`, etiquetas Open Graph `og:image`, `canonical`, etc.) utilizando la API de Metadata de Next.js.
- **Optimización de Carga y Scripts**:
  - Evitar la inclusión masiva e indiscriminada de librerías de terceros pesadas en el bundle inicial.
  - Usar la etiqueta `<Script>` de Next.js con estrategias adecuadas (`lazyOnload`, `afterInteractive`) para scripts externos de terceros (analítica, widgets).
  - Implementar **Dynamic Imports (`next/dynamic` / `React.lazy`)** para componentes pesados o que solo se carguen bajo demanda (modales complejas, gráficas, editores).
  - Optimizar recursos multimedia utilizando `next/image` (para optimización automática de formatos WebP/AVIF y lazy loading) y `next/font` para fuentes web sin layout shift.

---

## 7. Prevención de Anti-Patrones en React & Frontend

1. **Evitar Prop Drilling**: Usar **Zustand** para estados globales cliente; delegar estados de formulario a React Hook Form y estados de servidor a React Query. Evitar el uso excesivo o innecesario de React Context cuando Zustand provee mejor rendimiento.
2. **Uso Limpio de `useEffect`**: Prohibido usar `useEffect` para sincronizar estados locales redundantes o transformar datos derivados (calcular valores directamente en el render o con `useMemo`).
3. **Manejo Estricto de Claves (`key`)**: No usar el índice de un arreglo (`index`) como `key` en listas dinámicas o mutables.
4. **Tipado Estricto con TypeScript (Prohibición de `any`)**:
   - **Prohibido el uso de `any`**: Bajo ninguna circunstancia se debe utilizar `any`. En casos de tipo desconocido, utilizar `unknown` junto con validación o guardas de tipo (*type guards*).
   - **Buscar siempre el tipo más específico**: Priorizar tipos estrictos, uniones literales (`'success' | 'error'`), utilidades de TypeScript (`Pick`, `Omit`, `Partial`, `Record`) y genéricos descriptivos.
   - Inferir interfaces a partir de esquemas Zod con `z.infer<typeof schema>` para garantizar single source of truth entre validación en runtime y tipos de TypeScript.
   - Todas las `props`, retornos de funciones, handlers de eventos (`React.ChangeEvent<HTMLInputElement>`, etc.) y respuestas de API deben estar tipados de forma precisa y explícita.
5. **Separación de Responsabilidades**:
   - La lógica de negocio, formateos y llamadas a API deben residir en custom hooks (`use...`) o utilidades puras (`lib/`, `utils/`).
   - Los componentes visuales deben mantenerse lo más declarativos y limpios posible.
