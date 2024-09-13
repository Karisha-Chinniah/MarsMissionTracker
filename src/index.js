// Import CSS
import './style.css';  // This imports the CSS file for Webpack to bundle


// TaskManager Class
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title, description, createdBy, assignedTo) {
    const task = {
      id: Date.now(),
      title,
      description,
      createdBy,
      assignedTo,
    };
    this.tasks.push(task);
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.renderTasks();
  }

  deleteAllTasks() {
    this.tasks = [];
    this.renderTasks();
  }

  renderTasks() {
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    this.tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Created by:</strong> ${task.createdBy}</p>
        <p><strong>Assigned to:</strong> ${task.assignedTo}</p>
        <button data-id="${task.id}" class="delete-task">Delete</button>
      `;
      taskContainer.appendChild(taskDiv);
    });

    document.getElementById('task-count').innerText = `Tasks: ${this.tasks.length}`;
  }
}

const taskManager = new TaskManager();

// Handle Add Task
document.getElementById('add-task').addEventListener('click', () => {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const createdBy = document.getElementById('createdBy').value.trim();
  const assignedTo = document.getElementById('assignedTo').value.trim();

  if (title && description && createdBy && assignedTo) {
    taskManager.addTask(title, description, createdBy, assignedTo);
    // Clear input fields
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('createdBy').value = '';
    document.getElementById('assignedTo').value = '';
  } else {
    alert('Please fill in all fields.');
  }
});

// Handle Delete Task
document.getElementById('task-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-task')) {
    const id = parseInt(e.target.getAttribute('data-id'), 10);
    taskManager.deleteTask(id);
  }
});

// Handle Delete All Tasks
document.getElementById('delete-all').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    taskManager.deleteAllTasks();
  }
});

// Fetch and Render Mars Image Asynchronously
const marsImage = document.getElementById('mars-image');
fetch('https://picsum.photos/id/46/600/400')
  .then(response => {
    marsImage.src = response.url;
  })
  .catch(error => {
    console.error('Error fetching image:', error);
  });
