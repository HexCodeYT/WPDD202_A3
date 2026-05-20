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
