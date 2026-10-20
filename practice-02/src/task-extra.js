
export function searchTasks(tasks, query) {
  const cleanQuery = query.trim().toLowerCase();

  if (cleanQuery.length === 0) {
    return [...tasks];
  }

  return tasks.filter((task) => task.title.toLowerCase().includes(cleanQuery));
}
