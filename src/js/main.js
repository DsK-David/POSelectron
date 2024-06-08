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

function home(){
 const itemsContainer = document.getElementById("items");
 const homeButton=document.getElementById("home")
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

 function renderCart() {
   cartItemsContainer.innerHTML = "";
   let subtotal = 0;
   cart.forEach((item) => {
     const cartItemDiv = document.createElement("div");
     cartItemDiv.innerText = `${item.nome} - $${item.preco} x`;
     cartItemsContainer.appendChild(cartItemDiv);
     subtotal += item.preco;
   });
   const tax = subtotal * 0.225;
   const payableAmount = subtotal - tax;

   subtotalElement.innerText = subtotal.toFixed(2);
   taxElement.innerText = tax.toFixed(2);
   payableAmountElement.innerText = payableAmount.toFixed(2);
 }

 function scrollToBottom(container) {
   container.scrollTop = container.scrollHeight;
 }
 // Chama renderItems após o evento DOMContentLoaded
 renderItems(); 
}
function clientes(){
  const homeButton = document.getElementById("home");
    const customersButton = document.getElementById("customers");
    customersButton.className = "select";
    // homeButton.style.border = "none";
    // customersButton.style.border = "1px solid #FC8019";

    
    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML=`
    <h1>Clientes</h1>
    
    `
    
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