
import React from 'react';
import { cn } from '@/lib/utils';
import { TaskPriority } from '@/types';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'Low':
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground',
          icon: <ArrowDown className="h-3.5 w-3.5" />
        };
      case 'Medium':
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground',
          icon: <ArrowRight className="h-3.5 w-3.5" />
        };
      case 'High':
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground',
          icon: <ArrowUp className="h-3.5 w-3.5" />
        };
      default:
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground',
          icon: null
        };
    }
  };

  const { bg, text, icon } = getPriorityConfig();

  return (
    <span className={cn('badge gap-1', bg, text)}>
      {icon}
      <span>{priority}</span>
    </span>
  );
}
