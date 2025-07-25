let subtotal = 0;
let discountAmount = 0; // ✅ must match everywhere

function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const container = document.getElementById("cart-items");

  subtotal = 0;
  container.innerHTML = "";

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.forEach(item => {
    let price = item.price;
    if (typeof price === "string") {
      price = parseFloat(price.replace(/[^0-9.]/g, ""));
    }

    console.log(`Title: ${item.title}, Price: ${price}, Qty: ${item.quantity}`);

    const itemTotal = price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <p>${item.title}</p>
        <span>${item.quantity}x</span>
      </div>
      <strong>$ ${itemTotal.toFixed(2)}</strong>
    `;
    container.appendChild(div);
  });

  updateTotals(); // ✅ update after render
}

function updateTotals() {
  const shipping = 10.00;
  const total = subtotal + shipping - discountAmount; // ✅ use the same name!

  document.getElementById("subtotal").innerText = `$ ${subtotal.toFixed(2)}`;
  document.getElementById("shipping").innerText = `$ ${shipping.toFixed(2)}`;
  document.getElementById("discount").innerText = `- $${discountAmount.toFixed(2)}`;
  document.getElementById("total").innerText = `$ ${total.toFixed(2)}`;
}

function applyDiscount() {
  const code = document.getElementById("discount-code-input").value.trim().toUpperCase();
  const validCodes = {
    "FREESHIP": 10,
    "SAVE5": 5,
    "SHOPWITHLEENA": 500
  };

  if (validCodes[code]) {
    discountAmount = validCodes[code];
    alert(`Discount code applied! You saved $${discountAmount}.`);
  } else {
    discountAmount = 0;
    alert("Invalid discount code.");
  }

  updateTotals(); // ✅ recalculate with new discount
}

// ✅ Call render on load
renderCartItems();

let selectedPaymentMethod = localStorage.getItem("paymentMethod") || "";

function selectPayment(method) {
  selectedPaymentMethod = method;
  localStorage.setItem("paymentMethod", method);

  // Remove all selected states
  document.getElementById("option-card").classList.remove("selected");
  document.getElementById("option-paypal").classList.remove("selected");

  // Add selected class
  if (method === "card") {
    document.getElementById("option-card").classList.add("selected");
    document.getElementById("card-form").style.display = "block";
  } else if (method === "paypal") {
    document.getElementById("option-paypal").classList.add("selected");
    document.getElementById("card-form").style.display = "none";
  }
}

// On load, re-apply saved payment method
window.onload = function() {
  renderCartItems();
  document.getElementById("apply-discount-btn").addEventListener("click", applyDiscount);

  if (selectedPaymentMethod) {
    selectPayment(selectedPaymentMethod);
  }
};

// ✅ Hook up Apply button AFTER HTML loads
document.getElementById("apply-discount-btn").addEventListener("click", applyDiscount);
