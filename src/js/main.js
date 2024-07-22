const { response } = require("express");

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
    location.href='login.html'
}

async function comprar() {
  if (cart.length === 0) {
    alert("Carrinho vazio. Nenhum item para enviar.");
    return; // Sai da função se o carrinho estiver vazio
  }

  const itemsToSend = cart.map((item) => ({
    nome: item.nome,
    preco: item.preco,
  }));

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
        cliente: clienteNaFatura
          ? {
              nome: clienteNaFatura.nome,
              email: clienteNaFatura.email,
              obs: clienteNaFatura.obs,
            }
          : null,
      }),
    });

    if (!response.ok) throw new Error("Falha ao enviar os itens para checkout");

    alert("Itens enviados com sucesso!");
    cart = []; // Limpa o carrinho após o envio bem-sucedido
    mostrarCarinho(); // Atualiza a visualização do carrinho, se necessário
  } catch (error) {
    console.error("Erro ao enviar os itens:", error);
  }
}

let userData = []
 async function logar(){
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const loginResponse = await fetch(
   ` http://localhost:3000/api/v1/auth/${username}/${password}`
  );
  const loginData = await loginResponse.json()
  loginData.forEach((data)=>{
  try {
    alert(`ok logado como ${data.USERNAME} `);
    const entidadeID = data.Entidade_ID;
    userData.push(entidadeID);
    localStorage.setItem("entidadeID", JSON.stringify(userData));
    location.href = "index.html";
  } catch (error) {
    alert(error)
  }
  })
   
}