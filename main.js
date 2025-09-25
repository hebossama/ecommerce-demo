// main.js

// Function to load products dynamically
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    if (!response.ok) throw new Error("Failed to load products.json");
    
    const products = await response.json();
    const container = document.getElementById("product-list");

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="images/${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <span class="price">$${product.price}</span>
        <a href="#" class="buy-btn">Buy Now</a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts);
