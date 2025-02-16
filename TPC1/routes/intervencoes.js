const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/reparacoes');
        let intervencoes = {};
        response.data.forEach(r => {
            r.intervencoes.forEach(i => {
                if (!intervencoes[i.codigo]) {
                    intervencoes[i.codigo] = i;
                }
            });
        });

        let html = `<html><head><meta charset="utf-8"><title>Lista de Intervenções</title></head><body><h1>Lista de Intervenções</h1><ul>`;
        let counter = 1;
        Object.keys(intervencoes).sort().forEach(codigo => {
            let i = intervencoes[codigo];
            let formattedCode = `R${counter.toString().padStart(3, '0')}`;
            html += `<li>${formattedCode} || ${i.nome} - ${i.descricao}</li>`;
            counter++;
        });

        html += `</ul><a href='/'>Voltar</a></body></html>`;

        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(html);
    } catch (error) {
        console.error("Erro ao obter intervenções:", error);
        res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('<h1>Erro ao obter intervenções. 500!</h1>');
    }
};
