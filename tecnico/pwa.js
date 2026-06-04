/* ENYA OPS · Técnico de Campo — Capa PWA
   - Registra el Service Worker
   - Unifica la navegación inferior entre las 4 pantallas de Stitch
   - Gestiona el prompt de instalación ("Agregar a pantalla de inicio")
   No altera el diseño original de Stitch; solo lo conecta. */
(function () {
  "use strict";

  /* ---------- 1) Service Worker ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  /* ---------- 2) Navegación inferior unificada ---------- */
  const TABS = [
    { href: "index.html",      icon: "space_dashboard", label: "Inicio" },
    { href: "ordenes.html",    icon: "assignment",      label: "Órdenes" },
    { href: "checklist.html",  icon: "checklist",       label: "Checklist" },
    { href: "evidencias.html", icon: "photo_camera",    label: "Evidencias" },
  ];

  function currentFile() {
    const p = location.pathname.split("/").pop();
    return p && p.length ? p : "index.html";
  }

  function buildNav() {
    const nav = document.querySelector('nav[class*="bottom-0"]');
    if (!nav) return;
    const here = currentFile();
    nav.innerHTML = TABS.map((t) => {
      const active = t.href === here;
      const cls = active
        ? "bg-primary-container text-on-primary-container rounded-full px-4 py-1.5"
        : "text-on-surface-variant hover:bg-surface-container-highest rounded-full px-4 py-1.5";
      const fill = active ? ' style="font-variation-settings:\'FILL\' 1;"' : "";
      return `<a href="${t.href}" class="flex flex-col items-center justify-center transition-all active:scale-95 duration-200 ${cls}">
        <span class="material-symbols-outlined"${fill}>${t.icon}</span>
        <span class="text-label-sm font-label-sm">${t.label}</span>
      </a>`;
    }).join("");
    nav.classList.remove("md:hidden"); // visible siempre (es una app móvil)
  }

  /* ---------- 3) Prompt de instalación ---------- */
  let deferredPrompt = null;

  function showInstallChip() {
    if (document.getElementById("enyaInstall")) return;
    const chip = document.createElement("button");
    chip.id = "enyaInstall";
    chip.innerHTML =
      '<span class="material-symbols-outlined" style="font-size:18px">install_mobile</span><span>Instalar app</span>';
    chip.style.cssText =
      "position:fixed;left:50%;transform:translateX(-50%);top:72px;z-index:60;display:flex;align-items:center;gap:8px;" +
      "background:#2563eb;color:#fff;border:none;padding:10px 16px;border-radius:9999px;font-family:Inter,sans-serif;" +
      "font-size:13px;font-weight:600;box-shadow:0 10px 24px rgba(37,99,235,.35);cursor:pointer;";
    chip.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      chip.remove();
    });
    document.body.appendChild(chip);
    setTimeout(() => { if (chip.isConnected) chip.style.opacity = "0.0", chip.remove(); }, 12000);
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallChip();
  });

  window.addEventListener("appinstalled", () => {
    const c = document.getElementById("enyaInstall");
    if (c) c.remove();
  });

  /* ---------- init ---------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildNav);
  } else {
    buildNav();
  }
})();
