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
let clienteNaFatura = null
function adicionarNaFatura(user) {
  const cliente_header = document.querySelector(".cliente_na_fatura");
  const cart_header = document.querySelector(".cart-header")
  cliente_header.innerHTML = `
    <span>${user.nome}</span> - <span>${user.email}</span> - <span>${user.obs}</span>
    <button class="remove-item">X</button>`;

  // Adiciona um ouvinte de evento para remover o item do carrinho
  cliente_header.querySelector('.remove-item').addEventListener('click', () => {
    cliente_header.parentElement.removeChild(cliente_header);
    clienteNaFatura=null
  });
  clienteNaFatura=user
}
async function comprar(){
    if (cart.length === 0) {
        alert('Carrinho vazio. Nenhum item para enviar.');
        return; // Sai da função se o carrinho estiver vazio
    }

    const itemsToSend = cart.map(item => ({
        nome: item.nome,
        preco: item.preco
    }))

    try {
        const response = await fetch("http://localhost:5500/api/v1/compra", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itens: JSON.stringify(itemsToSend),
            total: cart.reduce((acc, item) => acc + item.preco, 0), // Supondo que 'preco' é o preço de cada item
            codigo: "SEU_CODIGO_DA_COMPRA", // Substitua 'SEU_CODIGO_DA_COMPRA' pelo código real da compra
            data_compra: new Date().toISOString(), // Usa a data atual como string ISO
            hora_compra: new Date().toLocaleTimeString(), // Usa a hora local atual como string
            cliente:clienteNaFatura?{
              nome:clienteNaFatura.nome,
              email:clienteNaFatura.email,
              obs:clienteNaFatura.obs
            }:null,
          }),
        });

        if (!response.ok) throw new Error('Falha ao enviar os itens para checkout');

        alert('Itens enviados com sucesso!');
        cart = []; // Limpa o carrinho após o envio bem-sucedido
        renderCart(); // Atualiza a visualização do carrinho, se necessário
    } catch (error) {
        console.error('Erro ao enviar os itens:', error);
    }
}
export { renderItems, addToCart, renderCart, scrollToBottom,comprar };
