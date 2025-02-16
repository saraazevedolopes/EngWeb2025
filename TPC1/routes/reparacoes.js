const axios = require('axios');

module.exports = (req, res) => {
    if (req.url === "/reparacoes") {
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                let reparacoes = resp.data;
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write("<h1>Lista de Reparações</h1><ul>");
                reparacoes.forEach(r => {
                    res.write(`<li><a href='/reparacoes/${r.nif}'>${r.nome} - ${r.viatura.marca} ${r.viatura.modelo}</a></li>`);
                });
                res.write("</ul><h6><a href='/'>Voltar</a></h6>");
                res.end();
            })
            .catch(err => {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                res.end("<h1>Erro ao obter reparações. 500!</h1>");
            });
    } 
    // Mostrar os detalhes de uma reparação
    else if (req.url.startsWith("/reparacoes/")) {
        let nif = req.url.split("/")[2];
        axios.get(`http://localhost:3000/reparacoes?nif=${nif}`)
            .then(resp => {
                if (resp.data.length === 0) {
                    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.end("<h1>Reparação não encontrada. 404!</h1>");
                    return;
                }
                let reparacao = resp.data[0];

                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write(`<h1>Detalhes da Reparação de ${reparacao.nome}</h1>`);
                res.write(`<p><strong>Data:</strong> ${reparacao.data}</p>`);
                res.write(`<p><strong>Viatura:</strong> ${reparacao.viatura.marca} ${reparacao.viatura.modelo}</p>`);
                res.write(`<p><strong>Intervenções (${reparacao.nr_intervencoes}):</strong></p>`);
                res.write("<ul>");
                reparacao.intervencoes.forEach(i => {
                    res.write(`<li><strong>${i.nome}</strong>: ${i.descricao}</li>`);
                });
                res.write("</ul>");
                res.write("<h6><a href='/reparacoes'>Voltar</a></h6>");
                res.end();
            })
            .catch(err => {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
                res.end("<h1>Erro ao obter reparação. 500!</h1>");
            });
    } 
};
