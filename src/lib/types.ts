export interface Task {
  id: string;
  title: string;
  description: string;
  status: TypeStatus;
  deadline?: Date;
  customId: string;
}

export type TypeStatus = "pending" | "completed";
