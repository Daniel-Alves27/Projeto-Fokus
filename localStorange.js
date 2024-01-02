const taskListContainer = document.querySelector(".app__section-task-list");

const appFormTask = document.querySelector(".app__form-add-task");
const labelForm = document.querySelector(".app__form-label");
const formBtn = document.querySelector(".app__button--add-task");
const textArea = document.querySelector(".app__form-textarea");
const cancelBtn = document.querySelector(".app__form-footer__button--cancel");
const deleteBtn = document.querySelector(".app__form-footer__button--delete");
const taskAtiveDescription = document.querySelector(".app__section-active-task-description");

const localStorangeGet = localStorage.getItem("tarefas");

let tarefas = localStorangeGet ? JSON.parse(localStorangeGet) : [];

let tarefaSelecionada = null;
let itemTarefaSelecionada = null;

const selecionaTarefa = (tarefa , elemento)=> {
    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active')
    })
    
    if (tarefaSelecionada == tarefa) {
        taskAtiveDescription.textContent = null
        itemTarefaSelecionada = null
        tarefaSelecionada = null
        return
    }
    
    tarefaSelecionada = tarefa
    itemTarefaSelecionada = elemento
    taskAtiveDescription.textContent = tarefa.descricao
    elemento.classList.add('app__section-task-list-item-active')
}


const iconTaskSvg = `
<svg class="app_section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
<path
    d = "M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L19 16.17192"
    fill="#01080E" />
</svg>
`

const limparForm = () => {
    textArea.value = "";
    appFormTask.classList.toggle("hidden");
}

function createTask(tarefa) {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svgIcon = document.createElement("svg");
    svgIcon.innerHTML = iconTaskSvg;

    const paragrafo = document.createElement("p");
    paragrafo.classList.add("app__section-task-list-item-description");

    paragrafo.textContent = tarefa.descricao;

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }

    li.appendChild(svgIcon);
    li.appendChild(paragrafo);

    return li;
}

tarefas.forEach(Element => {
    const taskItem = createTask(Element);
    taskListContainer.appendChild(taskItem);
})

formBtn.addEventListener("click", ()=> {
    labelForm.textContent = "adicionar tarefa";
    appFormTask.classList.toggle("hidden");
})

const localStorageSet = () => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

appFormTask.addEventListener("submit", (e)=> {
    e.preventDefault();
    const task = {
        descricao : textArea.value,
        concluido: false
    };
    
    tarefas.push(task);

    const addTask = createTask(task);
    taskListContainer.appendChild(addTask);

    localStorageSet()
    limparForm()
})

cancelBtn.addEventListener("click", limparForm);