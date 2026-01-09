const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    nav.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    } else {
    header.style.boxShadow = "none";
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
        });
    }
    });
});