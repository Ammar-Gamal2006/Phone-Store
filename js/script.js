const products = [
  { name: "iPhone 15 Pro Max", section: "ios-section" },
  { name: "iPhone 14 Pro", section: "ios-section" },
  { name: "iPhone 13 pro", section: "ios-section" },
  { name: "iPhone 17 pro Max", section: "ios-section" },

  { name: "Huawei Pura 80 Ultra", section: "android-section" },
  { name: "Z-Fold 5", section: "android-section" },
  { name: "Xiaomi 15t pro", section: "android-section" },
  { name: "Galaxy S26 Ultra", section: "android-section" },

  { name: "iPhone Silicone Case", section: "accessories-section" },
  { name: "Smart Watch", section: "accessories-section" },
  { name: "AirPods + Smart Watch", section: "accessories-section" },
  { name: "Head Phone", section: "accessories-section" }
]
const searchInput = document.getElementById("searchInput")
const dropdown = document.getElementById("search-dropdown")
function searchProducts(query) {
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  )
}
function renderResults(results) {
  dropdown.innerHTML = ""
  if (results.length === 0) {
    dropdown.style.display = "none"
    return
  }
  results.forEach(product => {
    const item = document.createElement("div")
    item.classList.add("search-item")
    item.textContent = product.name
    item.addEventListener("click", function () {
      const targetSection = document.getElementById(product.section)
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        })
      }
      dropdown.style.display = "none"
      searchInput.value = ""
    })
    dropdown.appendChild(item)
  })
  dropdown.style.display = "block"
}
searchInput.addEventListener("input", function () {
  const query = this.value.trim()

  if (query === "") {
    dropdown.style.display = "none"
    dropdown.innerHTML = ""
    return;
  }
  const results = searchProducts(query)
  renderResults(results)
})
document.addEventListener("click", function (e) {
  if (!e.target.closest(".search-container")) {
    dropdown.style.display = "none"
  }
})
// cart
var cart = [];

const cartIcon = document.getElementById("cart-icon");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");

const addToCartButtons = document.querySelectorAll(".buy-btn");

addToCartButtons.forEach(button => {
  button.addEventListener("click", function () {
    const card = this.closest(".card");
    const productName = card.querySelector("h3").textContent;
    const productPrice = card.querySelector(".price").childNodes[0].textContent.trim();

    const product = {
      name: productName,
      price: productPrice
    };

    cart.push(product);
    renderCart();
  });
});

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      </div>
      <button class="remove-btn">X</button>
    `;

    const removeBtn = cartItem.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function () {
      cart.splice(index, 1);
      renderCart();
    });

    cartItemsContainer.appendChild(cartItem);
  });
}

cartIcon.addEventListener("click", function (e) {
  e.preventDefault();
  cartPanel.classList.add("active");
});

closeCart.addEventListener("click", function () {
  cartPanel.classList.remove("active");
});