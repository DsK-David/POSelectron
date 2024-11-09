// const { fetchItemsData } = require("../utils/fetchItemsData.js");

let cart = [];
let itemsData = [];
let entidadesData = [];
let categoriaData = [];
require("dotenv").config();
const itemsContainer = document.getElementById("items");
const cartItemsContainer = document.getElementById("cart-items");
const purchasePopup = document.getElementById("purchase-popup");
const payableAmountElement = document.getElementById("payable-amount");
const purchaseForm = document.getElementById("purchase-form");
const modalVenda=document.getElementById("modalVenda")
 const loading = document.getElementById("loading");
document.getElementById("barcode").focus()

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${process.env.AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da API: ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados da API: ${url}`, error);
    throw error;
  }
}

async function fetchItemsData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/produto/entidade?id=${entidadeID}`;
  itemsData = await fetchData(url);
}
// fetchItemsData()

async function fetchEntidadeData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/entidade?id=${entidadeID}`;
  entidadesData = await fetchData(url);
}

async function fetchCategoriaData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/categoria/entidade?id=${entidadeID}`;
  categoriaData = await fetchData(url);
}

async function renderItems() {
  await fetchItemsData();
  itemsContainer.innerHTML = "";
  itemsData.data.forEach((item) => {
    const itemDiv = document.createElement("div");
    var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`;
    if (!item.FOTO_PERFIL) {
      foto_produto =
        "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
    }
    itemDiv.className = "item";
    itemDiv.innerHTML =
      `
      <img src="` +
      foto_produto +
      `"   alt="${item.DESIG}">
      <br><span>${item.DESIG}</span>
      <br><strong>$${item.Preco_venda}</strong>
    `;
    itemDiv.onclick = () => addToCart(item);
    itemsContainer.appendChild(itemDiv);
  });
}

async function renderEntidadesData() {
  await fetchEntidadeData();
  const entidadeContainer = document.getElementById("entidade");
  const entidade = entidadesData.data[0];
  entidadeContainer.innerHTML = `
    <img src="https://sige.opentec.cv/web/imagem/imagens_empresa/${entidade.FOTO_EMPRESA}" alt="${entidade.DESIG}"> <h1>${entidade.DESIG}</h1>
   
  `;
}

async function renderCategoria() {
  await fetchCategoriaData();
  const menu = document.getElementById("menu-content");
  menu.innerHTML = "";
  categoriaData.data.forEach((categoria) => {
    const categoriaDiv = document.createElement("div");
    categoriaDiv.className = "menu-btn";
    categoriaDiv.innerHTML = `<span>${categoria.DESIG}</span>`;
    categoriaDiv.onclick = () => mostrarProdutoPorCategoria(categoria.ID);

    menu.appendChild(categoriaDiv);
  });
}

function addToCart(item) {
  // Adiciona a quantidade inicial de 1 ao item
  item.quantity = 1;
  cart.push(item);
  renderCart();
  scrollToBottom(cartItemsContainer);

  // Define o foco no input de quantidade do último item adicionado
  const lastQuantityInput = document.querySelector(
    `.cart-item:nth-child(${cart.length}) .item-quantity`
  );
  // if (lastQuantityInput) {
  //   lastQuantityInput.focus();
  // }
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;
  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <div class="item-details" id="item-details">
        <span class="item-name">${item.DESIG}</span>
        <span class="item-price">$${item.Preco_venda}</span>
        <input type="number" class="item-quantity" value="${
          item.quantity
        }" min="1" data-index="${index}" onchange="updateQuantity(${index}, this.value)">
        <span class="item-total">$${(item.Preco_venda * item.quantity).toFixed(
          2
        )}</span>
      </div>
      <button class="remove-item" data-index="${index}">✕</button>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
    subtotal += parseFloat(item.Preco_venda) * item.quantity; // Calcula o subtotal com base na quantidade
  });
  payableAmountElement.innerText = subtotal.toFixed(2);
  


  scrollToBottom(cartItemsContainer);
  updateSubtotal();
}

