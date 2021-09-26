//Getting UI members using selectors
const listInput = document.querySelector('.task-input');
const submitButton = document.querySelector('.addButton');
const finalToDoList = document.querySelector('.list');
const completeButton = document.querySelector('.list');
const deleteAllTasks = document.querySelector('.deleteAllTasks');

//Event Listeners
//Button Event Listener


document.addEventListener('DOMContentLoaded', accessStorage)
submitButton.addEventListener("click", addToList);
completeButton.addEventListener("click", removeTask);
deleteAllTasks.addEventListener("click", clearAllTasks);


//Access Local Storage for list items
function accessStorage(){
    let items;
    if(localStorage.getItem('items') === null) {
        items = [];
    }

    else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(storedItem){
    const newListItem = document.createElement('li');
    newListItem.className = 'item';
    newListItem.appendChild(document.createTextNode(storedItem));
   
    //Completed Button
    const checkMark = document.createElement('button');
    checkMark.innerHTML = '<i class="bi bi-check-circle"></i>';
    checkMark.classList.add("finished-button"); 
    checkMark.classList.add("remove");
    newListItem.appendChild(checkMark);


    //Add to To-Do List
    finalToDoList.appendChild(newListItem);

    });
}

//Functions
function addToList(event) {
    if(listInput.value.trim().length == 0)
    {
        event.preventDefault();
        alert('Please enter a valid input');
    }

    else {
    event.preventDefault();


    const newListItem = document.createElement('li');
    newListItem.className = 'item';
    newListItem.appendChild(document.createTextNode(listInput.value));
   
    //Completed Button
    const checkMark = document.createElement('button');
    checkMark.innerHTML = '<i class="bi bi-check-circle"></i>';
    checkMark.classList.add("finished-button"); 
    checkMark.classList.add("remove");
    newListItem.appendChild(checkMark);


    //Add to To-Do List
    finalToDoList.appendChild(newListItem);


    //store in local storage
    storeItem(listInput.value);
    

    listInput.value = "";   
    }

}




function removeTask(event) {
    if(event.target.parentElement.classList.contains('remove'))
    {
        event.target.parentElement.parentElement.remove();

        //Remove item from storage
        removeFromStorage(event.target.parentElement.parentElement);
    }
}


function clearAllTasks(event) {
    if(event.target.classList.contains('deleteAllTasks') || event.target.classList.contains('removeTasks'))
    {
        while(finalToDoList.firstChild)
        {
            finalToDoList.removeChild(finalToDoList.firstChild);
        }
    }
    removeAllFromStorage();
}

//Store List Element
function storeItem(storedItem) {
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(storedItem);

    localStorage.setItem('items', JSON.stringify(items));
}

//To remove from local storage
function removeFromStorage(itemToBeRemoved) {
    let items;
    if(localStorage.getItem('items') === null) {
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(item, index) {
        if(itemToBeRemoved.textContent === item) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}


function removeAllFromStorage() {
    let items = [];
    localStorage.setItem('items', JSON.stringify(items));
}
