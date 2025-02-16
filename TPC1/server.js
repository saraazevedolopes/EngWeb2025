const http = require('http');
const reparacoes = require('./routes/reparacoes');
const intervencoes = require('./routes/intervencoes');
const marcas = require('./routes/marcas');

const PORT = 1234;

http.createServer(async (req, res) => {
    console.log("METHOD: " + req.method);
    console.log("URL: " + req.url);

    if (req.method === "GET") {
        if (req.url === "/") {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(`
                <html>
                    <head><meta charset="utf-8"><title>Oficina</title></head>
                    <body>
                        <h1>Oficina de Reparações</h1>
                        <ul>
                            <li><a href="/reparacoes">Lista de Reparações</a></li>
                            <li><a href="/intervencoes">Lista de Intervenções</a></li>
                            <li><a href="/marcas">Lista de Marcas e Modelos</a></li>
                        </ul>
                    </body>
                </html>
            `);
        } else if (req.url.startsWith("/reparacoes")) {
            await reparacoes(req, res);
        } else if (req.url.startsWith("/intervencoes")) {
            await intervencoes(req, res);
        } else if (req.url.startsWith("/marcas")) {
            await marcas(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end('<h1>Página não encontrada. 404!</h1>');
        }
    }
}).listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});
