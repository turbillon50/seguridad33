<div align="center">

# 🛡️ ENYA OPS

### Energización y Aplicaciones de Seguridad

**Plataforma SaaS premium para la administración integral de empresas de seguridad electrónica y servicios técnicos en campo.**

`CCTV` · `Alarmas` · `Cercado Eléctrico` · `Automatización` · `Control de Acceso` · `Portones Eléctricos` · `Redes` · `Cableado Estructurado` · `Video Porteros` · `Mantenimiento`

![Estado](https://img.shields.io/badge/estado-DEMO_visual-2563EB) ![Sin backend](https://img.shields.io/badge/backend-no_requerido-0EA5E9) ![Responsive](https://img.shields.io/badge/responsive-PWA-22C55E) ![Modo oscuro](https://img.shields.io/badge/modo-claro%2Foscuro-8B5CF6)

</div>

---

## 📌 Descripción

**ENYA OPS** es un **demo comercial 100% visual y navegable** de una plataforma SaaS de nivel enterprise, diseñada para empresas que ofrecen servicios de **seguridad electrónica, CCTV, alarmas, cercado eléctrico, control de acceso, portones, redes, cableado estructurado, video porteros, automatización, mantenimiento y servicios técnicos en campo**.

> ⚠️ **Importante:** este proyecto es una **demostración visual**. No incluye backend, base de datos, APIs ni conexiones reales. Todos los datos son **ficticios** y se generan en el navegador para fines de **presentación comercial**.

El objetivo es transmitir, en una sola experiencia, la sensación de un producto terminado y escalable que valga **+USD $100,000**, con la calidad de diseño de Apple, Linear, Stripe, Notion y Vercel.

---

## ✨ Características

- 🎬 **Landing de bienvenida con hero cinemático** (aurora animada, grid en perspectiva, scan de seguridad, mockups flotantes y animaciones al hacer scroll).
- 🧑‍💼 **Flujo de registro de usuario** en 2 pasos + inicio de sesión, con Google y “Demo Access”.
- 🎨 **Diseño premium** inspirado en Apple HIG, Linear, Stripe, Arc, Notion y Vercel.
- 🌗 **Modo claro y oscuro** con conmutador y persistencia.
- 📱 **PWA instalable y responsive total** (móvil + escritorio): manifest, **service worker offline** e íconos maskable. Se instala como app desde el navegador.
- 🧭 **Totalmente navegable** mediante router por hash, sin recargar la página.
- ⚡ **Cero build, cero dependencias de servidor** — abre `index.html` y funciona.
- 📊 **Gráficas interactivas** (Chart.js vía CDN).
- 🤖 **ENYA AI** — panel de insights con ejemplos de inteligencia operativa.
- 🏢 **Multisucursal** — comparativo corporativo (Chetumal, Cancún, Playa del Carmen).
- 🎞️ **Animaciones suaves** estilo Apple, microinteracciones y hover avanzado.

---

## 🚀 Cómo ejecutar

No requiere instalación ni compilación.

**Opción 1 — Abrir directo**
```
Abre el archivo index.html en tu navegador.
```

**Opción 2 — Servidor local (recomendado)**
```bash
# Python
python3 -m http.server 8080
# luego abre http://localhost:8080

# o con Node
npx serve .
```

**Opción 3 — Desplegar gratis**
- **Vercel:** importa el repositorio (incluye `vercel.json`). Es un sitio estático.
- **GitHub Pages:** activa Pages sobre la rama y la raíz `/`.
- **Netlify:** arrastra la carpeta.

> Flujo: **Landing (hero cinemático) → Crear cuenta / Iniciar sesión → Panel**. Cualquier botón (**Demo Access**, **Google** o **Entrar al demo**) entra al panel. En navegador compatible verás el aviso **“Instalar ENYA OPS”** para añadirla como app.

---

## 🧩 Módulos incluidos

| Módulo | Descripción |
|---|---|
| **Dashboard** | KPIs (ventas, cotizaciones, proyectos, órdenes, técnicos, cobranza, clientes, instalaciones) + 6 gráficas + ENYA AI. |
| **CRM** | Pipeline visual tipo kanban: Lead Nuevo → Contactado → Cotización → Negociación → Ganado / Perdido. |
| **Prospectos** | Tabla moderna con origen, interés, valor potencial y estado. |
| **Clientes** | Vista enterprise 360°: datos, contratos, equipos, historial, facturas y cobranza. |
| **Cotizaciones** | Generador profesional con conceptos, subtotal, IVA, total, firma, PDF y envío por WhatsApp/Correo. |
| **Proyectos** | Tablero por estado + detalle con timeline, avances, responsables y evidencias. |
| **Órdenes de Trabajo** | Listado con cliente, ubicación, fecha, responsable, prioridad y estado. |
| **App de Campo** | Vista móvil del técnico: mis órdenes, checklist, evidencias, firma y material. |
| **Instalaciones** | Checklists por tipo (CCTV, alarmas, cercado, redes, portón, control de acceso) y evidencias. |
| **Técnicos** | Perfiles, especialidad, cuadrilla, rendimiento y estado en campo. |
| **Mapa Operativo** | Mockup tipo Google Maps con técnicos, clientes, instalaciones y proyectos. |
| **Inventario** | Categorías, stock, mínimos, alertas, proveedores (entradas / salidas / transferencias). |
| **Contratos** | Generador con firma digital, plantillas e historial. |
| **Facturación** | Facturas: pagadas, pendientes, vencidas, canceladas. |
| **Cobranza** | Antigüedad de saldos (aging) + recomendaciones de ENYA AI. |
| **Reportes** | Analítica: ventas, cobranza, técnicos, rentabilidad por servicio. |
| **Multisucursal** | Dashboard corporativo y comparativos entre sucursales. |
| **ENYA AI** | Resumen ejecutivo, predicciones y optimizaciones (datos ficticios). |
| **Portal Cliente** | Vista del cliente final: proyectos, facturas, pagos, contratos y evidencias. |
| **Configuración** | Notificaciones (Push, Correo, WhatsApp, SMS), equipo, roles e integraciones. |

---

## 📲 App Técnico (PWA instalable)

Además del panel web, el repositorio incluye una **PWA real e instalable** para los técnicos de campo, construida a partir del diseño exportado de **Google Stitch** (carpeta `tecnico/`).

| Pantalla | Archivo |
|---|---|
| Dashboard del técnico | `tecnico/index.html` |
| Mis Órdenes | `tecnico/ordenes.html` |
| Checklist CCTV | `tecnico/checklist.html` |
| Evidencias y Firma | `tecnico/evidencias.html` |

**Características PWA:**
- 📱 **Instalable** en Android/iOS y escritorio (manifest + iconos maskable).
- 🔌 **Funciona offline** mediante *service worker* (`tecnico/sw.js`) con precache del shell y *stale-while-revalidate* para CDN/fuentes.
- 🧭 **Navegación inferior unificada** entre las 4 pantallas (`tecnico/pwa.js`).
- 🎨 Diseño original de Stitch (Material 3 + Tailwind + Inter) intacto.

**Cómo probarla:** sirve el proyecto (`python3 -m http.server`) y abre `…/tecnico/index.html`, o desde el panel web entra a **App de Campo → “Abrir App Técnico (PWA)”**. En móvil usa “Agregar a pantalla de inicio”.

> El service worker requiere **HTTPS** o `localhost` para registrarse (Vercel/GitHub Pages ya cumplen).

---

## 🏗️ Arquitectura (del demo)

```
seguridad33/
├── index.html                 # Punto de entrada (login + shell)
├── manifest.webmanifest        # PWA
├── vercel.json                 # Config de despliegue estático
├── assets/
│   ├── css/
│   │   └── styles.css          # Sistema de diseño (tokens, light/dark, componentes)
│   └── js/
│       ├── data.js             # Datos MOCK, iconos SVG y logo
│       ├── ui.js               # Helpers de UI reutilizables + Chart.js
│       ├── modules.js          # Renderizadores de cada módulo (vistas)
│       └── app.js              # Shell, sidebar, router (hash) y arranque
└── tecnico/                    # PWA App Técnico (export de Google Stitch)
    ├── index.html              # Dashboard del técnico
    ├── ordenes.html            # Mis Órdenes
    ├── checklist.html          # Checklist CCTV
    ├── evidencias.html         # Evidencias y Firma
    ├── pwa.js                  # SW register + navegación + install prompt
    ├── sw.js                   # Service Worker (offline)
    ├── manifest.webmanifest    # Manifest PWA
    └── icon-*.png · icon.svg   # Iconos (incl. maskable)
```

**Principios de diseño**
- Sistema de tokens CSS para temas (claro/oscuro) y consistencia visual.
- Router por *hash* sin framework: cada módulo es una función que devuelve HTML (+ `mount()` opcional para gráficas y eventos).
- Datos generados en cliente (`data.js`) que simulan 1,500 clientes, 320 prospectos, 250 proyectos, 80 técnicos, 650 órdenes y 3,500 productos.

---

## 🎨 Identidad visual

| Token | Color | Uso |
|---|---|---|
| Principal | `#2563EB` | Marca, acciones primarias |
| Secundario | `#0EA5E9` | Acentos, degradados |
| Éxito | `#22C55E` | Estados positivos |
| Advertencia | `#F59E0B` | Alertas suaves |
| Error | `#EF4444` | Vencidos / críticos |
| Fondo (claro) | `#F8FAFC` | Background |
| Tarjetas | `#FFFFFF` | Superficies |
| Borde | `#E5E7EB` | Separadores |
| Texto | `#0F172A` | Tipografía |

Tipografía del sistema (San Francisco / Inter / Segoe UI), esquinas redondeadas, sombras suaves y microinteracciones *Apple-like*.

---

## 🗺️ Roadmap

- [x] **v0.1 — Demo visual** completa y navegable (este repositorio).
- [ ] **v0.2** — Autenticación real (Clerk) y multi-tenant por empresa.
- [ ] **v0.3** — Persistencia (Neon/Postgres) y API.
- [ ] **v0.4** — App de campo nativa (PWA offline + cámara/GPS reales).
- [ ] **v0.5** — Cotizaciones con PDF real, firma electrónica y envío WhatsApp/correo.
- [ ] **v0.6** — Pagos en línea (Mercado Pago / Stripe) y conciliación de cobranza.
- [ ] **v0.7** — ENYA AI productivo (predicción de ventas, cartera y rutas).
- [ ] **v1.0** — Mapa operativo en vivo (Google Maps) y monitoreo de equipos.

---

## 🔌 Integraciones futuras

`Clerk` (auth) · `Neon` (DB) · `Resend` (correo) · `Twilio` (SMS/WhatsApp) · `Mercado Pago` / `Stripe` (pagos) · `Google Maps` (mapa operativo) · `UploadThing` (evidencias) · `OpenAI` (ENYA AI).

---

## 🧱 Tecnologías

**Demo actual:** HTML5 · CSS3 (sistema de diseño propio) · JavaScript vanilla · Chart.js.

**Stack recomendado para producción:**

| Capa | Tecnología |
|---|---|
| Framework | **Next.js** (App Router) |
| Estilos | **Tailwind CSS** + **shadcn/ui** |
| Auth | **Clerk** |
| Base de datos | **Neon** (Postgres serverless) |
| Correo | **Resend** |
| Mensajería | **Twilio** (SMS / WhatsApp) |
| Pagos | **Mercado Pago** · **Stripe** |
| Mapas | **Google Maps Platform** |
| Archivos | **UploadThing** |
| IA | **OpenAI** |
| Hosting | **Vercel** |

---

<div align="center">

**ENYA OPS** · Demo comercial · Hecho para impresionar a operaciones y cerrar ventas.

*Todos los datos mostrados son ficticios y con fines de demostración.*

</div>