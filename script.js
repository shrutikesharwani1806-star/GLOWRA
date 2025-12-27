const slides = [
    "./images/front image5.avif",
    "./images/front image7.jpg",
    "./images/image6.jpg"
];


const heroSlide = document.getElementById("heroSlide");
const dots = document.querySelectorAll(".dot");
let current = 0;

function updateSlide() {
    heroSlide.style.opacity = 0;
    setTimeout(() => {
        heroSlide.src = slides[current];
        heroSlide.style.opacity = 1;
        dots.forEach((dot, i) =>
            dot.classList.toggle("bg-black", i === current)
        );
    }, 300);
}

function nextSlide() {
    current = (current + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
}

// AUTO SLIDE
setInterval(nextSlide, 5000);



// CART UI
let count = 0;
function addToCart() {
    count++;
    const badge = document.getElementById("cartCount");
    badge.innerText = count;
    badge.classList.add("scale-125");
    setTimeout(() => badge.classList.remove("scale-125"), 200);
}

let cartCount = 0;

function addToCart(btn) {
    cartCount++;

    // Button text change
    const originalText = btn.innerText;
    btn.innerText = "Added";
    btn.disabled = true;
    btn.classList.add("opacity-80");

    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove("opacity-80");
    }, 2000);

    // Update cart badge (if exists)
    const badge = document.getElementById("cartCount");
    if (badge) {
        badge.innerText = cartCount;
        badge.classList.add("scale-125");
        setTimeout(() => badge.classList.remove("scale-125"), 200);
    }
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge on load
updateCartCount();

function addToCart(product, btn) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Button UI
    const originalText = btn.innerText;
    btn.innerText = "Added";
    btn.disabled = true;
    btn.classList.add("opacity-70");

    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove("opacity-70");
    }, 4000);

    updateCartCount();
}

function updateCartCount() {
    const badge = document.getElementById("cartCount");
    if (badge) badge.innerText = cart.length;
}

function addToCart(button, id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find product card
    const card = button.closest(".text-center");

    // Get product data from HTML
    const name = card.querySelector("h4").innerText;
    const image = card.querySelector("img").src;

    // Get price from <h2>₹579</h2>
    const priceText = card.querySelector(".product-price").innerText;
    const price = parseInt(priceText.replace("₹", "").trim());

    // Check if product already exists
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Button feedback
    const originalText = button.innerText;
    button.innerText = "Added";
    button.disabled = true;
    button.classList.add("opacity-80");

    setTimeout(() => {
        button.innerText = originalText;
        button.disabled = false;
        button.classList.remove("opacity-80");
    }, 2000);

    // Update cart badge
    const badge = document.getElementById("cartCount");
    if (badge) {
        badge.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    }
}
