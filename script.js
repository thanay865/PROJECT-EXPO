/**
 * BookEase 2.0 - Core Application Logic
 */

// --- SERVICES DATABASE ---
const SERVICES_DATA = [
    {
        id: "srv-1",
        title: "The Grand Royal Palace & Spa",
        category: "hotels",
        location: "Udaipur, Rajasthan",
        price: 4500,
        unit: "night",
        rating: 4.9,
        reviewsCount: 142,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Opulent lakeside heritage resort featuring private pools, royal spa therapies, and world-class dining.",
        amenities: ["Lake View", "Free Breakfast", "Infinity Pool", "Spa & Wellness", "Free WiFi"],
        badge: "👑 Top Rated"
    },
    {
        id: "srv-2",
        title: "Skyline Rooftop Bistro & Lounge",
        category: "dining",
        location: "Indiranagar, Bengaluru",
        price: 850,
        unit: "person",
        rating: 4.8,
        reviewsCount: 310,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Pan-Asian gourmet delicacies paired with artisanal cocktails overlooking scenic city lights.",
        amenities: ["Rooftop View", "Live Jazz", "Valet Parking", "Craft Cocktails", "Open Air"],
        badge: "✨ Popular"
    },
    {
        id: "srv-3",
        title: "Grand Symphony Arena & Hall",
        category: "events",
        location: "Bandra Kurla, Mumbai",
        price: 15000,
        unit: "day",
        rating: 4.9,
        reviewsCount: 88,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        description: "State-of-the-art acoustic convention hall suited for gala weddings, musical events, and tech summits.",
        amenities: ["500+ Seating", "Dolby Atmos Audio", "Green Rooms", "Catering Kitchen", "LED Wall"],
        badge: "🎉 Featured"
    },
    {
        id: "srv-4",
        title: "Ananda Serenity Ayurvedic Spa",
        category: "wellness",
        location: "Rishikesh, Uttarakhand",
        price: 2200,
        unit: "session",
        rating: 4.95,
        reviewsCount: 180,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        description: "Holistic wellness therapies, authentic Himalayan aromatherapy, and guided yoga sessions.",
        amenities: ["Herbal Bath", "Steam Sauna", "Certified Therapists", "Organic Tea Bar", "River View"],
        badge: "🌿 Wellness Choice"
    },
    {
        id: "srv-5",
        title: "Azure Beachfront Villa & Suites",
        category: "hotels",
        location: "Candolim, Goa",
        price: 5800,
        unit: "night",
        rating: 4.7,
        reviewsCount: 220,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Private sea-facing villas with direct beach access, personal sundecks, and sunset barbecue.",
        amenities: ["Private Beach", "Barbecue Grill", "Airport Shuttle", "Cocktail Bar", "Free WiFi"],
        badge: "🌊 Beachfront"
    },
    {
        id: "srv-6",
        title: "Le Petit Parisien Fine Dining",
        category: "dining",
        location: "Connaught Place, New Delhi",
        price: 1200,
        unit: "person",
        rating: 4.85,
        reviewsCount: 165,
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
        description: "Michelin-inspired French tasting menu paired with international vintage wines and candlelight ambiance.",
        amenities: ["Sommelier Service", "Private Dining Room", "Candlelight", "Vegan Options"],
        badge: "🍷 Gourmet"
    },
    {
        id: "srv-7",
        title: "Desert Mirage Glamping & Safari",
        category: "events",
        location: "Sam Sand Dunes, Jaisalmer",
        price: 4200,
        unit: "person",
        rating: 4.8,
        reviewsCount: 94,
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
        description: "Luxury Swiss tent stays under the starry desert sky with camel safaris and folk cultural nights.",
        amenities: ["Dune Safari", "Folk Dance Night", "Stargazing Telescope", "Buffet Dinner"],
        badge: "⭐ Unforgettable"
    },
    {
        id: "srv-8",
        title: "Innov8 Executive Co-working Hub",
        category: "events",
        location: "Cyber City, Gurugram",
        price: 1800,
        unit: "day",
        rating: 4.75,
        reviewsCount: 140,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        description: "Ergonomic high-speed workspace with meeting pods, conference facilities, and unlimited artisan coffee.",
        amenities: ["1Gbps Internet", "Video Conference Pods", "Barista Coffee", "Printing Station"],
        badge: "💼 Business"
    }
];

// --- APP STATE ---
let currentFilterCategory = "all";
let currentSearchQuery = "";
let currentSortBy = "featured";
let currentBookingService = null;
let appliedDiscountPercent = 0;
let appliedDiscountFixed = 0;
let activeCouponCode = "";

