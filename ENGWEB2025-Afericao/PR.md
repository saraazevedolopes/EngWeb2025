# PR.md — Ficha de Aferição de Engenharia Web 2025

## 1. Persistência de Dados

Para garantir a persistência de dados, foi utilizada uma base de dados MongoDB.  
O campo `bookId` do dataset foi transformado no campo `_id`, obrigatório no MongoDB como identificador único de cada documento.

Cada livro foi importado para a coleção `livros` na base de dados `livros`.  
Os dados foram preparados e importados com os seguintes passos:

- Conversão de listas representadas como strings para listas JSON válidas
- Agrupamento dos objetos JSON individuais num único array válido, com colchetes [] e vírgulas entre objetos, para permitir a importação com mongoimport
- Substituição do campo `bookId` por `_id`
- Validação da unicidade dos `_id`

O ficheiro final importado foi `dataset_corrigido.json`.

---

## 2. Setup de Base de Dados

A base de dados foi configurada num container Docker chamado `mongoEW`.

Comandos utilizados:

```bash
docker start mongoEW
docker cp dataset_corrigido.json mongoEW:/tmp
docker exec mongoEW mongoimport -d livros -c livros /tmp/dataset_corrigido.json --jsonArray
docker exec -it mongoEW sh
mongosh
use livros
show collections
```
A importação utilizou o ficheiro `dataset_corrigido.json`, gerado a partir do original com os comandos descritos na secção seguinte.

## 3. Respostas Textuais Pedidas

### Conversão de listas como strings

Alguns campos do `dataset.json` estavam mal formatados, com listas representadas como strings:
```json
"genres": "['Fiction', 'Adventure']"
```
Foi usado um script para corrigir:
```bash
python3 fixJson.py
```

Esse script:
- Corrigiu campos como `genres`, `characters`, `author`, entre outros, convertendo strings mal formadas em listas JSON válidas
- Removeu os parênteses retos (`[` e `]`) e as vírgulas entre objetos, permitindo processar o ficheiro linha a linha
- Registou os objetos com erro em `objetos_com_erro.json`
- Registou os objetos sem `bookId` em `objetos_sem_bookId.json`

### Agrupamento num array JSON válido

Após a correção, os objetos estavam separados por linhas, mas não organizados num array JSON válido.  
Para os agrupar num único array (com colchetes `[]` e vírgulas entre objetos), foi utilizado:

```bash
jq -s . dataset_listas_corrigidas.json > dataset_formatado.json
```

### Substituição do campo `bookId` por `_id`

Como o MongoDB exige um campo `_id` como identificador único, foi necessário substituir o campo `bookId` por `_id`, utilizando o seguinte comando:

```bash
jq 'map(.bookId as $id | del(.bookId) | ._id = $id)' dataset_formatado.json > dataset_corrigido.json
```

Para garantir que todos os identificadores são únicos, foi feita a seguinte verificação:
```bash
jq '.[]._id' dataset_corrigido.json | sort | uniq -d
```

## 4. Instruções de Como Executar as Aplicações

O repositório contém duas aplicações separadas:

- `ex1`: API de dados (porta **17000**)
- `ex2`: Interface web (porta **17001**)

### Instalação de dependências

Em cada uma das pastas (`ex1` e `ex2`), executar:

```bash
npm install
```

### Execução da API (`ex1`)
```bash
cd ex1
npm start
```

A API ficará disponível em:  
➡️ `http://localhost:17000/books`

Esta aplicação fornece uma API REST que permite:

- Listar todos os livros (`GET /books`)
- Obter um livro pelo seu ID (`GET /books/:id`)
- Filtrar livros por personagem (`GET /books?character=Nome`)
- Filtrar livros por género (`GET /books?genre=Género`)
- Listar todos os géneros distintos (`GET /books/genres`)
- Listar todas as personagens distintas (`GET /books/characters`)
- Inserir um novo livro (`POST /books`)
- Atualizar um livro existente (`PUT /books/:id`)
- Remover um livro da base de dados (`DELETE /books/:id`)

