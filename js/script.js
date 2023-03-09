{
    let tasks = [];
    let hiddenTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);
        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHiddenTasksDone = () => {
        hiddenTasks = !hiddenTasks;
        render();
    };

    const bindRemoveEvents = () => {
        if (!tasks.length) {
            return;
        };

        const removeTasksButton = document.querySelector(".js-RemoveTasks");

         removeTasksButton.addEventListener("click", () => { 
             toggleAllTasksDone(); 
         });
    };

    const bindButtonsEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        if (!tasks.length) {
            return;
        } else {
            const removeTasksButton = document.querySelector(".js-RemoveTasks");

            removeTasksButton.addEventListener("click", () => {
                toggleAllTasksDone();        
            });
        };

        const hiddenTasksButton = document.querySelector(".js-HiddenTasks");

        hiddenTasksButton.addEventListener("click", toggleHiddenTasksDone);
    };

    const renderButtons = () => {

        if (!tasks.length) {
            document.querySelector(".js-buttons").innerHTML = "";
            return;
        };

        document.querySelector(".js-buttons").innerHTML = `
            <button class="section__headerButton js-HiddenTasks">${hiddenTasks ? "Pokaż" : "Ukryj"} ukończone</button>
            <button class="section__headerButton js-RemoveTasks" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
        `;
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="task ${task.done && hiddenTasks ? "task--hidden" : ""}">
                    <button class="task__button task__button--done js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span 
                        class="list__item ${task.done ? "list__item--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="task__button task__button--remove js-remove">&#128465;</button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };


    const render = () => {
        renderTasks();
        renderButtons();   
        bindRemoveEvents();       
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTaskElement.focus();
        newTaskElement.value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
