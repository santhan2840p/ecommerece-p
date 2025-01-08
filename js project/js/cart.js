
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart items
const renderCart = () => {
  const cartContainer = document.getElementById("cartContainer");
  const orderSummary = document.getElementById("orderSummary");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    orderSummary.innerHTML = `
      <p><strong>Order Summary</strong></p>
      <p>Products (0): $0</p>
      <p>Shipping: $30</p>
      <p><strong>Total Amount: $30</strong></p>
    `;
    return;
  }

  let totalAmount = 0;

  const cartItems = cart
    .map((product, index) => {
      const productTotal = product.price * product.quantity;
      totalAmount += productTotal;

      return `
        <div class="cartItem">
          <img src="${product.image}" alt="${product.title}" class="productImage"/>
          <div class="productDetails">
            <h6>${product.title}</h6>
            <div class="productInfo">
              <p>Price: $${product.price}</p>
              <div class="quantityControl">
                <button class="quantityBtn" data-index="${index}" data-action="decrease">-</button>
                <p> ${product.quantity}</p>
                <button class="quantityBtn" data-index="${index}" data-action="increase">+</button>
              </div>
              <button class="removeBtn" data-index="${index}">🗑 Remove</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const shippingCost = 30;
  const finalAmount = totalAmount + shippingCost;

  cartContainer.innerHTML = cartItems;
  orderSummary.innerHTML = `
    <p><strong>Order Summary</strong></p>
    <p>Products (${cart.length}): $${totalAmount.toFixed(2)}</p>
    <p>Shipping: $${shippingCost}</p>
    <p><strong>Total Amount: $${finalAmount.toFixed(2)}</strong></p>
    <button id="checkoutBtn">Checkout</button>
  `;
};

document.addEventListener("click", (event) => {
  const index = event.target.getAttribute("data-index");
  if (event.target.classList.contains("quantityBtn")) {
    const action = event.target.getAttribute("data-action");

    if (action === "increase") {
      cart[index].quantity += 1;
    } else if (action === "decrease") {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }

  if (event.target.classList.contains("removeBtn")) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }
});

renderCart();
