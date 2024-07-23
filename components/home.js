let cart = [];
let itemsData = [];
let entidadesData = [];
let categoriaData = [];

const itemsContainer = document.getElementById("items");
const homeButton = document.getElementById("home");
const customersButton = document.getElementById("customers");
const cartItemsContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const taxElement = document.getElementById("tax");
const payableAmountElement = document.getElementById("payable-amount");

async function fetchData(url) {
  try {
    const response = await fetch(url);
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
  cart.push(item);
  renderCart();
  scrollToBottom(cartItemsContainer);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;
  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <div class="item-details">
        <span>${item.DESIG}</span>
        <br>
        <span class="item-price">$${item.Preco_venda}</span>
      </div>
      <button class="remove-item" data-index="${index}">✕</button>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
    subtotal += parseFloat(item.Preco_venda);
  });

  payableAmountElement.innerText = subtotal.toFixed(2);

  scrollToBottom(cartItemsContainer);
}

function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

function home() {
  renderItems();
  renderCategoria();
  renderEntidadesData();
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
    const barcode_input = document.getElementById("barcode").value;
    const url = `http://localhost:3000/api/v1/produto/barcode/${barcode_input}`;
     
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
       <img src="`+foto_produto+`"   alt="${item.DESIG}">
      <br><span>${item.DESIG}</span>
      <br><strong>$${item.Preco_venda}</strong>
    `;
      addToCart(item);
      itemsContainer.appendChild(itemDiv);
    });
  }
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

home();
