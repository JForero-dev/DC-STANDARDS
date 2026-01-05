// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

const savedTheme = localStorage.getItem("theme") || "dark"
if (savedTheme === "light") {
  html.setAttribute("data-theme", "light")
  themeToggle.querySelector("i").className = "fa-solid fa-moon"
}

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  // Add transition class
  html.style.transition = "all 0.5s ease"

  html.setAttribute("data-theme", newTheme)
  themeToggle.querySelector("i").className = newTheme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"
  localStorage.setItem("theme", newTheme)

  // Remove transition class after animation
  setTimeout(() => {
    html.style.transition = ""
  }, 500)
})

// Menu Toggle (Mobile)
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  nav.classList.toggle("active")
})

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    nav.classList.remove("active")
  })
})

// Header scroll effect
const header = document.getElementById("header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Animación de números (stats counter)
const observerOptions = {
  threshold: 0.5,
}

const animateNumbers = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = Number.parseInt(entry.target.getAttribute("data-target"))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateNumber = () => {
        current += increment
        if (current < target) {
          entry.target.textContent = Math.floor(current)
          requestAnimationFrame(updateNumber)
        } else {
          entry.target.textContent = target + (target === 100 ? "%" : "+")
        }
      }

      updateNumber()
      observer.unobserve(entry.target)
    }
  })
}

const statsObserver = new IntersectionObserver(animateNumbers, observerOptions)
const statNumbers = document.querySelectorAll(".stat-number")
statNumbers.forEach((stat) => statsObserver.observe(stat))

// Fade-in animation observer
const enhancedFadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
        enhancedFadeInObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
)

const fadeElements = document.querySelectorAll(".service-card, .standard-card, .stat-box, .info-card")
fadeElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  enhancedFadeInObserver.observe(el)
})

// Form Validation
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

// Validación en tiempo real
const nameInput = document.getElementById("name")
const companyInput = document.getElementById("company")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")

const nameError = document.getElementById("nameError")
const companyError = document.getElementById("companyError")
const emailError = document.getElementById("emailError")
const messageError = document.getElementById("messageError")

// Validar nombre
nameInput.addEventListener("blur", () => {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "El nombre es requerido"
  } else if (nameInput.value.trim().length < 3) {
    nameError.textContent = "El nombre debe tener al menos 3 caracteres"
  } else {
    nameError.textContent = ""
  }
})

// Validar empresa
companyInput.addEventListener("blur", () => {
  if (companyInput.value.trim() === "") {
    companyError.textContent = "La empresa es requerida"
  } else {
    companyError.textContent = ""
  }
})

// Validar email
emailInput.addEventListener("blur", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailInput.value.trim() === "") {
    emailError.textContent = "El correo electrónico es requerido"
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Ingrese un correo electrónico válido"
  } else {
    emailError.textContent = ""
  }
})

// Validar mensaje
messageInput.addEventListener("blur", () => {
  if (messageInput.value.trim() === "") {
    messageError.textContent = "El mensaje es requerido"
  } else if (messageInput.value.trim().length < 10) {
    messageError.textContent = "El mensaje debe tener al menos 10 caracteres"
  } else {
    messageError.textContent = ""
  }
})

// Submit del formulario
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Validar todos los campos
  let isValid = true

  if (nameInput.value.trim() === "" || nameInput.value.trim().length < 3) {
    nameError.textContent = "El nombre es requerido y debe tener al menos 3 caracteres"
    isValid = false
  }

  if (companyInput.value.trim() === "") {
    companyError.textContent = "La empresa es requerida"
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Ingrese un correo electrónico válido"
    isValid = false
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "El mensaje debe tener al menos 10 caracteres"
    isValid = false
  }

  if (isValid) {
    // Simular envío exitoso
    formMessage.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto."
    formMessage.className = "form-message success"
    formMessage.style.display = "block"

    // Resetear formulario
    contactForm.reset()

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  } else {
    formMessage.textContent = "Por favor, corrija los errores en el formulario."
    formMessage.className = "form-message error"
    formMessage.style.display = "block"
  }
})

// Smooth scroll para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Particle animation for hero section
const canvas = document.getElementById("particleCanvas")
const ctx = canvas.getContext("2d")

let animationId

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()

const particles = []
const particleCount = 120
const maxDistance = 150

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.7
    this.speedY = (Math.random() - 0.5) * 0.7
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvas.width) this.x = 0
    if (this.x < 0) this.x = canvas.width
    if (this.y > canvas.height) this.y = 0
    if (this.y < 0) this.y = canvas.height
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.shadowBlur = 10
    ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle())
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.15
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = 1
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  connectParticles()

  animationId = requestAnimationFrame(animateParticles)
}

animateParticles()

window.addEventListener("resize", () => {
  resizeCanvas()
})

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId)
  } else {
    animateParticles()
  }
})
