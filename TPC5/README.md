# Gestão de Alunos - TPC5

## 📌 Introdução

Este trabalho consiste na criação de uma aplicação web em **Node.js** com duas componentes principais:
1. **API de dados** – Uma aplicação que responde a pedidos HTTP com dados dos alunos em formato JSON, interagindo com a base de dados MongoDB.
2. **Front-end** – Uma aplicação que fornece páginas web dinâmicas com templates **PUG**, usando **Axios** para comunicar com a API de dados.
A aplicação permite a **gestão de alunos**, incluindo listagem, visualização individual, edição, adição e remoção.

---

## 🚀 Funcionalidades

### 📁 API de Dados (`routes/api.js`)

A API disponibiliza os seguintes endpoints em `/api/alunos`:

- **GET /api/alunos**  
  Lista todos os alunos em formato JSON.

- **GET /api/alunos/:id**  
  Devolve os dados de um aluno pelo seu ID.

- **POST /api/alunos**  
  Adiciona um novo aluno com os dados fornecidos no corpo do pedido.

- **PUT /api/alunos/:id**  
  Atualiza os dados de um aluno existente.

- **DELETE /api/alunos/:id**  
  Remove um aluno da base de dados.

A API não tem qualquer interface visual — é consumida pelo front-end.

---

### 🖥️ Interface Web (`routes/alunos.js`)

Utiliza **Axios** para comunicar com a API e gera páginas com **PUG**.

- **GET /alunos**  
  Mostra a lista de alunos com:
  - Nome (clicável para detalhes)
  - Git
  - Botões para Editar e Apagar
  - Botão para Adicionar novo aluno

- **GET /alunos/:id**  
  Página com os detalhes do aluno:
  - Nome, Git
  - Notas (prática e teste)
  - Lista de TPCs realizados (ou "Em falta")

- **GET /alunos/adicionar**  
  Formulário para registar um novo aluno.

- **POST /alunos/adicionar**  
  Submete o formulário para a API e redireciona para a lista.

- **GET /alunos/editar/:id**  
  Mostra formulário pré-preenchido para editar os dados do aluno.

- **POST /alunos/editar/:id**  
  Atualiza os dados do aluno via API e redireciona.

- **GET /alunos/apagar/:id**  
  Apaga um aluno e redireciona para a lista.

---

### 🔄 Relação entre `api.js`, `alunos.js` e o **MongoDB**

**MongoDB**: é a **base de dados** onde estão armazenados todos os dados dos alunos (id, nome, git, TPCs, notas...).

#### `api.js`:
- É a **API de dados**.
- Expõe endpoints REST (como `/api/alunos`, `/api/alunos/:id`, etc.).
- **Interage diretamente com o MongoDB** através dos métodos definidos em `controllers/alunos.js`, que usam **Mongoose** para consultar, inserir, atualizar e remover dados da base de dados.
- Responde sempre em **JSON**.

#### `alunos.js`:
- É o **front-end** da aplicação.
- Faz **pedidos HTTP** (`GET`, `POST`, `PUT`, `DELETE`) aos endpoints da `api.js` usando **Axios**.
- Recebe os dados (em JSON) e renderiza páginas web dinâmicas com **PUG** (ex: `alunos.pug`, `editarAluno.pug`, etc.).

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** — Ambiente de execução do servidor.
- **Express** — Framework para servidor web.
- **MongoDB + Mongoose** — Base de dados e ODM.
- **Axios** — Cliente HTTP para comunicação entre front-end e API.
- **Pug** — Motor de templates HTML.
- **CSS (w3.css)** — Estilização simples e funcional.

---

## 🔧 Como Executar

1. Instalar as dependências:
```sh
npm install
```

2. Certificar que o MongoDB está a correr (ex: via Docker ou localmente).

3. Iniciar a aplicação:
```sh
npm start
```

4. Aceder a [http://localhost:3000/alunos](http://localhost:3000/alunos)

---

## 📁 Estrutura do Projeto

```
TPC5/
├── alunos.json               # (Opcional) Ficheiro de dados de exemplo
├── app.js                    # Ficheiro principal da aplicação
├── bin/
│   └── www                   # Inicialização do servidor
├── controllers/
│   └── alunos.js             # Lógica de controlo dos alunos
├── models/
│   └── aluno.js              # Esquema Mongoose do aluno
├── public/
│   ├── images/               # Imagens públicas (ex: favicon)
│   └── stylesheets/
│       └── w3.css            # Estilos CSS (W3CSS)
├── routes/
│   ├── alunos.js             # Rotas do front-end
│   ├── api.js                # Rotas da API de dados
│   └── index.js              # Roteador da API
├── views/
│   ├── layout.pug            # Layout base
│   ├── index.pug             # Página inicial
│   ├── alunos.pug            # Lista de alunos
│   ├── aluno.pug             # Detalhes de um aluno
│   ├── adicionarAluno.pug    # Formulário para adicionar
│   ├── editarAluno.pug       # Formulário para editar
│   └── error.pug             # Página de erro
├── package.json              # Configuração do projeto e dependências
├── package-lock.json         # Lockfile de versões
├── README.md                 # Este ficheiro
```

---

## 🎯 Objetivo Pedagógico

Este trabalho permitiu consolidar os seguintes conhecimentos:
- Separação de responsabilidades entre API e Front-end.
- Desenvolvimento com Express e Pug.
- Manipulação de dados com Mongoose e MongoDB.
- Comunicação entre serviços com Axios.
- Criação de páginas dinâmicas e bem estruturadas.

---

## 🏷️ Identificação

**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179

![Identificação Sara Azevedo Lopes](../fotografia.png)