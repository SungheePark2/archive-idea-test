import { supabase } from './supabase';
import { Todo } from '@/app/types/todo';

export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    return [];
  }

  return data || [];
}

export async function createTodo(title: string): Promise<Todo | null> {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ title }])
    .select()
    .single();

  if (error) {
    console.error('Error creating todo:', error);
    return null;
  }

  return data;
}

export async function updateTodo(id: string, updates: Partial<Todo>): Promise<Todo | null> {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    return null;
  }

  return data;
}

export async function deleteTodo(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting todo:', error);
    return false;
  }

  return true;
}

export async function toggleTodoCompletion(id: string, isCompleted: boolean): Promise<Todo | null> {
  return updateTodo(id, { is_completed: isCompleted });
}