
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTasks } from '@/context/TaskContext';
import { Task, TaskCategory, TaskPriority, TaskStatus } from '@/types';
import { CategoryBadge } from './CategoryBadge';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

interface TaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task | null;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, setOpen, task }) => {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState<TaskStatus>('Todo');
  const [priority, setPriority] = React.useState<TaskPriority>('Medium');
  const [category, setCategory] = React.useState<TaskCategory>('Feature');
  const [dueDate, setDueDate] = React.useState('');

  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setCategory(task.category);
      setDueDate(task.dueDate || '');
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setStatus('Todo');
      setPriority('Medium');
      setCategory('Feature');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      status,
      priority,
      category,
      dueDate: dueDate || undefined
    };
    
    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as TaskCategory)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Feature">
                      <div className="flex items-center gap-2">
                        <CategoryBadge category="Feature" />
                      </div>
                    </SelectItem>
                    <SelectItem value="Bug">
                      <div className="flex items-center gap-2">
                        <CategoryBadge category="Bug" />
                      </div>
                    </SelectItem>
                    <SelectItem value="Documentation">
                      <div className="flex items-center gap-2">
                        <CategoryBadge category="Documentation" />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as TaskStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">
                      <div className="flex items-center gap-2">
                        <StatusBadge status="Todo" />
                      </div>
                    </SelectItem>
                    <SelectItem value="In Progress">
                      <div className="flex items-center gap-2">
                        <StatusBadge status="In Progress" />
                      </div>
                    </SelectItem>
                    <SelectItem value="Done">
                      <div className="flex items-center gap-2">
                        <StatusBadge status="Done" />
                      </div>
                    </SelectItem>
                    <SelectItem value="Backlog">
                      <div className="flex items-center gap-2">
                        <StatusBadge status="Backlog" />
                      </div>
                    </SelectItem>
                    <SelectItem value="Canceled">
                      <div className="flex items-center gap-2">
                        <StatusBadge status="Canceled" />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as TaskPriority)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority="Low" />
                      </div>
                    </SelectItem>
                    <SelectItem value="Medium">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority="Medium" />
                      </div>
                    </SelectItem>
                    <SelectItem value="High">
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority="High" />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{task ? 'Save Changes' : 'Create Task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
