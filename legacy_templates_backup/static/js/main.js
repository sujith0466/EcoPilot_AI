// EcoPilot Premium Frontend Interactions

document.addEventListener('DOMContentLoaded', () => {
    console.log('EcoPilot Premium UI Loaded.');

    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('ecopilot-theme', target);
            updateThemeIcon(target);
            
            // Re-render chart if it exists to update grid colors
            if (window.Chart) {
                // Not strictly necessary as CSS vars don't automatically update Chart.js canvas without redraw,
                // but for a true premium feel, one would re-init the chart here. We keep it simple.
            }
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.setAttribute('data-lucide', 'sun');
        } else {
            themeIcon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    }

    // --- Intersection Observer for Fade-Up Animations ---
    const animatedElements = document.querySelectorAll('.animate-fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ensure animation plays by setting animationPlayState if needed, 
                // but CSS handles it automatically when class is present.
                // We just stop observing once it enters.
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter-animate');
    
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'), 10);
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60;
                const totalFrames = Math.round(duration / frameDuration);
                let currentFrame = 0;

                const counter = setInterval(() => {
                    currentFrame++;
                    const progress = currentFrame / totalFrames;
                    const currentVal = Math.round(endValue * progress);
                    
                    // Format with commas
                    target.textContent = currentVal.toLocaleString();

                    if (currentFrame === totalFrames) {
                        clearInterval(counter);
                        target.textContent = endValue.toLocaleString() + (endValue > 100 ? '+' : '%');
                    }
                }, frameDuration);
                
                obs.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
});
