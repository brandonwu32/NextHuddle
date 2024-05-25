// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
};

export type Team = {
  id: string;
  name: string;
  active: string;
}

export type Developer = {
  id: string;
  name: string;
  team_id: string;
  email: string;
  phone: string;
  image_url: string;
};

export type Task = {
  id: string;
  team_id: string;
  name: string;
  notes: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'completed' | 'backlog' | 'archived' | 'todo';
  date: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type DeveloperTable = {
  id: string;
  team_id: string;
  name: string;
  team_name: string;
  image_url: string;
  phone: string;
};

export type TaskTable = {
  id: string;
  team_id: string;
  name: string;
  team_name: string;
  notes: string;
  status: 'pending' | 'completed' | 'backlog' | 'archived' | 'todo';
  date: string;
};

export type TeamTableType = {
  id: string;
  name: string;
  members: string[];
  pending_tasks: number;
  total_tasks: number;
  active: string;
};

export type ImportantLink = {
  id: string;
  name: string;
  url: string;
};

export type TeamField = {
  id: string;
  name: string;
  active: string;
};

export type TaskForm = {
  id: string;
  team_id: string;
  name: string;
  notes: string;
  status: 'pending' | 'completed' | 'backlog' | 'archived' | 'todo';
};
