

let cart = [];
let itemsData = [];

function home() {
  const itemsContainer = document.getElementById("items");
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const payableAmountElement = document.getElementById("payable-amount");
async function buscarItens() {
  try {
    const response = await fetch("http://localhost:5500/api/v1/produtos"); // Substitua pela URL da sua API
    itemsData = await response.json(); // Atualiza a variável global itemsData
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}
  async function mostrarItens() {
    await buscarItens(); // Garante que itemsData seja preenchida antes de renderizar os itens
    itemsContainer.innerHTML = "";
    itemsData.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `<img src="${item.imagem}" alt="${item.nome}">
      <br><span>${item.nome}</span>
      <br><strong>$${item.preco}</strong>`;
      itemDiv.onclick = () => adicionarNoCarinho(item); // Passa o objeto item diretamente
      itemsContainer.appendChild(itemDiv);
    });
  }

  function adicionarNoCarinho(item) {
    cart.push(item); // Adiciona o item diretamente ao carrinho
    mostrarCarinho();
    scrollToBottom(cartItemsContainer);
  }
  document
    .getElementById("cart-items")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-item")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        if (!isNaN(index)) {
          cart.splice(index, 1); // Remove o item do carrinho
          mostrarCarinho(); // Re-renderiza o carrinho após a remoção
        }
      }
    });
  function mostrarCarinho() {
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
        <button class="remove-item" data-index="${index}"">✕</button>
        `;

      cartItemsContainer.appendChild(cartItemDiv);
      subtotal += item.preco;
    });
    const tax = subtotal * 0.225;
    const payableAmount = subtotal - tax;
    subtotalElement.innerText = subtotal.toFixed(2);
    taxElement.innerText = tax.toFixed(2);
    payableAmountElement.innerText = payableAmount.toFixed(2);

    scrollToBottom(cartItemsContainer);
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

  mostrarItens();
}
