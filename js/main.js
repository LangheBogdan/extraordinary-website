document.addEventListener("DOMContentLoaded", () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // CSS-only hamburger menu - no JavaScript needed for navigation toggle

  // Smooth Scroll for About Me Button
  const aboutButton = document.querySelector('a[href="#about"]');
  const aboutSection = document.getElementById("about");
  if (aboutButton && aboutSection) {
    aboutButton.addEventListener("click", (e) => {
      e.preventDefault();
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  // Form Validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      [nameInput, emailInput, messageInput].forEach((input) => {
        input.parentElement.classList.remove("error", "format-error");
      });

      // Validate Name
      if (nameInput.value.trim() === "") {
        nameInput.parentElement.classList.add("error");
        isValid = false;
      }

      // Validate Email
      if (emailInput.value.trim() === "") {
        emailInput.parentElement.classList.add("error");
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        emailInput.parentElement.classList.add("error", "format-error");
        isValid = false;
      }

      // Validate Message
      if (messageInput.value.trim() === "") {
        messageInput.parentElement.classList.add("error");
        isValid = false;
      }

      if (isValid) {
        // Form is valid, would submit here.
        alert("Message sent successfully! (Demo)");
        contactForm.reset();
      }
    });

    // Live validation on input
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() !== "") {
        nameInput.parentElement.classList.remove("error");
      }
    });

    emailInput.addEventListener("input", () => {
      const val = emailInput.value.trim();
      if (val === "" || isValidEmail(val)) {
        emailInput.parentElement.classList.remove("error", "format-error");
      } else {
        emailInput.parentElement.classList.add("error", "format-error");
      }
    });

    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim() !== "") {
        messageInput.parentElement.classList.remove("error");
      }
    });
  }

  function isValidEmail(email) {
    return EMAIL_REGEX.test(email);
  }
});
