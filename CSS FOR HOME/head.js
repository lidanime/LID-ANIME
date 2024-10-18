const header = document.getElementById('sticky-header');
      const menuToggle = document.querySelector('.menu-toggle');
      const navUl = document.querySelector('nav ul');
      let lastScrollTop = 0;
      let scrollCount = 0;

      window.addEventListener('scroll', () => {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          if (scrollTop > lastScrollTop) {
              // Scrolling down
              scrollCount++;
              if (scrollCount >= 2) {
                  header.classList.add('hidden');
              }
          } else {
              // Scrolling up
              header.classList.remove('hidden');
              scrollCount = 0;
          }

          if (scrollTop > 50) {
              header.classList.add('rounded');
          } else {
              header.classList.remove('rounded');
          }

          lastScrollTop = scrollTop;
      });

      menuToggle.addEventListener('click', () => {
          navUl.classList.toggle('show');
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
              });
          });
      });

      // Intersection Observer for fade-in animation
      const fadeElems = document.querySelectorAll('.fade-in');
      const appearOptions = {
          threshold: 0.5,
          rootMargin: "0px 0px -100px 0px"
      };

      const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
          entries.forEach(entry => {
              if (!entry.isIntersecting) {
                  return;
              } else {
                  entry.target.classList.add('appear');
                  appearOnScroll.unobserve(entry.target);
              }
          });
      }, appearOptions);

      fadeElems.forEach(elem => {
          appearOnScroll.observe(elem);
      });

      // Dynamic year for copyright
      document.querySelector('footer p:nth-child(2)').textContent = `Lid Anime, © ${new Date().getFullYear()}`;

      const themeToggle = document.getElementById('theme-toggle');

      // Theme toggle functionality
      function toggleTheme() {
          document.body.classList.toggle('light-mode');
          const themeToggles = document.querySelectorAll('.theme-toggle');
          const isDarkMode = !document.body.classList.contains('light-mode');

          themeToggles.forEach(toggle => {
              const icon = toggle.querySelector('i');
              if (isDarkMode) {
                  icon.classList.remove('fa-sun');
                  icon.classList.add('fa-moon');
                  toggle.querySelector('span').textContent = ' Dark Mode';
              } else {
                  icon.classList.remove('fa-moon');
                  icon.classList.add('fa-sun');
                  toggle.querySelector('span').textContent = ' Light Mode';
              }
          });

          localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      }

      // Apply the saved theme on page load
      document.addEventListener('DOMContentLoaded', () => {
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme === 'light') {
              toggleTheme();
          }

          // Add click event listeners to all theme toggle buttons
          const themeToggles = document.querySelectorAll('.theme-toggle');
          themeToggles.forEach(toggle => {
              toggle.addEventListener('click', toggleTheme);
          });
      });

      // Fix iframe scrolling on mobile devices
      function handleIframeHeight() {
          const iframes = document.querySelectorAll('.iframe-container iframe');
          iframes.forEach(iframe => {
              iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
          });
      }

      window.addEventListener('load', handleIframeHeight);
      window.addEventListener('resize', handleIframeHeight);