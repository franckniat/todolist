import { task } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";

export const TaskSchema = createSelectSchema(task);
export const NewTaskSchema = createInsertSchema(task).pick({
  title: true,
  description: true,
  dueDate: true,
  completed: true,
});

export type Task = z.infer<typeof TaskSchema>;