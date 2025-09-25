document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      displayFeaturedProducts(data.slice(0, 4)); // first 4 are featured
      displayAllProducts(data);
    });
});

function displayFeaturedProducts(products) {
  const container = document.getElementById("featured-products");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="../images/${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Buy Now</button>
      </div>
    `;
  });
}

function displayAllProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="../images/${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Buy Now</button>
      </div>
    `;
  });
}

// --- Cart logic ---
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
