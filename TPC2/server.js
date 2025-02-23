import { createServer } from 'http';
import axios from 'axios'; // Biblioteca que permite fazer requisições HTTP
import { genAlunosPage, genMainPage, genCursosPage, genInstrumentosPage, genAlunoPage, genCursoPage, genInstrumentoPage, genErrorPage, genInternalErrorPage } from './pages.js';
import { readFile } from 'fs';

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);
  
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // Define o status e os cabeçalhos da resposta
        res.write(genMainPage(d)); // Envia o conteúdo HTML para o navegador
        res.end();  
    }
    else if(req.url == '/alunos'){
        axios.get('http://localhost:3000/alunos')
            .then(function(resp){
                var alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genAlunosPage(alunos, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro);
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genInternalErrorPage(`Erro ao obter a lista de alunos.`, d));
                res.end();
            });
    }
    else if(req.url.match(/\/aluno\/[A-Za-z0-9%]+$/)){
        var id = req.url.split('/')[2];
        axios.get(`http://localhost:3000/alunos/${id}`)
            .then(function(resp){
                var aluno = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genAlunoPage(aluno, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genErrorPage(`O aluno com ID '${id}' não foi encontrado.`, d));
                res.end();
            });
    }
    else if(req.url == '/cursos'){
        axios.get('http://localhost:3000/cursos')
            .then(function(resp){
                var cursos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genCursosPage(cursos, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro);
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genInternalErrorPage(`Erro ao obter a lista de cursos.`, d));
                res.end();
            });
    }
    else if(req.url.match(/\/curso\/[A-Za-z0-9%]+$/)){
        var nome = decodeURIComponent(req.url.split('/')[2]);
        axios.get(`http://localhost:3000/alunos?curso=${nome}`)
            .then(function(resp){
                var alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genCursoPage(nome, alunos, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genErrorPage(`O curso '${nome}' não foi encontrado.`, d));
                res.end();
            });
    }
    else if(req.url == '/instrumentos'){
        axios.get('http://localhost:3000/instrumentos')
            .then(function(resp){
                var instrumentos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genInstrumentosPage(instrumentos, d));
                res.end();
            })
            .catch(erro => {
                console.log("Erro: " + erro);
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genInternalErrorPage(`Erro ao obter a lista de instrumentos.`, d));
                res.end();
            });
    }
    else if(req.url.match(/\/instrumento\/[A-Za-z0-9%]+$/)){
        var idInstrumento = decodeURIComponent(req.url.split('/')[2]); 
        axios.get(`http://localhost:3000/instrumentos?id=${idInstrumento}`)
            .then(function(respInstr){
                if (respInstr.data.length === 0) {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(genErrorPage(`O instrumento com ID '${idInstrumento}' não foi encontrado.`, d));
                    res.end();
                    return;
                }

                var nomeInstrumento = respInstr.data[0]["#text"];

                axios.get(`http://localhost:3000/alunos?instrumento=${encodeURIComponent(nomeInstrumento)}`)
                    .then(function(respAlunos){
                        var alunosDoInstrumento = respAlunos.data;

                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write(genInstrumentoPage(nomeInstrumento, alunosDoInstrumento, d));
                        res.end();
                    })
                    .catch(erro => {
                        console.log("Erro ao buscar alunos: " + erro);
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write(genInternalErrorPage(`Erro ao obter alunos para o instrumento '${nomeInstrumento}'.`, d));
                        res.end();
                    });
            })
            .catch(erro => {
                console.log("Erro ao buscar instrumentos: " + erro);
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genInternalErrorPage(`Erro ao obter informações sobre o instrumento.`, d));
                res.end();
            });
    }      
    else if(req.url.match(/w3\.css$/)){
        readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(genErrorPage(`O ficheiro 'w3.css' não foi encontrado.`, d));
                res.end();
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(dados);
            }
        });
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(genErrorPage(`A página '${req.url}' não existe.`, d));
        res.end();
    }
}).listen(3017);

console.log('Servidor à escuta na porta 3017...');
