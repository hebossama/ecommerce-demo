// Mobile Menu Navigation

const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
const mobileNavContainer = document.querySelector(".mobile-nav-container");
const navList = document.getElementById("mobile-nav-list");

hamburger.addEventListener("click", () => {
    togglingNav()
});

closeMenu.addEventListener("click", () => {
    togglingNav()
});

function togglingNav() {
    hamburger.toggleAttribute("data-visible");
    closeMenu.toggleAttribute("data-visible");
    mobileNavContainer.toggleAttribute("data-visible");
    navList.toggleAttribute("data-visible");
}

// Cart Popup/Dropdown Menu Toggle

const viewCart = document.querySelector(".cart");
const cartPopupMenu = document.querySelector(".cart-popup");

viewCart.addEventListener("click", () => {
    cartPopupMenu.toggleAttribute("data-opened");
});

// Image Switching Mechanism

const otherImageButtons = document.querySelectorAll(".other-image-button");
const mainImage = document.querySelector(".main-image");
const imageFocused = document.querySelector(".image-focused");
let selectedImage = "img-1";

otherImageButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selected = button.getAttribute("data-source");
        displayImage(selected);
        removeDatasetSelected();
        button.toggleAttribute("data-selected");
        selectedImage = selected;
    });
});

function displayImage(selected) {
    const sources = mainImage.querySelectorAll("source");

    sources.forEach(source => {
        const sourceCondition = source.getAttribute("data-source");
        if (sourceCondition === selected) {
            const mainSrc = source.getAttribute("src");
            mainImage.querySelector("img").setAttribute("src", mainSrc);
            imageFocused.querySelector("img").setAttribute("src", mainSrc);
        }
    });
}

function removeDatasetSelected() {
    otherImageButtons.forEach(button => {
        button.removeAttribute("data-selected");
    });
}

// Image Preview Overlay Toggle

const imageOverlay = document.querySelector(".image-overlay");
const closeOverlayButton = document.querySelector(".close-overlay");

mainImage.addEventListener("click", () => {
    imageOverlay.toggleAttribute("data-visible");
});

closeOverlayButton.addEventListener("click", () => {
    imageOverlay.toggleAttribute("data-visible");
});

// Image Preview Overlay Images Switching

const right = document.querySelector(".right");
const left = document.querySelector(".left");
const rightOverlay = document.getElementById("right");
const leftOverlay = document.getElementById("left");

const arrayOfImages = ["img-1", "img-2", "img-3", "img-4"];

right.addEventListener("click", () => {
    next()
});

rightOverlay.addEventListener("click", () => {
    next()
});

function next() {
    let currentIndex = arrayOfImages.indexOf(selectedImage);
    currentIndex = (currentIndex + 1) % arrayOfImages.length;
    selectedImage = arrayOfImages[currentIndex];
    displayImage(selectedImage);
    removeDatasetSelected();
    toggleDataSelected();
}

left.addEventListener("click", () => {
    prev()
});

leftOverlay.addEventListener("click", () => {
    prev()
});

function prev() {
    let currentIndex = arrayOfImages.indexOf(selectedImage);
    currentIndex = (currentIndex - 1 + arrayOfImages.length) % arrayOfImages.length;
    selectedImage = arrayOfImages[currentIndex];
    displayImage(selectedImage);
    removeDatasetSelected();
    toggleDataSelected();
}

function toggleDataSelected() {
    otherImageButtons.forEach(button => {
        if (button.getAttribute("data-source") === selectedImage) {
            button.toggleAttribute("data-selected");
        }
    });
}

// Purchasing Functionality

const addQty = document.querySelector(".add");
const reduceQty = document.querySelector(".reduce");
const qtyAmount = document.querySelector(".amount-display");

let currentAmount = 0;
qtyAmount.textContent = currentAmount;

addQty.addEventListener("click", () => {
    currentAmount++;
    qtyAmount.textContent = currentAmount;
});

reduceQty.addEventListener("click", () => {
    currentAmount--;
    if (currentAmount < 0) {
        currentAmount = 0;
    }
    qtyAmount.textContent = currentAmount;
});

const addToCart = document.querySelector(".add-to-cart");
const cartContainer = document.querySelector(".cart-container");
const itemThumbnail = document.getElementById("cart-thumbnail");
const indicator = document.querySelector(".circle-indicator");

const itemCartIcon = cartContainer.querySelector(".item-cart-icon");
const itemCartName = cartContainer.querySelector(".item-cart-name");
const itemCartPrice = cartContainer.querySelector(".item-price-with-qty");
const cartTotalPrice = cartContainer.querySelector(".total-price");
const deleteItem = cartContainer.querySelector(".delete");

addToCart.addEventListener("click", () => {
    if (currentAmount > 0) {
        cartContainer.setAttribute("data-empty", false);
        const itemName = addToCart.getAttribute("data-item");
        const itemPrice = addToCart.getAttribute("data-price");
        const finalQty = currentAmount;
        setResource(itemName, itemPrice, finalQty);
    }
});

function setResource(name, price, qty) {
    indicator.toggleAttribute("data-visible");
    indicator.textContent = qty;
    const totalPrice = price * qty;
    const thumbnailSrc = itemThumbnail.getAttribute("src");
    itemCartIcon.querySelector("img").setAttribute("src", thumbnailSrc);
    itemCartName.append(`${name}`);
    itemCartPrice.append(`$${price} x ${qty} `);
    cartTotalPrice.append(`$${totalPrice}`);
}


deleteItem.addEventListener("click", () => {
    resetResource();
    cartContainer.setAttribute("data-empty", true);
    indicator.toggleAttribute("data-visible");
});

function resetResource() {
    const defaultImg = "images/favicon-32x32.png"
    itemCartIcon.querySelector("img").setAttribute("src", defaultImg);
    itemCartName.textContent = "";
    itemCartPrice.textContent = "";
    cartTotalPrice.textContent = "";
}


