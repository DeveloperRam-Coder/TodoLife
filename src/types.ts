
export type TaskStatus = 'Todo' | 'In Progress' | 'Done' | 'Backlog' | 'Canceled';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskCategory = 'Feature' | 'Bug' | 'Documentation';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  createdAt: string;
  dueDate?: string;
}

export interface SortConfig {
  key: keyof Task;
  direction: 'ascending' | 'descending';
}

export interface FilterConfig {
  status: TaskStatus | 'All';
  priority: TaskPriority | 'All';
  category: TaskCategory | 'All';
  search: string;
}
