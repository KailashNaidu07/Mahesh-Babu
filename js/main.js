document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');
  
  if (hamburger && navLinks) {
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
  }

  // ======================
  // Enhanced Navbar Effect
  // ======================
  window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
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

  // ======================
  // Movie Filter Functionality
  // ======================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const movieCards = document.querySelectorAll('.movie-card');

  if (filterButtons.length && movieCards.length) {
      filterButtons.forEach(button => {
          button.addEventListener('click', function() {
              // Remove active class from all buttons
              filterButtons.forEach(btn => btn.classList.remove('active'));
              // Add active class to clicked button
              this.classList.add('active');
              
              const filterValue = this.getAttribute('data-filter').toLowerCase();
              
              // Filter movies
              movieCards.forEach(card => {
                  const categories = card.getAttribute('data-category').toLowerCase().split(' ');
                  
                  if (filterValue === 'all' || categories.includes(filterValue)) {
                      card.style.display = 'block';
                      setTimeout(() => {
                          card.style.opacity = '1';
                          card.style.transform = 'translateY(0)';
                      }, 50);
                  } else {
                      card.style.opacity = '0';
                      card.style.transform = 'translateY(20px)';
                      setTimeout(() => {
                          card.style.display = 'none';
                      }, 300);
                  }
              });
          });
      });
  }

  // ======================
  // Animated Counters
  // ======================
  function animateCounters() {
      const counters = document.querySelectorAll('.counter');
      const statsSection = document.querySelector('.stats');

      if (!statsSection || !counters.length) return;

      counters.forEach(counter => {
          if (!counter.dataset.animated) {
              counter.dataset.animated = "true";
              const target = +counter.getAttribute('data-target');
              const duration = 2000; // Animation duration in ms
              const startTime = performance.now();
              
              function updateCount(currentTime) {
                  const elapsedTime = currentTime - startTime;
                  const progress = Math.min(elapsedTime / duration, 1);
                  const currentCount = Math.floor(progress * target);
                  
                  counter.textContent = currentCount.toLocaleString();
                  
                  if (progress < 1) {
                      requestAnimationFrame(updateCount);
                  } else {
                      counter.textContent = target.toLocaleString();
                  }
              }
              
              requestAnimationFrame(updateCount);
          }
      });
  }

  // Initialize counters when section is in view
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateCounters();
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.3 });
      
      observer.observe(statsSection);
  }

  // ======================
  // Read More Button
  // ======================
  const readMoreBtn = document.getElementById('readMoreBtn');
  const moreBio = document.getElementById('moreBio');
  
  if (readMoreBtn && moreBio) {
      readMoreBtn.addEventListener('click', () => {
          const isExpanded = moreBio.style.display === 'block';
          moreBio.style.display = isExpanded ? 'none' : 'block';
          readMoreBtn.textContent = isExpanded ? 'Read More' : 'Read Less';
          
          // Smooth scroll to maintain context
          if (!isExpanded) {
              setTimeout(() => {
                  readMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 100);
          }
      });
  }
  
  // ======================
  // Smooth Scrolling
  // ======================
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
  
  // ======================
  // Form Handling
  // ======================
  const fanForm = document.getElementById('fanForm');
  if (fanForm) {
      fanForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          
          // Simple validation
          if (!name || !email || !message) {
              alert('Please fill in all fields');
              return;
          }
          
          // Here you would typically send the data to a server
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
          
          const emailInput = this.querySelector('input');
          const email = emailInput.value;
          
          if (!email) {
              alert('Please enter your email address');
              return;
          }
          
          alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
          emailInput.value = '';
      });
  }
  
  // ======================
  // Lightbox Gallery
  // ======================
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
      item.addEventListener('click', function() {
          const imgSrc = this.querySelector('img').src;
          const imgAlt = this.querySelector('img').alt;
          const lightbox = document.createElement('div');
          lightbox.className = 'lightbox';
          lightbox.innerHTML = `
              <div class="lightbox-content">
                  <img src="${imgSrc}" alt="${imgAlt}">
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
          
          // Close with ESC key
          document.addEventListener('keydown', function closeOnEsc(e) {
              if (e.key === 'Escape') {
                  lightbox.remove();
                  document.removeEventListener('keydown', closeOnEsc);
              }
          });
      });
  });
  
  // ======================
  // Back to Top Button
  // ======================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
              backToTop.style.opacity = '1';
              backToTop.style.visibility = 'visible';
          } else {
              backToTop.style.opacity = '0';
              backToTop.style.visibility = 'hidden';
          }
      });
      
      backToTop.addEventListener('click', () => {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }

  // ======================
  // Hero Slider
  // ======================
  function initAutoHeroSlider() {
      const slides = document.querySelectorAll('.hero-slider .slide');
      if (!slides.length) return;
      
      let currentSlide = 0;
      const slideDuration = 5000; // 5 seconds
      
      // Initialize first slide
      slides[currentSlide].classList.add('active');
      
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
      
      // Pause on hover
      const slider = document.querySelector('.hero-slider');
      slider.addEventListener('mouseenter', () => {
          clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', () => {
          slideInterval = setInterval(changeSlide, slideDuration);
      });
  }

  // Initialize the slider
  initAutoHeroSlider();
});