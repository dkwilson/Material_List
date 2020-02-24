// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Create load event listener
function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter task event
    filter.addEventListener('keyup', filterTasks);


}

//Get Tasks from Local 
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        //Create li element
    const li = document.createElement('li');

    //Add Class
    li.className = 'collection-item';

    //create text node
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class="material-icons">highlight_off</i>';

    //append the link to the li
    li.appendChild(link);

    //append li to ul;

    taskList.appendChild(li);
    })
}

//Add Task
function addTask(e){
    if(taskInput.value == '') {
        alert('Add a task');
    } 

    //Create li element
    const li = document.createElement('li');

    //Add Class
    li.className = 'collection-item';

    //create text node
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class="material-icons">highlight_off</i>';

    //append the link to the li
    li.appendChild(link);

    //append li to ul;

    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  
  if(localStorage.getItem('tasks') === null){
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//remove tasks
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();

        //Remove from local storage
        removeTasksFromLocalStorage(e.target.parentElement.parentElement);
        }
}
}

//Remove from local storage
function removeTasksFromLocalStorage (taskItem) {
    let tasks;
  
  if(localStorage.getItem('tasks') === null){
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
      if(taskItem.textContent === task) {
          tasks.splice(index, 1);

      }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from local storage
    clearTasksFromLocalStorage();
}

//clear tasks from local storage

//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';

        } else {
            task.style.display = 'none';
        }
    });
    
}