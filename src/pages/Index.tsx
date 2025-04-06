
import { TaskProvider } from '@/context/TaskContext';
import { TaskManager } from '@/components/TaskManager';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Index() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TaskManager />
      </TaskProvider>
    </ThemeProvider>
  );
}
