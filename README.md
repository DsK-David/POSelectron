# Documentação do Sistema POS Electron

Este sistema POS (Point of Sale) é uma aplicação Electron que visa fornecer uma interface de usuário para gerenciar vendas, clientes, e funcionalidades administrativas em um ambiente de varejo. A aplicação é construída usando Electron para a interface de desktop, com integração a uma API REST para operações de backend, como autenticação de usuários, gerenciamento de produtos, clientes, e transações. Abaixo, segue uma descrição detalhada dos componentes principais do sistema.

## Estrutura Geral

### Tecnologias Utilizadas

- **Electron**: Framework para desenvolvimento de aplicações desktop com tecnologias web (HTML, CSS, JavaScript).
- **JavaScript**: Linguagem de programação utilizada para a lógica do lado do cliente.
- **Fetch API**: Para comunicação com a API REST.
- **CSS**: Para estilização da interface do usuário.
- **HTML**: Para a estrutura da interface do usuário.

### Arquivos Principais

#### `index.js`

- **Responsabilidades**: Inicialização da aplicação Electron, criação da janela principal, e gerenciamento de eventos do sistema, como notificações e comportamentos de janelas.
- **Funcionalidades**:
  - Cria uma janela de navegador personalizada para a aplicação.
  - Carrega o arquivo `login.html` na inicialização.
  - Escuta por eventos de notificação para exibir notificações no sistema operacional.
  - Gerencia o ciclo de vida da aplicação, como fechamento e reabertura de janelas.

#### `login.html` e `admin.html`

- **Responsabilidades**: Páginas de login e administração.
- **Funcionalidades**:
  - `login.html`: Permite ao usuário inserir credenciais para autenticação.
  - `admin.html`: Interface para administração, com formulário de login.

#### `clientes.js`

- **Responsabilidades**: Gerenciamento de clientes, incluindo adicionar, listar, editar e deletar clientes.
- **Funcionalidades**:
  - Exibe uma lista de clientes.
  - Permite adicionar novos clientes através de um modal.
  - Possibilita a busca e seleção de clientes para adicionar à fatura.
  - Integração com a API para operações CRUD em clientes.

#### `index.html`

- **Responsabilidades**: Página principal após o login, exibindo o menu lateral, cabeçalho, e área de conteúdo dinâmico.
- **Funcionalidades**:
  - Navegação entre diferentes seções (Home, Clientes, Pedidos, Relatórios, Configurações, Funcionários, Logout).
  - Exibe um carrinho de compras e permite adicionar itens.
  - Modais para adicionar clientes e buscar clientes.

#### `style.css`

- **Responsabilidades**: Estilização global da aplicação.
- **Funcionalidades**:
  - Define cores, fontes, e estilos para botões, inputs, modais, e layout geral.

#### `home.js`, `funcionario.js`

- **Responsabilidades**: Renderização de conteúdo específico para as páginas Home e Funcionário.
- **Funcionalidades**:
  - `home.js`: Carrega itens à venda e categorias. Permite adicionar itens ao carrinho e busca por código de barras.
  - `funcionario.js`: Exibe informações do funcionário logado.

#### `main.js`

- **Responsabilidades**: Lógica de autenticação e navegação.
- **Funcionalidades**:
  - Autentica usuários e redireciona para a página principal.
  - Gerencia a ativação de botões na barra lateral.

## Funcionalidades Detalhadas

### Autenticação

- **Local**: `login.html` e `main.js`
- **Descrição**: Permite ao usuário inserir credenciais para acessar o sistema. Utiliza uma API REST para validar as credenciais e redireciona para `index.html` em caso de sucesso.

### Gerenciamento de Clientes

- **Local**: `clientes.js`
- **Descrição**: Permite adicionar, listar, editar e deletar clientes. Utiliza modais para adicionar novos clientes e busca por clientes existentes. Integração com a API para persistência dos dados.

### Carrinho de Compras

- **Local**: `index.html` e `home.js`
- **Descrição**: Exibe itens adicionados ao carrinho, com opção de remover itens. Possui funcionalidade de checkout simulada.

### Interface do Usuário

- **Local**: `index.html`, `style.css`
- **Descrição**: Fornece uma interface de usuário responsiva com navegação lateral, cabeçalho, e área de conteúdo dinâmica. Inclui modais para adicionar clientes e buscar produtos por código de barras.

### Estilização

- **Local**: `style.css`
- **Descrição**: Define estilos globais, incluindo cores, fontes, botões, inputs, e layout. Estiliza modais, itens do carrinho, e elementos de navegação.

## Fluxo de Uso

1. **Início**: O usuário inicia a aplicação e é apresentado com a tela de login (`login.html`).
2. **Autenticação**: O usuário insere credenciais e, em caso de sucesso, é redirecionado para `index.html`.
3. **Navegação**: Na interface principal, o usuário pode navegar entre diferentes seções (Home, Clientes, Pedidos, Relatórios, Configurações, Funcionários, Logout).
4. **Home**: Exibe itens à venda. O usuário pode adicionar itens ao carrinho e buscar produtos por código de barras.
5. **Clientes**: Permite gerenciar clientes, incluindo adicionar novos, listar, editar e deletar.
6. **Checkout**: Simulação de finalização de compra, com exibição de subtotal e total a pagar.

## API e Comunicação

- **Endpoints**: A aplicação comunica-se com uma API REST para operações de CRUD em clientes e produtos.
- **Autenticação**: Realizada através de um endpoint de login, armazenando o ID da entidade e perfil no `localStorage`.

## Melhorias Sugeridas

- **Validação de Formulários**: Adicionar validação de entrada nos formulários para melhorar a experiência do usuário e segurança.
- **Feedback Visual**: Implementar feedback visual para operações de sucesso ou erro (por exemplo, ao adicionar um cliente).
- **Manuseio de Erros**: Melhorar o manuseio de erros de API para casos de falha de comunicação ou dados inválidos.
- **Segurança**: Implementar práticas de segurança, como criptografia de senhas e tokens de autenticação.
- **Responsividade**: Ajustes para melhor suporte a diferentes tamanhos de tela e dispositivos.

## Conclusão

Este sistema POS Electron oferece uma base sólida para um ponto de venda, com funcionalidades de gerenciamento de clientes, produtos, e transações. Há espaço para melhorias, especialmente em validação, segurança, e usabilidade. A estrutura atual suporta expansão, como adicionar mais funcionalidades administrativas e melhorar a experiência do usuário com feedback visual e validações.