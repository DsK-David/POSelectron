
function renderFuncionarioData(){

    const itemsContainer = document.getElementById("items");
    const funcionarioDiv=document.createElement("div")
    itemsContainer.innerHTML=''
    funcionarioDiv.className="perfil-container"
    funcionarioDiv.innerHTML=`<div>
        <div class="perfil-header">
           
            <h1 class="perfil-nome">Nome do Usuário</h1>
        </div>
        <div class="perfil-info">
            <h2>Informações do Usuário</h2>
            <p><strong>Nome:</strong> Nome do Usuário</p>
            <p><strong>Email:</strong> usuario@email.com</p>
            <p><strong>Data de Nascimento:</strong> 01/01/2000</p>
            <!-- Adicione mais informações conforme necessário -->
        </div>
    </div>`
 itemsContainer.appendChild(funcionarioDiv);
}
function funcionario() {
    renderFuncionarioData()
}