
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Task, FilterConfig, SortConfig, TaskStatus, TaskPriority, TaskCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterConfig: FilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<FilterConfig>>;
  sortConfig: SortConfig | null;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig | null>>;
  selectedTasks: string[];
  toggleTaskSelection: (id: string) => void;
  selectAllTasks: (select: boolean) => void;
  deleteSelectedTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    status: 'All',
    priority: 'All',
    category: 'All',
    search: '',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const { toast } = useToast();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage", error);
      setTasks([]);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage", error);
    }
  }, [tasks]);

  // Filter and sort tasks whenever tasks, filterConfig, or sortConfig change
  useEffect(() => {
    let result = [...tasks];
    
    // Apply filters
    if (filterConfig.status !== 'All') {
      result = result.filter(task => task.status === filterConfig.status);
    }
    
    if (filterConfig.priority !== 'All') {
      result = result.filter(task => task.priority === filterConfig.priority);
    }
    
    if (filterConfig.category !== 'All') {
      result = result.filter(task => task.category === filterConfig.category);
    }
    
    if (filterConfig.search) {
      const searchLower = filterConfig.search.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        task.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredTasks(result);
  }, [tasks, filterConfig, sortConfig]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `TASK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task created",
      description: "Your task has been successfully created.",
    });
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated.",
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been successfully deleted.",
    });
  };

  const toggleTaskSelection = (id: string) => {
    setSelectedTasks(prev => {
      if (prev.includes(id)) {
        return prev.filter(taskId => taskId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAllTasks = (select: boolean) => {
    if (select) {
      setSelectedTasks(filteredTasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const deleteSelectedTasks = () => {
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
    toast({
      title: `${selectedTasks.length} tasks deleted`,
      description: "Selected tasks have been successfully deleted.",
    });
    setSelectedTasks([]);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      addTask,
      updateTask,
      deleteTask,
      filterConfig,
      setFilterConfig,
      sortConfig,
      setSortConfig,
      selectedTasks,
      toggleTaskSelection,
      selectAllTasks,
      deleteSelectedTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
