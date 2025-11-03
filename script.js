function openProduct(title, desc, img, event) {
  if (event) event.preventDefault(); // prevent image opening as link

  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('productImage');
  const modalTitle = document.getElementById('productTitle');
  const modalDesc = document.getElementById('productDesc');

  modal.style.display = 'flex';
  modalImage.src = img;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
}

function closeProduct() {
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
}

// Optional: close modal when clicking outside
window.onclick = function(e) {
  const modal = document.getElementById('productModal');
  if (e.target === modal) modal.style.display = 'none';
};
// Run this on product.html page
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const price = params.get("price");
  const img = params.get("img");
  const desc = params.get("desc");

  if (title && price && img && desc) {
    document.getElementById("productTitle").textContent = title;
    document.getElementById("productPrice").textContent = "₹" + price;
    document.getElementById("productImage").src = img;
    document.getElementById("productDesc").textContent = desc;
  }
};
// === Product page dynamic details ===
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const price = params.get("price");
  const img = params.get("img");
  const desc = params.get("desc");

  if (title && price && img && desc) {
    document.getElementById("productTitle").textContent = title;
    document.getElementById("productPrice").textContent = "₹" + price;
    document.getElementById("productImage").src = img;
    document.getElementById("productDesc").textContent = desc;
  }

  // === Review system ===
  const submitBtn = document.getElementById("submitReview");
  const reviewInput = document.getElementById("reviewText");
  const reviewList = document.getElementById("reviews");

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const text = reviewInput.value.trim();
      if (text.length > 0) {
        const li = document.createElement("li");
        li.textContent = text;
        reviewList.appendChild(li);
        reviewInput.value = "";
      } else {
        alert("Please write something before submitting!");
      }
    });
  }
};

const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn) {
  buyNowBtn.addEventListener("click", () => {
    const sizeSelect = document.querySelector("select");
    const size = sizeSelect ? sizeSelect.value : "Not Selected";

    const title = document.getElementById("productTitle").textContent;
    const price = document.getElementById("productPrice").textContent;

    // Redirect to checkout.html with product details
    window.location.href = `checkout.html?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&size=${encodeURIComponent(size)}`;
  });
}


// === Checkout Page Logic ===
window.addEventListener("DOMContentLoaded", () => {
  const productInfo = document.getElementById("productInfo");
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const price = params.get("price");
  const size = params.get("size");

  if (productInfo && title) {
    productInfo.textContent = `Product: ${title} | Size: ${size} | Price: ${price}`;
  }

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("address").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const pincode = document.getElementById("pincode").value.trim();

      if (!name || !address || !phone || !pincode) {
        alert("Please fill all fields!");
        return;
      }

      const phoneNumber = "919009978393"; // Your WhatsApp number

      const message = `
🛍 *New Order Details*  
----------------------  
👕 Product: ${title}  
📏 Size: ${size}  
💰 Price: ${price}  

📦 Shipping Info:  
👤 Name: ${name}  
🏠 Address: ${address}  
📞 Phone: ${phone}  
📮 Pincode: ${pincode}
`;

      const encodedMsg = encodeURIComponent(message);
      const waLink = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
      window.open(waLink, "_blank");
    });
  }
});
// === HERO SLIDER ===
const banner = document.querySelector('.banner');
const images = [
  'img/hero.jpg',
  'img/hero.jpg',
  'img/hero.jpg'
];
let index = 0;

function changeBanner() {
  banner.style.backgroundImage = `url(${images[index]})`;
  index = (index + 1) % images.length;
}

changeBanner();
setInterval(changeBanner, 4000);
// === REVIEW SYSTEM ===
document.addEventListener('DOMContentLoaded', () => {
  const productName = document.querySelector('.product-detail .info h2')?.textContent;
  const reviewInput = document.getElementById('reviewText');
  const reviewList = document.getElementById('reviewList');
  const submitBtn = document.getElementById('submitReview');

  if (productName && submitBtn) {
    // Load existing reviews
    const savedReviews = JSON.parse(localStorage.getItem(productName)) || [];
    savedReviews.forEach(review => addReviewToDOM(review));

    submitBtn.addEventListener('click', () => {
      const text = reviewInput.value.trim();
      if (!text) return;

      addReviewToDOM(text);
      savedReviews.push(text);
      localStorage.setItem(productName, JSON.stringify(savedReviews));
      reviewInput.value = '';
    });

    function addReviewToDOM(text) {
      const li = document.createElement('li');
      li.textContent = text;
      reviewList.appendChild(li);
    }
  }
});


// === MOBILE MENU (Universal Working Version) ===
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    // Optional: animate bars into X
    const bars = mobileMenu.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
      if (mobileMenu.classList.contains("active")) {
        bar.style.transform = index === 1 ? "scale(0)" : `rotate(${index === 0 ? 45 : -45}deg) translateY(${index === 0 ? 6 : -6}px)`;
      } else {
        bar.style.transform = "rotate(0) scale(1)";
      }
    });
  });
}
