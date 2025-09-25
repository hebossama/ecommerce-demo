// main.js

// -------------------- NAVIGATION --------------------
function showSection(id) {
  document.querySelectorAll("main section, .hero").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

// -------------------- PRODUCTS --------------------
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    if (!response.ok) throw new Error("Failed to load products.json");

    const products = await response.json();
    const container = document.getElementById("product-list");

    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="images/${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <span class="price">$${product.price}</span>
        <button class="buy-btn" onclick="addToCart(${index})">Buy Now</button>
      `;

      container.appendChild(card);
    });

    // Save products globally so addToCart can use them
    window.allProducts = products;
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// -------------------- CART --------------------
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.innerHTML = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="images/${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });

  totalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function addToCart(index) {
  const product = window.allProducts[index];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
  loadCart(); // refresh cart view if open
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCart();

  document.getElementById("checkout-btn").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("✅ Order placed! (Zapier/Make integration will go here)");
    localStorage.removeItem("cart");
    loadCart();
    showSection("home");
  });
});
