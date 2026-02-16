/**
 * Custom hook wrapping React Query for tasks. Keeps components
 * decoupled from query keys and fetch logic.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api/tasks.js";

export const TASKS_QUERY_KEY = ["tasks"];

export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: fetchTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY }),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) => updateTask(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY }),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY }),
  });
}
