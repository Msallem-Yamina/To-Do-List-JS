let input = document.querySelector("header input"),
    addbtn = document.querySelector("header .plus"),
    tasks = document.querySelector (".info-tasks"),
    tasksCount = document.querySelector (".all span"),
    tasksCmpleted = document.querySelector (".completed span"),
    lc = JSON.parse(localStorage.getItem("tasks"));
if (lc.length !== 0){
    document.querySelector(".no-tasks").remove();
      // Add Tasks of LocalStorage To info-tasks 
      lc.forEach(el => {
           AddTask(el);
       });
  }
// Focus On Input Field
window.onload = function () {
    input.focus();
};
// Add task
addbtn.onclick = function(){
    if (input.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Enter your task!',
          });
        input.focus();
    }else {
        let notasks = document.querySelector(".no-tasks");
        if (document.body.contains(notasks)){
            // Remove No Tasks Message
            notasks.remove();
        };
        // Add In section Info-tasks
        AddTask (input.value);
        AddLocalS(input.value);
        // Test If New Task Exist In Tasks
        input.value = '';
        input.focus();
        somTasks();
    };
};
// Delete and Finish Task
document.addEventListener ("click" , (e)=> {
    if (e.target.className == "delete") {
        let p = e.target.parentElement;
        p.remove();
        // Remove In Local Storage
        deleteLS(p);
        // Check Number Of Tasks Inside The Container 
        if (tasks.childElementCount === 0) {
            Notask();
        };
    };
    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finished");
    };
    somTasks();
});
let items = [];
function AddLocalS (id){
    // Test L'existence of Tasks In Local Storage 
    if (lc.length === 0 ){
        items.push(id);
        localStorage.setItem("tasks" , JSON.stringify(items));
    }else {
        // Search l'existence of Task  in local storage  
        if (lc.indexOf(id) === -1){
            lc.push(id);
            localStorage.setItem("tasks" , JSON.stringify(lc));
        };
    }
};
function deleteLS (box){
    // Search Position Span In lc With indexOf and Delete Him Span From Local Storage 
    lc.splice(lc.indexOf(box.id),1);
    localStorage.setItem("tasks" , JSON.stringify(lc));
}
function AddTask (task){
    let span = document.createElement("span");
    span.classList.add("task-box");
    span.appendChild(document.createTextNode(task))
    let del = document.createElement("span");
    del.className = "delete";
    del.appendChild(document.createTextNode("Delete"));
    span.appendChild(del);
    span.setAttribute ("id", task);
    let arr = Array.from(document.querySelectorAll(".task-box"));
    let found = arr.find (el =>
        el.id === task);
   if (found === undefined){
       tasks.appendChild(span);
    }else {
       Swal.fire({
           title: 'Your Task is Already Exist!',
           text: "Enter another task!",
           icon: 'warning'
       });
   };
};
function somTasks(){
 // All Tasks
 tasksCount.innerHTML = document.querySelectorAll(".info-tasks .task-box").length;
 // All Tasks Completed
 tasksCmpleted.innerHTML = document.querySelectorAll(".info-tasks .finished").length;
}
function Notask (){
    span = document.createElement("span");
    span.appendChild(document.createTextNode("No Tasks To Show"));
    span.className = "no-tasks";
    tasks.appendChild(span);
} 