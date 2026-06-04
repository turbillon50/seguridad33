/* ENYA OPS · Técnico de Campo — Service Worker (PWA)
   Estrategia: precache del app-shell + runtime cache para CDN/fuentes/imágenes.
   Permite instalación e uso offline básico (demo). */
const VERSION = "enya-tecnico-v1";
const SHELL = VERSION + "-shell";
const RUNTIME = VERSION + "-runtime";

const APP_SHELL = [
  "./",
  "./index.html",
  "./ordenes.html",
  "./checklist.html",
  "./evidencias.html",
  "./pwa.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Navegación: network-first con fallback a cache (offline).
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(SHELL).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Mismo origen: cache-first.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req)));
    return;
  }

  // CDN / fuentes / imágenes remotas: stale-while-revalidate.
  e.respondWith(
    caches.open(RUNTIME).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && (res.status === 200 || res.type === "opaque")) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    )
  );
});
