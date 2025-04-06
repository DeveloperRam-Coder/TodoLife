
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTasks } from '@/context/TaskContext';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { Task, SortConfig } from '@/types';
import { MoreHorizontal, ArrowDown, ArrowUp } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import { useToast } from '@/components/ui/use-toast';
import TaskDialog from './TaskDialog';

export function TaskTable() {
  const { 
    filteredTasks, 
    sortConfig, 
    setSortConfig,
    selectedTasks,
    toggleTaskSelection,
    selectAllTasks,
    deleteTask,
    updateTask
  } = useTasks();
  const [taskToEdit, setTaskToEdit] = React.useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleSort = (key: keyof Task) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Task) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' 
      ? <ArrowUp className="h-4 w-4 ml-1" />
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectAllTasks(event.target.checked);
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (task: Task, newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
    toast({
      title: "Status updated",
      description: `Task moved to ${newStatus}`,
    });
  };

  const handlePriorityChange = (task: Task, newPriority: Task['priority']) => {
    updateTask(task.id, { priority: newPriority });
    toast({
      title: "Priority updated",
      description: `Task priority set to ${newPriority}`,
    });
  };

  return (
    <>
      <div className="rounded-md border">
        <table className="w-full task-table">
          <thead>
            <tr className="border-b bg-secondary/30">
              <th className="w-12">
                <Checkbox 
                  checked={selectedTasks.length > 0 && selectedTasks.length === filteredTasks.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all tasks"
                />
              </th>
              <th 
                className="cursor-pointer select-none"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  <span>Task</span>
                  {getSortIcon('id')}
                </div>
              </th>
              <th 
                className="cursor-pointer select-none"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center">
                  <span>Title</span>
                  {getSortIcon('title')}
                </div>
              </th>
              <th 
                className="cursor-pointer select-none"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th 
                className="cursor-pointer select-none"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center">
                  <span>Priority</span>
                  {getSortIcon('priority')}
                </div>
              </th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No tasks found
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr key={task.id} className="task-row border-b">
                  <td className="px-4">
                    <Checkbox 
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => toggleTaskSelection(task.id)}
                      aria-label={`Select task ${task.id}`}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{task.id}</span>
                      <CategoryBadge category={task.category} />
                    </div>
                  </td>
                  <td>
                    <div 
                      className="task-title cursor-pointer hover:underline" 
                      onClick={() => handleEdit(task)}
                    >
                      {task.title}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 p-0">
                            <StatusBadge status={task.status} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => handleStatusChange(task, 'Todo')}>
                            <StatusBadge status="Todo" />
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(task, 'In Progress')}>
                            <StatusBadge status="In Progress" />
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(task, 'Done')}>
                            <StatusBadge status="Done" />
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(task, 'Backlog')}>
                            <StatusBadge status="Backlog" />
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(task, 'Canceled')}>
                            <StatusBadge status="Canceled" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 p-0">
                            <PriorityBadge priority={task.priority} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => handlePriorityChange(task, 'Low')}>
                            <PriorityBadge priority="Low" />
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePriorityChange(task, 'Medium')}>
                            <PriorityBadge priority="Medium" />
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePriorityChange(task, 'High')}>
                            <PriorityBadge priority="High" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(task)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <TaskDialog 
        open={isDialogOpen} 
        setOpen={setIsDialogOpen}
        task={taskToEdit}
      />
    </>
  );
}
