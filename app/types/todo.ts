export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Filters = 'all' | 'now' | 'done';