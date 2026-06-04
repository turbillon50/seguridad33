/* ============================================================
   ENYA OPS — Renderizadores de módulos (vistas)
   Cada función devuelve HTML. Las que usan charts/listeners
   exponen un .mount(root) opcional vía objeto { html, mount }.
   ============================================================ */
(function (global) {
  "use strict";
  const D = global.ENYA, U = global.UI, I = D.I;
  const M = {};

  /* ============== DASHBOARD ============== */
  M.dashboard = () => ({
    html: `
      ${U.pageHead("Dashboard", "Resumen operativo de toda tu empresa en tiempo real.",
        `<button class="btn btn--sm">Junio 2026</button><button class="btn btn--primary btn--sm">${I.plus} Nuevo</button>`)}
      <div class="cards-kpi">${D.kpis.map(U.kpiCard).join("")}</div>

      <div class="section grid-23">
        <div class="card chart-card">
          <h3>Ventas vs Meta</h3><p class="muted">Ingresos mensuales (millones MXN)</p>
          <div class="chart-wrap"><canvas id="cVentas"></canvas></div>
        </div>
        <div class="ai-card">
          <div class="ai-head"><div class="ai-orb">${I.ai}</div><div><h3>ENYA AI</h3><div class="muted">Inteligencia operativa · en vivo</div></div></div>
          ${D.aiInsights.slice(0, 3).map(a => `<div class="ai-insight"><span class="ai-i ${a.tint}">${I[a.icon]}</span><p>${a.text}</p></div>`).join("")}
          <div class="ai-input"><input placeholder="Pregúntale a ENYA AI…"><button class="btn btn--grad btn--sm">Enviar</button></div>
        </div>
      </div>

      <div class="section grid-3">
        <div class="card chart-card"><h3>Cobranza</h3><p class="muted">Pendiente vs recuperada</p><div class="chart-wrap sm"><canvas id="cCob"></canvas></div></div>
        <div class="card chart-card"><h3>Conversión Comercial</h3><p class="muted">Tasa de cierre (%)</p><div class="chart-wrap sm"><canvas id="cConv"></canvas></div></div>
        <div class="card chart-card"><h3>Instalaciones</h3><p class="muted">Terminadas por mes</p><div class="chart-wrap sm"><canvas id="cInst"></canvas></div></div>
      </div>

      <div class="section grid-2">
        <div class="card chart-card"><h3>Proyectos por estado</h3><p class="muted">Pipeline de ejecución</p><div class="chart-wrap"><canvas id="cPry"></canvas></div></div>
        <div class="card chart-card"><h3>Rentabilidad</h3><p class="muted">Margen operativo (%)</p><div class="chart-wrap"><canvas id="cRent"></canvas></div></div>
      </div>`,
    mount() {
      const s = D.series;
      U.mkChart("cVentas", {
        type: "line",
        data: { labels: s.meses, datasets: [
          { label: "Ventas", data: s.ventas, borderColor: "#2563EB", backgroundColor: (c) => U.grad(c.chart.ctx, "#2563EB"), fill: true, tension: .4, borderWidth: 3, pointRadius: 0 },
          { label: "Meta", data: s.meta, borderColor: "#94A3B8", borderDash: [6, 6], fill: false, tension: .4, borderWidth: 2, pointRadius: 0 },
        ]},
        options: { scales: { y: { beginAtZero: true }, x: {} } },
      });
      U.mkChart("cCob", {
        type: "bar",
        data: { labels: s.meses, datasets: [
          { label: "Pendiente", data: s.cobranza, backgroundColor: "#EF4444", borderRadius: 6, barThickness: 12 },
          { label: "Recuperada", data: s.recuperada, backgroundColor: "#22C55E", borderRadius: 6, barThickness: 12 },
        ]},
        options: { scales: { y: { beginAtZero: true }, x: {} } },
      });
      U.mkChart("cConv", {
        type: "line",
        data: { labels: s.meses, datasets: [{ label: "Conversión", data: s.conversion, borderColor: "#0EA5E9", backgroundColor: (c) => U.grad(c.chart.ctx, "#0EA5E9"), fill: true, tension: .4, borderWidth: 3, pointRadius: 0 }] },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: {} } },
      });
      U.mkChart("cInst", {
        type: "bar",
        data: { labels: s.meses, datasets: [{ label: "Instalaciones", data: s.instalaciones, backgroundColor: "#8B5CF6", borderRadius: 6, barThickness: 18 }] },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: {} } },
      });
      U.mkChart("cPry", {
        type: "doughnut",
        data: { labels: ["Prospección", "Cotizado", "Aprobado", "Programado", "En ejecución", "Finalizado"], datasets: [{ data: s.pipeline, backgroundColor: ["#94A3B8", "#F59E0B", "#8B5CF6", "#0EA5E9", "#2563EB", "#22C55E"], borderWidth: 0 }] },
        options: { cutout: "62%", plugins: { legend: { position: "right" } } },
      });
      U.mkChart("cRent", {
        type: "line",
        data: { labels: s.meses, datasets: [{ label: "Margen %", data: s.rentabilidad, borderColor: "#22C55E", backgroundColor: (c) => U.grad(c.chart.ctx, "#22C55E"), fill: true, tension: .4, borderWidth: 3, pointRadius: 4, pointBackgroundColor: "#22C55E" }] },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false }, x: {} } },
      });
    },
  });

  /* ============== CRM (pipeline) ============== */
  M.crm = () => {
    const etapas = [
      { name: "Lead Nuevo", color: "#94A3B8" }, { name: "Contactado", color: "#0EA5E9" },
      { name: "Cotización", color: "#F59E0B" }, { name: "Negociación", color: "#2563EB" },
      { name: "Ganado", color: "#22C55E" }, { name: "Perdido", color: "#EF4444" },
    ];
    const byStage = (st) => D.prospectos.filter(p => p.stage === st);
    return {
      html: `
        ${U.pageHead("CRM · Pipeline Comercial", "Arrastra oportunidades entre etapas. Datos de demostración.",
          `<button class="btn btn--sm">Tablero</button><button class="btn btn--primary btn--sm">${I.plus} Oportunidad</button>`)}
        <div class="kanban">
          ${etapas.map(e => {
            const items = byStage(e.name);
            const total = items.reduce((a, b) => a + b.value, 0);
            return `<div class="kcol">
              <div class="kcol__head"><span><span class="kcol__dot" style="background:${e.color}"></span>${e.name}</span><span class="kcol__count">${items.length}</span></div>
              <div class="tag-soft" style="margin-bottom:10px">${D.money(total)}</div>
              ${items.slice(0, 6).map(p => `<div class="kcard">
                <div class="kcard__title">${p.company}</div>
                <div class="tag-soft">${p.interest} · ${p.origin}</div>
                <div class="kcard__meta">${U.avatar(p.owner)}<span class="kcard__val">${D.money(p.value)}</span></div>
              </div>`).join("")}
            </div>`;
          }).join("")}
        </div>`,
    };
  };

  /* ============== PROSPECTOS ============== */
  M.prospectos = () => ({
    html: `
      ${U.pageHead("Prospectos", `${D.counts.prospectos} prospectos activos en seguimiento.`,
        `<button class="btn btn--primary btn--sm">${I.plus} Prospecto</button>`)}
      ${U.toolbar("Buscar prospecto, empresa, origen…")}
      ${U.table(["Nombre", "Empresa", "Teléfono", "Correo", "Origen", "Interés", "Valor Potencial", "Estado"],
        D.prospectos.map(p => [
          U.cellUser(p.name), p.company, p.phone, p.email, `<span class="tag-soft">${p.origin}</span>`,
          `<span class="pill pill--blue">${p.interest}</span>`, `<span class="strong">${D.money(p.value)}</span>`, U.pill(p.stage),
        ]))}`,
  });

  /* ============== CLIENTES (enterprise + detail) ============== */
  M.clientes = () => {
    let sel = 0;
    const list = D.clientes;
    function detail(c) {
      return `
        <div class="card card--pad">
          <div class="detail-head">
            <span class="av-lg" style="background:${D.colorFor(c.name)}">${D.initials(c.name)}</span>
            <div><h2 style="margin:0 0 4px">${c.name}</h2><div class="tag-soft">${c.id} · ${c.contact} · ${c.branch}</div></div>
            <div style="margin-left:auto;display:flex;gap:8px">${U.pill(c.status)}<button class="btn btn--sm">${I.wa} WhatsApp</button></div>
          </div>
          <div class="tabs"><span class="tab active">Resumen</span><span class="tab">Contratos</span><span class="tab">Equipos</span><span class="tab">Facturas</span><span class="tab">Historial</span></div>
          <div class="grid-3">
            <div class="card card--pad"><div class="kpi__label">Valor de vida (LTV)</div><div class="kpi__value">${D.money(c.ltv)}</div></div>
            <div class="card card--pad"><div class="kpi__label">Saldo pendiente</div><div class="kpi__value" style="color:${c.pending ? "var(--red)" : "var(--green)"}">${D.money(c.pending)}</div></div>
            <div class="card card--pad"><div class="kpi__label">Equipos instalados</div><div class="kpi__value">${c.equipos}</div></div>
          </div>
          <div class="section grid-2">
            <div class="card card--pad">
              <h3 style="margin-top:0">Información</h3>
              <dl class="kv">
                <dt>Contacto</dt><dd>${c.contact}</dd>
                <dt>Teléfono</dt><dd>${c.phone}</dd>
                <dt>Correo</dt><dd>${c.email}</dd>
                <dt>Sucursal</dt><dd>${c.branch}</dd>
                <dt>Cliente desde</dt><dd>${c.since}</dd>
                <dt>Contratos</dt><dd>${c.contracts} vigentes</dd>
              </dl>
            </div>
            <div class="card card--pad">
              <h3 style="margin-top:0">Servicios contratados</h3>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px">${c.services.map(s => `<span class="pill pill--cyan">${s}</span>`).join("")}</div>
              <h3>Equipos instalados</h3>
              <div class="check done"><span class="check__box">${I.check}</span><span>CCTV · ${D.rand(4, 24)} cámaras operativas</span></div>
              <div class="check"><span class="check__box"></span><span>Mantenimiento preventivo programado</span></div>
              <div class="check done"><span class="check__box">${I.check}</span><span>Control de acceso activo</span></div>
            </div>
          </div>
        </div>`;
    }
    return {
      html: `
        ${U.pageHead("Clientes", `${D.counts.clientes.toLocaleString("es-MX")} clientes · vista enterprise 360°.`,
          `<button class="btn btn--primary btn--sm">${I.plus} Cliente</button>`)}
        <div class="entity">
          <div class="card list-pane" id="cliList">
            ${list.map((c, i) => `<div class="list-row ${i === 0 ? "active" : ""}" data-i="${i}">
              ${U.avatar(c.name)}<div><div class="list-row__name">${c.name}</div><div class="list-row__sub">${c.branch} · ${D.money(c.ltv)}</div></div>
            </div>`).join("")}
          </div>
          <div id="cliDetail">${detail(list[0])}</div>
        </div>`,
      mount(root) {
        const listEl = root.querySelector("#cliList");
        const det = root.querySelector("#cliDetail");
        listEl.addEventListener("click", (e) => {
          const row = e.target.closest(".list-row"); if (!row) return;
          listEl.querySelectorAll(".list-row").forEach(r => r.classList.remove("active"));
          row.classList.add("active");
          det.innerHTML = detail(list[+row.dataset.i]);
        });
      },
    };
  };

  /* ============== COTIZACIONES (generador) ============== */
  M.cotizaciones = () => {
    const items = [
      { d: "Cámara Domo IP 4MP Hikvision", q: 8, p: 1850 },
      { d: "NVR 16CH PoE 8MP", q: 1, p: 9200 },
      { d: "Cable UTP Cat6 (rollo 305m)", q: 2, p: 2400 },
      { d: "Instalación y configuración (mano de obra)", q: 1, p: 14500 },
      { d: "Disco duro vigilancia 4TB", q: 2, p: 2890 },
    ];
    const sub = items.reduce((a, b) => a + b.q * b.p, 0);
    const iva = sub * 0.16, total = sub + iva;
    return {
      html: `
        ${U.pageHead("Cotizaciones", "Generador profesional · vista previa del documento.",
          `<button class="btn btn--sm">${I.pdf} PDF</button><button class="btn btn--sm">${I.wa} WhatsApp</button><button class="btn btn--sm">${I.mail} Correo</button><button class="btn btn--primary btn--sm">Guardar y enviar</button>`)}
        <div class="quote-grid">
          <div class="card card--pad">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">
              <div style="display:flex;gap:12px;align-items:center">${D.logoMark(40)}<div><b style="font-size:18px">ENYA OPS</b><div class="tag-soft">Cotización COT-2026-0481</div></div></div>
              <div style="text-align:right" class="tag-soft">Fecha: 04/06/2026<br>Vigencia: 15 días</div>
            </div>
            <div class="grid-2" style="margin-bottom:18px">
              <div class="card card--pad"><div class="kpi__label">Cliente</div><b>Hotel Riviera Maya</b><div class="tag-soft">Att. Ana Sofía Rivas · 998 123 4567</div></div>
              <div class="card card--pad"><div class="kpi__label">Proyecto</div><b>Sistema CCTV 8 cámaras</b><div class="tag-soft">Sucursal Cancún · Q. Roo</div></div>
            </div>
            <div class="line-item" style="font-weight:700;color:var(--text-mute);font-size:11.5px;text-transform:uppercase"><span>Concepto</span><span>Cant.</span><span>P. Unit.</span><span>Importe</span><span></span></div>
            ${items.map(it => `<div class="line-item">
              <input value="${it.d}"><input value="${it.q}"><input value="$${it.p.toLocaleString("es-MX")}"><span class="strong">${D.money(it.q * it.p)}</span><button class="icon-btn btn--sm" style="width:30px;height:30px;border:none">✕</button>
            </div>`).join("")}
            <button class="btn btn--ghost btn--sm" style="margin-top:12px">${I.plus} Agregar concepto</button>
            <div class="sign-pad" style="margin-top:20px;height:70px">Firma del cliente</div>
          </div>
          <div>
            <div class="card card--pad">
              <h3 style="margin-top:0">Resumen</h3>
              <div class="totals">
                <div class="row"><span>Subtotal</span><span>${D.money(sub)}</span></div>
                <div class="row"><span>IVA (16%)</span><span>${D.money(iva)}</span></div>
                <div class="row grand"><span>Total</span><span>${D.money(total)}</span></div>
              </div>
            </div>
            <div class="card card--pad" style="margin-top:18px">
              <h3 style="margin-top:0">Acciones</h3>
              <button class="btn btn--grad btn--block" style="margin-bottom:10px">${I.wa} Enviar por WhatsApp</button>
              <button class="btn btn--block" style="margin-bottom:10px">${I.mail} Enviar por correo</button>
              <button class="btn btn--block">${I.pdf} Descargar PDF</button>
            </div>
          </div>
        </div>`,
    };
  };

  /* ============== PROYECTOS (board + detail) ============== */
  M.proyectos = () => {
    const estados = ["Prospección", "Cotizado", "Aprobado", "Programado", "En ejecución", "Finalizado"];
    return {
      html: `
        ${U.pageHead("Proyectos", `${D.counts.proyectos} proyectos · seguimiento de ejecución.`,
          `<button class="btn btn--sm">Tablero</button><button class="btn btn--primary btn--sm">${I.plus} Proyecto</button>`)}
        <div class="kanban">
          ${estados.map(st => {
            const items = D.proyectos.filter(p => p.status === st);
            return `<div class="kcol">
              <div class="kcol__head"><span>${st}</span><span class="kcol__count">${items.length}</span></div>
              ${items.slice(0, 5).map(p => `<div class="kcard">
                <div class="kcard__title">${p.name}</div>
                <div class="tag-soft">${p.client}</div>
                <div style="margin:10px 0">${U.progress(p.progress)}</div>
                <div class="kcard__meta">${U.avatar(p.manager)}<span class="kcard__val">${D.money(p.value)}</span></div>
              </div>`).join("") || `<div class="empty" style="padding:20px;font-size:12px">Sin proyectos</div>`}
            </div>`;
          }).join("")}
        </div>

        <div class="section">
          ${U.sectionHead("Proyecto destacado · Instalación CCTV — Hotel Riviera Maya", "Sucursal Cancún · 68% completado")}
          <div class="grid-23">
            <div class="card card--pad">
              <h3 style="margin-top:0">Timeline del proyecto</h3>
              <div class="timeline">
                <div class="tl-item done"><h4>Levantamiento técnico</h4><div class="muted">12 May · Carlos Méndez</div></div>
                <div class="tl-item done"><h4>Cotización aprobada</h4><div class="muted">18 May · $284,500</div></div>
                <div class="tl-item done"><h4>Programación y materiales</h4><div class="muted">24 May · Almacén Cancún</div></div>
                <div class="tl-item active"><h4>Instalación en sitio (en curso)</h4><div class="muted">02 Jun · Cuadrilla Alfa · 68%</div></div>
                <div class="tl-item"><h4>Pruebas y entrega</h4><div class="muted">Programado 08 Jun</div></div>
                <div class="tl-item"><h4>Firma de conformidad</h4><div class="muted">Pendiente</div></div>
              </div>
            </div>
            <div>
              <div class="card card--pad"><h3 style="margin-top:0">Responsables</h3>
                <div class="check"><span>${U.avatar("Carlos Méndez")}</span><span style="margin-left:4px">Carlos Méndez · Líder</span></div>
                <div class="check"><span>${U.avatar("Laura Canché")}</span><span style="margin-left:4px">Laura Canché · Redes</span></div>
                <div class="check" style="border:none"><span>${U.avatar("José Luis Pat")}</span><span style="margin-left:4px">José Luis Pat · Apoyo</span></div>
              </div>
              <div class="card card--pad" style="margin-top:18px"><h3 style="margin-top:0">Evidencias</h3>
                <div class="gallery">
                  <div class="gphoto">${I.image}</div><div class="gphoto">${I.image}</div><div class="gphoto">${I.video}</div>
                  <div class="gphoto">${I.image}</div><div class="gphoto">${I.pdf}</div><div class="gphoto">${I.image}</div>
                </div>
              </div>
            </div>
          </div>
        </div>`,
    };
  };

  /* ============== ÓRDENES DE TRABAJO ============== */
  M.ordenes = () => ({
    html: `
      ${U.pageHead("Órdenes de Trabajo", `${D.counts.ordenes} órdenes · operación en campo.`,
        `<button class="btn btn--primary btn--sm">${I.plus} Orden</button>`)}
      ${U.toolbar("Buscar orden, cliente, técnico…")}
      ${U.table(["Número", "Cliente", "Servicio", "Ubicación", "Fecha", "Responsable", "Prioridad", "Estado"],
        D.ordenes.map(o => [
          `<span class="strong">${o.id}</span>`, o.client, `<span class="tag-soft">${o.service}</span>`,
          `<span class="tag-soft">${I.pin} ${o.location}</span>`, o.date, U.cellUser(o.tech), U.pill(o.priority), U.pill(o.status),
        ]))}`,
  });

  /* ============== APP DE CAMPO (mobile) ============== */
  M.field = () => ({
    html: `
      ${U.pageHead("App de Campo", "Versión móvil para técnicos · vista previa interactiva (demo).",
        `<a class="btn btn--primary btn--sm" href="tecnico/index.html" target="_blank" rel="noopener">${I.field} Abrir App Técnico (PWA)</a>`)}
      <div class="card card--pad" style="margin-bottom:18px;display:flex;align-items:center;gap:14px;background:var(--brand-grad);color:#fff;border:none">
        <span class="kpi__icon" style="background:rgba(255,255,255,.18)">${I.field}</span>
        <div style="flex:1"><b style="font-size:15px">App Técnico instalable (PWA)</b><div style="opacity:.9;font-size:13px">Construida con tu diseño de Google Stitch · funciona offline e instalable en el celular.</div></div>
        <a class="btn btn--sm" href="tecnico/index.html" target="_blank" rel="noopener" style="background:#fff;color:var(--brand)">Abrir ahora →</a>
      </div>
      <div class="phones">
        <div class="phone"><div class="phone__screen"><div class="phone__notch"><span></span></div><div class="phone__body">
          <div class="phone__top"><h4>Mis Órdenes</h4><div style="opacity:.9;font-size:12px">Hoy · 4 asignadas</div></div>
          ${["OT-7012 · Hotel Riviera · CCTV", "OT-7019 · Plaza Américas · Alarmas", "OT-7024 · Marina Cancún · Portón", "OT-7031 · Banco Peninsular · Acceso"].map((t, i) =>
            `<div class="phone__card"><div style="display:flex;justify-content:space-between"><b>${t.split(" · ")[0]}</b>${U.pill(i === 0 ? "En sitio" : i === 3 ? "Asignada" : "En ruta")}</div><div class="tag-soft" style="margin-top:4px">${t.split(" · ").slice(1).join(" · ")}</div></div>`).join("")}
        </div></div></div>

        <div class="phone"><div class="phone__screen"><div class="phone__notch"><span></span></div><div class="phone__body">
          <div class="phone__top"><h4>Checklist · CCTV</h4><div style="opacity:.9;font-size:12px">OT-7012 · 68%</div></div>
          ${[["Verificar puntos de cámara", 1], ["Montar gabinete NVR", 1], ["Tender cableado UTP Cat6", 1], ["Configurar grabación 24/7", 0], ["Pruebas de visión nocturna", 0], ["Capacitar al cliente", 0]].map(c =>
            `<div class="check ${c[1] ? "done" : ""}"><span class="check__box">${c[1] ? I.check : ""}</span><span>${c[0]}</span></div>`).join("")}
          <div class="phone__card" style="margin-top:14px"><b style="font-size:13px">Material utilizado</b><div class="tag-soft" style="margin-top:6px">8× Domo IP · 1× NVR 16CH · 2× rollo Cat6</div></div>
        </div></div></div>

        <div class="phone"><div class="phone__screen"><div class="phone__notch"><span></span></div><div class="phone__body">
          <div class="phone__top"><h4>Evidencias y Firma</h4><div style="opacity:.9;font-size:12px">Cierre de orden</div></div>
          <div class="gallery" style="margin-bottom:14px"><div class="gphoto">${I.image}</div><div class="gphoto">${I.image}</div><div class="gphoto">${I.video}</div></div>
          <div class="phone__card"><b style="font-size:13px">Comentarios</b><div class="tag-soft" style="margin-top:6px">Instalación completa, cliente satisfecho. Pendiente afinar ángulo de cámara 3.</div></div>
          <div class="sign-pad" style="margin-top:12px">✍️ Firma del cliente</div>
          <button class="btn btn--grad btn--block" style="margin-top:12px">Cerrar orden</button>
        </div></div></div>
      </div>`,
  });

  /* ============== INVENTARIO ============== */
  M.inventario = () => {
    const cats = [...new Set(D.inventario.map(i => i.category))];
    return {
      html: `
        ${U.pageHead("Inventario", `${D.counts.productos.toLocaleString("es-MX")} productos · ${cats.length} categorías. Entradas, salidas y alertas.`,
          `<button class="btn btn--sm">Entrada</button><button class="btn btn--sm">Salida</button><button class="btn btn--primary btn--sm">${I.plus} Producto</button>`)}
        <div class="cards-kpi" style="margin-bottom:6px">
          ${U.kpiCard({ label: "Valor de inventario", value: D.money(8940000), delta: "+3%", up: true, icon: "inventory", tint: "blue" })}
          ${U.kpiCard({ label: "SKUs activos", value: "3,500", delta: "+42", up: true, icon: "inventory", tint: "cyan" })}
          ${U.kpiCard({ label: "Stock bajo", value: "18", delta: "Revisar", up: false, icon: "alert", tint: "yellow" })}
          ${U.kpiCard({ label: "Agotados", value: "5", delta: "Urgente", up: false, icon: "alert", tint: "red" })}
        </div>
        <div class="section">
          <div class="branch-switch" style="margin-bottom:16px">${cats.map((c, i) => `<button class="chip-tab ${i === 0 ? "active" : ""}">${c}</button>`).join("")}</div>
          ${U.table(["SKU", "Producto", "Categoría", "Stock", "Mínimo", "Precio", "Proveedor", "Estado"],
            D.inventario.map(p => [
              `<span class="strong">${p.id}</span>`, p.name, `<span class="tag-soft">${p.category}</span>`,
              `<span class="strong">${p.stock}</span>`, p.min, D.money(p.price), `<span class="tag-soft">${p.supplier}</span>`, U.pill(p.status),
            ]))}
        </div>`,
    };
  };

  /* ============== TÉCNICOS ============== */
  M.tecnicos = () => ({
    html: `
      ${U.pageHead("Técnicos", `${D.counts.tecnicos} técnicos · cuadrillas, rendimiento y ubicación.`,
        `<button class="btn btn--primary btn--sm">${I.plus} Técnico</button>`)}
      <div class="grid-3">
        ${D.tecnicos.slice(0, 9).map(t => `<div class="card card--pad">
          <div style="display:flex;align-items:center;gap:12px">
            ${U.avatar(t.name, "lg")}
            <div><b>${t.name}</b><div class="tag-soft">${t.specialty}</div></div>
            <span style="margin-left:auto">${U.pill(t.status)}</span>
          </div>
          <div class="grid-3" style="margin-top:16px;text-align:center">
            <div><div class="kpi__value" style="font-size:18px">${t.activeProjects}</div><div class="tag-soft">Proyectos</div></div>
            <div><div class="kpi__value" style="font-size:18px">★ ${t.rating}</div><div class="tag-soft">Rating</div></div>
            <div><div class="kpi__value" style="font-size:18px">${t.orders}</div><div class="tag-soft">Órdenes</div></div>
          </div>
          <div style="margin-top:14px"><div class="tag-soft" style="margin-bottom:6px">Productividad · ${t.productivity}%</div>${U.progress(t.productivity)}</div>
          <div class="tag-soft" style="margin-top:12px">${t.crew} · ${t.branch}</div>
        </div>`).join("")}
      </div>`,
  });

  /* ============== MAPA OPERATIVO ============== */
  M.mapa = () => {
    const pins = [];
    const types = [["#2563EB", "Técnico"], ["#22C55E", "Instalación"], ["#F59E0B", "Cliente"], ["#8B5CF6", "Proyecto"]];
    for (let i = 0; i < 18; i++) { const t = D.pick(types); pins.push({ x: D.rand(8, 92), y: D.rand(10, 88), c: t[0], t: t[1] }); }
    return {
      html: `
        ${U.pageHead("Mapa Operativo", "Técnicos en campo, clientes, instalaciones y proyectos (Google Maps · mockup).")}
        <div class="map">
          <div class="map__road" style="left:0;right:0;top:38%;height:3px"></div>
          <div class="map__road" style="left:0;right:0;top:70%;height:3px"></div>
          <div class="map__road" style="top:0;bottom:0;left:30%;width:3px"></div>
          <div class="map__road" style="top:0;bottom:0;left:64%;width:3px"></div>
          ${pins.map(p => `<div class="pin" style="left:${p.x}%;top:${p.y}%"><div class="pin__pulse" style="background:${p.c}"></div><div class="pin__dot" style="background:${p.c}"></div></div>`).join("")}
          <div class="map__legend">
            <b style="font-size:13px">Operación en vivo</b>
            ${types.map(t => `<div class="lg"><span class="sw" style="background:${t[0]}"></span>${t[1]}</div>`).join("")}
          </div>
        </div>
        <div class="cards-kpi" style="margin-top:18px">
          ${U.kpiCard({ label: "Técnicos en campo", value: "47", delta: "En vivo", up: true, icon: "techs", tint: "blue" })}
          ${U.kpiCard({ label: "Instalaciones hoy", value: "12", delta: "+3", up: true, icon: "install", tint: "green" })}
          ${U.kpiCard({ label: "Rutas optimizadas", value: "9", delta: "ENYA AI", up: true, icon: "ai", tint: "purple" })}
          ${U.kpiCard({ label: "Tiempo prom. traslado", value: "24 min", delta: "-8%", up: true, icon: "clock", tint: "cyan" })}
        </div>`,
    };
  };

  /* ============== INSTALACIONES ============== */
  M.instalaciones = () => ({
    html: `
      ${U.pageHead("Instalaciones", "1,284 instalaciones terminadas · checklists y evidencias.")}
      <div class="section">${U.sectionHead("Checklists por tipo de instalación")}
        <div class="grid-3">
          ${["Instalación CCTV", "Instalación Alarmas", "Instalación Cercado", "Instalación Redes", "Instalación Portón", "Instalación Control Acceso"].map((c, i) =>
            `<div class="card card--pad"><div style="display:flex;justify-content:space-between;align-items:center"><b>${c}</b>${U.pill(i % 3 === 0 ? "Completada" : "En proceso")}</div>
              <div style="margin:12px 0">${U.progress(D.rand(40, 100))}</div>
              <div class="tag-soft">${D.rand(6, 14)} pasos · ${D.rand(2, 12)} evidencias</div></div>`).join("")}
        </div>
      </div>
      ${U.table(["Folio", "Cliente", "Tipo", "Sucursal", "Técnico", "Fecha", "Estado"],
        D.ordenes.slice(0, 14).map(o => [`<span class="strong">INS-${o.id.slice(3)}</span>`, o.client, `<span class="tag-soft">${o.service}</span>`, o.location.split(",")[0], U.cellUser(o.tech), o.date, U.pill(o.status)]))}`,
  });

  /* ============== FACTURACIÓN ============== */
  M.facturacion = () => ({
    html: `
      ${U.pageHead("Facturación", "Facturas emitidas · pendientes, pagadas y canceladas.",
        `<button class="btn btn--primary btn--sm">${I.plus} Factura</button>`)}
      <div class="cards-kpi" style="margin-bottom:6px">
        ${U.kpiCard({ label: "Facturado del mes", value: D.money(4280000), delta: "+12%", up: true, icon: "billing", tint: "blue" })}
        ${U.kpiCard({ label: "Pagadas", value: D.money(2420000), delta: "57%", up: true, icon: "check", tint: "green" })}
        ${U.kpiCard({ label: "Pendientes", value: D.money(1380000), delta: "32%", up: false, icon: "clock", tint: "yellow" })}
        ${U.kpiCard({ label: "Vencidas", value: D.money(480000), delta: "11%", up: false, icon: "alert", tint: "red" })}
      </div>
      ${U.toolbar("Buscar factura, cliente…")}
      ${U.table(["Folio", "Cliente", "Importe", "Emitida", "Vence", "Estado", ""],
        D.facturas.map(f => [`<span class="strong">${f.id}</span>`, f.client, `<span class="strong">${D.money(f.amount)}</span>`, f.issued, f.due, U.pill(f.status), `<button class="btn btn--sm">${I.pdf}</button>`]))}`,
  });

  /* ============== COBRANZA (aging) ============== */
  M.cobranza = () => ({
    html: `
      ${U.pageHead("Cobranza", "Gestión de cartera · antigüedad de saldos.")}
      <div class="cards-kpi" style="margin-bottom:6px">
        ${U.kpiCard({ label: "Por vencer", value: D.money(640000), delta: "Sano", up: true, icon: "clock", tint: "cyan" })}
        ${U.kpiCard({ label: "Pendiente", value: D.money(1380000), delta: "+5%", up: false, icon: "collect", tint: "yellow" })}
        ${U.kpiCard({ label: "Vencida", value: D.money(480000), delta: "+12%", up: false, icon: "alert", tint: "red" })}
        ${U.kpiCard({ label: "Recuperada (mes)", value: D.money(3400000), delta: "+9%", up: true, icon: "check", tint: "green" })}
      </div>
      <div class="section grid-23">
        <div class="card chart-card"><h3>Antigüedad de saldos</h3><p class="muted">Distribución de cartera por días</p><div class="chart-wrap"><canvas id="cAging"></canvas></div></div>
        <div class="ai-card">
          <div class="ai-head"><div class="ai-orb">${I.ai}</div><div><h3>ENYA AI · Cobranza</h3><div class="muted">Recomendaciones</div></div></div>
          <div class="ai-insight"><span class="ai-i tint-red">${I.alert}</span><p>La <b>cobranza vencida aumentó 12%</b>. 3 clientes concentran $310,000.</p></div>
          <div class="ai-insight"><span class="ai-i tint-yellow">${I.wa}</span><p>Sugiero enviar <b>recordatorio por WhatsApp</b> a 14 clientes con saldo por vencer esta semana.</p></div>
        </div>
      </div>
      ${U.toolbar("Buscar cliente con saldo…")}
      ${U.table(["Cliente", "Total", "Por vencer", "1-30 días", "31-60", "+60 días", "Acción"],
        D.clientes.filter(c => c.pending).slice(0, 12).map(c => {
          const p = c.pending; return [c.name, `<span class="strong">${D.money(p)}</span>`, D.money(p * .4), D.money(p * .3), D.money(p * .2), `<span style="color:var(--red)">${D.money(p * .1)}</span>`, `<button class="btn btn--sm">${I.wa} Recordar</button>`];
        }))}`,
    mount() {
      U.mkChart("cAging", {
        type: "bar",
        data: { labels: ["Por vencer", "1-30 días", "31-60 días", "61-90 días", "+90 días"], datasets: [{ label: "Cartera (MXN)", data: [640000, 720000, 410000, 180000, 110000], backgroundColor: ["#22C55E", "#0EA5E9", "#F59E0B", "#EF4444", "#991B1B"], borderRadius: 8 }] },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: {} } },
      });
    },
  });

  /* ============== CONTRATOS ============== */
  M.contratos = () => ({
    html: `
      ${U.pageHead("Contratos", "Generador de contratos con firma digital e historial.",
        `<button class="btn btn--primary btn--sm">${I.plus} Contrato</button>`)}
      <div class="grid-23">
        <div class="card card--pad">
          <div style="display:flex;justify-content:space-between;margin-bottom:18px"><div style="display:flex;gap:12px;align-items:center">${D.logoMark(38)}<div><b>Contrato de Servicios CTR-2026-118</b><div class="tag-soft">Monitoreo y mantenimiento CCTV</div></div></div>${U.pill("Activo")}</div>
          <dl class="kv">
            <dt>Cliente</dt><dd>Corporativo Caribe S.A. de C.V.</dd>
            <dt>Servicio</dt><dd>Mantenimiento preventivo CCTV + monitoreo</dd>
            <dt>Vigencia</dt><dd>12 meses (Jun 2026 – May 2027)</dd>
            <dt>Monto mensual</dt><dd>$18,500 MXN + IVA</dd>
            <dt>Renovación</dt><dd>Automática</dd>
          </dl>
          <div class="sign-pad" style="margin-top:20px">✍️ Firma digital — Representante legal</div>
          <div style="display:flex;gap:10px;margin-top:16px"><button class="btn btn--grad">Firmar digitalmente</button><button class="btn">${I.pdf} PDF</button></div>
        </div>
        <div class="card card--pad"><h3 style="margin-top:0">Plantillas</h3>
          ${["Servicio de monitoreo", "Mantenimiento preventivo", "Instalación llave en mano", "Arrendamiento de equipo", "Confidencialidad (NDA)"].map(t => `<div class="check"><span class="check__box">${I.contracts}</span><span>${t}</span></div>`).join("")}
        </div>
      </div>
      <div class="section">${U.sectionHead("Historial de contratos")}
        ${U.table(["Folio", "Cliente", "Tipo", "Monto", "Vigencia", "Estado"],
          [["CTR-2026-118", "Corporativo Caribe", "Monitoreo CCTV", "$18,500/mes", "12 meses", "Activo"],
           ["CTR-2026-104", "Hotel Riviera Maya", "Mantenimiento", "$24,000/mes", "24 meses", "Activo"],
           ["CTR-2026-097", "Plaza Las Américas", "Llave en mano", "$680,000", "Único", "Finalizado"],
           ["CTR-2025-241", "Marina Puerto Cancún", "Arrendamiento", "$12,000/mes", "36 meses", "Activo"]].map(r =>
            [`<span class="strong">${r[0]}</span>`, r[1], `<span class="tag-soft">${r[2]}</span>`, r[3], r[4], U.pill(r[5])]))}
      </div>`,
  });

  /* ============== PORTAL CLIENTE ============== */
  M.portal = () => ({
    html: `
      ${U.pageHead("Portal Cliente", "Vista del cliente final · transparencia total de su operación (demo).")}
      <div class="card card--pad" style="background:var(--brand-grad);color:#fff;border:none;margin-bottom:18px">
        <div style="display:flex;align-items:center;gap:14px"><div class="av-lg" style="background:rgba(255,255,255,.2)">HR</div><div><h2 style="margin:0">Hotel Riviera Maya</h2><div style="opacity:.9">Bienvenido a tu portal · 4 servicios activos</div></div></div>
      </div>
      <div class="cards-kpi" style="margin-bottom:6px">
        ${U.kpiCard({ label: "Proyectos activos", value: "2", delta: "En curso", up: true, icon: "projects", tint: "blue" })}
        ${U.kpiCard({ label: "Facturas por pagar", value: D.money(48500), delta: "1 pendiente", up: false, icon: "billing", tint: "yellow" })}
        ${U.kpiCard({ label: "Equipos monitoreados", value: "32", delta: "100% online", up: true, icon: "camera", tint: "green" })}
        ${U.kpiCard({ label: "Tickets de soporte", value: "0", delta: "Sin pendientes", up: true, icon: "check", tint: "cyan" })}
      </div>
      <div class="section grid-2">
        <div class="card card--pad"><h3 style="margin-top:0">Mis proyectos</h3>
          <div class="check"><span style="flex:1"><b>Instalación CCTV — 8 cámaras</b><div class="tag-soft">68% completado</div></span>${U.pill("En ejecución")}</div>
          <div class="check" style="border:none"><span style="flex:1"><b>Ampliación control de acceso</b><div class="tag-soft">Programado 12 Jun</div></span>${U.pill("Programado")}</div>
        </div>
        <div class="card card--pad"><h3 style="margin-top:0">Documentos y evidencias</h3>
          <div class="check"><span class="check__box">${I.pdf}</span><span>Contrato de servicio 2026</span></div>
          <div class="check"><span class="check__box">${I.pdf}</span><span>Factura FAC-9114 · $48,500</span></div>
          <div class="check" style="border:none"><span class="check__box">${I.image}</span><span>Evidencias instalación (12)</span></div>
        </div>
      </div>`,
  });

  /* ============== REPORTES ============== */
  M.reportes = () => ({
    html: `
      ${U.pageHead("Reportes", "Analítica de negocio · ventas, cobranza, técnicos, rentabilidad.",
        `<button class="btn btn--sm">Periodo</button><button class="btn btn--sm">${I.pdf} Exportar</button>`)}
      <div class="grid-2">
        <div class="card chart-card"><h3>Ventas por sucursal</h3><p class="muted">Acumulado 2026 (MXN)</p><div class="chart-wrap"><canvas id="rVentas"></canvas></div></div>
        <div class="card chart-card"><h3>Rentabilidad por servicio</h3><p class="muted">Margen %</p><div class="chart-wrap"><canvas id="rRent"></canvas></div></div>
      </div>
      <div class="section grid-2">
        <div class="card chart-card"><h3>Productividad de técnicos</h3><p class="muted">Órdenes cerradas a tiempo</p><div class="chart-wrap"><canvas id="rTec"></canvas></div></div>
        <div class="card chart-card"><h3>Evolución de cobranza</h3><p class="muted">Recuperada vs pendiente</p><div class="chart-wrap"><canvas id="rCob"></canvas></div></div>
      </div>`,
    mount() {
      U.mkChart("rVentas", { type: "bar", data: { labels: D.branches.map(b => b.name), datasets: [{ label: "Ventas", data: D.branches.map(b => b.sales), backgroundColor: ["#2563EB", "#0EA5E9", "#22C55E"], borderRadius: 8 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: {} } } });
      U.mkChart("rRent", { type: "radar", data: { labels: ["CCTV", "Alarmas", "Cercado", "Redes", "Acceso", "Portones"], datasets: [{ label: "Margen %", data: [38, 32, 41, 28, 35, 44], borderColor: "#22C55E", backgroundColor: "rgba(34,197,94,.18)", borderWidth: 2, pointBackgroundColor: "#22C55E" }] }, options: { scales: { r: { beginAtZero: true, grid: { color: U.cssVar("--border-soft") }, angleLines: { color: U.cssVar("--border-soft") }, pointLabels: { color: U.cssVar("--text-soft") } } } } });
      U.mkChart("rTec", { type: "bar", data: { labels: D.tecnicos.slice(0, 6).map(t => t.name.split(" ")[0]), datasets: [{ label: "Productividad %", data: D.tecnicos.slice(0, 6).map(t => t.productivity), backgroundColor: "#8B5CF6", borderRadius: 6 }] }, options: { indexAxis: "y", plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true }, y: {} } } });
      U.mkChart("rCob", { type: "line", data: { labels: D.series.meses, datasets: [{ label: "Recuperada", data: D.series.recuperada, borderColor: "#22C55E", tension: .4, borderWidth: 3, pointRadius: 0 }, { label: "Pendiente", data: D.series.cobranza, borderColor: "#EF4444", tension: .4, borderWidth: 3, pointRadius: 0 }] }, options: { scales: { y: { beginAtZero: true }, x: {} } } });
    },
  });

  /* ============== MULTISUCURSAL ============== */
  M.sucursales = () => ({
    html: `
      ${U.pageHead("Multisucursal · Dashboard Corporativo", "Comparativo entre sucursales en tiempo real.")}
      <div class="cards-kpi" style="margin-bottom:6px">
        ${D.branches.map(b => U.kpiCard({ label: "Sucursal " + b.name, value: D.money(b.sales), delta: b.growth, up: true, icon: "branch", tint: b.name === "Cancún" ? "blue" : b.name === "Chetumal" ? "cyan" : "green" })).join("")}
        ${U.kpiCard({ label: "Corporativo total", value: D.money(D.branches.reduce((a, b) => a + b.sales, 0)), delta: "+8%", up: true, icon: "money", tint: "purple" })}
      </div>
      <div class="section grid-2">
        <div class="card chart-card"><h3>Comparativo de ventas</h3><p class="muted">Por sucursal (MXN)</p><div class="chart-wrap"><canvas id="sV"></canvas></div></div>
        <div class="card chart-card"><h3>Cobranza por sucursal</h3><p class="muted">% recuperación</p><div class="chart-wrap"><canvas id="sC"></canvas></div></div>
      </div>
      <div class="section">
        ${U.table(["Sucursal", "Ventas", "Proyectos", "Técnicos", "Cobranza", "Crecimiento"],
          D.branches.map(b => [`<span class="strong">${I.pin} ${b.name}</span>`, D.money(b.sales), b.projects, b.techs, `<div style="min-width:120px">${U.progress(b.collection)}<span class="tag-soft">${b.collection}%</span></div>`, `<span class="pill pill--green">${b.growth}</span>`]))}
      </div>`,
    mount() {
      U.mkChart("sV", { type: "bar", data: { labels: D.branches.map(b => b.name), datasets: [{ label: "Ventas", data: D.branches.map(b => b.sales), backgroundColor: "#2563EB", borderRadius: 8 }] }, options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: {} } } });
      U.mkChart("sC", { type: "doughnut", data: { labels: D.branches.map(b => b.name), datasets: [{ data: D.branches.map(b => b.collection), backgroundColor: ["#0EA5E9", "#2563EB", "#22C55E"], borderWidth: 0 }] }, options: { cutout: "60%", plugins: { legend: { position: "right" } } } });
    },
  });

  /* ============== ENYA AI ============== */
  M.ai = () => ({
    html: `
      ${U.pageHead("ENYA AI", "Asistente de inteligencia operativa · análisis predictivo (demo).")}
      <div class="ai-card" style="margin-bottom:18px">
        <div class="ai-head"><div class="ai-orb">${I.ai}</div><div><h3>Resumen ejecutivo del día</h3><div class="muted">Generado con datos de demostración</div></div></div>
        ${D.aiInsights.map(a => `<div class="ai-insight"><span class="ai-i ${a.tint}">${I[a.icon]}</span><p>${a.text}</p></div>`).join("")}
        <div class="ai-input"><input placeholder="Ej: ¿Qué sucursal tiene mejor margen este trimestre?"><button class="btn btn--grad">Preguntar a ENYA AI</button></div>
      </div>
      <div class="grid-3">
        ${[["Predicción de ventas", "Proyección +14% para julio si se mantiene la conversión actual.", "up", "tint-blue"],
           ["Riesgo de cartera", "2 clientes con probabilidad alta de atraso. Activar recordatorios.", "alert", "tint-red"],
           ["Optimización de rutas", "Ahorro estimado de 18% en traslados reorganizando 3 cuadrillas.", "map", "tint-green"]].map(c =>
          `<div class="card card--pad"><span class="kpi__icon ${c[3]}">${I[c[2]]}</span><h3 style="margin:14px 0 6px">${c[0]}</h3><p class="tag-soft" style="line-height:1.5">${c[1]}</p></div>`).join("")}
      </div>`,
  });

  /* ============== CONFIGURACIÓN ============== */
  M.configuracion = () => ({
    html: `
      ${U.pageHead("Configuración", "Preferencias de la cuenta, equipo, notificaciones e integraciones.")}
      <div class="settings-grid">
        <div class="card list-pane">
          ${["General", "Notificaciones", "Equipo y roles", "Integraciones", "Facturación", "Apariencia"].map((s, i) => `<div class="list-row ${i === 1 ? "active" : ""}">${s}</div>`).join("")}
        </div>
        <div class="card card--pad">
          <h3 style="margin-top:0">Notificaciones</h3>
          ${[["Push", "Alertas en tiempo real en la app", 1], ["Correo", "Resúmenes diarios y facturas", 1], ["WhatsApp", "Recordatorios de cobranza y órdenes", 1], ["SMS", "Avisos críticos de seguridad", 0]].map(r =>
            `<div class="row-setting"><div><h4>${r[0]}</h4><p>${r[1]}</p></div><div class="switch ${r[2] ? "on" : ""}"></div></div>`).join("")}
          <h3 style="margin-top:24px">Integraciones (próximamente)</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:10px">${["Clerk", "Neon", "Resend", "Twilio", "Mercado Pago", "Stripe", "Google Maps", "UploadThing", "OpenAI"].map(t => `<span class="pill pill--gray">${t}</span>`).join("")}</div>
        </div>
      </div>`,
    mount(root) {
      root.querySelectorAll(".switch").forEach(s => s.addEventListener("click", () => s.classList.toggle("on")));
      root.querySelectorAll(".settings-grid .list-row").forEach(r => r.addEventListener("click", () => {
        root.querySelectorAll(".settings-grid .list-row").forEach(x => x.classList.remove("active")); r.classList.add("active");
      }));
    },
  });

  global.MODULES = M;
})(window);