function updateQuantity(index, quantity) {
  const item = cart[index];
  item.quantity = parseInt(quantity, 10); // Atualiza a quantidade no item do carrinho
  const totalElement = document.querySelector(
    `.cart-item:nth-child(${index + 1}) .item-total`
  );
  const price = parseFloat(item.Preco_venda);
  const newTotal = price * item.quantity;
  totalElement.innerText = `$${newTotal.toFixed(2)}`;
  updateSubtotal();
}

function updateSubtotal() {
  let newSubtotal = 0;
  document.querySelectorAll(".item-total").forEach((totalElement) => {
    newSubtotal += parseFloat(totalElement.innerText.slice(1)); // Remove o símbolo de dólar e converte para float
  });
  payableAmountElement.innerText = newSubtotal.toFixed(2);


}
function calculateChange() {
  const amountReceived =
    parseFloat(document.getElementById("amount-received").value) || 0;
  const payableAmount =
    parseFloat(document.getElementById("payable-amount").innerText) || 0;
  const changeAmount = amountReceived - payableAmount;
  document.getElementById("change-amount").innerText =
    changeAmount >= 0 ? changeAmount.toFixed(2) : "0.00";
}

function abriCheckoutModal() {
  const modal = document.getElementById("MainModal");
  const modalContent = document.querySelector(".modal-content");


  // Calculando o total
  let total = 0;
  let subtotal = 0;
  let taxRate = 0.15; // Taxa de imposto de 15%

  // Gerando as linhas da tabela de itens
  const itemRows = cart
    .map((item) => {
      const subtotalItem = item.Preco_venda * item.quantity;
      subtotal += subtotalItem;
      total += subtotalItem;
      return `
      <div class="modal-itens">
      <tr>
        <td>${item.DESIG}</td>
        <td>${item.Preco_venda} ECV</td>
        <td>${item.quantity}</td>
        <td>${
          item.Preco_venda * item.quantity
        } ECV <button class="remove-item"><i class='bx bx-trash'></i></button></td>
      </tr>
      </div>
    `;
    })
    .join("");

  // Calculando o imposto e o troco
  const taxAmount = subtotal * taxRate;
  // const totalWithTax = subtotal + taxAmount;

  modalContent.innerHTML = `
  <span class="close">&times;</span>
  <div id="checkout-modal">
    <!-- Seção de Itens -->
    <div class="left-section">
      <table class="item-table">
        <thead>
          <tr>
            <th>ITEM</th>
            <th>PREÇO UNI</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>
      <button class="cancel-button">CANCELAR VENDA</button>
    </div>

    <!-- Seção de Pagamento -->
    <div class="right-section">
      <div class="total-section">
        <p>Total por Pagar:</p>
        <p class="total-amount">${subtotal} ECV</p>
      </div>
      
      <!-- Opções de Desconto -->
      <div class="discount-options">
        <div class="discount-option">$0</div>
        <div class="discount-option">$5</div>
        <div class="discount-option">$10</div>
        <div class="discount-option">$15</div>
      </div>

      <!-- Opções de Pagamento -->
      <div class="payment-options">
        <select class="payment-option" name="" id="payment-option">
        </select>
        <select class="invoice-type" name="" id="invoice-type"></select>
        <select class="payment-condition" name="" id="payment-condition">
        </select>
      </div>

      <!-- Input para valor recebido -->
      <div class="input-group">
        <label for="received-amount">Recebido com Dinheiro</label>
        <input type="number" id="received-amount" placeholder="185,00">
      </div>

      <!-- Seção de Resumo -->
      <div class="summary-section">
        <p><span>Total:</span> <span>${subtotal} ECV</span></p>
        <p><span>Taxa Imposto:</span> <span>${taxAmount} ECV</span></p>
        <p><span>Troco:</span> <span class="highlight" id="change-amount">0,00 ECV</span></p>
      </div>

      <!-- Botão de Pagar -->
      <button  onclick="finalizarCompra()" class="pay-now-button">PAGAR AGORA</button>
    </div>
  </div>
  `;


  // Função para preencher os selects com dados dinâmicos
  async function preencherCondicaoPagamento() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/fatura/condicao/pagamento"
      );
      const data = await response.json();

      if (response.ok) {
        const condicaoPagamentoSelect =
          document.getElementById("payment-condition");
        condicaoPagamentoSelect.innerHTML = "";

        data.data.forEach((condicao) => {
          const option = document.createElement("option");
          option.value = condicao.ID;
          option.textContent = condicao.DESIG;
          if (condicao.DESIG === "Pronto pagamento") {
            option.selected = true;
          }
          condicaoPagamentoSelect.appendChild(option);
        });
      } else {
        console.error("Erro ao buscar condições de pagamento:", data.message);
      }
    } catch (error) {
      console.error("Erro na requisição para condições de pagamento:", error);
    }
  }

  // Função para preencher o select de Método de Pagamento
  async function preencherMetodoPagamento() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/fatura/metodo/pagamento"
      );
      const data = await response.json();

      if (response.ok) {
        const metodoPagamentoSelect = document.getElementById("payment-option");
        metodoPagamentoSelect.innerHTML = "";

        data.data.forEach((metodo) => {
          const option = document.createElement("option");
          option.value = metodo.ID;
          option.textContent = metodo.DESIG;
          if (metodo.DESIG === "Dinheiro") {
            option.selected = true;
          }
          metodoPagamentoSelect.appendChild(option);
        });
      } else {
        console.error("Erro ao buscar métodos de pagamento:", data.message);
      }
    } catch (error) {
      console.error("Erro na requisição para métodos de pagamento:", error);
    }
  }

  // Função para preencher o select de Tipo de Fatura
  async function preencherTipoFatura() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/fatura/tipo");
      const data = await response.json();

      if (response.ok) {
        const tipoFaturaSelect = document.getElementById("invoice-type");
        tipoFaturaSelect.innerHTML = "";

        data.data.forEach((tipo) => {
          const option = document.createElement("option");
          option.value = tipo.ID;
          option.textContent = `${tipo.DESCR} - ${tipo.TIPO}`;
          if (tipo.DESCR === "Fatura" && tipo.TIPO === "Venda") {
            option.selected = true;
          }
          tipoFaturaSelect.appendChild(option);
        });
      } else {
        console.error("Erro ao buscar tipos de fatura:", data.message);
      }
    } catch (error) {
      console.error("Erro na requisição para tipos de fatura:", error);
    }
  }

  // Chamando as funções de preenchimento dos selects ao abrir o modal
  preencherCondicaoPagamento();
  preencherMetodoPagamento();
  preencherTipoFatura();
 
  function calcularTroco() {
    const receivedAmount =
      parseFloat(document.getElementById("received-amount").value) || 0;
    const troco = receivedAmount - subtotal;
    document.getElementById("change-amount").textContent = `${troco.toFixed(
      2
    )} ECV`;
  }

  // Adicionando o listener ao campo de entrada de valor recebido
  document
    .getElementById("received-amount")
    .addEventListener("input", calcularTroco);

  modal.style.display = "flex"; // Altera para flex apenas ao abrir o modal

  document.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });
   document
     .querySelector(".cancel-button")
     .addEventListener("click", function () {
       modal.style.display = "none";
       limparCarinho()
     });
  
  

  // Fecha o modal se clicar fora dele
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// document.addEventListener("keydown", (event) => {
//   if (event.key === "Enter" && cart.length > 0) {
//     abriCheckoutModal();
//   } else if (event.key === "Enter" && modalVenda.style.display === "block") {
//     event.preventDefault();
//     finalizarCompra();
//   }
// });

