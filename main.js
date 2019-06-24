var modal = document.querySelector('.modal-container');
var fechaModal = document.querySelector('.cancelar');
var todo = document.querySelector('.todo');
var todosContent = document.querySelector('.todos');
var todoSegundo = document.querySelector('.todo:nth-of-type(1n+2)');
var opcoes = document.querySelector('.opcoes');

var principal = { 
    lista: JSON.parse(localStorage.getItem('lista_todos')) || [],
    geraTodo: () =>{
      if(principal.lista == ''){
        todosContent.innerHTML = `<div class="todoVazio">
              <h2>Nenhum Todo Adicionado</h2>
              <h4>Clique no botão para adicionar um novo Todo</h4>
          </div>`
      }else{
        for(index in principal.lista){
          var item = principal.lista[index].novoTodo;
          var novoTodo = document.createElement('div');
          novoTodo.innerHTML = `<div class="todo">
          <input type="checkbox" class="checkbox" onchange="principal.mudaCheck(`+index+`)">
              <h3 class="tituloTodo" onclick="principal.mostrarOpcoes(`+index+`)">`+item+`</h3>
          </div>
          <div class="opcoes">
              <h3 class="editar-todo" onclick="principal.modalEditar(`+index+`)"><img src="img/edit.svg"> Editar</h3>
              <h3 class="deletar-todo" onclick="principal.modalExcluir(`+index+`)"><img src="img/delete.svg"> Remover</h3>
          </div>`
  
          todosContent.appendChild(novoTodo);
        }
      }

      principal.verificaCheck();
      var botaoAdicionar = document.querySelector('.botao-adicionar');
      botaoAdicionar.setAttribute('onclick', 'principal.modalAdicionar()');
      
      window.onclick = function(event){
          if (event.target == modal) {
            modal.style.display = "none";
          }
      }
    },
    limparTela: () => {
      todosContent.innerHTML = '';
    },
    salvarLocalStorage: () => {
      localStorage.setItem('lista_todos', JSON.stringify(principal.lista));
    },
    mostrarOpcoes: (pos) => {
      var opcoes = document.querySelectorAll('.opcoes');
      if(opcoes[pos].style.display == "none"){
        opcoes[pos].style.display = "flex";
        opcoes[pos].style.animation = "opcoes .8s forwards";
      }else{
        opcoes[pos].style.display = "none";
        opcoes[pos].style.animation = "opcoes .8s backwards";
      }
    },
    modalAdicionar: () => {
        modal.style.display = "flex";
        modal.innerHTML = `<div class="modal">
        <div class="modal-header">
            <h3>Adicionar Todo</h3>
        </div>
        <div class="modal-body">
            <form>
                <input type="text" class="adiciona-todo" placeholder="Adicionar Todo"/>
            </form>
        </div>
        <div class="modal-footer">
            <a href="#" onclick="principal.adicionaTodo()"><p>Adicionar</p></a>
            <a href="#" class="cancelar" onclick="principal.fecharModal()"><p>Cancelar</p></a>
        </div>
      </div>`
    },
    modalEditar: (pos) => {
      var content = principal.lista[pos].novoTodo;
      modal.style.display = "flex";
      modal.innerHTML = `<div class="modal">
            <div class="modal-header">
                <h3>Editar Todo</h3>
            </div>
            <div class="modal-body">
                <form>
                    <input type="text" class="todoEditado" value="`+content+`">
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" onclick="principal.editarTodo(`+pos+`)"><p>Adicionar</p></a>
                <a href="#" class="cancelar" onclick="principal.fecharModal()"><p>Cancelar</p></a>
            </div>
        </div>`;
    },
    fecharModal: () => {
      modal.style.display = "none";
    },
    editarTodo: (pos) => {
      principal.lista[pos].novoTodo = this.document.querySelector('.todoEditado').value;
      principal.limparTela();
      principal.geraTodo();
      principal.fecharModal();
      principal.salvarLocalStorage();
    },
    modalExcluir: (pos) => {
      principal.lista.splice(pos, 1);
      principal.limparTela();
      principal.geraTodo();
      principal.salvarLocalStorage();
    },
    adicionaTodo: () => {
      var novoTodo = this.document.querySelector('.adiciona-todo').value;
      var check = false;
      principal.lista.push({novoTodo, check});
      principal.limparTela();
      principal.geraTodo();
      principal.fecharModal();
      principal.salvarLocalStorage();
    },
    verificaCheck: () =>{
      var boxCheck = document.querySelectorAll('.checkbox');
      for(index in principal.lista){
        if(principal.lista[index].check == true){
          boxCheck[index].setAttribute('checked', principal.lista[index].check);
        }
      }
    },
    mudaCheck: (pos) => {
      if(principal.lista[pos].check == true){
        principal.lista[pos].check = false;
      }else{
        principal.lista[pos].check = true;
      }
      principal.salvarLocalStorage();
    }
}

principal.geraTodo();

