# StyleRecord Lite

Aplicación web para que profesionales de la belleza registren clientes, servicios y compartan historiales mediante enlaces temporales.

## 🚀 Demo en vivo

[GitHub Pages](https://aaronbarra040998.github.io/StyleRecordLite/)

## 📋 Funcionalidades

- Registro de clientes con validación telefónica (Numverify API)
- CRUD de clientes (crear, leer, actualizar, eliminar)
- Registro de servicios (corte, tinte, tratamiento, etc.) con imágenes placeholder (Lorem Picsum)
- Historial cronológico de servicios por cliente
- Vista de cliente (acceso por número de teléfono, solo lectura)
- Generación de enlaces temporales (24h) para compartir perfil
- Búsqueda de clientes en tiempo real
- Diseño responsive (mobile first)

## 🔑 APIs externas utilizadas

| API | Uso | Atributos retornados |
|-----|-----|----------------------|
| [Numverify](https://numverify.com) | Validación de número telefónico | `valid`, `country_code`, `country_name`, `location`, `carrier`, `line_type` |
| [Lorem Picsum](https://picsum.photos) | Imágenes placeholder para antes/después | URLs de imágenes aleatorias |

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript (ES6+)
- Vite (bundler)
- localStorage (persistencia de datos)
- ESLint + Prettier (calidad de código)
- GitHub Pages / Netlify (despliegue)

## ⚙️ Instalación local

1. Clonar el repositorio:
   ```bash

   git clone https://github.com/aaronbarra040998/StyleRecordLite.git
   cd StyleRecordLite

2. Instalar dependencias:

    npm install

3. Obtener API key gratuita de Numverify:

    en https://numverify.com y reemplazar en src/js/numverifyService.mjs

4. Ejecutar servidor de desarrollo:

    npm run start

5. Abrir http://localhost:5173

## 📦 Build de producción

-Los archivos se generan en docs/, listos para GitHub Pages.

npm run build

## 🔒 Limitaciones conocidas

-Almacenamiento solo local (sin backend). Los datos no se sincronizan entre dispositivos.

-La API key de Numverify está expuesta en el frontend (para MVP).

-Límite gratuito de Numverify: 100 peticiones/mes. Se ofrece validación manual como fallback.

-Los enlaces temporales dependen del almacenamiento local del navegador que generó el token.

## 📝 Licencia
Proyecto académico – WDD 330.
