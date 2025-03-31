// Optimized version of your JS with improvements
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM references
    const DOM = {
      hamburger: document.querySelector('.hamburger'),
      navLinks: document.querySelector('.nav-links'),
      navItems: document.querySelectorAll('.nav-links li'),
      navbar: document.querySelector('.navbar'),
      filterButtons: document.querySelectorAll('.filter-btn'),
      movieCards: document.querySelectorAll('.movie-card'),
      statsSection: document.querySelector('.stats'),
      counters: document.querySelectorAll('.counter'),
      readMoreBtn: document.getElementById('readMoreBtn'),
      moreBio: document.getElementById('moreBio'),
      fanForm: document.getElementById('fanForm'),
      newsletterForm: document.querySelector('.newsletter-form'),
      backToTop: document.querySelector('.back-to-top'),
      heroSlider: document.querySelector('.hero-slider'),
      slides: document.querySelectorAll('.hero-slider .slide')
    };
  
    // ======================
    // Mobile Navigation
    // ======================
    if (DOM.hamburger && DOM.navLinks) {
      const toggleNav = () => {
        DOM.navLinks.classList.toggle('active');
        DOM.hamburger.classList.toggle('active');
      };
  
      DOM.hamburger.addEventListener('click', toggleNav);
      
      DOM.navItems.forEach(item => {
        item.addEventListener('click', () => {
          DOM.navLinks.classList.remove('active');
          DOM.hamburger.classList.remove('active');
        });
      });
    }
  
    // ======================
    // Enhanced Navbar Effect (with debounce)
    // ======================
    if (DOM.navbar) {
      let lastScrollY = window.scrollY;
      let ticking = false;
  
      const updateNavbar = () => {
        const scrollY = window.scrollY;
        const scrolledClass = 'scrolled';
        
        if (scrollY > 10) {
          DOM.navbar.classList.add(scrolledClass);
          
          const blurAmount = Math.min(10, scrollY / 20);
          const opacity = Math.min(0.8, scrollY / 500);
          
          DOM.navbar.style.cssText = `
            backdrop-filter: blur(${blurAmount}px);
            -webkit-backdrop-filter: blur(${blurAmount}px);
            background-color: rgba(0, 0, 0, ${opacity});
          `;
        } else {
          DOM.navbar.classList.remove(scrolledClass);
          DOM.navbar.style.cssText = `
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            background-color: rgba(255, 255, 255, 0.1);
          `;
        }
        
        ticking = false;
      };
  
      const onScroll = () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(updateNavbar);
          ticking = true;
        }
      };
  
      window.addEventListener('scroll', onScroll);
    }
  
    // ======================
    // Movie Filter Functionality
    // ======================
    if (DOM.filterButtons.length && DOM.movieCards.length) {
      const filterMovies = (filterValue) => {
        DOM.movieCards.forEach(card => {
          const categories = card.dataset.category.toLowerCase().split(' ');
          const shouldShow = filterValue === 'all' || categories.includes(filterValue);
          
          if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      };
  
      DOM.filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          filterMovies(this.dataset.filter.toLowerCase());
        });
      });
    }
  
    // ======================
    // Optimized Counter Animation
    // ======================
    if (DOM.statsSection && DOM.counters.length) {
      const animateCounter = (counter, target, duration = 2000) => {
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          counter.textContent = Math.floor(progress * target).toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        
        requestAnimationFrame(updateCount);
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            DOM.counters.forEach(counter => {
              if (!counter.dataset.animated) {
                counter.dataset.animated = "true";
                animateCounter(counter, +counter.dataset.target);
              }
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(DOM.statsSection);
    }
  
    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // ======================
    // Back to Top Button
    // ======================
    if (DOM.backToTop) {
      window.addEventListener('scroll', () => {
        DOM.backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
        DOM.backToTop.style.visibility = window.scrollY > 300 ? 'visible' : 'hidden';
      });
      
      DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // ======================
    // Optimized Hero Slider
    // ======================
    if (DOM.heroSlider && DOM.slides.length) {
      let currentSlide = 0;
      let slideInterval;
      const slideDuration = 5000;
      
      const changeSlide = () => {
        DOM.slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % DOM.slides.length;
        DOM.slides[currentSlide].classList.add('active');
      };
      
      const startSlider = () => {
        DOM.slides[currentSlide].classList.add('active');
        slideInterval = setInterval(changeSlide, slideDuration);
      };
      
      DOM.heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
      DOM.heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(changeSlide, slideDuration);
      });
      
      startSlider();
    }
  });