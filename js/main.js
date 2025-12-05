document.addEventListener("DOMContentLoaded", () => {
  // CSS-only hamburger menu - no JavaScript needed for navigation toggle

  // Form Validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Reset errors
      [nameInput, emailInput, messageInput].forEach((input) => {
        input.parentElement.classList.remove("error");
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
        emailInput.parentElement.classList.add("error");
        // Ideally update message to "Please use a valid email address" but design shows generic error styling or specific text?
        // Design requirement: "The `Email Address` is not formatted correctly should show 'Please use a valid email address'"
        // My HTML has "This field is required" hardcoded. I should update text dynamically or have two error messages.
        // For simplicity, I'll update the text content.
        const errorSpan =
          emailInput.parentElement.querySelector(".error-message");
        if (errorSpan)
          errorSpan.textContent = "Please use a valid email address";
        isValid = false;
      } else {
        // Reset message if valid (in case it was changed)
        const errorSpan =
          emailInput.parentElement.querySelector(".error-message");
        if (errorSpan) errorSpan.textContent = "This field is required";
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

    // Clear error on input
    const inputs = contactForm.querySelectorAll("input, textarea");
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
