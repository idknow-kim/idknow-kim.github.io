(function () {
  if (typeof document === "undefined") {
    return;
  }

  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var navLinks = document.querySelectorAll(".site-nav a");
  var i;

  if (header && menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = header.getAttribute("data-open") === "true";
      header.setAttribute("data-open", String(!isOpen));
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  for (i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener("click", function () {
      if (!header || !menuToggle) {
        return;
      }

      header.setAttribute("data-open", "false");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }
}());
