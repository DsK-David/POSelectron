function dashboard() {
  // showLogin()
  // reports();
  mostrarVendas()
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

async function mostrarVendas() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/venda/entidade?id=${entidadeID}`
    );
    const { success, msg, data } = await response.json();

    if (success) {
      const itemsContainer = document.getElementById("items");
      itemsContainer.innerHTML = "";

      data.forEach((venda) => {
        const purchaseElement = document.createElement("div");
        purchaseElement.classList.add("purchase");

        purchaseElement.innerHTML = `
         
  <div class="purchase-header">
    <h3>Venda em ${new Date(venda.DT_REGISTO).toLocaleDateString()}</h3>
    <p>Código da venda: ${venda.ID}</p>
  </div>
  <div class="purchase-products">
    <ul>
      ${venda.produtos_vendidos
        .map(
          (produto) => `
        <li>
          <strong>${produto.DESIG}</strong>
          <div>
            <p>Quantidade: ${produto.QUANTIDADE}</p>
            <p>Preço: R$ ${produto.Preco_venda}</p>
          </div>
        </li>
      `
        )
        .join("")}
    </ul>
  </div>
  <div class="purchase-totals">
    <p>Quantidade total de itens vendidos: ${venda.quantidade_vendidos}</p>
    <p>Valor total da venda: R$ ${venda.VALOR_FATURA}</p>
  </div>

        `;

        itemsContainer.appendChild(purchaseElement);
      });
    } else {
      console.error(msg);
    }
  } catch (error) {
    console.error("Erro ao buscar as vendas:", error);
  }
}