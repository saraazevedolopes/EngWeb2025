# Setup de bases de dados

1. Iniciar o container Mongo
```bash
docker start mongoEW
```

2. Copiar os ficheiros JSON para dentro do container,
```bash
docker cp noticias.json mongoEW:/tmp/noticias.json
docker cp items.json mongoEW:/tmp/items.json
docker cp utilizadores.json mongoEW:/tmp/utilizadores.json
docker cp config.json mongoEW:/tmp/config.json
```

3. Importar os ficheiros JSON para a base de dados projeto
```bash
docker exec mongoEW mongoimport -d projeto -c noticias /tmp/noticias.json --jsonArray
docker exec mongoEW mongoimport -d projeto -c items /tmp/items.json --jsonArray
docker exec mongoEW mongoimport -d projeto -c utilizadores /tmp/utilizadores.json --jsonArray
docker exec mongoEW mongoimport -d projeto -c configs /tmp/config.json --jsonArray
```

4. Entrar no container e abrir a shell do Mongo,
```bash
docker exec -it mongoEW sh
mongosh
```

5. Verificar se os dados estão bem importados,
```bash
use projeto
show collections
db.noticias.find().pretty()
db.items.find().pretty()
db.utilizadores.find().pretty() 
```

---

# Estrutura do Projeto

```
EW2025-Project/
├── diario-backend/         # Backend da aplicação (Node.js + Express)
├── diario-frontend/        # Frontend da aplicação (Express + Pug)
├── diario_digital_bagit/   # Conjunto de SIPs (ficheiros zip)
├── *.json                  # Ficheiros de dados simulados (items, noticias, utilizadores)
├── AssignemntEW.pdf        # Enunciado do projeto
└── README.md               # Este ficheiro
```

## `diario-backend/` – Backend

Estrutura principal do backend:

- `app.js` – Entrada principal da aplicação.
- `auth/` – Lógica de autenticação local e GitHub (passport).
- `controllers/` – Lógica de negócio para cada recurso (users, items, noticias...).
- `models/` – Modelos de dados (Mongoose).
- `oais/` – Lógica de SIP/AIP/DIP para submissões BagIt.
- `routes/` – Definição de endpoints da API.
- `uploads/` – Uploads de ficheiros temporários.
- `utils/logger.js` – Sistema de logging com Winston para registo de pedidos HTTP, erros e eventos importantes.
- `logs/` – Diretório onde são guardados os ficheiros de log (`app.log`) com os registos estruturados da aplicação.

## `diario-frontend/` – Frontend

Estrutura principal do frontend:

- `app.js` – Servidor Express responsável pela interface.
- `auth/` – Lógica de autenticação no cliente.
- `public/` – CSS e JS.
- `routes/` – Roteamento das páginas do frontend.
- `views/` – Páginas em Pug divididas por funcionalidade (admin, items, login...).
- `uploads/` – Ficheiros enviados pelo utilizador.

## `diario_digital_bagit/` – Submissões SIP

Contém os pacotes BagIt submetidos na aplicação:

- Ex.: `SIP-casamento.zip`, `SIP-jardim.zip`, `SIP-cabras.zip`, etc.
- Cada ficheiro representa um SIP gerado a partir da submissão de dados + ficheiros.

## Dados JSON

Ficheiros de dados simulados carregados no arranque ou utilizados para testes:

- `items.json` – Lista de itens.
- `noticias.json` – Lista de notícias.
- `utilizadores.json` – Lista de utilizadores.
- `config.json` – Configurações gerais da aplicação.

---

# Rotas da Aplicação

