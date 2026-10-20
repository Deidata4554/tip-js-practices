export const STORAGE_VERSION = 1;

// Все функции принимают объект storage явно, чтобы их можно было проверить
// без обращения к глобальному window.localStorage.

function isValidTask(task) {
  return task !== null
    && typeof task === "object"
    && Number.isSafeInteger(task.id)
    && task.id > 0
    && typeof task.title === "string"
    && task.title === task.title.trim()
    && task.title.length >= 1
    && task.title.length <= 100
    && typeof task.completed === "boolean"
    && ["low", "medium", "high"].includes(task.priority);
}

function copyTasks(tasks) {
  return tasks.map((task) => ({ ...task }));
}

export function isValidTaskList(value) {
  if (!Array.isArray(value)) {
    return false;
  }

  const ids = new Set();
  for (const task of value) {
    if (!isValidTask(task) || ids.has(task.id)) {
      return false;
    }
    ids.add(task.id);
  }

  return true;
}

export function loadTasks(storage, key, fallbackTasks) {
  const fallback = copyTasks(fallbackTasks);

  try {
    const raw = storage.getItem(key);
    if (raw === null) {
      return { ok: true, source: "initial", tasks: fallback };
    }

    const data = JSON.parse(raw);
    if (data?.version !== STORAGE_VERSION) {
      return {
        ok: false,
        source: "fallback",
        tasks: fallback,
        error: "Сохранённые данные другой версии. Загружен исходный набор.",
      };
    }

    if (!isValidTaskList(data.tasks)) {
      return {
        ok: false,
        source: "fallback",
        tasks: fallback,
        error: "Сохранённые задачи повреждены. Загружен исходный набор.",
      };
    }

    return { ok: true, source: "storage", tasks: copyTasks(data.tasks) };
  } catch (error) {
    return {
      ok: false,
      source: "fallback",
      tasks: fallback,
      error: `Не удалось прочитать сохранённые данные (${error.message}). Загружен исходный набор.`,
    };
  }
}

export function saveTasks(storage, key, tasks) {
  if (!isValidTaskList(tasks)) {
    return { ok: false, error: "Список задач некорректен и не сохранён." };
  }

  try {
    storage.setItem(key, JSON.stringify({ version: STORAGE_VERSION, tasks }));
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: `Не удалось сохранить данные (${error.message}). После перезагрузки изменения пропадут.`,
    };
  }
}

export function removeSavedTasks(storage, key) {
  try {
    storage.removeItem(key);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `Не удалось удалить сохранённые данные (${error.message}).` };
  }
}
