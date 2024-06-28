// document.addEventListener("DOMContentLoaded", async () => {
//   const itemsContainer = document.getElementById("items");
//   const cartItemsContainer = document.getElementById("cart-items");
//   const subtotalElement = document.getElementById("subtotal");
//   const taxElement = document.getElementById("tax");
//   const payableAmountElement = document.getElementById("payable-amount");

const { response } = require("express");


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
  // homeButton.style.border="1px solid #FC8019"
  // customersButton.style.border = "none";
   // Move itemsData para fora do evento para torná-la global

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
// Função para lidar com o envio do formulário


// function clientes() {
//   const customersButton = document.getElementById("customers");
//   customersButton.className = "select";

//   const itemsContainer = document.getElementById("items");
//   // itemsContainer.innerHTML=`<button onclick="abrirModalDeAdicionarCliente()">Adicionar Cliente</button>`

//   itemsContainer.innerHTML = `
//   <div class="cliente_content"> 
//                 <form id="add-client-form" method="POST" class="cliente-formulario">
//                     <h2>Adicionar Cliente</h2>
//                     <label for="nome">Nome:</label>
//                     <input type="text" id="nome" name="nome" required placeholder="Nome Completo">
            
//                     <label for="contacto">Contato:</label>
//                     <input type="number" id="contacto" name="contacto" required placeholder="Número de Telefone">
            
//                     <label for="email">Email:</label>
//                     <input type="email" id="email" name="email" placeholder="exemplo@email.com">
            
//                     <label for="endereco">Endereço:</label>
//                     <textarea id="endereco" name="endereco" rows="3" placeholder="Digite o endereço completo..."></textarea>
            
//                     <label for="observacoes">Observações:</label>
//                     <textarea id="observacoes" name="observacoes" rows="3" placeholder="Alguma observação especial?"></textarea>
            
//                     <button type="button" onclick="salvarCliente()">Salvar Cliente</button>
//                 </form>
//                 <span id="success-message" style="display:none;">Cliente adicionado com sucesso!</span>
//                 <span id="error-message" style="display:none;">Erro ao adicionar cliente!</span>
//             </div>
//             <div id="customer-list">
//                 <h2>Lista de Clientes</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Nome</th>
//                             <th>Email</th>
//                             <th>Telefone</th>
//                             <th>Endereço</th>
//                             <th>Observações</th>
//                             <th>Ações</th>
//                         </tr>
//                     </thead>
//                     <tbody id="customer-table-body">
//                         <!-- Customers will be populated here by JavaScript -->
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//   `;
//    const menu = document.querySelector(".menu");
//    menu.innerHTML = `<button class="menu-btn" id="" onclick="adicionarProdutosNoSistema()">Adicionar Produto</button>
//                 <button class="menu-btn" id="breakfast" onclick="adicionarFuncionarioNoSistema()">Adicionar Funcionarios</button>
//                 <button class="menu-btn" id="lunch" onclick="verProdutos()">Ver Produtos</button>
//                 <button class="menu-btn" id="supper" onclick="verFuncionarios()">Ver Funcionarios</button>
//                 <button class="menu-btn" id="desserts" onclick="adicionarADministrador()">Adicionar Administrador</button>
//                 `;
//                 loadCustomers()
// }
function clientes() {
  const customersButton = document.getElementById("customers");
  customersButton.className = "select";

  const itemsContainer = document.getElementById("items");
  // Adiciona o botão de adicionar clientes no canto superior direito
  itemsContainer.innerHTML = `
  <div>
    <button id="add-client-btn" onclick="abrirModalDeAdicionarCliente()">Adicionar Cliente</button>
   <div id="customer-list">
                <h2>Lista de Clientes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Observações</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="customer-table-body">
                        <!-- Customers will be populated here by JavaScript -->
                    </tbody>
                </table>
            </div>
            </div>
  `;

  // Restante do código da função...
  loadCustomers()
}
function abrirModalDeAdicionarCliente() {
  const modal = document.getElementById("MainModal");
  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <form id="add-client-form" method="POST" class="cliente-formulario">
      <h2>Adicionar Cliente</h2>
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome" required placeholder="Nome Completo">
      <label for="contacto">Contato:</label>
      <input type="number" id="contacto" name="contacto" required placeholder="Número de Telefone">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="exemplo@email.com">
      <label for="endereco">Endereço:</label>
      <textarea id="endereco" name="endereco" rows="3" placeholder="Digite o endereço completo..."></textarea>
      <label for="observacoes">Observações:</label>
      <textarea id="observacoes" name="observacoes" rows="3" placeholder="Alguma observação especial?"></textarea>
      <button type="button" onclick="salvarCliente()">Salvar Cliente</button>
    </form>
    <span id="success-message" style="display:none;">Cliente adicionado com sucesso!</span>
    <span id="error-message" style="display:none;">Erro ao adicionar cliente!</span>
  `;

  modal.style.display = "block";

  // Adiciona funcionalidade ao botão de fechar do modal
  document.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Fecha o modal se clicar fora dele
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}}
function loadCustomers() {
  const apiUrl = "http://localhost:3000/api/v1";
  fetch(`${apiUrl}/clientes`)
    .then((response) => response.json())
    .then((data) => {
      const customerTableBody = document.getElementById("customer-table-body");
      customerTableBody.innerHTML = "";
      data.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${customer.nome}</td>
                    <td>${customer.email}</td>
                    <td>${customer.telefone}</td>
                    <td>${customer.endereco}</td>
                    <td>${customer.obs}</td>
                    <td>
                        <button class="edit-btn" onclick="editCustomer(${customer.ID})"><i class='bx bx-edit-alt'></i></button>
                        <button class="delete-btn" onclick="deleteCustomer(${customer.ID})"><i class='bx bx-trash'></i></button>
                    </td>
                `;
        customerTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Erro ao carregar clientes:", error));
}