## API Backend

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Página principal da aplicação que mostra os recursos públicos, as opções de autenticação (entrar ou registar) e outras funcionalidades como ver os utilizadores, classificadores e a opção de adicionar um novo item ou recurso. |
| `GET` | `/classificadores` | Lista de classificadores existentes, onde é possível procurar por um classificador específico através de uma barra de pesquisa. |
| `GET` | `/items/:id` | Mostra o recurso com ID específico. |
| `POST` | `/items/:id` | Adiciona um comentário ao recurso. |
| `GET` | `/items/edit/:id` | Renderiza formulário para editar um recurso. |
| `POST` | `/items/edit/:id` | Guarda as alterações feitas num recurso. |
| `GET` | `/items/delete/:id` | Apaga um recurso. |
| `POST` | `/items/files` | Submete um ficheiro SIP para processamento. |
| `GET` | `/admin` | Painel principal da área de administração. |
| `GET` | `/admin/utilizadores` | Lista de utilizadores no sistema. |
| `GET` | `/admin/utilizadores/delete/:id` | Apaga um utilizador com o ID fornecido. |
| `GET` | `/admin/recursos` | Lista de todos os recursos existentes no sistema. |
| `GET` | `/admin/noticias` | Lista todas as notícias existentes no sistema. |
| `POST` | `/admin/noticias` | Cria uma nova notícia. |
| `GET` | `/admin/noticias/edit/:id` | Renderiza o formulário para editar uma notícia. |
| `POST` | `/admin/noticias/edit/:id` | Guarda as alterações feitas numa notícia. |
| `GET` | `/admin/noticias/toggle/:id` | Alterna a visibilidade de uma notícia. |
| `GET` | `/auth/login` | Renderiza o formulário de login. |
| `POST` | `/auth/login` | Realiza o login com autenticação local. |
| `GET` | `/auth/signup` | Renderiza o formulário de registo. |
| `POST` | `/auth/signup` | Regista um novo utilizador. |
| `GET` | `/auth/logout` | Termina a sessão e remove o token. |
| `GET` | `/github` | Inicia o processo de autenticação com o GitHub. |
| `GET` | `/github/callback` | Callback da autenticação GitHub que devolve o JWT. |
| `GET` | `/utilizadores` | Lista os utilizadores (backend). |
| `GET` | `/utilizadores/:id` | Mostra os dados de um utilizador. |
| `PUT` | `/utilizadores/:id` | Atualiza os dados de um utilizador. |
| `DELETE` | `/utilizadores/:id` | Apaga um utilizador. |
| `POST` | `/utilizadores/login` | Autentica um utilizador e gera um JWT. |
| `POST` | `/utilizadores/register` | Regista um novo utilizador (primeiro é administrador). |
| `GET` | `/items` | Lista todos os recursos com filtros públicos/privados/classificador. |
| `GET` | `/items/produtor/:id` | Lista recursos de um determinado produtor. |
| `GET` | `/items/config` | Obtém a configuração atual (ex: contador de ficheiros). |
| `POST` | `/items/config/add-file-counter` | Incrementa o contador de ficheiros. |
| `POST` | `/items` | Adiciona um novo recurso. |
| `PUT` | `/items/:id` | Atualiza um recurso. |
| `DELETE` | `/items/:id` | Apaga um recurso. |
| `POST` | `/items/comentario/:id` | Adiciona um comentário ao recurso. |
| `GET` | `/items/download/file/:path` | Faz download de um ficheiro individual. |
| `GET` | `/items/download/:itemId` | Gera e envia o DIP (zip) de um item. |
| `GET` | `/noticias` | Lista todas as notícias. |
| `GET` | `/noticias/:id` | Mostra uma notícia pelo seu ID. |
| `PUT` | `/noticias/:id` | Atualiza uma notícia. |
| `POST` | `/noticias/:id/toggle` | Alterna a visibilidade de uma notícia. |

## Interface Frontend

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Página principal da aplicação que mostra os recursos públicos, as opções de autenticação (entrar ou registar) e outras funcionalidades como ver os utilizadores, classificadores, a opção de adicionar um novo item ou recurso e ver notícias . |
| `GET` | `/classificadores` | Lista de classificadores existentes, sendo possível selecionar um classificador específico. |
| `GET` | `/?classificador=natureza` | Apresenta a página principal com os itens públicos que contém o classificador natureza. |
| `GET` | `/items/:id` | Mostra a página de um item com um id específico |
| `POST` | `/items/:id` | Submete um comentário a um item com o id especificado. |
| `GET` | `/items/edit/:id` | Apresenta um formulário para editar um recurso. |
| `POST` | `/items/edit/:id` | Submete as alterações feitas ao recurso. |
| `GET` | `/items/delete/:id` | Apaga um recurso identificado pelo id. |
| `POST` | `/items/files` | Submete um ficheiro SIP para ser processado. |
| `GET` | `/admin` | Página principal da área de administração. |
| `GET` | `/admin/utilizadores` | Lista de utilizadores do sistema. |
| `GET` | `/admin/utilizadores/delete/:id` | Apaga um utilizador com o id especificado. |
| `GET` | `/admin/recursos` | Lista todos os recursos. |
| `GET` | `/admin/noticias` | Lista todas as notícias existentes. |
| `POST` | `/admin/noticias` | Cria uma nova notícia. |
| `GET` | `/admin/noticias/edit/:id` | Formulário para editar uma notícia. |
| `POST` | `/admin/noticias/edit/:id` | Guarda alterações na notícia. |
| `GET` | `/admin/noticias/toggle/:id` | Alterna visibilidade de uma notícia. |
| `GET` | `/auth/login` | Página de login. |
| `POST` | `/auth/login` | Submete dados de login. |
| `GET` | `/auth/signup` | Página de registo. |
| `POST` | `/auth/signup` | Submete dados de registo. |
| `GET` | `/auth/logout` | Termina sessão e limpa o cookie. |
| `GET` | `/utilizadores` | Apresenta a lista de utilizadores. |
| `GET` | `/utilizadores/:id` | Mostra a página de um utilizador e os seus recursos. |
| `GET` | `/utilizadores/edit/:id` | Mostra o formulário para editar perfil do utilizador com o id especificado. |
| `POST` | `/utilizadores/edit/:id` | Submete alterações do perfil do utilizador. |
| `GET` | `/utilizadores/delete/:id` | Apaga o utilizador especificado. Se for o proprio utilizador a apagar, faz logout e redireciona para /auth/logout. Senão redireciona para a página anterior. |

