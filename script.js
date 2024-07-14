document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const modal = document.getElementById('taskDetails');
    const closeBtn = document.querySelector('.close');
    let taskCount = 0;

    taskForm.addEventListener('submit', addTask);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    function addTask(e) {
        e.preventDefault();

        const taskInput = document.getElementById('taskInput');
        const descriptionInput = document.getElementById('descriptionInput');
        const dateTimeInput = document.getElementById('dateTimeInput');
        const responsibleInput = document.getElementById('responsibleInput');
        const statusInput = document.getElementById('statusInput');

        if (taskInput.value.trim() === '' || dateTimeInput.value === '' || responsibleInput.value.trim() === '') {
            alert('Please fill in all required fields');
            return;
        }

        taskCount++;
        const taskNumber = `Task ${taskCount}`;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <strong>${taskNumber}:</strong> ${taskInput.value}
                <span class="status">(${statusInput.value})</span>
            </div>
            <div class="action-buttons">
                <button class="complete-btn">Complete</button>
                <button class="incomplete-btn">Incomplete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        li.setAttribute('data-task', JSON.stringify({
            title: taskInput.value,
            description: descriptionInput.value,
            dateTime: dateTimeInput.value,
            responsible: responsibleInput.value,
            status: statusInput.value
        }));

        li.querySelector('.task-content').addEventListener('click', showTaskDetails);
        li.querySelector('.complete-btn').addEventListener('click', () => updateStatus(li, 'complete'));
        li.querySelector('.incomplete-btn').addEventListener('click', () => updateStatus(li, 'incomplete'));
        li.querySelector('.delete-btn').addEventListener('click', deleteTask);

        taskList.appendChild(li);

        taskForm.reset();
    }

    function updateStatus(li, status) {
        const taskData = JSON.parse(li.getAttribute('data-task'));
        taskData.status = status;
        li.setAttribute('data-task', JSON.stringify(taskData));
        li.querySelector('.status').textContent = `(${status})`;
    }

    function deleteTask(e) {
        e.target.closest('li').remove();
    }

    function showTaskDetails(e) {
        const taskData = JSON.parse(e.target.closest('li').getAttribute('data-task'));
        document.getElementById('detailTitle').textContent = taskData.title;
        document.getElementById('detailDescription').textContent = `Description: ${taskData.description}`;
        document.getElementById('detailDateTime').textContent = `Date/Time: ${taskData.dateTime}`;
        document.getElementById('detailResponsible').textContent = `Responsible: ${taskData.responsible}`;
        document.getElementById('detailStatus').textContent = `Status: ${taskData.status}`;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function outsideClick(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }
});
