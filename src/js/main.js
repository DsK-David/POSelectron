// document.addEventListener("DOMContentLoaded", async () => {
//   const itemsContainer = document.getElementById("items");
//   const cartItemsContainer = document.getElementById("cart-items");
//   const subtotalElement = document.getElementById("subtotal");
//   const taxElement = document.getElementById("tax");
//   const payableAmountElement = document.getElementById("payable-amount");

//   let cart = [];
//   let itemsData = []; // Move itemsData para fora do evento para torná-la global

//   async function fetchItemsData() {
//     try {
//       const response = await fetch("http://localhost:5500/api/v1/produtos"); // Substitua pela URL da sua API
//       itemsData = await response.json(); // Atualiza a variável global itemsData
//     } catch (error) {
//       console.error("Erro ao buscar dados da API:", error);
//     }
//   }

//   async function renderItems() {
//     await fetchItemsData(); // Garante que itemsData seja preenchida antes de renderizar os itens
//     itemsContainer.innerHTML = "";
//     itemsData.forEach((item) => {
//       const itemDiv = document.createElement("div");
//       itemDiv.className = "item";
//       itemDiv.innerHTML = `<img src="${item.imagem}" alt="${item.nome}">
//       <br><span>${item.nome}</span>
//       <br><strong>$${item.preco}</strong>`;
//       itemDiv.onclick = () => addToCart(item); // Passa o objeto item diretamente
//       itemsContainer.appendChild(itemDiv);
//     });
//   }

//   function addToCart(item) {
//     cart.push(item); // Adiciona o item diretamente ao carrinho
//     renderCart();
//     scrollToBottom(cartItemsContainer);
//   }

//   function renderCart() {
//     cartItemsContainer.innerHTML = "";
//     let subtotal = 0;
//     cart.forEach((item) => {
//       const cartItemDiv = document.createElement("div");
//       cartItemDiv.innerText = `${item.nome} - $${item.preco} x`;
//       cartItemsContainer.appendChild(cartItemDiv);
//       subtotal += item.preco;
//     });
//     const tax = subtotal * 0.225;
//     const payableAmount = subtotal - tax;

//     subtotalElement.innerText = subtotal.toFixed(2);
//     taxElement.innerText = tax.toFixed(2);
//     payableAmountElement.innerText = payableAmount.toFixed(2);
//   }

//   function scrollToBottom(container) {
//     container.scrollTop = container.scrollHeight;
//   }
// // Chama renderItems após o evento DOMContentLoaded
// renderItems(); 
// });

function home() {
  const itemsContainer = document.getElementById("items");
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const payableAmountElement = document.getElementById("payable-amount");
  // homeButton.style.border="1px solid #FC8019"
  // customersButton.style.border = "none";
  let cart = [];
  let itemsData = []; // Move itemsData para fora do evento para torná-la global

  async function fetchItemsData() {
    try {
      const response = await fetch("http://localhost:5500/api/v1/produtos"); // Substitua pela URL da sua API
      itemsData = await response.json(); // Atualiza a variável global itemsData
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }

  async function renderItems() {
    await fetchItemsData(); // Garante que itemsData seja preenchida antes de renderizar os itens
    itemsContainer.innerHTML = "";
    itemsData.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `<img src="${item.imagem}" alt="${item.nome}">
      <br><span>${item.nome}</span>
      <br><strong>$${item.preco}</strong>`;
      itemDiv.onclick = () => addToCart(item); // Passa o objeto item diretamente
      itemsContainer.appendChild(itemDiv);
    });
  }

  function addToCart(item) {
    cart.push(item); // Adiciona o item diretamente ao carrinho
    renderCart();
    scrollToBottom(cartItemsContainer);
  }
  document
    .getElementById("cart-items")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-item")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        if(!isNaN(index)){

          cart.splice(index, 1); // Remove o item do carrinho
          renderCart(); // Re-renderiza o carrinho após a remoção
        }
      }
    });
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    
    let subtotal = 0;
    cart.forEach((item,index) => {
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


scrollToBottom(cartItemsContainer)
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }
  // Chama renderItems após o evento DOMContentLoaded
  renderItems();
}
document.querySelectorAll(".sidebar button").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove a classe 'active' de todos os botões
    document
      .querySelectorAll(".sidebar button")
      .forEach((btn) => btn.classList.remove("active"));
    // Adiciona a classe 'active' ao botão clicado
    this.classList.add("active");
  });
});
function clientes() {
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";
  // homeButton.style.border = "none";
  // customersButton.style.border = "1px solid #FC8019";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <div class="cliente_content"> 
    <form action="/adicionar_cliente" method="POST" class="cliente-formulario">
    <h2>Adicionar Cliente</h2>
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required placeholder="Nome Completo">

    <label for="contato">Contato:</label>
    <input type="tel" id="contato" name="contato" pattern="[0-9]{10,15}" required placeholder="Número de Telefone">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="exemplo@email.com">

    <label for="endereco">Endereço:</label>
    <textarea id="endereco" name="endereco" rows="3" placeholder="Digite o endereço completo..."></textarea>

    <label for="observacoes">Observações:</label>
    <textarea id="observacoes" name="observacoes" rows="3" placeholder="Alguma observação especial?"></textarea>

    <button type="submit">Salvar Cliente</button>
</form>
     </div>

    
    `;
}
function cashier() {
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";
  // homeButton.style.border = "none";
  // customersButton.style.border = "1px solid #FC8019";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <h1>Cashier</h1>
    
    `;
}
function orders() {
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";
  // homeButton.style.border = "none";
  // customersButton.style.border = "1px solid #FC8019";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <h1>Orders</h1>
    
    `;
}
function reports() {
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";
  // homeButton.style.border = "none";
  // customersButton.style.border = "1px solid #FC8019";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <h1>Dashboard</h1>
    
    `;
}
function settings() {
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";
  // homeButton.style.border = "none";
  // customersButton.style.border = "1px solid #FC8019";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <h1>Configuração</h1>
    
    `;
}
function logout() {
  const homeButton = document.getElementById("home");
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";
  // homeButton.style.border = "none";
  // customersButton.style.border = "1px solid #FC8019";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <h1>Logout bye bye</h1>
    
    `;
}