# Escola de Música - Trabalho de Casa

## 📌 Introdução
Este trabalho consiste no desenvolvimento de uma **aplicação web** em **Node.js** para a gestão de uma escola de música. A aplicação gera páginas dinâmicas a partir de dados armazenados num ficheiro JSON, permitindo visualizar informações sobre alunos, cursos e instrumentos.

---

## 🚀 Funcionalidades

### Funcionalidades do Servidor Node.js

- Página principal com links para:
  - Lista de Alunos
  - Lista de Cursos
  - Lista de Instrumentos

- Página de Alunos:
  - Tabela com nome, curso e instrumento de cada aluno
  - Link para página individual do aluno

- Página de Detalhes do Aluno:
  - Identificador
  - Data de nascimento
  - Curso frequentado
  - Ano do curso
  - Instrumento utilizado
  - Botão para voltar

- Página de Cursos:
  - Tabela com os cursos disponíveis
  - Link para página individual do curso

- Página de Detalhes do Curso:
  - Nome do curso
  - Lista de alunos inscritos, com links
  - Botão para voltar

- Página de Instrumentos:
  - Tabela com os instrumentos disponíveis
  - Link para página individual do instrumento

- Página de Detalhes do Instrumento:
  - Nome do instrumento
  - Lista de alunos que o utilizam, com links
  - Botão para voltar

- Páginas de erro:
  - 404 - Recurso não encontrado
  - 500 - Erro interno do servidor

- Navegação:
  - Botões de navegação

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** → Para criar o servidor web.
- **Axios** → Para consumir a API de dados (ficheiro JSON).
- **json-server** → Para simular a API REST com os dados da escola de música.
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
   json-server --watch dataset_reparacoes.json
   ```
3. Iniciar o servidor Node.js:
   ```sh
   node server.js
   ```
4. Aceder às páginas no navegador:
- [http://localhost:3017/](http://localhost:3017/) → Página principal
- [http://localhost:3017/alunos](http://localhost:3017/alunos) → Lista de alunos
- [http://localhost:3017/aluno/:id](http://localhost:3017/aluno/:id) → Detalhes de um aluno
- [http://localhost:3017/cursos](http://localhost:3017/cursos) → Lista de cursos
- [http://localhost:3017/curso/:nome](http://localhost:3017/curso/:nome) → Detalhes de um curso
- [http://localhost:3017/instrumentos](http://localhost:3017/instrumentos) → Lista de instrumentos
- [http://localhost:3017/instrumento/:id](http://localhost:3017/instrumento/:id) → Detalhes de um instrumento

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
EngWeb2025/TPC2/
├── db.json           # Base de dados JSON com alunos, cursos e instrumentos
├── package.json      # Configuração do projeto Node.js
├── pages.js          # Funções para gerar páginas HTML dinâmicas
├── server.js         # Servidor HTTP com lógica de roteamento
├── w3.css            # Folha de estilos CSS
```

---

## 🏷️ Identificação
**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179  

![Identificação Sara Azevedo Lopes](../fotografia.png)