async function finalizarCompra() {

const modal = document.getElementById("MainModal");
 const tipoFaturaID = document.getElementById("invoice-type").value;
 const condicoes_pagamento = document.getElementById("payment-condition").value;
 const metodo_pagamento = document.getElementById("payment-option").value;
//  const cliente_codigo = document.getElementById("customer-nif").value;
//  const nota = document.getElementById("invoice-note").value;
//  const desconto_financeiro = document.getElementById("discount-option").value;
 const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
 const utilizador = JSON.parse(localStorage.getItem("perfilID"));
 const cartData = cart.map((item) => ({
   produto_id: item.ID,
   qttd: item.quantity,
   preco_unid: item.Preco_venda,
   desconto_comercial: 0,
   //  total: (item.Preco_venda * item.quantity).toFixed(2),
 }));
 const payload = {
   tipoFaturaID: tipoFaturaID,
   condicoes_pagamento: condicoes_pagamento,
   metodo_pagamento:metodo_pagamento,
  //  cliente_codigo: cliente_codigo,
   entidade_id: entidadeID,
   utilizador: utilizador,
   produtos: cartData,
  //  requisicao: requisicao,
  //  desconto_financeiro: desconto_financeiro,
  //  nota: nota,
 };

  try {
    const response = await fetch("http://localhost:3000/api/v1/fatura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      loading.style.display="flex"
      // alert("Compra finalizada com sucesso!");
      limparCarinho();
      modal.style.display = "none";
  
    } else {
      alert("Erro ao finalizar a compra.");
    }
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
  }
}
function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

