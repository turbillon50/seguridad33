/* ============================================================
   ENYA OPS — App shell, router (hash) y arranque
   Demo 100% visual · sin backend · navegable
   ============================================================ */
(function (global) {
  "use strict";
  const D = global.ENYA, U = global.UI, M = global.MODULES, I = D.I;

  /* ---------- Navegación ---------- */
  const NAV = [
    { group: "Principal", items: [
      { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    ]},
    { group: "Comercial", items: [
      { id: "crm", label: "CRM", icon: "crm" },
      { id: "clientes", label: "Clientes", icon: "clients", badge: "1.5k" },
      { id: "prospectos", label: "Prospectos", icon: "leads", badge: "320" },
      { id: "cotizaciones", label: "Cotizaciones", icon: "quote" },
    ]},
    { group: "Operación", items: [
      { id: "proyectos", label: "Proyectos", icon: "projects", badge: "250" },
      { id: "ordenes", label: "Órdenes de Trabajo", icon: "orders", badge: "47" },
      { id: "field", label: "App de Campo", icon: "field" },
      { id: "instalaciones", label: "Instalaciones", icon: "install" },
      { id: "tecnicos", label: "Técnicos", icon: "techs", badge: "80" },
      { id: "mapa", label: "Mapa Operativo", icon: "map" },
      { id: "inventario", label: "Inventario", icon: "inventory" },
    ]},
    { group: "Finanzas", items: [
      { id: "contratos", label: "Contratos", icon: "contracts" },
      { id: "facturacion", label: "Facturación", icon: "billing" },
      { id: "cobranza", label: "Cobranza", icon: "collect", badge: "!" },
    ]},
    { group: "Inteligencia", items: [
      { id: "reportes", label: "Reportes", icon: "reports" },
      { id: "sucursales", label: "Multisucursal", icon: "branch" },
      { id: "ai", label: "ENYA AI", icon: "ai" },
    ]},
    { group: "Otros", items: [
      { id: "portal", label: "Portal Cliente", icon: "portal" },
      { id: "configuracion", label: "Configuración", icon: "settings" },
    ]},
  ];
  const TITLES = {}; const CRUMBS = {};
  NAV.forEach(g => g.items.forEach(it => { TITLES[it.id] = it.label; CRUMBS[it.id] = g.group; }));

  /* ---------- Tema ---------- */
  function getTheme() { return localStorage.getItem("enya-theme") || "light"; }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("enya-theme", t);
    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = t === "dark" ? I.sun : I.moon;
  }
  function toggleTheme() {
    const t = getTheme() === "dark" ? "light" : "dark";
    applyTheme(t);
    // re-render para refrescar colores de charts
    const cur = (location.hash || "#/dashboard").replace("#/", "");
    renderModule(cur);
  }

  /* ---------- Sidebar ---------- */
  function sidebar() {
    return `<aside class="sidebar" id="sidebar">
      <div class="sidebar__brand">${D.logoMark(38)}<div><b style="font-size:16px">ENYA OPS</b><div class="sub">Energización y Aplicaciones</div></div></div>
      ${NAV.map(g => `<div class="nav-group">
        <div class="nav-group__label">${g.group}</div>
        ${g.items.map(it => `<a class="nav-item" href="#/${it.id}" data-id="${it.id}">${I[it.icon]}<span>${it.label}</span>${it.badge ? `<span class="badge">${it.badge}</span>` : ""}</a>`).join("")}
      </div>`).join("")}
      <div style="margin-top:auto;padding:14px 8px 4px">
        <div class="card card--pad" style="padding:14px">
          <div class="stat-mini"><span class="dot-pulse"></span><b style="font-size:13px">Sistema operativo</b></div>
          <div class="tag-soft" style="margin-top:6px">Demo · datos ficticios</div>
        </div>
      </div>
    </aside>`;
  }

  function header() {
    return `<header class="header">
      <button class="icon-btn menu-btn" id="menuBtn">${I.menu}</button>
      <div><div class="header__title" id="hTitle">Dashboard</div><div class="header__crumb" id="hCrumb">Principal</div></div>
      <div class="search"><span style="width:16px;height:16px;display:inline-flex">${I.search}</span><input placeholder="Buscar en ENYA OPS…  (clientes, OT, facturas)"></div>
      <button class="icon-btn" id="themeBtn">${I.moon}</button>
      <button class="icon-btn">${I.bell}<span class="dot"></span></button>
      <button class="avatar" title="José Luis de la Torre">JL</button>
    </header>`;
  }

  /* ---------- Render módulo ---------- */
  function renderModule(id) {
    if (!M[id]) id = "dashboard";
    const mod = M[id]();
    const content = document.getElementById("content");
    U.destroyCharts();
    content.innerHTML = mod.html;
    content.scrollTop = 0;
    if (mod.mount) mod.mount(content);

    // estados
    document.getElementById("hTitle").textContent = TITLES[id] || "ENYA OPS";
    document.getElementById("hCrumb").textContent = "ENYA OPS · " + (CRUMBS[id] || "");
    document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.id === id));
    // cerrar sidebar en móvil
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("scrim").classList.remove("show");
  }

  function route() {
    const id = (location.hash || "#/dashboard").replace("#/", "");
    renderModule(id);
  }

  /* ---------- Login ---------- */
  function loginView() {
    const node = U.el(`<div class="login">
      <div class="login__hero">
        <div class="login__brand">${D.logoMark(40)}<div><b style="font-size:18px">ENYA OPS</b><div style="font-size:11px;opacity:.85">Energización y Aplicaciones de Seguridad</div></div></div>
        <div>
          <h1>Bienvenido a<br>ENYA OPS</h1>
          <p>Controla toda tu operación desde un solo lugar: CCTV, alarmas, cercado eléctrico, control de acceso, proyectos, técnicos en campo, cobranza y más.</p>
          <div class="login__scene">
            <div class="scene">
              <div class="scene__building">${Array.from({ length: 12 }).map(() => '<span class="scene__win"></span>').join("")}</div>
              <div class="scene__node n1">${I.camera}</div>
              <div class="scene__node n2">${I.alarm}</div>
              <div class="scene__node n3">${I.lock}</div>
              <div class="scene__node n4">${I.gate}</div>
            </div>
          </div>
        </div>
        <div class="login__chips">
          <span class="login__chip">${I.shield} Seguridad electrónica</span>
          <span class="login__chip">${I.camera} CCTV</span>
          <span class="login__chip">${I.network} Redes</span>
          <span class="login__chip">${I.gate} Portones</span>
        </div>
      </div>
      <div class="login__form-wrap">
        <div class="login__card">
          <div style="margin-bottom:24px">${D.logoMark(44)}</div>
          <h2>Iniciar sesión</h2>
          <p class="muted">Accede al panel de control de tu empresa.</p>
          <div class="field"><label>Correo electrónico</label><input type="email" value="director@enyaops.mx" placeholder="tu@empresa.mx"></div>
          <div class="field"><label>Contraseña</label><input type="password" value="demo1234" placeholder="••••••••"></div>
          <button class="btn btn--primary btn--block btn--lg" id="loginBtn">Iniciar sesión</button>
          <div class="login__sep">o continúa con</div>
          <button class="btn btn--block" id="googleBtn" style="margin-bottom:10px"><span style="width:18px;height:18px;display:inline-flex">${I.google}</span> Google</button>
          <button class="btn btn--grad btn--block" id="demoBtn">${I.ai} Demo Access — Entrar sin registro</button>
          <p class="tag-soft" style="text-align:center;margin-top:18px">Demo visual · sin backend · datos ficticios</p>
        </div>
      </div>
    </div>`);
    node.querySelector("#loginBtn").addEventListener("click", enterApp);
    node.querySelector("#googleBtn").addEventListener("click", enterApp);
    node.querySelector("#demoBtn").addEventListener("click", enterApp);
    return node;
  }

  /* ---------- App view ---------- */
  function appView() {
    const node = U.el(`<div class="app">
      ${sidebar()}
      <div class="main">${header()}<main class="content" id="content"></main></div>
      <div class="scrim" id="scrim"></div>
    </div>`);
    return node;
  }

  function enterApp() {
    sessionStorage.setItem("enya-auth", "1");
    mount();
  }

  /* ---------- Mount root ---------- */
  function mount() {
    const root = document.getElementById("app-root");
    root.innerHTML = "";
    applyTheme(getTheme());
    if (sessionStorage.getItem("enya-auth")) {
      root.appendChild(appView());
      document.getElementById("themeBtn").addEventListener("click", toggleTheme);
      document.getElementById("menuBtn").addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("open");
        document.getElementById("scrim").classList.toggle("show");
      });
      document.getElementById("scrim").addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("open");
        document.getElementById("scrim").classList.remove("show");
      });
      if (!location.hash) location.hash = "#/dashboard";
      route();
    } else {
      root.appendChild(loginView());
    }
  }

  window.addEventListener("hashchange", () => { if (sessionStorage.getItem("enya-auth")) route(); });
  document.addEventListener("DOMContentLoaded", mount);
})(window);
