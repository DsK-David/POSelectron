const entidadeID = localStorage.getItem("entidadeID");
const id = JSON.parse(entidadeID);
function mostrarMessage(message) {
  const success_message = document.getElementById("success-message");
  success_message.innerTEXT = message;
}

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
                            <th>Codigo</th>
                            <th>NIF</th>
                            <th>Telefone</th>
                            <th>Imposto</th>
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
  MostrarClientes();
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
      <button type="button" class="salvarClienteBtn" onclick=SalvarCliente()>Salvar Cliente</button>
    </form>
    <span id="success-message" style="display:none;">Cliente adicionado com sucesso!</span>
    <span id="error-message" style="display:none;">Erro ao adicionar cliente!</span>
  `;

  modal.style.display = "block";

  // Adiciona funcionalidade ao botão de fechar do modal
  document.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Fecha o modal se clicar fora dele
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function SalvarCliente() {
  const nome = document.getElementById("nome").value;
  const contacto = document.getElementById("contacto").value; // Corrigido o ID
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const observacoes = document.getElementById("observacoes").value;

  fetch("http://localhost:3300/api/v1/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      telefone: contacto,
      email: email,
      endereco: endereco,
      obs: observacoes,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarMessage(data.message);
    })
    .catch((error) => console.error("erro", error));
  MostrarClientes();
}
function MostrarClientes() {
  const apiUrl = `http://localhost:3000/api/v1`;
  fetch(`${apiUrl}/cliente/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const customerTableBody = document.getElementById("customer-table-body");
      customerTableBody.innerHTML = "";
      data.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${customer.DESIG}</td>
                    <td>${customer.EMAIL}</td>
                    <td>${customer.CODIGO}</td>
                    <td>${customer.NIF}</td>
                    <td>${customer.TELEFONE}</td>
                    <td>${customer.APLICAR_IMPOSTOS}</td>
                   
                    <td>
                        <button class="edit-btn" onclick="editarCliente(${customer.ID})"><i class='bx bx-edit-alt'></i></button>
                        <button class="delete-btn" onclick="deletarCliente(${customer.ID})"><i class='bx bx-trash'></i></button>
                    </td>
                `;
        customerTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Erro ao carregar clientes:", error));
}
function deletarCliente(id) {
  const apiUrl = "http://localhost:3300/api/v1";
  fetch(`${apiUrl}/clientes/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("erro", error));
  MostrarClientes();
}
// document.querySelector(".salvarClienteBtn").addEventListener("click", SalvarCliente);

document
  .querySelector(".header-btn")
  .addEventListener("click", abrirModaldeAdicionarClienteTemporario);
const cliente = [];
// Função para abrir o modal
function abrirModaldeAdicionarClienteTemporario() {
  const modal = document.getElementById("MainModal");
  const modalContent = document.querySelector(".modal-content");
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
    nome: document.getElementById("nome").value,
    contato: document.getElementById("contato").value,
    email: document.getElementById("email").value,
  });
  console.log(cliente);
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
}
function adicionarClienteTemporarioNaFatura() {
  adicionarNaFatura(cliente);
}
document
  .querySelector(".search_customers")
  .addEventListener("click", abrirModalDeBuscarCliente);

function abrirModalDeBuscarCliente() {
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
  document.getElementById("search").addEventListener("click", buscarClientes);
}
async function buscarClientes() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const response = await fetch(`http://localhost:3000/api/v1/cliente/${id}`);
  const users = await response.json();

  const results = users.filter(
    (user) =>
      user.DESIG.toLowerCase().includes(query) ||
      user.EMAIL.toLowerCase().includes(query)
  );

  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach((user) => {
      const userElement = document.createElement("p");
      userElement.innerHTML = `<label>Name:</label> 
      <span>${user.DESIG}</span>,<span> Email: ${user.EMAIL}</span>,
      OBS: ${user.NIF}</span>
       <button class="add_fatura">Adicionar</button>`;
      userElement
        .querySelector(".add_fatura")
        .addEventListener("click", () => adicionarNaFatura(user));
      resultsContainer.appendChild(userElement);
    });
  } else {
    resultsContainer.innerHTML = "<p>Cliente não encontrado</p>";
  }
}
let clienteNaFatura = null;
function adicionarNaFatura(user) {
  const cliente_header = document.querySelector(".cliente_na_fatura");
  const cart_header = document.querySelector(".cart-header");
  cliente_header.innerHTML = `
    <span>${user.DESIG}</span> - <span>${user.EMAIL}</span> - <span>${user.obs}</span>
    <button class="remove-item">X</button>`;

  // Adiciona um ouvinte de evento para remover o item do carrinho
  cliente_header.querySelector(".remove-item").addEventListener("click", () => {
    cliente_header.parentElement.removeChild(cliente_header);
    clienteNaFatura = null;
  });
  clienteNaFatura = user;
}
