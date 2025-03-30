# Resolução da ficha da Semana 7

## 1.1 Setup

### - Analisa o dataset fornecido;
1. Os valores do campo precoContratual apresentam-se assim: 3918,75.
O problema aqui surge, porque o MongoDB só aceita '.' como separador decimal para números.

2. Não existe campo _id, sendo que em MongoDB, todos os documentos precisam de um campo _id.

### - Introduz as alterações que achares necessárias no dataset; 

1. Primeira alteração.

Caso a correção seja no JSON:
```bash
sed -i 's/"precoContratual": "\(-\?[0-9]\+\),\([0-9]\+\)"/"precoContratual": "\1.\2"/g' contratos2024.json
```

Caso a correção seja no CSV:
```bash
sed -i 's/\(-\?[0-9]\+\),\([0-9]\+\)/\1.\2/g' contratos2024.csv
```

Caso fosse com * em vez de mais era mais simples (sed tradicional (POSIX) usa regex básico por defeito):
```bash
sed -i 's/"precoContratual": "\(-\?[0-9]*\)\.\([0-9]*\)"/"precoContratual": "\1,\2"/g' contratos2024.json
```

2. Segunda alteração.

O campo idcontrato é o id de cada registo, convém transformá-lo em _id.
```bash
jq 'map(.idcontrato as $id | del(.idcontrato) | ._id = $id)' contratos2024.json > out.json
```

Se quisesse que o id fosse String em vez de Number:
```bash
jq 'map(.idcontrato as $id | del(.idcontrato) | ._id = ($id | tostring))' contratos2024.json > out.json
```

### - Importa-o numa base de dados em MongoDB com os seguintes parâmetros: 
####    * database: -d contratos
####    * collection: -c contratos

```bash
docker exec mongoEW mongoimport -d contratos -c contratos /tmp/out.json --jsonArray
```

Antes dava jeito fazer:
```bash
docker cp out.json mongoEW:/tmp
```

### - Testa se a importação correu bem.
```bash
docker exec -it mongoEW sh
```

```bash
mongosh
```

```bash
use contratos
```

```bash
show collections
```

Depois, a primeira query do capítulo seguinte provou que a importação correu bem.

## 1.2 Queries (warm-up)

### 1. Quantos registos estão na base de dados;
```bash
db.contratos.countDocuments()
```

### 2. Quantos registos de contratos têm o tipo de procedimento com valor "Ajuste Direto Regime Geral"?
```bash
db.contratos.countDocuments({ tipoprocedimento: "Ajuste Direto Regime Geral" })
```
ou
```bash
db.contratos.find({tipoprocedimento: "Ajuste Direto Regime Geral"}).count()
```

### 3. Qual a lista de entidades comunicantes (ordenada alfabeticamente e sem repetições)?
```bash
db.contratos.distinct("entidade_comunicante")
```

### 4. Qual a distribuição de contratos por tipo de procedimento (quantos contratos tem cada tipo de procedimento)?
```bash
db.contratos.aggregate([
    {
        $group: {
            _id: "$tipoprocedimento",
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 } # Ordena do maior para o menor
    }
]).forEach(function(doc) {
    print("Tipo de Procedimento: " + doc._id + " Contagem: " + doc.count);
});
```

### 5. Qual o montante global por entidade comunicante (somatório dos contratos associados a uma entidade)?
```bash
db.contratos.aggregate([
        {
            $group: {
                _id:"$entidade_comunicante",
                totalMontante: {
                    $sum: {
                        $toDouble: "$precoContratual"
                        }
                    }
                }
        },
        {
                            $sort: {totalMontante: -1}
        }
    ])
```

## 1.3 API de dados
Realizado na pasta apiContratos.

## 2 Contratos (Interface)
Realizado na pasta appContratos.