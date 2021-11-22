
var addButton = document.getElementById('addButton');
var addInput = document.getElementById('taskInput');
var taskList = document.getElementById('taskList');
var taskArray = [];

//Every task element in the list is stored like this 
function taskElementObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
}

//function to change the status to "complete" 
var toComplete = function(){
    var parent = this.parentElement;
    parent.className = 'incompleted well';
    this.innerText = 'Undo';
    this.removeEventListener('click',toComplete);
    this.addEventListener('click',toIncomplete);
    setStatus(parent.firstChild.innerText,'complete');

}

//function to change the status to "incomplete"
var toIncomplete = function(){
    var parent = this.parentElement;
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click',toIncomplete);
    this.addEventListener('click',toComplete);

    setStatus(parent.firstChild.innerText,'incomplete');

}


//function to change the todo list array
var setStatus = function(data,status){

    for(var i=0; i < taskArray.length; i++){

        if(taskArray[i].content == data){
            taskArray[i].status = status;
            storeLocally();
            break;
        }
    }
}

//Storing the taskList to the local storage
var storeLocally = function(){
    var todos = taskArray;
    localStorage.removeItem('taskList');
    localStorage.setItem('taskList', JSON.stringify(todos));
}

//function to update the dom of the list of todo list
var createNewTaskElement = function(taskString,status){

    var listItem = document.createElement('li');
    var itemLabel = document.createElement('label');
    var completeButton = document.createElement('button');
    var deleteButton = document.createElement('button');

    listItem.className = (status == 'incomplete')?'completed well':'incompleted well';
	itemLabel.innerText = taskString;
	
	//complete button operations
    completeButton.className = 'btn btn-success';
    completeButton.innerText = (status == 'incomplete')?'Complete':'Undo';
    if(status == 'incomplete'){
        completeButton.addEventListener('click',toComplete);
    }else{
        completeButton.addEventListener('click',toIncomplete);
    }

	//delete button operations
    deleteButton.className = 'btn btn-danger';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click',deleteTask);

	//appending 
    listItem.appendChild(itemLabel);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

//add new task using Enter Key
var addTask = function(e){
	if(e.keyCode === 13){
	if(addInput.value != ""){
		var newItem = new taskElementObj();
		newItem.content = addInput.value;
		taskArray.push(newItem);
		//add to the local storage
		storeLocally();
		//create the new task element 
		var item = createNewTaskElement(addInput.value,'incomplete');
		taskList.appendChild(item);
		addInput.value = '';
		document.getElementById("taskInput").focus();
	}
	else{
		alert("The task is empty");
	}}
}

//add new task using Button
var addTaskButton = function(e){
	if(addInput.value != ""){
		var newItem = new taskElementObj();
		newItem.content = addInput.value;
		taskArray.push(newItem);
		//add to the local storage
		storeLocally();
		//create the new task element 
		var item = createNewTaskElement(addInput.value,'incomplete');
		taskList.appendChild(item);
		addInput.value = '';
		document.getElementById("taskInput").focus();
	}
	else{
		alert("The task is empty");
	}
}

//delete the task 
var deleteTask = function(){
    var parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);

    var data = this.parentElement.firstChild.innerText;
    for(var i=0; i < taskArray.length; i++){

        if(taskArray[i].content == data){
            taskArray.splice(i,1);
            storeLocally();
            break;
        }
    }


}

//showing the previous list after refreshing the window using local storage 
window.onload = function(){
    var list = localStorage.getItem('taskList');

    if (list != null) {
        todos = JSON.parse(list);
        taskArray = todos;

        for(var i=0; i<taskArray.length;i++){
            var data = taskArray[i].content;

            var item = createNewTaskElement(data,taskArray[i].status);
            taskList.appendChild(item);
        }

    }

};

//add an event binder to the button
taskInput.addEventListener('keyup',addTask)
addButton.addEventListener('click',addTaskButton);

