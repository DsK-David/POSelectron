export async function buscarItens() {
  try {
    const response = await fetch("http://localhost:5500/api/v1/produtos"); // Substitua pela URL da sua API
    itemsData = await response.json(); // Atualiza a variável global itemsData
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}
