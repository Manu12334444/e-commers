const CART = [];
const FAVORITES = [];

const cartItems = document.getElementById("cart-items");
const cartBtns = Array.from(document.querySelectorAll("#toggle-cart-btn"));

const toggleDarkModeBtn = document.getElementById("toggle-dark-mode-btn");

console.log(toggleDarkModeBtn);

toggleDarkModeBtn.addEventListener("click", () => {
  console.log("click toggle dark mode");
  const body = document.querySelector("body");
  body.classList.toggle("dark-mode");
});

cartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cart = document.querySelector(".cart");
    cart.classList.toggle("show-cart");
  });
});

function loadCartItems() {
  cartItems.innerHTML = "";

  CART.forEach((product) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-item__image">
          <img src="${product.imageUrl}" alt="Product Image" />
        </div>

        <div class="cart-item__details">
          <span class="cart-item__model jaro-font">${product.model}</span>
          <span class="cart-item__price">${product.price}</span>
        </div>

        <div class="cart-item__quantity">
          <button>-</button>
          <span>${product.quantity}</span>
          <button>+</button>
        </div>
      </div>
    `;
  });
}

// Cargar productos

fetch("./products.json")
  .then((response) => response.json())
  .then((products) => {
    const productsGrid = document.getElementById("productsGrid");

    products.forEach((product) => {
      productsGrid.innerHTML += `
        <div class="product-card" data-id="${product.id}">
          <div class="product-card__header">
            <span class="product-card__model jaro-font">${product.model}</span>
            <button
              class="product-card__favorite-btn"
              data-action="favorite"
              id="addBtn"
            >
              <img src="/assets/icons/heart_icon.png" alt="Add to favorites" />
            </button>
          </div>

          <div class="product-card__image">
            <img src="${product.imageUrl}" alt="Product Image" />
          </div>

          <div class="product-card__footer">
            <span class="product-card__price">${product.price}</span>
            <button
              class="product-card__add-to-cart-btn"
              data-action="cart"
              id="addBtn"
            >
              Add to cart
            </button>
          </div>
        </div>
      `;
    });

    const favoriteBtns = Array.from(document.querySelectorAll("#addBtn"));

    favoriteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = btn.parentElement.parentElement.dataset.id;

        console.log(id);
        const originalProduct = products.find(({ id }) => id === id);

        const alreadyAdded = (productId, array) => array.some(({ id }) => id === productId);

        console.log(id);

        switch (btn.dataset.action) {
          case "cart":
            if (alreadyAdded(id, CART)) {
              const index = CART.findIndex(({ id }) => id === id);
              CART[index].quantity++;
            } else {
              CART.push(Object.assign({}, originalProduct, { quantity: 1 }));
            }

            loadCartItems();
            break;
          case "favorite":
            if (!alreadyAdded(id, FAVORITES)) {
              FAVORITES.push(originalProduct);
              console.log(e);
            } else {
              console.log("Ya esta en tu lista de favoritos");
            }
            break;
        }

        console.log({ CART, FAVORITES });
      });
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Cargar usuario
const user = JSON.parse(localStorage.getItem("customer"));

if (!user) {
  window.location.href = "/views/login/login.html";
}

const linksContainer = document.getElementById("links-container");
const actionsContainer = document.getElementById("actions-container");

if (user.rol === "admin") {
  linksContainer.innerHTML += `
    <a href="/views/admin/admin.html">Administrar</a>
  `;
}

if (user) {
  actionsContainer.insertAdjacentHTML(
    "beforeend",
    `
    <button id="logout-btn">
      <img src="/assets/icons/exit.png" alt="Salir" />
    </button>
    `
  );

  const logoutBtn = document.getElementById("logout-btn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("customer");
    window.location.href = "/views/login/login.html";
  });
}
