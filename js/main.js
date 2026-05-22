const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const mobileNavigationQuery = window.matchMedia("(max-width: 1120px)");

function setMenuState(isOpen) {
  if (!menuToggle || !primaryNavigation) {
    return;
  }

  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".screen-reader-text").textContent = isOpen ? "Close menu" : "Open menu";
}

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    setMenuState(!document.body.classList.contains("nav-open"));
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("nav-open") &&
      !event.target.closest(".navbar")
    ) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  mobileNavigationQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenuState(false);
    }
  });
}

const shopLook = document.querySelector("[data-shop-look]");

if (shopLook) {
  const hotspots = Array.from(shopLook.querySelectorAll("[data-product]"));
  const productCards = Array.from(shopLook.querySelectorAll("[data-product-card]"));

  function setCardVisibility(card, isActive) {
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-hidden", String(!isActive));

    card.querySelectorAll("a, button").forEach((interactiveElement) => {
      if (isActive) {
        interactiveElement.removeAttribute("tabindex");
        return;
      }

      interactiveElement.setAttribute("tabindex", "-1");
    });
  }

  function clearActiveProduct() {
    hotspots.forEach((hotspot) => {
      hotspot.classList.remove("is-active");
      hotspot.setAttribute("aria-expanded", "false");
    });

    productCards.forEach((card) => {
      setCardVisibility(card, false);
    });
  }

  function setActiveProduct(productId) {
    hotspots.forEach((hotspot) => {
      const isActive = hotspot.dataset.product === productId;
      hotspot.classList.toggle("is-active", isActive);
      hotspot.setAttribute("aria-expanded", String(isActive));
    });

    productCards.forEach((card) => {
      const isActive = card.dataset.productCard === productId;
      setCardVisibility(card, isActive);
    });
  }

  productCards.forEach((card) => {
    setCardVisibility(card, card.classList.contains("is-active"));
  });

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      if (hotspot.classList.contains("is-active")) {
        clearActiveProduct();
        return;
      }

      setActiveProduct(hotspot.dataset.product);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearActiveProduct();
    }
  });
}
