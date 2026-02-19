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
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // UI Feedback: Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        submitButton.classList.add("btn-disabled");

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        fetch("https://httpbin.org/post", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Message sent successfully!");
              contactForm.reset();
            } else {
              throw new Error("Form submission failed");
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert(
              "There was a problem submitting your form. Please try again.",
            );
          })
          .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.classList.remove("btn-disabled");
          });
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
