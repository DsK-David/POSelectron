// utils/fetchDataUtils.js
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

async function fetchEntidadeData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/entidade/${entidadeID}`;
  return await fetchData(url);
}

async function fetchItemsData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/produto/${entidadeID}`;
  return await fetchData(url);
}

async function fetchCategoriaData() {
  const entidadeID = JSON.parse(localStorage.getItem("entidadeID"));
  const url = `http://localhost:3000/api/v1/categoria/${entidadeID}`;
  return await fetchData(url);
}

module.exports = { fetchEntidadeData, fetchItemsData, fetchCategoriaData,fetchData };
