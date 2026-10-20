const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);

// Чистая проверка данных формы. DOM и показ сообщений выполняются в main.js.
// draft: { id, title, priority }; editingId: null либо id редактируемой задачи.
export function validateTaskDraft(draft, tasks, editingId = null) {
  const errors = {};
  let id;

  if (editingId === null) {
    id = Number(draft.id);
    if (draft.id === "" || !Number.isSafeInteger(id) || id <= 0) {
      errors.id = "Введите положительное целое число";
    } else if (tasks.some((task) => task.id === id)) {
      errors.id = `Задача с id ${id} уже есть в списке`;
    }
  } else {
    id = editingId;
    if (!tasks.some((task) => task.id === id)) {
      errors.id = "Редактируемая задача не найдена";
    }
  }

  const title = typeof draft.title === "string" ? draft.title.trim() : "";
  if (title.length < 1 || title.length > 100) {
    errors.title = "Название должно быть от 1 до 100 символов без учёта пробелов по краям";
  }

  if (!ALLOWED_PRIORITIES.has(draft.priority)) {
    errors.priority = "Выберите приоритет: низкий, средний или высокий";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, value: { id, title, priority: draft.priority } };
}
