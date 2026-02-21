(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // ----- 1. THEME TOGGLE (sun/moon) -----
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    function updateThemeIcon() {
      if (body.classList.contains('dark')) {
        themeIcon.className = 'fas fa-moon';   // moon when dark
      } else {
        themeIcon.className = 'fas fa-sun';     // sun when light
      }
    }

    // initial icon state
    updateThemeIcon();

    themeBtn.addEventListener('click', function() {
      body.classList.toggle('dark');
      updateThemeIcon();
    });

    // ----- 2. SIDEBAR COLLAPSE (chevron left/right) -----
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = document.getElementById('toggleIcon');

    function updateSidebarIcon() {
      if (sidebar.classList.contains('collapsed')) {
        toggleIcon.className = 'fas fa-chevron-right';  // collapsed → expand icon
      } else {
        toggleIcon.className = 'fas fa-chevron-left';   // expanded → collapse icon
      }
    }

    updateSidebarIcon();

    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      updateSidebarIcon();
    });

    // ----- 3. DROPDOWN GROUPS (expand/collapse) -----
    const groupHeaders = document.querySelectorAll('.sidebar-group-header');
    
    groupHeaders.forEach(header => {
      const targetId = header.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const arrow = header.querySelector('.group-arrow');

      // Initially expanded (content visible, arrow down)
      content.style.display = 'block';
      arrow.classList.remove('fa-chevron-right');
      arrow.classList.add('fa-chevron-down');
      
      header.addEventListener('click', function(e) {
        e.preventDefault(); // avoid any button submit
        
        // Toggle content visibility
        if (content.style.display === 'none') {
          content.style.display = 'block';
          arrow.classList.remove('fa-chevron-right');
          arrow.classList.add('fa-chevron-down');
        } else {
          content.style.display = 'none';
          arrow.classList.remove('fa-chevron-down');
          arrow.classList.add('fa-chevron-right');
        }
      });
    });

    // ----- 4. IFRAME HANDLING: show iframe and hide placeholder on link click -----
    const placeholder = document.getElementById('eggPlaceholder');
    const toolFrame = document.getElementById('toolFrame');
    
    // Select all sidebar links (including those inside groups, but not group headers)
    const toolLinks = document.querySelectorAll('.sidebar-nav a');
    
    function showIframeAndHidePlaceholder() {
      if (placeholder.style.display !== 'none') {
        placeholder.style.display = 'none';
        toolFrame.style.display = 'block';
      }
    }

    toolLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // If the link has an empty href (like "scripts"), prevent default to avoid page reload
        if (this.getAttribute('href') === '') {
          e.preventDefault();
          // Optionally, you could load a default page or do nothing.
          // For now, we just show iframe with its current content (if any).
        }
        showIframeAndHidePlaceholder();
      });
    });

    // Also, if the iframe loads a page (e.g., after a click), ensure placeholder is hidden
    toolFrame.addEventListener('load', function() {
      // Only hide if the iframe actually has a valid src (not about:blank)
      if (toolFrame.contentWindow.location.href !== 'about:blank') {
        showIframeAndHidePlaceholder();
      }
    });

    // ----- 5. EASTER EGG: infinity spin & expand -----
    const infinityIcon = document.getElementById('infinityIcon');
    let eggTimeout = null;

    function runEggAnimation() {
      if (eggTimeout) {
        clearTimeout(eggTimeout);
        eggTimeout = null;
      }
      placeholder.classList.remove('egg');
      void placeholder.offsetWidth; // force reflow
      placeholder.classList.add('egg');
      eggTimeout = setTimeout(() => {
        placeholder.classList.remove('egg');
        eggTimeout = null;
      }, 1500);
    }

    infinityIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      runEggAnimation();
    });
  });
})();