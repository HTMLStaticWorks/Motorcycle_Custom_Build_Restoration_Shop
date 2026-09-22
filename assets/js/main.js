/**
 * IRONVOLT MOTORCYCLES — MAIN JAVASCRIPT
 * Custom Builds / Restoration / Fabrication
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================
  // 1. THEME TOGGLE (Light/Dark Mode)
  // ============================================
  const themeToggles = document.querySelectorAll('.js-theme-toggle');
  const htmlElement = document.documentElement;
  
  // Detect system preference or saved preference
  const savedTheme = localStorage.getItem('iv-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || 'light';
  
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('iv-theme', theme);
    
    // Update toggle icons if they exist (assuming SVG icons inside)
    themeToggles.forEach(toggle => {
      if (theme === 'dark') {
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      } else {
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    });
  };
  
  // Initial apply
  applyTheme(currentTheme);
  
  // Toggle event
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  });

  // ============================================
  // 2. RTL TOGGLE
  // ============================================
  const rtlToggles = document.querySelectorAll('.js-rtl-toggle');
  
  const savedDir = localStorage.getItem('iv-dir');
  let currentDir = savedDir || 'ltr';
  
  const applyDir = (dir) => {
    htmlElement.setAttribute('dir', dir);
    localStorage.setItem('iv-dir', dir);
    
    rtlToggles.forEach(toggle => {
      toggle.innerHTML = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  };
  
  // Initial apply
  applyDir(currentDir);
  
  // Toggle event
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      currentDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDir(currentDir);
    });
  });

  // ============================================
  // 3. NAVIGATION (Sticky, Mobile Drawer)
  // ============================================
  const header = document.querySelector('.iv-header');
  const hamburger = document.querySelector('.iv-hamburger');
  const mobileNav = document.querySelector('.iv-mobile-nav');
  const mobileOverlay = document.querySelector('.iv-mobile-overlay');
  
  // Sticky Header
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
  
  // Mobile Drawer
  const toggleMobileNav = () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };
  
  if (hamburger && mobileNav && mobileOverlay) {
    hamburger.addEventListener('click', toggleMobileNav);
    mobileOverlay.addEventListener('click', toggleMobileNav);
    
    // Explicit close button
    const closeBtns = document.querySelectorAll('.js-mobile-close');
    closeBtns.forEach(btn => btn.addEventListener('click', toggleMobileNav));
    
    // Close on link click
    const mobileLinks = mobileNav.querySelectorAll('.iv-mobile-nav__link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', toggleMobileNav);
    });
    
    // ESC key close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  }

  // ============================================
  // 4. SEARCH OVERLAY
  // ============================================
  const searchToggles = document.querySelectorAll('.js-search-toggle');
  const searchOverlay = document.querySelector('.iv-search');
  
  if (searchOverlay) {
    const searchClose = searchOverlay.querySelector('.iv-search__close');
    const searchInput = searchOverlay.querySelector('.iv-search__input');
    const searchResults = searchOverlay.querySelector('.iv-search__results');
    
    // Dummy search data
    const dummyData = [
      { title: 'Full Motorcycle Restoration', cat: 'Services', url: 'service-details.html' },
      { title: 'Custom Cafe Racer Build', cat: 'Portfolio', url: 'portfolio.html' },
      { title: 'Engine Rebuild Process', cat: 'Services', url: 'services.html' },
      { title: 'Vintage Frame Fabrication', cat: 'Fabrication', url: 'services.html' },
      { title: 'Understanding Build Costs', cat: 'Pricing', url: 'pricing-guide.html' }
    ];
    
    const openSearch = (e) => {
      if (e) e.preventDefault();
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput.focus(), 100);
      document.body.classList.add('no-scroll');
      
      // Close mobile nav if open
      if (mobileNav && mobileNav.classList.contains('open')) {
        toggleMobileNav();
      }
    };
    
    const closeSearch = () => {
      searchOverlay.classList.remove('open');
      searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
      if (!document.querySelector('.iv-modal.active')) { // Keep no-scroll if modal is open
        document.body.classList.remove('no-scroll');
      }
    };
    
    searchToggles.forEach(toggle => {
      toggle.addEventListener('click', openSearch);
    });
    
    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }
    
    // Search logic
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        
        if (val.length < 2) return;
        
        const matches = dummyData.filter(item => 
          item.title.toLowerCase().includes(val) || 
          item.cat.toLowerCase().includes(val)
        );
        
        if (matches.length > 0) {
          matches.forEach(match => {
            const el = document.createElement('a');
            el.href = match.url;
            el.className = 'iv-search__result';
            el.innerHTML = `
              <span class="iv-search__result-title">${match.title}</span>
              <span class="iv-search__result-cat">${match.cat}</span>
            `;
            el.addEventListener('click', closeSearch);
            searchResults.appendChild(el);
          });
        } else {
          searchResults.innerHTML = `<div class="iv-search__result"><span class="iv-search__result-title">No matching machines found.</span></div>`;
        }
      });
    }
    
    // ESC key close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('open')) {
        closeSearch();
      }
    });
  }

  // ============================================
  // 5. PORTFOLIO FILTER (Masonry logic simulated)
  // ============================================
  const filterBtns = document.querySelectorAll('.iv-gallery__filter');
  const galleryItems = document.querySelectorAll('.iv-gallery__item');
  
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ============================================
  // 6. GALLERY LIGHTBOX
  // ============================================
  const lightbox = document.querySelector('.iv-lightbox');
  const lightboxTriggers = document.querySelectorAll('.js-lightbox');
  
  if (lightbox && lightboxTriggers.length > 0) {
    const lightboxImg = lightbox.querySelector('.iv-lightbox__img');
    const lightboxTitle = lightbox.querySelector('.iv-lightbox__caption-title');
    const lightboxCat = lightbox.querySelector('.iv-lightbox__caption-cat');
    const closeBtn = lightbox.querySelector('.iv-lightbox__close');
    const prevBtn = lightbox.querySelector('.iv-lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.iv-lightbox__nav--next');
    
    let currentIndex = 0;
    const itemsArray = Array.from(lightboxTriggers);
    
    const openLightbox = (index) => {
      currentIndex = index;
      const trigger = itemsArray[currentIndex];
      
      // Try to find image source (could be an img tag inside, or data attribute)
      let src = trigger.getAttribute('href');
      if (!src || src === '#') {
        const img = trigger.querySelector('img') || trigger.closest('.iv-gallery__item').querySelector('img');
        if (img) src = img.src;
      }
      
      if (src) lightboxImg.src = src;
      
      // Title and Category
      const title = trigger.getAttribute('data-title') || '';
      const cat = trigger.getAttribute('data-cat') || '';
      
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCat) lightboxCat.textContent = cat;
      
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    };
    
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      if (!document.querySelector('.iv-modal.active')) {
        document.body.classList.remove('no-scroll');
      }
    };
    
    const prevImage = () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemsArray.length - 1;
      openLightbox(currentIndex);
    };
    
    const nextImage = () => {
      currentIndex = (currentIndex < itemsArray.length - 1) ? currentIndex + 1 : 0;
      openLightbox(currentIndex);
    };
    
    // Bind triggers
    itemsArray.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
    });
    
    // Bind controls
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') document.documentElement.dir === 'rtl' ? nextImage() : prevImage();
      if (e.key === 'ArrowRight') document.documentElement.dir === 'rtl' ? prevImage() : nextImage();
    });
    
    // Simple Touch Swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    lightbox.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        document.documentElement.dir === 'rtl' ? prevImage() : nextImage(); // Swiped left
      }
      if (touchEndX > touchStartX + 50) {
        document.documentElement.dir === 'rtl' ? nextImage() : prevImage(); // Swiped right
      }
    };
  }

  // ============================================
  // 7. BEFORE/AFTER SLIDER
  // ============================================
  const baSlider = document.querySelector('.iv-ba-slider');
  
  if (baSlider) {
    const beforeImage = baSlider.querySelector('.iv-ba-slider__before');
    const handle = baSlider.querySelector('.iv-ba-slider__handle');
    let isDragging = false;
    
    const moveSlider = (x) => {
      const rect = baSlider.getBoundingClientRect();
      // Calculate percentage based on RTL or LTR
      let xPos = x - rect.left;
      let percent = Math.max(0, Math.min((xPos / rect.width) * 100, 100));
      
      if (document.documentElement.dir === 'rtl') {
        percent = 100 - percent;
      }
      
      if (document.documentElement.dir === 'rtl') {
         beforeImage.style.width = `100%`;
         beforeImage.style.clipPath = `polygon(${100 - percent}% 0, 100% 0, 100% 100%, ${100 - percent}% 100%)`;
         handle.style.left = `auto`;
         handle.style.right = `${percent}%`;
      } else {
        beforeImage.style.width = `${percent}%`;
        beforeImage.style.clipPath = 'none';
        handle.style.left = `${percent}%`;
        handle.style.right = 'auto';
      }
    };
    
    // Initial setup for RTL if needed
    if (document.documentElement.dir === 'rtl') {
       moveSlider(baSlider.getBoundingClientRect().left + (baSlider.getBoundingClientRect().width / 2));
    }
    
    const startDrag = (e) => {
      isDragging = true;
      e.preventDefault();
    };
    
    const endDrag = () => {
      isDragging = false;
    };
    
    const onDrag = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
      moveSlider(x);
    };
    
    baSlider.addEventListener('mousedown', startDrag);
    baSlider.addEventListener('touchstart', startDrag, {passive: false});
    
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
    
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag, {passive: false});
    
    // Handle RTL toggle specifically for the slider
    rtlToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        setTimeout(() => {
          moveSlider(baSlider.getBoundingClientRect().left + (baSlider.getBoundingClientRect().width / 2));
        }, 50);
      });
    });
  }

  // ============================================
  // 8. PROJECT ESTIMATOR
  // ============================================
  const estimatorForm = document.getElementById('estimatorForm');
  if (estimatorForm) {
    const scopeResult = document.getElementById('estScope');
    const selects = estimatorForm.querySelectorAll('select');
    
    const calculateScope = () => {
      let score = 0;
      selects.forEach(select => {
        score += parseInt(select.value) || 0;
      });
      
      let scopeText = "LIGHT PROJECT SCOPE";
      if (score > 6) scopeText = "MODERATE PROJECT SCOPE";
      if (score > 12) scopeText = "EXTENSIVE PROJECT SCOPE";
      if (score > 18) scopeText = "FULL CUSTOM REBUILD";
      
      if (scopeResult) {
        scopeResult.textContent = scopeText;
        // Simple animation
        scopeResult.style.opacity = '0';
        setTimeout(() => {
          scopeResult.style.opacity = '1';
        }, 150);
      }
    };
    
    selects.forEach(select => {
      select.addEventListener('change', calculateScope);
    });
    
    // Prevent actual submission
    estimatorForm.addEventListener('submit', (e) => e.preventDefault());
  }

  // ============================================
  // 9. SERVICE SELECTOR (Home 2)
  // ============================================
  const selectorTabs = document.querySelectorAll('.iv-build-selector__tab');
  const selectorContents = document.querySelectorAll('.iv-build-selector__content');
  
  if (selectorTabs.length > 0 && selectorContents.length > 0) {
    selectorTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all
        selectorTabs.forEach(t => t.classList.remove('active'));
        selectorContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }
  
  // Parts Table interaction (Home 2)
  const partItems = document.querySelectorAll('.iv-parts-item');
  if (partItems.length > 0) {
    const titleEl = document.getElementById('partTitle');
    const descEl = document.getElementById('partDesc');
    const scopeEl = document.getElementById('partScope');
    const finishEl = document.getElementById('partFinish');
    
    partItems.forEach(item => {
      item.addEventListener('click', () => {
        partItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        if (titleEl) titleEl.textContent = item.getAttribute('data-title');
        if (descEl) descEl.textContent = item.getAttribute('data-desc');
        if (scopeEl) scopeEl.textContent = item.getAttribute('data-scope');
        if (finishEl) finishEl.textContent = item.getAttribute('data-finish');
      });
    });
  }

  // ============================================
  // 10. PROJECT ENQUIRY MODAL & FORM VALIDATION
  // ============================================
  const modalOverlay = document.querySelector('.iv-modal-overlay');
  const enquiryModal = document.getElementById('enquiryModal');
  const modalTriggers = document.querySelectorAll('.js-open-modal');
  const modalCloses = document.querySelectorAll('.iv-modal__close');
  
  const openModal = (e) => {
    if (e) e.preventDefault();
    
    // Check if triggered from a portfolio item to pre-fill
    if (e && e.currentTarget) {
      const projectTitle = e.currentTarget.getAttribute('data-project');
      const msgField = document.getElementById('eqMessage');
      if (projectTitle && msgField) {
        msgField.value = `I'm interested in a build similar to: ${projectTitle}\n\n`;
      }
    }
    
    if (modalOverlay && enquiryModal) {
      modalOverlay.classList.add('active');
      enquiryModal.classList.add('active');
      document.body.classList.add('no-scroll');
      
      // Close mobile nav if open
      if (mobileNav && mobileNav.classList.contains('open')) toggleMobileNav();
    }
  };
  
  const closeModal = () => {
    if (modalOverlay && enquiryModal) {
      modalOverlay.classList.remove('active');
      enquiryModal.classList.remove('active');
      
      // Reset form if exists
      const form = enquiryModal.querySelector('form');
      const successMsg = enquiryModal.querySelector('.iv-modal__success');
      const formBody = enquiryModal.querySelector('.iv-modal__form-body');
      
      setTimeout(() => {
        if (form) form.reset();
        if (successMsg) successMsg.classList.remove('visible');
        if (formBody) formBody.style.display = 'block';
        
        // Remove error classes
        enquiryModal.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        enquiryModal.querySelectorAll('.iv-form__error').forEach(el => el.classList.remove('visible'));
      }, 500); // Wait for transition
      
      if (!lightbox || !lightbox.classList.contains('active')) {
        document.body.classList.remove('no-scroll');
      }
    }
  };
  
  modalTriggers.forEach(btn => btn.addEventListener('click', openModal));
  modalCloses.forEach(btn => btn.addEventListener('click', closeModal));
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  
  // ESC key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && enquiryModal && enquiryModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form Validation (Generic approach for any form with .js-validate)
  const forms = document.querySelectorAll('.js-validate');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const errorMsg = field.nextElementSibling; // Assuming error div follows input
        
        if (!field.value.trim() || (field.type === 'email' && !/\S+@\S+\.\S+/.test(field.value))) {
          isValid = false;
          field.classList.add('error');
          if (errorMsg && errorMsg.classList.contains('iv-form__error')) {
            errorMsg.classList.add('visible');
          }
        } else {
          field.classList.remove('error');
          if (errorMsg && errorMsg.classList.contains('iv-form__error')) {
            errorMsg.classList.remove('visible');
          }
        }
      });
      
      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.classList.add('iv-btn--loading');
        submitBtn.innerHTML = 'SENDING...';
        
        // Simulate API call
        setTimeout(() => {
          submitBtn.classList.remove('iv-btn--loading');
          submitBtn.innerHTML = originalText;
          
          // Show success message if in modal
          const modalBody = form.closest('.iv-modal__form-body');
          const successMsg = form.closest('.iv-modal__body')?.querySelector('.iv-modal__success');
          
          if (modalBody && successMsg) {
            modalBody.style.display = 'none';
            successMsg.classList.add('visible');
          } else {
            // Standalone form (like Contact page)
            form.reset();
            alert('Project Enquiry Received. We will contact you shortly.');
          }
        }, 1500);
      }
    });
    
    // Clear errors on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('iv-form__error')) {
          errorMsg.classList.remove('visible');
        }
      });
    });
  });

  // ============================================
  // 11. FILE UPLOAD PREVIEW
  // ============================================
  const uploadArea = document.querySelector('.iv-upload');
  if (uploadArea) {
    const fileInput = uploadArea.querySelector('.iv-upload__input');
    const previewContainer = uploadArea.parentElement.querySelector('.iv-upload__preview');
    
    // Handle click
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });
    
    uploadArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files);
    });
    
    fileInput.addEventListener('change', function() {
      handleFiles(this.files);
    });
    
    function handleFiles(files) {
      if (!previewContainer) return;
      
      [...files].forEach(file => {
        if (!file.type.startsWith('image/')) {
          alert('Please upload image files only (JPG, PNG, WEBP).');
          return;
        }
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onloadend = () => {
          const thumb = document.createElement('div');
          thumb.className = 'iv-upload__thumb';
          thumb.innerHTML = `
            <img src="${reader.result}" alt="Preview">
            <div class="iv-upload__thumb-remove" aria-label="Remove image">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
          `;
          
          thumb.querySelector('.iv-upload__thumb-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            thumb.remove();
            // In a real app, you'd also remove it from the file input/FormData
          });
          
          previewContainer.appendChild(thumb);
        };
      });
    }
  }

  // ============================================
  // 12. SCROLL REVEAL & TIMELINE ANIMATION
  // ============================================
  // Standard Reveal
  const revealElements = document.querySelectorAll('.iv-reveal');
  
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      });
      
      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
  
  // Home 2 Timeline Animation
  const timelineSteps = document.querySelectorAll('.iv-timeline__step');
  const timelineProgress = document.querySelector('.iv-timeline__progress');
  
  if (timelineSteps.length > 0 && timelineProgress && 'IntersectionObserver' in window) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate progress line
          timelineProgress.style.width = '100%';
          
          // Stagger active class on steps
          timelineSteps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add('active');
            }, 300 + (index * 200));
          });
          
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    timelineObserver.observe(document.querySelector('.iv-timeline'));
  }

  // ============================================
  // 13. BACK TO TOP
  // ============================================
  const backToTop = document.querySelector('.iv-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});


