document.addEventListener('DOMContentLoaded', () => {
    // 0. Check Login State Simulation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'loggedin') {
        const loginBtn = document.querySelector('.nav-login-item');
        if (loginBtn) {
            loginBtn.innerHTML = `
                <div class="user-profile-nav">
                    <a href="#" class="btn-login-nav">
                        <i class="fas fa-user-circle"></i> Akun Saya
                    </a>
                    <div class="profile-dropdown">
                        <a href="#"><i class="fas fa-cog"></i> Pengaturan</a>
                        <a href="index.html"><i class="fas fa-sign-out-alt"></i> Keluar</a>
                    </div>
                </div>
            `;
        }
    }

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Sticky Header on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Active Link Switching based on Scroll Position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Number Animation for Statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current).toLocaleString('id-ID');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target.toLocaleString('id-ID');
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                animateNumbers();
                hasAnimated = true;
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // 5. Profile Tabs
    const profileNav = document.getElementById('profileNav');
    if (profileNav) {
        const navItems = profileNav.querySelectorAll('li');
        const panes = document.querySelectorAll('.profile-pane');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active from all
                navItems.forEach(n => n.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));

                // Add active to clicked
                item.classList.add('active');
                const targetId = item.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
});
