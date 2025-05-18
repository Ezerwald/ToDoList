const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let currentFilter = "all";

// Input box functionality
inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && inputBox === document.activeElement && inputBox.value.trim() !== "") {
        AddTask();
    }
});

// Task functionality
function AddTask(){
    if(inputBox.value === ''){
        alert("You must specify a name of the task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span")
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";

    const savedFilter = localStorage.getItem('todoFilter') || 'all';
    setFilter(savedFilter);

    applyFilter();
}

// Filter functionality
document.querySelectorAll('.filter-row button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        setFilter(filter);
    });
});

function setFilter(filter) {
    currentFilter = filter;
    localStorage.setItem('todoFilter', filter); // save filter
    applyFilter();

    document.querySelectorAll('.filter-row button').forEach(button => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle('active', isActive);
    });
}



function applyFilter() {
    const tasks = listContainer.querySelectorAll("li");

    tasks.forEach(task => {
        const isChecked = task.classList.contains("checked");

        if (currentFilter === "all") {
            task.style.display = "flex";
        } else if (currentFilter === "active" && isChecked) {
            task.style.display = "none";
        } else if (currentFilter === "completed" && !isChecked) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}

// On page load:
showTask();



