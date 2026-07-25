document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY HEADER & SCROLL EFFECTS
    // ==========================================
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ==========================================
    // 2. MOBILE NAVIGATION HAMBURGER MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 3. SCROLLSPY ACTIVE LINK HIGHLIGHTING
    // ==========================================
    const sections = document.querySelectorAll('section');
    const activeScrollSpy = () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', activeScrollSpy);

    // ==========================================
    // 4. INTERSECTION OBSERVER REVEAL ANIMATIONS
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => observer.observe(reveal));
    } else {
        reveals.forEach(reveal => reveal.classList.add('active'));
    }

    // ==========================================
    // 5. LIGHTBOX MODAL FOR PRODUCTS
    // ==========================================
    const modal = document.getElementById('lightbox-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalSpecs = document.getElementById('modal-specs');
    const modalImgContainer = document.getElementById('modal-img-container');

    const productImages = {
        hospital: "assets/hospital_scrubs.jpg",
        restaurant: "assets/restaurant_uniform.jpg",
        couple_tshirt: "assets/couple_tshirt.jpg",
        corporate_uniform: "assets/corporate_uniform.png",
        sublimation_jersey: "assets/sublimation_jersey.jpg",
        caps: "assets/caps.jpg",
        customized_tshirt: "assets/customized_tshirt.jpg",
        onam_special: "assets/onam_special.png"
    };

    const productDetails = {
        hospital: {
            title: "Hospital Scrubs & Medical Wear",
            desc: "Constructed for frontline medical staff and surgical teams. Antimicrobial stretch weave, standard V-neck, double utility loops, and ergonomic mobility.",
            specs: {
                "Fabric Material": "72% Poly / 21% Rayon / 7% Spandex",
                "Sanitary Shield": "Antimicrobial surface finish",
                "Features": "4 pocket layout, side seam vents",
                "Sizing Range": "XXS to 4XL (Unisex cuts)",
                "Minimum Order": "15 Units"
            }
        },
        restaurant: {
            title: "Restaurant & Chef Uniforms",
            desc: "Tailored for heavy culinary and hotel operations. Heat-resistant, stain-proof, dynamic arm vents, and double-breasted stud closures.",
            specs: {
                "Fabric Material": "65% Polyester / 35% Cotton Twill",
                "Weight Class": "Heavy duty (220 GSM)",
                "Accents": "Removable stud buttons & gold trim",
                "Sizing Range": "S to 3XL (Unisex cuts)",
                "Minimum Order": "15 Units"
            }
        },
        couple_tshirt: {
            title: "Couple T-Shirts",
            desc: "Matching custom graphic t-shirts designed for couples, anniversaries, and photoshoots. Soft bio-washed combed cotton with vivid prints.",
            specs: {
                "Fabric Material": "100% Super Combed Cotton",
                "Print Tech": "HD Screen & DTG Printing",
                "Style": "Matching sets, customized names",
                "Sizing Range": "XS to 3XL",
                "Minimum Order": "10 Sets"
            }
        },
        corporate_uniform: {
            title: "Corporate Uniforms",
            desc: "Executive business suits, blazers, and formal staff attire engineered to reflect corporate identity with sharp tailoring.",
            specs: {
                "Fabric Material": "Poly-Viscose Premium Suit Fabric",
                "Tailoring": "Wrinkle-resistant structured fit",
                "Branding": "Discreet metallic gold embroidery",
                "Sizing Range": "Custom Fit & Standard S to 4XL",
                "Minimum Order": "10 Suits"
            }
        },
        sublimation_jersey: {
            title: "Sublimation Jerseys",
            desc: "Full dye-sublimated activewear for sports teams and leagues. Unlimited color options and crisp graphic detail that won't fade or peel.",
            specs: {
                "Fabric Material": "100% Micro-Mesh Interlock Polyester",
                "Printing Tech": "Full 360-degree Dye Sublimation",
                "Performance": "Moisture-wicking, rapid dry",
                "Sizing Range": "Youth to 5XL",
                "Minimum Order": "10 Units"
            }
        },
        caps: {
            title: "Custom Caps & Headwear",
            desc: "Structured panels, luxury metallic snaps, custom bill embroidery, and 3D puff stitching tailored for brand merchandise.",
            specs: {
                "Fabric Material": "100% Heavy Brushed Cotton Twill",
                "Embroidery": "3D High-density puff stitch",
                "Backing": "Adjustable metallic gold buckle",
                "Sizing Range": "One Size Fits All",
                "Minimum Order": "25 Units"
            }
        },
        customized_tshirt: {
            title: "Customized T-Shirts",
            desc: "Versatile custom printed t-shirts for corporate promotions, college fests, and personal merch with soft premium fabric finish.",
            specs: {
                "Fabric Material": "180 GSM 100% Combed Cotton",
                "Customization": "Screen Printing & Heat Transfer",
                "Shades": "Over 30 fabric choices",
                "Sizing Range": "S to 4XL",
                "Minimum Order": "10 Units"
            }
        },
        onam_special: {
            title: "Onam Special Customization",
            desc: "Festive Kerala cultural attire, Kasavu gold border prints, and Kathakali motifs tailored for Onam celebrations and corporate events.",
            specs: {
                "Fabric Material": "Premium Cotton / Kasavu Trims",
                "Design Elements": "Gold Kasavu borders & screen motifs",
                "Style": "Traditional & fusion festival shirts",
                "Sizing Range": "XS to 4XL (Men, Women, Kids)",
                "Minimum Order": "10 Units"
            }
        }
    };

    window.openLightbox = (productId) => {
        if (!modal || !productDetails[productId]) return;

        const data = productDetails[productId];
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalImgContainer.innerHTML = `<img src="${productImages[productId]}" alt="${data.title}">`;

        modalSpecs.innerHTML = '';
        for (const [key, value] of Object.entries(data.specs)) {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-name">${key}</span>
                <span class="spec-value">${value}</span>
            `;
            modalSpecs.appendChild(specItem);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeLightbox();
    });

    // ==========================================
    // 6. INTERACTIVE BULK QUOTE ESTIMATOR (INR)
    // ==========================================
    const apparelTypeSelect = document.getElementById('apparel-type');
    const apparelQtyInput = document.getElementById('apparel-qty');
    const calcUnitPriceDiv = document.getElementById('calc-unit-price');
    const calcLeadTimeDiv = document.getElementById('calc-lead-time');

    // Base prices in Indian Rupees (INR ₹)
    const basePrices = {
        hospital: 650.00,
        restaurant: 850.00,
        couple_tshirt: 750.00,
        corporate_uniform: 1450.00,
        sublimation_jersey: 550.00,
        caps: 250.00,
        customized_tshirt: 350.00,
        onam_special: 950.00
    };

    const updateEstimate = () => {
        if (!apparelTypeSelect || !apparelQtyInput || !calcUnitPriceDiv || !calcLeadTimeDiv) return;

        const selectedType = apparelTypeSelect.value;
        const quantity = parseInt(apparelQtyInput.value) || 0;

        if (!selectedType || quantity < 10) {
            calcUnitPriceDiv.textContent = '--';
            calcLeadTimeDiv.textContent = '--';
            return;
        }

        const basePrice = basePrices[selectedType] || 500.00;
        let discountMultiplier = 1.0;

        if (quantity >= 25 && quantity <= 99) discountMultiplier = 0.90;
        else if (quantity >= 100 && quantity <= 499) discountMultiplier = 0.80;
        else if (quantity >= 500 && quantity <= 999) discountMultiplier = 0.70;
        else if (quantity >= 1000) discountMultiplier = 0.60;

        const finalUnitPrice = basePrice * discountMultiplier;
        calcUnitPriceDiv.textContent = `₹${finalUnitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        let leadTimeText = "10 Days";
        if (quantity >= 100 && quantity <= 499) leadTimeText = "14 Days";
        else if (quantity >= 500) leadTimeText = "21 Days";
        calcLeadTimeDiv.textContent = leadTimeText;
    };

    if (apparelTypeSelect && apparelQtyInput) {
        apparelTypeSelect.addEventListener('change', updateEstimate);
        apparelQtyInput.addEventListener('input', updateEstimate);
        updateEstimate();
    }

    // ==========================================
    // 7. FORM SUBMISSIONS
    // ==========================================
    const quoteForm = document.getElementById('quote-form');
    const formFeedback = document.getElementById('form-feedback');

    if (quoteForm && formFeedback) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';

            const name = document.getElementById('client-name').value.trim();
            const email = document.getElementById('client-email').value.trim();
            const type = apparelTypeSelect.value;
            const qty = parseInt(apparelQtyInput.value);

            if (!name || !email || !type || isNaN(qty)) {
                formFeedback.classList.add('error');
                formFeedback.textContent = 'Please complete all required fields.';
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formFeedback.classList.add('error');
                formFeedback.textContent = 'Please enter a valid email address.';
                return;
            }

            formFeedback.classList.add('success');
            formFeedback.innerHTML = `<strong>Thank You, ${name}!</strong> Your request for ${qty} items has been received. Our sales executive will email you at <strong>${email}</strong> within 4 hours.`;
            quoteForm.reset();
            updateEstimate();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterFeedback = document.getElementById('newsletter-feedback');

    if (newsletterForm && newsletterFeedback) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newsletterFeedback.style.color = '#ff3b30';
                newsletterFeedback.textContent = 'Please enter a valid email.';
                return;
            }

            newsletterFeedback.style.color = '#4cd964';
            newsletterFeedback.textContent = 'Subscribed successfully!';
            emailInput.value = '';
            setTimeout(() => { newsletterFeedback.textContent = ''; }, 3500);
        });
    }

});