---

# Autenticação Local 

A aplicação suporta autenticação tradicional com nome utilizador e password, utilizando JWT (JSON Web Tokens).

## Processo

Quando o utilizador faz login pelo formulário (`/auth/login`), o backend:

1. **Verifica as credenciais** usando o `passport-local`.
2. **Gera um token JWT** com dados do utilizador.
3. **Envia o token como cookie** para o frontend (com `HttpOnly`, `SameSite`, etc).

Este token é usado em chamadas subsequentes para autenticar o utilizador e controlar permissões.

## Estrutura do JWT

O token contém:

```json
{
  "_id": "id do utilizador",
  "nome": "Nome do utilizador",
  "perfil": "perfil (administrador, produtor, consumidor)"
}
```

Assinado com o segredo:

```js
const SECRET = "EngWeb2025";
```

## Middleware de Validação

```js
none(req, res, next)
```

Insere o token num campo `user` que poderá ser usado nas rotas para verificar se o utilizador está autenticado ou não. Porém, não é preciso autenticação para aceder essas rotas

```js
// Qualquer utilizador autenticado
validate(req, res, next)
```

Valida se existe um token JWT no header `Authorization`. Se for válido, popula `req.user`.

```js
// Apenas produtores ou administradores
validateProdutor(req, res, next)
```

Garante que o `perfil` no token é "produtor" ou "administrador".

```js
// Apenas administradores
validateAdmin(req, res, next)
```

Garante que o `perfil` é "administrador".

## Validação baseada em Cookie (Frontend)

No frontend, os tokens são enviados como cookies (`token=...`) e validados com pedidos `whoami`:

```js
axios.get('http://localhost:3000/whoami', {
  headers: { Cookie: `token=${req.cookies.token}` }
});
```

A resposta inclui o utilizador autenticado, permitindo que o frontend determine permissões ou redirecione o utilizador.

## Segurança

- Os tokens têm validade (`expiresIn: 3600`).
- O token é armazenado num cookie `HttpOnly`, o que o protege de ataques XSS.
- As permissões são verificadas em cada pedido via middleware (`validate*`).

---

# Autenticação com GitHub

Foi implementado um mecanismo de login via GitHub, recorrendo à biblioteca `passport-github2`, com o objetivo de permitir o acesso autenticado à plataforma sem necessidade de criação manual de contas locais.

## Integração técnica

A integração foi realizada através dos seguintes componentes:

- **Estratégia utilizada:** `passport-github2`
- **Rota de entrada:** `/auth/github`
- **Callback configurado:** `/auth/github/callback`
- **Credenciais OAuth:** `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_CALLBACK_URL`
- **Persistência:** Utilizadores autenticados são guardados na coleção `utilizadores`, utilizando `mongoose`.

## Funcionamento

1. O utilizador acede à rota de autenticação `/auth/github`.
2. É redirecionado para o GitHub, onde autoriza o acesso da aplicação.
3. O GitHub redireciona de volta para `/auth/github/callback`, onde é extraída a informação do perfil público.
4. Se o utilizador ainda não existir, é criado automaticamente com o perfil por omissão (`consumidor`).
5. A sessão do utilizador é armazenada em cookie (`express-session`).

## Considerações de segurança

- A autenticação é delegada ao GitHub, evitando a gestão de palavras-passe no sistema.
- Apenas dados públicos (como nome, username e email) são armazenados.
- A rota de callback é validada para mitigar ataques de redirecionamento malicioso.
- O middleware `req.user` é utilizado para determinar o perfil e acesso permitido.

---

# Sistema de Logging

Foi implementado um sistema de logging com a biblioteca `winston`, de forma a registar eventos relevantes da aplicação, incluindo:

- Pedidos HTTP recebidos (método, rota, IP, utilizador);
- Ocorrência de erros (mensagem de erro, método, rota, IP, utilizador);
- Eventos relevantes como o registo de novos utilizadores.

Os logs são escritos num ficheiro persistente `logs/app.log`, em formato JSON estruturado, e também apresentados no terminal com formatação colorida para facilitar o debugging durante o desenvolvimento.

A criação automática da pasta `logs/` é assegurada se esta não existir. A separação por tipo de evento (`HTTP`, `ERRO`, `EVENTO`) permite filtrar facilmente os registos mais relevantes. O sistema encontra-se pronto a ser expandido para incluir outros eventos importantes, como submissão de SIPs, alterações a dados sensíveis ou acessos não autorizados.

---

# Identificação
- André Campos - a104618
- Beatriz Peixoto - a104170
- Sara Lopes - a104179