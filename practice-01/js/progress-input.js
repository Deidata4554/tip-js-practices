"use strict";

const totalInput = "10";
const completedInput = "7";

if (typeof totalInput !== "string" || typeof completedInput !== "string") {
  console.log("Ошибка: входные данные должны быть строками.");
} else {
  const totalText = totalInput.trim();
  const completedText = completedInput.trim();

  if (totalText === "" || completedText === "") {
    console.log("Ошибка: пустой ввод.");
  } else {
    const totalTasks = Number(totalText);
    const completedTasks = Number(completedText);

    if (!Number.isFinite(totalTasks) || !Number.isFinite(completedTasks)) {
      console.log("Ошибка: введено не число.");
    } else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
      console.log("Ошибка: дробное количество.");
    } else if (totalTasks < 0 || completedTasks < 0) {
      console.log("Ошибка: отрицательное количество.");
    } else if (totalTasks > 1000) {
      console.log("Ошибка: превышена верхняя граница.");
    } else if (completedTasks > totalTasks) {
      console.log("Ошибка: выполнено больше, чем существует.");
    } else if (totalTasks === 0) {
      console.log("Задач пока нет");
    } else {
      const remaining = totalTasks - completedTasks;
      const percent = ((completedTasks / totalTasks) * 100).toFixed(1);

      let status = "В работе";
      if (completedTasks === 0) {
        status = "Не начато";
      } else if (completedTasks === totalTasks) {
        status = "Завершено";
      }

      console.log(`Всего задач: ${totalTasks}`);
      console.log(`Выполнено: ${completedTasks}`);
      console.log(`Осталось: ${remaining}`);
      console.log(`Прогресс: ${percent}%`);
      console.log(`Статус: ${status}`);
    }
  }
}
