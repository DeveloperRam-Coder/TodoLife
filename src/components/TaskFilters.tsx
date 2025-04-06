
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter, Search, Plus } from 'lucide-react';
import { useTasks } from '@/context/TaskContext';
import { TaskStatus, TaskPriority } from '@/types';
import TaskDialog from './TaskDialog';
import { useIsMobile } from '@/hooks/use-mobile';

export function TaskFilters() {
  const { filterConfig, setFilterConfig } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterConfig(prev => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (status: TaskStatus | 'All') => {
    setFilterConfig(prev => ({ ...prev, status }));
  };

  const handlePriorityChange = (priority: TaskPriority | 'All') => {
    setFilterConfig(prev => ({ ...prev, priority }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter tasks..."
          value={filterConfig.search}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={isMobile ? 'icon' : 'default'} className="whitespace-nowrap">
            <Filter className="h-4 w-4 mr-2" />
            {!isMobile && <span>Status</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filterConfig.status === 'All'}
            onCheckedChange={() => handleStatusChange('All')}
          >
            All
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.status === 'Todo'}
            onCheckedChange={() => handleStatusChange('Todo')}
          >
            Todo
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.status === 'In Progress'}
            onCheckedChange={() => handleStatusChange('In Progress')}
          >
            In Progress
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.status === 'Done'}
            onCheckedChange={() => handleStatusChange('Done')}
          >
            Done
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.status === 'Backlog'}
            onCheckedChange={() => handleStatusChange('Backlog')}
          >
            Backlog
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.status === 'Canceled'}
            onCheckedChange={() => handleStatusChange('Canceled')}
          >
            Canceled
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={isMobile ? 'icon' : 'default'} className="whitespace-nowrap">
            <Filter className="h-4 w-4 mr-2" />
            {!isMobile && <span>Priority</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filterConfig.priority === 'All'}
            onCheckedChange={() => handlePriorityChange('All')}
          >
            All
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.priority === 'Low'}
            onCheckedChange={() => handlePriorityChange('Low')}
          >
            Low
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.priority === 'Medium'}
            onCheckedChange={() => handlePriorityChange('Medium')}
          >
            Medium
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterConfig.priority === 'High'}
            onCheckedChange={() => handlePriorityChange('High')}
          >
            High
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button onClick={() => setIsDialogOpen(true)} size={isMobile ? 'icon' : 'default'}>
        <Plus className="h-4 w-4 mr-2" />
        {!isMobile && <span>Add Task</span>}
      </Button>
      
      <TaskDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        task={null}
      />
    </div>
  );
}
