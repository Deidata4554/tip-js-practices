import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

import { searchTasks } from "./task-extra.js";

function printStats(tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);

  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

// ===== Общий сценарий =====
console.log("===== Общий сценарий =====");

let currentTasks = demoTasks;

console.log("\n1. Исходные задачи:");
console.table(currentTasks);
console.log("Названия:", getTaskTitles(currentTasks));
console.log("Невыполненные задачи:");
console.table(getPendingTasks(currentTasks));
printStats(currentTasks);

console.log("\n2. Добавление задачи id 20:");
let result = addTask(currentTasks, 20, "Добавить проверку", "high");
if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
printStats(currentTasks);

console.log("\n3. Выполнение задачи id 4:");
result = setTaskCompleted(currentTasks, 4, true);
if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
printStats(currentTasks);

console.log("\n4. Переименование задачи id 10:");
result = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
console.log("Задача id 10:", findTaskById(currentTasks, 10));
printStats(currentTasks);

console.log("\n5. Удаление задачи id 7:");
result = removeTask(currentTasks, 7);
if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
printStats(currentTasks);

console.log("\n6. Попытка добавить задачу с существующим id 4:");
result = addTask(currentTasks, 4, "Повторная задача", "low");
if (result.ok) {
  currentTasks = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
console.log("Состояние после ошибки не изменилось:");
printStats(currentTasks);

console.log("\nИтоговые задачи:");
console.table(currentTasks);
console.log("Идентификаторы:", currentTasks.map((task) => task.id));

console.log("\n7. Исходный demoTasks не изменился:");
console.table(demoTasks);
printStats(demoTasks);

// ===== Индивидуальный вариант =====
console.log(`\n===== Вариант ${variantNumber} =====`);

let currentVariant = variantTasks;

console.log("\n1. Исходные задачи варианта:");
console.table(currentVariant);
printStats(currentVariant);

console.log("\n2. Добавление задачи id 80:");
result = addTask(currentVariant, 80, "Проверить релиз после публикации", "high");
if (result.ok) {
  currentVariant = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
printStats(currentVariant);

console.log("\n3. Выполнение задачи id 11:");
result = setTaskCompleted(currentVariant, 11, true);
if (result.ok) {
  currentVariant = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
printStats(currentVariant);

console.log("\n4. Переименование задачи id 23:");
result = renameTask(currentVariant, 23, "Обновить версию в package.json");
if (result.ok) {
  currentVariant = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
console.log("Задача id 23:", findTaskById(currentVariant, 23));
printStats(currentVariant);

console.log("\n5. Удаление задачи id 37:");
result = removeTask(currentVariant, 37);
if (result.ok) {
  currentVariant = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
printStats(currentVariant);

console.log("\n6. Повторное добавление задачи id 80:");
result = addTask(currentVariant, 80, "Повторная задача", "high");
if (result.ok) {
  currentVariant = result.tasks;
} else {
  console.error(`Ошибка: ${result.error}`);
}
console.log("Состояние после ошибки не изменилось:");
printStats(currentVariant);

console.log("\n7. Итоговые задачи варианта:");
console.table(currentVariant);
console.log("Идентификаторы:", currentVariant.map((task) => task.id));

console.log("\nИсходный variantTasks не изменился:");
console.table(variantTasks);
printStats(variantTasks);

// ===== Расширение: поиск по названию =====
console.log("\n===== Расширение: поиск по названию =====");

console.log('\nЗапрос " ФУНК ":');
console.table(searchTasks(demoTasks, " ФУНК "));

console.log('\nЗапрос "несуществующий фрагмент":');
console.log(searchTasks(demoTasks, "несуществующий фрагмент"));

console.log('\nПустой запрос "":');
console.table(searchTasks(demoTasks, ""));
