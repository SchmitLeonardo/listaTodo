
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

        var deletar = todos.indexOf(todo);

        var colunaLink = document.createElement('td');
        var linkEditar = document.createElement('a');
        var linkContent = document.createTextNode('Editar');
        linkEditar.setAttribute('href', '#');
        linkEditar.setAttribute('onclick', 'editarTodo('+ deletar +')');

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
    geraLista();
}

function deletarTodo(posicao){
    todos.splice(posicao, 1);
    console.log(posicao);
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
