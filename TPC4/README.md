# Gestão de Filmes - Trabalho de Casa

## 📌 Introdução
Este trabalho consiste no desenvolvimento de uma **aplicação web** em **Node.js** para a gestão de filmes. A aplicação gera páginas dinâmicas a partir de dados armazenados num ficheiro JSON, permitindo visualizar, editar e remover informações sobre os filmes.

---

## 🚀 Funcionalidades

### Funcionalidades do Servidor Node.js

- **Página Principal**
  - Link para a lista de filmes

- **Página de Filmes**
  - Tabela com Ano, Título, Elenco e Géneros de cada filme
  - Links para ver filmes de um ator específico
  - Botões para editar ou apagar um filme

- **Página de Filmes de um Ator**
  - Lista de filmes onde o ator participou

- **Formulário de Edição de Filme**
  - Campos para editar Ano, Título, Elenco e Géneros
  - Possibilidade de adicionar/eliminar atores e géneros
  - Botão para guardar alterações

- **Operações Suportadas**
  - **GET** → Obter lista de filmes ou detalhes individuais
  - **POST** → Adicionar ou remover um filme
  - **PUT** → Editar informações de um filme
  - **DELETE** → Remover um filme

- **Tratamento de Erros**
  - **404 - Recurso não encontrado** (páginas ou filmes inexistentes)
  - **400 - Pedido inválido** (erros de formato de dados)
  - **500 - Erro interno do servidor**

- **Navegação**
  - Botões de navegação para voltar e para a página principal

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** → Para criar o servidor web.
- **Axios** → Para consumir a API de dados (ficheiro JSON).
- **json-server** → Para simular a API REST com os dados dos filmes.
- **Pug** → Para gerar páginas dinâmicas.
- **CSS (w3.css)** → Para estilização das páginas.

---

## 🔧 Como Executar

1. Instalar as dependências:
   ```sh
   npm install axios
   ```
2. Iniciar o `json-server` para servir os dados:
   ```sh
   json-server --watch cinema.json
   ```
3. Iniciar o servidor Node.js na diretoria cinema:
   ```sh
   npm start
   ```
4. Aceder às páginas no navegador:
- [http://localhost:3000/](http://localhost:3000/) → Página principal
- [http://localhost:3000/filmes](http://localhost:3000/filmes) → Lista de filmes
- [http://localhost:3000/filmes/ator/:nome](http://localhost:3000/filmes/ator/:nome) → Filmes de um ator
- [http://localhost:3000/filmes/edit/:id](http://localhost:3000/filmes/edit/:id) → Editar um filme

---

## Testar via Terminal
Apenas alguns exemplos.

### **Obter Lista de Filmes (GET)**
```sh
curl -X GET http://localhost:3000/filmes
```

### **Obter Detalhes de um Filme (GET)**
```sh
curl -X GET http://localhost:3000/filmes/1
```

### **Adicionar um Novo Filme (POST)**
```sh
curl -X POST http://localhost:3000/filmes \
-H "Content-Type: application/json" \
-d '{"year": 2025, "title": "Novo Filme", "cast": ["Ator 1", "Ator 2"], "genres": ["Ação", "Ficção"]}'
```

### **Editar um Filme Existente (PUT)**
```sh
curl -X PUT http://localhost:3000/filmes/1 \
-H "Content-Type: application/json" \
-d '{"year": 2025, "title": "Filme Editado", "cast": ["Ator Atualizado"], "genres": ["Drama"]}'
```

### **Remover um Filme (DELETE)**
```sh
curl -X DELETE http://localhost:3000/filmes/1
```

---

## 🎯 Objetivo Pedagógico
Este trabalho permite praticar:
- Desenvolvimento de aplicações web com Node.js.
- Consumo e manipulação de dados JSON.
- Geração dinâmica de páginas HTML com Pug.
- Utilização de um framework CSS (w3.css) para estilização de páginas.

---

## 📄 Estrutura do Projeto
```sh
GestaoFilmes/
├── cinema.json       # Base de dados JSON com os filmes
├── public/           
│   ├── stylesheets/  
│   │   ├── w3.css    # Folha de estilos CSS
│   ├── images/       
│   │   ├── favicon.png   # Ícone da página
├── routes/
│   ├── index.js      # Rotas principais da aplicação
├── views/            # Templates Pug
│   ├── layout.pug    # Layout base
│   ├── index.pug     # Página principal
│   ├── filmes.pug    # Lista de filmes
│   ├── filmesAtor.pug # Filmes de um ator
│   ├── filmesEditar.pug # Formulário de edição
│   ├── error.pug     # Página de erro
├── app.js            # Servidor Express principal
```

---

## 🏷️ Identificação
**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179  

![Identificação Sara Azevedo Lopes](../fotografia.png)

