(function () {
  const CHECKOUT_URL = "https://pay.hotmart.com/L103280970C?checkoutMode=2";
  const SALES_URL = "https://go.hotmart.com/L103280970C";

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav__toggle");
  const list = document.querySelector(".nav__list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu on link click (mobile)
    list.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // UTM helper: append utm_* params to checkout links
  const params = new URLSearchParams(window.location.search);
  const allowedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const utm = new URLSearchParams();
  allowedKeys.forEach(k => {
    const v = params.get(k);
    if (v) utm.set(k, v);
  });

  function withUtm(url) {
    if (!utm.toString()) return url;
    const u = new URL(url);
    utm.forEach((v, k) => u.searchParams.set(k, v));
    return u.toString();
  }

  // Update checkout anchors (including Hotmart widget anchor href)
  document.querySelectorAll(".js-checkout").forEach(a => {
    if (a.tagName.toLowerCase() !== "a") return;
    a.setAttribute("href", withUtm(CHECKOUT_URL));
  });

  document.querySelectorAll(".js-sales").forEach(a => {
    if (a.tagName.toLowerCase() !== "a") return;
    a.setAttribute("href", withUtm(SALES_URL));
  });

  // WhatsApp floating button placeholder
  // To enable: replace PHONE below with your number (country code + DDD + number), e.g. 5511999999999
  // Then set the button href to: https://wa.me/PHONE?text=...
  const wpp = document.querySelector(".wpp");
  if (wpp) {
    wpp.addEventListener("click", (e) => {
      e.preventDefault();
      alert("WhatsApp ainda não configurado. Depois, insira seu número no script.js para ativar.");
    });
  }
})();