exports.loadCustomers = function() {
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
