// WHATSAPP SUBMISSION
document.getElementById("assignmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value.trim();
  const deadline = document.getElementById("deadline").value.trim();
  const details = document.getElementById("details").value.trim();

  if (!name || !service || !deadline) {
    alert("Please fill in all required fields.");
    return;
  }

  const message = `
Hello AZYNIX 👋

Name: ${name}
Service Needed: ${service}
Deadline: ${deadline}

Details:
${details}

I will attach my assignment document here.
`;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/94787541191?text=${encoded}`;
  window.open(url, "_blank");
});

// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// PARTICLES GENERATOR
const container = document.querySelector(".particles");

for (let i = 0; i < 35; i++) {
  const span = document.createElement("span");
  span.style.left = Math.random() * 100 + "%";
  span.style.animationDelay = Math.random() * 10 + "s";
  span.style.animationDuration = 6 + Math.random() * 8 + "s";
  container.appendChild(span);
}

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// TESTIMONIALS CAROUSEL
const testimonialWrapper = document.querySelector('.testimonials-wrapper');
if (testimonialWrapper) {
  const testimonials = Array.from(testimonialWrapper.children);
  
  // Duplicate testimonials for infinite scroll
  testimonials.forEach(testimonial => {
    const clone = testimonial.cloneNode(true);
    testimonialWrapper.appendChild(clone);
  });
}
