"use strict";

// This will run in strict mode
console.log("JavaScript is connected and running in strict mode!");

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.header__hamburger');
  const nav = document.querySelector('.header__nav');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // Toggle active class on hamburger
      hamburger.classList.toggle('hamburger--active');
      
      // Toggle active class on nav to show/hide the menu
      nav.classList.toggle('header__nav--active');
    });
    
    // Close the menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && nav.classList.contains('header__nav--active')) {
        nav.classList.remove('header__nav--active');
        hamburger.classList.remove('hamburger--active');
      }
    });
    
    // Close the menu when clicking a nav link
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('header__nav--active');
        hamburger.classList.remove('hamburger--active');
      });
    });
  }
});
