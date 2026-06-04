/* ============================================================
   ENYA OPS — Sitio público: Landing cinemática + Registro + Login
   Devuelve nodos DOM. Entrar a la app: window.__enyaEnter()
   ============================================================ */
(function (global) {
  "use strict";
  const D = global.ENYA, I = D.I;
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };
  const go = (hash) => { location.hash = hash; };
  const enter = () => { (global.__enyaEnter || function () {})(); };

  /* ---------- Fondo cinemático compartido ---------- */
  function cine() {
    let stars = "";
    for (let i = 0; i < 26; i++) {
      stars += `<span class="star" style="left:${Math.random() * 100}%;top:${Math.random() * 70}%;animation-delay:${(Math.random() * 4).toFixed(1)}s;opacity:${(.3 + Math.random() * .5).toFixed(2)}"></span>`;
    }
    return `<div class="cine"><div class="cine__aurora"></div><div class="cine__grid"></div><div class="cine__scan"></div>${stars}</div>`;
  }

  function topnav(active) {
    return `<nav class="lnav" id="lnav">
      <div class="lnav__brand">${D.logoMark(34)}<div>ENYA OPS<div class="sub">Energización y Aplicaciones de Seguridad</div></div></div>
      <div class="lnav__links">
        <a href="#/welcome">Producto</a>
        <a href="#/welcome">Módulos</a>
        <a href="#/welcome">App Técnico</a>
        <a href="#/welcome">Precios</a>
      </div>
      <div class="lnav__cta">
        <button class="lbtn lbtn--ghost" onclick="location.hash='#/login'">Iniciar sesión</button>
        <button class="lbtn lbtn--primary" onclick="location.hash='#/registro'">Crear cuenta</button>
        <button class="lbtn lnav__burger" id="burger" aria-label="Menú">${I.menu}</button>
      </div>
    </nav>`;
  }

  /* ============================================================
     LANDING
     ============================================================ */
  function landing() {
    const feats = [
      ["camera", "CCTV & Video Vigilancia", "Gestiona instalaciones, mantenimientos y monitoreo de cámaras IP, NVR y DVR desde un solo panel.", "col-3"],
      ["ai", "ENYA AI", "Inteligencia operativa que predice ventas, detecta cartera en riesgo y optimiza rutas de tus cuadrillas.", "col-3"],
      ["crm", "CRM & Cotizaciones", "Pipeline visual, prospectos y cotizaciones profesionales con IVA, firma y envío por WhatsApp.", "col-2"],
      ["orders", "Operación en Campo", "Órdenes de trabajo, checklists, evidencias y firma digital del cliente en la app del técnico.", "col-2"],
      ["collect", "Finanzas & Cobranza", "Facturación, contratos y recuperación de cartera con antigüedad de saldos y recordatorios.", "col-2"],
    ];
    const mods = [["dashboard", "Dashboard"], ["crm", "CRM"], ["clients", "Clientes"], ["quote", "Cotizaciones"], ["projects", "Proyectos"], ["orders", "Órdenes"], ["field", "App de Campo"], ["inventory", "Inventario"], ["techs", "Técnicos"], ["map", "Mapa"], ["billing", "Facturación"], ["collect", "Cobranza"], ["contracts", "Contratos"], ["reports", "Reportes"], ["branch", "Multisucursal"], ["portal", "Portal Cliente"]];
    const stats = [["19", "Módulos integrados"], ["1,500+", "Clientes gestionados"], ["100%", "Visual · navegable"], ["24/7", "Operación segura"]];

    const node = el(`<div class="site">
      ${cine()}
      <div class="site__wrap">
        ${topnav("welcome")}

        <!-- HERO -->
        <header class="hero">
          <div class="reveal in hero__badge"><span class="dot-pulse"></span> Plataforma SaaS para empresas de seguridad electrónica</div>
          <h1 class="reveal in d1">Controla toda tu operación de <span class="grad">seguridad</span> desde un solo lugar</h1>
          <p class="lead reveal in d2">CCTV, alarmas, cercado eléctrico, control de acceso, portones, redes y servicios en campo. Comercial, operación, finanzas e inteligencia — en una app premium para celular y computadora.</p>
          <div class="hero__cta reveal in d3">
            <button class="lbtn lbtn--primary lbtn--lg" onclick="location.hash='#/registro'">${I.ai} Crear cuenta gratis</button>
            <button class="lbtn lbtn--lg" id="demoEnter">${I.dashboard} Entrar al demo</button>
          </div>
          <div class="hero__note reveal in d4">Sin tarjeta · Demo visual · <b>Instálala como app</b> en tu teléfono</div>
        </header>

        <!-- SHOWCASE -->
        <div class="showcase reveal d1">
          <div class="showcase__frame">
            <div class="showcase__bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i><span class="u">app.enyaops.mx/dashboard</span></div>
            <div class="showcase__img" id="shotDesk"></div>
          </div>
          <div class="float-phone"><div id="shotPhone"></div></div>
          <div class="showcase__glow"></div>
        </div>

        <!-- TRUST -->
        <section class="trust reveal">
          <p>Diseñado con estándares de los mejores equipos de producto</p>
          <div class="trust__row">
            <span class="t">${I.shield} Apple HIG</span><span class="t">${I.projects} Linear</span>
            <span class="t">${I.billing} Stripe</span><span class="t">${I.dashboard} Notion</span><span class="t">${I.up} Vercel</span>
          </div>
        </section>

        <!-- FEATURES -->
        <section class="section-l">
          <div class="center" style="max-width:720px">
            <span class="eyebrow reveal">Todo en una plataforma</span>
            <h2 class="reveal d1">Una sola herramienta para vender, instalar y cobrar</h2>
            <p class="sub reveal d2">Reemplaza hojas de cálculo, chats sueltos y sistemas desconectados con un flujo end-to-end: del prospecto a la firma del cliente.</p>
          </div>
          <div class="bento">
            ${feats.map((f, i) => `<div class="feat ${f[3]} reveal d${(i % 4) + 1}"><div class="feat__glow"></div><div class="feat__ic">${I[f[0]]}</div><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join("")}
            <div class="feat col-6 reveal" style="display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap">
              <div><h3 style="font-size:20px">Multisucursal & Portal del Cliente</h3><p>Compara Chetumal, Cancún y Playa del Carmen en tiempo real, y dale a tus clientes un portal con sus proyectos, facturas y evidencias.</p></div>
              <button class="lbtn lbtn--primary" onclick="location.hash='#/registro'">Empezar ahora →</button>
            </div>
          </div>
        </section>

        <!-- MODULES -->
        <section class="section-l center" style="padding-top:0">
          <span class="eyebrow reveal">19 módulos</span>
          <h2 class="reveal d1">Cubre toda tu empresa</h2>
          <div class="mods">
            ${mods.map((m, i) => `<span class="chip reveal d${(i % 4) + 1}">${I[m[0]]} ${m[1]}</span>`).join("")}
          </div>
        </section>

        <!-- SPLIT: app móvil -->
        <section class="section-l">
          <div class="split">
            <div>
              <span class="eyebrow reveal">App de Campo (PWA)</span>
              <h2 class="reveal d1">Tus técnicos, conectados desde el celular</h2>
              <p class="sub reveal d2">Una PWA instalable que funciona incluso sin señal. Tus cuadrillas reciben órdenes, completan checklists, suben evidencias y capturan la firma del cliente.</p>
              <div class="split__list">
                ${[["Mis órdenes del día con prioridad y mapa", 1], ["Checklists por tipo de instalación", 2], ["Evidencias fotográficas y firma digital", 3], ["Funciona offline y se instala como app", 4]].map(x => `<div class="split__item reveal d${x[1]}"><span class="ck">${I.check}</span><div><h4>${x[0]}</h4></div></div>`).join("")}
              </div>
              <div style="margin-top:28px" class="reveal"><a class="lbtn lbtn--primary lbtn--lg" href="tecnico/index.html">${I.field} Abrir App Técnico</a></div>
            </div>
            <div class="split__visual reveal d2">
              <div class="showcase__frame" style="transform:none;max-width:300px;margin:0 auto;border-radius:30px">
                <div id="shotPhone2"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- STATS -->
        <section class="section-l" style="padding-top:0">
          <div class="stats">
            ${stats.map((s, i) => `<div class="stat-l reveal d${i + 1}"><div class="n">${s[0]}</div><div class="l">${s[1]}</div></div>`).join("")}
          </div>
        </section>

        <!-- CTA -->
        <section class="cta-band reveal">
          <h2>Lleva tu empresa de seguridad al siguiente nivel</h2>
          <p>Crea tu cuenta en segundos y explora un demo que se ve y se siente como un producto de más de USD $100,000.</p>
          <div class="hero__cta">
            <button class="lbtn lbtn--primary lbtn--lg" onclick="location.hash='#/registro'">Crear cuenta gratis</button>
            <button class="lbtn lbtn--ghost lbtn--lg" onclick="location.hash='#/login'">Ya tengo cuenta</button>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="lfoot">
          <div class="lfoot__grid">
            <div><div class="lnav__brand">${D.logoMark(30)}<div>ENYA OPS</div></div><small style="display:block;margin-top:10px">© 2026 ENYA OPS · Demo visual. Datos ficticios.</small></div>
            <div class="lfoot__links">
              <a href="#/registro">Crear cuenta</a><a href="#/login">Iniciar sesión</a><a href="tecnico/index.html">App Técnico</a><a href="#/welcome">Producto</a>
            </div>
          </div>
        </footer>
      </div>
    </div>`);

    // Mockups (render reales del panel/app en miniatura)
    node.querySelector("#shotDesk").appendChild(deskMock());
    node.querySelector("#shotPhone").appendChild(phoneMock());
    node.querySelector("#shotPhone2").appendChild(phoneMock(true));

    node.querySelector("#demoEnter").addEventListener("click", enter);
    initSite(node);
    return node;
  }

  /* ---------- Mockups visuales (SVG/HTML ligero) ---------- */
  function deskMock() {
    return el(`<div style="background:#0a1020;padding:18px;display:grid;grid-template-columns:140px 1fr;gap:14px;min-height:300px">
      <div style="background:#0d1426;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:14px;color:#8fb6ff;font-weight:700;font-size:12px">${D.logoMark(20)} ENYA</div>
        ${["Dashboard", "CRM", "Proyectos", "Órdenes", "Cobranza"].map((t, i) => `<div style="padding:7px 9px;border-radius:8px;margin-bottom:4px;font-size:11px;${i === 0 ? "background:#2563EB;color:#fff" : "color:#9fb0d6"}">${t}</div>`).join("")}
      </div>
      <div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
          ${[["Ventas", "#2563EB"], ["Cotiz.", "#0EA5E9"], ["Proyectos", "#8B5CF6"], ["Cobranza", "#EF4444"]].map(k => `<div style="background:#0d1426;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:11px"><div style="font-size:9px;color:#6b7aa3">${k[0]}</div><div style="font-size:17px;font-weight:800;color:#fff">$${(Math.random() * 9 + 1).toFixed(1)}M</div><div style="height:3px;background:${k[1]};border-radius:9px;margin-top:7px;width:${40 + Math.random() * 50}%"></div></div>`).join("")}
        </div>
        <div style="background:#0d1426;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:14px;height:150px;display:flex;align-items:flex-end;gap:8px">
          ${Array.from({ length: 12 }).map(() => `<div style="flex:1;border-radius:5px 5px 0 0;background:linear-gradient(180deg,#2563EB,#0EA5E9);height:${20 + Math.random() * 100}px"></div>`).join("")}
        </div>
      </div>
    </div>`);
  }
  function phoneMock(compact) {
    return el(`<div style="background:#faf8ff;min-height:${compact ? 420 : 360}px;font-family:Inter">
      <div style="background:linear-gradient(135deg,#2563EB,#0EA5E9);padding:18px 16px;color:#fff">
        <div style="font-size:11px;opacity:.85">Hola, Carlos 👋</div>
        <div style="font-size:18px;font-weight:800">Dashboard</div>
      </div>
      <div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${[["Asignadas", "12", "#2563EB"], ["Pendientes", "05", "#F59E0B"]].map(k => `<div style="background:#fff;border:1px solid #e7e7f3;border-radius:12px;padding:11px"><div style="font-size:9px;color:#737686;text-transform:uppercase">${k[0]}</div><div style="font-size:22px;font-weight:800;color:${k[2]}">${k[1]}</div></div>`).join("")}
        <div style="grid-column:span 2;background:#2563eb;color:#fff;border-radius:12px;padding:13px"><div style="font-size:9px;opacity:.8;text-transform:uppercase">Completadas hoy</div><div style="font-size:30px;font-weight:800">08<span style="font-size:12px;opacity:.7"> / 12</span></div></div>
        <div style="grid-column:span 2;background:#fff;border:1px solid #e7e7f3;border-radius:12px;padding:12px">
          <div style="font-size:11px;font-weight:700;color:#191b23">Siguiente: Mantenimiento CCTV</div>
          <div style="font-size:10px;color:#737686;margin-top:3px">📍 Corporativo TechTower · 14:30</div>
          <div style="margin-top:10px;background:#2563eb;color:#fff;border-radius:8px;text-align:center;font-size:11px;font-weight:700;padding:8px">Navegar al sitio</div>
        </div>
      </div>
    </div>`);
  }

  /* ============================================================
     REGISTRO
     ============================================================ */
  function registro() {
    const node = el(`<div class="site"><div class="cine"><div class="cine__aurora"></div><div class="cine__grid"></div></div>
      <div class="auth">
        <aside class="auth__aside">
          <div class="lnav__brand">${D.logoMark(34)}<div>ENYA OPS<div class="sub">Energización y Aplicaciones de Seguridad</div></div></div>
          <div>
            <h2>Empieza a controlar tu <span class="grad">operación de seguridad</span> hoy</h2>
            <p>Crea tu cuenta y obtén acceso inmediato a un demo completo: comercial, operación de campo, finanzas e inteligencia con ENYA AI.</p>
            <div class="auth__points">
              ${["Configura tu empresa en minutos", "Invita a tu equipo y técnicos", "App instalable para celular y compu", "Datos de demostración listos para explorar"].map(p => `<div class="p"><span class="ck">${I.check}</span>${p}</div>`).join("")}
            </div>
          </div>
          <div style="display:flex;gap:10px;color:#6b7aa3;font-size:12.5px;align-items:center">${I.lock} Demo visual · sin backend · datos ficticios</div>
        </aside>

        <main class="auth__main">
          <div class="auth__card">
            <span class="back" onclick="location.hash='#/welcome'">${arrow()} Volver al inicio</span>
            <div class="auth__steps"><span class="s on" id="st1"></span><span class="s" id="st2"></span></div>
            <h1 id="rTitle">Crea tu cuenta</h1>
            <p class="muted" id="rSub">Paso 1 de 2 · Tus datos de acceso</p>

            <form id="regForm">
              <div id="step1">
                <div class="fld"><label>Nombre completo</label><div class="inp">${I.clients}<input name="name" placeholder="José Luis de la Torre" required></div></div>
                <div class="fld"><label>Correo corporativo</label><div class="inp">${I.mail}<input type="email" name="email" placeholder="tu@empresa.mx" value="${(global.__enyaEmail || "")}" required></div></div>
                <div class="fld"><label>Contraseña</label><div class="inp">${I.lock}<input type="password" name="pass" id="pass" placeholder="Mínimo 8 caracteres" required>
                  <span class="eye" id="eye">${I.install}</span></div>
                  <div class="strength"><i id="bar"></i></div>
                </div>
                <button type="button" class="lbtn lbtn--primary lbtn--lg" style="width:100%;margin-top:6px" id="next">Continuar</button>
                <div class="auth__sep">o regístrate con</div>
                <div class="auth__alt">
                  <button type="button" class="lbtn" id="gReg"><span style="width:16px;height:16px;display:inline-flex">${I.google}</span> Google</button>
                  <button type="button" class="lbtn" id="demoReg">${I.ai} Demo Access</button>
                </div>
              </div>

              <div id="step2" style="display:none">
                <div class="fld"><label>Nombre de la empresa</label><div class="inp">${I.branch}<input name="company" placeholder="ENYA Seguridad S.A. de C.V." required></div></div>
                <div class="row-2">
                  <div class="fld"><label>Sucursal principal</label><div class="inp">${I.pin}<select name="branch"><option>Cancún</option><option>Chetumal</option><option>Playa del Carmen</option></select></div></div>
                  <div class="fld"><label>Tamaño de equipo</label><div class="inp">${I.techs}<select name="size"><option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option></select></div></div>
                </div>
                <div class="fld"><label>Giro principal</label><div class="inp">${I.shield}<select name="giro"><option>CCTV & Video Vigilancia</option><option>Alarmas</option><option>Control de Acceso</option><option>Cercado Eléctrico</option><option>Redes & Cableado</option><option>Integral / Multiservicio</option></select></div></div>
                <label class="check-line"><input type="checkbox" checked> Acepto los Términos y el Aviso de Privacidad (demo).</label>
                <button type="submit" class="lbtn lbtn--primary lbtn--lg" style="width:100%">Crear cuenta y entrar →</button>
                <button type="button" class="lbtn lbtn--ghost" style="width:100%;margin-top:10px" id="back2">← Regresar</button>
              </div>
            </form>

            <div class="auth__foot">¿Ya tienes cuenta? <a onclick="location.hash='#/login'">Inicia sesión</a></div>
          </div>
        </main>
      </div>
    </div>`);

    // Lógica de pasos
    const f = node.querySelector("#regForm");
    const step1 = node.querySelector("#step1"), step2 = node.querySelector("#step2");
    node.querySelector("#next").addEventListener("click", () => {
      const name = f.name.value.trim(), email = f.email.value.trim(), pass = f.pass.value;
      if (!name || !email || pass.length < 8) { flash(node, "Completa nombre, correo y una contraseña de 8+ caracteres."); return; }
      step1.style.display = "none"; step2.style.display = "block";
      node.querySelector("#st2").classList.add("on");
      node.querySelector("#rTitle").textContent = "Cuéntanos de tu empresa";
      node.querySelector("#rSub").textContent = "Paso 2 de 2 · Configuración inicial";
    });
    node.querySelector("#back2").addEventListener("click", () => {
      step2.style.display = "none"; step1.style.display = "block";
      node.querySelector("#st2").classList.remove("on");
      node.querySelector("#rTitle").textContent = "Crea tu cuenta";
      node.querySelector("#rSub").textContent = "Paso 1 de 2 · Tus datos de acceso";
    });
    f.addEventListener("submit", (e) => { e.preventDefault(); enter(); });
    node.querySelector("#gReg").addEventListener("click", enter);
    node.querySelector("#demoReg").addEventListener("click", enter);

    // Fortaleza de contraseña + mostrar/ocultar
    const pass = node.querySelector("#pass"), bar = node.querySelector("#bar");
    pass.addEventListener("input", () => {
      const v = pass.value; let s = 0;
      if (v.length >= 8) s++; if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
      const w = [0, 30, 55, 80, 100][s], col = ["#EF4444", "#EF4444", "#F59E0B", "#0EA5E9", "#22C55E"][s];
      bar.style.width = w + "%"; bar.style.background = col;
    });
    node.querySelector("#eye").addEventListener("click", () => { pass.type = pass.type === "password" ? "text" : "password"; });

    initSite(node);
    return node;
  }

  /* ============================================================
     LOGIN
     ============================================================ */
  function login() {
    const node = el(`<div class="site"><div class="cine"><div class="cine__aurora"></div><div class="cine__grid"></div></div>
      <div class="auth">
        <aside class="auth__aside">
          <div class="lnav__brand">${D.logoMark(34)}<div>ENYA OPS<div class="sub">Energización y Aplicaciones de Seguridad</div></div></div>
          <div>
            <h2>Bienvenido de nuevo a <span class="grad">ENYA OPS</span></h2>
            <p>Tu centro de comando para CCTV, alarmas, control de acceso, proyectos, técnicos en campo y cobranza.</p>
            <div class="auth__points">
              ${["Operación en tiempo real", "ENYA AI con insights del día", "App instalable en cualquier dispositivo"].map(p => `<div class="p"><span class="ck">${I.check}</span>${p}</div>`).join("")}
            </div>
          </div>
          <div style="display:flex;gap:10px;color:#6b7aa3;font-size:12.5px;align-items:center">${I.lock} Demo visual · sin backend</div>
        </aside>
        <main class="auth__main">
          <div class="auth__card">
            <span class="back" onclick="location.hash='#/welcome'">${arrow()} Volver al inicio</span>
            <h1>Iniciar sesión</h1>
            <p class="muted">Accede al panel de control de tu empresa.</p>
            <form id="logForm">
              <div class="fld"><label>Correo electrónico</label><div class="inp">${I.mail}<input type="email" name="email" value="director@enyaops.mx" required></div></div>
              <div class="fld"><label>Contraseña</label><div class="inp">${I.lock}<input type="password" name="pass" value="demo1234" id="lpass" required><span class="eye" id="leye">${I.install}</span></div></div>
              <label class="check-line"><input type="checkbox" checked> Mantener sesión iniciada</label>
              <button type="submit" class="lbtn lbtn--primary lbtn--lg" style="width:100%">Entrar al panel</button>
              <div class="auth__sep">o continúa con</div>
              <div class="auth__alt">
                <button type="button" class="lbtn" id="gLog"><span style="width:16px;height:16px;display:inline-flex">${I.google}</span> Google</button>
                <button type="button" class="lbtn" id="demoLog">${I.ai} Demo Access</button>
              </div>
            </form>
            <div class="auth__foot">¿No tienes cuenta? <a onclick="location.hash='#/registro'">Crea una gratis</a></div>
          </div>
        </main>
      </div>
    </div>`);
    node.querySelector("#logForm").addEventListener("submit", (e) => { e.preventDefault(); enter(); });
    node.querySelector("#gLog").addEventListener("click", enter);
    node.querySelector("#demoLog").addEventListener("click", enter);
    node.querySelector("#leye").addEventListener("click", () => { const p = node.querySelector("#lpass"); p.type = p.type === "password" ? "text" : "password"; });
    initSite(node);
    return node;
  }

  /* ---------- helpers ---------- */
  function arrow() { return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'; }

  function flash(node, msg) {
    let f = node.querySelector(".flash");
    if (!f) { f = el(`<div class="flash" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);color:#fca5a5;padding:11px 14px;border-radius:11px;font-size:13px;margin-bottom:14px"></div>`); node.querySelector("#step1").prepend(f); }
    f.textContent = msg;
  }

  /* Animaciones de reveal + nav móvil + parallax del fondo */
  function initSite(node) {
    requestAnimationFrame(() => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: .12 });
      node.querySelectorAll(".reveal:not(.in)").forEach(r => io.observe(r));
    });
    const burger = node.querySelector("#burger");
    if (burger) burger.addEventListener("click", () => node.querySelector("#lnav").classList.toggle("open"));
    // Parallax sutil del aurora/grid con el mouse
    const cineEl = node.querySelector(".cine");
    if (cineEl && window.matchMedia("(pointer:fine)").matches) {
      node.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - .5), y = (e.clientY / window.innerHeight - .5);
        const a = cineEl.querySelector(".cine__aurora"); if (a) a.style.transform = `translate(${x * 24}px, ${y * 24}px)`;
      });
    }
  }

  global.PUBLIC = { landing, registro, login };
})(window);
