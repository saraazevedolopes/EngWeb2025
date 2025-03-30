# Gestão de Contratos - TPC6

### 📌 Introdução
Este TPC corresponde à resolução integral da ficha proposta no ficheiro `semana7_api_mdb_alunos.pdf`.

- A resolução dos pontos **1.1 Setup** e **1.2 Queries (warm-up)** encontra-se no ficheiro `SEMANA7.md`.
- A resolução do ponto **1.3 API de dados** encontra-se na pasta `apiContratos`.
Os testes ao seu funcionamento foram realizados através do Postman e dos seguintes comandos `curl` no terminal:

1. Obter todos os contratos
```bash
curl -X GET http://localhost:16000/
```

2. Filtrar contratos por entidade
```bash
curl -G http://localhost:16000/ --data-urlencode "entidade=Urbe - Consultores Associados, L.da"
```

3. Filtrar contratos por tipo
```bash
curl -G http://localhost:16000/ --data-urlencode "tipo=Consulta Prévia"
```

4. Filtrar contratos por entidade e tipo
```bash
curl -G http://localhost:16000/ \
  --data-urlencode "entidade=Urbe - Consultores Associados, L.da" \
  --data-urlencode "tipo=Consulta Prévia"
```

5. Obter lista de entidades
```bash
curl -X GET http://localhost:16000/entidades
```

6. Obter lista de tipos
```bash
curl -X GET http://localhost:16000/tipos
```

7. Obter contrato por ID
```bash
curl -X GET http://localhost:16000/10424261
```

8. Inserir novo contrato
```bash
curl -X POST http://localhost:16000/ \
  -H "Content-Type: application/json" \
  -d '{
    "_id": 99999,
    "nAnuncio": "XYZ789",
    "tipoprocedimento": "Ajuste Direto",
    "objectoContrato": "Aquisição de material informático",
    "dataPublicacao": "2024-03-30",
    "dataCelebracaoContrato": "2024-04-01",
    "precoContratual": 7500,
    "prazoExecucao": 90,
    "NIPC_entidade_comunicante": 123456789,
    "entidade_comunicante": "Escola Superior de Tecnologia",
    "fundamentacao": "Artigo 20.º"
  }'
```  

9. Atualizar o contrato recém-criado
```bash
curl -X PUT http://localhost:16000/99999 \
  -H "Content-Type: application/json" \
  -d '{
    "_id": 99999,
    "nAnuncio": "XYZ789",
    "tipoprocedimento": "Ajuste Direto",
    "objectoContrato": "Aquisição de computadores portáteis",
    "dataPublicacao": "2024-03-30",
    "dataCelebracaoContrato": "2024-04-02",
    "precoContratual": 8500,
    "prazoExecucao": 120,
    "NIPC_entidade_comunicante": 123456789,
    "entidade_comunicante": "Escola Superior de Tecnologia",
    "fundamentacao": "Artigo 20.º"
  }'
```  

10. Apagar o contrato recém-criado
```bash
curl -X DELETE http://localhost:16000/99999
```

- A resolução de **2 Contratos (Interface)** encontra-se em `appContratos`.

---

## 🏷️ Identificação

**Nome:** Sara Azevedo Lopes  
**Número de Aluno:** 104179

![Identificação Sara Azevedo Lopes](../fotografia.png)