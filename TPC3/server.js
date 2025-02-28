var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var alunosServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);

    if(static.staticResource(req)){
        static.serveStaticResource(req, res);
    }
    else {
        switch(req.method) {
            case "GET": 
                if(req.url === '/') {
                    // Página inicial
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templates.homePage(d));
                    res.end();
                }
                else if (req.url === '/alunos') {
                    // GET /alunos - Lista de alunos
                    axios.get('http://localhost:3000/alunos')
                        .then(response => {
                            var alunos = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.studentsListPage(alunos, d));
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage("Erro ao obter a lista de alunos.", d));
                            res.end();
                        });
                }
                // GET /alunos/:id - Página de detalhes de um aluno
                else if(req.url.match(/\/alunos\/[A-Za-z0-9%]+$/)) { 
                    let id = req.url.split('/')[2];
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(response => {
                            var aluno = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.studentPage(aluno, d));
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage("Erro: Aluno " + id + " não encontrado.", d));
                            res.end();
                        });
                }
                // GET /alunos/registo - Formulário para registar novo aluno
                else if(req.url === '/registos/alunos') {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templates.studentFormPage(d));
                    res.end();
                }                
                // GET /alunos/edit/:id - Formulário para editar aluno
                else if(req.url.match(/\/alunos\/edit\/[A-Za-z0-9%]+$/)) {
                    let id = req.url.split('/')[3];
                    axios.get('http://localhost:3000/alunos/' + id)
                        .then(response => {
                            var aluno = response.data;
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.studentFormEditPage(aluno, d));
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage("Erro: Aluno " + id + " não encontrado para edição.", d));
                            res.end();
                        });
                }
                // GET /alunos/delete/:id - Remove um aluno
                else if(req.url.match(/\/alunos\/delete\/[A-Za-z0-9%]+$/)) {
                    let id = req.url.split('/')[3];
                    axios.delete(`http://localhost:3000/alunos/${id}`)
                        .then(response => {
                            res.writeHead(301, { Location: '/alunos' }); // Redireciona para a lista de alunos
                            res.end();
                        })
                        .catch(err => {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(templates.errorPage("Erro 404: Aluno " + id + " não encontrado para remoção.", d));
                            res.end();
                        });
                }
                // Página não encontrada
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(templates.errorPage("Erro 404: Página não encontrada.", d));
                    res.end();
                }
                break;

            case "POST":
                // POST /alunos/registo - Adiciona novo aluno
                if (req.url == '/alunos/registo') {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.write(templates.successPage());
                                    res.end();
                                })
                                .catch(err => {
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.end("<h1>Erro interno do servidor ao registar aluno!</h1>");
                                });
                        } else { 
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end("<h1>Erro 400: Pedido inválido - Nenhum dado enviado.</h1>");
                        }
                    });
                }
                // POST /alunos/edit/:id - Edita um aluno
                else if (req.url.match(/\/alunos\/edit\/[A-Za-z0-9%]+$/)) {
                    let id = req.url.split('/')[3];
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put(`http://localhost:3000/alunos/${id}`, result)
                                .then(resp => {
                                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.write(templates.editSuccessPage());
                                    res.end();
                                })
                                .catch(err => {
                                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.end("<h1>Erro 404: Aluno não encontrado para edição.</h1>");
                                });
                        } else { 
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end("<h1>Erro 400: Pedido inválido - Nenhum dado enviado.</h1>");
                        }
                    });
                }
                break;

            default: 
                res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.errorPage("Erro 405: Método não permitido.", d));
                res.end();
        }
    }
});

alunosServer.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...");
});
