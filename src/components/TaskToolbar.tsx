
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/context/TaskContext';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function TaskToolbar() {
  const { filteredTasks, selectedTasks, deleteSelectedTasks } = useTasks();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="text-sm text-muted-foreground">
          {selectedTasks.length === 0
            ? `${filteredTasks.length} tasks`
            : `${selectedTasks.length} selected`}
        </span>
      </div>
      
      <div className="flex gap-2">
        {selectedTasks.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        )}
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the {selectedTasks.length} selected task{selectedTasks.length > 1 ? 's' : ''}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteSelectedTasks}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
