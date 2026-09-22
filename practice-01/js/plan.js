"use strict";

const totalTasks = 12;
const completedTasks = 5;
const dailyLimit = 3;

if (typeof totalTasks !== "number" || typeof completedTasks !== "number" || typeof dailyLimit !== "number") {
  console.log("Ошибка: вместо числа передана строка или другой тип.");
} else if (!Number.isFinite(totalTasks) || !Number.isFinite(completedTasks) || !Number.isFinite(dailyLimit)) {
  console.log("Ошибка: недопустимое числовое значение.");
} else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
  console.log("Ошибка: дробное количество задач.");
} else if (!Number.isInteger(dailyLimit)) {
  console.log("Ошибка: дробной дневной нормы быть не должно.");
} else if (totalTasks < 0 || completedTasks < 0) {
  console.log("Ошибка: отрицательное количество.");
} else if (totalTasks > 1000) {
  console.log("Ошибка: превышена верхняя граница количества задач.");
} else if (completedTasks > totalTasks) {
  console.log("Ошибка: некорректное число выполненных задач.");
} else if (dailyLimit < 1) {
  console.log("Ошибка: дневная норма должна быть не меньше 1.");
} else if (dailyLimit > 1000) {
  console.log("Ошибка: превышена верхняя граница нормы.");
} else {
  let remaining = totalTasks - completedTasks;

  if (remaining === 0) {
    console.log("Все задачи уже выполнены.");
    console.log("Потребуется дней: 0");
  } else {
    console.log(`Осталось задач: ${remaining}`);

    let day = 0;
    while (remaining > 0) {
      day++;
      const done = Math.min(dailyLimit, remaining);
      remaining -= done;
      console.log(`День ${day}: выполнено ${done}, осталось ${remaining}`);
    }

    console.log(`Потребуется дней: ${day}`);
  }
}
