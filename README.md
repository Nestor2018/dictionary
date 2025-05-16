# Diccionario Web

Una aplicación web de diccionario construida con Next.js, TypeScript y Redux.

## Características

- 🔍 Búsqueda de palabras en tiempo real
- 🎨 Temas claro/oscuro
- 🔤 Selector de fuentes (Serif, Sans-Serif, Mono)
- 🔊 Reproducción de audio para pronunciación
- 📱 Diseño responsivo
- 💾 Historial de búsquedas persistente

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Scripts Disponibles

- Desarrollo:

  ```bash
  npm run dev
  ```

  Inicia el servidor de desarrollo con Turbopack en <http://localhost:3000>

- Construcción:

  ```bash
  npm run build
  ```

  Crea una versión optimizada para producción

- Inicio:

  ```bash
  npm run start
  ```

  Inicia el servidor en modo producción

- Tests:

  ```bash
  npm run test
  npm run test:watch
  ```

  Ejecuta los tests utilizando Jest y Testing Library

- Linting:
  ```bash
  npm run lint
  ```

## Tecnologías Principales

- Next.js
- TypeScript
- Redux Toolkit
- TailwindCSS
- Jest & Testing Library
- Redux Persist

## Estructura del Proyecto

```plaintext
/
├── src/
│   ├── components/     # Componentes React
│   ├── hooks/         # Hooks personalizados
│   ├── pages/         # Páginas de Next.js
│   ├── store/         # Configuración y slices de Redux
│   ├── styles/        # Estilos globales
│   └── types/         # Definiciones de tipos TypeScript
├── public/            # Archivos estáticos
└── __tests__/        # Tests
```

## Licencia

MIT
