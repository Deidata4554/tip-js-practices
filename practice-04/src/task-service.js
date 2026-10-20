// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

export function createTask(id, title, priority = "medium") {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }

  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }

  const cleanTitle = title.trim();
  if (cleanTitle.length < 1 || cleanTitle.length > 100) {
    return { ok: false, error: "Длина названия должна быть от 1 до 100 символов" };
  }

  if (priority !== "low" && priority !== "medium" && priority !== "high") {
    return { ok: false, error: 'Приоритет должен быть "low", "medium" или "high"' };
  }

  return {
    ok: true,
    task: {
      id,
      title: cleanTitle,
      completed: false,
      priority,
    },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  let completed = 0;

  for (const task of tasks) {
    if (task.completed === true) {
      completed++;
    }
  }

  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  const created = createTask(id, title, priority);
  if (!created.ok) {
    return created;
  }

  if (tasks.find((task) => task.id === id) !== undefined) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }

  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }

  if (typeof completed !== "boolean") {
    return { ok: false, error: "completed должен быть true или false" };
  }

  if (tasks.find((task) => task.id === id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }

  const updated = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );

  return { ok: true, tasks: updated };
}

export function renameTask(tasks, id, title) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }

  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }

  const cleanTitle = title.trim();
  if (cleanTitle.length < 1 || cleanTitle.length > 100) {
    return { ok: false, error: "Длина названия должна быть от 1 до 100 символов" };
  }

  if (tasks.find((task) => task.id === id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }

  const updated = tasks.map((task) =>
    task.id === id ? { ...task, title: cleanTitle } : task
  );

  return { ok: true, tasks: updated };
}

export function removeTask(tasks, id) {
  if (!Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "id должен быть положительным целым числом" };
  }

  if (tasks.find((task) => task.id === id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }

  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}

export function updateTask(tasks, id, title, priority) {
  const checked = createTask(id, title, priority);
  if (!checked.ok) {
    return checked;
  }

  if (tasks.find((task) => task.id === id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }

  const updated = tasks.map((task) =>
    task.id === id ? { ...task, title: checked.task.title, priority } : task
  );

  return { ok: true, tasks: updated };
}
