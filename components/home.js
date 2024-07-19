let cart = [];
let itemsData = [];
let entidadesData = []
let categoriaData = []

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
      // const response = await fetch("http://localhost:5500/api/v1/produtos"); // Substitua pela URL da sua API
      // const response = await fetch(
      //   "http://faturaapi.serveo.net/faturacao-api/web/index.php?r=product/by-category&entidade_id=A56CA66F-54DB-4953-88FE-47C8C7D653B3&category_id=76a4694f-e266-37fa-0795-d3cb3bf0c896"
      // );
      // const response = await fetch(
      //   "http://faturaapi.serveo.net/faturacao-api/web/index.php?r=product/all"
      // );
      const entidadeID = localStorage.getItem("entidadeID");
      const id = JSON.parse(entidadeID);
      const produtosResponse = await fetch(
        `http://localhost:3000/api/v1/produto/${id}`
      )
      itemsData = await produtosResponse.json(); // Atualiza a variável global itemsData
   
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }
async function fetchEntidadeData(){
  try {
    
    const entidadeID = localStorage.getItem("entidadeID");
    const id = JSON.parse(entidadeID);
    const entidadesResponse = await fetch(
      `http://localhost:3000/api/v1/entidade/${id}`
    );
    entidadesData = await entidadesResponse.json();
         
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
      itemDiv.innerHTML = `
      <img src="${item.FOTO_PERFIL}" alt="${item.FOTO_PERFIL}">
      <br><span>${item.DESIG}</span>
    
      <br><strong>$${item.Preco_venda}</strong>`;
      itemDiv.onclick = () => addToCart(item); // Passa o objeto item diretamente
      itemsContainer.appendChild(itemDiv);
    });
  }
  async function renderEntidadesData(){
   await fetchEntidadeData()
      const entidadeContainer = document.getElementById("entidade");
      entidadesData.forEach((entidades) => {
        entidadeContainer.innerHTML = `<h1>${entidades.DESIG}</h1>
      <img src="${entidades.FOTO_EMPRESA}">
      `;
      });
  }
async function fetchCategoriaData(){
try {
  const entidadeID = localStorage.getItem("entidadeID");
  const id = JSON.parse(entidadeID);
   const categoriaReponse = await fetch(
     `http://localhost:3000/api/v1/categoria/${id}`
   );
   categoriaData = await categoriaReponse.json();
} catch (error) {
   console.error("Erro ao buscar dados da API:", error);
}
}
async function renderCategoria() {
  await fetchCategoriaData();
  const menu = document.getElementById("menu-content");
  menu.innerHTML = "";
  categoriaData.forEach((categoria) => {
    const categoriadiv = document.createElement("div");
    categoriadiv.className = "menu-btn";
    categoriadiv.innerHTML = `<span>${categoria.DESIG}</span>`;
    menu.appendChild(categoriadiv);
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
        if (!isNaN(index)) {
          cart.splice(index, 1); // Remove o item do carrinho
          renderCart(); // Re-renderiza o carrinho após a remoção
        }
      }
    });
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;
    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
      <div class="item-details">
          <span></span> ${item.DESIG}
          <br>
          <span class="item-price">$${item.Preco_venda}</span>
        </div>
        <button class="remove-item" data-index="${index}"">✕</button>
        `;

      cartItemsContainer.appendChild(cartItemDiv);
      subtotal += item.Preco_venda;
    });
    
    const payableAmount = subtotal 

    payableAmountElement.innerText = payableAmount;

    scrollToBottom(cartItemsContainer);
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }
  // Chama renderItems após o evento DOMContentLoaded
  renderItems();
  renderEntidadesData()
  renderCategoria()
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
  async function buscarProdutoPorCodigoDeBarra() {
    const barcode_input = document.getElementById("barcode").value;
    if (barcode_input.lenght() > 4) {
     const produtoBarCodeResponde= await fetch(`http://localhost:3000/api/v1/produto/barcode/${barcode_input}`);
    }
  }