import json
import os
import shutil

# Função para abrir JSON
def open_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

# Criar diretoria para armazenar as páginas geradas
def mk_dir(relative_path):
    if os.path.exists(relative_path):
        shutil.rmtree(relative_path)  # Apagar conteúdo se já existir
    os.mkdir(relative_path)

# Criar um ficheiro HTML
def new_file(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# Criar diretoria de saída
output_dir = 'site_gerado'
mk_dir(output_dir)
mk_dir(os.path.join(output_dir, 'reparacoes'))  # Criar pasta para páginas individuais de reparações

data = open_json('dataset_reparacoes.json')

# Página principal
index_html = """
<html>
<head><meta charset='utf-8'><title>Oficina de Reparações</title></head>
<body>
    <h1>Oficina de Reparações</h1>
    <ul>
        <li><a href='reparacoes.html'>Lista de Reparações</a></li>
        <li><a href='intervencoes.html'>Lista de Intervenções</a></li>
        <li><a href='marcas.html'>Lista de Marcas e Modelos</a></li>
    </ul>
</body>
</html>
"""
new_file(os.path.join(output_dir, 'index.html'), index_html)

# Página de reparações
reparacoes_html = "<html><head><meta charset='utf-8'><title>Lista de Reparações</title></head><body><h1>Lista de Reparações</h1><ul>"
for r in data['reparacoes']:
    reparacoes_html += f"<li><a href='reparacoes/{r['nif']}.html'>{r['nome']} - {r['viatura']['marca']} {r['viatura']['modelo']}</a></li>"
    
    # Criar página individual da reparação
    reparacao_html = f"""
    <html>
    <head><meta charset='utf-8'><title>Reparação de {r['nome']}</title></head>
    <body>
        <h1>Reparação de {r['nome']}</h1>
        <p><strong>Data:</strong> {r['data']}</p>
        <p><strong>Viatura:</strong> {r['viatura']['marca']} {r['viatura']['modelo']} ({r['viatura']['matricula']})</p>
        <h2>Intervenções</h2>
        <ul>
    """
    for i in r['intervencoes']:
        reparacao_html += f"<li><strong>{i['nome']}</strong>: {i['descricao']}</li>"
    reparacao_html += "</ul><a href='../reparacoes.html'>Voltar</a></body></html>"
    new_file(os.path.join(output_dir, 'reparacoes', f"{r['nif']}.html"), reparacao_html)

reparacoes_html += "</ul><a href='index.html'>Voltar</a></body></html>"
new_file(os.path.join(output_dir, 'reparacoes.html'), reparacoes_html)

# Página de intervenções
intervencoes_html = "<html><head><meta charset='utf-8'><title>Lista de Intervenções</title></head><body><h1>Lista de Intervenções</h1><ul>"
intervencoes_map = {}
for r in data['reparacoes']:
    for i in r['intervencoes']:
        intervencoes_map[i['codigo']] = i
for codigo in sorted(intervencoes_map.keys()):
    i = intervencoes_map[codigo]
    intervencoes_html += f"<li>{codigo} || {i['nome']} - {i['descricao']}</li>"
intervencoes_html += "</ul><a href='index.html'>Voltar</a></body></html>"
new_file(os.path.join(output_dir, 'intervencoes.html'), intervencoes_html)

# Página de marcas e modelos
marcas_html = "<html><head><meta charset='utf-8'><title>Lista de Marcas e Modelos</title></head><body><h1>Lista de Marcas e Modelos</h1><ul>"
marcas = {}
for r in data['reparacoes']:
    marca = r['viatura']['marca']
    modelo = r['viatura']['modelo']
    if marca not in marcas:
        marcas[marca] = {}
    if modelo not in marcas[marca]:
        marcas[marca][modelo] = 0
    marcas[marca][modelo] += 1
for marca in sorted(marcas.keys()):
    marcas_html += f"<li><strong>{marca}</strong><ul>"
    for modelo in sorted(marcas[marca].keys()):
        marcas_html += f"<li>{modelo} - {marcas[marca][modelo]} reparações</li>"
    marcas_html += "</ul></li>"
marcas_html += "</ul><a href='index.html'>Voltar</a></body></html>"
new_file(os.path.join(output_dir, 'marcas.html'), marcas_html)

print("✔️ Website gerado na pasta site_gerado")