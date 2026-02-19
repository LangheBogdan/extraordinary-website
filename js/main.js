document.addEventListener("DOMContentLoaded", () => {
  // CSS-only hamburger menu - no JavaScript needed for navigation toggle

  // Smooth Scroll for About Me Button
  const aboutButton = document.querySelector('a[href="#about"]');
  if (aboutButton) {
    aboutButton.addEventListener("click", (e) => {
      e.preventDefault();
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Form Validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameParent = nameInput.parentElement;
    const emailParent = emailInput.parentElement;
    const messageParent = messageInput.parentElement;

    const emailErrorSpan = emailParent.querySelector(".error-message");

    const inputs = [nameInput, emailInput, messageInput];
    const parents = [nameParent, emailParent, messageParent];

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      parents.forEach((parent) => {
        parent.classList.remove("error");
      });

      // Validate Name
      if (nameInput.value.trim() === "") {
        nameParent.classList.add("error");
        isValid = false;
      }

      // Validate Email
      if (emailInput.value.trim() === "") {
        emailParent.classList.add("error");
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        emailParent.classList.add("error");
        // Update message to "Please use a valid email address"
        if (emailErrorSpan) {
          emailErrorSpan.textContent = "Please use a valid email address";
        }
        isValid = false;
      } else {
        // Reset message if valid (in case it was changed)
        if (emailErrorSpan) {
          emailErrorSpan.textContent = "This field is required";
        }
      }

      // Validate Message
      if (messageInput.value.trim() === "") {
        messageParent.classList.add("error");
        isValid = false;
      }

      if (isValid) {
        // Form is valid, would submit here.
        alert("Message sent successfully! (Demo)");
        contactForm.reset();
      }
    });

    // Clear error on input
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.parentElement.classList.remove("error");
      });
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
