
var input = document.querySelector('input');
var btn = document.querySelector('button');
var lista =  document.querySelector('table');

var todos = [
    'Fazer café',
    'Passear com o cachorro',
    'Estudar'
]


function geraLista(){

    for(todo of todos){
        var linhaTabela = document.createElement('tr');
        var colunaTabela = document.createElement('td');
        var colunaContent = document.createTextNode(todo);

        var colunaLink = document.createElement('td');
        var linkEditar = document.createElement('a');
        var linkContent = document.createTextNode('Editar');
        linkEditar.setAttribute('href', '#');

        colunaLink.appendChild(linkEditar);
        linkEditar.appendChild(linkContent);
        

        var linkDeletar = document.createElement('a');
        var deletarContent = document.createTextNode(' Remover');
        linkDeletar.setAttribute('href', '#');

        colunaLink.appendChild(linkDeletar);
        linkDeletar.appendChild(deletarContent);

        colunaTabela.appendChild(colunaContent);
        linhaTabela.appendChild(colunaTabela);
        lista.appendChild(linhaTabela);
        linhaTabela.appendChild(colunaLink);

    }

    input.value = '';
}

geraLista();


function adicionarTodo(){

    lista.innerHTML = '';

    todos.push(input.value);
    geraLista();
}

btn.onclick = () => {
    adicionarTodo();
    salvarLocalStorage();
}
