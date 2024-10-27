
# WebBeacons

Este es el repositorio del frontend para la aplicación **WebBeacons**, una aplicación web construida con ReactJS. Este frontend está preparado para ejecutarse en un contenedor Docker para facilitar su despliegue.

## Estructura del proyecto

El código fuente está organizado de la siguiente manera:

``` bash
├── node_modules/     # Módulos de Node.js
├── public/           # Archivos estáticos y de configuración del frontend
├── src/              # Carpeta principal del código fuente
│   ├── Components/   # Componentes JSX que forman la estructura de la web
│   ├── Functions/    # Archivos JavaScript con funciones auxiliares
│   ├── Style/        # Archivos CSS para estilos
│   ├── index.css     # Estilos globales de la aplicación
│   ├── index.js      # Punto de entrada principal de la aplicación React
│   ├── reportWebVitals.js # Archivo para analizar el rendimiento de la app (Archivo añadido por React)
│   ├── setupTests.js  # Configuración de pruebas para Jest (Archivo añadido por React)
├── .gitignore        # Archivos y carpetas a ignorar por Git
├── Dockerfile        # Archivo para crear la imagen Docker
├── package.json      # Dependencias del proyecto y scripts de npm
├── package-lock.json # Información detallada de las dependencias
└── README.md         # Documento de introducción y guía (este archivo)
```

## Instalación y uso

Sigue los pasos a continuación para configurar y ejecutar el proyecto en tu entorno local:

### 1. Clona el repositorio

```bash
git clone <https://github.com/JorgeHelados/WebBeacons>
cd WebBeacons
```

### 2. Instala las dependencias

Ejecuta el siguiente comando para instalar todas las dependencias de Node.js necesarias para el proyecto:

```bash
npm install
```

### 3. Ejecuta la aplicación localmente

Para iniciar el servidor de desarrollo y ver la aplicación en el navegador:

```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`.

### 4. Ejecutar en Docker

Si deseas ejecutar la aplicación en un contenedor Docker, sigue estos pasos:

1. Construye la imagen Docker:

   ```bash
   docker build -t webbeacons-frontend .
   ```

2. Ejecuta el contenedor:

   ```bash
   docker run -p 3000:3000 webbeacons-frontend
   ```

Esto también abrirá la aplicación en `http://localhost:3000`.

## Autor

Desarrollado por **Jorge Satorres Pardo**.