// Sample Coupons
const COUPONS = {
    "WELCOME20": { type: "percent", value: 20, desc: "20% OFF Welcome Bonus" },
    "EASE500": { type: "fixed", value: 500, desc: "₹500 Flat Discount" },
    "EXPO10": { type: "percent", value: 10, desc: "10% OFF Expo Special" }
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSampleData();
    renderServices();
    displayBookings();
    updateBookingStats();
    setupEventListeners();
    updateUserInterface();
});

// --- THEME ENGINE ---
function initTheme() {
    const savedTheme = localStorage.getItem("bookease_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("bookease_theme", newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`, "info");
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
        themeBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
    }
}

// --- SAMPLE DATA INITIALIZER ---
function initSampleData() {
    const existing = localStorage.getItem("bookings");
    if (!existing || JSON.parse(existing).length === 0) {
        const sampleBookings = [
            {
                id: "BE-7291",
                service: "The Grand Royal Palace & Spa",
                category: "hotels",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                location: "Udaipur, Rajasthan",
                name: "Rohit Sharma",
                email: "rohit@example.com",
                phone: "+91 98765 43210",
                date: "2026-09-15",
                time: "14:00",
                guests: 2,
                duration: 2,
                basePrice: 4500,
                addonsTotal: 500,
                discount: 900,
                taxes: 810,
                totalPrice: 8910,
                status: "confirmed",
                createdAt: new Date().toISOString()
            },
            {
                id: "BE-5832",
                service: "Skyline Rooftop Bistro & Lounge",
                category: "dining",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                location: "Indiranagar, Bengaluru",
                name: "Rohit Sharma",
                email: "rohit@example.com",
                phone: "+91 98765 43210",
                date: "2026-09-20",
                time: "20:00",
                guests: 4,
                duration: 1,
                basePrice: 850,
                addonsTotal: 300,
                discount: 0,
                taxes: 370,
                totalPrice: 4070,
                status: "confirmed",
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem("bookings", JSON.stringify(sampleBookings));
    }
}

// --- RENDER SERVICES ---
function renderServices() {
    const container = document.getElementById("servicesGrid");
    if (!container) return;

    let filtered = SERVICES_DATA.filter(item => {
        const matchCategory = (currentFilterCategory === "all" || item.category === currentFilterCategory);
        const matchSearch = currentSearchQuery === "" || 
            item.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(currentSearchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Sorting
    if (currentSortBy === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSortBy === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // Results count
    const countEl = document.getElementById("resultsCount");
    if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${SERVICES_DATA.length} experiences`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border);">
                <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
                <h3>No matching experiences found</h3>
                <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting your search terms or category filter</p>
                <button onclick="resetFilters()" style="margin-top: 16px; padding: 8px 18px; background: var(--primary); color: white; border: none; border-radius: var(--radius-full); cursor: pointer; font-weight: 600;">Reset Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(srv => `
        <div class="service-card">
            <div class="card-image-wrap">
                <img src="${srv.image}" alt="${srv.title}" loading="lazy" />
                <span class="card-category-badge">
                    ${getCategoryIcon(srv.category)} ${capitalize(srv.category)}
                </span>
                <span class="card-rating-badge">
                    <span class="star">★</span> ${srv.rating} (${srv.reviewsCount})
                </span>
            </div>
            
            <div class="card-body">
                <div class="card-location">
                    📍 ${srv.location}
                </div>
                <h3>${srv.title}</h3>
                <p class="card-desc">${srv.description}</p>
                
                <div class="card-amenities">
                    ${srv.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join("")}
                    ${srv.amenities.length > 3 ? `<span class="amenity-tag">+${srv.amenities.length - 3} more</span>` : ""}
                </div>
                
                <div class="card-footer">
                    <div class="price-box">
                        <span class="price-label">Starting from</span>
                        <div class="price-amount">₹${srv.price.toLocaleString("en-IN")} <span>/ ${srv.unit}</span></div>
                    </div>
                    <button class="card-btn" onclick="openBookingModal('${srv.id}')">
                        Book Now ⚡
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function getCategoryIcon(cat) {
    switch (cat) {
        case "hotels": return "🏨";
        case "dining": return "🍽️";
        case "events": return "🎫";
        case "wellness": return "🌿";
        default: return "✨";
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- FILTER & SEARCH HANDLERS ---
function setCategory(cat, element) {
    currentFilterCategory = cat;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    if (element) {
        element.classList.add("active");
    }
    renderServices();
}

function handleSearch(event) {
    if (event) event.preventDefault();
    const heroLoc = document.getElementById("heroLocation")?.value || "";
    const heroSearch = document.getElementById("heroKeyword")?.value || "";
    
    currentSearchQuery = (heroLoc + " " + heroSearch).trim();
    renderServices();
    
    // Smooth scroll to services
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    showToast(`Filtered services for: "${currentSearchQuery || 'All'}"`, "info");
}

function handleSortChange(val) {
    currentSortBy = val;
    renderServices();
}

function resetFilters() {
    currentFilterCategory = "all";
    currentSearchQuery = "";
    currentSortBy = "featured";
    
    const locInput = document.getElementById("heroLocation");
    const keyInput = document.getElementById("heroKeyword");
    if (locInput) locInput.value = "";
    if (keyInput) keyInput.value = "";
    
    document.querySelectorAll(".tab-btn").forEach((btn, index) => {
        if (index === 0) btn.classList.add("active");
        else btn.classList.remove("active");
    });
    
    renderServices();
    showToast("Filters reset to default", "info");
}

// --- BOOKING MODAL LOGIC ---
function openBookingModal(serviceId) {
    const srv = SERVICES_DATA.find(s => s.id === serviceId);
    if (!srv) return;

    currentBookingService = srv;
    appliedDiscountPercent = 0;
    appliedDiscountFixed = 0;
    activeCouponCode = "";

    // Fill Modal Data
    document.getElementById("modalHeroImg").src = srv.image;
    document.getElementById("modalServiceTitle").textContent = srv.title;
    document.getElementById("modalServiceLoc").textContent = `📍 ${srv.location} • ₹${srv.price.toLocaleString("en-IN")} / ${srv.unit}`;
    
    // Set default dates
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("bookingDateInput");
    if (dateInput) {
        dateInput.min = today;
        dateInput.value = today;
    }

    // Prefill user name/email if logged in
    const user = JSON.parse(localStorage.getItem("bookease_user") || '{"name":"Rohit Sharma","email":"rohit@example.com"}');
    document.getElementById("custNameInput").value = user.name || "";
    document.getElementById("custEmailInput").value = user.email || "";

    // Reset coupon
    document.getElementById("couponInput").value = "";
    document.getElementById("couponMsg").textContent = "";

    // Reset addons
    document.querySelectorAll(".addon-cb").forEach(cb => cb.checked = false);

    calculatePrice();

    const overlay = document.getElementById("bookingModalOverlay");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeBookingModal() {
    const overlay = document.getElementById("bookingModalOverlay");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

function calculatePrice() {
    if (!currentBookingService) return;

    const guests = parseInt(document.getElementById("bookingGuestsInput")?.value || "1");
    const duration = parseInt(document.getElementById("bookingDurationInput")?.value || "1");

    let baseRate = currentBookingService.price;
    let baseTotal = 0;

    // Pricing rules per category
    if (currentBookingService.unit === "person") {
        baseTotal = baseRate * guests;
    } else if (currentBookingService.unit === "night" || currentBookingService.unit === "day") {
        baseTotal = baseRate * duration;
    } else {
        baseTotal = baseRate;
    }

    // Addons
    let addonsTotal = 0;
    document.querySelectorAll(".addon-cb:checked").forEach(cb => {
        addonsTotal += parseInt(cb.dataset.price || "0");
    });

    let subtotal = baseTotal + addonsTotal;

    // Discounts
    let discountAmount = 0;
    if (appliedDiscountPercent > 0) {
        discountAmount = Math.round(subtotal * (appliedDiscountPercent / 100));
    } else if (appliedDiscountFixed > 0) {
        discountAmount = Math.min(appliedDiscountFixed, subtotal);
    }

    let taxableAmount = Math.max(0, subtotal - discountAmount);
    let taxes = Math.round(taxableAmount * 0.12); // 12% GST/Service Tax
    let grandTotal = taxableAmount + taxes;

    // Update UI elements
    document.getElementById("summaryBaseTotal").textContent = `₹${baseTotal.toLocaleString("en-IN")}`;
    document.getElementById("summaryAddonsTotal").textContent = `₹${addonsTotal.toLocaleString("en-IN")}`;
    
    const discountRow = document.getElementById("summaryDiscountRow");
    if (discountAmount > 0) {
        discountRow.style.display = "flex";
        document.getElementById("summaryDiscount").textContent = `- ₹${discountAmount.toLocaleString("en-IN")}`;
    } else {
        discountRow.style.display = "none";
    }

    document.getElementById("summaryTaxes").textContent = `₹${taxes.toLocaleString("en-IN")}`;
    document.getElementById("summaryGrandTotal").textContent = `₹${grandTotal.toLocaleString("en-IN")}`;

    return {
        baseTotal,
        addonsTotal,
        discountAmount,
        taxes,
        grandTotal,
        guests,
        duration
    };
}

function applyCoupon() {
    const code = document.getElementById("couponInput").value.trim().toUpperCase();
    const msgEl = document.getElementById("couponMsg");

    if (!code) {
        msgEl.textContent = "Please enter a coupon code.";
        msgEl.style.color = "var(--danger)";
        return;
    }

    if (COUPONS[code]) {
        const c = COUPONS[code];
        if (c.type === "percent") {
            appliedDiscountPercent = c.value;
            appliedDiscountFixed = 0;
        } else {
            appliedDiscountFixed = c.value;
            appliedDiscountPercent = 0;
        }
        activeCouponCode = code;
        msgEl.textContent = `✓ Applied! ${c.desc}`;
        msgEl.style.color = "var(--success)";
        showToast(`Promo ${code} applied successfully!`, "success");
        calculatePrice();
    } else {
        msgEl.textContent = "Invalid coupon code. Try 'WELCOME20' or 'EASE500'";
        msgEl.style.color = "var(--danger)";
    }
}

function processBooking(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("custNameInput").value.trim();
    const email = document.getElementById("custEmailInput").value.trim();
    const phone = document.getElementById("custPhoneInput").value.trim();
    const date = document.getElementById("bookingDateInput").value;
    const time = document.getElementById("bookingTimeInput").value;

    if (!name || !email || !date || !time) {
        showToast("Please fill all required fields", "error");
        return;
    }

    const calc = calculatePrice();
    const newBookingId = `BE-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
        id: newBookingId,
        service: currentBookingService.title,
        category: currentBookingService.category,
        image: currentBookingService.image,
        location: currentBookingService.location,
        name: name,
        email: email,
        phone: phone || "+91 99887 76655",
        date: date,
        time: time,
        guests: calc.guests,
        duration: calc.duration,
        basePrice: currentBookingService.price,
        addonsTotal: calc.addonsTotal,
        discount: calc.discountAmount,
        taxes: calc.taxes,
        totalPrice: calc.grandTotal,
        status: "confirmed",
        createdAt: new Date().toISOString()
    };

    // Save to LocalStorage
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.unshift(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    closeBookingModal();
    displayBookings();
    updateBookingStats();

    showToast(`🎉 Booking confirmed! Ref: #${newBookingId}`, "success");

    // Open ticket view immediately for instant delight
    setTimeout(() => {
        openTicketModal(newBookingId);
    }, 400);
}

// --- DISPLAY BOOKINGS ---
let currentBookingStatusTab = "all";

function setBookingFilterTab(tab, el) {
    currentBookingStatusTab = tab;
    document.querySelectorAll(".booking-tab-btn").forEach(b => b.classList.remove("active"));
    if (el) el.classList.add("active");
    displayBookings();
}

function displayBookings() {
    const container = document.getElementById("bookingListContainer");
    if (!container) return;

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (currentBookingStatusTab !== "all") {
        bookings = bookings.filter(b => b.status === currentBookingStatusTab);
    }

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="no-bookings-view">
                <div class="no-bookings-icon">📅</div>
                <h3>No bookings in this category</h3>
                <p style="color: var(--text-muted); margin-top: 6px;">Discover exciting hotels, dining spots, and events above!</p>
                <a href="#services" style="display: inline-block; margin-top: 16px; padding: 9px 20px; background: var(--primary); color: white; border-radius: var(--radius-full); text-decoration: none; font-weight: 600;">Explore Services</a>
            </div>
        `;
        return;
    }

    container.innerHTML = bookings.map(b => `
        <div class="booking-card">
            <img src="${b.image}" alt="${b.service}" class="booking-thumbnail" />
            
            <div class="booking-details">
                <h4>
                    ${b.service}
                    <span class="booking-ref-badge">#${b.id}</span>
                    <span class="booking-status-badge status-${b.status}">${b.status}</span>
                </h4>
                
                <div class="booking-meta-grid">
                    <div class="booking-meta-item">
                        <span>👤</span> <strong>${b.name}</strong>
                    </div>
                    <div class="booking-meta-item">
                        <span>📅</span> ${formatDate(b.date)}
                    </div>
                    <div class="booking-meta-item">
                        <span>⏰</span> ${b.time}
                    </div>
                    <div class="booking-meta-item">
                        <span>👥</span> ${b.guests} Guest(s)
                    </div>
                    <div class="booking-meta-item">
                        <span>📍</span> ${b.location}
                    </div>
                </div>
            </div>
            
            <div class="booking-actions">
                <div class="booking-total-price">₹${b.totalPrice.toLocaleString("en-IN")}</div>
                <div class="booking-btn-group">
                    <button class="btn-view-ticket" onclick="openTicketModal('${b.id}')">
                        🎟️ E-Ticket
                    </button>
                    ${b.status === "confirmed" ? `
                        <button class="btn-cancel-booking" onclick="cancelBooking('${b.id}')">
                            Cancel
                        </button>
                    ` : ""}
                </div>
            </div>
        </div>
    `).join("");
}

function updateBookingStats() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const activeCount = bookings.filter(b => b.status === "confirmed").length;
    const totalSpent = bookings
        .filter(b => b.status === "confirmed")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const statTotalEl = document.getElementById("statTotalBookings");
    const statActiveEl = document.getElementById("statActiveBookings");
    const statSpentEl = document.getElementById("statTotalSpent");

    if (statTotalEl) statTotalEl.textContent = bookings.length;
    if (statActiveEl) statActiveEl.textContent = activeCount;
    if (statSpentEl) statSpentEl.textContent = `₹${totalSpent.toLocaleString("en-IN")}`;
}

function cancelBooking(id) {
    if (!confirm(`Are you sure you want to cancel booking #${id}?`)) return;

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        booking.status = "cancelled";
        localStorage.setItem("bookings", JSON.stringify(bookings));
        displayBookings();
        updateBookingStats();
        showToast(`Booking #${id} has been cancelled`, "info");
    }
}

// --- DIGITAL TICKET PASS MODAL ---
function openTicketModal(bookingId) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const b = bookings.find(item => item.id === bookingId);
    if (!b) return;

    document.getElementById("ticketBookingId").textContent = `#${b.id}`;
    document.getElementById("ticketService").textContent = b.service;
    document.getElementById("ticketGuestName").textContent = b.name;
    document.getElementById("ticketDate").textContent = `${formatDate(b.date)} at ${b.time}`;
    document.getElementById("ticketGuests").textContent = `${b.guests} Person(s)`;
    document.getElementById("ticketLocation").textContent = b.location;
    document.getElementById("ticketAmount").textContent = `₹${b.totalPrice.toLocaleString("en-IN")}`;
    document.getElementById("ticketStatus").textContent = b.status.toUpperCase();
    document.getElementById("ticketBarcodeText").textContent = `* ${b.id} - ${b.date} *`;

    const overlay = document.getElementById("ticketModalOverlay");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeTicketModal() {
    const overlay = document.getElementById("ticketModalOverlay");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

function printTicket() {
    window.print();
}

// --- AUTH & USER PROFILE SIMULATOR ---
function openAuthModal() {
    const overlay = document.getElementById("authModalOverlay");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeAuthModal() {
    const overlay = document.getElementById("authModalOverlay");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

function handleLogin(event) {
    if (event) event.preventDefault();
    const name = document.getElementById("authNameInput").value || "Rohit Sharma";
    const email = document.getElementById("authEmailInput").value || "rohit@example.com";

    const user = { name, email, loggedIn: true };
    localStorage.setItem("bookease_user", JSON.stringify(user));

    updateUserInterface();
    closeAuthModal();
    showToast(`Welcome back, ${name}!`, "success");
}

function handleLogout() {
    localStorage.removeItem("bookease_user");
    updateUserInterface();
    showToast("Logged out successfully", "info");
}

function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem("bookease_user") || "null");
    const loginBtn = document.getElementById("navLoginBtn");
    const userProfile = document.getElementById("navUserProfile");
    const userName = document.getElementById("navUserName");
    const userAvatar = document.getElementById("navUserAvatar");

    if (user && user.name) {
        if (loginBtn) loginBtn.style.display = "none";
        if (userProfile) {
            userProfile.style.display = "flex";
            if (userName) userName.textContent = user.name.split(" ")[0];
            if (userAvatar) userAvatar.textContent = user.name.charAt(0).toUpperCase();
        }
    } else {
        if (loginBtn) loginBtn.style.display = "inline-flex";
        if (userProfile) userProfile.style.display = "none";
    }
}

// --- TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "⚠️";

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// --- UTILITY HELPERS ---
function formatDate(dateStr) {
    if (!dateStr) return "";
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

function setupEventListeners() {
    // Dynamic recalculation on form changes
    const bookingGuests = document.getElementById("bookingGuestsInput");
    const bookingDuration = document.getElementById("bookingDurationInput");
    if (bookingGuests) bookingGuests.addEventListener("input", calculatePrice);
    if (bookingDuration) bookingDuration.addEventListener("input", calculatePrice);
}