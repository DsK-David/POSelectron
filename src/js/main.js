document.addEventListener("DOMContentLoaded", async () => {
  const itemsContainer = document.getElementById("items");
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const payableAmountElement = document.getElementById("payable-amount");

  let cart = [];

  async function fetchItemsData() {
    try {
      const response = await fetch("http://localhost:5500/api/v1/produtos"); // Substitua pela URL da sua API
      const itemsData = await response.json(); // Assumindo que a resposta seja um JSON
      return itemsData;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  }

  async function renderItems() {
    const itemsData = await fetchItemsData(); // Busca os dados da API
    itemsContainer.innerHTML = "";
    itemsData.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      // Ajuste o template abaixo conforme a estrutura dos seus dados
      itemDiv.innerHTML = `<img src="${item.imagem}" alt="${item.nome}"><br>${item.nome}<br>$${item.preco}`;
      itemDiv.onclick = () => addToCart(index);
      itemsContainer.appendChild(itemDiv);
    });
  }

  function addToCart(index) {
    cart.push(itemsData[index]); // Certifique-se de que itemsData esteja acessível aqui
    renderCart();
    scrollToBottom(cartItemsContainer);
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.innerText = `${item.nome} - $${item.preco}`;
      cartItemsContainer.appendChild(cartItemDiv);
      subtotal += item.preco;
    });
    const tax = subtotal * 0.225;
    const payableAmount = subtotal - tax;

    subtotalElement.innerText = subtotal.toFixed(2);
    taxElement.innerText = tax.toFixed(2);
    payableAmountElement.innerText = payableAmount.toFixed(2);
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

  renderItems(); // Chama renderItems após o evento DOMContentLoaded
});