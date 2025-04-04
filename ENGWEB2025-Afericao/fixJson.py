import json
import ast
import re

def is_lista_string(s):
    if not isinstance(s, str):
        return False
    try:
        valor = ast.literal_eval(s)
        return isinstance(valor, list)
    except:
        return False

# Função que divide autores por vírgulas fora de parênteses
def separar_autores(texto):
    autores = []
    atual = ''
    parênteses = 0

    for char in texto:
        if char == ',' and parênteses == 0:
            autores.append(atual.strip())
            atual = ''
        else:
            atual += char
            if char == '(':
                parênteses += 1
            elif char == ')':
                parênteses = max(0, parênteses - 1)
    if atual.strip():
        autores.append(atual.strip())

    return autores

# Corrige listas e autor
def corrigir_listas(d):
    for chave, valor in d.items():
        # Corrigir listas representadas como strings (exceto author)
        if chave != "author" and is_lista_string(valor):
            try:
                d[chave] = ast.literal_eval(valor)
            except Exception as e:
                print(f"Erro ao converter campo '{chave}': {e}")
        # Corrigir campo author com vírgulas
        if chave == "author" and isinstance(valor, str) and ',' in valor:
            d[chave] = separar_autores(valor)
    return d

# Leitura do ficheiro
with open('dataset.json', 'r', encoding='utf-8') as f:
    conteudo = f.read()

# Remover colchetes [] se existirem
if conteudo.startswith('['):
    conteudo = conteudo[1:]
if conteudo.endswith(']'):
    conteudo = conteudo[:-1]

blocos = conteudo.split('},')

objetos_validos = []
objetos_com_erro = []
objetos_sem_bookId = []

for i, bloco in enumerate(blocos):
    bloco = bloco.strip()
    if not bloco.endswith('}'):
        bloco += '}'
    if not bloco.startswith('{'):
        bloco = '{' + bloco
    try:
        obj = json.loads(bloco)
        obj = corrigir_listas(obj)
        if 'bookId' not in obj or not obj['bookId']:
            objetos_sem_bookId.append(obj)
        objetos_validos.append(obj)
    except Exception as e:
        objetos_com_erro.append({'indice': i, 'erro': str(e), 'conteudo': bloco})

# Guardar objetos válidos
with open('dataset_listas_corrigidas.json', 'w', encoding='utf-8') as f:
    for obj in objetos_validos:
        json.dump(obj, f, ensure_ascii=False)
        f.write('\n')

# Guardar erros (se houver)
if objetos_com_erro:
    with open('objetos_com_erro.json', 'w', encoding='utf-8') as f:
        json.dump(objetos_com_erro, f, indent=2, ensure_ascii=False)

if objetos_sem_bookId:
    with open('objetos_sem_bookId.json', 'w', encoding='utf-8') as f:
        json.dump(objetos_sem_bookId, f, indent=2, ensure_ascii=False)

# Relatório final
print("✅ Processamento concluído.")
print(f"🔹 Objetos válidos: {len(objetos_validos)}")
print(f"🔸 Objetos com erro: {len(objetos_com_erro)} → guardados em 'objetos_com_erro.json'")
print(f"⚠️ Objetos sem bookId: {len(objetos_sem_bookId)} → guardados em 'objetos_sem_bookId.json'")
