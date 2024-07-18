function dashboard() {
  // showLogin()
  reports();
}
function reports() {
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `
        <div id="filter-controls">
            <label for="day-filter">Dia:</label>
            <input type="number" id="day-filter" min="1" max="31" placeholder="Dia">
            <label for="month-filter">Mês:</label>
            <input type="number" id="month-filter" min="1" max="12" placeholder="Mês">
            <label for="year-filter">Ano:</label>
            <input type="number" id="year-filter" placeholder="Ano">
            <button onclick="aplicarFiltroDeVendas()">Filtrar</button>
        </div>
        <div id="purchases-container"></div>
        `;
  const menu = document.querySelector(".menu");
  menu.innerHTML = `<button class="menu-btn" id="" onclick="adicionarProdutosNoSistema()">Adicionar Produto</button>
                <button class="menu-btn" id="breakfast" onclick="adicionarFuncionarioNoSistema()">Adicionar Funcionarios</button>
                <button class="menu-btn" id="lunch" onclick="verProdutos()">Ver Produtos</button>
                <button class="menu-btn" id="supper" onclick="verFuncionarios()">Ver Funcionarios</button>
                <button class="menu-btn" id="desserts" onclick="adicionarADministrador()">Adicionar Administrador</button>
                `;
  aplicarFiltroDeVendas();
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

function adicionarProdutosNoSistema() {
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `   
  <div class="login-container">
        <div class="login-box">
            <h2>Adicionar Produtos</h2>
            <form id="login-form">
                <div class="input-group">
                    <label for="nome_do_produto">Nome do produto</label>
                    <input type="text" id="nome_do_produto" name="nome_do_produto" required>
                </div>
                <div class="input-group">
                    <label for="preco">preço</label>
                    <input type="number" id="preco" name="preco" required>
                </div>
                <div class="input-group">
                    <label for="file">Imagem</label>
                    <input type="file" id="file" name="file" required>
                </div>
                <button onclick="login()">Adicionar</button>
            </form>
        </div>
  <div>
            `
}
function adicionarFuncionarioNoSistema(){
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = `   
  <div class="login-container">
        <div class="login-box">
            <h2>Adicionar Funcionario</h2>
            <form id="login-form">
                <div class="input-group">
                    <label for="nome_do_funcionario">Nome do funcionario</label>
                    <input type="text" id="nome_do_funcionario" name="nome_do_funcionario" required>
                </div>
                <div class="input-group">
                    <label for="cni">CNI</label>
                    <input type="number" id="cni" name="cni" required>
                </div>
                <div class="input-group"> 
                    <label for="username">Nome de Usuario</label>
                    <input type="text" id="username" name="username" required>
                </div>
                 <div class="input-group"> 
                    <label for="senha">Senha de Usuario</label>
                    <input type="password" id="senha" name="password" required>
                </div>
                <button onclick="login()">Adicionar</button>
            </form>
        </div>
  <div>
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
  if (username === "david" && password === "2513") {
    reports();
  } else {
    alert("Usuário ou senha inválidos");
  }
}
async function aplicarFiltroDeVendas() {
  const dayFilter = document.getElementById("day-filter").value;
  const monthFilter = document.getElementById("month-filter").value;
  const yearFilter = document.getElementById("year-filter").value;
  const entidadeID = localStorage.getItem("entidadeID");
  const id = JSON.parse(entidadeID);

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/vendas/${id}`
    );
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

    MostrarVendas(filteredPurchases);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function MostrarVendas(purchases) {
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
