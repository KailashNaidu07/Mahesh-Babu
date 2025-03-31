document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
    
  // Enhanced Navbar Blur Effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 10) {
      navbar.classList.add('scrolled');
      
      // Dynamic blur based on scroll position (max 10px blur)
      const blurAmount = Math.min(10, scrollPosition / 20);
      navbar.style.backdropFilter = `blur(${blurAmount}px)`;
      navbar.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
      
      // Dynamic opacity (gets darker as you scroll)
      const opacity = Math.min(0.8, scrollPosition / 500);
      navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  } else {
      navbar.classList.remove('scrolled');
      navbar.style.backdropFilter = 'blur(2px)';
      navbar.style.webkitBackdropFilter = 'blur(2px)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }
});
    
    // Counter Animation
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      const speed = 200;
      
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animateCounters, 1);
        } else {
          counter.innerText = target;
        }
      });
    };
    
    // Initialize counters when section is in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    if (statsSection) {
      observer.observe(statsSection);
    }
    
    // Read More Button
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreBio = document.getElementById('moreBio');
    
    if (readMoreBtn && moreBio) {
      readMoreBtn.addEventListener('click', () => {
        moreBio.style.display = moreBio.style.display === 'block' ? 'none' : 'block';
        readMoreBtn.textContent = moreBio.style.display === 'block' ? 'Read Less' : 'Read More';
      });
    }
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Form submission
    const fanForm = document.getElementById('fanForm');
    if (fanForm) {
      fanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For this example, we'll just show an alert
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        
        // Reset form
        fanForm.reset();
      });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
        this.querySelector('input').value = '';
      });
    }
    
    // Initialize lightbox for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${imgSrc}" alt="Enlarged view">
            <span class="close-lightbox">&times;</span>
          </div>
        `;
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
          lightbox.remove();
        });
        
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox) {
            lightbox.remove();
          }
        });
      });
    });
    
    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  });

  // Auto-Scrolling Hero Slider
function initAutoHeroSlider() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  let currentSlide = 0;
  const slideDuration = 5000; // 5 seconds
  
  // Function to change slides
  function changeSlide() {
      // Remove active class from current slide
      slides[currentSlide].classList.remove('active');
      
      // Move to next slide (loop back to 0 if at end)
      currentSlide = (currentSlide + 1) % slides.length;
      
      // Add active class to new current slide
      slides[currentSlide].classList.add('active');
  }
  
  // Start the auto-slide timer
  let slideInterval = setInterval(changeSlide, slideDuration);
  
  // Pause on hover (optional)
  const slider = document.querySelector('.hero-slider');
  slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(changeSlide, slideDuration);
  });
}

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutoHeroSlider);