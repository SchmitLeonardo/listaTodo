
var input = document.querySelector('input');
var btn = document.querySelector('button');
var lista =  document.getElementById('content');

var todos = JSON.parse(localStorage.getItem('lista_todo')) || [];
var checks = JSON.parse(localStorage.getItem('lista_checks')) || [];

function geraLista(){
    for(index in todos){
        var todo = todos[index];
        var linhaTabela = document.createElement('tr');
        var colunaTabela = document.createElement('td');
        var colunaContent = document.createTextNode(todo);

        colunaTabela.appendChild(colunaContent);
        linhaTabela.appendChild(colunaTabela);
        lista.appendChild(linhaTabela);

        var posicao = todos.indexOf(todo);
        var posicaoCheck = checks.indexOf(checks[index]);

        var colunaLink = document.createElement('td');
        var linkEditar = document.createElement('a');
        var linkContent = document.createTextNode('Editar');
        linkEditar.setAttribute('href', '#');
        linkEditar.setAttribute('onclick', 'editarTodo('+ posicao +')');

        colunaLink.appendChild(linkEditar);
        linkEditar.appendChild(linkContent);
        linhaTabela.appendChild(colunaLink);            

        var linkDeletar = document.createElement('a');
        var deletarContent = document.createTextNode(' Remover');
        linkDeletar.setAttribute('href', '#');
        linkDeletar.setAttribute('onclick', 'deletarTodo('+ posicao+')');

        colunaLink.appendChild(linkDeletar);
        linkDeletar.appendChild(deletarContent);

        var colunaCheck = document.createElement('td');
        var checkConcluido = document.createElement('input');
        checkConcluido.setAttribute('type', 'checkbox');
        checkConcluido.setAttribute('onchange', 'checkList('+index+')');
        if(checks[index] === true){
            checkConcluido.setAttribute('checked', checks[index]);
        }

        colunaCheck.appendChild(checkConcluido);
        linhaTabela.appendChild(colunaCheck);
    }
    input.value = '';
}

geraLista();

btn.onclick = () => {
    adicionarTodo();
    salvarLocalStorage();
}

function limparTela(){
    lista.innerHTML = '';
}

function adicionarTodo(){
    limparTela();
    todos.push(input.value);
    adicionarCheck();
    geraLista();
}

function deletarTodo(posicao){
    todos.splice(posicao, 1);
    deletarCheck();
    limparTela();
    geraLista();
    salvarLocalStorage();
}

function salvarLocalStorage(){
    localStorage.setItem('lista_todo', JSON.stringify(todos));
}

function editarTodo(posicao){
    input.value = todos[posicao];
    console.log(todos[posicao]);

    btn.onclick = () => {
        todos[posicao] = input.value;
        limparTela();
        geraLista();
        salvarLocalStorage();
    }
}

function salvarLocalStorageCheck(){
    localStorage.setItem('lista_checks', JSON.stringify(checks));
}

function checkList(check){
    console.log(check);
    if(checks[check] === true || checks[check] === false){
        if(checks[check] === true){
            checks[check] = false;
        }else{
            checks[check] = true;
        }
        salvarLocalStorageCheck();
    }else{
        adicionarCheck(check);
    }
}

function adicionarCheck(check){
    checks.push(checks[check] = false);
    salvarLocalStorageCheck();
}

function deletarCheck(){
    checks.splice(checks[this], 1);
    salvarLocalStorageCheck();
    limparTela();
    geraLista();
}
