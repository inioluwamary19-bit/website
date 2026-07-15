document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM Elements =====
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const bookBtn = document.getElementById("bookBtn");
  const contactForm = document.getElementById("contactForm");
  const sidebarLinks = document.querySelectorAll(".sidebar-links a, .sidebar-btn");
  const navLinks = document.querySelectorAll(".nav-links a");

  // ===== Open Sidebar =====
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  });

  // ===== Close Sidebar Function =====
  const closeMenu = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  };

  // ===== Close Menu Event Listeners =====
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  sidebarLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // ===== Smooth Scroll Navigation =====
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          // Update active link
          navLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  });

  // ===== Book Now Button =====
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        document.getElementById("name").focus();
      }
    });
  }

  // ===== Contact Form Submission =====
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const clientName = document.getElementById("name").value;
      const clientEmail = document.getElementById("email").value;
      const eventDate = document.getElementById("eventDate").value;
      const guestCount = document.getElementById("guestCount").value;
      const message = document.getElementById("message").value;

      // Validate form
      if (!clientName || !clientEmail || !eventDate || !guestCount) {
        alert("Please fill in all required fields.");
        return;
      }

      // Show success message
      alert(
        `Thank you, ${clientName}!\n\nYour catering inquiry has been received.\nEvent Date: ${eventDate}\nGuests: ${guestCount}\n\nWe will contact you at ${clientEmail} within 24 hours.`
      );

      // Reset form
      contactForm.reset();

      // Optional: Here you would typically send the data to a server
      console.log({
        name: clientName,
        email: clientEmail,
        eventDate: eventDate,
        guestCount: guestCount,
        message: message
      });
    });
  }

  // ===== Active Navigation on Scroll =====
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // ===== Scroll to Top Behavior =====
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #8c6239;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  `;

  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  scrollToTopBtn.addEventListener("mouseenter", () => {
    scrollToTopBtn.style.transform = "scale(1.1)";
  });

  scrollToTopBtn.addEventListener("mouseleave", () => {
    scrollToTopBtn.style.transform = "scale(1)";
  });

  // ===== Form Input Styling =====
  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");
  formInputs.forEach(input => {
    input.addEventListener("focus", () => {
      input.style.borderColor = "#8c6239";
    });

    input.addEventListener("blur", () => {
      input.style.borderColor = "#d8cbbf";
    });
  });

  // ===== Gallery Image Lightbox (Optional Enhancement) =====
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const alt = img.getAttribute("alt");
      console.log(`Gallery image clicked: ${alt}`);
      // You can add lightbox modal functionality here
    });
  });

  // ===== Animate Elements on Scroll =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".service-card, .menu-card, .gallery-item, .testimonial-card");
  animatedElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });

  // ===== Mobile Menu Item Active State =====
  const mobileMenuItems = document.querySelectorAll(".sidebar-links a");
  mobileMenuItems.forEach(item => {
    item.addEventListener("click", function() {
      mobileMenuItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  console.log("Harvest Catering website initialized successfully!");
});