// function salvarCliente() {
//   const nome = document.getElementById("nome").value;
//   const contacto = document.getElementById("contacto").value;
//   const email = document.getElementById("email").value;
//   const endereco = document.getElementById("endereco").value;
//   const observacoes = document.getElementById("observacoes").value;

//   const customer = {
//     nome,
//     telefone: contacto,
//     email,
//     endereco,
//     obs: observacoes,
//   };

//   fetch(`${apiUrl}/clientes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(customer),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       document.getElementById("success-message").style.display = "block";
//       setTimeout(() => {
//         document.getElementById("success-message").style.display = "none";
//       }, 3000);
//       loadCustomers();
//     })
//     .catch((error) => {
//       document.getElementById("error-message").style.display = "block";
//       setTimeout(() => {
//         document.getElementById("error-message").style.display = "none";
//       }, 3000);
//       console.error("Erro ao adicionar cliente:", error);
//     });
// }

function SalvarCliente(){

  const nome = document.getElementById("nome").value;
  const contacto = document.getElementById("contacto").value; // Corrigido o ID
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const observacoes = document.getElementById("observacoes").value;


  fetch("http://localhost:3000/api/v1/clientes",{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      nome:nome,
      telefone:contacto,
      email:email,
      endereco:endereco,
      obs:observacoes
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("erro",error))
}

document.querySelector(".header-btn").addEventListener("click", openModal);
  const cliente = []
// Função para abrir o modal
function openModal() {
  const modal = document.getElementById("MainModal");
  const modalContent=document.querySelector(".modal-content")
  modalContent.innerHTML = `
  <span class="close">&times;</span>
  <form method="POST" class="adicionar_cliente_fatura_form">
    <h2>Adicionar Cliente</h2>
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required placeholder="Nome Completo">

    <label for="contato">Contato:</label>
    <input type="number" id="contato" name="contato" required placeholder="Número de Telefone">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="exemplo@email.com">


    <button onclick="adicionarClienteTemporarioNaFatura()">Adicionar Cliente</button>
</form>
  `;

  cliente.push({
    nome:document.getElementById("nome").value,
    contato:document.getElementById("contato").value,
    email:document.getElementById("email").value

  })
  console.log(cliente)
  modal.style.display = "block";

  // Quando o usuário clica fora do modal, fecha-o
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Botão de fechar
  document.querySelector(".close").onclick = function () {
    modal.style.display = "none"
  }
}
function adicionarClienteTemporarioNaFatura(){
  adicionarNaFatura(cliente)
}
document
  .querySelector(".search_customers")
  .addEventListener("click", openSearchCustomersModal);

function openSearchCustomersModal() {
  const modal = document.getElementById("MainModal");
  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = `
  <div class="buscar_cliente_fatura_form">
    <span class="close">&times;</span>
    <h2>Procurar Cliente</h2>
    <label for="nome">Nome:</label>
    <input id="search-input" type="text" name="nome" required placeholder="Nome Completo">
    <button id="search">Procurar Cliente</button>
    <div id="search-results"></div>
    </div>
  `;
  modal.style.display = "block";

  // Quando o usuário clica fora do modal, fecha-o
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Botão de fechar
  document.querySelector(".close").onclick = function () {
    modal.style.display = "none";
  };

  // Adiciona o event listener para o botão de pesquisa após a criação do modal
  document.getElementById("search").addEventListener("click", searchCustomers);
}
async function searchCustomers() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const response = await fetch("http://localhost:3000/api/v1/clientes");
  const users = await response.json();

  const results = users.filter(
    (user) =>
      user.nome.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );

  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach((user) => {
      const userElement = document.createElement("p");
      userElement.innerHTML = `<label>Name:</label> 
      <span>${user.nome}</span>,<span> Email: ${user.email}</span>,
      OBS: ${user.obs}</span>
       <button class="add_fatura">Adicionar</button>`;
       userElement.querySelector(".add_fatura").addEventListener('click',()=> adicionarNaFatura(user))
      resultsContainer.appendChild(userElement);
    });
  } else {
    resultsContainer.innerHTML = "<p>Cliente não encontrado</p>";
  }
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
function dashboard() {
    showLogin()
}
function reports(){
const itemsContainer = document.getElementById("items");
itemsContainer.innerHTML = `
        <div id="filter-controls">
            <label for="day-filter">Dia:</label>
            <input type="number" id="day-filter" min="1" max="31" placeholder="Dia">
            <label for="month-filter">Mês:</label>
            <input type="number" id="month-filter" min="1" max="12" placeholder="Mês">
            <label for="year-filter">Ano:</label>
            <input type="number" id="year-filter" placeholder="Ano">
            <button onclick="applyFilter()">Filtrar</button>
        </div>
        <div id="purchases-container"></div>
        `;
        const menu = document.querySelector(".menu")
        menu.innerHTML = `<button class="menu-btn" id="" onclick="adicionarProdutosNoSistema()">Adicionar Produto</button>
                <button class="menu-btn" id="breakfast" onclick="adicionarFuncionarioNoSistema()">Adicionar Funcionarios</button>
                <button class="menu-btn" id="lunch" onclick="verProdutos()">Ver Produtos</button>
                <button class="menu-btn" id="supper" onclick="verFuncionarios()">Ver Funcionarios</button>
                <button class="menu-btn" id="desserts" onclick="adicionarADministrador()">Adicionar Administrador</button>
                `;
applyFilter();

}
    function showLogin() {
      const itemsContainer = document.getElementById("items");
      itemsContainer.innerHTML = `
                <div id="items" class="login-container">
        <div class="login-box">
            <h2>Login</h2>
            <form id="login-form">
                <div class="input-group">
                    <label for="username">Usuário</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button onclick="login()">Entrar</button>
            </form>
        </div>
    </div>
            `;
    }

