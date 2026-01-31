const CACHE_NAME = "pinklife-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "index.html",
  "food.html",
  "diary.html",
  "habits.html",
  "achievements.html",
  "reports.html",

  "manifest.json",

  "css/style.css",

  "js/storage.js",
  "js/dashboard.js",
  "js/food.js",
  "js/diary.js",
  "js/habits.js",
  "js/badges.js",
  "js/reports.js",
  "js/macros.js",

  "assets/images/icon-192.png",
  "assets/images/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
