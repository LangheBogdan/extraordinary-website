"use strict";

// This will run in strict mode
console.log("JavaScript is connected and running in strict mode!");

// IIFE (Immediately Invoked Function Expression) for better scoping
(() => {
  // DOM elements
  const elements = {
    hamburger: document.querySelector(".header__hamburger"),
    nav: document.querySelector(".header__nav"),
    navLinks: document.querySelectorAll(".header__nav-link"),
    copyrightYear: document.getElementById("copyrightYear"),
  };

  /**
   * Initialize all event listeners
   */
  const initEventListeners = () => {
    // Hamburger menu functionality
    if (elements.hamburger) {
      elements.hamburger.addEventListener("click", toggleMobileMenu);

      // Close the menu when clicking outside
      document.addEventListener("click", (event) => {
        if (
          !elements.nav.contains(event.target) &&
          elements.nav.classList.contains("header__nav--active")
        ) {
          closeMobileMenu();
        }
      });

      // Close the menu when clicking a nav link
      elements.navLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
      });
    }
  };

  /**
   * Toggle the mobile menu state
   */
  const toggleMobileMenu = () => {
    elements.hamburger.classList.toggle("hamburger--active");
    elements.nav.classList.toggle("header__nav--active");
  };

  /**
   * Close the mobile menu
   */
  const closeMobileMenu = () => {
    elements.nav.classList.remove("header__nav--active");
    elements.hamburger.classList.remove("hamburger--active");
  };

  /**
   * Update copyright year with the current year
   */
  const updateCopyrightYear = () => {
    if (elements.copyrightYear) {
      elements.copyrightYear.textContent = new Date().getFullYear().toString();
    }
  };

  /**
   * Initialize the application
   */
  const init = () => {
    updateCopyrightYear();
    initEventListeners();
  };

  // Run when DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
