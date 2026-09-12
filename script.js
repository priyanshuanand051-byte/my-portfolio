// ==========================================================================
// Priyanshu Kumar - Developer Portfolio Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const themeButton = document.getElementById("theme-btn");
    const themeIcon = themeButton ? themeButton.querySelector(".theme-icon") || themeButton : null;
    const menuButton = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const scrollProgress = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("back-to-top");
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const copyTooltip = document.getElementById("copy-tooltip");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const typingTextEl = document.getElementById("typing-text");

    // ==========================================================================
    // 1. Dark / Light Mode with LocalStorage & System Preference
    // ==========================================================================
    const savedTheme = localStorage.getItem("pk-portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add("dark");
        if (themeIcon) themeIcon.textContent = "☀️";
    } else {
        document.body.classList.remove("dark");
        if (themeIcon) themeIcon.textContent = "🌙";
    }

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark");
            localStorage.setItem("pk-portfolio-theme", isDark ? "dark" : "light");
            if (themeIcon) {
                themeIcon.textContent = isDark ? "☀️" : "🌙";
            }
        });
    }

    // ==========================================================================
    // 2. Mobile Menu Toggle & Click-Outside Handling
    // ==========================================================================
    if (menuButton && navLinks) {
        menuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            menuButton.classList.toggle("active");
            navLinks.classList.toggle("show");
        });

        // Close menu when clicking anywhere outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
                menuButton.classList.remove("active");
                navLinks.classList.remove("show");
            }
        });

        // Close menu after clicking any nav link
        const navItems = navLinks.querySelectorAll("a");
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                menuButton.classList.remove("active");
                navLinks.classList.remove("show");
            });
        });
    }

    // ==========================================================================
    // 3. Scroll Progress Bar & Back-to-Top Button
    // ==========================================================================
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 350) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================================================
    // 4. Active Navigation Scrollspy
    // ==========================================================================
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navAnchors.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    // ==========================================================================
    // 5. Dynamic Typing Animation
    // ==========================================================================
    if (typingTextEl) {
        const phrases = [
            "Robust Java Backend Systems",
            "Scalable Spring Boot APIs",
            "Intelligent AI & RAG Solutions",
            "Clean, Reliable Software"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 95;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end of typing
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase after delete
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }

        setTimeout(typeLoop, 500);
    }

    // ==========================================================================
    // 6. Toast Notification System
    // ==========================================================================
    const toastContainer = document.getElementById("toast-container");

    function showToast(message, icon = "✓") {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = "toast-message";
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("toast-fadeout");
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2800);
    }

    // ==========================================================================
    // 7. Interactive IDE Code Window (Tabs & Copy)
    // ==========================================================================
    const codeTabBtns = document.querySelectorAll(".code-tab-btn");
    const codeTabContents = document.querySelectorAll(".code-tab-content");
    const copyCodeBtn = document.getElementById("copy-code-btn");

    codeTabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetTabId = btn.getAttribute("data-tab");

            codeTabBtns.forEach((b) => b.classList.remove("active"));
            codeTabContents.forEach((content) => content.classList.remove("active"));

            btn.classList.add("active");
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener("click", () => {
            const activeTabContent = document.querySelector(".code-tab-content.active");
            if (activeTabContent) {
                const codeText = activeTabContent.innerText;
                navigator.clipboard.writeText(codeText).then(() => {
                    showToast("Code snippet copied to clipboard!", "💻");
                }).catch(() => {
                    showToast("Press Ctrl+C to copy code", "ℹ️");
                });
            }
        });
    }

    // ==========================================================================
    // 8. Interactive Project Category Filtering
    // ==========================================================================
    const filterBtns = document.querySelectorAll(".project-filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filterValue = btn.getAttribute("data-filter");

            // Update active filter button
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Filter project cards
            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }
            });
        });
    });

    // ==========================================================================
    // 9. Copy Email to Clipboard
    // ==========================================================================
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            const email = "priyanshuanand051@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                if (copyTooltip) {
                    copyTooltip.textContent = "Copied!";
                    copyTooltip.classList.add("active");
                    setTimeout(() => {
                        copyTooltip.textContent = "Copy";
                        copyTooltip.classList.remove("active");
                    }, 2000);
                }
                showToast("Email copied: priyanshuanand051@gmail.com", "📋");
            }).catch(() => {
                showToast("Press Ctrl+C to copy", "ℹ️");
            });
        });
    }

    // ==========================================================================
    // 10. Interactive Contact Form
    // ==========================================================================
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const subject = document.getElementById("subject")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.style.color = "#ef4444";
                    formStatus.textContent = "Please fill in all required fields.";
                }
                showToast("Please fill in all required fields.", "⚠️");
                return;
            }

            // Construct mailto link so user's email client prepares the draft
            const mailtoUrl = `mailto:priyanshuanand051@gmail.com?subject=${encodeURIComponent(
                `[Portfolio Contact] ${subject}`
            )}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;

            if (formStatus) {
                formStatus.style.color = "#10b981";
                formStatus.textContent = "Opening your email client to send message...";
            }
            showToast("Opening email client draft...", "🚀");

            setTimeout(() => {
                window.location.href = mailtoUrl;
                contactForm.reset();
                if (formStatus) {
                    setTimeout(() => {
                        formStatus.textContent = "Thank you! I will get back to you soon.";
                    }, 1500);
                }
            }, 600);
        });
    }
});