---

### Execução da interface web (`ex2`)

```bash
cd ex2
npm start
```

A interface estará acessível em:  
➡️ `http://localhost:17001`

Esta aplicação permite:

- Visualizar a lista de livros, com:
  - ID (com link para a página de detalhes do livro)
  - Título
  - Autores (cada um com link para a página do respetivo autor)
  - Data de publicação
  - Número de páginas

- Página de autor (`/entidades/:idAutor`):
  - Apresenta o **nome original** do autor (ex: `Harper Lee`)
  - Apresenta o **identificador utilizado na URL** (ex: `Harper%20Lee`)
  - Lista todos os livros desse autor
  - Indica o número total de livros

- Página de livro (`/:id`):
  - Mostra todos os campos do livro, exceto os que estejam nulos, vazios ou com listas vazias
  - Exibe a imagem da capa, se estiver disponível
  - Inclui botão para voltar à página principal

Esta interface comunica com a API através de pedidos HTTP para a porta 17000.

A comunicação entre a interface (`ex2`) e a API (`ex1`) é feita através de pedidos HTTP com a biblioteca `axios`.

---

## 5. Ações Necessárias para Quem Estiver de Fora Poder Arrancar as Aplicações

1. **Garantir que o Docker está instalado e a base de dados MongoDB está num container ativo.**  
   Iniciar o container (por exemplo, com o nome `mongoEW`):

   ```bash
   docker start mongoEW
   ```

2. **Preparar o ficheiro `dataset_corrigido.json`.**  
   Este ficheiro deve ser gerado a partir do ficheiro `dataset.json`, seguindo os seguintes passos:

   - Correção de listas representadas como strings com:
     ```bash
     python3 fixJson.py
     ```
   - Agrupamento dos objetos num array JSON válido com:
     ```bash
     jq -s . dataset_listas_corrigidas.json > dataset_formatado.json
     ```
   - Substituição do campo `bookId` por `_id` com:
     ```bash
     jq 'map(.bookId as $id | del(.bookId) | ._id = $id)' dataset_formatado.json > dataset_corrigido.json
     ```

3. **Importar o ficheiro para dentro do container:**

   ```bash
   docker cp dataset_corrigido.json mongoEW:/tmp
   docker exec mongoEW mongoimport -d livros -c livros /tmp/dataset_corrigido.json --jsonArray
  ```

4. **Verificar se os dados foram importados corretamente (opcional):**

   Após a importação, pode aceder ao interior do container e verificar se a base de dados e a coleção foram corretamente criadas e preenchidas:

   ```bash
   docker exec -it mongoEW sh
   mongosh
   use livros
   show collections
   db.livros.countDocuments()
  ```

5. **Instalar as dependências das duas aplicações:**

   Em terminais separados ou sequencialmente, deve instalar as dependências de ambas as aplicações com os seguintes comandos:

   ```bash
   cd ex1 && npm install
   cd ../ex2 && npm install
   ```

6. **Executar as duas aplicações:**

As aplicações devem ser executadas em terminais separados:

- **Terminal 1** (API de dados):
  ```bash
  cd ex1
  npm start
  ```

- **Terminal 2** (Interface web):
  ```bash
  cd ex2
  npm start
  ```

Após o arranque:

- A **API** ficará disponível em: `http://localhost:17000/books`
- A **interface web** ficará disponível em: `http://localhost:17001`

A interface comunica com a API através de pedidos HTTP feitos com `axios`.

---

7. **Aceder à aplicação no navegador:**

Depois de ambas as aplicações estarem em execução, pode aceder às seguintes URLs:

- 📘 API de dados: `http://localhost:17000/books`  
  Permite consultar, inserir, editar e remover livros via endpoints REST.

- 🖥️ Interface web: `http://localhost:17001`  
  Permite navegar pela lista de livros, autores e ver os detalhes de cada obra de forma visual.

---
