# Oficina de Reparações - Trabalho de Casa

## 📌 Introdução
Este trabalho consiste numa **aplicação web** desenvolvida em **Node.js** e num **script Python** para visualizar dados de uma **oficina de reparações**. Os dados são obtidos de uma API local servida pelo `json-server`.

O trabalho inclui duas abordagens:
1. **Servidor Node.js** que gera páginas **dinâmicas** ao consumir a API.
2. **Script Python** que gera páginas **estáticas** a partir de um ficheiro JSON.

---

## 🚀 Funcionalidades
### 🔹 **Servidor Node.js (Páginas Dinâmicas)**
- Lista de reparações.
- Detalhes de uma reparação.
- Lista de intervenções.
- Lista de marcas e modelos.

### 🔹 **Script Python (Páginas Estáticas)**
- Gera ficheiros `.html` prontos para visualização sem necessidade de servidor.
- Cria um site com as mesmas informações do servidor Node.js, mas de forma **fixa**.
- Página principal com navegação para listas de reparações, intervenções e marcas/modelos.
- Páginas de reparação, detalhes de uma reparação, intervenções e marcas e modelos.

---

## 🛠️ Tecnologias Utilizadas
- **Node.js** → Para criar o servidor web.
- **Axios** → Para consumir a API e gerar HTML dinâmico.
- **json-server** → Para simular a API REST com os dados da oficina.
- **Python** → Para gerar páginas HTML estáticas.
- **HTML** → Para estruturar as páginas.

---

## 🔧 Como Executar

### **1️⃣ Usar o Servidor Node.js** (para páginas dinâmicas)
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
   - [http://localhost:1234/](http://localhost:1234/) → Página principal
   - [http://localhost:1234/reparacoes](http://localhost:1234/reparacoes) → Lista de reparações
   - [http://localhost:1234/reparacoes/:nif](http://localhost:1234/reparacoes/:nif) → Detalhes de uma reparação
   - [http://localhost:1234/intervencoes](http://localhost:1234/intervencoes) → Lista de intervenções
   - [http://localhost:1234/marcas](http://localhost:1234/marcas) → Lista de marcas e modelos

### **2️⃣ Gerar as Páginas Estáticas com Python**
1. Executar o script:
   ```sh
   python gerador_website.py
   ```
2. Abrir os ficheiros gerados na pasta `site_gerado/` no navegador:
   - `site_gerado/index.html` → Página principal
   - `site_gerado/reparacoes.html` → Lista de reparações
   - `site_gerado/reparacoes/:nif.html` → Detalhes de uma reparação
   - `site_gerado/intervencoes.html` → Lista de intervenções
   - `site_gerado/marcas.html` → Lista de marcas/modelos

---

## 🌍 Navegação das Páginas

| Página | Node.js (Dinâmico) | Python (Estático) |
|---------|-----------------|-----------------|
| Página principal | `/` | `site_gerado/index.html` |
| Lista de reparações | `/reparacoes` | `site_gerado/reparacoes.html` |
| Detalhes de uma reparação | `/reparacoes/:nif` | `site_gerado/reparacoes/:nif.html` |
| Lista de intervenções | `/intervencoes` | `site_gerado/intervencoes.html` |
| Lista de marcas e modelos | `/marcas` | `site_gerado/marcas.html` |

---

## ⚠️ Tratamento de Erros
O servidor responde com diferentes mensagens de erro dependendo da situação:

- **404 (Página não encontrada)** → Se a página não existir ou se um recurso solicitado não for encontrado.
- **500 (Erro no servidor)** → Se houver falha ao carregar os dados da API ou outro erro inesperado.

## 🎯 Objetivo Pedagógico
Este trabalho permite praticar:

- Consumo de APIs REST em Node.js.
- Geração de páginas estáticas em Python.
- Manipulação de JSON.
- Construção de páginas HTML dinâmicas e estáticas.

---

## Identificação

**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179  

![Identificação Sara Azevedo Lopes](../fotografia.png)
