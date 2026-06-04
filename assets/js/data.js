/* ============================================================
   ENYA OPS — Datos MOCK (demo, sin backend ni APIs reales)
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------- Iconos SVG (Lucide-style) ---------- */
  const I = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
    crm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    clients: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    leads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>',
    projects: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>',
    orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    techs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    inventory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8V21H3V8"/><rect x="1" y="3" width="22" height="5"/><path d="M10 12h4"/></svg>',
    contracts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>',
    billing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    collect: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="8"/><rect x="12" y="6" width="3" height="12"/><rect x="17" y="13" width="3" height="5"/></svg>',
    portal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    field: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
    branch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    alarm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V8l8-4 8 4v12M8 20v-6M16 20v-6M8 11h8"/></svg>',
    network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-2h14v2"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    money: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7 17 17M17 7v10H7"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.07z"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 20"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    google: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.5 10.5 0 0 0 12 .5 11 11 0 0 0 2.18 7.06L5.84 9.9C6.71 7.3 9.14 4.75 12 4.75z"/></svg>',
  };

  /* ---------- Logo ENYA ---------- */
  function logoMark(size = 38) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-label="ENYA">
      <rect width="48" height="48" rx="13" fill="url(#enyaG)"/>
      <path d="M24 9l11 5.5v9c0 7-4.7 11.2-11 13.5C17.7 34.7 13 30.5 13 23.5v-9L24 9z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M20 24l3 3 6-6.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <defs><linearGradient id="enyaG" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#2563EB"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient></defs>
    </svg>`;
  }

  /* ---------- Utilidades ---------- */
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const money = (n) => "$" + Math.round(n).toLocaleString("es-MX");
  const initials = (name) => name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const AV_COLORS = ["#2563EB", "#0EA5E9", "#22C55E", "#F59E0B", "#8B5CF6", "#EF4444", "#0284c7", "#16a34a"];
  const colorFor = (s) => AV_COLORS[(s.charCodeAt(0) + s.length) % AV_COLORS.length];

  /* ---------- Catálogos ---------- */
  const SERVICIOS = ["CCTV", "Alarmas", "Cercado Eléctrico", "Automatización", "Control de Acceso", "Portones Eléctricos", "Redes", "Cableado Estructurado", "Video Porteros", "Seguridad Electrónica", "Mantenimiento"];
  const EMPRESAS = ["Plaza Las Américas", "Hotel Riviera Maya", "Condominios Bahía", "Fraccionamiento Real", "Corporativo Caribe", "Bodegas del Sureste", "Residencial Aqua", "Escuela Montessori", "Banco Peninsular", "Tiendas OXXO Zona", "Marina Puerto Cancún", "Clínica del Carmen", "Industrias Tulum", "Grupo Constructor Maya", "Farmacias Similares", "Hotel Xcaret Eco", "Universidad Anáhuac", "Plaza Outlet Cancún", "Residencial Lagos", "Centro Comercial Malecón"];
  const NOMBRES = ["Carlos Méndez", "Ana Sofía Rivas", "Miguel Ángel Tun", "Laura Canché", "José Luis Pat", "Fernanda Uc", "Roberto Chan", "Diana Poot", "Eduardo Balam", "Gabriela May", "Luis Cauich", "Patricia Ek", "Héctor Cob", "Mariana Dzul", "Andrés Cetina", "Sofía Noh", "Ricardo Cima", "Valeria Aké", "Jorge Pech", "Karla Ucán"];
  const SUCURSALES = ["Chetumal", "Cancún", "Playa del Carmen"];
  const ORIGENES = ["Facebook Ads", "Recomendación", "Google", "WhatsApp", "Sitio Web", "Llamada", "Visita directa"];

  /* ---------- Generadores ---------- */
  function genClientes(n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const name = i < EMPRESAS.length ? EMPRESAS[i] : pick(EMPRESAS) + " " + rand(2, 99);
      out.push({
        id: "CLI-" + String(1000 + i),
        name,
        contact: pick(NOMBRES),
        phone: "998 " + rand(100, 999) + " " + rand(1000, 9999),
        email: name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10) + "@cliente.mx",
        branch: pick(SUCURSALES),
        services: [...new Set([pick(SERVICIOS), pick(SERVICIOS)])],
        contracts: rand(1, 4),
        equipos: rand(4, 60),
        ltv: rand(45000, 980000),
        pending: rand(0, 1) ? rand(0, 120000) : 0,
        status: pick(["Activo", "Activo", "Activo", "VIP", "Inactivo"]),
        since: rand(2018, 2025),
      });
    }
    return out;
  }

  function genProspectos(n) {
    const etapas = ["Lead Nuevo", "Contactado", "Cotización", "Negociación", "Ganado", "Perdido"];
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push({
        id: "PRS-" + String(500 + i),
        name: pick(NOMBRES),
        company: pick(EMPRESAS),
        phone: "984 " + rand(100, 999) + " " + rand(1000, 9999),
        email: "contacto" + rand(10, 99) + "@prospecto.mx",
        origin: pick(ORIGENES),
        interest: pick(SERVICIOS),
        value: rand(18000, 540000),
        stage: pick(etapas),
        owner: pick(NOMBRES),
      });
    }
    return out;
  }

  function genTecnicos(n) {
    const esp = ["CCTV & NVR", "Alarmas", "Cercado Eléctrico", "Redes & Fibra", "Control de Acceso", "Portones", "Automatización"];
    const out = [];
    for (let i = 0; i < n; i++) {
      const name = pick(NOMBRES);
      out.push({
        id: "TEC-" + String(20 + i),
        name,
        specialty: pick(esp),
        crew: "Cuadrilla " + pick(["Alfa", "Bravo", "Delta", "Omega", "Sigma"]),
        branch: pick(SUCURSALES),
        activeProjects: rand(1, 6),
        rating: (rand(40, 50) / 10).toFixed(1),
        productivity: rand(72, 99),
        status: pick(["En campo", "En campo", "Disponible", "En ruta", "Descanso"]),
        orders: rand(40, 220),
      });
    }
    return out;
  }

  function genOrdenes(n) {
    const estados = ["Asignada", "En ruta", "En sitio", "En proceso", "Completada", "Pausada"];
    const prior = ["Alta", "Media", "Baja", "Urgente"];
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push({
        id: "OT-" + String(7000 + i),
        client: pick(EMPRESAS),
        service: pick(SERVICIOS),
        location: pick(SUCURSALES) + ", Q. Roo",
        date: "2026-06-" + String(rand(1, 28)).padStart(2, "0"),
        tech: pick(NOMBRES),
        status: pick(estados),
        priority: pick(prior),
      });
    }
    return out;
  }

  function genProyectos(n) {
    const estados = ["Prospección", "Cotizado", "Aprobado", "Programado", "En ejecución", "Finalizado", "Cancelado"];
    const out = [];
    for (let i = 0; i < n; i++) {
      const st = pick(estados);
      out.push({
        id: "PRY-" + String(2400 + i),
        name: pick(["Instalación", "Modernización", "Ampliación", "Integración"]) + " " + pick(SERVICIOS),
        client: pick(EMPRESAS),
        manager: pick(NOMBRES),
        branch: pick(SUCURSALES),
        value: rand(60000, 1800000),
        progress: st === "Finalizado" ? 100 : st === "En ejecución" ? rand(35, 90) : st === "Programado" ? rand(5, 20) : 0,
        status: st,
        due: "2026-" + String(rand(6, 12)).padStart(2, "0") + "-" + String(rand(1, 28)).padStart(2, "0"),
      });
    }
    return out;
  }

  function genInventario(n) {
    const cats = [
      { c: "Cámaras", items: ["Domo IP 4MP", "Bullet 8MP", "PTZ 25X", "Turret 5MP", "Cámara 360°"] },
      { c: "DVR/NVR", items: ["NVR 16CH 8MP", "DVR 8CH", "NVR 32CH", "Grabador PoE 8CH"] },
      { c: "Alarmas", items: ["Panel Alarma 8 zonas", "Sirena exterior 30W", "Teclado táctil", "Comunicador GSM"] },
      { c: "Sensores", items: ["PIR doble tecnología", "Sensor magnético", "Detector de humo", "Barrera infrarroja"] },
      { c: "Cable", items: ["Cable UTP Cat6 305m", "Cable coaxial RG59", "Fibra óptica 12 hilos", "Cable calibre 18"] },
      { c: "Conectores", items: ["Conector BNC", "Jack RJ45 Cat6", "Plug fibra SC", "Faston terminal"] },
      { c: "Portones", items: ["Motor portón 1HP", "Brazo abatible", "Cremallera 1m", "Control remoto 433MHz"] },
      { c: "Control de Acceso", items: ["Lector huella+RFID", "Cerradura magnética 600lb", "Botón de salida", "Torniquete trípode"] },
      { c: "Video Porteros", items: ["Videoportero 7\"", "Panel exterior IP", "Frente de calle 2 hilos"] },
      { c: "Herramientas", items: ["Ponchadora RJ45", "Tester de red", "Taladro 20V", "Multímetro digital"] },
    ];
    const out = [];
    let id = 0;
    cats.forEach(group => group.items.forEach(name => {
      const stock = rand(0, 240), min = rand(10, 40);
      out.push({
        id: "SKU-" + String(4000 + id++),
        category: group.c, name,
        stock, min,
        price: rand(180, 28000),
        supplier: pick(["Hikvision MX", "Dahua Dist.", "Syscom", "TVC", "Comm-Tech", "Provision MX"]),
        status: stock === 0 ? "Agotado" : stock < min ? "Bajo" : "Disponible",
      });
    }));
    return out;
  }

  function genFacturas(n) {
    const estados = ["Pagada", "Pendiente", "Vencida", "Cancelada"];
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push({
        id: "FAC-" + String(9100 + i),
        client: pick(EMPRESAS),
        amount: rand(8000, 480000),
        issued: "2026-0" + rand(1, 6) + "-" + String(rand(1, 28)).padStart(2, "0"),
        due: "2026-0" + rand(2, 7) + "-" + String(rand(1, 28)).padStart(2, "0"),
        status: pick(estados),
      });
    }
    return out;
  }

  /* ---------- Datos de cabecera ---------- */
  const counts = { clientes: 1500, prospectos: 320, proyectos: 250, tecnicos: 80, ordenes: 650, productos: 3500 };

  const DATA = {
    I, logoMark, money, initials, colorFor, rand, pick,
    SERVICIOS, SUCURSALES, counts,
    clientes: genClientes(120),
    prospectos: genProspectos(80),
    tecnicos: genTecnicos(40),
    ordenes: genOrdenes(60),
    proyectos: genProyectos(48),
    inventario: genInventario(),
    facturas: genFacturas(40),
  };

  /* ---------- KPIs dashboard ---------- */
  DATA.kpis = [
    { label: "Ventas del Mes", value: money(4280000), delta: "+12.4%", up: true, icon: "money", tint: "blue" },
    { label: "Cotizaciones Activas", value: "186", delta: "+8.1%", up: true, icon: "quote", tint: "cyan" },
    { label: "Proyectos Activos", value: "64", delta: "+5.0%", up: true, icon: "projects", tint: "purple" },
    { label: "Órdenes en Campo", value: "47", delta: "+3.2%", up: true, icon: "orders", tint: "yellow" },
    { label: "Técnicos Activos", value: "72/80", delta: "90%", up: true, icon: "techs", tint: "green" },
    { label: "Cobranza Pendiente", value: money(1860000), delta: "+12%", up: false, icon: "collect", tint: "red" },
    { label: "Clientes Activos", value: "1,500", delta: "+64", up: true, icon: "clients", tint: "blue" },
    { label: "Instalaciones Terminadas", value: "1,284", delta: "+38", up: true, icon: "install", tint: "green" },
  ];

  /* ---------- ENYA AI insights ---------- */
  DATA.aiInsights = [
    { icon: "alert", tint: "tint-red", text: "Detectamos que la <b>cobranza vencida aumentó 12%</b> este mes. 3 clientes concentran el 64% del saldo." },
    { icon: "clock", tint: "tint-yellow", text: "Existen <b>3 proyectos próximos a finalizar</b> esta semana. Programa la entrega y firma del cliente." },
    { icon: "techs", tint: "tint-green", text: "El técnico <b>Carlos Méndez es el más productivo</b> del mes con 98% de órdenes cerradas a tiempo." },
    { icon: "up", tint: "tint-blue", text: "La conversión comercial en <b>Sucursal Cancún subió 9%</b>. Replica el guion de ventas en Chetumal." },
    { icon: "inventory", tint: "tint-purple", text: "<b>8 SKUs por debajo del stock mínimo</b> (cable Cat6, motores de portón). Sugiero generar orden de compra." },
  ];

  /* ---------- Sucursales / multisucursal ---------- */
  DATA.branches = [
    { name: "Chetumal", sales: 1180000, projects: 18, techs: 22, collection: 92, growth: "+6%" },
    { name: "Cancún", sales: 2240000, projects: 31, techs: 38, collection: 88, growth: "+11%" },
    { name: "Playa del Carmen", sales: 860000, projects: 15, techs: 20, collection: 95, growth: "+4%" },
  ];

  /* ---------- Charts series ---------- */
  DATA.series = {
    meses: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    ventas: [2.8, 3.1, 3.4, 3.0, 3.9, 4.28],
    meta: [3.0, 3.0, 3.2, 3.4, 3.6, 4.0],
    cobranza: [1.2, 1.4, 1.1, 1.6, 1.5, 1.86],
    recuperada: [2.1, 2.4, 2.0, 2.8, 3.1, 3.4],
    conversion: [22, 26, 29, 31, 34, 38],
    instalaciones: [180, 210, 240, 205, 268, 290],
    pipeline: [42, 31, 24, 16, 28, 9],
    rentabilidad: [28, 31, 30, 33, 35, 37],
  };

  global.ENYA = DATA;
})(window);
