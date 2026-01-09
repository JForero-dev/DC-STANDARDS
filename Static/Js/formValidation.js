const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const inputs = {
    name: { el: document.getElementById("name"), err: document.getElementById("nameError") },
    company: { el: document.getElementById("company"), err: document.getElementById("companyError") },
    email: { el: document.getElementById("email"), err: document.getElementById("emailError") },
    message: { el: document.getElementById("message"), err: document.getElementById("messageError") }
};

inputs.name.el.addEventListener("blur", () => {
    if (inputs.name.el.value.trim().length < 3) {
        inputs.name.err.textContent = "Full name is required (min 3 chars)";
    } else inputs.name.err.textContent = "";
});

inputs.email.el.addEventListener("blur", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email.el.value)) {
        inputs.email.err.textContent = "Please enter a valid email address";
    } else inputs.email.err.textContent = "";
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (inputs.name.el.value.length < 3) isValid = false;
    if (inputs.message.el.value.length < 10) isValid = false;

    if (isValid) {
        formMessage.textContent = "Message sent successfully! We'll contact you soon.";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";
        contactForm.reset();
        setTimeout(() => formMessage.style.display = "none", 5000);
    } else {
        formMessage.textContent = "Please correct the errors in the form.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
    }
});