import { getTaskStats } from "./task-service.js";

const PRIORITY_LABELS = { low: "Низкий", medium: "Средний", high: "Высокий" };

function createActionButton(action, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;

  const span = document.createElement("span");
  span.className = "action-label";
  span.textContent = label;
  button.append(span);

  return button;
}

// Здесь создаётся DOM, но не изменяется состояние приложения.
export function createTaskElement(task) {
  const card = document.createElement("li");
  card.className = "task-card";
  card.dataset.taskId = String(task.id);
  card.classList.toggle("is-completed", task.completed);

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  const priority = document.createElement("span");
  priority.className = "task-priority";
  priority.textContent = PRIORITY_LABELS[task.priority];

  const toggleButton = createActionButton("toggle", "Выполнена");
  toggleButton.setAttribute("aria-pressed", String(task.completed));
  const deleteButton = createActionButton("delete", "Удалить");

  const actions = document.createElement("div");
  actions.className = "task-actions";
  actions.append(toggleButton, deleteButton);

  card.append(title, status, priority, actions);
  return card;
}

export function renderTaskList(listElement, tasks) {
  listElement.replaceChildren(...tasks.map(createTaskElement));
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
  summaryElement.querySelector('[data-stat="total"]').textContent = String(stats.total);
  summaryElement.querySelector('[data-stat="completed"]').textContent = String(stats.completed);
  summaryElement.querySelector('[data-stat="pending"]').textContent = String(stats.pending);
  summaryElement.querySelector('[data-stat="progress"]').textContent = `${stats.progress.toFixed(1)}%`;
  summaryElement.querySelector('[data-stat="visible"]').textContent = String(visibleCount);
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
    return;
  }

  messageElement.textContent = total === 0
    ? "Список задач пуст."
    : "Нет задач по выбранному фильтру.";
  messageElement.hidden = false;
}
