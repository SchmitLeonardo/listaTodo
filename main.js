
var input = document.querySelector('input');
var btn = document.querySelector('button');
var lista =  document.getElementById('content');

var todos = JSON.parse(localStorage.getItem('lista_todo')) || [];

/*
var todos = [
    'Fazer café',
    'Passear com o cachorro',
    'Estudar'
]
*/

function geraLista(){

    for(todo of todos){
        var linhaTabela = document.createElement('tr');
        var colunaTabela = document.createElement('td');
        var colunaContent = document.createTextNode(todo);

        colunaTabela.appendChild(colunaContent);
        linhaTabela.appendChild(colunaTabela);
        lista.appendChild(linhaTabela);

        var colunaLink = document.createElement('td');
        var linkEditar = document.createElement('a');
        var linkContent = document.createTextNode('Editar');
        linkEditar.setAttribute('href', '#');

        colunaLink.appendChild(linkEditar);
        linkEditar.appendChild(linkContent);
        linhaTabela.appendChild(colunaLink);

        var posicao = todos.indexOf(todo);

        var linkDeletar = document.createElement('a');
        var deletarContent = document.createTextNode(' Remover');
        linkDeletar.setAttribute('href', '#');
        linkDeletar.setAttribute('onclick', 'deletarTodo('+posicao+')');

        colunaLink.appendChild(linkDeletar);
        linkDeletar.appendChild(deletarContent);

        var colunaRadio = document.createElement('td');
        var radioConcluido = document.createElement('input');
        radioConcluido.setAttribute('type', 'checkbox');
        radioConcluido.setAttribute('name', 'completo');

        colunaRadio.appendChild(radioConcluido);
        linhaTabela.appendChild(colunaRadio);
    }

    input.value = '';
}

geraLista();

function limparTela(){
    lista.innerHTML = '';
}

function adicionarTodo(){

    limparTela();
    todos.push(input.value);
    geraLista();
}

function deletarTodo(posicao){
    todos.splice(posicao, 1);
    limparTela();
    geraLista();
    salvarLocalStorage();
}

btn.onclick = () => {
    adicionarTodo();
    salvarLocalStorage();
}

function salvarLocalStorage(){
    localStorage.setItem('lista_todo', JSON.stringify(todos));
}