function home() {
  renderItems();
  renderCategoria();
  renderEntidadesData();
  checkInternetConnection();
}


function limparCarinho() {
  cart = [];
  renderCart();
  renderItems();
}

document
  .getElementById("cart-items")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      if (!isNaN(index)) {
        cart.splice(index, 1);
        renderCart();
      }
    }
  });
  document
    .getElementById("item-details")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-item")) {
        const index = parseInt(event.target.getAttribute("data-index"));
        if (!isNaN(index)) {
          cart.splice(index, 1);
          renderCart();
        }
      }
    });
  document.addEventListener("keydown", (event) => {
    const barcode = document.getElementById("barcode").value;
    if (event.key === "Enter" && barcode.length > 0) {
      event.preventDefault();
      buscarProdutoPorBarCode();
      
    }
  });
async function buscarProdutoPorBarCode() {
  const barcode = document.getElementById("barcode").value;
   const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/produto/barcode?code=${barcode}&entidade=${entidadeID}`;

  itemsContainer.innerHTML = "";
  itemsData = await fetchData(url);
  itemsData.data.forEach((item) => {
    const itemDiv = document.createElement("div");
    var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`;
    if (!item.FOTO_PERFIL) {
      foto_produto =
        "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
    }
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <img src="${foto_produto}" alt="${item.DESIG}">
      <br><span>${item.DESIG}</span>
      <br><strong>$${item.Preco_venda}</strong>
    `;
    if(item==null){
      alert("produto não encontrado")
    }
    addToCart(item);
    document.getElementById("barcode").value=""
    itemsContainer.appendChild(itemDiv);
    
  });
  
}

async function buscarProdutoPorNome() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  let nome_produto = document
    .getElementById("nome_produto")
    .value.trim()
    .toLowerCase(); // Converte para minúsculas
  if (nome_produto.length > 0) {
    // Verifica se o campo não está vazio
    const url = `http://localhost:3000/api/v1/produto/nome/${nome_produto}/${entidadeID}`;
    itemsContainer.innerHTML = "";
    try {
      itemsData = await fetchData(url);
      // Filtra os itens recebidos para incluir apenas aqueles cujo nome começa com a string digitada, ignorando a caixa
      const filteredItems = itemsData.filter((item) =>
        item.DESIG.trim().toLowerCase().includes(nome_produto)
      );
      filteredItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`;
        if (!item.FOTO_PERFIL) {
          foto_produto =
            "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
        }
        itemDiv.className = "item";
        itemDiv.innerHTML = `
          <img src="${foto_produto}" alt="${item.DESIG}">
          <br><span>${item.DESIG}</span>
          <br><strong>$${item.Preco_venda}</strong>
        `;
        itemDiv.onclick = () => addToCart(item);
        itemsContainer.appendChild(itemDiv);
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  } else {
    home(); // Limpa o container se o campo estiver vazio
  }
}

// Adiciona um event listener para buscar produtos à medida que o usuário digita, com debounce para reduzir o número de chamadas à API
document
  .getElementById("nome_produto")
  .addEventListener("input", debounce(buscarProdutoPorNome, 300));

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Adiciona um event listener para buscar produtos à medida que o usuário digita
document
  .getElementById("nome_produto")
  .addEventListener("input", buscarProdutoPorNome);

async function mostrarProdutoPorCategoria(categoriaID) {
  const url = `http://localhost:3000/api/v1/produto/categoria?id=${categoriaID}`;
  itemsContainer.innerHTML = "";
  itemsData = await fetchData(url);
  itemsData.data.forEach((item) => {
    const itemDiv = document.createElement("div");
    var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`;
    if (!item.FOTO_PERFIL) {
      foto_produto =
        "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
    }
    itemDiv.className = "item";
    itemDiv.innerHTML =
      `
       <img src="` +
      foto_produto +
      `"   alt="${item.DESIG}">
      <br><span>${item.DESIG}</span>
      <br><strong>$${item.Preco_venda}</strong>
    `;
    itemsContainer.appendChild(itemDiv);
  });
}
function checkInternetConnection() {
  const wireless_widget = document.getElementById("wireless");
  fetch("https://www.google.com")
    .then((response) => {
      if (response.ok) {
        wireless_widget.style.color = "#1ABC9C";
      } else {
        wireless_widget.style.color = "red";
      }
    })
    .catch((error) => {
      wireless_widget.style.color = "red";
    });
}


async function comprar() {
  // Recupera os IDs da entidade e do usuário do localStorage
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const perfilID = JSON.parse(localStorage.getItem("perfilID"));


  // Verifica se os IDs estão presentes no localStorage
  if (!entidadeID || !perfilID) {
    console.error("Entity ID ou User ID não encontrado no localStorage");
    return;
  }

  // Cria um array para armazenar os itens do carrinho
  const cartData = cart.map((item) => ({
    IdDoProduto: item.ID,
    NomeDoProduto: item.DESIG,
    PrecoDoProduto: item.Preco_venda,
    quantidade: item.quantity,
    total: (item.Preco_venda * item.quantity).toFixed(2),
  }));

  // Calcula o total da compra
  const totalCompra = cart
    .reduce((acc, item) => acc + item.Preco_venda * item.quantity, 0)
    .toFixed(2);

  // Cria o objeto com todos os dados necessários
  const purchaseData = {
    Entidade_ID: entidadeID,
    UTILIZADOR: perfilID,
    Itens_Comprados: cartData,
    Valor_Total: totalCompra,
  };

  // Envia os dados para a API usando fetch
  fetch("http://localhost:3000/api/v1/venda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchaseData),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Falha ao enviar os itens para checkout");
      // Verifica se a resposta é um Blob (PDF)
      if (response.headers.get("content-type").includes("application/pdf")) {
        return response.blob(); // Se for PDF, retorna o Blob diretamente
      }
      return response.json(); // Caso contrário, trata como JSON
    })
    .then((data) => {
      if (data instanceof Blob) {
        // Se a resposta for um Blob, cria um link para download
        const url = URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        const date=new Date()
        a.download = `fatura_${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.pdf`; // Nome do arquivo PDF
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        limparCarinho(); // Limpa o carrinho após o download
      } else {
        console.log("Compra realizada com sucesso:", data);
        // Aqui você pode adicionar código para limpar o carrinho, mostrar uma mensagem de sucesso, etc.
      }
    })
    .catch((error) => {
      console.error("Erro ao realizar a compra:", error);
      // Aqui você pode adicionar código para lidar com erros, mostrar uma mensagem de erro, etc.
    });
}

checkInternetConnection();
home();