function adicionarProdutosNoSistema(){
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
                <div id="items" class="producst-container">
        <div class="login-box">
            <h2>Login</h2>
            <form id="login-form">
                <div class="input-group">
                    <label for="username">Usuário</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button onclick="login()">Entrar</button>
            </form>
        </div>
    </div>
            `;
}
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
//   try {
//     const response = await fetch("http://localhost:3000/api/v1/admin/");
//     const admins = await response.json();
//     console.log("Admins fetched:", admins); // Debugging: See what you got from the server
//     const admin = admins.filter(
//       (admin) => admin.nome_admin.toLowerCase() === username.toLowerCase() && admin.senha === password
//     );

//     if (admin.length > 0) {
//       console.log("Login successful, redirecting to reports.");
//       reports(); // Make sure this function is correctly implemented
//     } else {
//       console.log("Login failed, username or password incorrect.");
//       alert("Usuário ou senha inválidos");
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//   alert(error)
// }
if(username === "david" && password==="2513"){
  reports()
}
else{
  alert("Usuário ou senha inválidos")
}
}
async function applyFilter() {
  const dayFilter = document.getElementById("day-filter").value;
  const monthFilter = document.getElementById("month-filter").value;
  const yearFilter = document.getElementById("year-filter").value;

  try {
    const response = await fetch("http://localhost:5500/api/v1/compra");
    const purchases = await response.json();

    const filteredPurchases = purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.data_compra);
      const dayMatches = dayFilter ? purchaseDate.getDate() == dayFilter : true;
      const monthMatches = monthFilter
        ? purchaseDate.getMonth() + 1 == monthFilter
        : true; // getMonth() retorna 0-11
      const yearMatches = yearFilter
        ? purchaseDate.getFullYear() == yearFilter
        : true;
      return dayMatches && monthMatches && yearMatches;
    });

    displayPurchases(filteredPurchases);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function displayPurchases(purchases) {
  const purchasesContainer = document.getElementById("purchases-container");
  purchasesContainer.innerHTML = ""; // Limpa o container

  if (purchases.length === 0) {
    purchasesContainer.innerHTML =
      "<p>Nenhuma compra encontrada para os filtros aplicados.</p>";
    return;
  }

  purchases.forEach((purchase) => {
    const purchaseElement = document.createElement("div");
    purchaseElement.classList.add("purchase");

    let itens;
    try {
      itens = JSON.parse(purchase.itens);
    } catch (error) {
      itens = purchase.itens;
    }

    const itensList = Array.isArray(itens)
      ? itens.map((item) => `<li>${item.nome}: ${item.preco}</li>`).join("")
      : itens;

    purchaseElement.innerHTML = `
      <div class="purchase-details">
        <p><strong>ID:</strong> ${purchase.id}</p>
        <p><strong>Itens:</strong></p>
        <ul>${itensList}</ul>
        <p><strong>Total:</strong> ${purchase.total}</p>
        <p><strong>Data da compra:</strong> ${new Date(
          purchase.data_compra
        ).toLocaleDateString()}</p>
        <p><strong>Hora da compra:</strong> ${purchase.hora_compra}</p>
      </div>
    `;
    purchasesContainer.appendChild(purchaseElement);
  });
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

async function comprar() {

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