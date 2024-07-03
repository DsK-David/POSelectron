// home.js

let cart = [];
let itemsData = [];

async function fetchItemsData() {
  try {
    const response = await fetch("http://localhost:5500/api/v1/produtos");
    itemsData = await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

async function renderItems() {
  await fetchItemsData();
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = "";
  itemsData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `<img src="${item.imagem}" alt="${item.nome}">
      <br><span>${item.nome}</span>
      <br><strong>$${item.preco}</strong>`;
    itemDiv.onclick = () => addToCart(item);
    itemsContainer.appendChild(itemDiv);
  });
}

function addToCart(item) {
  cart.push(item);
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;
  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <div class="item-details">
        <span>1</span> ${item.nome}
        <span class="item-price">$${item.preco}</span>
      </div>
      <button class="remove-item" data-index="${index}">✕</button>
    `;
    cartItemDiv
      .querySelector(".remove-item")
      .addEventListener("click", () => removeCartItem(index));
    cartItemsContainer.appendChild(cartItemDiv);
    subtotal += item.preco;
    scrollToBottom(cartItemsContainer)
  });

  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const payableAmountElement = document.getElementById("payable-amount");

  const tax = subtotal * 0.225;
  const payableAmount = subtotal - tax;

  subtotalElement.innerText = subtotal.toFixed(2);
  taxElement.innerText = tax.toFixed(2);
  payableAmountElement.innerText = payableAmount.toFixed(2);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

export { renderItems, addToCart, renderCart, scrollToBottom };
