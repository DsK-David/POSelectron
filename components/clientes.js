// clientes.js

import { renderCart, scrollToBottom } from "./home.js";

function clientes() {
  const customersButton = document.getElementById("clients");
  customersButton.className = "active";

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
    <div>
      <button id="add-client-btn">Adicionar Cliente</button>
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

  // Adicionar event listener
  const addButton = document.getElementById("add-client-btn");
  addButton.addEventListener("click", abrirModalDeAdicionarCliente);

  loadCustomers();
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

  document.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

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

function salvarCliente() {
  const apiUrl = "http://localhost:3000/api/v1";
  const nome = document.getElementById("nome").value;
  const contacto = document.getElementById("contacto").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const observacoes = document.getElementById("observacoes").value;

  const customer = {
    nome,
    telefone: contacto,
    email,
    endereco,
    obs: observacoes,
  };

  fetch(`${apiUrl}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("success-message").style.display = "block";
      setTimeout(() => {
        document.getElementById("success-message").style.display = "none";
      }, 3000);
      loadCustomers();
    })
    .catch((error) => {

      document.getElementById("error-message").style.display = "block";
      document.getElementById("error-message").innerHTML=`<span>${error}</span>`
      setTimeout(() => {
        document.getElementById("error-message").style.display = "none";
      }, 3000);
      console.error("Erro ao adicionar cliente:", error);
    });
}

export { clientes, abrirModalDeAdicionarCliente, loadCustomers, salvarCliente };
