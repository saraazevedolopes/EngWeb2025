/* 
- <!DOCTYPE html>: ajuda a garantir que o navegador interprete a página de acordo com as regras modernas do HTML5.
- rel: define o tipo de relação entre o ficheiro e a página HTML. stylesheet indica que o ficheiro é uma folha de estilos CSS que será aplicada à página.
- type: Define o tipo MIME do ficheiro referenciado. text/css indica que o ficheiro é CSS.
- href: Especifica o caminho do ficheiro CSS.  

do w3.css
- w3-card-4: Dá um efeito de sombra forte
- w3-margin: Adiciona margem
- w3-container: Adiciona espaçamento interno (padding)
*/

export function genErrorPage(message, d) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Erro 404</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin w3-black">
                <header class="w3-container w3-dark-grey">
                    <h1>Erro 404 - Página não encontrada</h1>
                </header>
                <div class="w3-container">
                    <p>${message}</p>
                    <a href="/" class="w3-button w3-orange">Voltar à Página Inicial</a>
                </div>
                <footer class="w3-container w3-dark-grey">
                    <h5>Generated in EngWeb2025 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`;
}

export function genInternalErrorPage(message, d) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Erro 500</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin w3-red">
                <header class="w3-container w3-dark-grey">
                    <h1>Erro 500 - Erro Interno do Servidor</h1>
                </header>
                <div class="w3-container">
                    <p>${message}</p>
                    <a href="/" class="w3-button w3-orange">Voltar à Página Inicial</a>
                </div>
                <footer class="w3-container w3-dark-grey">
                    <h5>Generated in EngWeb2025 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>`;
}

export function genMainPage(data){
    return `
    <!DOCTYPE html> 
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-purple">
                    <h1>Escola de Música</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li><a href="/alunos">Lista de Alunos</a></li>
                        <li><a href="/cursos">Lista de Cursos</a></li>
                        <li><a href="/instrumentos">Lista de Instrumentos</a></li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
}

function addBackButton() {
    return `<button class="w3-button w3-orange w3-ripple w3-margin" onclick="window.history.back()">Voltar</button>`;
}

export function genAlunosPage(alunos, data){
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>Lista de Alunos</h1>
                </header>

                <div class="w3-container">
                    ${addBackButton()}
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>Instrumento</th>
                        </tr>`;
    alunos.forEach(aluno => {
        pagHTML += `
        <tr>
            <td><a href='/aluno/${aluno.id}'>${aluno.nome}</a></td>
            <td>${aluno.curso}</td>
            <td>${aluno.instrumento}</td>
        </tr>`;
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
    return pagHTML;
}

export function genAlunoPage(aluno, data){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Aluno ${aluno.nome}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>${aluno.nome}</h1>
                </header>

                <div class="w3-container">
                    ${addBackButton()}
                    <p><b>Indetificador:</b> ${aluno.id}</p> 
                    <p><b>Data de Nascimento:</b> ${aluno.dataNasc}</p> 
                    <p><b>Curso:</b> ${aluno.curso}</p>
                    <p><b>Ano do curso:</b> ${aluno.anoCurso}</p>
                    <p><b>Instrumento:</b> ${aluno.instrumento}</p>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
}

export function genCursosPage(cursos, data){
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Cursos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Lista de Cursos</h1>
                </header>

                <div class="w3-container">
                    ${addBackButton()}
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome do Curso</th>
                        </tr>`;
    cursos.forEach(curso => {
        pagHTML += `
        <tr>
            <td><a href='/curso/${curso.id}'>${curso.designacao}</a></td>
        </tr>`;
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-green">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
    return pagHTML;
}

export function genCursoPage(nome, alunos, data){
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Curso: ${nome}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Curso: ${nome}</h1>
                </header>

                <div class="w3-container">
                    ${addBackButton()}
                    <h2>Alunos Inscritos</h2>
                    <ul>`;
    alunos.forEach(aluno => {
        pagHTML += `<li><a href='/aluno/${aluno.id}'>${aluno.nome}</a></li>`;
    });
    pagHTML += `</ul>
                </div>
                
                <footer class="w3-container w3-green">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
    return pagHTML;
}

export function genInstrumentosPage(instrumentos, data){
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Instrumentos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-red">
                    <h1>Lista de Instrumentos</h1>
                </header>

                <div class="w3-container">
                    ${addBackButton()}
                    <table class="w3-table-all">
                        <tr>
                            <th>Nome do Instrumento</th>
                        </tr>`;
    instrumentos.forEach(instrumento => {
        pagHTML += `
        <tr>
            <td><a href='/instrumento/${instrumento.id}'>${instrumento["#text"]}</a></td>
        </tr>`;
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-red">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
    return pagHTML;
}

export function genInstrumentoPage(nome, alunos, data){
    let pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumento: ${nome}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-red">
                    <h1>Instrumento: ${nome}</h1>
                </header>

                <div class="w3-container">
                    ${addBackButton()}
                    <h2>Alunos que tocam este instrumento</h2>
                    <ul>`;
    alunos.forEach(aluno => {
        pagHTML += `<li><a href='/aluno/${aluno.id}'>${aluno.nome}</a></li>`;
    });
    pagHTML += `</ul>
                </div>
                
                <footer class="w3-container w3-red">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>`;
    return pagHTML;
}