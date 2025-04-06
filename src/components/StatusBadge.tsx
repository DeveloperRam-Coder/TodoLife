
import React from 'react';
import { cn } from '@/lib/utils';
import { TaskStatus } from '@/types';
import { Check, Clock, HourglassIcon, XCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'Todo':
        return {
          bg: 'bg-todo',
          text: 'text-todo-foreground',
          icon: <AlertCircle className="h-3.5 w-3.5" />
        };
      case 'In Progress':
        return {
          bg: 'bg-in-progress',
          text: 'text-in-progress-foreground',
          icon: <HourglassIcon className="h-3.5 w-3.5" />
        };
      case 'Done':
        return {
          bg: 'bg-done',
          text: 'text-done-foreground',
          icon: <Check className="h-3.5 w-3.5" />
        };
      case 'Backlog':
        return {
          bg: 'bg-backlog',
          text: 'text-backlog-foreground',
          icon: <Clock className="h-3.5 w-3.5" />
        };
      case 'Canceled':
        return {
          bg: 'bg-canceled',
          text: 'text-canceled-foreground',
          icon: <XCircle className="h-3.5 w-3.5" />
        };
      default:
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground',
          icon: null
        };
    }
  };

  const { bg, text, icon } = getStatusConfig();

  return (
    <span className={cn('badge gap-1', bg, text)}>
      {icon}
      <span>{status}</span>
    </span>
  );
}
