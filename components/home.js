const { WebSocketServer } = require("ws");

let cart = [];
let itemsData = [];
let entidadesData = [];
let categoriaData = [];
// const WebSocketServer = require("sw")
const itemsContainer = document.getElementById("items");
const homeButton = document.getElementById("home");
const customersButton = document.getElementById("customers");
const cartItemsContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const payableAmountElement = document.getElementById("payable-amount");

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "authorization": "david",
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
  const url = `http://localhost:3000/api/v1/produto/${entidadeID}`;
  itemsData = await fetchData(url);
}

async function fetchEntidadeData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/entidade/${entidadeID}`;
  entidadesData = await fetchData(url);
}

async function fetchCategoriaData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/categoria/${entidadeID}`;
  categoriaData = await fetchData(url);
}

async function renderItems() {
  await fetchItemsData();
  itemsContainer.innerHTML = "";
  itemsData.forEach((item) => {
    const itemDiv = document.createElement("div");
    var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`
    if(!item.FOTO_PERFIL){
      foto_produto =
        "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
    }
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <img src="`+foto_produto+`"   alt="${item.DESIG}">
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
  const entidade = entidadesData[0];
  entidadeContainer.innerHTML = `
    <img src="https://sige.opentec.cv/web/imagem/imagens_empresa/${entidade.FOTO_EMPRESA}" alt="${entidade.DESIG}"> <h1>${entidade.DESIG}</h1>
   
  `;
}

async function renderCategoria() {
  await fetchCategoriaData();
  const menu = document.getElementById("menu-content");
  menu.innerHTML = "";
  categoriaData.forEach((categoria) => {
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
  if (lastQuantityInput) {
    lastQuantityInput.focus();
  }
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;
  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <div class="item-details">
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
  renderItems()
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
async function buscarProdutoPorBarCode() {
  const barcode =  document.getElementById("barcode").value;
  const url = `http://localhost:3000/api/v1/produto/barcode/${barcode}`;

  itemsContainer.innerHTML = "";
  itemsData = await fetchData(url);
  itemsData.forEach((item) => {
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
    addToCart(item);
    itemsContainer.appendChild(itemDiv);
  });
}

async function buscarProdutoPorNome() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  let nome_produto = document.getElementById("nome_produto").value.trim().toLowerCase(); // Converte para minúsculas
  if (nome_produto.length > 0) { // Verifica se o campo não está vazio
    const url = `http://localhost:3000/api/v1/produto/nome/${nome_produto}/${entidadeID}`;
    itemsContainer.innerHTML = "";
    try {
      itemsData = await fetchData(url);
      // Filtra os itens recebidos para incluir apenas aqueles cujo nome começa com a string digitada, ignorando a caixa
      const filteredItems = itemsData.filter((item)=> item.DESIG.trim().toLowerCase().includes(nome_produto))
      filteredItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`;
        if (!item.FOTO_PERFIL) {
          foto_produto = "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
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
    home() // Limpa o container se o campo estiver vazio
  }
}

// Adiciona um event listener para buscar produtos à medida que o usuário digita, com debounce para reduzir o número de chamadas à API
document.getElementById("nome_produto").addEventListener('input', debounce(buscarProdutoPorNome, 300));

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  }
}

// Adiciona um event listener para buscar produtos à medida que o usuário digita
document
  .getElementById("nome_produto")
  .addEventListener("input", buscarProdutoPorNome);
  async function mostrarProdutoPorCategoria(categoriaID){
    const url = `http://localhost:3000/api/v1/produto/categoria/${categoriaID}`;
    itemsContainer.innerHTML = ''
    itemsData = await fetchData(url)
    itemsData.forEach((item)=>{
      const itemDiv = document.createElement("div");
       var foto_produto = `https://sige.opentec.cv/web/imagem/imagens_produtos/${item.FOTO_PERFIL}`;
       if (!item.FOTO_PERFIL) {
         foto_produto =
           "https://www.casanovanet.com.br/wp-content/uploads/2020/09/download.jpg";
       }
      itemDiv.className = "item";
      itemDiv.innerHTML = `
       <img src="`+foto_produto+`"   alt="${item.DESIG}">
      <br><span>${item.DESIG}</span>
      <br><strong>$${item.Preco_venda}</strong>
    `;
  itemsContainer.appendChild(itemDiv);
    })
  }
function checkInternetConnection() {
   const wireless_widget = document.getElementById("wireless");
  fetch('https://www.google.com')
    .then(response => {
      if (response.ok) {
      wireless_widget.style.color = "#1ABC9C";
      } else {
       wireless_widget.style.color = "red";
      }
    })
    .catch(error => {
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
    PrecoDoProtudo: item.Preco_venda,
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
        a.download = "fatura.pdf"; // Nome do arquivo PDF
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
