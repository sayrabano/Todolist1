
//<----------declaration of variables and crearting dom object ----------->

//  ------------------accessing date element through dom method (start)-----------------
const date = document.querySelector('.date');
const today = new Date();
const days = {weekday:'long',month:"short",day:"numeric"}
 date.innerHTML = today.toLocaleDateString("en-us",days);
//  ------------------accessing date element through dom method (end)-----------------

 
//  ------------------accessing form element through dom method (start)-----------------
 const inputForm = document.querySelector('#todo-form');
//  ------------------accessing form element through dom method (end)-----------------

 //  ------------------accessing form -> input element through dom method (start)-----------------
 const mainInput = document.querySelector('#todo-form .todo-input');
//  ------------------accessing form -> input element through dom method (end)-----------------

 //  ------------------accessing todolist and statistis data element through dom method (start)-----------------
 const todoList = document.querySelector('.todo-list');
 const totalTasks = document.querySelector('#all-task');
 const completedTasks = document.querySelector('#completed-task');
 const leftTasks = document.querySelector('#left-task');
  //  ------------------accessing todolist and statistis data element through dom method (end)-----------------

 
 // ------------------- function : creating variable for getting data from localstorage------------
 
 let tasks = JSON.parse(localStorage.getItem('tasks')) ||[]
if(localStorage.getItem('tasks')){
    tasks.map((task)=>{
        // calling addtask function  and adding task to dom screen -------
        addTask(task)
    });
}

//------------------- performing addEventListener on submission of task---------
inputForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputValue  = mainInput.value;
    //checking if task is empty or not-----
    if(inputValue==''){
        //calling showNotification function to show alert message on blank task adding........ 
        showNotification('Task can not be Empty...')
        return;
    }
    const task = {
        id:new Date().getTime(),
        name:inputValue,
        isCompleted:false
    }
    //console.log(task);
    tasks.push(task)
    //storing data into localstorage----------------->
    localStorage.setItem('tasks',JSON.stringify(tasks));

    //calling addTask function ---------------
     addTask(task);

     //calling resetiing inputform ---------------
     inputForm.reset();
     mainInput.focus();

});


// ------------------- function : creating add function to add task in dom screen ---------------
function addTask(task){
    // adding li tag to todo-list div----->
    const taskElm = document.createElement('li');
    taskElm.setAttribute('id',task.id)
    //To maintain if the task is completed or not-------------->
    if(task.isCompleted){
        taskElm.classList.add('complete');
    }
    // adding node to parent element----> adding checkbox contend span and delete button on run time-------->
     const  elm = `<div><input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted?'checked':''}>
     <span ${!task.isCompleted? 'contenteditable':''}>${task.name}</span></div>
     <button title="Remove the "${tasks.name}" task" class="remove-task">
     &#10006
   </button>
   
    
     `

     taskElm.innerHTML= elm;
     //Appends the node to the DOM-------------------->
     todoList.appendChild(taskElm);
     //Calling countTask methhod to keep update of all tasks--------------->
     countTasks();
}


// ------------------- function : creating Remove function to remove task to dom screen ---------------
function removeTask(taskId){
    tasks= tasks.filter((task)=>
        task.id !== parseInt(taskId)
        
    )
    
    // setting task into localstorage-------->
    localStorage.setItem('tasks',JSON.stringify(tasks));

     // Deleteing particular task from Dom screen using its id ---------->
     document.getElementById(taskId).remove();
    
}

// Addding eventlistener to keep update after deleting the task ---------->
todoList.addEventListener('input',(e)=>{
    const taskId = e.target.closest('li').id

    updateTask(taskId,e.target);
});


// ------------------- function : creating update function to update task into dom screen ---------------
function updateTask(taskId,elm){
    const task = tasks.find((task)=> task.id === parseInt(taskId))

    //checking whether task is editable or not------->
  if(elm.hasAttribute('contenteditable')){
    task.name = elm.textContent;
  }else{
    const spelm = elm.nextElementSibling
    const parent = elm.closest('li')
    //checking if task is  completed or editable ----------->
    task.isCompleted= !task.isCompleted
    if(task.isCompleted){
        spelm.removeAttribute('contenteditable')
        parent.classList.add('complete')
    }else{
        spelm.removeAttribute('contenteditable','true')
        parent.classList.remove('complete');
        
    }
  }
  //setting task update in to localstorage----------------
  localStorage.setItem('tasks',JSON.stringify(tasks));
  //Calling countTask methhod to keep update of all tasks--------------->
     countTasks();
}


// ------------------- function : creating Counttask function to keep count of all complete and incomplete task into dom screen ---------------
function countTasks(){
    const completedTaskArray =  tasks.filter((task)=>
        task.isCompleted ===true)
    
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completedTaskArray.length;
    leftTasks.textContent = tasks.length-completedTaskArray.length;
}

//checking if through eventlistener :if remove-task is available than update count of left task--------->
todoList.addEventListener('click',(e) =>{
    if(e.target.classList.contains('remove-task')){
        const taskId = e.target.closest('li').id

        // calling remove task function------------->
        removeTask(taskId);
    }
    // calling counttask function------------->
     countTasks();
})



// ------------------- function : creating showNotification function to keep alert to user on pressing eneter key or adding empty task ---------------
function showNotification(text){
    
    alert(text);
}


// ------------------- function : creating getColor function to chanage background color on adding task or refreshing the page ---------------
const getColor = ()=>{
    const randomNumber = Math.floor(Math.random()* 16777215);
    console.log(randomNumber);
    const randomCode = '#'+randomNumber.toString(16);
    document.body.style.background=randomCode;
    navigator.clipboard.writeText(randomCode)
  }
  
  document.getElementById("btn").addEventListener('click',getColor);
  getColor();





// ------------------- End of js ---------------