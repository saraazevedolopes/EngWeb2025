# Gestão de Alunos - Trabalho de Casa

## 📌 Introdução
Este trabalho consiste no desenvolvimento de uma **aplicação web** em **Node.js** para a gestão de alunos. A aplicação gera páginas dinâmicas a partir de dados armazenados num ficheiro JSON, permitindo visualizar, editar e remover informações sobre os alunos.

---

## 🚀 Funcionalidades

### Funcionalidades do Servidor Node.js

- **Página Principal**
  - Link para a lista de alunos

- **Página de Alunos**
  - Tabela com ID, Nome e Link do GitHub de cada aluno
  - Link para página individual do aluno
  - Botão para adicionar um novo aluno

- **Página de Detalhes do Aluno**
  - Identificador
  - Nome
  - Link para o GitHub
  - Botão para voltar

- **Formulários de Registo e Edição**
  - Campos para ID, Nome e Link do GitHub
  - Possibilidade de marcar a realização de trabalhos práticos
  - Botão para voltar

- **Operações Suportadas**
  - **GET** → Obter lista de alunos ou detalhes individuais
  - **POST** → Adicionar um novo aluno
  - **PUT** → Editar informações de um aluno
  - **DELETE** → Remover um aluno

- **Tratamento de Erros**
  - **404 - Recurso não encontrado** (páginas ou alunos inexistentes)
  - **400 - Pedido inválido** (erros de formato de dados)
  - **500 - Erro interno do servidor**

- **Navegação**
  - Botões de navegação para voltar e para a página principal

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** → Para criar o servidor web.
- **Axios** → Para consumir a API de dados (ficheiro JSON).
- **json-server** → Para simular a API REST com os dados dos alunos.
- **HTML** → Para estruturar as páginas.
- **CSS (w3.css)** → Para estilização das páginas.

---

## 🔧 Como Executar

1. Instalar as dependências:
   ```sh
   npm install axios
   ```
2. Iniciar o `json-server` para servir os dados:
   ```sh
   json-server --watch alunos.json
   ```
3. Iniciar o servidor Node.js:
   ```sh
   node server.js
   ```
4. Aceder às páginas no navegador:
- [http://localhost:7777/](http://localhost:7777/) → Página principal
- [http://localhost:7777/alunos](http://localhost:7777/alunos) → Lista de alunos
- [http://localhost:7777/alunos/:id](http://localhost:7777/alunos/:id) → Detalhes de um aluno
- [http://localhost:7777/registos/alunos](http://localhost:7777/registos/alunos) → Registar um aluno
- [http://localhost:7777/alunos/edit/:id](http://localhost:7777/alunos/edit/:id) → Editar um aluno

---

## Testar via Terminal 
Apenas alguns exemplos.

### **Obter Lista de Alunos (GET)**
```sh
curl -X GET http://localhost:3000/alunos
```

### **Obter Detalhes de um Aluno (GET)**
```sh
curl -X GET http://localhost:3000/alunos/A104179
```

### **Adicionar um Novo Aluno (POST)**
```sh
curl -X POST http://localhost:3000/alunos \
-H "Content-Type: application/json" \
-d '{"id": "A123456", "nome": "Novo Aluno", "git": "https://github.com/novoaluno"}'
```

### **Editar um Aluno Existente (PUT)**
```sh
curl -X PUT http://localhost:3000/alunos/A104179 \
-H "Content-Type: application/json" \
-d '{"id": "A104179", "nome": "Nome Atualizado", "git": "https://github.com/atualizado"}'
```

### **Remover um Aluno (DELETE)**
```sh
curl -X DELETE http://localhost:3000/alunos/A104179
```

---

## 🎯 Objetivo Pedagógico
Este trabalho permite praticar:
- Desenvolvimento de aplicações web com Node.js.
- Consumo e manipulação de dados JSON.
- Geração dinâmica de páginas HTML.
- Utilização de um framework CSS (w3.css) para estilização de páginas.

---

## 📄 Estrutura do Projeto
```sh
EngWeb2025/TPC3/
├── alunos.csv        # Lista de alunos em formato CSV
├── alunos.json       # Base de dados JSON com os alunos
├── public/          
│   ├── w3.css        # Folha de estilos CSS
│   ├── favicon.png   # Ícone da página
├── templates.js      # Funções para gerar páginas HTML dinâmicas
├── server.js         # Servidor HTTP com lógica de roteamento
├── static.js         # Servidor de recursos estáticos
```

---

## 🏷️ Identificação
**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179  

![Identificação Sara Azevedo Lopes](../fotografia.png)

