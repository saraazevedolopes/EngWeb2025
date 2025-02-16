const axios = require('axios');

module.exports = (req, res) => {
    axios.get('http://localhost:3000/reparacoes')
        .then(resp => {
            let marcas = new Map();

            resp.data.forEach(reparacao => {
                let marca = reparacao.viatura.marca;
                let modelo = reparacao.viatura.modelo;

                if (!marcas.has(marca)) {
                    marcas.set(marca, new Map());
                }

                let modelos = marcas.get(marca);
                modelos.set(modelo, (modelos.get(modelo) || 0) + 1);
            });

            // Ordenar marcas alfabeticamente
            let marcasOrdenadas = Array.from(marcas.keys()).sort();

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write("<html><head><meta charset='utf-8'><title>Lista de Marcas e Modelos</title></head><body>");
            res.write("<h1>Lista de Marcas e Modelos</h1>");
            res.write("<ul>");

            marcasOrdenadas.forEach(marca => {
                res.write(`<li><strong>${marca}</strong><ul>`);
                
                // Ordenar modelos alfabeticamente
                let modelosOrdenados = Array.from(marcas.get(marca).keys()).sort();
                
                modelosOrdenados.forEach(modelo => {
                    let count = marcas.get(marca).get(modelo);
                    res.write(`<li>${modelo} - ${count} reparações</li>`);
                });

                res.write("</ul></li>");
            });

            res.write("</ul>");
            res.write("<h6><a href='/'>Voltar</a></h6>");
            res.write("</body></html>");
            res.end();
        })
        .catch(err => {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end("<h1>Erro ao obter marcas. 500!</h1>");
        });
};
