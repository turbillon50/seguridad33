/* ============================================================
   ENYA OPS — Helpers de UI reutilizables
   ============================================================ */
(function (global) {
  "use strict";
  const D = global.ENYA;
  const I = D.I;

  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

  /* ---------- Componentes ---------- */
  function kpiCard(k) {
    return `<div class="kpi">
      <div class="kpi__top">
        <span class="kpi__label">${k.label}</span>
        <span class="kpi__icon tint-${k.tint}">${I[k.icon] || ""}</span>
      </div>
      <div class="kpi__value">${k.value}</div>
      <span class="kpi__delta ${k.up ? "up" : "down"}">${I[k.up ? "up" : "down"]} ${k.delta}</span>
    </div>`;
  }

  function avatar(name, size) {
    const c = D.colorFor(name);
    const s = size === "lg" ? "av-lg" : "mini-av";
    return `<span class="${s}" style="background:${c}">${D.initials(name)}</span>`;
  }

  function cellUser(name, sub) {
    return `<div class="cell-user">${avatar(name)}<div><div class="strong">${name}</div>${sub ? `<div class="tag-soft">${sub}</div>` : ""}</div></div>`;
  }

  /* Mapa de estado -> color de pill */
  const PILL = {
    "Activo": "green", "VIP": "purple", "Inactivo": "gray",
    "Pagada": "green", "Pendiente": "yellow", "Vencida": "red", "Cancelada": "gray",
    "Disponible": "green", "Bajo": "yellow", "Agotado": "red",
    "Completada": "green", "En proceso": "blue", "En sitio": "cyan", "En ruta": "cyan", "Asignada": "gray", "Pausada": "yellow",
    "Finalizado": "green", "En ejecución": "blue", "Programado": "cyan", "Aprobado": "purple", "Cotizado": "yellow", "Prospección": "gray", "Cancelado": "red",
    "Alta": "yellow", "Media": "blue", "Baja": "gray", "Urgente": "red",
    "En campo": "blue", "Descanso": "gray",
    "Lead Nuevo": "gray", "Contactado": "cyan", "Cotización": "yellow", "Negociación": "blue", "Ganado": "green", "Perdido": "red",
  };
  const pill = (txt) => `<span class="pill pill--${PILL[txt] || "gray"}">${txt}</span>`;

  function table(cols, rows) {
    return `<div class="card"><div class="table-wrap"><table class="tbl">
      <thead><tr>${cols.map(c => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div></div>`;
  }

  function toolbar(placeholder, rightHtml) {
    return `<div class="toolbar">
      <div class="search"><span style="width:16px;height:16px;display:inline-flex">${I.search}</span><input placeholder="${placeholder || "Buscar..."}"></div>
      <button class="btn btn--sm">Filtros</button>
      <button class="btn btn--sm">Exportar</button>
      <div class="spacer"></div>
      ${rightHtml || ""}
    </div>`;
  }

  function pageHead(title, sub, actions) {
    return `<div class="page-head"><div><h1>${title}</h1><p>${sub}</p></div><div style="display:flex;gap:10px">${actions || ""}</div></div>`;
  }

  function sectionHead(title, muted) {
    return `<div class="section__head"><h3>${title}</h3>${muted ? `<span class="muted">${muted}</span>` : ""}</div>`;
  }

  function progress(v) { return `<div class="progress"><i style="width:${v}%"></i></div>`; }

  /* ---------- Charts (Chart.js) ---------- */
  const charts = [];
  function destroyCharts() { while (charts.length) { try { charts.pop().destroy(); } catch (e) {} } }

  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

  function mkChart(canvasId, cfg) {
    const c = document.getElementById(canvasId);
    if (!c || !global.Chart) return;
    const grid = cssVar("--border-soft");
    const text = cssVar("--text-mute");
    Chart.defaults.font.family = "-apple-system, Inter, sans-serif";
    Chart.defaults.color = text;
    cfg.options = cfg.options || {};
    cfg.options.responsive = true;
    cfg.options.maintainAspectRatio = false;
    cfg.options.plugins = Object.assign({ legend: { labels: { usePointStyle: true, boxWidth: 8, padding: 16, font: { size: 12 } } } }, cfg.options.plugins);
    if (cfg.options.scales) {
      Object.values(cfg.options.scales).forEach(s => { s.grid = Object.assign({ color: grid, drawBorder: false }, s.grid); s.ticks = Object.assign({ color: text, font: { size: 11 } }, s.ticks); });
    }
    const ch = new Chart(c, cfg);
    charts.push(ch);
    return ch;
  }

  function grad(ctx, color) {
    const g = ctx.createLinearGradient(0, 0, 0, 240);
    g.addColorStop(0, color + "55"); g.addColorStop(1, color + "02");
    return g;
  }

  global.UI = { el, kpiCard, avatar, cellUser, pill, table, toolbar, pageHead, sectionHead, progress, mkChart, destroyCharts, grad, cssVar };
})(window);
