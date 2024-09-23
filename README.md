# API ToDo List

## Sobre o Projeto

Esta API RESTful permite que usuários gerenciem suas tarefas de forma simples e eficiente. Com ela, é possível criar, editar, concluir e excluir tarefas, além de gerenciar suas informações pessoais.

## Objetivos

- **Facilidade de Uso:** Proporcionar uma API de fácil consumo para gerenciar tarefas diárias.
- **Tecnologias Modernas:** Demonstrar a aplicação de tecnologias como TypeScript, Node.js, Express e MongoDB.
- **Base Sólida:** Estabelecer uma fundação robusta para futuros desenvolvimentos e expansões.

## Funcionalidades

### Usuário

- **Cadastro de Usuário:** Criação de novos usuários com atributos essenciais.
- **Login de Usuário:** Autenticação de usuários utilizando email e senha.
- **Edição de Perfil:** Atualização de informações pessoais, como nome, idade e foto de perfil.
- **Visualizar Tarefas:** Acesso às tarefas associadas ao usuário.

### Tarefas

- **Adicionar Tarefa:** Criação de novas tarefas.
- **Excluir Tarefa:** Remoção de tarefas existentes.
- **Marcar Tarefa como Concluída:** Atualização do status da tarefa para concluída.
- **Editar Tarefa:** Modificação dos atributos da tarefa, exceto a data de criação.

## Como Executar o Projeto

### Pré-requisitos

Para executar este projeto localmente, você precisará ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn** (gerenciadores de pacotes)
- **MongoDB** (pode ser local ou via serviço como MongoDB Atlas)
- **API Client** para testar a aplicação (como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/))

### Configuração

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/Lucas-Cunhaa/Codex-challenge-2024-To-Do-Back-End.git
   cd Codex-challenge-2024-To-Do-Back-End

2. **Instale as Dependências:**

    ```bash
    Copy code
    npm install

3. **Configure as Variáveis de Ambiente:**

    Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

    ```bash
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    ```
 4. **Inicie o Servidor:**
 
    ```bash
    npm start

## Endpoints

### Autenticação

#### 1. Cadastro de Usuário
- **Endpoint:** `POST /app/signup`
- **Descrição:** Cria um novo usuário.

**Corpo da Requisição:**

```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "password": "senhaSegura123",
  "age": 25,
  "gender": "masculino"
}
```
#### 2. Login de Usuário
- **Endpoint:** `POST /app/login`
- **Descrição:** Loga um usuário.

**Corpo da Requisição:**

```json
{
  "email": "joao.silva@example.com",
  "password": "senhaSegura123",
}
```
#### 3. Edição de Perfil
- **Endpoint:** `PUT /app/editProfile/:id`
- **Descrição:** Atualiza as informações de perfil do usuário.

**Parâmetros de URL:**
- id (string) - ID do usuário.

**Corpo da Requisição:**

```json
{
  "nome": "João S. Silva",
  "age": 26,
  "photo": "url_da_foto"
}

```
#### 4. Visualizar Tarefas do Usuário
- **Endpoint:** `GET /app/getTasks/:id`
- **Descrição:** Retorna todas as tarefas associadas a um usuário.

**Parâmetros de URL:**
- id (string) - ID do usuário.

#### 5. Adicionar Tarefa
- **Endpoint:** `POST /app/addTask/:id`
- **Descrição:** Atualiza as informações de perfil do usuário.

**Parâmetros de URL:**
- id (string) - ID do usuário.

**Corpo da Requisição:**

```json
{
    "name": "minha tarefa",
	"Date": "2024-09-17T23:19:33.664Z",
	"isCompleted": false,
	"description": "testando"
},

```

#### 6. Editar Tarefa
- **Endpoint:** `PUT /app/editTask/:userId/:taskId`
- **Descrição:** Atualiza as informações de perfil do usuário.

**Parâmetros de URL:**
- userId (string) - ID do usuário.
- taskId (string) - ID da tarefa.

**Corpo da Requisição:**

```json
{
    "name": "minha tarefa n9va ",
	"isCompleted": true,
	"description": "testando2"
},

```

#### 7. Excluir Tarefa
- **Endpoint:** `DELETE /app/deleteTask/:userId/:taskId`
- **Descrição:** Exclui uma tarefa específica de um usuário.

**Parâmetros de URL:**
- userId (string) - ID do usuário.
- taskId (string) - ID da tarefa.

## Licença
Este projeto está licenciado sob a [MIT License](./LICENSE).