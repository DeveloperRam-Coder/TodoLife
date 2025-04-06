import React, { useState, useMemo, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { TaskFilters } from "./TaskFilters";
import { TaskToolbar } from "./TaskToolbar";
import { TaskTable } from "./TaskTable";
import { TaskPagination } from "./TaskPagination";
import { useTasks } from "@/context/TaskContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TaskManager() {
  const { filteredTasks } = useTasks();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredTasks.length);

  const paginatedTasks = useMemo(() => {
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, startIndex, endIndex]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    // Container for background and card
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">

      {/* 🔵 Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 blur-sm"
        style={{
          backgroundImage: "url('/image/bgbaner.jpg')", // Background image
        }}
      />

      {/* 🔷 Main card content */}
      <div className="relative z-10 w-full max-w-5xl rounded-lg border bg-blue-50 dark:bg-gray-800 shadow-lg p-6 pb-8 animate-fade-in">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="/image/daily-planning.png" alt="User avatar" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <TaskFilters />
        <TaskToolbar />
        <TaskTable />

        <div className="mt-4">
          <TaskPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={filteredTasks.length}
          />
        </div>
      </div>
    </div>
  );
}
