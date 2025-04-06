
import React from 'react';
import { cn } from '@/lib/utils';
import { TaskCategory } from '@/types';

interface CategoryBadgeProps {
  category: TaskCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const getCategoryConfig = () => {
    switch (category) {
      case 'Feature':
        return {
          bg: 'bg-feature',
          text: 'text-feature-foreground'
        };
      case 'Bug':
        return {
          bg: 'bg-bug',
          text: 'text-bug-foreground'
        };
      case 'Documentation':
        return {
          bg: 'bg-documentation',
          text: 'text-documentation-foreground'
        };
      default:
        return {
          bg: 'bg-secondary',
          text: 'text-secondary-foreground'
        };
    }
  };

  const { bg, text } = getCategoryConfig();

  return (
    <span className={cn('badge', bg, text)}>
      {category}
    </span>
  );
}
