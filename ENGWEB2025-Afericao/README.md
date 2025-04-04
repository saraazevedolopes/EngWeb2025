# 📚 Ficha de Aferição — Engenharia Web 2025

Aplicação web para visualizar e gerir um catálogo de livros.

Estrutura do projeto:
- `ex1`: API de dados em Node.js com MongoDB (porta **17000**)
- `ex2`: Interface web em Node.js com Express e PUG (porta **17001**)

---

## ⚙️ Sobre o Projeto

O dataset original foi analisado, corrigido e transformado para garantir compatibilidade com MongoDB.  
A aplicação permite:

- Listar livros com título, autores, data e número de páginas
- Ver detalhes completos de um livro
- Aceder à página de cada autor e respetivos livros
- Ver a capa do livro, se existir

---

## 🧪 Execução

Para instruções completas sobre:

- Correção e validação do dataset original
- Conversão de listas e normalização de identificadores
- Setup do MongoDB com Docker
- Importação dos dados com `mongoimport`
- Descrição dos endpoints da API
- Comportamento da interface web
- Execução local das aplicações
- Ações necessárias para correr o projeto noutro ambiente

➡️ **Ver o ficheiro [`PR.md`](./PR.md)**

---

## 🌐 Endpoints principais

- API: [http://localhost:17000/books](http://localhost:17000/books)  
- Interface: [http://localhost:17001](http://localhost:17001)

---

## 📁 Estrutura

```plaintext
/
├── ex1                  # API de dados
├── ex2                  # Interface web
├── fixJson.py           # Script de correção do dataset
├── dataset_corrigido.json
├── PR.md                # Documentação técnica completa
└── README.md            # Este ficheiro
```

---

## 🏷️ Identificação

**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179

![Identificação Sara Azevedo Lopes](../fotografia.png)